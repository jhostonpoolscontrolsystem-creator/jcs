'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Award,
  Layers,
  ArrowRight,
  ExternalLink
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
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* BRAND IDENTITY */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <Image
            src="/images/jhpcs-full-logo.png"
            alt="JHPCS PoolTech Ecosystem"
            width={210}
            height={52}
            priority
            className="h-10 sm:h-11 w-auto object-contain group-hover:brightness-110 transition-all duration-300"
          />
        </Link>

        {/* NAVEGAÇÃO DESKTOP REFINADA */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
          
          {/* Dropdown Soluções */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              onMouseEnter={() => setSolutionsOpen(true)}
              className="hover:text-cyan-400 transition-colors py-2 flex items-center gap-1 cursor-pointer"
            >
              <span>Soluções</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>

            {solutionsOpen && (
              <div 
                className="absolute left-0 mt-1 w-64 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800 p-2 shadow-2xl space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <Link
                  href="/solucoes"
                  onClick={() => setSolutionsOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-slate-800/80 block transition"
                >
                  <strong className="text-xs text-white block">Todas as Soluções</strong>
                  <span className="text-[11px] text-slate-400 block">Visão geral por setor de atuação</span>
                </Link>
                <div className="border-t border-slate-800/80 my-1" />
                <Link
                  href="/garantia-jhoston"
                  onClick={() => setSolutionsOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-slate-800/80 flex items-center gap-2.5 transition"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-xs text-amber-300 block">Garantia Decenal</strong>
                    <span className="text-[10px] text-slate-400 block">Perícia e proteção de substrato</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link href="/planos" className="hover:text-cyan-400 transition-colors py-1">
            Planos
          </Link>

          <Link href="/benchmarking" className="hover:text-emerald-400 transition-colors py-1 flex items-center gap-1.5 text-slate-300 hover:text-emerald-300">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Score 100</span>
          </Link>

          <Link href="/gadap" className="hover:text-cyan-400 transition-colors py-1 flex items-center gap-1.5 text-slate-300">
            <span>A GADAP</span>
          </Link>

          {/* Demonstrações Interativas */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="text-slate-400 hover:text-cyan-300 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer py-1"
            >
              <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ver Demos</span>
              <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${demoDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {demoDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800 p-2 shadow-2xl space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setDemoDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800/80">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                    Ambientes de Demonstração
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
        </nav>

        {/* AÇÕES DE CONVERSÃO (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5 text-cyan-400" />
            <span>Acessar</span>
          </Link>

          <Link
            href="/onboarding"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-400 hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 flex items-center gap-1.5"
          >
            <span>Teste Grátis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* NAVEGAÇÃO MOBILE */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/login"
            className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300 text-xs font-bold"
          >
            Entrar
          </Link>
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

      {/* DRAWER MOBILE */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-2 text-xs font-bold text-slate-300">
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
              href="/benchmarking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-slate-900 text-emerald-300 flex items-center gap-2 transition"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Score 100 & Benchmarking</span>
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
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-slate-200 hover:text-white text-xs font-bold text-center block border border-slate-800 transition"
            >
              Entrar na Conta
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
