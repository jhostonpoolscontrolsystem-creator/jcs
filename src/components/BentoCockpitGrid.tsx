'use client';

import React from 'react';
import {
  ShieldCheck,
  Building2,
  Users,
  Activity,
  Droplet,
  ShoppingBag,
  TrendingUp,
  CloudLightning,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Award,
  Wallet,
  QrCode,
  FileText
} from 'lucide-react';
import Link from 'next/link';

interface BentoCockpitGridProps {
  onOpenUserManagement: () => void;
  onOpenFiscalModal: () => void;
  onNavigateTab: (tab: any) => void;
  corpState: 'open' | 'connecting' | 'close';
  totalTenants: number;
}

export function BentoCockpitGrid({
  onOpenUserManagement,
  onOpenFiscalModal,
  onNavigateTab,
  corpState,
  totalTenants,
}: BentoCockpitGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]">
      {/* 1. HERO BENTO CARD: SOBERANIA & MARGEM BRUTA 92% (Col 8) */}
      <div className="md:col-span-8 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cockpit Master F1 • JHPCS Ecosystem v6.21</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-extrabold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Score 100 / 100
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Governança Soberana, Perícia Decenal & Lucro Recorrente
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Painel unificado multi-tenant para Daniel Lopes & Patrícia Grübel. Controle soberano de frotas, hotéis Anvisa, receituário de balcão e chave fiscal de contingência.
          </p>
        </div>

        <div className="relative z-10 pt-6 mt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400">Tenants Ativos</p>
            <p className="text-xl sm:text-2xl font-black text-white mt-0.5">{totalTenants || 5}</p>
            <p className="text-[10px] text-cyan-400 font-mono mt-0.5">Isolamento RLS</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400">Margem Bruta</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">&gt; 92%</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Custo R2 Zero Egress</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400">Status Matriz</p>
            <p className="text-sm sm:text-base font-bold text-white mt-1 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${corpState === 'open' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              {corpState === 'open' ? 'WhatsApp OK' : 'Desconectado'}
            </p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Evolution API</p>
          </div>
        </div>
      </div>

      {/* 2. BENTO CARD: CHAVE FISCAL SOBERANA (Col 4) */}
      <div 
        onClick={onOpenFiscalModal}
        className="md:col-span-4 bg-gradient-to-br from-[#0F172A] to-amber-950/20 border border-amber-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between cursor-pointer group hover:border-amber-400 transition"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30">
              Super Admin Gate
            </span>
          </div>

          <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition">
            Chave Fiscal & Cofre A1
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            Controle de ativação NF-e / NFS-e por tenant, custódia de certificados no Supabase Vault com chave KMS AES-256 e modo Standby a custo zero.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-bold">
          <span>Abrir Governança Fiscal</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </div>
      </div>

      {/* 3. BENTO CARD: RECEITUÁRIO DE BALCÃO LOJA (Col 4) */}
      <Link 
        href="/trade/balcao"
        className="md:col-span-4 bg-[#0F172A] border border-slate-800 hover:border-cyan-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition group"
      >
        <div>
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Retail & Lojas</span>
          <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-cyan-300 transition">
            Balcão & PIX Expresso
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Diagnóstico de garrafinha com seletores táteis rápidos em 3s, carrinho fechado com NCM e QR Code PIX imediato.
          </p>
        </div>
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-bold">
          <span>Acessar Balcão</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </div>
      </Link>

      {/* 4. BENTO CARD: CADERNO ANVISA RESORTS & HOTÉIS (Col 4) */}
      <Link 
        href="/logbook-sanitario"
        className="md:col-span-4 bg-[#0F172A] border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition group"
      >
        <div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Facility & Clubes</span>
          <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-emerald-300 transition">
            Logbook Sanitário Anvisa
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Caderno digital NBR 10.818 com geofencing de 50 metros, selo público de conformidade para hóspedes e impressão oficial.
          </p>
        </div>
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-bold">
          <span>Abrir Caderno Anvisa</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </div>
      </Link>

      {/* 5. BENTO CARD: HOMOLOGAÇÃO DE USUÁRIOS MASTER (Col 4) */}
      <div 
        onClick={onOpenUserManagement}
        className="md:col-span-4 bg-[#0F172A] border border-slate-800 hover:border-purple-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition cursor-pointer group"
      >
        <div>
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Segurança & RBAC</span>
          <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-purple-300 transition">
            Fila de Usuários & Franquias
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Aprovação soberana de novos operadores, atribuição de cargos e blindagem de dados sensíveis conforme LGPD.
          </p>
        </div>
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-bold">
          <span>Gerenciar Operadores</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </div>
      </div>
    </div>
  );
}

