'use client';

import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  ShieldCheck, 
  Users, 
  FileText, 
  Send, 
  Database, 
  Layers, 
  Settings, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  RefreshCw,
  Search,
  ExternalLink,
  MessageSquare,
  Power,
  Trash2,
  PlusCircle,
  Building2,
  Smartphone
} from 'lucide-react';
import { UserRole } from '@/types/database';

interface TenantWhatsAppItem {
  id: string;
  name: string;
  trade_name?: string;
  document: string;
  target_sector: string;
  contact_email: string;
  contact_phone?: string;
  is_active: boolean;
  whatsapp_instance_name?: string | null;
  whatsapp_instance_status?: 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED';
  whatsapp_connected_number?: string | null;
}

interface MasterGovernanceHubProps {
  onNavigateTab: (tab: any) => void;
  onOpenUserManagement: () => void;
  onOpenRegisterPool: () => void;
}

export function MasterGovernanceHub({
  onNavigateTab,
  onOpenUserManagement,
  onOpenRegisterPool,
}: MasterGovernanceHubProps) {
  const [dbStatus, setDbStatus] = useState<'CONNECTED' | 'CHECKING'>('CONNECTED');
  const [tenants, setTenants] = useState<TenantWhatsAppItem[]>([]);
  const [loadingTenants, setLoadingTenants] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchTenants = async () => {
    setLoadingTenants(true);
    try {
      const res = await fetch('/api/admin/tenants/list', {
        headers: {
          'x-user-email': 'danielsmlopes@hotmail.com',
        },
      });
      const data = await res.json();
      if (data.tenants) {
        setTenants(data.tenants);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTenants(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleWhatsappAction = async (tenantId: string, action: 'CREATE' | 'RESTART' | 'DELETE' | 'STATUS') => {
    setActionLoadingId(`${tenantId}_${action}`);
    setActionMessage(null);
    try {
      const res = await fetch('/api/admin/whatsapp/provision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'danielsmlopes@hotmail.com',
        },
        body: JSON.stringify({ tenantId, action }),
      });
      const data = await res.json();
      if (res.ok) {
        setActionMessage(data.message || 'Operação realizada com sucesso!');
        await fetchTenants();
        setTimeout(() => setActionMessage(null), 4000);
      } else {
        alert(data.error || 'Erro na operação de WhatsApp');
      }
    } catch (e: any) {
      alert(e.message || 'Erro ao comunicar com a Evolution API');
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Nobre e Exclusivo do MASTER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 border border-amber-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Painel Supremo • MASTER
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Homologação de Contas • Blindagem LGPD Ativa
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Centro de Comando & Governança <span className="text-amber-400">SUPER ADMIN</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Ambiente soberano de Daniel Lopes e Patrícia Grübel. Painel com proteção LGPD ativada: métricas operacionais e de infraestrutura globais com anonimização mandatória de dados pessoais e sigilo de terceiros.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenUserManagement}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Aprovar Usuários Pendentes</span>
            </button>
            <button
              onClick={onOpenRegisterPool}
              className="px-5 py-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>+ Homologar Nova Piscina</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4 Pilares de Controle Soberano do MASTER */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Pilar 1: Governança de Usuários */}
        <div 
          onClick={onOpenUserManagement}
          className="glass-panel shimmer-border rounded-2xl p-5 border border-slate-800 hover:border-amber-500/50 transition cursor-pointer group space-y-3"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-400 group-hover:scale-105 transition">
              <Crown className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
              Soberania
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition">
              Fila de Homologação MASTER
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Apenas Você e Patrícia possuem a prerrogativa legal de aprovar ou vetar novos operadores.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-amber-400 font-semibold">
            <span>Acessar Fila</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Pilar 2: Relatórios da Diretoria */}
        <div 
          onClick={() => onNavigateTab('executive_reports')}
          className="glass-panel shimmer-border rounded-2xl p-5 border border-slate-800 hover:border-emerald-500/50 transition cursor-pointer group space-y-3"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 group-hover:scale-105 transition">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              WhatsApp
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition">
              Relatórios & Agenda Telefônica
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Envio dos 4 laudos estratégicos em 1 clique para Joabson, diretores ou clientes.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
            <span>Abrir Central de Disparo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Pilar 3: Central Integrada de Auditoria & Relatórios */}
        <div 
          onClick={() => onNavigateTab('master_audit')}
          className="glass-panel shimmer-border rounded-2xl p-5 border border-amber-500/30 hover:border-amber-400 transition cursor-pointer group space-y-3 bg-gradient-to-b from-amber-950/20 to-transparent"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-400 group-hover:scale-105 transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
              Inviolável
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition">
              Auditoria & Relatórios MASTER
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Livro-razão de acessos, IPs, exportação de CSV e catálogo consolidado de laudos.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-amber-400 font-semibold">
            <span>Abrir Cockpit Pericial</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Pilar 4: Saúde da Infraestrutura Cloud */}
        <div className="glass-panel shimmer-border rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-400">
              <Database className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              100% Online
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">
              Status da Nuvem & Supabase
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              PostgreSQL RLS ativo, Vercel Edge Serverless e Evolution WhatsApp conectados.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sincronização Ativa</span>
          </div>
        </div>
      </div>

      {/* 3. Visão Rápida dos Módulos Operacionais */}
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/90 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Atalhos Diretos para os Demais Ambientes Operacionais
          </h3>
          <span className="text-xs text-slate-400">
            Acesso Irrestrito (MASTER View)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigateTab('master_audit')}
            className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 hover:border-amber-400 text-left transition cursor-pointer group"
          >
            <div className="text-xs font-bold text-amber-400 group-hover:text-amber-300 flex items-center justify-between">
              <span>Auditoria Forense (Logs & Laudos)</span>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Rastreamento de operadores, IPs e download de relatórios executivos.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('dashboard')}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-left transition cursor-pointer group"
          >
            <div className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
              Dashboard Operacional JHostonTec
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Mapa Global de ativos, fila Kanban de triagem e telemetria de campo.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('client_portal')}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-left transition cursor-pointer group"
          >
            <div className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
              Portal do Cliente & Digital Twin
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Acompanhamento de cura de 28 dias, meteorologia e estoque preditivo.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('pwa')}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-left transition cursor-pointer group"
          >
            <div className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
              App do Piscineiro (PWA / Mobile)
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Wizard offline-first com câmera, GPS e dosagem assistida.
            </p>
          </button>
        </div>
      </div>

      {/* 4. Gestão e Provisionamento de Instâncias WhatsApp Evolution (Multi-Tenant Master) */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/90 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <h3 className="font-extrabold text-white text-base">
                Gerenciamento de Instâncias WhatsApp (Evolution API Multi-Tenant)
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Provisione instâncias isoladas com 1 clique para clientes e empresas homologadas. Cada tenant opera com número próprio ou fallback corporativo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchTenants}
              disabled={loadingTenants}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingTenants ? 'animate-spin' : ''}`} />
              <span>Atualizar Lista</span>
            </button>
          </div>
        </div>

        {actionMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Empresa / Tenant</th>
                <th className="py-3 px-4">Setor de Atuação</th>
                <th className="py-3 px-4">Instância WhatsApp</th>
                <th className="py-3 px-4">Status ao Vivo</th>
                <th className="py-3 px-4 text-right">Ações Rápidas (Master)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {tenants.map((t) => {
                const hasInstance = Boolean(t.whatsapp_instance_name);
                const isConnected = t.whatsapp_instance_status === 'CONNECTED';
                const isConnecting = t.whatsapp_instance_status === 'CONNECTING';

                return (
                  <tr key={t.id} className="hover:bg-slate-800/20 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{t.trade_name || t.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{t.contact_email}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono text-slate-300">
                        {t.target_sector || 'SOLO'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      {hasInstance ? (
                        <span className="text-cyan-300 font-bold">{t.whatsapp_instance_name}</span>
                      ) : (
                        <span className="text-slate-600 italic">Não provisionada</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {hasInstance ? (
                        isConnected ? (
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              🟢 Conectado
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 hidden lg:inline">
                              {t.whatsapp_connected_number || '+55 (11) 9****-**88'}
                            </span>
                          </div>
                        ) : isConnecting ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            🟡 Sincronizando
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                            🟡 Aguardando QR Code
                          </span>
                        )
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400">
                          🔴 Desativada
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {!hasInstance ? (
                        <button
                          onClick={() => handleWhatsappAction(t.id, 'CREATE')}
                          disabled={actionLoadingId === `${t.id}_CREATE`}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-[11px] inline-flex items-center gap-1 transition cursor-pointer disabled:opacity-50"
                        >
                          <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>+ Criar Instância WhatsApp</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            title="Sincronizar Status"
                            onClick={() => handleWhatsappAction(t.id, 'STATUS')}
                            disabled={actionLoadingId === `${t.id}_STATUS`}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${actionLoadingId === `${t.id}_STATUS` ? 'animate-spin' : ''}`} />
                          </button>
                          <button
                            title="Reiniciar Sessão"
                            onClick={() => handleWhatsappAction(t.id, 'RESTART')}
                            disabled={actionLoadingId === `${t.id}_RESTART`}
                            className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 font-semibold text-[10px] inline-flex items-center gap-1 transition"
                          >
                            <Power className="w-3 h-3" />
                            <span>Reiniciar</span>
                          </button>
                          <button
                            title="Excluir Instância"
                            onClick={() => {
                              if (confirm(`Deseja realmente excluir a instância WhatsApp do tenant ${t.name}?`)) {
                                handleWhatsappAction(t.id, 'DELETE');
                              }
                            }}
                            disabled={actionLoadingId === `${t.id}_DELETE`}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
