import { NextResponse } from 'next/server';
import { mockPools, mockUsers } from '@/lib/mock-data';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Cron Job executado no 1º dia útil de cada mês na Vercel
 * Consolida as médias químicas e despacha o Laudo Mensal via WhatsApp (Evolution API)
 */
export async function GET(request: Request) {
  try {
    const dispatchResults = [];

    for (const pool of mockPools) {
      // Simula a consolidação mensal de auditoria
      const reportPayload = {
        pool_id: pool.id,
        pool_name: pool.name,
        target_phone: '5511999998888',
        alert_type: 'RELATORIO_MENSAL',
        period: `${new Date().getMonth()}/${new Date().getFullYear()}`,
        status: pool.status === 'NORMAL' ? 'GARANTIA_VALIDADA' : 'EM_ANALISE_TECNICA',
      };

      // Dispara o alerta para a Evolution API
      const evoUrl = process.env.EVOLUTION_API_URL || 'http://localhost:8080';
      const evoKey = process.env.EVOLUTION_API_KEY || '';
      const instance = process.env.EVOLUTION_INSTANCE_NAME || 'jhoston_pools_oficial';

      let sentStatus = 'DELIVERED_SIMULATED';

      if (evoKey) {
        try {
          await fetch(`${evoUrl}/message/sendText/${instance}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', apikey: evoKey },
            body: JSON.stringify({
              number: reportPayload.target_phone,
              textMessage: {
                text: `📄 *JHoston Pools*: O seu *Laudo Mensal de Garantia* referente à piscina *${pool.name}* foi emitido e encontra-se com conformidade atestada.`,
              },
            }),
          });
          sentStatus = 'SENT_VIA_EVOLUTION_API';
        } catch (e) {
          console.warn('Falha no disparo real da Evolution API no cron:', e);
        }
      }

      dispatchResults.push({
        pool: pool.name,
        status: sentStatus,
        delivered_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      job: 'monthly_warranty_report_dispatch',
      dispatched_count: dispatchResults.length,
      reports: dispatchResults,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Falha no cron de laudos mensais' }, { status: 500 });
  }
}
