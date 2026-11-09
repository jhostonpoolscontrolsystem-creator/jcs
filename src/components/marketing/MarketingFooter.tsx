'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  ExternalLink, 
  CheckCircle2, 
  Droplet, 
  Lock, 
  Award,
  Layers,
  Heart
} from 'lucide-react';

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      
      {/* 4 Colunas Corporativas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Coluna 1: Identidade & Chancela */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-cyan-500/20">
              J
            </div>
            <div>
              <span className="font-black text-sm text-white tracking-wider block">JHPCS</span>
              <span className="text-[10px] text-cyan-400 font-mono font-bold">PoolTech Ecosystem</span>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            Plataforma unificada de inteligência físico-química de borda, controle de frotas, logbook sanitário e blindagem pericial de revestimentos nobres.
          </p>

          <div className="pt-1 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
              Chancela de Engenharia:
            </span>
            <span className="text-xs text-white font-bold block">
              Jhoston Pools & Lagoons Ltda.
            </span>
          </div>

          <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Next.js 16</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Supabase</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Cloudflare R2</span>
          </div>
        </div>

        {/* Coluna 2: Soluções por Setor */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-white uppercase tracking-wider">
            Soluções Especializadas
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/solucoes?sector=solo" className="hover:text-cyan-400 transition block">
                Tratador Autônomo (Plano Solo)
              </Link>
            </li>
            <li>
              <Link href="/solucoes?sector=fleet" className="hover:text-cyan-400 transition block">
                Frotas & Rotas (Plano Fleet)
              </Link>
            </li>
            <li>
              <Link href="/solucoes?sector=facility" className="hover:text-cyan-400 transition block">
                Hotéis, Resorts & Clubes (Facility)
              </Link>
            </li>
            <li>
              <Link href="/solucoes?sector=retail" className="hover:text-cyan-400 transition block">
                Lojas de Piscinas & Revendas (Retail)
              </Link>
            </li>
            <li>
              <Link href="/garantia-jhoston" className="hover:text-amber-400 transition block text-amber-300">
                Construtoras & Garantia Decenal
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Engenharia & Legal */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-white uppercase tracking-wider">
            Engenharia & Compliance
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/garantia-jhoston" className="hover:text-white transition block">
                Protocolo dos 28 Dias de Cura
              </Link>
            </li>
            <li>
              <Link href="/selo" className="hover:text-white transition block">
                Selo de Conformidade NBR 10.818
              </Link>
            </li>
            <li>
              <span className="text-slate-500 block">
                Blindagem LGPD (Lei 13.709/18)
              </span>
            </li>
            <li>
              <span className="text-slate-500 block">
                Termos de Licença & SLA
              </span>
            </li>
            <li>
              <span className="text-slate-500 block">
                Diretrizes Sanitárias Anvisa
              </span>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Status Operacional & Contato */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-white uppercase tracking-wider">
            Status & Atendimento
          </h4>

          {/* Status ao vivo */}
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-xs text-white">Sistemas Operacionais 100%</strong>
            </div>
            <p className="text-[10px] text-slate-400">
              Edge Cloudflare, Supabase REST e Evolution API monitorados continuamente.
            </p>
          </div>

          <div className="space-y-1.5 pt-1 text-xs">
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
              className="w-full py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <span>Suporte via WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      {/* Barra Inferior com Créditos */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
          <p>
            Copyright © 2026 JHPCS PoolTech Ecosystem. Desenvolvido e homologado por <strong className="text-slate-300">Daniel Lopes & Patrícia Grübel</strong>. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Privacidade</span>
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
