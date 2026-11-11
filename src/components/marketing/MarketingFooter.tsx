'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  ExternalLink, 
  Waves
} from 'lucide-react';

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      
      {/* 4 Colunas Corporativas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Coluna 1: Identidade & Propósito */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-cyan-500/20">
              <Waves className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-sm text-white tracking-wider block">JHPCS</span>
              <span className="text-[10px] text-cyan-400 font-mono font-bold">PoolTech Ecosystem</span>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            Plataforma SaaS unificada de inteligência físico-química de borda, gestão de frotas e rotas, logbook sanitário e blindagem pericial de revestimentos nobres.
          </p>

          <div className="pt-1 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
              Chancela de Engenharia:
            </span>
            <span className="text-xs text-white font-bold block">
              Jhoston Pools & Lagoons Ltda.
            </span>
            <div className="pt-1">
              <Link href="/gadap" className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 transition">
                <span>Uma plataforma desenvolvida por GADAP Engenharia & Sistemas</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </Link>
            </div>
          </div>

          {/* Badges de Tecnologia */}
          <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-400">
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800/80">Next.js 15</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800/80">Supabase PostgreSQL</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800/80">Cloudflare R2</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800/80">Evolution API</span>
          </div>
        </div>

        {/* Coluna 2: Soluções Modulares */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-white uppercase tracking-wider">
            Soluções Modulares
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/solucoes?sector=solo" className="hover:text-cyan-400 transition-colors block">
                Tratador Autônomo (Solo)
              </Link>
            </li>
            <li>
              <Link href="/solucoes?sector=fleet" className="hover:text-cyan-400 transition-colors block">
                Empresas de Manutenção (Fleet)
              </Link>
            </li>
            <li>
              <Link href="/solucoes?sector=facility" className="hover:text-cyan-400 transition-colors block">
                Condomínios e Hotéis (Facility)
              </Link>
            </li>
            <li>
              <Link href="/solucoes?sector=retail" className="hover:text-cyan-400 transition-colors block">
                Lojas e Revendas (Retail)
              </Link>
            </li>
            <li>
              <Link href="/garantia-jhoston" className="hover:text-amber-400 transition-colors block text-amber-300">
                Fabricante / Garantia (Enterprise)
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Engenharia, Conformidade & Legal */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-white uppercase tracking-wider">
            Engenharia & Conformidade
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/garantia-jhoston" className="hover:text-cyan-400 transition-colors block">
                Protocolo de Garantia Decenal (Jhoston)
              </Link>
            </li>
            <li>
              <Link href="/selo" className="hover:text-cyan-400 transition-colors block">
                Certificação Técnica NBR 10.818 / RDC Anvisa
              </Link>
            </li>
            <li>
              <span className="text-slate-400 block hover:text-white transition-colors cursor-default">
                Conformidade LGPD (Lei nº 13.709/18)
              </span>
            </li>
            <li>
              <span className="text-slate-400 block hover:text-white transition-colors cursor-default">
                Termos de Uso do Serviço
              </span>
            </li>
            <li>
              <span className="text-slate-400 block hover:text-white transition-colors cursor-default">
                Política de Privacidade & SLA
              </span>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Monitoramento & Suporte */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-white uppercase tracking-wider">
            Monitoramento & Suporte
          </h4>

          {/* Indicador em tempo real */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
              <strong className="text-xs text-white">Todos os sistemas operacionais</strong>
            </div>
            <p className="text-[10px] text-emerald-400/90 font-mono font-medium">
              100% Uptime • Edge Cloudflare & APIs
            </p>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>engenharia@jhostontec.com.br</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>+55 (11) 99999-8888</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/5511999998888"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Suporte via WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      {/* Faixa Inferior (Sub-footer) */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
          <p>
            © 2026 JHPCS PoolTech Ecosystem. Todos os direitos reservados. Governança e Arquitetura por <strong className="text-slate-300 font-semibold">Daniel Lopes & Patrícia Grübel</strong>.
          </p>
          <div className="flex items-center gap-3 text-slate-400 font-medium">
            <span>Privacidade</span>
            <span>•</span>
            <span>Termos</span>
            <span>•</span>
            <span>Segurança</span>
            <span>•</span>
            <span>LGPD Compliant</span>
          </div>
        </div>
      </div>

    </footer>
  );
}

