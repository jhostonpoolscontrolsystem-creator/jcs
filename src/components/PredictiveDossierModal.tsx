'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CloudRain, 
  Sun, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Layers, 
  Hash, 
  Calendar,
  X,
  Droplet
} from 'lucide-react';

interface PredictiveDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  poolItem: any;
}

export function PredictiveDossierModal({ isOpen, onClose, poolItem }: PredictiveDossierModalProps) {
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  if (!isOpen || !poolItem) return null;

  const handleRunPredictiveEngine = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/forensic-risk-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pool_id: poolItem.pool_id || 'pool-001',
          pool_name: poolItem.pool_name || 'Piscina Principal',
          current_ph: 7.1, // Exemplo ligeiramente ácido para avaliar risco
          current_cl: 1.8,
          current_alkalinity: 85,
          current_calcium_hardness: 210,
          current_cya: 35,
          water_temp_celsius: 29,
          rain_forecast_next_48h_mm: 32, // Frente de chuva prevista
          uv_index: 8,
          days_without_maintenance: 2,
          is_curing_period: poolItem.pool_id?.includes('a0000002') || false,
          surface_type: 'SAND_AREIA'
        })
      });
      const data = await res.json();
      setAnalysisResult(data);
    } catch (e) {
      console.error('Falha ao rodar motor preditivo:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                Motor Preditivo LSI & IA Forense
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                  SHA-256
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Detecção antecipada de corrosão ácida por termodinâmica de fluidos e meteorologia
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informações da Piscina */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Ativo Monolítico</span>
            <span className="font-bold text-white truncate block">{poolItem.pool_name}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Cliente</span>
            <span className="font-semibold text-slate-300 truncate block">{poolItem.client_name}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Revestimento</span>
            <span className="font-mono text-cyan-400">JHoston Sand</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Previsão Chuva</span>
            <span className="font-mono text-amber-300 flex items-center gap-1">
              <CloudRain className="w-3.5 h-3.5" /> 32mm / 48h
            </span>
          </div>
        </div>

        {/* Botão de Rodar ou Resultados */}
        {!analysisResult ? (
          <div className="text-center py-8 space-y-4 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
            <Activity className="w-12 h-12 text-cyan-500 mx-auto animate-pulse" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Análise Preditiva Pronta para Execução</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                O motor correlacionará dados do teste de pH, dureza cálcica, LSI, temperatura da água e a frente de chuva prevista para calcular o risco de agressão ao revestimento.
              </p>
            </div>
            <button
              onClick={handleRunPredictiveEngine}
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Calculando tensores e fatores climáticos...' : 'Calcular Score de Risco e Gerar Dossiê'}
            </button>
          </div>
        ) : (
          <div className="space-y-5 animate-fadeIn">
            {/* Cards de Risco */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Índice LSI</span>
                <div className={`text-xl font-black font-mono ${analysisResult.lsi_index < -0.3 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {analysisResult.lsi_index}
                </div>
                <span className="text-[10px] text-slate-500 block">Saturação hídrica</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Risco de Corrosão</span>
                <div className="text-xl font-black font-mono text-amber-400">
                  {analysisResult.corrosion_risk_score}%
                </div>
                <span className="text-[10px] text-slate-500 block">Ataque à resina</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Risco Incrustação</span>
                <div className="text-xl font-black font-mono text-cyan-400">
                  {analysisResult.scale_risk_score}%
                </div>
                <span className="text-[10px] text-slate-500 block">Aspereza mineral</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Score de Integridade</span>
                <div className="text-xl font-black font-mono text-emerald-400">
                  {analysisResult.overall_integrity_score}/100
                </div>
                <span className="text-[10px] text-slate-500 block">Saúde do monólito</span>
              </div>
            </div>

            {/* Fatores Preditivos Identificados */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
                Diagnóstico Termodinâmico & Fatores de Risco:
              </span>
              <div className="space-y-2">
                {analysisResult.predictive_factors.map((f: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 text-xs">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 mt-0.5 ${
                      f.impact === 'CRITICO' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      f.impact === 'AGRESSIVO' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {f.impact}
                    </span>
                    <div className="space-y-0.5">
                      <div className="font-bold text-white">{f.factor}</div>
                      <div className="text-slate-400 text-[11px]">{f.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contramedidas Prescritas */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2 text-xs">
              <span className="font-bold text-cyan-300 uppercase tracking-wider block font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Prescrição Estequiométrica de Engenharia:
              </span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                {analysisResult.prescribed_countermeasures.map((c: string, idx: number) => (
                  <li key={idx} className="text-[11px]">{c}</li>
                ))}
              </ul>
            </div>

            {/* Chave Forense SHA-256 */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                <span className="flex items-center gap-1"><Hash className="w-3 h-3 text-cyan-400" /> Hash Pericial SHA-256 Inviolável:</span>
                <span>{new Date(analysisResult.analysis_timestamp).toLocaleString('pt-BR')}</span>
              </div>
              <div className="font-mono text-[11px] text-cyan-300 break-all select-all bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                {analysisResult.forensic_hash_sha256}
              </div>
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
          <span className="text-[10px] text-slate-500 font-mono">
            *Dossiê emitido sob protocolo da Diretoria de Engenharia JHoston Pools.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
