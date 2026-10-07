'use client';

import React, { useState } from 'react';
import { 
  Droplet, 
  ShieldAlert, 
  Calendar, 
  Send, 
  X, 
  ArrowRight, 
  Eye, 
  Search, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Building,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { Pool } from '@/types/database';
import { mockPools } from '@/lib/mock-data';

export type MetricDrilldownType = 'TOTAL_POOLS' | 'RED_ZONES' | 'CURE_POOLS' | 'WHATSAPP_SLA' | null;

interface MetricDrilldownModalProps {
  type: MetricDrilldownType;
  isOpen: boolean;
  onClose: () => void;
  onSelectPoolToInspect: (pool: Pool) => void;
  onNavigateToWhatsAppReports: () => void;
}

export function MetricDrilldownModal({
  type,
  isOpen,
  onClose,
  onSelectPoolToInspect,
  onNavigateToWhatsAppReports,
}: MetricDrilldownModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen || !type) return null;

  // Filtra dados contextuais baseado no card clicado
  let title = '';
  let subtitle = '';
  let icon = <Droplet className="w-5 h-5" />;
  let headerColor = 'from-cyan-500 via-sky-400 to-blue-500';
  let badgeColor = 'bg-cyan-950 text-cyan-400 border-cyan-800';

  let filteredPools: Pool[] = [];

  switch (type) {
    case 'TOTAL_POOLS':
      title = 'Resumo Executivo: Todos os Ativos Monitorados';
      subtitle = '128 Piscinas Homologadas na Rede JHoston Pools (94.2% em Conformidade Química)';
      icon = <Droplet className="w-6 h-6 text-cyan-400" />;
      headerColor = 'from-cyan-500 via-sky-400 to-blue-500';
      badgeColor = 'bg-cyan-950/80 text-cyan-400 border-cyan-800';
      filteredPools = mockPools.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.facility_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      break;

    case 'RED_ZONES':
      title = 'Auditoria Crítica: Piscinas em Red Zone (Risco Corrosivo)';
      subtitle = 'Ativos com pH < 7.0 ou desequilíbrio severo que demandam ação corretiva imediata';
      icon = <ShieldAlert className="w-6 h-6 text-rose-400" />;
      headerColor = 'from-rose-500 via-amber-500 to-red-600';
      badgeColor = 'bg-rose-950/80 text-rose-400 border-rose-800';
      filteredPools = mockPools.filter(p => p.status === 'RED_ZONE');
      break;

    case 'CURE_POOLS':
      title = 'Fase Crítica: Ativos em Período de Cura (7d Seco / 28d Submersa)';
      subtitle = 'Piscinas recém-revestidas sob fiscalização diária de escovação e ausência de cloro forte';
      icon = <Calendar className="w-6 h-6 text-amber-400" />;
      headerColor = 'from-amber-500 via-yellow-400 to-orange-500';
      badgeColor = 'bg-amber-950/80 text-amber-400 border-amber-800';
      filteredPools = mockPools.filter(p => p.status === 'DRY_CURE' || p.status === 'SUBMERGED_CURE');
      break;

    case 'WHATSAPP_SLA':
      title = 'Infraestrutura & SLA de Mensageria: Evolution API';
      subtitle = 'Monitoramento de Conectividade em Tempo Real, Fila de Disparo e Latência (< 3.2s)';
      icon = <Send className="w-6 h-6 text-emerald-400" />;
      headerColor = 'from-emerald-500 via-teal-400 to-green-500';
      badgeColor = 'bg-emerald-950/80 text-emerald-400 border-emerald-800';
      break;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Glow Top Accent */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${headerColor}`} />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border shadow-lg ${badgeColor}`}>
              {icon}
            </div>
            <div>
              <h3 className="font-extrabold text-base md:text-lg text-white">{title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* CASO: WHATSAPP SLA DETALHADO */}
          {type === 'WHATSAPP_SLA' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Latência Média de Entrega</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-emerald-400">2.8 seg</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded">Meta: &lt; 10s</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Tempo entre a detecção do parâmetro e o recebimento no smartphone do destinatário.
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Instância Oficial Conectada</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-black text-white">ecostone</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded">STATUS_OPEN</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    https://whatsapp-ecostone.onrender.com
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Taxa de Sucesso de Entrega</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-cyan-400">99.8%</span>
                    <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded">Zero Fila</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Laudos mensais e alertas de Red Zone despachados com sucesso.
                  </p>
                </div>
              </div>

              {/* Ação Direta para Relatórios WhatsApp */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-800/40 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Send className="w-4 h-4 text-emerald-400" />
                    Central de Relatórios Executivos WhatsApp
                  </h4>
                  <p className="text-xs text-slate-400">
                    Dispare agora os 4 relatórios consolidados (Panorama Geral, Red Zone, Garantia e Estoque) para qualquer número.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onNavigateToWhatsAppReports();
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  <span>Abrir Central de Disparo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* CASO: LISTA DE PISCINAS FILTRADAS (TOTAL, RED ZONE OU CURA) */
            <div className="space-y-4">
              {/* Barra de Busca de Piscinas */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar piscina por nome, hotel ou tipo de estabelecimento..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {filteredPools.length} piscina(s) listada(s)
                </span>
              </div>

              {/* Tabela Interativa com Botão de Aprofundamento no Prontuário */}
              <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950/60">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Nome da Piscina</th>
                      <th className="p-3.5">Tipo</th>
                      <th className="p-3.5">Volume (m³)</th>
                      <th className="p-3.5">Status do Monólito</th>
                      <th className="p-3.5">Coordenadas GPS</th>
                      <th className="p-3.5 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {filteredPools.length > 0 ? (
                      filteredPools.map((pool) => (
                        <tr key={pool.id} className="hover:bg-slate-900/50 transition">
                          <td className="p-3.5 font-bold text-white flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              pool.status === 'RED_ZONE' 
                                ? 'bg-rose-500 animate-pulse' 
                                : pool.status === 'NORMAL' 
                                ? 'bg-emerald-400' 
                                : 'bg-amber-400'
                            }`} />
                            {pool.name}
                          </td>
                          <td className="p-3.5 text-slate-300">{pool.facility_type}</td>
                          <td className="p-3.5 font-mono text-cyan-400 font-bold">{pool.volume_m3} m³</td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              pool.status === 'RED_ZONE'
                                ? 'bg-rose-950 text-rose-400 border border-rose-800/60'
                                : pool.status === 'NORMAL'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                                : 'bg-amber-950 text-amber-300 border border-amber-800/60'
                            }`}>
                              {pool.status}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-[11px] text-slate-400">
                            {pool.gps_lat.toFixed(4)}, {pool.gps_lng.toFixed(4)}
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => {
                                onClose();
                                onSelectPoolToInspect(pool);
                              }}
                              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ml-auto shadow-sm"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Ver Prontuário</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-slate-400 text-xs">
                          Nenhuma piscina encontrada para os critérios selecionados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Clique em <strong>"Ver Prontuário"</strong> para auditar a telemetria química, histórico e emitir laudos.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
