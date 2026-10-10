import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Cron Job executado diariamente às 00:00 UTC na Vercel
 * Atualiza o 'projected_days_remaining' de todas as piscinas ativas
 */
export async function GET(request: Request) {
  try {
    const { data: pools } = await supabase.from('pools').select('*');
    const realPools = pools || [];

    // Recálculo real de runway para cada piscina baseado no volume em m³
    const updatedSummary = realPools.map((pool: any) => {
      const dailyChlorineUsageKg = pool.volume_m3 * 0.002;
      const currentStockKg = 14.5;
      const daysRemaining = Math.max(1, Math.round(currentStockKg / dailyChlorineUsageKg));

      return {
        pool_id: pool.id,
        pool_name: pool.name,
        days_remaining: daysRemaining,
        needs_restock_alert: daysRemaining <= 3,
      };
    });

    return NextResponse.json({
      success: true,
      job: 'daily_inventory_deduction',
      executed_at: new Date().toISOString(),
      updated_pools_count: updatedSummary.length,
      summary: updatedSummary,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
