'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  User, 
  Users, 
  Hotel, 
  Store, 
  ShieldCheck, 
  LogIn, 
  PlayCircle,
  Waves,
  Award
} from 'lucide-react';

interface DemoAccount {
  name: string;
  role: string;
  email: string;
  sector: string;
  icon: any;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  { name: 'AcquaClean Solo', role: 'Tratador Autônomo', email: 'teste.solo@teste.com', sector: 'SOLO', icon: User },
  { name: 'PoolMaster Frotas', role: 'Gerente Operacional', email: 'teste.frota@teste.com', sector: 'FLEET', icon: Users },
  { name: 'Resort Vista Bela', role: 'Governança Facility', email: 'teste.facility@teste.com', sector: 'FACILITY', icon: Hotel },
  { name: 'AcquaShop Balcão', role: 'Atendente Balcão', email: 'teste.loja@teste.com', sector: 'RETAIL', icon: Store },
  { name: 'Jhoston Engenharia', role: 'Diretoria Pericial', email: 'teste.jhoston@teste.com', sector: 'ENTERPRISE', icon: ShieldCheck },
];

export function MarketingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* BLOCO ESQUERDO: BRAND IDENTITY */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 group-hover:shadow-cyan-500/30 transition-all duration-300">
            <Waves className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent tracking-wider block">
                JHPCS
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/30">
                by Jhoston Pools & Lagoons
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block font-medium">PoolTech Ecosystem</span>
          </div>
        </Link>

        {/* BLOCO CENTRAL: NAVEGAÇÃO DESKTOP */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-300">
          <Link href="/" className="hover:text-cyan-400 transition-colors py-1">
            Início
          </Link>
          <Link href="/solucoes" className="hover:text-cyan-400 transition-colors py-1">
            Soluções por Setor
          </Link>
          <Link href="/planos" className="hover:text-cyan-400 transition-colors py-1">
            Planos & Preços
          </Link>
          <Link href="/benchmarking" className="hover:text-emerald-400 transition-colors py-1 flex items-center gap-1.5 text-emerald-300 font-extrabold">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Score 100 & Benchmarking</span>
          </Link>
          <Link href="/garantia-jhoston" className="hover:text-amber-400 transition-colors py-1 flex items-center gap-1.5 text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Garantia Jhoston</span>
          </Link>
          <Link href="/gadap" className="hover:text-cyan-400 transition-colors py-1 flex items-center gap-1.5 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>A GADAP</span>
          </Link>
        </nav>

        {/* BLOCO DIREITO: AÇÕES RÁPIDAS & ACESSOS (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Dropdown Ambientes Demo */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ambientes Demo</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${demoDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {demoDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800 p-2 shadow-2xl space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setDemoDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800/80">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                    Selecione um Perfil de Demonstração
                  </span>
                </div>
                {DEMO_ACCOUNTS.map((acc, i) => {
                  const Icon = acc.icon;
                  return (
                    <Link
                      key={i}
                      href={`/cockpit?demo_email=${encodeURIComponent(acc.email)}`}
                      onClick={() => setDemoDropdownOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-slate-800 flex items-center gap-2.5 transition text-left group"
                    >
                      <div className="p-2 rounded-lg bg-slate-950 text-cyan-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <strong className="text-xs text-white block truncate">{acc.name}</strong>
                          <span className="text-[9px] font-mono text-cyan-400 font-semibold">{acc.sector}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block truncate">{acc.role}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href="/cockpit"
            className="px-3.5 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5 text-slate-400" />
            <span>Cockpit Master</span>
          </Link>

          <Link
            href="/onboarding"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-400 hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Criar Conta / Teste Grátis</span>
          </Link>
        </div>

        {/* NAVEGAÇÃO MOBILE (HAMBÚRGUER) */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/onboarding"
            className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-black text-xs"
          >
            Teste Grátis
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MENU SUSPENSO / DRAWER MOBILE */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-xs font-bold text-slate-300">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-slate-900 hover:text-white transition"
            >
              Início
            </Link>
            <Link
              href="/solucoes"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-slate-900 hover:text-white transition"
            >
              Soluções por Setor
            </Link>
            <Link
              href="/planos"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-slate-900 hover:text-white transition"
            >
              Planos & Preços
            </Link>
            <Link
              href="/garantia-jhoston"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-slate-900 text-amber-300 flex items-center gap-2 transition"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Garantia Jhoston (Perícia)</span>
            </Link>
            <Link
              href="/gadap"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-slate-900 text-cyan-300 flex items-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>A GADAP (Holding & Arquitetura)</span>
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
              Contas de Demonstração Interativa
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {DEMO_ACCOUNTS.map((acc, i) => (
                <Link
                  key={i}
                  href={`/cockpit?demo_email=${encodeURIComponent(acc.email)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-slate-900 text-xs font-bold text-slate-200 flex items-center justify-between hover:bg-slate-800 transition"
                >
                  <span>{acc.name}</span>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold">{acc.sector}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/cockpit"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs font-bold text-center block border border-slate-800 transition"
            >
              Acessar Cockpit Master
            </Link>
            <Link
              href="/onboarding"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-black text-xs text-center block shadow-lg shadow-cyan-500/20"
            >
              Criar Conta / Teste Grátis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

