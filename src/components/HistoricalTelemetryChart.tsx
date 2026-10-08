'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Activity, 
  Calendar, 
  Droplet, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Maximize2
} from 'lucide-react';

export interface ChemicalHistoryPoint {
  date: string;
  formattedDate: string;
  ph: number;
  chlorine: number;
  alkalinity: number;
  lsi: number;
  weatherCondition: string;
  status: 'NORMAL' | 'WARNING' | 'RED_ZONE';
}

interface HistoricalTelemetryChartProps {
  poolName: string;
  volumeM3: number;
  history?: ChemicalHistoryPoint[];
}

export function HistoricalTelemetryChart({
  poolName,
  volumeM3,
  history,
}: HistoricalTelemetryChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<'PH' | 'CHLORINE' | 'ALKALINITY' | 'LSI'>('PH');
  const [activeRange, setActiveRange] = useState<'7D' | '14D' | '30D'>('14D');
  const [hoveredPoint, setHoveredPoint] = useState<ChemicalHistoryPoint | null>(null);

  // Séries temporais históricas simuladas realistas (14 dias)
  const defaultHistory: ChemicalHistoryPoint[] = [
    { date: '2026-09-25', formattedDate: '25/09', ph: 7.5, chlorine: 2.2, alkalinity: 100, lsi: 0.05, weatherCondition: 'Ensolarado', status: 'NORMAL' },
    { date: '2026-09-26', formattedDate: '26/09', ph: 7.4, chlorine: 2.0, alkalinity: 95, lsi: 0.02, weatherCondition: 'Ensolarado', status: 'NORMAL' },
    { date: '2026-09-27', formattedDate: '27/09', ph: 7.6, chlorine: 1.8, alkalinity: 90, lsi: 0.10, weatherCondition: 'Parcialmente Nublado', status: 'NORMAL' },
    { date: '2026-09-28', formattedDate: '28/09', ph: 7.3, chlorine: 2.5, alkalinity: 110, lsi: -0.05, weatherCondition: 'Chuva Fraca', status: 'NORMAL' },
    { date: '2026-09-29', formattedDate: '29/09', ph: 7.1, chlorine: 1.4, alkalinity: 70, lsi: -0.22, weatherCondition: 'Temporal', status: 'WARNING' },
    { date: '2026-09-30', formattedDate: '30/09', ph: 6.8, chlorine: 1.1, alkalinity: 60, lsi: -0.42, weatherCondition: 'Chuva Ácida', status: 'RED_ZONE' },
    { date: '2026-10-01', formattedDate: '01/10', ph: 7.2, chlorine: 2.8, alkalinity: 100, lsi: -0.08, weatherCondition: 'Correção c/ Bicarbonato', status: 'NORMAL' },
    { date: '2026-10-02', formattedDate: '02/10', ph: 7.4, chlorine: 2.4, alkalinity: 105, lsi: 0.04, weatherCondition: 'Ensolarado', status: 'NORMAL' },
    { date: '2026-10-03', formattedDate: '03/10', ph: 7.5, chlorine: 2.1, alkalinity: 100, lsi: 0.07, weatherCondition: 'Ensolarado', status: 'NORMAL' },
    { date: '2026-10-04', formattedDate: '04/10', ph: 7.4, chlorine: 2.2, alkalinity: 98, lsi: 0.03, weatherCondition: 'Ensolarado', status: 'NORMAL' },
    { date: '2026-10-05', formattedDate: '05/10', ph: 7.3, chlorine: 2.0, alkalinity: 95, lsi: -0.01, weatherCondition: 'Nublado', status: 'NORMAL' },
    { date: '2026-10-06', formattedDate: '06/10', ph: 7.5, chlorine: 2.3, alkalinity: 102, lsi: 0.06, weatherCondition: 'Ensolarado', status: 'NORMAL' },
    { date: '2026-10-07', formattedDate: '07/10', ph: 7.4, chlorine: 2.1, alkalinity: 100, lsi: 0.04, weatherCondition: 'Ensolarado', status: 'NORMAL' },
    { date: '2026-10-08', formattedDate: 'Hoje', ph: 7.5, chlorine: 2.2, alkalinity: 105, lsi: 0.08, weatherCondition: 'Céu Limpo', status: 'NORMAL' },
  ];

  const series = history && history.length > 0 ? history : defaultHistory;
  const filteredSeries = activeRange === '7D' ? series.slice(-7) : series;

  // Configurações específicas de cada grandeza
  const config = {
    PH: {
      name: 'Potencial Hidrogeniônico (pH)',
      unit: '',
      min: 6.0,
      max: 8.5,
      targetMin: 7.2,
      targetMax: 7.6,
      color: 'stroke-cyan-400',
      fillColor: 'from-cyan-500/20 to-transparent',
      dotColor: 'bg-cyan-400',
      getValue: (pt: ChemicalHistoryPoint) => pt.ph,
      format: (val: number) => val.toFixed(1),
    },
    CHLORINE: {
      name: 'Cloro Livre Residual',
      unit: 'ppm',
      min: 0.0,
      max: 4.0,
      targetMin: 1.5,
      targetMax: 3.0,
      color: 'stroke-emerald-400',
      fillColor: 'from-emerald-500/20 to-transparent',
      dotColor: 'bg-emerald-400',
      getValue: (pt: ChemicalHistoryPoint) => pt.chlorine,
      format: (val: number) => `${val.toFixed(1)} ppm`,
    },
    ALKALINITY: {
      name: 'Alcalinidade Total',
      unit: 'ppm',
      min: 40,
      max: 140,
      targetMin: 80,
      targetMax: 120,
      color: 'stroke-indigo-400',
      fillColor: 'from-indigo-500/20 to-transparent',
      dotColor: 'bg-indigo-400',
      getValue: (pt: ChemicalHistoryPoint) => pt.alkalinity,
      format: (val: number) => `${Math.round(val)} ppm`,
    },
    LSI: {
      name: 'Índice de Saturação Langelier (LSI)',
      unit: '',
      min: -0.6,
      max: 0.6,
      targetMin: -0.3,
      targetMax: 0.3,
      color: 'stroke-amber-400',
      fillColor: 'from-amber-500/20 to-transparent',
      dotColor: 'bg-amber-400',
      getValue: (pt: ChemicalHistoryPoint) => pt.lsi,
      format: (val: number) => (val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)),
    },
  }[selectedMetric];

  // Cálculo de coordenadas SVG responsivo
  const svgWidth = 700;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const getCoordinates = (index: number, val: number) => {
    const x = paddingX + (index / (filteredSeries.length - 1)) * (svgWidth - paddingX * 2);
    const normalizedY = (val - config.min) / (config.max - config.min);
    const y = svgHeight - paddingY - normalizedY * (svgHeight - paddingY * 2);
    return { x, y: Math.max(paddingY, Math.min(svgHeight - paddingY, y)) };
  };

  const pointsString = filteredSeries
    .map((pt, idx) => {
      const { x, y } = getCoordinates(idx, config.getValue(pt));
      return `${x},${y}`;
    })
    .join(' ');

  const areaString = `
    ${getCoordinates(0, config.getValue(filteredSeries[0])).x},${svgHeight - paddingY} 
    ${pointsString} 
    ${getCoordinates(filteredSeries.length - 1, config.getValue(filteredSeries[filteredSeries.length - 1])).x},${svgHeight - paddingY}
  `;

  // Faixa ideal (Target Area no gráfico)
  const targetTopY = getCoordinates(0, config.targetMax).y;
  const targetBottomY = getCoordinates(0, config.targetMin).y;

  const currentVal = config.getValue(filteredSeries[filteredSeries.length - 1]);
  const previousVal = config.getValue(filteredSeries[filteredSeries.length - 2]);
  const diff = currentVal - previousVal;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
      {/* Top Header do Gráfico */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="font-extrabold text-white text-base">
              Série Histórica de Telemetria Físico-Química
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Evolução diária auditada de <strong className="text-slate-200">{poolName}</strong> ({volumeM3} m³)
          </p>
        </div>

        {/* Seletor de Janela de Tempo */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(['7D', '14D'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeRange === range
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {range === '7D' ? 'Últimos 7 dias' : 'Últimos 14 dias'}
            </button>
          ))}
        </div>
      </div>

      {/* Seletor das Grandezas Monitoradas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {[
          { key: 'PH', label: 'pH da Água', target: '7.2 - 7.6', current: '7.5' },
          { key: 'CHLORINE', label: 'Cloro Livre', target: '1.5 - 3.0 ppm', current: '2.2 ppm' },
          { key: 'ALKALINITY', label: 'Alcalinidade', target: '80 - 120 ppm', current: '105 ppm' },
          { key: 'LSI', label: 'Índice Langelier', target: '-0.3 a +0.3', current: '+0.08' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setSelectedMetric(item.key as any)}
            className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
              selectedMetric === item.key
                ? 'bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-950/40'
                : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {item.label}
              </span>
              <span className="text-xs font-mono font-bold text-white">
                {item.current}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Faixa Ideal: <strong className="text-emerald-400">{item.target}</strong>
            </div>
          </button>
        ))}
      </div>

      {/* SVG Container do Gráfico Vetorial Interativo */}
      <div className="relative bg-slate-950 border border-slate-800/90 rounded-2xl p-4 overflow-hidden">
        {/* Faixa Ideal Sombreada de Fundo */}
        <div 
          className="absolute left-10 right-10 bg-emerald-500/5 border-y border-emerald-500/20 pointer-events-none"
          style={{
            top: `${(targetTopY / svgHeight) * 100}%`,
            height: `${((targetBottomY - targetTopY) / svgHeight) * 100}%`,
          }}
        >
          <span className="absolute right-2 top-1 text-[9px] font-bold text-emerald-500/70 uppercase tracking-widest">
            Faixa Segura Homologada JHostonTec
          </span>
        </div>

        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          className="w-full h-52 overflow-visible select-none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Linhas de Grade Horizontais */}
          <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#1e293b" strokeDasharray="3 3" />
          <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="#1e293b" strokeDasharray="3 3" />
          <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#334155" />

          {/* Área Gradiente Preenchida */}
          <polygon points={areaString} fill="url(#chartGradient)" />

          {/* Linha Principal da Série */}
          <polyline
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={config.color}
            points={pointsString}
          />

          {/* Pontos Marcadores Interativos */}
          {filteredSeries.map((pt, idx) => {
            const { x, y } = getCoordinates(idx, config.getValue(pt));
            const isCritical = pt.status === 'RED_ZONE';

            return (
              <g 
                key={idx} 
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isCritical ? "6" : "4"}
                  className={`${isCritical ? 'fill-rose-500 animate-ping' : 'fill-cyan-400'} opacity-75`}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={isCritical ? "5" : "3.5"}
                  className={`${isCritical ? 'fill-rose-500 stroke-white' : 'fill-slate-950 stroke-cyan-400'} stroke-2`}
                />
                {/* Rótulo de Data no Eixo X */}
                <text
                  x={x}
                  y={svgHeight - 10}
                  textAnchor="middle"
                  className="fill-slate-400 text-[10px] font-mono font-medium"
                >
                  {pt.formattedDate}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip Dinâmico ao passar o mouse */}
        {hoveredPoint && (
          <div className="absolute top-4 right-4 bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs shadow-2xl space-y-1 z-10 animate-fadeIn">
            <div className="flex items-center justify-between gap-4">
              <span className="font-bold text-white">{hoveredPoint.formattedDate} ({hoveredPoint.weatherCondition})</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                hoveredPoint.status === 'RED_ZONE' 
                  ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                  : 'bg-emerald-950 text-emerald-300'
              }`}>
                {hoveredPoint.status}
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-mono">
              pH: <strong className="text-white">{hoveredPoint.ph}</strong> • Cloro: <strong className="text-cyan-400">{hoveredPoint.chlorine} ppm</strong> • Alcalinidade: <strong className="text-indigo-400">{hoveredPoint.alkalinity} ppm</strong>
            </div>
          </div>
        )}
      </div>

      {/* Resumo Estatístico de Engenharia & Enriquecimento de Laudo */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white block">Índice de Estabilidade Química: 97.4%</span>
            <p className="text-[11px] text-slate-400">
              Apenas 1 desvio controlado nos últimos 14 dias com recuperação em menos de 24 horas.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-slate-400">Variação recente:</span>
          <span className={`font-mono font-bold flex items-center ${diff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {diff >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {Math.abs(diff).toFixed(1)} {config.unit}
          </span>
        </div>
      </div>
    </div>
  );
}
