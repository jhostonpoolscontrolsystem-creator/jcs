import { NextRequest, NextResponse } from 'next/server';
import { syncWeatherGridsAndPredict } from '@/lib/weather/predictiveEngine';
import { supabase } from '@/lib/supabase';
import { sendTextMessage, getConnectionState } from '@/lib/whatsapp/evolutionClient';

/**
 * Cron Job Meteorológico Preditivo 48h
 * Executado periodicamente via Vercel Cron Jobs (a cada 6h ou 12h)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Se CRON_SECRET estiver configurado no ambiente, valida permissão
    if (cronSecret && authHeader !== `Bearer ${cronSecret}` && searchParams.get('key') !== cronSecret) {
      // Permite bypass se for invocação manual em ambiente de desenvolvimento
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Acesso não autorizado para cron job.' }, { status: 401 });
      }
    }

    // 1. Executa a sincronização econômica com cache espacial de 6h
    const syncResult = await syncWeatherGridsAndPredict();

    // 2. Filtra alertas críticos ou de alta severidade gerados
    const criticalOrHighAlerts = syncResult.alerts.filter(
      (a) => a.severity === 'CRITICAL' || a.severity === 'HIGH'
    );

    // 3. Notificação consolidada via WhatsApp (Evolution API)
    // Agrupa alertas por tenant para não fazer spam (máximo 1 resumo diário)
    let whatsappDispatchesCount = 0;
    if (criticalOrHighAlerts.length > 0) {
      const alertsByTenant = new Map<string, typeof criticalOrHighAlerts>();
      criticalOrHighAlerts.forEach((alert) => {
        if (!alertsByTenant.has(alert.tenant_id)) {
          alertsByTenant.set(alert.tenant_id, []);
        }
        alertsByTenant.get(alert.tenant_id)!.push(alert);
      });

      for (const [tenantId, tenantAlerts] of alertsByTenant.entries()) {
        try {
          // Busca configurações do tenant
          const { data: tenantSettings } = await supabase
            .from('tenant_settings')
            .select('whatsapp_instance_name, whatsapp_instance_status, whatsapp_number')
            .eq('tenant_id', tenantId)
            .maybeSingle();

          if (tenantSettings && tenantSettings.whatsapp_instance_status === 'CONNECTED') {
            const instanceName = tenantSettings.whatsapp_instance_name;
            const recipientPhone = tenantSettings.whatsapp_number;

            // Valida conexão ao vivo
            const conn = await getConnectionState(instanceName);
            if (conn.state === 'open' && recipientPhone) {
              const alertSummaryText =
                `🚨 *JHPCS — RADAR METEOROLÓGICO & QUÍMICO 48H*\n\n` +
                `Detectamos condições climáticas severas que afetam ${tenantAlerts.length} piscina(s) da sua carteira nas próximas 48 horas:\n\n` +
                tenantAlerts
                  .slice(0, 3)
                  .map(
                    (a, i) =>
                      `*${i + 1}. ${a.title}*\n` +
                      `📋 *Ação Preventiva:* ${a.preventive_dosage_instruction.slice(0, 160)}...\n`
                  )
                  .join('\n') +
                `\n👉 Acesse o Cockpit para marcar as aplicações preventivas concluídas: https://jhpcs.vercel.app/`;

              await sendTextMessage(instanceName, recipientPhone, alertSummaryText);
              whatsappDispatchesCount++;
            }
          }
        } catch (waErr) {
          console.warn(`[WeatherCron] Falha ao enviar resumo WhatsApp para tenant ${tenantId}:`, waErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      job: 'predictive_weather_sync_48h',
      executed_at: new Date().toISOString(),
      summary: {
        gridsProcessed: syncResult.gridsProcessed,
        gridsFetchedFromApi: syncResult.gridsFetchedFromApi,
        gridsFromCache: syncResult.gridsFromCache,
        poolsEvaluated: syncResult.poolsEvaluated,
        alertsGenerated: syncResult.alertsGenerated,
        criticalAlertsCount: criticalOrHighAlerts.length,
        whatsappDispatchesCount,
      },
      sampleAlerts: criticalOrHighAlerts.slice(0, 5),
    });
  } catch (error: any) {
    console.error('Erro na execução do Cron Job Meteorológico Preditivo:', error);
    return NextResponse.json(
      { error: error?.message || 'Falha ao executar sincronização meteorológica preditiva.' },
      { status: 500 }
    );
  }
}

