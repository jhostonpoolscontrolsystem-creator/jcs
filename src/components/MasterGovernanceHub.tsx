'use client';

import React, { useState, useEffect } from 'react';
import { BentoCockpitGrid } from '@/components/BentoCockpitGrid';
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
  Smartphone,
  Receipt,
  X,
  Lock,
  Check
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
  fiscal_config?: {
    isFiscalEnabled: boolean;
    environment: 'HOMOLOGATION' | 'PRODUCTION';
    defaultNfeCfop?: string;
    defaultNfseCode?: string;
    issTaxRate?: number;
  };
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

  // Estados do WhatsApp Matriz Jhoston
  const [corpState, setCorpState] = useState<'open' | 'connecting' | 'close'>('close');
  const [corpNumber, setCorpNumber] = useState<string | null>(null);
  const [corpQrCode, setCorpQrCode] = useState<string | null>(null);
  const [showCorpQrModal, setShowCorpQrModal] = useState(false);
  const [loadingCorp, setLoadingCorp] = useState(false);
  const [corpTestSuccess, setCorpTestSuccess] = useState(false);

  // Estados do Modal de Governança Fiscal Master
  const [selectedFiscalTenant, setSelectedFiscalTenant] = useState<TenantWhatsAppItem | null>(null);
  const [fiscalModalOpen, setFiscalModalOpen] = useState(false);
  const [fiscalSaving, setFiscalSaving] = useState(false);
  const [fiscalForm, setFiscalForm] = useState({
    isFiscalEnabled: false,
    environment: 'HOMOLOGATION' as 'HOMOLOGATION' | 'PRODUCTION',
    defaultNfeCfop: '5102',
    defaultNfseCode: '07.10',
    issTaxRate: 3.0,
    autoEmitOnPayment: false,
  });

  const handleOpenFiscalModal = (tenant: TenantWhatsAppItem) => {
    setSelectedFiscalTenant(tenant);
    setFiscalForm({
      isFiscalEnabled: tenant.fiscal_config?.isFiscalEnabled ?? false,
      environment: tenant.fiscal_config?.environment ?? 'HOMOLOGATION',
      defaultNfeCfop: tenant.fiscal_config?.defaultNfeCfop ?? '5102',
      defaultNfseCode: tenant.fiscal_config?.defaultNfseCode ?? '07.10',
      issTaxRate: tenant.fiscal_config?.issTaxRate ?? 3.0,
      autoEmitOnPayment: false,
    });
    setFiscalModalOpen(true);
  };

  const handleSaveFiscalConfig = async () => {
    if (!selectedFiscalTenant) return;
    setFiscalSaving(true);
    try {
      const res = await fetch('/api/admin/fiscal/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'danielsmlopes@hotmail.com',
        },
        body: JSON.stringify({
          tenantId: selectedFiscalTenant.id,
          ...fiscalForm,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setActionMessage(data.message || 'Chave fiscal atualizada!');
        setFiscalModalOpen(false);
        await fetchTenants();
        setTimeout(() => setActionMessage(null), 4000);
      } else {
        alert(data.error || 'Erro ao atualizar chave fiscal');
      }
    } catch (e: any) {
      alert(e.message || 'Erro ao comunicar com a API fiscal');
    } finally {
      setFiscalSaving(false);
    }
  };

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

  const fetchCorporateStatus = async () => {
    try {
      const res = await fetch('/api/admin/whatsapp/corporate', {
        headers: { 'x-user-email': 'danielsmlopes@hotmail.com' },
      });
      const data = await res.json();
      if (data.success) {
        setCorpState(data.state || 'close');
        setCorpNumber(data.connectedNumber || null);
      }
    } catch {}
  };

  const handleConnectCorporate = async () => {
    setLoadingCorp(true);
    setShowCorpQrModal(true);
    try {
      const res = await fetch('/api/admin/whatsapp/corporate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'danielsmlopes@hotmail.com',
        },
        body: JSON.stringify({ action: 'CONNECT' }),
      });
      const data = await res.json();
      if (data.qrcode) {
        setCorpQrCode(data.qrcode);
        setCorpState('connecting');
      }
    } catch {
    } finally {
      setLoadingCorp(false);
    }
  };

  const handleDisconnectCorporate = async () => {
    if (!confirm('Deseja realmente desconectar o WhatsApp Matriz da Jhoston?')) return;
    try {
      await fetch('/api/admin/whatsapp/corporate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'danielsmlopes@hotmail.com',
        },
        body: JSON.stringify({ action: 'DISCONNECT' }),
      });
      setCorpState('close');
      setCorpNumber(null);
    } catch {}
  };

  const handleSendCorporateTest = async () => {
    setLoadingCorp(true);
    try {
      const res = await fetch('/api/admin/whatsapp/corporate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'danielsmlopes@hotmail.com',
        },
        body: JSON.stringify({ action: 'SEND_TEST', targetPhone: '5511999998888' }),
      });
      if (res.ok) {
        setCorpTestSuccess(true);
        setTimeout(() => setCorpTestSuccess(false), 3500);
      }
    } catch {
    } finally {
      setLoadingCorp(false);
    }
  };

  useEffect(() => {
    fetchTenants();
    fetchCorporateStatus();
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

      {/* 2. WhatsApp Corporativo Matriz Jhoston Pools */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 border border-amber-500/40 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Building2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-black text-white text-base">
                  WhatsApp Matriz Jhoston Pools & Lagoons (Canal Institucional)
                </h3>
                <span className="text-[10px] text-amber-400 font-mono font-bold">
                  Instância Master: jhoston_corporate_master
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300">
              Conexão central da marca para disparo de laudos periciais de garantia decenal, alertas químicos para a diretoria e informativos da engenharia.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${
              corpState === 'open'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : corpState === 'connecting'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                corpState === 'open' ? 'bg-emerald-400' : corpState === 'connecting' ? 'bg-amber-400' : 'bg-rose-400'
              }`} />
              {corpState === 'open' ? 'MATRIZ CONECTADA' : corpState === 'connecting' ? 'SINCRONIZANDO' : 'DESCONECTADO'}
            </span>
            {corpNumber && (
              <span className="text-[11px] font-mono text-slate-300 font-bold hidden sm:inline">+{corpNumber}</span>
            )}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Status da Linha Corporativa</span>
            <p className="text-[11px] text-slate-400">
              {corpState === 'open'
                ? 'O número institucional da Jhoston está operando normalmente com rota de alta prioridade.'
                : 'Nenhum celular conectado ao canal corporativo master. Conecte via QR Code.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {corpState === 'open' ? (
              <>
                <button
                  type="button"
                  onClick={handleSendCorporateTest}
                  disabled={loadingCorp}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{corpTestSuccess ? 'Enviado!' : 'Testar Mensagem'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDisconnectCorporate}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/20 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>Desconectar</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleConnectCorporate}
                disabled={loadingCorp}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
              >
                {loadingCorp ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Conectando...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Conectar WhatsApp Matriz (QR Code)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Modal QR Code Matriz */}
        {showCorpQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-6 shadow-2xl relative text-center">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-extrabold text-white">WhatsApp Matriz Jhoston</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCorpQrModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <span className="text-base font-bold">✕</span>
                </button>
              </div>

              <div className="p-4 bg-white rounded-2xl inline-block mx-auto shadow-inner">
                {corpQrCode ? (
                  <img
                    src={corpQrCode.startsWith('data:') ? corpQrCode : `data:image/png;base64,${corpQrCode}`}
                    alt="QR Code WhatsApp Matriz"
                    className="w-48 h-48 object-contain"
                  />
                ) : (
                  <div className="w-48 h-48 flex flex-col items-center justify-center gap-2 text-slate-400">
                    <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
                    <span className="text-xs font-bold text-slate-600">Gerando QR Code...</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-300 font-semibold">
                  Escaneie com o WhatsApp institucional da Jhoston Pools
                </p>
                <p className="text-[11px] text-slate-500">
                  Instância oficial compartilhada com o comitê pericial.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCorpQrModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
              >
                Fechar Janela
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2.5. Modern Bento Box Grid do Cockpit Master */}
      <BentoCockpitGrid
        onOpenUserManagement={onOpenUserManagement}
        onOpenFiscalModal={() => {
          if (tenants.length > 0) {
            handleOpenFiscalModal(tenants[0]);
          } else {
            setFiscalModalOpen(true);
          }
        }}
        onNavigateTab={onNavigateTab}
        corpState={corpState}
        totalTenants={tenants.length}
      />

      {/* 3. 4 Pilares de Controle Soberano do MASTER */}
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
                <th className="py-3 px-4">Chave Fiscal (NF-e/NFS-e)</th>
                <th className="py-3 px-4">Status WhatsApp</th>
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
                      <button
                        onClick={() => handleOpenFiscalModal(t)}
                        className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                          t.fiscal_config?.isFiscalEnabled
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                        }`}
                        title="Configurar Chave Fiscal deste Tenant (Super Admin)"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                        <span>
                          {t.fiscal_config?.isFiscalEnabled 
                            ? `Liberado (${t.fiscal_config.environment === 'PRODUCTION' ? 'PROD' : 'HOMOLOG'})` 
                            : 'Bloqueado (Standby)'}
                        </span>
                      </button>
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

      {/* Modal Soberano de Liberação da Chave Fiscal */}
      {fiscalModalOpen && selectedFiscalTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-amber-500/40 p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Receipt className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-black text-white text-base">
                    Governança Fiscal • Super Usuário
                  </h3>
                  <p className="text-xs text-amber-400 font-mono">
                    {selectedFiscalTenant.trade_name || selectedFiscalTenant.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFiscalModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Chave Mestre de Liberação */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-sm block">Status da Chave Fiscal</span>
                    <span className="text-slate-400 text-[11px]">
                      Habilita o motor de NF-e e NFS-e para este tenant específico
                    </span>
                  </div>
                  <button
                    onClick={() => setFiscalForm(f => ({ ...f, isFiscalEnabled: !f.isFiscalEnabled }))}
                    className={`px-4 py-2 rounded-xl font-black text-xs transition cursor-pointer flex items-center gap-1.5 ${
                      fiscalForm.isFiscalEnabled
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {fiscalForm.isFiscalEnabled ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    <span>{fiscalForm.isFiscalEnabled ? 'LIBERADO' : 'BLOQUEADO'}</span>
                  </button>
                </div>
              </div>

              {/* Ambiente: Homologação vs Produção */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">Ambiente Operacional Sefaz / Prefeitura</label>
                <select
                  value={fiscalForm.environment}
                  onChange={(e) => setFiscalForm(f => ({ ...f, environment: e.target.value as any }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-amber-400 outline-none"
                >
                  <option value="HOMOLOGATION">HOMOLOGAÇÃO (Ambiente de Testes / Sem valor jurídico)</option>
                  <option value="PRODUCTION">PRODUÇÃO (Sefaz Oficial com Validade Jurídica e Fiscal)</option>
                </select>
              </div>

              {/* CFOP Padrão para NF-e */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 block">CFOP Padrão (NF-e)</label>
                  <select
                    value={fiscalForm.defaultNfeCfop}
                    onChange={(e) => setFiscalForm(f => ({ ...f, defaultNfeCfop: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-amber-400 outline-none"
                  >
                    <option value="5102">5102 - Venda Mercadoria Dentro do Estado</option>
                    <option value="5405">5405 - Venda com Substituição Tributária (ST)</option>
                    <option value="6102">6102 - Venda Mercadoria Fora do Estado</option>
                  </select>
                </div>

                {/* Código de Serviço NFS-e */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 block">Item Serviço (NFS-e LC 116)</label>
                  <select
                    value={fiscalForm.defaultNfseCode}
                    onChange={(e) => setFiscalForm(f => ({ ...f, defaultNfseCode: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-amber-400 outline-none"
                  >
                    <option value="07.10">07.10 - Limpeza, Manutenção de Piscinas</option>
                    <option value="07.02">07.02 - Execução e Reforma Civil</option>
                    <option value="17.01">17.01 - Consultoria Técnica Pericial</option>
                  </select>
                </div>
              </div>

              {/* Alíquota de ISS e Emissão Automática */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 block">Alíquota ISS Municipal (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="2"
                    max="5"
                    value={fiscalForm.issTaxRate}
                    onChange={(e) => setFiscalForm(f => ({ ...f, issTaxRate: parseFloat(e.target.value) || 3.0 }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-amber-400 outline-none"
                  />
                </div>

                <div className="space-y-1.5 flex flex-col justify-end">
                  <label className="font-bold text-slate-300 block mb-1">Emissão Automática ao Pagar PIX</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="autoEmitCheck"
                      checked={fiscalForm.autoEmitOnPayment}
                      onChange={(e) => setFiscalForm(f => ({ ...f, autoEmitOnPayment: e.target.checked }))}
                      className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700"
                    />
                    <label htmlFor="autoEmitCheck" className="text-[11px] text-slate-300">
                      Disparar NFS-e automática
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setFiscalModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveFiscalConfig}
                disabled={fiscalSaving}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition flex items-center gap-2 disabled:opacity-50"
              >
                {fiscalSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>Salvar Permissões Fiscais</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
