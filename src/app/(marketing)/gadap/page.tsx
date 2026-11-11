import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Cpu, 
  Smartphone, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Activity, 
  Compass, 
  Building2, 
  Award,
  Zap,
  HeartHandshake,
  Glasses
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GADAP Engenharia & Sistemas | Arquitetura Digital e Ecossistemas Inteligentes',
  description: 'Holding de engenharia de software e arquitetura digital criadora do ecossistema JHPCS. Tecnologia adaptável, ética transparente e solidez inabalável.',
};

export default function GadapPage() {
  return (
    <div className="min-h-screen bg-[#080C16] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
      
      {/* GLOWS DE FUNDO */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="fixed -bottom-40 -right-40 w-[600px] h-[600px] bg-amber-500/5 blur-[150px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 -left-40 w-[500px] h-[500px] bg-blue-600/5 blur-[140px] pointer-events-none -z-10" />

      {/* 1. HERO SECTION INSTITUCIONAL */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-500/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
              ENGENHARIA DE SOFTWARE & ARQUITETURA DIGITAL
            </span>
          </div>

          {/* Símbolo Escudo Geométrico Guardião GADAP (SVG Minimalista) */}
          <div className="py-2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-amber-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-700" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950 border border-slate-700/80 p-4 flex items-center justify-center shadow-2xl">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Hexágono / Escudo Externo */}
                  <polygon 
                    points="50,6 90,26 90,74 50,94 10,74 10,26" 
                    stroke="url(#gadap-grad-cyan)" 
                    strokeWidth="3.5" 
                    strokeLinejoin="round" 
                    className="drop-shadow-sm"
                  />
                  {/* Escudo Interno Inabalável */}
                  <polygon 
                    points="50,18 80,33 80,67 50,82 20,67 20,33" 
                    stroke="url(#gadap-grad-blue)" 
                    strokeWidth="2.5" 
                    strokeDasharray="4 2"
                    strokeLinejoin="round" 
                    opacity="0.8"
                  />
                  {/* Vértice Central / Núcleo Dourado de Proteção */}
                  <circle cx="50" cy="50" r="10" fill="url(#gadap-grad-gold)" />
                  <path d="M50 28 L50 72 M28 50 L72 50" stroke="#080C16" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Gradientes */}
                  <defs>
                    <linearGradient id="gadap-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="100%" stopColor="#0284C7" />
                    </linearGradient>
                    <linearGradient id="gadap-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                    <linearGradient id="gadap-grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FBBF24" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            GADAP: Tecnologia Adaptável, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              Ética Transparente e Solidez Inabalável
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Construímos ecossistemas digitais amigáveis que protegem operações críticas, eliminam a complexidade operacional e transformam dados de campo em segurança patrimonial.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/solucoes"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:brightness-110 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <span>Conhecer o Ecossistema JHPCS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/garantia-jhoston"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-amber-500/50 text-slate-200 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Garantia Decenal & Laudos</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. OS 3 PILARES ETIMOLÓGICOS E FILOSÓFICOS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
            A TRÍADE FILOSÓFICA DA ENGENHARIA GADAP
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            A Raiz da Nossa Arquitetura
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Mais do que linhas de código: cada sistema concebido pela GADAP expressa a convergência entre flexibilidade, respeito humano e blindagem estrutural.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: ADAP */}
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 border border-cyan-500/30 p-8 space-y-5 hover:border-cyan-400 transition-all duration-300 shadow-xl group">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black tracking-widest text-cyan-400 font-mono">
                ADAP
              </span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold">
                Latim: Adaptare
              </span>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                Inovação & Flexibilidade
              </h3>
              <p className="text-xs font-mono text-cyan-400/80">
                Sistemas Polimórficos de Alta Resiliência
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              A capacidade de adaptação é o verdadeiro pilar da tecnologia. Nossos sistemas são polimórficos: moldam-se à rotina do usuário — do técnico na borda da piscina ao gestor executivo — eliminando o medo de interfaces rígidas.
            </p>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-cyan-400 font-semibold">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Zero Atrito Operacional</span>
            </div>
          </div>

          {/* Card 2: ADAB */}
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 border border-blue-500/30 p-8 space-y-5 hover:border-blue-400 transition-all duration-300 shadow-xl group">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black tracking-widest text-blue-400 font-mono">
                ADAB
              </span>
              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] font-mono font-bold">
                Árabe: Conduta & Ética
              </span>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                Clareza & Tecnologia Amigável
              </h3>
              <p className="text-xs font-mono text-blue-400/80">
                Governança LGPD & Respeito Humano
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Traduzimos respeito moral e transparência para o ambiente digital. Sem letras miúdas, com governança estrita sob a LGPD e interfaces intuitivas que acolhem o operador em vez de intimidá-lo.
            </p>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-blue-400 font-semibold">
              <HeartHandshake className="w-4 h-4 text-blue-400" />
              <span>Transparência Incondicional</span>
            </div>
          </div>

          {/* Card 3: GADA */}
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 border border-amber-500/30 p-8 space-y-5 hover:border-amber-400 transition-all duration-300 shadow-xl group">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black tracking-widest text-amber-400 font-mono">
                GADA
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold">
                Sânscrito: Força Protetora
              </span>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Solidez & Blindagem Digital
              </h3>
              <p className="text-xs font-mono text-amber-400/80">
                Fundação Inabalável & Rastreabilidade
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Inspirada no símbolo ancestral de proteção e autoridade inabalável, nossa arquitetura atua como um guardião silencioso da infraestrutura, garantindo operação offline-first, rastreabilidade pericial e disponibilidade contínua.
            </p>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Segurança Forense de 10 Anos</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. A ESSÊNCIA POR TRÁS DO NOME (STORYTELLING DE ORIGEM) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950/40 border border-slate-800 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
                <Compass className="w-3.5 h-3.5" />
                <span>NOSSAS RAÍZES E VALORES</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                A Essência por Trás do Nome
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                O anagrama <strong className="text-white font-bold">GADAP</strong> não nasceu em uma sala de reuniões corporativa convencional. Ele germinou da confluência entre gerações, unindo os valores perenes da integridade familiar à vanguarda da computação distribuída.
              </p>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Unimos o rigor metodológico da engenharia civil e de materiais ao dinamismo do desenvolvimento de software moderno. Para nós, um software empresarial não deve ser um obstáculo burocrático, mas uma ferramenta de emancipação operacional — protegendo os ativos mais valiosos de quem empreende, trabalha e constrói o país todos os dias.
              </p>

              <div className="pt-4 flex flex-wrap gap-6 items-center border-t border-slate-800/80">
                <div className="space-y-0.5">
                  <span className="text-xl font-black text-cyan-400 font-mono">100%</span>
                  <span className="text-xs text-slate-400 block font-medium">Arquitetura Proprietária</span>
                </div>
                <div className="w-px h-8 bg-slate-800 hidden sm:block" />
                <div className="space-y-0.5">
                  <span className="text-xl font-black text-emerald-400 font-mono">LGPD</span>
                  <span className="text-xs text-slate-400 block font-medium">Blindagem & Sigilo</span>
                </div>
                <div className="w-px h-8 bg-slate-800 hidden sm:block" />
                <div className="space-y-0.5">
                  <span className="text-xl font-black text-amber-400 font-mono">10 Anos</span>
                  <span className="text-xs text-slate-400 block font-medium">Rastreabilidade Pericial</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Compromisso Executivo
              </h4>
              <blockquote className="text-sm sm:text-base italic text-slate-200 leading-relaxed">
                &ldquo;A tecnologia mais refinada é aquela que se torna invisível pela sua fluidez e inatacável pela sua solidez jurídica e operacional.&rdquo;
              </blockquote>
              <div className="pt-2 border-t border-slate-800">
                <strong className="text-xs font-bold text-white block">Governança Técnica & Executiva GADAP</strong>
                <span className="text-[11px] text-cyan-400 font-mono block">Daniel Lopes & Patrícia Grübel</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ECOSSISTEMA DE SOLUÇÕES GADAP (PORTFÓLIO INTEGRADO) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            PORTFÓLIO E CAPACIDADE DE ENGENHARIA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Ecossistema de Soluções Inteligentes
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Plataformas corporativas que resolvem gargalos complexos de campo, engenharia química e conformidade sanitária.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card Principal: JHPCS PoolTech Ecosystem (Col 7) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border border-cyan-500/40 p-8 sm:p-10 space-y-6 relative overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                  FLAGSHIP PLATFORM • POOLTECH
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Audit Score 100/100
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                JHPCS PoolTech Ecosystem
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Plataforma corporativa pioneira em inteligência físico-química estequiométrica (ISL multi-substrato), conformidade sanitária automatizada com as normas da Anvisa e blindagem jurídica com rastreabilidade pericial de 10 anos desenvolvida em aliança com a <strong className="text-white font-semibold">Jhoston Pools & Lagoons</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-white block">Motor Químico ISL</span>
                  <span className="text-slate-400 text-[11px] block">Cálculo de Langelier e estequiometria em milissegundos.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-white block">Garantia Decenal</span>
                  <span className="text-slate-400 text-[11px] block">Rastreio fotográfico com geofencing para perícias.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap gap-4 items-center">
              <Link
                href="/solucoes"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <span>Explorar Soluções JHPCS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/onboarding"
                className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
              >
                Criar Conta Gratuita
              </Link>
            </div>
          </div>

          {/* Cards Secundários (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Secundário 1: Multi-Tenant & ERPs */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-7 space-y-3 hover:border-blue-500/40 transition shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Sistemas Multi-Tenant & ERPs Especializados
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Arquitetura em nuvem escalável com isolamento estrito de esquemas (Row Level Security), faturamento inteligente e controle financeiro de alta fidelidade.
              </p>
            </div>

            {/* Secundário 2: PWA & Telemetria IoT */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-7 space-y-3 hover:border-emerald-500/40 transition shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">
                PWA Field & Telemetria IoT Preditiva
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Aplicações móveis progressivas com operação offline total na borda, sincronização em malha, geolocalização e inteligência climática preditiva para 48h.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. MANIFESTO DE ENGENHARIA (4 COMPROMISSOS) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
            NOSSOS PRINCÍPIOS FUNDAMENTAIS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Manifesto de Engenharia GADAP
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Quatro compromissos inegociáveis que norteiam cada commit, arquitetura de banco de dados e decisão de design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Princípio 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 hover:border-slate-700 transition">
            <span className="text-2xl font-black text-cyan-400 font-mono block">01</span>
            <h4 className="text-base font-bold text-white">Zero Atrito Cognitivo</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Software feito para pessoas reais. Se o profissional de campo precisa de manual grosso para operar a interface sob o sol forte, o projeto falhou.
            </p>
          </div>

          {/* Princípio 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 hover:border-slate-700 transition">
            <span className="text-2xl font-black text-blue-400 font-mono block">02</span>
            <h4 className="text-base font-bold text-white">Privacidade por Design</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Isolamento nativo sob a LGPD desde a camada de banco de dados. Anonimização e sigilo corporativo não são opcionais, são regras estruturais.
            </p>
          </div>

          {/* Princípio 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 hover:border-slate-700 transition">
            <span className="text-2xl font-black text-emerald-400 font-mono block">03</span>
            <h4 className="text-base font-bold text-white">Eficiência de Infraestrutura</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero desperdício de nuvem. Cache espacial inteligente, otimização de requisições de telemetria e latência ultra-baixa de ponta a ponta.
            </p>
          </div>

          {/* Princípio 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 hover:border-slate-700 transition">
            <span className="text-2xl font-black text-amber-400 font-mono block">04</span>
            <h4 className="text-base font-bold text-white">Rastreabilidade Pericial</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dados auditáveis com precisão milimétrica. Transformamos medições rotineiras de campo em garantias jurídicas e proteção patrimonial tangível.
            </p>
          </div>

        </div>
      </section>

      {/* CTA FINAL INSPIRACIONAL */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-amber-950/30 border border-cyan-500/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pronto para experimentar a solidez dos sistemas GADAP?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Inicie agora mesmo a gestão inteligente de sua operação com o ecossistema JHPCS ou entre em contato com nossa equipe de engenharia de software.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/onboarding"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:brightness-110 text-slate-950 font-black text-xs transition shadow-lg shadow-cyan-500/20"
            >
              Criar Conta Gratuita no JHPCS
            </Link>
            <Link
              href="/benchmarking"
              className="px-6 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-emerald-300 font-bold text-xs transition"
            >
              Ver Benchmarking & Score 100
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
