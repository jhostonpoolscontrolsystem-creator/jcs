import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export interface PredictiveRiskInput {
  pool_id: string;
  pool_name: string;
  current_ph: number;
  current_cl: number;
  current_alkalinity: number;
  current_calcium_hardness: number;
  current_cya: number;
  water_temp_celsius: number;
  air_temp_celsius?: number;
  rain_forecast_next_48h_mm?: number;
  uv_index?: number;
  days_without_maintenance: number;
  is_curing_period: boolean;
  surface_type: 'SAND_AREIA' | 'QUARTZO' | 'MONOLITICO_PREMIUM';
}

export interface PredictiveRiskAnalysis {
  pool_id: string;
  lsi_index: number;
  corrosion_risk_score: number; // 0 a 100
  scale_risk_score: number; // 0 a 100
  staining_risk_score: number; // 0 a 100
  overall_integrity_score: number; // 0 a 100 (100 = perfeito)
  status: 'OPTIMAL' | 'MODERATE_RISK' | 'HIGH_ALERT' | 'RED_ZONE_CRITICAL';
  estimated_hours_to_acid_attack: number | null;
  predictive_factors: {
    factor: string;
    impact: 'FAVORAVEL' | 'NEUTRO' | 'AGRESSIVO' | 'CRITICO';
    details: string;
  }[];
  prescribed_countermeasures: string[];
  forensic_hash_sha256: string;
  analysis_timestamp: string;
}

/**
 * Cálculo do LSI (Langelier Saturation Index)
 */
function calculateLSI(
  ph: number,
  tempC: number,
  calciumHardness: number,
  alkalinity: number,
  cya: number = 30
): number {
  // Fatores aproximados da fórmula de Langelier
  const tempF = (tempC * 9/5) + 32;
  const tempFactor = (Math.log10(tempF) - 1.0) / 1.5; // proxy LSI temp
  const calciumFactor = Math.log10(Math.max(calciumHardness, 10)) - 0.4;
  
  // Alcalinidade corrigida por ácido cianúrico
  const correctedAlk = Math.max(alkalinity - (cya / 3), 10);
  const alkFactor = Math.log10(correctedAlk);

  // TDS factor padrão ~12.1
  const constant = 12.1;
  const pHs = (9.3 + 0.1 + calciumFactor + alkFactor) - tempFactor;
  const lsi = ph - (constant - (tempFactor * 0.1) - calciumFactor - alkFactor);
  
  return Number(Math.max(-2.5, Math.min(2.5, lsi)).toFixed(2));
}

/**
 * POST /api/ai/forensic-risk-score
 * Motor Preditivo de Risco Físico-Químico e Emissão de Dossiê Forense SHA-256
 */
