'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Droplet, 
  Compass, 
  Building2, 
  Users, 
  Hotel, 
  Store, 
  Smartphone, 
  Cloud, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Cpu, 
  FileText, 
  Layers, 
  Award,
  PlayCircle,
  ExternalLink,
  HelpCircle,
  Clock,
  PhoneCall,
  X,
  User
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'O aplicativo de campo funciona sem sinal de internet na piscina?',
    answer: 'Sim! O PWA de campo do JHPCS foi construído na arquitetura Offline-First com IndexedDB. Os técnicos registram os parâmetros químicos, fotos comprobatórias e geolocalização mesmo no subsolo ou em áreas rurais. Assim que o aparelho detecta rede 4G ou Wi-Fi, a sincronização é efetuada automaticamente com a nuvem e com os disparos de laudos.',
  },
  {
    question: 'Meus concorrentes ou a administração do sistema podem ver meus clientes ou valores?',
    answer: 'Não. O JHPCS implementa isolamento multi-tenant estrito com Row Level Security (RLS) no Supabase e criptografia ponta a ponta. Em conformidade absoluta com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/18), dados sensíveis como telefones e nomes de clientes finais possuem mascaramento nativo e sigilo comercial garantido.',
  },
  {
    question: 'O sistema já emite Nota Fiscal?',
    answer: 'A arquitetura do módulo fiscal já está totalmente estruturada em standby no banco de dados e no código (com campos preparados para CFOP, NCM, alíquotas e payload de NFS-e/NFC-e). A emissão direta será ativada sob demanda comercial mediante homologação do gateway bancário.',
  },
  {
    question: 'Por que o ácido muriático bruto é expressamente proibido pela plataforma?',
    answer: 'O ácido muriático bruto ataca agressivamente os polímeros de cura da resina em revestimentos monolíticos, provoca a lixiviação de cobalto em piscinas de fibra e destrói os rejuntes cimentícios de pastilhas. O motor químico ISL do JHPCS bloqueia receitas com este composto para assegurar a vigência da Garantia Decenal da piscina.',
  },
  {
    question: 'Como funciona o teste gratuito de 7 dias?',
    answer: 'Ao concluir o cadastro rápido (com preenchimento automático de CNPJ via Receita Federal), sua conta é liberada imediatamente com todas as ferramentas ativas, inclusive a sua instância dedicada do WhatsApp na Evolution API. Você testa por 7 dias completos sem cobrança prévia e sem necessidade de cartão de crédito.',
  },
];

const DEMO_PROFILES = [
  {
    name: 'AcquaClean Solo',
    role: 'Tratador Autônomo',
    sector: 'SOLO',
    email: 'teste.solo@teste.com',
    desc: 'Diagnóstico rápido com ISL, fotos no Cloudflare R2 e envio com marca própria no WhatsApp.',
    icon: User,
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
  },
  {
    name: 'PoolMaster Frotas',
    role: 'Empresa de Manutenção & Rotas',
    sector: 'FLEET',
    email: 'teste.frota@teste.com',
    desc: 'Geofencing GPS de 50 metros, baixa de químicos no carro por m³ e gestão de rotas da equipe.',
    icon: Users,
    badgeColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10'
  },
  {
    name: 'Resort Vista Bela',
    role: 'Condomínios, Hotéis & Clubes',
    sector: 'FACILITY',
    email: 'teste.facility@teste.com',
    desc: 'Caderno sanitário digital NBR 10.818 / Anvisa, selo de conformidade pública e alerta ao síndico.',
    icon: Hotel,
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
  },
  {
    name: 'AcquaShop Balcão',
    role: 'Lojas de Piscinas & Revendas',
    sector: 'RETAIL',
    email: 'teste.loja@teste.com',
    desc: 'Receituário estequiométrico no balcão, checkout dinâmico PIX e cupom térmico 80mm.',
    icon: Store,
    badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10'
  },
  {
    name: 'Jhoston Engenharia',
    role: 'Construtora & Perícia Decenal',
    sector: 'ENTERPRISE',
    email: 'teste.jhoston@teste.com',
    desc: 'Rastreabilidade de 10 anos, perícia forense de substratos e governança master multi-tenant.',
    icon: ShieldCheck,
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
  }
];

