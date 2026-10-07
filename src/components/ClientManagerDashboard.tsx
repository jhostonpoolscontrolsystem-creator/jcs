'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Droplets, 
  CloudRain, 
  ShoppingCart, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  CheckCircle2, 
  TrendingUp, 
  Thermometer, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { Pool, PoolInventory } from '@/types/database';
import { mockPools } from '@/lib/mock-data';

export function ClientManagerDashboard() {
  const [selectedPool, setSelectedPool] = useState<Pool>(mockPools[0]);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [orderApproved, setOrderApproved] = useState(false);

  // Inventário preditivo de estoque
  const [inventory, setInventory] = useState<Array<{ name: string; category: string; balance: number; days: number; unit: string }>>([
    { name: 'Cloro Concentrado 65%', category: 'SANITIZANTE', balance: 14.5, days: 14, unit: 'kg' },
    { name: 'Bicarbonato de Sódio Puro', category: 'ALCALINIZANTE', balance: 6.0, days: 8, unit: 'kg' },
    { name: 'Redutor de pH Líquido', category: 'REDUTOR_PH', balance: 2.0, days: 3, unit: 'L' },
    { name: 'Inibidor de Metais e Manchas', category: 'SEQUESTRANTE_METAL', balance: 5.0, days: 30, unit: 'L' }
  ]);

  // Carrega previsão do tempo preditiva da OpenWeather
  useEffect(() => {
    fetch(`/api/weather?lat=${selectedPool.gps_lat}&lon=${selectedPool.gps_lng}`)
      .then((r) => r.json())
      .then((data) => setWeatherData(data))
      .catch((e) => console.warn(e));
  }, [selectedPool]);

  // Cálculo da Cura da Piscina (7 dias a seco, 28 dias submersa)
  const appDate = new Date(selectedPool.application_date);
  const today = new Date();
  const diffDays = Math.floor((today.getTime() - appDate.getTime()) / (1000 * 3600 * 24));
  const submergedDaysRemaining = Math.max(0, 28 - diffDays);
  const isCureActive = submergedDaysRemaining > 0;

  return (
    <div className="space-y-6">
      {/* Top Banner do Dono / Gerente */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-wrap justify-between items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[11px] font-bold tracking-wide">
              PORTAL DO CLIENTE & GERÊNCIA
            </span>
            <span className="text-xs text-slate-400">Digital Twin & Certificado de Garantia</span>
          </div>
          <h2 className="text-2xl font-black text-white">{selectedPool.name}</h2>
          <p className="text-xs text-slate-400">
            Tipo: <strong className="text-slate-200">{selectedPool.facility_type}</strong> • Volume:{' '}
            <strong className="text-cyan-400">{selectedPool.volume_m3} m³</strong> • Vazão:{' '}
            <strong className="text-slate-200">{selectedPool.pump_flow_m3_h} m³/h</strong>
          </p>
        </div>

        {/* Status de Garantia */}
        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-3 rounded-2xl border border-slate-800">
          <div className="h-10 w-10 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Status do Monólito</span>
            <span className="text-sm font-extrabold text-emerald-400 flex items-center gap-1.5">
              Garantia 100% Protegida
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1 & 2: Digital Twin & Clima */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contador de Cura de 28 Dias (Se aplicável) */}
          {isCureActive && (
            <div className="bg-slate-900 border border-amber-900/60 rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-amber-950/30 to-transparent space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>Protocolo de Cura Submersa em Andamento (28 Dias)</span>
                </div>
                <span className="text-xs bg-amber-950 text-amber-300 px-3 py-1 rounded-full font-bold border border-amber-800">
                  Faltam {submergedDaysRemaining} dias
                </span>
              </div>

              <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (diffDays / 28) * 100)}%` }}
                ></div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Durante a fase de cura submersa, a escovação diária e a ausência de cloro em excesso são vitais para a maturação da resina monolítica. O sistema está auditando as evidências do tratador diariamente.
              </p>
            </div>
          )}

          {/* Integração Meteorológica Preventiva (OpenWeather) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CloudRain className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">Alerta Meteorológico & Ação Preventiva</h3>
              </div>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                OpenWeather Live
              </span>
            </div>

            {weatherData ? (
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Thermometer className="w-6 h-6 text-amber-400" />
                    <div>
                      <span className="text-xl font-bold text-white">{weatherData.temp}°C</span>
                      <p className="text-xs text-slate-400 capitalize">{weatherData.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Probabilidade de Chuva</span>
                    <span className="text-xs font-bold text-cyan-400">{weatherData.rain_probability}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-start gap-2.5 text-xs text-cyan-300 bg-cyan-950/20 p-3 rounded-lg border border-cyan-900/40">
                  <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{weatherData.recommendation}</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                Sincronizando estação climática da região...
              </div>
            )}
          </div>

          {/* Download do Laudo Mensal de Garantia em PDF */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Laudo Mensal de Garantia (PDF Automático)</h4>
                <p className="text-xs text-slate-400">Consolidado com médias químicas, fotos de auditoria e memória de cálculo</p>
              </div>
            </div>

            <button
              onClick={() => alert('Gerando Laudo de Conformidade e Garantia Oficial JHostonTec (PDF consolidado)...')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Baixar Laudo Mensal
            </button>
          </div>
        </div>

        {/* Coluna 3: Gestão Preditiva de Estoque (Runway) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-base">Runway de Estoque</h3>
            </div>
            <span className="text-[10px] text-slate-400">Dias Restantes</span>
          </div>

          <div className="space-y-3">
            {inventory.map((item, idx) => (
              <div key={idx} className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-200">{item.name}</span>
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                    item.days <= 5 ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-slate-800 text-cyan-400'
                  }`}>
                    {item.days} dias rest.
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Saldo Físico: {item.balance} {item.unit}</span>
                  <span>{item.days <= 5 ? '⚠️ Reposição Urgente' : 'Nível Seguro'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Central de Aprovação de Compra antes de zerar */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold">Pacote de Reposição Sugerido:</span>
              <span className="text-cyan-400 font-mono font-bold">R$ 480,00</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Redutor de pH líquido com runway crítico de apenas 3 dias de operação.
            </p>

            <button
              onClick={() => setOrderApproved(true)}
              disabled={orderApproved}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                orderApproved
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 hover:opacity-90 shadow-md shadow-cyan-500/20'
              }`}
            >
              {orderApproved ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Pedido de Químicos Aprovado!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Aprovar Reposição de Químicos
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
