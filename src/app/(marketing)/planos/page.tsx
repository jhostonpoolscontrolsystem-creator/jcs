'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  Lock, 
  ArrowRight, 
  User, 
  Users, 
  Hotel, 
  Store,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface PlanPricing {
  id: 'solo' | 'fleet' | 'facility' | 'retail';
  name: string;
  badge?: string;
  badgeHighlight?: boolean;
  target: string;
  monthlyPrice: number;
  annualPrice: number; // com desconto de ~16% (2 meses grátis)
  quota: string;
  excess: string;
  features: string[];
  ctaLabel: string;
  ctaParam: string;
  icon: any;
}

const PLANS_DATA: PlanPricing[] = [
  {
    id: 'solo',
    name: 'PLANO SOLO',
    target: 'Tratadores Autônomos e Técnicos Individuais',
    monthlyPrice: 49.90,
    annualPrice: 41.90,
    quota: 'Até 30 piscinas ativas • 1 operador de campo',
    excess: 'R$ 1,50 por piscina adicional/mês',
    icon: User,
    features: [
      'App PWA 100% Offline para celular',
      'Fotos ilimitadas no Cloudflare R2',
      'Cálculo de ISL multi-substrato na borda',
      'Envio no WhatsApp com sua marca própria',
      'Chave PIX direta para suas mensalidades',
    ],
    ctaLabel: 'Começar Teste Solo',
    ctaParam: 'solo',
  },
  {
    id: 'fleet',
    name: 'PLANO FLEET',
    badge: 'MAIS ESCOLHIDO POR EMPRESAS',
    badgeHighlight: true,
    target: 'Frotas de Manutenção e Prestadoras de Serviço',
    monthlyPrice: 189.90,
    annualPrice: 159.00,
    quota: 'Até 150 piscinas ativas • 5 operadores/técnicos',
    excess: 'R$ 1,20 por piscina extra • R$ 25,00 por técnico extra',
    icon: Users,
    features: [
      'Tudo incluído no Plano Solo',
      'Geofencing GPS com bloqueio anti-fraude (50m)',
      'Baixa automática no carro por m³ tratado',
      'Painel de despacho de rotas e equipes',
      'Apuração e rateio de comissões por visita',
    ],
    ctaLabel: 'Começar Teste Fleet',
    ctaParam: 'fleet',
  },
  {
    id: 'facility',
    name: 'PLANO FACILITY',
    target: 'Condomínios, Resorts, Hotéis e Clubes',
    monthlyPrice: 290.00,
    annualPrice: 242.00,
    quota: 'Até 10 complexos aquáticos • 8 operadores por turno',
    excess: 'R$ 15,00 por complexo extra • R$ 15,00 por operador extra',
    icon: Hotel,
    features: [
      'Logbook Sanitário Digital Diário (3 turnos)',
      'Exportação do Livro Anvisa / NBR 10.818 em PDF',
      'Selo Digital de Conformidade para recepção',
      'Interface limpa com zero ruído financeiro',
      'Múltiplos operadores com assinatura digital',
    ],
    ctaLabel: 'Começar Teste Facility',
    ctaParam: 'facility',
  },
  {
    id: 'retail',
    name: 'PLANO RETAIL',
    target: 'Lojas Físicas e Revendas de Químicos',
    monthlyPrice: 149.00,
    annualPrice: 125.00,
    quota: '3 atendentes de balcão inclusos',
    excess: 'R$ 29,90 por atendente adicional/mês',
    icon: Store,
    features: [
      'Receituário digital de garrafa d\'água express',
      'Carrinho estequiométrico com margem da loja',
      'Checkout com PIX dinâmico gerado na tela',
      'Impressão de cupom térmico de aplicação (80mm)',
      'Standby fiscal preparado para NF-e/NFC-e',
    ],
    ctaLabel: 'Começar Teste Retail',
    ctaParam: 'retail',
  },
];

interface ComparisonRow {
  category: string;
  feature: string;
  solo: boolean | string;
  fleet: boolean | string;
  facility: boolean | string;
  retail: boolean | string;
}

