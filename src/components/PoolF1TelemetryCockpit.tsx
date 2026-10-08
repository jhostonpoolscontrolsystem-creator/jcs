'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Droplets, 
  Gauge, 
  Layers, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  Sparkles, 
  Thermometer, 
  TrendingDown, 
  TrendingUp, 
  Wind, 
  X, 
  Zap,
  ArrowUpRight,
  Sliders,
  History
} from 'lucide-react';
import { HistoricalTelemetryChart } from './HistoricalTelemetryChart';

export interface F1TelemetryPool {
  id: string;
  name: string;
  clientName: string;
  volume_m3: number;
  flow_rate_m3h: number;
  pool_type: string;
  coating_type: string;
  ph: number;
  chlorine_ppm: number;
  alkalinity_ppm: number;
  calcium_hardness_ppm: number;
  temperature_c: number;
  lsi: number;
  last_maintenance: string;
  maintainer_name: string;
  status: 'OPTIMAL' | 'ATTENTION' | 'CRITICAL';
  health_score: number;
  cure_days_left?: number;
}

interface PoolF1TelemetryCockpitProps {
  pool: F1TelemetryPool;
  isOpen: boolean;
  onClose: () => void;
  onSelectAnotherPool?: (poolId: string) => void;
  availablePools?: F1TelemetryPool[];
}

