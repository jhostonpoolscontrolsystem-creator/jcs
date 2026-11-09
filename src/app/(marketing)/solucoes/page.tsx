'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Users, 
  Hotel, 
  Store, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Smartphone, 
  Send, 
  CreditCard, 
  Compass, 
  Truck, 
  ClipboardList, 
  Award, 
  QrCode, 
  Receipt, 
  Cpu, 
  ArrowRight, 
  Sparkles,
  Droplet,
  FileText
} from 'lucide-react';

type SectorKey = 'solo' | 'fleet' | 'facility' | 'retail' | 'enterprise';

interface SectorContent {
  id: SectorKey;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  icon: any;
  challenge: string;
  solution: string;
  features: string[];
  ctaLabel: string;
  ctaUrl: string;
  highlightMetric: {
    label: string;
    value: string;
    desc: string;
  };
}

const SECTORS: SectorContent[] = [
  {
    id: 'solo',
    badge: 'Plano Solo • Tratador Autônomo',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    title: 'Tratadores Autônomos & Técnicos Individuais',
    subtitle: 'Valorize seu serviço técnico e elimine horas respondendo mensagens repetitivas.',
    icon: User,
    challenge: 'O cliente residencial muitas vezes acha que você só joga cloro na água e questiona o valor da sua mensalidade, enquanto você perde horas no final da tarde respondendo WhatsApp e cobrando clientes esquecidos.',
    solution: 'Comprovante digital com 1 toque na borda contendo a SUA marca comercial, histórico pericial que prova a qualidade e a segurança da água, e lembrete automático de mensalidade via WhatsApp com sua chave PIX.',
    features: [
      'PWA ultraleve que funciona 100% offline no celular, sem precisar de internet na piscina.',
      'Compressão automática de fotos em WebP com upload em background no Cloudflare R2.',
      'Cálculo exato de ISL (Índice de Saturação de Langelier) com bloqueio de produtos químicos agressivos.',
      'Cobrança com recebimento direto na sua conta bancária sem intermediários.',
    ],
    ctaLabel: 'Contratar Solução Solo',
    ctaUrl: '/onboarding?plan=solo',
    highlightMetric: {
      label: 'Tempo Economizado',
      value: '12h/mês',
      desc: 'Elimine planilhas manuais e mensagens de cobrança no WhatsApp.',
    },
  },
  {
    id: 'fleet',
    badge: 'Plano Fleet • Frotas e Prestadoras',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    title: 'Empresas de Manutenção & Frotas Comerciais',
    subtitle: 'Governança operacional de equipes de campo e auditoria estequiométrica em tempo real.',
    icon: Users,
    challenge: 'Incerteza se os técnicos de campo realmente compareceram às piscinas no horário previsto, falta de controle sobre os desvios de produtos químicos nas caminhonetes e dificuldade em calcular o rateio correto de comissões.',
    solution: 'Geofencing GPS de alta precisão que impede o check-in se o técnico estiver a mais de 50 metros da água, e Baixa Estequiométrica Automática que debita o estoque do veículo pelo volume (m³) exato tratado em cada visita.',
    features: [
      'Painel de despacho centralizado com rastreamento de técnicos e status de rotas.',
      'Bloqueio anti-fraude: check-in só é liberado dentro do raio geográfico configurado.',
      'Estoque volante por caminhonete com baixa automática por m³ tratado.',
      'Cálculo transparente de comissão por visita e relatório de produtividade da equipe.',
    ],
    ctaLabel: 'Contratar Solução Fleet',
    ctaUrl: '/onboarding?plan=fleet',
    highlightMetric: {
      label: 'Redução de Desperdício',
      value: '-28%',
      desc: 'Economia comprovada em químicos graças à baixa estequiométrica exata.',
    },
  },
  {
    id: 'facility',
    badge: 'Plano Facility • Hotéis, Clubes & Condos',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    title: 'Condomínios, Resorts, Hotéis & Clubes',
    subtitle: 'Conformidade sanitária integral com interface despoluída e foco em segurança.',
    icon: Hotel,
    challenge: 'Pranchetas de papel molhadas e rasuradas na casa de máquinas, risco iminente de autuações e multas pesadas da Vigilância Sanitária e sistemas poluídos com opções financeiras que os operadores de piscina não precisam ver.',
    solution: 'Zero módulos financeiros na visão dos operadores. Logbook sanitário digital nos 3 turnos, emissão do Livro Oficial de Inspeção Anvisa (NBR 10.818) em PDF assinado e Totem com QR Code para os hóspedes e condôminos atestarem a pureza da água na recepção.',
    features: [
      'Interface limpa: opções de cobrança e finanças completamente ocultadas para os técnicos.',
      'Logbook sanitário digital em conformidade estrita com a NBR 10.818 e Anvisa.',
      'Registro obrigatório por turnos com assinatura digital do operador responsável.',
      'Totem de recepção e Selo Público de Conformidade Sanitária com QR Code para os usuários.',
    ],
    ctaLabel: 'Contratar Solução Facility',
    ctaUrl: '/onboarding?plan=facility',
    highlightMetric: {
      label: 'Conformidade Anvisa',
      value: '100%',
      desc: 'Zero pranchetas de papel e laudos prontos para auditorias sanitárias.',
    },
  },
  {
    id: 'retail',
    badge: 'Plano Retail • Lojas & Revendas',
    badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    title: 'Lojas de Piscinas & Revendas de Químicos',
    subtitle: 'Transforme o balcão de testes em um canal de vendas consultivo e de alta margem.',
    icon: Store,
    challenge: 'Atendentes de balcão inexperientes que receitam dosagens incorretas na base do "achismo", gerando frustração nos clientes, devolução de mercadorias e perda constante de vendas para os concorrentes.',
    solution: 'Receituário Digital de Balcão Express. O cliente traz a amostra de água, o sistema lê a fita de teste, calcula a carência estequiométrica exata, monta o carrinho com os produtos da sua loja e gera a cobrança via PIX dinâmico com impressão térmica de 80mm.',
    features: [
      'Frente de caixa express com leitura de fita e cálculo de dosagem em segundos.',
      'Geração de receita técnica impressa em bobina térmica de 80mm com a marca da loja.',
      'Envio automático da receita de aplicação no WhatsApp do cliente com chave PIX.',
      'Etiquetas com QR Code para fixação na casa de máquinas para recompra rápida.',
    ],
    ctaLabel: 'Contratar Solução Retail',
    ctaUrl: '/onboarding?plan=retail',
    highlightMetric: {
      label: 'Ticket Médio',
      value: '+35%',
      desc: 'Aumento de conversão de balcão através de diagnóstico técnico consultivo.',
    },
  },
  {
    id: 'enterprise',
    badge: 'Chancela Construtiva • Jhoston Pools',
    badgeColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    title: 'Construtoras & Fabricantes de Piscinas',
    subtitle: 'Blindagem pericial decenal contra uso de químicos proibidos e água corrosiva.',
    icon: ShieldCheck,
    challenge: 'Acionamentos indevidos de garantia decenal de revestimento causados por clientes que jogam ácido muriático diretamente na superfície ou operam com água ácida que dissolve o reboco mineral monolítico.',
    solution: 'Prontuário vitalício da piscina com telemetria contínua dos 28 dias de cura da argamassa e laudo pericial gerado em 1 clique que comprova judicialmente e com respaldo da NBR 10.818 se o revestimento foi vítima de negligência química.',
    features: [
      'Acompanhamento do protocolo crítico de cura e hidratação de 28 dias do substrato.',
      'Alerta imediato no WhatsApp da diretoria da construtora em caso de desvio químico.',
      'Laudo pericial com autenticação SHA-256 e respaldo pericial para defesa jurídica.',
      'Plaqueta metálica naval com gravação a laser e NFC para fixação na casa de máquinas.',
    ],
    ctaLabel: 'Conhecer Chancela Construtiva',
    ctaUrl: '/onboarding?plan=fleet',
    highlightMetric: {
      label: 'Garantia Decenal',
      value: '10 Anos',
      desc: 'Proteção pericial contínua de patrimônio com respaldo da engenharia.',
    },
  },
];