const COMPARISON_TABLE: ComparisonRow[] = [
  { category: 'Química & Telemetria', feature: 'Motor Químico ISL por Substrato', solo: true, fleet: true, facility: true, retail: true },
  { category: 'Química & Telemetria', feature: 'Alerta de Produtos Químicos Proibidos', solo: true, fleet: true, facility: true, retail: true },
  { category: 'Química & Telemetria', feature: 'Armazenamento de Fotos no Cloudflare R2', solo: 'Ilimitado', fleet: 'Ilimitado', facility: 'Ilimitado', retail: 'Ilimitado' },
  { category: 'Química & Telemetria', feature: 'App PWA de Campo 100% Offline', solo: true, fleet: true, facility: true, retail: false },
  
  { category: 'Comunicação & Marca', feature: 'Comprovantes com Marca Própria (White-Label)', solo: true, fleet: true, facility: true, retail: true },
  { category: 'Comunicação & Marca', feature: 'Instância Dedicada Evolution API WhatsApp', solo: true, fleet: true, facility: true, retail: true },
  { category: 'Comunicação & Marca', feature: 'Envio de Laudos Base64 no WhatsApp', solo: true, fleet: true, facility: true, retail: true },
  
  { category: 'Operação & Frotas', feature: 'Geofencing GPS de Chegada (Raio 50m)', solo: false, fleet: true, facility: false, retail: false },
  { category: 'Operação & Frotas', feature: 'Estoque Volante na Caminhonete', solo: false, fleet: true, facility: false, retail: false },
  { category: 'Operação & Frotas', feature: 'Baixa Estequiométrica Automática por m³', solo: false, fleet: true, facility: false, retail: false },
  { category: 'Operação & Frotas', feature: 'Rateio e Apuração de Comissões por Visita', solo: false, fleet: true, facility: false, retail: false },
  
  { category: 'Vigilância & Conformidade', feature: 'Logbook Sanitário Digital (NBR 10.818)', solo: false, fleet: false, facility: true, retail: false },
  { category: 'Vigilância & Conformidade', feature: 'Controle de Inspeção por 3 Turnos', solo: false, fleet: false, facility: true, retail: false },
  { category: 'Vigilância & Conformidade', feature: 'Selo Público e Totem com QR Code', solo: false, fleet: false, facility: true, retail: false },
  { category: 'Vigilância & Conformidade', feature: 'Ocultação de Módulos Financeiros para Técnicos', solo: false, fleet: false, facility: true, retail: false },
  
  { category: 'Comercial & Varejo', feature: 'Receituário Digital de Balcão Express', solo: false, fleet: false, facility: false, retail: true },
  { category: 'Comercial & Varejo', feature: 'Impressão em Bobina Térmica 80mm', solo: false, fleet: false, facility: false, retail: true },
  { category: 'Comercial & Varejo', feature: 'Cobrança com PIX Dinâmico na Tela', solo: true, fleet: true, facility: false, retail: true },
  { category: 'Comercial & Varejo', feature: 'Standby Fiscal para Emissão de Notas', solo: false, fleet: false, facility: false, retail: true },
  
  { category: 'Suporte & SLA', feature: 'Suporte Técnico da Engenharia Jhoston', solo: 'WhatsApp', fleet: 'Prioritário', facility: 'Dedicado', retail: 'Comercial' },
];