export async function POST(req: NextRequest) {
  try {
    const body: PredictiveRiskInput = await req.json();

    const {
      pool_id,
      pool_name,
      current_ph = 7.2,
      current_cl = 2.0,
      current_alkalinity = 90,
      current_calcium_hardness = 220,
      current_cya = 30,
      water_temp_celsius = 28,
      rain_forecast_next_48h_mm = 0,
      uv_index = 6,
      days_without_maintenance = 2,
      is_curing_period = false,
      surface_type = 'SAND_AREIA'
    } = body;

    const lsi = calculateLSI(
      current_ph,
      water_temp_celsius,
      current_calcium_hardness,
      current_alkalinity,
      current_cya
    );

    // Avaliação de riscos (0 a 100)
    let corrosionScore = 10;
    let scaleScore = 10;
    let stainingScore = 15;
    const predictiveFactors = [];

    // Fator 1: pH
    if (current_ph < 6.8) {
      corrosionScore += 65;
      predictiveFactors.push({
        factor: 'pH em Zona Ácida Extrema (< 6.8)',
        impact: 'CRITICO' as const,
        details: 'Agressão direta à matriz de cimentação e polímeros do revestimento JHoston.'
      });
    } else if (current_ph < 7.2) {
      corrosionScore += 25;
      predictiveFactors.push({
        factor: 'pH Ligeiramente Deprimido (6.8 a 7.1)',
        impact: 'AGRESSIVO' as const,
        details: 'Tendência corrosiva e aceleração da perda de brilho superficial.'
      });
    } else if (current_ph > 7.8) {
      scaleScore += 45;
      predictiveFactors.push({
        factor: 'pH Alcalino Elevado (> 7.8)',
        impact: 'AGRESSIVO' as const,
        details: 'Risco de precipitação de carbonato de cálcio e formação de névoa esbranquiçada.'
      });
    }

    // Fator 2: LSI
    if (lsi < -0.3) {
      corrosionScore += 25;
      predictiveFactors.push({
        factor: `Índice LSI Corrosivo (${lsi})`,
        impact: 'CRITICO' as const,
        details: 'Água com fome de cálcio dissolverá os minerais livres da superfície monolítica.'
      });
    } else if (lsi > 0.3) {
      scaleScore += 30;
      predictiveFactors.push({
        factor: `Índice LSI Incrustante (+${lsi})`,
        impact: 'AGRESSIVO' as const,
        details: 'Tendência de incrustação e aspereza na textura de toque da piscina.'
      });
    } else {
      predictiveFactors.push({
        factor: `Índice LSI Equilibrado (${lsi})`,
        impact: 'FAVORAVEL' as const,
        details: 'Água em saturação perfeita. Protege integralmente a garantia decenal.'
      });
    }

    // Fator 3: Chuva e Clima
    if (rain_forecast_next_48h_mm > 25) {
      corrosionScore += 15;
      stainingScore += 20;
      predictiveFactors.push({
        factor: `Alerta Pluviométrico (${rain_forecast_next_48h_mm}mm em 48h)`,
        impact: 'AGRESSIVO' as const,
        details: 'Água da chuva possui pH natural ácido (~5.6) e carrega particulados orgânicos.'
      });
    }

    // Fator 4: Período de Cura (Primeiros 35 dias)
    if (is_curing_period) {
      predictiveFactors.push({
        factor: 'Obra em Período de Cura Monolítica (35 Dias)',
        impact: 'AGRESSIVO' as const,
        details: 'Superfície mineral em maturação ativa. Exige tolerância zero a desvios de pH.'
      });
      corrosionScore = Math.min(100, corrosionScore * 1.3);
    }

    // Fator 5: Dias sem manutenção
    if (days_without_maintenance > 4) {
      stainingScore += 30;
      predictiveFactors.push({
        factor: `Ausência de Tratamento (${days_without_maintenance} dias)`,
        impact: 'AGRESSIVO' as const,
        details: 'Proliferação iminente de biofilme de algas e queda do residual sanitizante.'
      });
    }

    corrosionScore = Math.min(100, Math.round(corrosionScore));
    scaleScore = Math.min(100, Math.round(scaleScore));
    stainingScore = Math.min(100, Math.round(stainingScore));

    const overallIntegrityScore = Math.max(0, 100 - Math.round((corrosionScore * 0.5) + (scaleScore * 0.3) + (stainingScore * 0.2)));

    let status: 'OPTIMAL' | 'MODERATE_RISK' | 'HIGH_ALERT' | 'RED_ZONE_CRITICAL' = 'OPTIMAL';
    let estimatedHoursToAcidAttack: number | null = null;

    if (corrosionScore >= 70 || current_ph < 6.8) {
      status = 'RED_ZONE_CRITICAL';
      estimatedHoursToAcidAttack = 12;
    } else if (corrosionScore >= 45 || scaleScore >= 50) {
      status = 'HIGH_ALERT';
      estimatedHoursToAcidAttack = 48;
    } else if (corrosionScore >= 25 || scaleScore >= 30) {
      status = 'MODERATE_RISK';
    }

    // Contramedidas
    const countermeasures: string[] = [];
    if (current_ph < 7.2) {
      countermeasures.push('Dosar Barrilha Leve (Carbonato de Sódio) imediatamente conforme volume.');
    }
    if (rain_forecast_next_48h_mm > 20) {
      countermeasures.push('Aumentar preventivamente a reserva alcalina para 120 ppm antes da frente de chuva.');
    }
    if (lsi < -0.3) {
      countermeasures.push('Corrigir Dureza Cálcica com Cloreto de Cálcio para estabilização do LSI.');
    }
    if (countermeasures.length === 0) {
      countermeasures.push('Parâmetros em conformidade total. Manter ciclo normal de filtração e sanitização.');
    }

    const timestamp = new Date().toISOString();
    const forensicPayload = `${pool_id}|${pool_name}|${lsi}|${overallIntegrityScore}|${timestamp}|JH_FORENSIC_V1`;
    const forensicHash = crypto.createHash('sha256').update(forensicPayload).digest('hex');

    const result: PredictiveRiskAnalysis = {
      pool_id,
      lsi_index: lsi,
      corrosion_risk_score: corrosionScore,
      scale_risk_score: scaleScore,
      staining_risk_score: stainingScore,
      overall_integrity_score: overallIntegrityScore,
      status,
      estimated_hours_to_acid_attack: estimatedHoursToAcidAttack,
      predictive_factors: predictiveFactors,
      prescribed_countermeasures: countermeasures,
      forensic_hash_sha256: forensicHash,
      analysis_timestamp: timestamp
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Erro no cálculo preditivo de risco:', error);
    return NextResponse.json(
      { error: 'Falha ao processar análise preditiva.', details: error.message },
      { status: 500 }
    );
  }
}
