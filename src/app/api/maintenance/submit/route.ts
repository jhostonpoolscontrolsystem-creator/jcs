import { NextResponse } from 'next/server';
import { evaluateChemicalRules, calculateChemicalDose } from '@/lib/chemical-rules';
import { mockPools } from '@/lib/mock-data';

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

    // 2. Busca a piscina
    const pool = mockPools.find((p) => p.id === pool_id) || {
      id: pool_id,
      name: 'Piscina em Auditoria',
      volume_m3: 100,
      status: 'NORMAL' as const,
      gps_lat: gps_lat || -16.4251,
      gps_lng: gps_lng || -39.0624,
    };

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

    // 6. Preparação do Log consolidado
    const newLog = {
      id: `log-${Date.now()}`,
      pool_id,
      maintainer_id,
      log_date: new Date().toISOString(),
      ph: Number(ph),
      chlorine_ppm: Number(chlorine_ppm),
      alkalinity_ppm: alkalinity_ppm ? Number(alkalinity_ppm) : undefined,
      acid_product_used: Boolean(acid_product_used),
      brushed_surface: Boolean(brushed_surface),
      backwashed_filter: Boolean(backwashed_filter),
      liability_accepted: true,
      is_audit_flagged: chemicalAudit.isRedZone || chemicalAudit.isWarrantySuspended,
      flag_reason: chemicalAudit.flags.join(' | '),
      calculation_memory: doseCalc,
      evidences: evidences || [],
      audit_result: chemicalAudit,
    };

    // 7. Simulação de Disparo Imediato via Evolution API (WhatsApp) caso haja violação
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

    return NextResponse.json({
      success: true,
      log: newLog,
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
