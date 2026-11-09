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
  PhoneCall
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
    question: 'Como funciona o teste gratuito de 7 dias?',
    answer: 'Ao concluir o cadastro rápido (com preenchimento automático de CNPJ via Receita Federal), sua conta é liberada imediatamente com todas as ferramentas ativas, inclusive a sua instância dedicada do WhatsApp na Evolution API. Você testa por 7 dias completos sem cobrança prévia e sem necessidade de cartão de crédito.',
  },
];

export default function MarketingLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [emailInput, setEmailInput] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      
      {/* 0. Barra Superior Institucional */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-cyan-500/20">
              J
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white tracking-wider">JHPCS ECOSYSTEM</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/30">
                  v6.5 Enterprise
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block font-medium">Engenharia Química & Inteligência de Borda para Piscinas</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/solucoes"
              className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition px-3 py-2 rounded-xl hover:bg-slate-900 hidden sm:inline-block"
            >
              Setores & Soluções
            </Link>
            <Link
              href="/"
              className="text-xs font-bold text-slate-300 hover:text-white transition px-3 py-2 rounded-xl hover:bg-slate-900 hidden md:inline-block"
            >
              Cockpit do Sistema
            </Link>
            <Link
              href="/onboarding"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black text-xs transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <span>Criar Conta Grátis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

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

            <Link
              href="/"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-2 transition"
            >
              <PlayCircle className="w-4 h-4 text-cyan-400" />
              <span>Ver Demonstração Interativa</span>
            </Link>
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
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PDF Base64 disparado no WhatsApp</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FAIXA DE CREDENCIAIS & AUTORIDADE */}
      <section className="border-y border-slate-800 bg-slate-900/40 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Engenharia Construtiva</h4>
              <p className="text-[11px] text-slate-400">Garantia Decenal de Revestimento chancelada pela Jhoston Pools & Lagoons.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Conformidade Sanitária</h4>
              <p className="text-[11px] text-slate-400">Aderência estrita à NBR 10.818 e diretrizes de vigilância sanitária da Anvisa.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Cloud className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Cloudflare R2 Global</h4>
              <p className="text-[11px] text-slate-400">Armazenamento permanente de fotos e laudos de campo com zero custo de tráfego.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Blindagem LGPD</h4>
              <p className="text-[11px] text-slate-400">Isolamento absoluto de dados entre tenants (Lei 13.709/18) com anonimização ativa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GRADE DOS 4 SETORES DE MERCADO ATENDIDOS */}
      <section className="py-20 md:py-28 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
            Adaptabilidade Modular Multi-Tenant
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Uma Solução Especializada para Cada Setor da Indústria Aquática
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A interface, os privilégios e os relatórios adaptam-se dinamicamente ao modelo de operação da sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* SETOR 1: SOLO */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition flex flex-col justify-between group space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Plano Solo • R$ 89/mês</span>
                <h3 className="text-lg font-black text-white">Tratador Autônomo</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                App PWA 100% offline para o celular. Cálculo de ISL multi-substrato na borda, upload de fotos no Cloudflare R2 e envio automático de comprovante no WhatsApp com a sua marca própria.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Até 30 piscinas ativas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Relatório WhatsApp White-Label</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Chave PIX própria sem taxas</span>
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

          {/* SETOR 2: FLEET */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/40 shadow-xl shadow-cyan-500/5 flex flex-col justify-between group space-y-6 relative">
            <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase shadow-md">
              Mais Escolhido
            </span>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-sky-400 flex items-center justify-center text-slate-950 group-hover:scale-105 transition">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Plano Fleet • R$ 299/mês</span>
                <h3 className="text-lg font-black text-white">Empresas e Frotas</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gestão centralizada de múltiplos técnicos. Despacho de rotas com Geofencing GPS (50m), controle de estoque volante na caminhonete com baixa estequiométrica automática e rateio de comissões.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Controle de múltiplos técnicos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Check-in GPS com raio de 50 metros</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Baixa de estoque por m³ tratado</span>
                </li>
              </ul>
            </div>

            <Link
              href="/onboarding"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 text-xs font-black text-center block transition shadow-lg shadow-cyan-500/20"
            >
              Começar com Fleet
            </Link>
          </div>

          {/* SETOR 3: FACILITY */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition flex flex-col justify-between group space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition">
                <Hotel className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Plano Facility • R$ 490/mês</span>
                <h3 className="text-lg font-black text-white">Hotéis & Condomínios</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Logbook sanitário digital por turnos em compliance rigoroso com a Anvisa. Totem de recepção com Selo de Conformidade dinâmico e opções financeiras ocultadas para os operadores de bordo.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Logbook Sanitário Digital Anvisa</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Selo Público & Totem de Recepção</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Módulo Financeiro Ocultado</span>
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

          {/* SETOR 4: RETAIL */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition flex flex-col justify-between group space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
                <Store className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Plano Retail • R$ 189/mês</span>
                <h3 className="text-lg font-black text-white">Lojas & Revendas</h3>
              </div>
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
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-cyan-400 transition"
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

      {/* 7. RODAPÉ INSTITUCIONAL */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-black text-xs">
              J
            </div>
            <span className="font-bold text-slate-300">JHPCS PoolTech Ecosystem</span>
            <span>•</span>
            <span>Jhoston Pools & Lagoons Engenharia</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/onboarding" className="hover:text-slate-300 transition">
              Onboarding
            </Link>
            <Link href="/configuracoes" className="hover:text-slate-300 transition">
              Configurações
            </Link>
            <Link href="/" className="hover:text-slate-300 transition">
              Cockpit Master
            </Link>
          </div>

          <span className="font-mono text-[11px]">
            © 2026 JHPCS. Blindagem LGPD & NBR 10.818.
          </span>
        </div>
      </footer>

    </div>
  );
}