export default function SolucoesPage() {
  const [activeSector, setActiveSector] = useState<SectorKey>('solo');
  const current = SECTORS.find((s) => s.id === activeSector) || SECTORS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      
      {/* Topo Institucional */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-cyan-500/20">
              J
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-wider block">JHPCS ECOSYSTEM</span>
              <span className="text-[10px] text-slate-400 block font-medium">Soluções Especializadas por Setor</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="text-xs font-bold text-slate-300 hover:text-white transition px-3 py-2 rounded-xl hover:bg-slate-900 hidden sm:inline-block"
            >
              ← Voltar à Home
            </Link>
            <Link
              href="/onboarding"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black text-xs transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <span>Testar 7 Dias Grátis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. HEADER DA PÁGINA */}
      <section className="pt-16 pb-12 px-6 text-center max-w-4xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Matriz de Especialização de Mercado
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Soluções Sob Medida para Cada Elo da <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">Cadeia Aquática</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Diferenciação modular nativa: entregamos exatamente o que a sua operação precisa, sem ruídos, menus desnecessários ou complexidades que você não vai usar.
        </p>
      </section>

      {/* 2. BARRA DE NAVEGAÇÃO DE ABAS */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md">
          {SECTORS.map((s) => {
            const Icon = s.icon;
            const isActive = activeSector === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSector(s.id)}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-slate-950 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="truncate">{s.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. CONTEÚDO APROFUNDADO DO SETOR SELECIONADO */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/90 shadow-2xl space-y-10 animate-fadeIn">
          
          {/* Header do Perfil */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border inline-block ${current.badgeColor}`}>
                {current.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{current.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">{current.subtitle}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center shrink-0 min-w-[200px]">
              <span className="text-[11px] text-slate-500 font-bold uppercase block">{current.highlightMetric.label}</span>
              <span className="text-3xl font-black text-cyan-400 font-mono my-0.5 block">{current.highlightMetric.value}</span>
              <span className="text-[10px] text-slate-400 block">{current.highlightMetric.desc}</span>
            </div>
          </div>

          {/* Dores vs Soluções */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* O Desafio */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>O Principal Desafio do Seu Setor</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {current.challenge}
              </p>
            </div>

            {/* A Solução JHPCS */}
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>A Resposta de Engenharia do JHPCS</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {current.solution}
              </p>
            </div>

          </div>

          {/* Recursos Chave */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Recursos e Diferenciais Tecnológicos Inclusos
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA de Fechamento por Setor */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              7 Dias de degustação com todas as funcionalidades liberadas imediatamente.
            </div>

            <Link
              href={current.ctaUrl}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
            >
              <span>{current.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Rodapé */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500 space-y-2">
        <p>JHPCS PoolTech Ecosystem • Arquitetura Multi-Tenant de Precisão Estequiométrica</p>
        <p className="text-[11px] text-slate-600 font-mono">Chancela de Engenharia Jhoston Pools & Lagoons</p>
      </footer>

    </div>
  );
}