export default function PoolF1TelemetryCockpit({
  pool,
  isOpen,
  onClose,
  onSelectAnotherPool,
  availablePools = []
}: PoolF1TelemetryCockpitProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'TELEMETRY' | 'HISTORY' | 'DIAGNOSTIC'>('TELEMETRY');

  if (!isOpen) return null;

  // Helpers de Formatação e Zonas F1
  const isPhOptimal = pool.ph >= 7.2 && pool.ph <= 7.6;
  const isChlorineOptimal = pool.chlorine_ppm >= 1.5 && pool.chlorine_ppm <= 3.0;
  const isAlkalinityOptimal = pool.alkalinity_ppm >= 80 && pool.alkalinity_ppm <= 120;
  const isLsiBalanced = pool.lsi >= -0.3 && pool.lsi <= 0.3;

  // LSI Status Label & Color
  const getLsiVerdict = (lsi: number) => {
    if (lsi < -0.3) return { text: 'AGRESSIVA / CORROSIVA', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' };
    if (lsi > 0.3) return { text: 'INCRUSTANTE / TURVA', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
    return { text: 'EQUILÍBRIO IDEAL (BLINDAGEM)', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
  };

  const lsiVerdict = getLsiVerdict(pool.lsi);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className={`bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/80 flex flex-col transition-all duration-300 overflow-hidden ${
          fullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-7xl max-h-[94vh]'
        }`}
      >
        {/* F1 TOP BAR / TELEMETRY HEADER */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400 shadow-inner flex items-center justify-center">
              <Gauge className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest font-black uppercase text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                  F1 PIT-WALL TELEMETRY
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {pool.clientName}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                {pool.name}
                <span className="text-xs font-mono font-normal text-slate-400 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800">
                  {pool.volume_m3} m³ • Vazão: {pool.flow_rate_m3h} m³/h
                </span>
              </h2>
            </div>
          </div>

          {/* Quick Pool Switcher (Se houver outras piscinas do mesmo cliente) */}
          {availablePools.length > 1 && onSelectAnotherPool && (
            <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 pl-2">Piscina:</span>
              <select
                value={pool.id}
                onChange={(e) => onSelectAnotherPool(e.target.value)}
                className="bg-slate-950 text-cyan-300 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-400"
              >
                {availablePools.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.status})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Controls & Badges */}
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1.5 rounded-xl text-xs font-mono font-black flex items-center gap-1.5 border ${
              pool.status === 'OPTIMAL'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : pool.status === 'ATTENTION'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              <Activity className="w-3.5 h-3.5" />
              HEALTH SCORE: {pool.health_score}%
            </div>

            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors"
              title={fullscreen ? 'Janela normal' : 'Tela cheia'}
            >
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-rose-400 bg-slate-900 hover:bg-rose-950/40 rounded-xl border border-slate-800 hover:border-rose-800/40 transition-colors"
              title="Fechar cockpit"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* F1 SUB-HEADER NAV */}
        <div className="px-5 py-2.5 bg-slate-950/70 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTelemetryTab('TELEMETRY')}
              className={`px-3 py-1 rounded-lg font-bold tracking-wide transition-all ${
                activeTelemetryTab === 'TELEMETRY'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              TACÔMETROS & TELEMETRIA AO VIVO
            </button>
            <button
              onClick={() => setActiveTelemetryTab('HISTORY')}
              className={`px-3 py-1 rounded-lg font-bold tracking-wide transition-all ${
                activeTelemetryTab === 'HISTORY'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              SÉRIE HISTÓRICA & CURVAS
            </button>
            <button
              onClick={() => setActiveTelemetryTab('DIAGNOSTIC')}
              className={`px-3 py-1 rounded-lg font-bold tracking-wide transition-all ${
                activeTelemetryTab === 'DIAGNOSTIC'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              PIT STOP QUÍMICO & LAUDO
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-slate-400 font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Último Pit Stop: {pool.last_maintenance}
            </span>
            <span className="text-slate-700">|</span>
            <span>Tratador: <strong className="text-slate-300">{pool.maintainer_name}</strong></span>
          </div>
        </div>

        {/* BODY VIEW */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTelemetryTab === 'TELEMETRY' && (
            <>
              {/* ROW 1: F1 GAUGES (TACOMETROS DIGITAIS) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* TACÔMETRO pH */}
                <div className={`p-4 rounded-2xl border transition-all relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/80 ${
                  isPhOptimal ? 'border-emerald-500/30 hover:border-emerald-500/50' : 'border-rose-500/40 hover:border-rose-500/60 shadow-lg shadow-rose-950/30'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono font-bold uppercase text-slate-400">Potencial Hidrogeniônico</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-black border ${
                      isPhOptimal ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      ALVO: 7.2 - 7.6
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 my-2">
                    <span className={`text-4xl font-black font-mono tracking-tight ${
                      isPhOptimal ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {pool.ph.toFixed(1)}
                    </span>
                    <span className="text-xs font-mono text-slate-500">pH un.</span>
                  </div>

                  {/* F1 Gauge Progress Bar */}
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isPhOptimal ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-rose-500 to-red-600'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(0, ((pool.ph - 6.5) / 2.0) * 100))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>6.5 (Ácido)</span>
                    <span className="text-emerald-400 font-bold">Ideal 7.4</span>
                    <span>8.5 (Alcalino)</span>
                  </div>
                </div>

                {/* TACÔMETRO CLORO RESIDUAL */}
                <div className={`p-4 rounded-2xl border transition-all relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/80 ${
                  isChlorineOptimal ? 'border-cyan-500/30 hover:border-cyan-500/50' : 'border-amber-500/40 hover:border-amber-500/60'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono font-bold uppercase text-slate-400">Cloro Livre Residual</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-black border ${
                      isChlorineOptimal ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      ALVO: 1.5 - 3.0
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 my-2">
                    <span className={`text-4xl font-black font-mono tracking-tight ${
                      isChlorineOptimal ? 'text-cyan-400' : 'text-amber-400'
                    }`}>
                      {pool.chlorine_ppm.toFixed(1)}
                    </span>
                    <span className="text-xs font-mono text-slate-500">ppm</span>
                  </div>

                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, (pool.chlorine_ppm / 5.0) * 100))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>0.0 ppm</span>
                    <span className="text-cyan-400 font-bold">Ideal 2.0 ppm</span>
                    <span>5.0 ppm</span>
                  </div>
                </div>

                {/* TACÔMETRO ALCALINIDADE TOTAL */}
                <div className={`p-4 rounded-2xl border transition-all relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/80 ${
                  isAlkalinityOptimal ? 'border-indigo-500/30 hover:border-indigo-500/50' : 'border-amber-500/40 hover:border-amber-500/60'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono font-bold uppercase text-slate-400">Alcalinidade Total</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-black border ${
                      isAlkalinityOptimal ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      ALVO: 80 - 120
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 my-2">
                    <span className={`text-4xl font-black font-mono tracking-tight ${
                      isAlkalinityOptimal ? 'text-indigo-400' : 'text-amber-400'
                    }`}>
                      {pool.alkalinity_ppm}
                    </span>
                    <span className="text-xs font-mono text-slate-500">ppm</span>
                  </div>

                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, (pool.alkalinity_ppm / 200) * 100))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>40 ppm</span>
                    <span className="text-indigo-400 font-bold">Ideal 100 ppm</span>
                    <span>180 ppm</span>
                  </div>
                </div>

                {/* TACÔMETRO TEMPERATURA / COND. */}
                <div className="p-4 rounded-2xl border border-slate-800 hover:border-slate-700 bg-gradient-to-b from-slate-900/90 to-slate-950/80">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono font-bold uppercase text-slate-400">Termometria da Água</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-black bg-slate-800 text-slate-300 border border-slate-700">
                      SENSOR LIVE
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 my-2">
                    <span className="text-4xl font-black font-mono tracking-tight text-white">
                      {pool.temperature_c}°C
                    </span>
                    <span className="text-xs font-mono text-slate-500">Dureza: {pool.calcium_hardness_ppm} ppm</span>
                  </div>

                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-teal-400 to-amber-500 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, ((pool.temperature_c - 15) / 25) * 100))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>15°C</span>
                    <span className="text-teal-400 font-bold">Resort Aquecida</span>
                    <span>36°C</span>
                  </div>
                </div>
              </div>

              {/* ROW 2: F1 LANGELIER SATURATION INDEX (LSI COCKPIT DIAL) */}
              <div className="p-5 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
                      <h3 className="text-sm font-mono font-bold tracking-widest text-slate-300 uppercase">
                        Índice de Saturação Langelier (LSI Telemetry)
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                      Equação de equilíbrio físico-químico entre pH, Alcalinidade, Dureza Cálcica, Temperatura e Sólidos Dissolvidos (TDS). Garante a blindagem total da matriz mineral do monólito JHostonTec.
                    </p>
                  </div>

                  {/* LSI Value & Dial Visual */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 block uppercase">Índice Calculado</span>
                      <span className={`text-4xl font-mono font-black ${lsiVerdict.color}`}>
                        {pool.lsi > 0 ? `+${pool.lsi.toFixed(2)}` : pool.lsi.toFixed(2)}
                      </span>
                    </div>

                    <div className={`px-4 py-3 rounded-2xl border ${lsiVerdict.bg} ${lsiVerdict.border} text-center`}>
                      <span className={`text-xs font-mono font-black block ${lsiVerdict.color}`}>
                        {lsiVerdict.text}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Tolerância Segura: -0.30 a +0.30
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dial Bar F1 */}
                <div className="mt-5 pt-4 border-t border-slate-800">
                  <div className="relative h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden flex">
                    <div className="w-1/3 bg-rose-600/40 text-[9px] font-mono font-bold flex items-center justify-center text-rose-300">
                      ZONA CORROSIVA (&lt; -0.3)
                    </div>
                    <div className="w-1/3 bg-emerald-600/40 text-[9px] font-mono font-bold flex items-center justify-center text-emerald-300 border-x border-emerald-500/40">
                      ZONA DE EQUILÍBRIO (-0.3 a +0.3)
                    </div>
                    <div className="w-1/3 bg-amber-600/40 text-[9px] font-mono font-bold flex items-center justify-center text-amber-300">
                      ZONA INCRUSTANTE (&gt; +0.3)
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 3: SÉRIE HISTÓRICA INTEGRADA */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    Telemetria das Séries Históricas (Últimos 14 dias)
                  </h4>
                  <span className="text-[11px] text-cyan-400 font-mono">
                    Faixa de Tolerância JHostonTec Ativa
                  </span>
                </div>
                <HistoricalTelemetryChart poolName={pool.name} volumeM3={pool.volume_m3} />
              </div>
            </>
          )}

          {activeTelemetryTab === 'HISTORY' && (
            <div className="space-y-4">
              <HistoricalTelemetryChart poolName={pool.name} volumeM3={pool.volume_m3} />
              
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
                <span className="font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Auditoria de Conformidade Histórica
                </span>
                <p className="text-slate-400 leading-relaxed">
                  As medições físicas e químicas coletadas via PWA do tratador são registradas com carimbo de tempo inviolável, geolocalização e fotos da cubeta colorimétrica. A estabilidade continuada das curvas assegura a validade dos 10 anos de garantia do monólito.
                </p>
              </div>
            </div>
          )}

          {activeTelemetryTab === 'DIAGNOSTIC' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Prescrição F1 Pit Stop Químico */}
              <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-500/30 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                      Prescrição de Pit Stop Químico
                    </h4>
                    <span className="text-xs text-slate-400">Rebalanceamento estequiométrico para {pool.volume_m3} m³</span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Bicarbonato de Sódio (Alcalinidade)</span>
                    <span className="text-emerald-400 font-bold">
                      {isAlkalinityOptimal ? 'Nível Conforme (0 g)' : 'Dosar 1.8 kg'}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Barrilha Leve / Carbonato (pH Up)</span>
                    <span className="text-emerald-400 font-bold">
                      {isPhOptimal ? 'Nível Conforme (0 g)' : 'Dosar 900 g'}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Cloro Puro 65% (Desinfecção)</span>
                    <span className="text-cyan-400 font-bold">
                      {isChlorineOptimal ? 'Manutenção Diária (550 g)' : 'Reposição Necessária (1.2 kg)'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span><strong>REGRA DE OURO:</strong> Proibido uso de ácido muriático ou produtos corrosivos.</span>
                </div>
              </div>

              {/* Card 2: Status do Monólito & Garantia */}
              <div className="p-5 rounded-3xl bg-slate-900/80 border border-emerald-500/30 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                      Certificado de Blindagem Monolítica
                    </h4>
                    <span className="text-xs text-slate-400">Garantia Decenal Contratual (10 Anos)</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Tipo de Revestimento:</span>
                    <strong className="text-white">{pool.coating_type}</strong>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Status da Garantia:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% VÁLIDA E ATIVA
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Cura Submersa de 28 Dias:</span>
                    <strong className="text-cyan-400 font-mono">
                      {pool.cure_days_left !== undefined ? `${pool.cure_days_left} dias restantes` : 'Concluída com Sucesso'}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Laudo Mensal Automático:</span>
                    <strong className="text-slate-200">Disponível em PDF & WhatsApp</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* F1 FOOTER */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[11px]">
            SISTEMA JHPCS TELEMETRY ENGINE v4.2 • DADOS ATUALIZADOS EM TEMPO REAL
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold rounded-xl border border-slate-800 transition-colors"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
}
