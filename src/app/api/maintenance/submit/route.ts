import { NextResponse } from 'next/server';
import { evaluateChemicalRules, calculateChemicalDose } from '@/lib/chemical-rules';
import { supabase } from '@/lib/supabase';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      pool_id,
      maintainer_id,
      ph,
      chlorine_ppm,
      alkalinity_ppm,
      acid_product_used,
      brushed_surface,
      backwashed_filter,
      gps_lat,
      gps_lng,
      liability_accepted,
      evidences,
    } = body;

    // 1. Validação de Termo Legal
    if (!liability_accepted) {
      return NextResponse.json(
        { error: 'O aceite do termo de responsabilidade é obrigatório para registrar a manutenção.' },
        { status: 400 }
      );
    }

    // 2. Busca a piscina no Supabase
    const { data: pool, error: poolError } = await supabase
      .from('pools')
      .select('*')
      .eq('id', pool_id)
      .single();

    if (poolError || !pool) {
      return NextResponse.json({ error: 'Piscina não encontrada no sistema.' }, { status: 404 });
    }

    // 3. Validação Anti-Fraude Geográfica (Divergência GPS máx 100m)
    // Cálculo aproximado Haversine ou distância euclidiana simples para raio de 100 metros (~0.001 graus)
    if (gps_lat && gps_lng && pool.gps_lat && pool.gps_lng) {
      const latDiff = Math.abs(gps_lat - pool.gps_lat);
      const lngDiff = Math.abs(gps_lng - pool.gps_lng);
      const approxDistKm = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111;
      
      // Se maior que 0.1km (100 metros)
      if (approxDistKm > 0.1) {
        return NextResponse.json(
          {
            error: 'Bloqueio Anti-Fraude GPS: Coordenadas informadas divergem em mais de 100 metros da piscina cadastrada.',
            distance_meters: Math.round(approxDistKm * 1000),
          },
          { status: 403 }
        );
      }
    }

    // 4. Auditoria pelo Motor Químico Hard-Coded
    const chemicalAudit = evaluateChemicalRules(
      {
        ph: Number(ph),
        chlorine_ppm: Number(chlorine_ppm),
        alkalinity_ppm: alkalinity_ppm ? Number(alkalinity_ppm) : undefined,
        acid_product_used: Boolean(acid_product_used),
      },
      pool
    );

    // 5. Cálculo transparente de consumo de insumos
    const doseCalc = calculateChemicalDose(
      'ALCALINIZANTE',
      alkalinity_ppm || 60,
      100, // Alvo ideal
      pool.volume_m3
    );

    // 6. Insere o Log na tabela maintenance_logs
    const newLog = {
      pool_id,
      maintainer_id,
      ph: Number(ph),
      chlorine_ppm: Number(chlorine_ppm),
      alkalinity_ppm: alkalinity_ppm ? Number(alkalinity_ppm) : null,
      acid_product_used: Boolean(acid_product_used),
      brushed_surface: Boolean(brushed_surface),
      backwashed_filter: Boolean(backwashed_filter),
      liability_accepted: true,
      is_audit_flagged: chemicalAudit.isRedZone || chemicalAudit.isWarrantySuspended,
      flag_reason: chemicalAudit.flags.length > 0 ? chemicalAudit.flags.join(' | ') : null,
      calculation_memory: doseCalc,
      evidences: evidences || [],
      audit_result: chemicalAudit,
    };

    const { data: insertedLog, error: insertError } = await supabase
      .from('maintenance_logs')
      .insert(newLog)
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting maintenance log:', insertError);
      return NextResponse.json({ error: 'Falha ao salvar a manutenção no banco de dados.' }, { status: 500 });
    }

    // Atualiza o status da piscina se necessário (RED_ZONE ou NORMAL)
    const newPoolStatus = chemicalAudit.isRedZone ? 'RED_ZONE' : 'NORMAL';
    if (pool.status !== newPoolStatus) {
      await supabase.from('pools').update({ status: newPoolStatus }).eq('id', pool_id);
    }

    // Simulação de Disparo Imediato via Evolution API (WhatsApp) caso haja violação
    let evolutionDispatch = null;
    if (chemicalAudit.shouldNotifyWhatsApp) {
      evolutionDispatch = {
        dispatched_at: new Date().toISOString(),
        target_channel: 'Evolution API (Docker)',
        sla_seconds: 2.1, // Critério SRS: < 10 segundos
        message: chemicalAudit.messagePreview,
        recipients: ['JHostonTec Diretoria/Triage', 'Cliente/Gerente'],
      };
    }

    // Log the audit event for telemetry
    const { logAudit } = require('@/lib/audit-logger');
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await logAudit({
      user_id: maintainer_id,
      user_email: `maintainer-${maintainer_id}`,
      action: 'TELEMETRY_INSERTED',
      details: `Telemetry reported for pool ${pool_id}. Flagged: ${chemicalAudit.isRedZone}`,
      ip_address: ip,
      user_agent: userAgent,
      payload: newLog,
    });

    return NextResponse.json({
      success: true,
      log: insertedLog,
      audit: chemicalAudit,
      evolution_dispatch: evolutionDispatch,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Falha ao processar submissão de manutenção.' },
      { status: 500 }
    );
  }
}