export default function PlanosPricingPage() {
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>('MONTHLY');

  const renderCheckOrText = (val: boolean | string) => {
    if (typeof val === 'boolean') {
      return val ? (
        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
      ) : (
        <X className="w-4 h-4 text-slate-700 mx-auto" />
      );
    }
    return <span className="font-semibold text-white text-xs">{val}</span>;
  };

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
              <span className="text-[10px] text-slate-400 block font-medium">Tabela de Preços & Comparativo Oficial</span>
            </div>
          </Link>

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
              Cockpit
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

      {/* 1. HEADER & TOGGLE DE FATURAMENTO */}
      <section className="pt-16 pb-12 px-6 text-center max-w-4xl mx-auto space-y-6">
        <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Previsibilidade e Transparência
        </span>
        
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Planos Transparentes e <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">Escaláveis</span> para o Seu Negócio
        </h1>
        
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Pague apenas pelo que a sua operação utiliza. Sem taxas ocultas, sem fidelidade contratual e com 7 dias de teste grátis com todas as ferramentas liberadas.
        </p>

        {/* Toggle de Ciclo de Faturamento */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 flex items-center shadow-inner">
            <button
              type="button"
              onClick={() => setBillingCycle('MONTHLY')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                billingCycle === 'MONTHLY'
                  ? 'bg-slate-950 text-white shadow-md border border-slate-700/80'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cobrança Mensal
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('ANNUAL')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'ANNUAL'
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Cobrança Anual</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${billingCycle === 'ANNUAL' ? 'bg-slate-950 text-cyan-300' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}`}>
                2 Meses Grátis (16% OFF)
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. GRADE DE CARDS DOS 4 PLANOS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS_DATA.map((plan) => {
            const Icon = plan.icon;
            const price = billingCycle === 'ANNUAL' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`p-6 rounded-3xl border transition flex flex-col justify-between space-y-6 relative ${
                  plan.badgeHighlight
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-2xl shadow-cyan-500/10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase shadow-md whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${plan.badgeHighlight ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-base text-white">{plan.name}</h3>
                      <span className="text-[11px] text-slate-400 block">{plan.target}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-slate-400">R$</span>
                      <span className="text-3xl font-black text-white font-mono">
                        {price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs text-slate-400">/mês</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-mono mt-0.5 block">
                      {billingCycle === 'ANNUAL' ? 'Faturado anualmente com 16% de desconto' : 'Faturado mensalmente sem fidelidade'}
                    </span>
                  </div>

                  {/* Franquia Inclusa */}
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Franquia Inclusa</span>
                    <strong className="text-xs text-slate-200 block">{plan.quota}</strong>
                    <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-800/60 font-mono">
                      Excedente: {plan.excess}
                    </span>
                  </div>

                  {/* Lista de Recursos */}
                  <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/onboarding?plan=${plan.ctaParam}`}
                    className={`w-full py-3 rounded-xl font-black text-xs text-center flex items-center justify-center gap-1.5 transition ${
                      plan.badgeHighlight
                        ? 'bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. TABELA COMPARATIVA COMPLETA DE RECURSOS */}
      <section className="max-w-6xl mx-auto px-6 pb-24 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
            Transparência Absoluta
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Comparativo Detalhado de Recursos</h2>
          <p className="text-xs sm:text-sm text-slate-400">Veja exatamente o que cada módulo entrega para a sua operação.</p>
        </div>

        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[11px] font-bold">
                  <th className="py-4 px-6 w-2/5">Recurso / Funcionalidade</th>
                  <th className="py-4 px-4 text-center w-[15%]">Solo</th>
                  <th className="py-4 px-4 text-center w-[15%] text-cyan-400">Fleet</th>
                  <th className="py-4 px-4 text-center w-[15%]">Facility</th>
                  <th className="py-4 px-4 text-center w-[15%]">Retail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {COMPARISON_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/20 transition">
                    <td className="py-3 px-6">
                      <span className="font-semibold text-white block">{row.feature}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{row.category}</span>
                    </td>
                    <td className="py-3 px-4 text-center">{renderCheckOrText(row.solo)}</td>
                    <td className="py-3 px-4 text-center bg-cyan-500/5">{renderCheckOrText(row.fleet)}</td>
                    <td className="py-3 px-4 text-center">{renderCheckOrText(row.facility)}</td>
                    <td className="py-3 px-4 text-center">{renderCheckOrText(row.retail)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. GARANTIAS & SEGURANÇA */}
      <section className="border-t border-slate-800 bg-slate-900/30 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
          
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Checkout Seguro & Direto</h4>
              <p className="text-[11px] text-slate-400">Pagamento via PIX instantâneo com geração automática de nota e recibo.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Ativação Imediata</h4>
              <p className="text-[11px] text-slate-400">Instância WhatsApp provisionada na nuvem em menos de 1 minuto.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Blindagem & LGPD</h4>
              <p className="text-[11px] text-slate-400">Seus dados e seus clientes protegidos sob a Lei 13.709/18.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. RODAPÉ INSTITUCIONAL */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500 space-y-2">
        <p>JHPCS PoolTech Ecosystem • Precificação Justa e Sem Fidelidade</p>
        <p className="text-[11px] text-slate-600 font-mono">Dúvidas comerciais? Atendimento via WhatsApp Matriz Jhoston</p>
      </footer>

    </div>
  );
}
