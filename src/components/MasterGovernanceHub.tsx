'use client';

import React, { useState } from 'react';
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
  ExternalLink
} from 'lucide-react';
import { UserRole } from '@/types/database';

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
                Homologação de Contas & Governança Geral
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Centro de Comando & Governança <span className="text-amber-400">JHPCS</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Ambiente restrito e soberano de Daniel Lopes e Patrícia Grübel. Controle da árvore hierárquica, aprovação formal de usuários, auditoria de integridade do banco de dados e disparo executivo.
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

        {/* Pilar 3: Auditoria do Motor Químico */}
        <div 
          onClick={() => onNavigateTab('audit_live')}
          className="glass-panel shimmer-border rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer group space-y-3"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 group-hover:scale-105 transition">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
              LSI Engine
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white group-hover:text-cyan-400 transition">
              Diretrizes de Garantia & Langelier
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Calibração das fórmulas de saturação para proteção anti-corrosão dos monólitos.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-cyan-400 font-semibold">
            <span>Ver Especificações</span>
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
    </div>
  );
}
