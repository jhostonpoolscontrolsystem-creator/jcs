import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Droplet, 
  Clock, 
  CloudSun, 
  ShoppingBag, 
  Download, 
  ExternalLink,
  ArrowRight,
  Heart,
  Building2,
  Award
} from 'lucide-react';

export const metadata = {
  title: 'Guia do Cliente — Portal de Garantia & Digital Twin JHoston Pools',
  description: 'Guia de Boas-Vindas e acompanhamento contínuo da Garantia Decenal do seu revestimento monolítico.',
};

export default function GuiaClientePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo JHPCS" className="h-10 w-10 object-contain" />
            <div>
              <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest block">
                PORTAL DO CLIENTE • DIGITAL TWIN
              </span>
              <h1 className="text-lg font-black text-white">JHoston Pools & Engenharia</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/pdf/client-magazine"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition shadow-md shadow-cyan-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Guia em PDF</span>
            </a>
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-800 transition"
            >
              Acessar Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 font-mono text-xs font-bold">
          <Award className="w-3.5 h-3.5" />
          GARANTIA DECENAL ATIVA & PROTEÇÃO QUÍMICA
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
          Parabéns pela Sua Escolha do Revestimento Monolítico JHoston
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Diferente de piscinas convencionais de azulejo ou fibra, o revestimento monolítico é uma obra de arte da engenharia mineral: alta resistência mecânica, atérmico, toque macio de areia e desenvolvido para durar décadas.
          A partir de hoje, sua piscina conta com uma réplica digital (<strong>Digital Twin</strong>) que monitora a água e audita as visitas do tratador para que você desfrute com tranquilidade absoluta.
        </p>

        {/* Atalhos para Baixar Edições Personalizadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl pt-2">
          <a
            href="/api/pdf/client-magazine?clientType=B2B_HOTEL"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">Segmento Corporativo</span>
              <strong className="text-white text-sm">Edição Especial para Hotéis & Resorts</strong>
            </div>
            <Download className="w-4 h-4 text-amber-400" />
          </a>

          <a
            href="/api/pdf/client-magazine?clientType=B2C_FAMILIA"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">Segmento Residencial</span>
              <strong className="text-white text-sm">Edição Especial para Família & Lazer</strong>
            </div>
            <Download className="w-4 h-4 text-cyan-400" />
          </a>
        </div>
      </section>

      {/* Funcionalidades do Portal */}
      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-white border-b border-slate-800 pb-4">
          O que Você Tem em Mãos no Portal do Cliente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-amber-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Plano de Manutenção Ativo (3 Anos)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Substituímos a garantia tradicional pelo cuidado ativo: contato semanal sem mensalidade com seu tratador e intervenções anuais (Ano 1, 2 e 3) com mão de obra técnica 100% isenta!
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Cronômetro de Cura Submersa</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Contagem regressiva dos primeiros 28 dias após a aplicação com registro de escovação suave diária para maturação perfeita da resina.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400">
              <CloudSun className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Previsão Climática Preditiva</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Conexão live com a OpenWeather. Avisa com até 72h de antecedência sobre temporais para que o tratador compense o cloro antes da chuva.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>JHoston Pools • Engenharia de Revestimentos Monolíticos</p>
        <p className="mt-1 font-mono text-[11px] text-cyan-400">jcs-pools.vercel.app</p>
      </footer>
    </div>
  );
}
