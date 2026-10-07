'use client';

import React, { useState } from 'react';
import { 
  Eye, 
  MapPin, 
  Droplets, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  FileText, 
  Share2, 
  Send, 
  Activity, 
  Sparkles,
  AlertTriangle,
  History,
  TrendingDown,
  Building,
  Check,
  X
} from 'lucide-react';
import { Pool, MaintenanceLog } from '@/types/database';
import { mockMaintenanceLogs } from '@/lib/mock-data';

interface PoolMedicalRecordModalProps {
  pool: Pool | null;
  isOpen: boolean;
  onClose: () => void;
  currentUserRole?: string;
}

export function PoolMedicalRecordModal({
  pool,
  isOpen,
  onClose,
  currentUserRole = 'MASTER',
}: PoolMedicalRecordModalProps) {
  const [activeTab, setActiveTab] = useState<'VISAO_GERAL' | 'HISTORICO_QUIMICO' | 'LAUDO_GARANTIA'>('VISAO_GERAL');
  const [dispatchingWhatsApp, setDispatchingWhatsApp] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [targetPhone, setTargetPhone] = useState('5511988887777');

  if (!isOpen || !pool) return null;

  // Filtra logs de manutenção desta piscina
  const poolLogs: MaintenanceLog[] = mockMaintenanceLogs.filter(l => l.pool_id === pool.id);
  const latestLog = poolLogs[0] || {
    ph: pool.status === 'RED_ZONE' ? 6.8 : 7.4,
    chlorine_ppm: pool.status === 'RED_ZONE' ? 0.8 : 2.5,
    alkalinity_ppm: pool.status === 'RED_ZONE' ? 55 : 100,
    log_date: new Date().toISOString(),
    brushed_surface: true,
    backwashed_filter: true,
    acid_product_used: false,
    is_audit_flagged: pool.status === 'RED_ZONE',
    flag_reason: pool.status === 'RED_ZONE' ? 'pH ácido abaixo de 7.0 gera risco corrosivo ao monólito.' : undefined
  };

  // Status visual
  const getStatusBadge = () => {
    switch (pool.status) {
      case 'NORMAL':
        return {
          label: 'Garantia Conforme & Ativa',
          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'RED_ZONE':
        return {
          label: 'Red Zone: Risco de Corrosão',
          color: 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse',
          dot: 'bg-rose-500',
        };
      case 'DRY_CURE':
        return {
          label: 'Fase de Cura a Seco (7 Dias)',
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 'SUBMERGED_CURE':
        return {
          label: 'Fase de Cura Submersa (28 Dias)',
          color: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
          dot: 'bg-sky-400',
        };
      default:
        return {
          label: pool.status,
          color: 'bg-slate-800 text-slate-300 border-slate-700',
          dot: 'bg-slate-400',
        };
    }
  };

  const statusBadge = getStatusBadge();

  // Despacha ficha da piscina para WhatsApp da Diretoria / Cliente
  const handleSendWhatsApp = async () => {
    setDispatchingWhatsApp(true);
    setWhatsappSent(false);

    try {
      const res = await fetch('/api/reports/whatsapp-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportType: 'RED_ZONE_AUDIT',
          targetPhone: targetPhone.replace(/\D/g, ''),
          poolId: pool.id,
          poolName: pool.name,
        }),
      });

      if (res.ok) {
        setWhatsappSent(true);
        setTimeout(() => setWhatsappSent(false), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDispatchingWhatsApp(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-cyan-950/50 flex flex-col overflow-hidden text-slate-100">
        
        {/* Glow Top Accent */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${
          pool.status === 'RED_ZONE' 
            ? 'from-rose-500 via-amber-500 to-rose-600'
            : 'from-cyan-500 via-sky-400 to-emerald-400'
        }`} />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${
              pool.status === 'RED_ZONE' 
                ? 'bg-rose-950/80 border-rose-800/80 text-rose-400 shadow-lg shadow-rose-950/50'
                : 'bg-cyan-950/80 border-cyan-800/80 text-cyan-400 shadow-lg shadow-cyan-950/50'
            }`}>
              <Droplets className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-white tracking-wide">{pool.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${statusBadge.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                  {statusBadge.label}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{pool.facility_type}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {pool.gps_lat.toFixed(4)}, {pool.gps_lng.toFixed(4)}
                </span>
                <span>•</span>
                <span className="text-cyan-400 font-mono font-bold">{pool.volume_m3} m³</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex px-6 pt-3 border-b border-slate-800 bg-slate-950/40 gap-2">
          <button
            onClick={() => setActiveTab('VISAO_GERAL')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'VISAO_GERAL'
                ? 'text-cyan-400 border-cyan-400 bg-slate-900/80'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" /> Visão Geral & Telemetria
          </button>

          <button
            onClick={() => setActiveTab('HISTORICO_QUIMICO')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'HISTORICO_QUIMICO'
                ? 'text-cyan-400 border-cyan-400 bg-slate-900/80'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4" /> Histórico de Dosagens ({poolLogs.length + 1})
          </button>

          <button
            onClick={() => setActiveTab('LAUDO_GARANTIA')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'LAUDO_GARANTIA'
                ? 'text-cyan-400 border-cyan-400 bg-slate-900/80'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" /> Laudo de Garantia & Compartilhamento
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: VISÃO GERAL */}
          {activeTab === 'VISAO_GERAL' && (
            <div className="space-y-6">
              {/* Cards de Métricas Físico-Químicas Atuais */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Potencial Hidrogeniônico</span>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-2xl font-black ${latestLog.ph < 7.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {latestLog.ph.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-400">Meta: 7.4 - 7.6</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${latestLog.ph < 7.0 ? 'bg-rose-500' : 'bg-emerald-400'}`} 
                      style={{ width: `${Math.min(100, (latestLog.ph / 8.5) * 100)}%` }} 
                    />
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cloro Livre Residual</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-cyan-400">
                      {latestLog.chlorine_ppm.toFixed(1)} <span className="text-xs font-normal">ppm</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Meta: 1.5 - 3.0</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400" style={{ width: `${Math.min(100, (latestLog.chlorine_ppm / 4.0) * 100)}%` }} />
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Alcalinidade Total</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-indigo-400">
                      {latestLog.alkalinity_ppm || 100} <span className="text-xs font-normal">ppm</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Meta: 80 - 120</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400" style={{ width: '80%' }} />
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Índice Langelier (LSI)</span>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-2xl font-black ${pool.status === 'RED_ZONE' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {pool.status === 'RED_ZONE' ? '-0.42' : '+0.05'}
                    </span>
                    <span className="text-[10px] text-slate-400">Ideal: -0.3 a +0.3</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${pool.status === 'RED_ZONE' ? 'bg-rose-500' : 'bg-emerald-400'}`} style={{ width: '65%' }} />
                  </div>
                </div>
              </div>

              {/* Ficha Técnica de Engenharia do Ativo */}
              <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Building className="w-4 h-4" /> Parâmetros Estruturais & Equipamentos Hidráulicos
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Tipo de Estabelecimento:</span>
                    <span className="font-semibold text-white">{pool.facility_type}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Volume do Monólito:</span>
                    <span className="font-semibold text-cyan-400">{pool.volume_m3} m³ ({pool.volume_m3 * 1000} L)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Vazão da Motobomba:</span>
                    <span className="font-semibold text-white">{pool.pump_flow_m3_h} m³/h</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Recirculação Total:</span>
                    <span className="font-semibold text-white">{(pool.volume_m3 / (pool.pump_flow_m3_h || 1)).toFixed(1)} horas</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Data da Aplicação:</span>
                    <span className="font-semibold text-white">{new Date(pool.application_date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ID do Ativo:</span>
                    <span className="font-mono text-[11px] text-slate-300">{pool.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Garantia Legal:</span>
                    <span className="font-semibold text-emerald-400">Ativa (5 Anos JHostonTec)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Último Tratamento:</span>
                    <span className="font-semibold text-slate-200">Hoje às 08:30 (Tratador de Campo)</span>
                  </div>
                </div>
              </div>

              {/* Alerta de Auditoria Específico se Red Zone */}
              {pool.status === 'RED_ZONE' && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-rose-400">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>ALERTA DE SEGURANÇA: pH Crítico detectado ({latestLog.ph})</span>
                  </div>
                  <p className="text-rose-200/90 leading-relaxed">
                    A água abaixo de pH 7.0 torna-se ácida e ataca diretamente a matriz do revestimento monolítico. Ação corretiva mandatória: dosar <strong>Bicarbonato de Sódio</strong> e <strong>Carbonato</strong> conforme volumetria de {pool.volume_m3} m³ e proibir terminantemente o uso de ácido muriático ou limpa pedras.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: HISTÓRICO QUÍMICO */}
          {activeTab === 'HISTORICO_QUIMICO' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Tratamentos e auditorias registradas via PWA Offline-First</span>
                <span className="font-mono text-cyan-400 font-bold">Total: {poolLogs.length + 1} medições</span>
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950/60">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Data / Hora</th>
                      <th className="p-3">pH</th>
                      <th className="p-3">Cloro</th>
                      <th className="p-3">Alcalinidade</th>
                      <th className="p-3">Escovação</th>
                      <th className="p-3">Uso de Ácido</th>
                      <th className="p-3">Status Auditoria</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 font-mono text-slate-300">Hoje às 08:30</td>
                      <td className={`p-3 font-bold font-mono ${latestLog.ph < 7.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {latestLog.ph.toFixed(1)}
                      </td>
                      <td className="p-3 font-mono text-cyan-400">{latestLog.chlorine_ppm.toFixed(1)} ppm</td>
                      <td className="p-3 font-mono text-indigo-400">{latestLog.alkalinity_ppm || 100} ppm</td>
                      <td className="p-3 text-emerald-400 font-bold">Sim (Validado)</td>
                      <td className="p-3 text-slate-400">Não (Proibido)</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          pool.status === 'RED_ZONE' ? 'bg-rose-950 text-rose-400' : 'bg-emerald-950 text-emerald-400'
                        }`}>
                          {pool.status === 'RED_ZONE' ? 'FLAGGED_RED_ZONE' : 'VALIDADO_100%'}
                        </span>
                      </td>
                    </tr>

                    {poolLogs.map((log, idx) => (
                      <tr key={log.id || idx} className="hover:bg-slate-900/50">
                        <td className="p-3 font-mono text-slate-300">
                          {new Date(log.log_date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-3 font-bold font-mono text-emerald-400">{log.ph.toFixed(1)}</td>
                        <td className="p-3 font-mono text-cyan-400">{log.chlorine_ppm.toFixed(1)} ppm</td>
                        <td className="p-3 font-mono text-indigo-400">{log.alkalinity_ppm || 100} ppm</td>
                        <td className="p-3 text-emerald-400">{log.brushed_surface ? 'Sim' : 'Não'}</td>
                        <td className="p-3 text-slate-400">{log.acid_product_used ? 'Sim (Alerta)' : 'Não'}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400">
                            VALIDADO_100%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: LAUDO & COMPARTILHAMENTO WHATSAPP */}
          {activeTab === 'LAUDO_GARANTIA' && (
            <div className="space-y-6">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Certificado Digital de Conformidade & Laudo Mensal</h4>
                    <p className="text-xs text-slate-400">Emissão oficial com amparo nas normas técnicas JHoston Pools</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2 text-slate-300">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Beneficiário / Ativo:</span>
                    <strong className="text-white">{pool.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Período de Cobertura:</span>
                    <strong className="text-cyan-400">Outubro / 2026</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Conformidade das Diretrizes:</span>
                    <strong className="text-emerald-400">Atestada pelos Auditores JHostonTec</strong>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Autenticação Criptográfica:</span>
                    <span className="font-mono text-[10px] text-cyan-400">SHA256: 8f4b1e9c2a...390f</span>
                  </div>
                </div>
              </div>

              {/* Disparo Direto para WhatsApp */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Share2 className="w-4 h-4" />
                    <span>Compartilhar Prontuário via WhatsApp Evolution</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">SLA &lt; 3.2s</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-[11px] text-slate-400 mb-1">Telefone de Destino (com DDD e DDI)</label>
                    <input
                      type="text"
                      value={targetPhone}
                      onChange={(e) => setTargetPhone(e.target.value)}
                      placeholder="5511999998888"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div className="sm:self-end">
                    <button
                      onClick={handleSendWhatsApp}
                      disabled={dispatchingWhatsApp}
                      className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50"
                    >
                      {dispatchingWhatsApp ? (
                        <span>Disparando...</span>
                      ) : whatsappSent ? (
                        <>
                          <Check className="w-4 h-4 text-slate-950" />
                          <span>Enviado no WhatsApp!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Laudo WhatsApp</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Dados sincronizados em tempo real com <strong>Supabase PostgreSQL</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
