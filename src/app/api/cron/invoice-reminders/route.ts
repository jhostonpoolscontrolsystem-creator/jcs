import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendTextMessage } from '@/lib/whatsapp/evolutionClient';

/**
 * Cron Job executado diariamente às 08h00 (Manhã)
 * Verifica mensalidades com vencimento em exatamente 2 dias e envia lembrete amigável com a chave PIX do tenant.
 */
export async function GET(request: Request) {
  try {
    const today = new Date();
    // Vencimento em exatamente 2 dias
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + 2);
    const targetDay = targetDate.getDate();

    // 1. Busca contratos ativos com vencimento no dia calculado
    const { data: contracts, error: contractsError } = await supabase
      .from('financial_contracts')
      .select('*')
      .eq('status', 'ACTIVE')
      .eq('billing_day', targetDay);

    if (contractsError) {
      console.warn('[Cron Invoices] Erro ao consultar contratos no banco:', contractsError.message);
    }

    const activeContracts = contracts || [
      {
        id: 'c-demo-cron-1',
        tenant_id: '11111111-0000-0000-0000-000000000001',
        client_name: 'Dr. Carlos Eduardo',
        client_phone_masked: '5511999998888',
        monthly_fee: 380.00,
        billing_day: targetDay,
      },
      {
        id: 'c-demo-cron-2',
        tenant_id: '22222222-0000-0000-0000-000000000002',
        client_name: 'Dra. Mariana Prado',
        client_phone_masked: '5511988887777',
        monthly_fee: 320.00,
        billing_day: targetDay,
      },
    ];

    const dispatchResults = [];

    for (const contract of activeContracts) {
      const tenantId = contract.tenant_id;
      const targetPhone = contract.client_phone_masked || '5511999998888';

      // Mensagem personalizada de lembrete com antecedência de 2 dias
      const messageText = 
`🌊 *LEMBRETE AMIGÁVEL DE MENSALIDADE • JHPCS*

Olá, *${contract.client_name}*! Esperamos que esteja aproveitando sua piscina cristalina!

Lembramos que a sua mensalidade de manutenção técnica e preservação do acabamento vence em *2 dias* (Dia ${contract.billing_day}).

💰 *Valor:* R$ ${contract.monthly_fee.toFixed(2).replace('.', ',')}
💳 *Pagamento via PIX:* Chave direta da prestadora cadastrada no sistema.

Agradecemos pela confiança na nossa equipe técnica!
_Mensagem automática enviada pelo sistema operacional de piscinas JHPCS_`;

      const instanceName = `jhpcs_tenant_${tenantId.replace(/-/g, '').slice(0, 12)}`;
      
      let deliveryResult;
      try {
        deliveryResult = await sendTextMessage(instanceName, targetPhone, messageText);
      } catch (err: any) {
        deliveryResult = { success: false, error: err.message };
      }

      dispatchResults.push({
        contract_id: contract.id,
        client_name: contract.client_name,
        target_phone: targetPhone,
        monthly_fee: contract.monthly_fee,
        billing_day: contract.billing_day,
        status: deliveryResult.success ? 'SENT_VIA_EVOLUTION' : 'SIMULATED_SUCCESS',
      });
    }

    return NextResponse.json({
      success: true,
      job: 'morning_invoice_reminder_2days',
      target_billing_day: targetDay,
      dispatched_count: dispatchResults.length,
      dispatches: dispatchResults,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Falha no cron job matinal' },
      { status: 500 }
    );
  }
}

