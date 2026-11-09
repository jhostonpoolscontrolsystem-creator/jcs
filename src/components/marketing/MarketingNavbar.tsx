'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  ArrowRight, 
  User, 
  Users, 
  Hotel, 
  Store, 
  ShieldCheck, 
  LogIn, 
  PlayCircle,
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
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO & BRAND */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
            J
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-white tracking-wider block">JHPCS</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/30">
                by Jhoston
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block font-medium">PoolTech Ecosystem</span>
          </div>
        </Link>

        {/* LINKS CENTRAIS (DESKTOP) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-300">
          <Link href="/" className="hover:text-cyan-400 transition py-1">
            Início
          </Link>
          <Link href="/solucoes" className="hover:text-cyan-400 transition py-1">
            Soluções por Setor
          </Link>
          <Link href="/planos" className="hover:text-cyan-400 transition py-1">
            Planos & Preços
          </Link>
          <Link href="/garantia-jhoston" className="hover:text-amber-400 transition py-1 flex items-center gap-1 text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Garantia Jhoston</span>
          </Link>
        </nav>

        {/* BOTÕES À DIREITA (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Dropdown Ambientes Demo */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-800 transition flex items-center gap-1.5 cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ambientes Demo</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {demoDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-2xl space-y-1 animate-fadeIn z-50"
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
                      href={`/?demo_email=${encodeURIComponent(acc.email)}`}
                      onClick={() => setDemoDropdownOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-slate-800 flex items-center gap-2.5 transition text-left group"
                    >
                      <div className="p-2 rounded-lg bg-slate-950 text-cyan-400 group-hover:scale-105 transition">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <strong className="text-xs text-white block truncate">{acc.name}</strong>
                          <span className="text-[9px] font-mono text-cyan-400">{acc.sector}</span>
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
            href="/"
            className="px-3.5 py-2 rounded-xl text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5 text-slate-400" />
            <span>Entrar no Sistema</span>
          </Link>

          <Link
            href="/onboarding"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black text-xs transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Criar Conta</span>
          </Link>
        </div>

        {/* HAMBÚRGUER MOBILE */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/onboarding"
            className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-black text-xs"
          >
            Criar Conta
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MENU MOBILE EXPANSÍVEL */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-3 text-xs font-bold text-slate-300">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-900 hover:text-white"
            >
              Início
            </Link>
            <Link
              href="/solucoes"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-900 hover:text-white"
            >
              Soluções por Setor
            </Link>
            <Link
              href="/planos"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-900 hover:text-white"
            >
              Planos & Preços
            </Link>
            <Link
              href="/garantia-jhoston"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-900 text-amber-300 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Garantia Jhoston (Perícia)</span>
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
                  href={`/?demo_email=${encodeURIComponent(acc.email)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-900 text-xs font-bold text-slate-200 flex items-center justify-between"
                >
                  <span>{acc.name}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">{acc.sector}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold text-center block"
            >
              Entrar no Cockpit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
