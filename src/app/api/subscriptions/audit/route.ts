import { NextResponse } from 'next/server';
import { mockPools, mockUsers } from '@/lib/mock-data';
import { MASTER_CONTACTS, notifyAllMastersViaWhatsApp } from '@/lib/master-contacts';
import { supabase } from '@/lib/supabase';
import { Pool, SubscriptionTier } from '@/types/database';


export interface SubscriptionAuditItem {
  pool_id: string;
  pool_name: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  facility_type: string;
  status: string;
  current_tier: SubscriptionTier;
  client_chosen_tier: SubscriptionTier;
  trial_started_at: string;
  trial_ends_at: string;
  days_remaining_trial: number;
  trial_state: 'ACTIVE' | 'ENDING_SOON' | 'EXPIRED' | 'EXTENDED_APPROVED';
  extension_months: number;
  extension_reason?: string;
  extension_approved_by_director: boolean;
  monthly_value_brl: number;
}

/**
 * GET /api/subscriptions/audit
 * Retorna o relatório completo de assinaturas e status do período gratuito para o painel MASTER
 * Suporta query param ?format=csv para exportação imediata em planilha
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format'); // 'csv' ou 'json'
    const notifyMasters = searchParams.get('notify') === 'true';

    // 1. Coleta e consolidação de piscinas com status de assinatura
    let poolsData: Pool[] = mockPools;
    try {
      const { data: dbPools } = await supabase.from('pools').select('*, owner:users(*)');
      if (dbPools && dbPools.length > 0) {
        poolsData = dbPools;
      }
    } catch (e) {
      // fallback gracioso em mockPools
    }

    const now = new Date();

    const auditItems: SubscriptionAuditItem[] = poolsData.map((pool) => {
      const owner = mockUsers.find((u) => u.id === pool.owner_id) || {
        name: 'Cliente VIP JHoston',
        email: 'cliente@jhostonpools.com.br',
        phone: '5511999998888',
      };

      const trialEnd = pool.trial_ends_at ? new Date(pool.trial_ends_at) : new Date(Date.now() + 180 * 86400000);
      const diffMs = trialEnd.getTime() - now.getTime();
      const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      let trialState: 'ACTIVE' | 'ENDING_SOON' | 'EXPIRED' | 'EXTENDED_APPROVED' = 'ACTIVE';
      if (pool.trial_approved_by_director && (pool.trial_extension_months || 0) > 0) {
        trialState = 'EXTENDED_APPROVED';
      } else if (daysRemaining <= 0) {
        trialState = 'EXPIRED';
      } else if (daysRemaining <= 30) {
        trialState = 'ENDING_SOON';
      }

      const tierPrices: Record<SubscriptionTier, number> = {
        STANDARD: 0,
        PRO_EXECUTIVE: 29.9,
        BLACK_ELITE: 49.9,
      };

      const currentTier = pool.subscription_tier || 'STANDARD';
      const chosenTier = pool.client_choice_plan || currentTier;

      return {
        pool_id: pool.id,
        pool_name: pool.name,
        client_name: owner.name,
        client_email: owner.email,
        client_phone: owner.phone,
        facility_type: pool.facility_type,
        status: pool.status,
        current_tier: currentTier,
        client_chosen_tier: chosenTier,
        trial_started_at: pool.trial_started_at || pool.application_date || new Date().toISOString(),
        trial_ends_at: trialEnd.toISOString(),
        days_remaining_trial: daysRemaining,
        trial_state: trialState,
        extension_months: pool.trial_extension_months || 0,
        extension_reason: pool.trial_extension_reason,
        extension_approved_by_director: !!pool.trial_approved_by_director,
        monthly_value_brl: tierPrices[chosenTier] || 0,
      };
    });

    // 2. Disparo de Notificação WhatsApp Personalizada aos MASTERs se requisitado
    let notificationResult = null;
    if (notifyMasters) {
      const endingSoonOrDecided = auditItems.filter(
        (i) => i.trial_state === 'ENDING_SOON' || i.client_chosen_tier !== 'STANDARD'
      );

      notificationResult = await notifyAllMastersViaWhatsApp((master) => {
        const nowBr = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

        let listText = '';
        endingSoonOrDecided.forEach((item) => {
          listText += 
            `\n• *${item.pool_name}* (${item.client_name})\n` +
            `  ⏳ Restam: *${item.days_remaining_trial} dias* | Escolha: *${item.client_chosen_tier}* (R$ ${item.monthly_value_brl.toFixed(2).replace('.', ',')}/mês)\n` +
            `  📌 Status: ${item.trial_state === 'EXTENDED_APPROVED' ? '✅ Extensão Aprovada Diretoria' : '⚠️ Encerramento Cortesia'}\n`;
        });

        return (
          `👑 *JHPCS GOVERNANÇA MASTER • STATUS DE ASSINATURAS*\n\n` +
          `Olá, *${master.firstName}*! Segue o radar de término do período gratuito e opções de planos dos clientes:\n` +
          listText + '\n' +
          `📊 *Total Monitorado:* ${auditItems.length} piscinas\n` +
          `💰 *Potencial ARR Imediato:* R$ ${auditItems.reduce((acc, c) => acc + c.monthly_value_brl, 0).toFixed(2).replace('.', ',')}/mês\n` +
          `⏰ *Emitido em:* ${nowBr}\n\n` +
          `_JHoston Pools Control System • Governança Soberana Daniel & Patrícia_`
        );
      });
    }

    // 3. Exportação em Formato CSV Pericial
    if (format === 'csv') {
      const headers = [
        'ID Piscina',
        'Nome da Piscina',
        'Cliente / Proprietário',
        'Telefone WhatsApp',
        'E-mail',
        'Tipo Estabelecimento',
        'Status do Ativo',
        'Plano Atual',
        'Opção do Cliente',
        'Valor Mensal (R$)',
        'Início Degustação',
        'Fim Degustação',
        'Dias Restantes Cortesia',
        'Estado da Cortesia',
        'Meses Extensão Técnica',
        'Aprovado Diretoria JH',
        'Justificativa Técnica da Extensão',
      ];

      const csvRows = [headers.join(';')];

      auditItems.forEach((item) => {
        const row = [
          `"${item.pool_id}"`,
          `"${item.pool_name.replace(/"/g, '""')}"`,
          `"${item.client_name.replace(/"/g, '""')}"`,
          `"${item.client_phone}"`,
          `"${item.client_email}"`,
          `"${item.facility_type}"`,
          `"${item.status}"`,
          `"${item.current_tier}"`,
          `"${item.client_chosen_tier}"`,
          `"${item.monthly_value_brl.toFixed(2)}"`,
          `"${new Date(item.trial_started_at).toLocaleDateString('pt-BR')}"`,
          `"${new Date(item.trial_ends_at).toLocaleDateString('pt-BR')}"`,
          `"${item.days_remaining_trial}"`,
          `"${item.trial_state}"`,
          `"${item.extension_months}"`,
          `"${item.extension_approved_by_director ? 'SIM' : 'NÃO'}"`,
          `"${(item.extension_reason || '').replace(/"/g, '""')}"`,
        ];
        csvRows.push(row.join(';'));
      });

      const csvContent = '\uFEFF' + csvRows.join('\r\n'); // BOM UTF-8 para Excel
      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="JHPCS_Relatorio_Assinaturas_Master_${new Date().toISOString().slice(0, 10)}.csv"`,
          'Cache-Control': 'no-store',
        },
      });
    }

    // Retorno JSON padrão
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      masters: MASTER_CONTACTS.map((m) => ({ name: m.name, phone: m.phone })),
      notification: notificationResult,
      summary: {
        total_pools: auditItems.length,
        ending_soon: auditItems.filter((i) => i.trial_state === 'ENDING_SOON').length,
        extended_approved: auditItems.filter((i) => i.trial_state === 'EXTENDED_APPROVED').length,
        potential_monthly_arr_brl: auditItems.reduce((acc, c) => acc + c.monthly_value_brl, 0),
      },
      items: auditItems,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Falha ao processar relatório de assinaturas' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/subscriptions/audit
 * Permite registrar a solicitação de extensão técnica (corpo técnico) ou a homologação pela Diretoria (Joabson)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pool_id, action, extension_months, extension_reason, approved_by_director, chosen_tier } = body;

    // Localizar a piscina
    const pool = mockPools.find((p) => p.id === pool_id);
    if (!pool) {
      return NextResponse.json({ success: false, error: 'Piscina não encontrada' }, { status: 404 });
    }

    if (action === 'REQUEST_EXTENSION') {
      if (!extension_reason || extension_reason.trim().length < 10) {
        return NextResponse.json(
          { success: false, error: 'A solicitação de extensão técnica exige justificativa detalhada.' },
          { status: 400 }
        );
      }
      pool.subscription_status = 'EXTENSION_REQUESTED';
      pool.trial_extension_months = Math.min(Math.max(extension_months || 1, 1), 3);
      pool.trial_extension_reason = extension_reason;
      pool.trial_approved_by_director = false;
    } else if (action === 'APPROVE_EXTENSION') {
      if (!approved_by_director) {
        return NextResponse.json(
          { success: false, error: 'Apenas a Diretoria Executiva da JHoston (Joabson) pode aprovar extensões.' },
          { status: 403 }
        );
      }
      pool.trial_approved_by_director = true;
      pool.subscription_status = 'TRIAL_ACTIVE';
      // prorroga trial_ends_at
      const currentEnd = pool.trial_ends_at ? new Date(pool.trial_ends_at) : new Date();
      currentEnd.setMonth(currentEnd.getMonth() + (pool.trial_extension_months || 1));
      pool.trial_ends_at = currentEnd.toISOString();
    } else if (action === 'CHOOSE_TIER') {
      pool.client_choice_plan = chosen_tier;
      pool.client_choice_at = new Date().toISOString();
      pool.subscription_tier = chosen_tier;
      if (chosen_tier !== 'STANDARD') {
        pool.subscription_status = 'ACTIVE_PAID';
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Operação de assinatura processada com sucesso',
      pool,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Falha ao atualizar assinatura' },
      { status: 500 }
    );
  }
}
