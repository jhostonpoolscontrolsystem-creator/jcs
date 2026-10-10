'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Activity, 
  Search, 
  RefreshCw, 
  AlertTriangle, 
  UserCheck, 
  FileText, 
  Download, 
  Send, 
  Filter, 
  Eye, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Crown,
  FileSpreadsheet,
  ExternalLink,
  ChevronRight,
  Sparkles,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  created_at: string;
  user_email: string;
  action: string;
  details: string;
  ip_address: string;
}

interface MasterAuditReportsCockpitProps {
  onNavigateTab?: (tab: any) => void;
  onOpenWelcomeKit?: () => void;
}

export function MasterAuditReportsCockpit({ onNavigateTab, onOpenWelcomeKit }: MasterAuditReportsCockpitProps) {
  const [activeSubTab, setActiveSubTab] = useState<'audit_logs' | 'subscriptions' | 'reports_catalog' | 'compliance_rules'>('subscriptions');
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [exporting, setExporting] = useState(false);

  // Estados de Assinatura & Degustação
  const [subscriptionsData, setSubscriptionsData] = useState<any>(null);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [subsSearch, setSubsSearch] = useState('');
  const [subsFilter, setSubsFilter] = useState('ALL');
  const [notifyingMasters, setNotifyingMasters] = useState(false);
  const [notifyFeedback, setNotifyFeedback] = useState<string | null>(null);

  // Carregar Logs da API
  const fetchLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/audit/logs');
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs || []);
      } else {
        setError(data.error || 'Erro ao carregar logs.');
      }
    } catch (err) {
      setError('Erro de conexão ao buscar logs de auditoria.');
    } finally {
      setLoading(false);
    }
  };

  // Carregar Relatório de Assinaturas & Degustação da API
  const fetchSubscriptions = async (notify: boolean = false) => {
    setLoadingSubs(true);
    setNotifyFeedback(null);
    try {
      const url = notify ? '/api/subscriptions/audit?notify=true' : '/api/subscriptions/audit';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setSubscriptionsData(data);
        if (notify) {
          setNotifyFeedback('Alerta personalizado despachado para Daniel Lopes (5511913192703) e Patrícia Grübel (551178543369) via WhatsApp!');
        }
      }
    } catch (e) {
      console.error('Falha ao buscar auditoria de assinaturas:', e);
    } finally {
      setLoadingSubs(false);
      setNotifyingMasters(false);
    }
  };

  // Exportar CSV de Assinaturas
  const handleExportSubscriptionsCSV = () => {
    window.open('/api/subscriptions/audit?format=csv', '_blank');
  };

  // Disparar Notificação aos MASTERs
  const handleNotifyMastersNow = async () => {
    setNotifyingMasters(true);
    await fetchSubscriptions(true);
  };

  useEffect(() => {
    fetchLogs();
    fetchSubscriptions(false);
  }, []);

  // Filtros de Logs
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = 
        log.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip_address?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;

      return matchesSearch && matchesAction;
    });
  }, [logs, searchTerm, actionFilter]);

  // Lista única de ações para filtro
  const uniqueActions = useMemo(() => {
    const set = new Set(logs.map(l => l.action).filter(Boolean));
    return Array.from(set);
  }, [logs]);

  // Exportar CSV
  const handleExportCSV = () => {
    setExporting(true);
    try {
      const headers = ['Data/Hora', 'Usuário (E-mail)', 'Ação', 'Detalhes', 'IP'];
      const rows = filteredLogs.map(l => [
        `"${format(new Date(l.created_at), 'dd/MM/yyyy HH:mm:ss')}"`,
        `"${l.user_email}"`,
        `"${l.action}"`,
        `"${(l.details || '').replace(/"/g, '""')}"`,
        `"${l.ip_address || ''}"`
      ]);

      const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `auditoria_jhpcs_master_${format(new Date(), 'yyyy-MM-dd_HHmm')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Nobre do Cockpit MASTER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 border border-amber-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Auditoria & Inteligência Soberana • MASTER
              </span>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Criptografia & Rastreabilidade Ativa
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Central Integrada de <span className="text-amber-400">Auditoria & Relatórios</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Visão consolidada para Daniel Lopes e Patrícia Grübel. Acompanhe logs periciais de logins e operações sensíveis, emita relatórios executivos em 1 clique e monitore a blindagem jurídica da garantia decenal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCSV}
              disabled={filteredLogs.length === 0 || exporting}
              className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 text-emerald-400 font-bold text-xs flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-md"
              title="Exportar planilha oficial para auditoria jurídica ou LGPD"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Exportar CSV Pericial</span>
            </button>
            <button
              onClick={fetchLogs}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
              <span>Atualizar Logs</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sub-abas de Navegação Rápida */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 w-fit">
        <button
          onClick={() => setActiveSubTab('subscriptions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'subscriptions'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-amber-400 hover:text-white hover:bg-slate-900 border border-amber-500/20'
          }`}
        >
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Gestão de Assinaturas & Degustação 6M</span>
        </button>

        <button
          onClick={() => setActiveSubTab('audit_logs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'audit_logs'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Logs de Auditoria Invioláveis ({logs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reports_catalog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'reports_catalog'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Matriz de Relatórios & Laudos Executivos</span>
        </button>

        <button
          onClick={() => setActiveSubTab('compliance_rules')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'compliance_rules'
              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-slate-950 shadow-md shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Regras de Blindagem & Termo de Garantia</span>
        </button>
      </div>

      {/* 2.5 CONTEÚDO DA SUB-ABA: GESTÃO DE ASSINATURAS & DEGUSTAÇÃO 6 MESES */}
      {activeSubTab === 'subscriptions' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Feedback de notificação */}
          {notifyFeedback && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center justify-between gap-3 text-xs shadow-lg">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-semibold">{notifyFeedback}</span>
              </div>
              <button 
                onClick={() => setNotifyFeedback(null)} 
                className="text-slate-400 hover:text-white font-mono text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Cards de Métricas de ARR e Período de Cortesia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Ativos Monitorados</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white">
                {subscriptionsData?.summary?.total_pools || 3} <span className="text-xs text-slate-500 font-normal">piscinas</span>
              </div>
              <p className="text-[11px] text-slate-400">Total de bases sob governança pericial</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between text-amber-400">
                <span className="text-xs font-bold uppercase tracking-wider">Finalizando Degustação</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400">
                {subscriptionsData?.summary?.ending_soon || 1} <span className="text-xs text-amber-300/60 font-normal">nos próx. 30 dias</span>
              </div>
              <p className="text-[11px] text-slate-400">Clientes na régua de transição comercial</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between text-purple-400">
                <span className="text-xs font-bold uppercase tracking-wider">Extensões Técnicas</span>
                <ShieldCheck className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-purple-300">
                {subscriptionsData?.summary?.extended_approved || 1} <span className="text-xs text-purple-300/60 font-normal">homologadas</span>
              </div>
              <p className="text-[11px] text-slate-400">Até +3 meses com chancela da Diretoria</p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/40 space-y-2 shadow-lg shadow-emerald-500/5">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="text-xs font-bold uppercase tracking-wider">Potencial ARR Mensal</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400">
                R$ {(subscriptionsData?.summary?.potential_monthly_arr_brl || 79.8).toFixed(2).replace('.', ',')}
              </div>
              <p className="text-[11px] text-slate-300">Receita recorrente contratada/projetada</p>
            </div>
          </div>

          {/* Barra de Ações Rápidas: Notificar WhatsApp dos Master e Exportar CSV */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">Central de Alertas dos Fundadores MASTER</h3>
                <p className="text-xs text-slate-400">
                  Notifica <strong>Daniel Lopes</strong> (5511913192703) e <strong>Patrícia Grübel</strong> (551178543369) com o resumo executivo.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleNotifyMastersNow}
                disabled={notifyingMasters || loadingSubs}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50"
              >
                <Send className={`w-3.5 h-3.5 ${notifyingMasters ? 'animate-spin' : ''}`} />
                <span>{notifyingMasters ? 'Disparando...' : 'Avisar MASTERs via WhatsApp'}</span>
              </button>

              <button
                onClick={handleExportSubscriptionsCSV}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 font-bold text-xs flex items-center gap-2 shadow-sm transition cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Exportar Relatório (.CSV)</span>
              </button>

              <button
                onClick={() => fetchSubscriptions(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition cursor-pointer"
                title="Atualizar dados"
              >
                <RefreshCw className={`w-4 h-4 ${loadingSubs ? 'animate-spin text-cyan-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Tabela Pericial de Acompanhamento */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Relação de Piscinas, Vencimento da Degustação & Planos Escolhidos
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Padrão: 6 meses cortesia • Extensão máxima: +3m aprovada • Pagamento: Antecipado até dia 05
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 text-[11px] font-mono uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Piscina / Estabelecimento</th>
                    <th className="p-3.5">Cliente / Contato</th>
                    <th className="p-3.5">Período Gratuito</th>
                    <th className="p-3.5">Dias Restantes</th>
                    <th className="p-3.5">Status Cortesia</th>
                    <th className="p-3.5">Opção de Plano</th>
                    <th className="p-3.5">Valor Mensal</th>
                    <th className="p-3.5">Vencimento</th>
                    <th className="p-3.5">Extensão Técnica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {(subscriptionsData?.items || []).map((item: any) => (
                    <tr key={item.pool_id} className="hover:bg-slate-900/40 transition">
                      <td className="p-3.5 font-bold text-white">
                        <div>{item.pool_name}</div>
                        <span className="text-[10px] font-mono text-cyan-400">{item.facility_type}</span>
                      </td>
                      <td className="p-3.5 text-slate-300">
                        <div className="font-semibold text-slate-200">{item.client_name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{item.client_phone}</div>
                      </td>
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                        <div>Início: {new Date(item.trial_started_at).toLocaleDateString('pt-BR')}</div>
                        <div className="text-amber-400/80">Término: {new Date(item.trial_ends_at).toLocaleDateString('pt-BR')}</div>
                      </td>
                      <td className="p-3.5 font-mono">
                        <span className={`px-2 py-0.5 rounded font-bold text-xs ${
                          item.days_remaining_trial <= 15
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : item.days_remaining_trial <= 45
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {item.days_remaining_trial > 0 ? `${item.days_remaining_trial} dias` : 'Expirado'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {item.trial_state === 'EXTENDED_APPROVED' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                            Extensão Aprovada
                          </span>
                        )}
                        {item.trial_state === 'ENDING_SOON' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            Aviso (30/15d)
                          </span>
                        )}
                        {item.trial_state === 'ACTIVE' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            Degustação Ativa
                          </span>
                        )}
                        {item.trial_state === 'EXPIRED' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400">
                            Encerrado
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.client_chosen_tier === 'BLACK_ELITE'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : item.client_chosen_tier === 'PRO_EXECUTIVE'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {item.client_chosen_tier === 'BLACK_ELITE' ? 'Black Elite (Semanal)' : item.client_chosen_tier === 'PRO_EXECUTIVE' ? 'Pro (Quinzenal)' : 'Standard (Mensal)'}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-emerald-400 font-mono">
                        {item.monthly_value_brl > 0 ? `R$ ${item.monthly_value_brl.toFixed(2).replace('.', ',')}/mês` : 'Incluso (R$ 0)'}
                      </td>
                      <td className="p-3.5 font-mono text-[11px]">
                        {item.monthly_value_brl > 0 ? (
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                            Dia 05 (Antecipado)
                          </span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                      <td className="p-3.5 text-xs text-slate-400 max-w-xs">
                        {item.extension_months > 0 ? (
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold text-purple-300 block">
                              +{item.extension_months} meses ({item.extension_approved_by_director ? 'Aprovado Joabson' : 'Pendente'})
                            </span>
                            <p className="text-[10px] text-slate-500 line-clamp-2 italic">{item.extension_reason}</p>
                          </div>
                        ) : (
                          <span className="text-slate-600 font-mono text-[11px]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONTEÚDO DA SUB-ABA 1: LOGS DE AUDITORIA */}
      {activeSubTab === 'audit_logs' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Alerta de erro */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-900/60 text-red-300 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
              <button 
                onClick={fetchLogs} 
                className="px-3 py-1 bg-red-900/40 hover:bg-red-900/80 border border-red-800 rounded-lg font-bold"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Filtros e Busca Rápida */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar por e-mail, IP, ação ou detalhe..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition placeholder:text-slate-600"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 transition cursor-pointer"
              >
                <option value="ALL">Todas as Ações ({logs.length})</option>
                {uniqueActions.map(action => (
                  <option key={action} value={action}>{action}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabela de Auditoria com Estilo de Alta Densidade */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider font-bold">
                    <th className="p-4">Data / Hora</th>
                    <th className="p-4">Operador Responsável</th>
                    <th className="p-4">Ação Registrada</th>
                    <th className="p-4">Memória / Detalhes</th>
                    <th className="p-4 text-right">IP de Origem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-slate-500 space-y-2">
                        <Activity className="w-6 h-6 animate-pulse mx-auto text-amber-400" />
                        <p className="font-semibold text-slate-400">Consultando livro-razão de auditoria inviolável...</p>
                      </td>
                    </tr>
                  ) : filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-slate-500">
                        Nenhum registro de auditoria encontrado para os critérios selecionados.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-4 whitespace-nowrap text-slate-300 font-mono text-[11px]">
                          {format(new Date(log.created_at), "dd/MM/yyyy 'às' HH:mm:ss")}
                        </td>
                        <td className="p-4 font-medium text-slate-200">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                              <UserCheck className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-mono text-xs">{log.user_email}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-[10px] font-mono font-bold text-amber-400">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-4 text-slate-300 max-w-md truncate" title={log.details}>
                          {log.details}
                        </td>
                        <td className="p-4 text-slate-400 font-mono text-[11px] text-right">
                          <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                            {log.ip_address || '127.0.0.1'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-slate-950/70 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
              <span>Exibindo {filteredLogs.length} de {logs.length} registros periciais.</span>
              <span className="text-amber-400/80 font-mono">Retenção perene protegida pela Lei Civil (Garantia Decenal)</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. CONTEÚDO DA SUB-ABA 2: MATRIZ DE RELATÓRIOS EXECUTIVOS */}
      {activeSubTab === 'reports_catalog' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Relatório 1: Panorama Geral */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    Mensal / Diário
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">Panorama Geral dos Ativos</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Consolidação do Health Score médio, volume total (m³) e conformidade geral da carteira de clientes.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => onNavigateTab && onNavigateTab('executive_reports')}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Disparar WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Relatório 2: Boletim Red Zone */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-red-500/40 transition space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-800/40">
                    Emergência
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">Boletim Red Zone (Crítico)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Alerta pericial de tanques com pH &lt; 6.8 ou risco iminente de corrosão para intervenção imediata.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => onNavigateTab && onNavigateTab('executive_reports')}
                  className="w-full py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Disparo de Alerta Crítico</span>
                </button>
              </div>
            </div>

            {/* Relatório 3: Revista VIP & Kit Boas-Vindas */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-amber-500/30 hover:border-amber-400 transition space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                    Exclusivo MASTER
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">Revista VIP (PDF 4 Páginas)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Kit de luxo com caderno de telemetria F1, manual ilustrado de preservação e certificado oficial.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex flex-col gap-1.5">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="/api/pdf/luxury-compendium?download=true"
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-amber-400 font-bold text-[11px] flex items-center justify-center gap-1 transition"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF 8 Págs</span>
                    </a>
                    <button
                      onClick={() => onOpenWelcomeKit && onOpenWelcomeKit()}
                      className="py-2 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Disparar Kit</span>
                    </button>
                  </div>
                  <a
                    href="/revista-executiva"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-1.5 px-2 rounded-lg bg-slate-950/70 border border-amber-500/30 hover:border-amber-400 text-amber-300 font-bold text-[10px] flex items-center justify-center gap-1.5 transition text-center"
                  >
                    <span>Consultar Revista Online Externa</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Relatório 4: Laudo de Garantia & Cura */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                    Jurídico
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">Laudo Pericial de Garantia</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Certificado oficial atestando conformidade com a ABNT NBR 10818 e ausência de ácido muriático.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <a
                  href="/api/pdf/generate?poolId=pool-1"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500 text-cyan-400 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Gerar Laudo Técnico (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Banner de Atalho Rápido para Disparo em Massa */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-sm text-white">Central de Disparos em Massa via WhatsApp (Evolution API)</h4>
              </div>
              <p className="text-xs text-slate-400">
                Envie laudos e balanços para Joabson, grupos de engenharia (@g.us) ou clientes selecionados com SLA &lt; 3.2s.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab && onNavigateTab('executive_reports')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20 whitespace-nowrap"
            >
              <span>Abrir Central de Disparos</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5. CONTEÚDO DA SUB-ABA 3: REGRAS DE BLINDAGEM E CONFORMIDADE */}
      {activeSubTab === 'compliance_rules' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800 text-red-400 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h4 className="font-bold text-sm text-white">Proibição Letal de Ácidos</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Qualquer registro de ácido clorídrico (muriático) ou limpa-pedras altera compulsoriamente o status do tanque para <strong>WARRANTY_SUSPENDED</strong>. O laudo pericial é gerado automaticamente com carimbo de fraude.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h4 className="font-bold text-sm text-white">Geolocalização & Câmera em Tempo Real</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Checklists do tratador só são homologados se capturados via câmera nativa na borda da piscina e em raio menor que 100 metros via GPS. Fotos da galeria são vetadas para evitar fraudes de conformidade.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-400 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h4 className="font-bold text-sm text-white">Plano de Manutenção Ativo (3 Anos)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Superamos a garantia decenal passiva substituindo-a pelo acompanhamento proativo direto: <strong>Monitoramento Remoto Semanal</strong> (sem mensalidade) e <strong>Intervenções Anuais</strong> com mão de obra técnica 100% isenta para esvaziamento, lavagem e resina.
              </p>
            </div>
          </div>

          {/* Banner Explicativo do Plano de Manutenção Ativo no Cockpit Master */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  NOVA DIRETRIZ JURÍDICA E OPERACIONAL • PÓS-VENDA PROATIVO
                </span>
                <h4 className="text-base font-black text-white">
                  Plano de Manutenção Ativo: A Revolução no Pós-Venda e Garantia Trienal
                </h4>
                <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                  Em vez de aguardar o sinistro para culpar o cliente ou entrar em litígio judicial, a JHöston assume a proatividade técnica. Auditoria semanal no WhatsApp do tratador e check-up profundo presencial no 1º, 2º e 3º ano com isenção total de mão de obra.
                </p>
              </div>

              <a
                href="/revista-executiva#cap-5"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition whitespace-nowrap shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <span>Ver Capítulo Completo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Semana a Semana</span>
                <p className="text-slate-400 text-[11px]">Contato com caseiro/tratador para pH e Cloro. Zero mensalidade.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">Ano 1 & 2 (Preventiva)</span>
                <p className="text-slate-400 text-[11px]">Esvaziamento, lavagem técnica e resina. Mão de obra 100% gratuita.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">Ano 3 (Revitalização)</span>
                <p className="text-slate-400 text-[11px]">Lavagem química intensiva de alta pressão, camada final e opção de renovação.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