export default function MarketingLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [emailInput, setEmailInput] = useState('');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleQuickSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      window.location.href = `/onboarding?email=${encodeURIComponent(emailInput)}`;
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      
      {/* 1. HERO SECTION (Acima da Dobra) */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-6">
        {/* Glows Decorativos em Cyan & Amber */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Badge de Topo */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold tracking-wide shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>A Primeira Plataforma Unificada com Motor Químico ISL & Garantia Pericial</span>
          </div>

          {/* Headline Monumental */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Inteligência Química, <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">Blindagem de Garantias</span> e Gestão Integrada para Piscinas
          </h1>

          {/* Subheadline Técnica */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Do tratador autônomo e frotas de manutenção a hotéis, condomínios e revendas. A única solução do mercado que une diagnóstico estequiométrico de borda à preservação patrimonial da piscina.
          </p>

          {/* CTAs Primário e Secundário */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Iniciar Teste Gratuito de 7 Dias</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-2 transition cursor-pointer shadow-lg hover:text-white"
            >
              <PlayCircle className="w-4 h-4 text-cyan-400" />
              <span>Ver Demonstração Interativa</span>
            </button>
          </div>

          {/* MOCKUP FLUTUANTE DE CAMPO & WHATSAPP */}
          <div className="pt-10 max-w-3xl mx-auto">
            <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-md text-left space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">Laudo Pericial de Borda • JHPCS Telemetry v6.5</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                  ISL: +0.12 (Água Equilibrada)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">pH Medido</span>
                  <strong className="text-base font-mono text-cyan-400">7.42</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Cloro Livre</span>
                  <strong className="text-base font-mono text-emerald-400">2.5 ppm</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Alcalinidade</span>
                  <strong className="text-base font-mono text-cyan-400">105 ppm</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Dureza Cálcica</span>
                  <strong className="text-base font-mono text-cyan-400">220 ppm</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-300 font-semibold">
                    Revestimento Monolítico Sand preservado contra incrustações ou lixiviação ácida.
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] self-end sm:self-auto">
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp Enviado</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MODAL DE DEMONSTRAÇÃO INTERATIVA */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold border border-cyan-500/30">
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Ambientes de Teste Interativo</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Experimente o JHPCS na Prática
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Selecione o perfil que melhor representa a sua operação aquática para entrar com 1 clique no Cockpit configurado:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {DEMO_PROFILES.map((profile, i) => {
                const Icon = profile.icon;
                return (
                  <Link
                    key={i}
                    href={`/cockpit?demo_email=${encodeURIComponent(profile.email)}`}
                    onClick={() => setIsDemoModalOpen(false)}
                    className="p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 group-hover:scale-105 border border-slate-800 flex items-center justify-center text-cyan-400 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-left space-y-0.5">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-white group-hover:text-cyan-300 transition-colors">
                            {profile.name}
                          </strong>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold border ${profile.badgeColor}`}>
                            {profile.sector}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 block font-medium">
                          {profile.role}
                        </span>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {profile.desc}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>* Não requer senha nem cadastro inicial.</span>
              <button
                type="button"
                onClick={() => setIsDemoModalOpen(false)}
                className="text-xs text-slate-300 hover:text-white font-bold cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. FAIXA DE CREDENCIAIS & AUTORIDADE */}
      <section className="border-y border-slate-800/80 bg-slate-900/50 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div className="space-y-1">
            <div className="flex items-center justify-center text-amber-400 mb-2">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <strong className="text-2xl sm:text-3xl font-black font-mono text-white block">10 Anos</strong>
            <span className="text-xs text-slate-400 font-medium">Garantia Decenal de Revestimento</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center text-cyan-400 mb-2">
              <Activity className="w-7 h-7" />
            </div>
            <strong className="text-2xl sm:text-3xl font-black font-mono text-white block">ISL Calibrado</strong>
            <span className="text-xs text-slate-400 font-medium">Equilíbrio Químico Multi-Substrato</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center text-emerald-400 mb-2">
              <Compass className="w-7 h-7" />
            </div>
            <strong className="text-2xl sm:text-3xl font-black font-mono text-white block">GPS 50m</strong>
            <span className="text-xs text-slate-400 font-medium">Geofencing Real na Piscina</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center text-sky-400 mb-2">
              <Cloud className="w-7 h-7" />
            </div>
            <strong className="text-2xl sm:text-3xl font-black font-mono text-white block">Zero Egress</strong>
            <span className="text-xs text-slate-400 font-medium">Evidências em Cloudflare R2</span>
          </div>

        </div>
      </section>

      {/* 3. SETORES ATENDIDOS & BENEFÍCIOS */}
      <section className="py-20 md:py-28 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
            Flexibilidade Modular
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Soluções Feitas Sob Medida para o Seu Modelo de Negócio
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Diga adeus a planilhas manuais, anotações de papel e laudos genéricos. O JHPCS entrega o que cada perfil precisa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Solo */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Tratadores Autônomos</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                App PWA ultraleve que funciona mesmo sem sinal de celular. Diagnóstico em 15 segundos, fotos ilimitadas de evidências e comprovante profissional no WhatsApp com o seu logotipo.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Cálculo do ISL na hora</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Comprovante WhatsApp automático</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Cobrança facilitada no início do mês</span>
                </li>
              </ul>
            </div>

            <Link
              href="/onboarding"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center block transition"
            >
              Começar com Solo
            </Link>
          </div>

          {/* Card 2: Fleet */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/30 hover:border-cyan-400 transition flex flex-col justify-between space-y-6 relative">
            <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
              Mais Usado por Empresas
            </span>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Empresas & Frotas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Controle operacional rigoroso: check-in por Geofencing GPS (50m), baixa automática de produtos químicos na viatura por m³ tratado e cálculo automatizado de comissões.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Geofencing GPS de 50 metros</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Baixa de químicos no carro</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Comissão por piscina atendida</span>
                </li>
              </ul>
            </div>

            <Link
              href="/onboarding"
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs text-center block transition shadow-lg shadow-cyan-500/20"
            >
              Começar com Fleet
            </Link>
          </div>

          {/* Card 3: Facility */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Hotel className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Condomínios & Hotéis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Caderno sanitário digital em conformidade com a Anvisa e NBR 10.818. Selos públicos interativos via QR Code na portaria e recepção para tranquilidade dos hóspedes e moradores.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Logbook Sanitário Digital</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Selo Público QR Code / Embed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Alerta imediato de contaminação</span>
                </li>
              </ul>
            </div>

            <Link
              href="/onboarding"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center block transition"
            >
              Começar com Facility
            </Link>
          </div>

          {/* Card 4: Retail */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Lojas de Piscinas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receituário químico de balcão express. Leitura visual da fita de teste, cálculo do carrinho de produtos ideal, checkout PIX instantâneo e impressão térmica de 80mm com a marca da loja.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Receituário de Balcão Express</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>QR Code na Casa de Máquinas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Impressão de cupom térmico 80mm</span>
                </li>
              </ul>
            </div>

            <Link
              href="/onboarding"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center block transition"
            >
              Começar com Retail
            </Link>
          </div>

        </div>
      </section>

      {/* 4. SEÇÃO "COMO FUNCIONA O ECOSSISTEMA FECHADO" */}
      <section className="py-16 md:py-24 bg-slate-900/30 border-y border-slate-800/80 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
              Fluxo Operacional Inviolável
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Como Funciona o Ciclo de Inteligência Química JHPCS
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Quatro etapas sincronizadas entre a borda da piscina, o motor algorítmico e a entrega pericial ao cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black font-mono text-cyan-500/20 absolute top-4 right-4">01</span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                1
              </div>
              <h4 className="font-extrabold text-sm text-white">Leitura na Borda ou Balcão</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                O operador ou atendente insere o pH, cloro livre, alcalinidade, temperatura e dureza diretamente no PWA ou balcão express.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black font-mono text-cyan-500/20 absolute top-4 right-4">02</span>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold">
                2
              </div>
              <h4 className="font-extrabold text-sm text-white">Motor Algorítmico ISL</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                O algoritmo calcula a saturação de Langelier adaptada ao revestimento (Fibra, Vinil, Monolítico, Pastilha, Areia Compactada).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black font-mono text-cyan-500/20 absolute top-4 right-4">03</span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                3
              </div>
              <h4 className="font-extrabold text-sm text-white">Prescrição & Baixa de Estoque</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Indicação das gramaturas exatas de insumos e baixa automática no estoque volante da caminhonete ou estoque da loja por m³.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black font-mono text-cyan-500/20 absolute top-4 right-4">04</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                4
              </div>
              <h4 className="font-extrabold text-sm text-white">Laudo Inviolável no WhatsApp</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Geração do laudo técnico pericial em PDF A4 / Base64 e despacho imediato pelo WhatsApp corporativo com a marca da sua empresa.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ INTERATIVO */}
      <section className="py-20 md:py-28 px-6 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
            Tire Suas Dúvidas
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Perguntas Frequentes sobre a Plataforma
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-cyan-400 transition cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CTA FINAL DE ALTA CONVERSÃO */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-slate-900/80 to-slate-950 border-t border-slate-800 relative">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold uppercase border border-cyan-500/30">
              Comece Hoje Mesmo
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Pronto para Elevar o Padrão Técnico e a Governança das suas Piscinas?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Crie seu ambiente exclusivo em menos de 2 minutos com consulta automática de CNPJ e liberação instantânea de 7 dias grátis.
            </p>
          </div>

          <form onSubmit={handleQuickSignup} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Digite seu melhor e-mail..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-medium"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
            >
              <span>Ativar 7 Dias Grátis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sem necessidade inicial de cartão</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Suporte técnico de engenharia pericial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cancelamento a qualquer momento</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
