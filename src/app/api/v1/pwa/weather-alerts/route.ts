import { NextRequest, NextResponse } from 'next/server';
import { getActivePredictiveAlerts } from '@/lib/weather/predictiveEngine';

/**
 * Endpoint de baixa latência para o PWA de Campo (c:\JHPCS-campo)
 * Retorna alertas meteorológicos e químicos já pré-calculados pelo Core,
 * permitindo que o tratador veja a dosagem preventiva mesmo offline (após sincronização prévia)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const poolId = searchParams.get('poolId') || undefined;
    const tenantId = searchParams.get('tenantId') || 'demo-fleet';

    const alerts = await getActivePredictiveAlerts({ poolId, tenantId });

    return NextResponse.json(
      {
        success: true,
        source: 'JHPCS_SPATIAL_GRID_PREDICTIVE_CACHE',
        cached_at: new Date().toISOString(),
        alerts_count: alerts.length,
        alerts,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Falha ao carregar alertas meteorológicos preditivos.' },
      { status: 500 }
    );
  }
}

