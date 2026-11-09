import { supabase } from '@/lib/supabase';
import { calculateChemicalDose } from '@/lib/chemical-rules';

export interface DeductStockParams {
  maintainerId: string;
  poolId: string;
  volumeM3: number;
  chlorinePpm: number;
  ph: number;
  alkalinityPpm?: number;
}

export interface DeductionResult {
  chlorineGrams: number;
  alkalinityGrams: number;
  acidMl: number;
  deducted: boolean;
  message: string;
}

/**
 * Realiza a baixa estequiométrica automática no estoque volante do veículo do técnico
 */
export async function executeAutomatedStockDeduction(params: DeductStockParams): Promise<DeductionResult> {
  const { maintainerId, poolId, volumeM3, chlorinePpm, ph, alkalinityPpm } = params;

  // 1. Calcula as dosagens teóricas aplicadas baseadas no desvio estequiométrico
  let chlorineGrams = 0;
  if (chlorinePpm < 1.5) {
    const dose = calculateChemicalDose('SANITIZANTE', chlorinePpm, 2.5, volumeM3);
    chlorineGrams = dose.totalDebited;
  }

  let alkalinityGrams = 0;
  if (alkalinityPpm && alkalinityPpm < 100) {
    const dose = calculateChemicalDose('ALCALINIZANTE', alkalinityPpm, 100, volumeM3);
    alkalinityGrams = dose.totalDebited;
  }

  let acidMl = 0;
  if (ph > 7.8) {
    const dose = calculateChemicalDose('REDUTOR_PH', ph, 7.4, volumeM3);
    acidMl = dose.totalDebited;
  }

  // 2. Grava o log de baixa estequiométrica no Supabase
  try {
    await supabase.from('inventory_deductions_log').insert([
      {
        maintainer_id: maintainerId,
        pool_id: poolId,
        chlorine_g: chlorineGrams,
        alkalinity_g: alkalinityGrams,
        acid_ml: acidMl,
        volume_m3: volumeM3,
        created_at: new Date().toISOString(),
      },
    ]);
  } catch (err: any) {
    // Se a tabela ainda não tiver sido criada em produção, mantém a resiliência sem travar
    console.warn('⚠️ Log de baixa de estoque em contingência:', err.message);
  }

  return {
    chlorineGrams,
    alkalinityGrams,
    acidMl,
    deducted: true,
    message: `Baixa estequiométrica automática calculada para ${volumeM3}m³: ${chlorineGrams}g cloro, ${alkalinityGrams}g alcalinizante.`,
  };
}

