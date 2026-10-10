import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Wrench, 
  Sparkles, 
  Droplets, 
  Truck, 
  Layers, 
  FileText, 
  Download, 
  ChevronRight, 
  ExternalLink,
  Award,
  BadgeCheck,
  RotateCcw,
  PhoneCall,
  UserCheck
} from 'lucide-react';

interface ActiveWarrantyPlanHubProps {
  poolName?: string;
  applicationDate?: string;
  installationYear?: number;
  onDownloadTerm?: () => void;
}

export default function ActiveWarrantyPlanHub({
  poolName = 'Piscina Principal Resort',
  applicationDate = '2025-11-15',
  installationYear = 2025,
  onDownloadTerm
}: ActiveWarrantyPlanHubProps) {
  const [activeCycleTab, setActiveCycleTab] = useState<'ANO_1' | 'ANO_2' | 'ANO_3' | 'POS_CICLO'>('ANO_1');

  // Cálculos de datas e ciclos
  const appDate = new Date(applicationDate);
  const now = new Date();
  const diffDays = Math.max(0, Math.floor((now.getTime() - appDate.getTime()) / (1000 * 3600 * 24)));
  const currentYearOfCycle = Math.min(3, Math.max(1, Math.ceil(diffDays / 365)));
  const daysToNextIntervention = Math.max(0, 365 * currentYearOfCycle - diffDays);

  return (
    <div className="space-y-6">
      {/* 1. Header do Plano de Manutenção Ativo */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-4xl relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            NOVO PADRÃO JHÖSTON POOLS • PÓS-VENDA & GARANTIA ATIVA
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Plano de Manutenção Ativo: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">A Revolução no Pós-Venda</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Esqueça os termos de garantia genéricos do mercado que apenas transferem a responsabilidade e a culpa para o cliente em caso de problemas. 
            Nós assumimos o <strong>compromisso real com a longevidade estética e estrutural do seu investimento</strong>. 
            Substituímos a garantia passiva tradicional pelo nosso <strong>Plano de Manutenção Ativo de 3 Anos</strong>, garantindo que o seu revestimento permaneça impecável.
          </p>

          {/* Status Live do Ativo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Status do Revestimento</span>
                <span className="text-xs font-extrabold text-emerald-400">Plano Ativo • Ano {currentYearOfCycle} de 3</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-800/80 text-amber-400 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Próxima Intervenção Anual</span>
                <span className="text-xs font-extrabold text-amber-400">Em ~{daysToNextIntervention} dias</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/80 text-cyan-400 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Auditoria Remota</span>
                <span className="text-xs font-extrabold text-cyan-400">Semanal • Sem Mensalidade</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Os 3 Pilares Estruturantes do Plano */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pilar 1: Monitoramento Remoto Semanal */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                ZERO MENSALIDADE
              </span>
            </div>

            <h3 className="font-black text-white text-base">
              1. Monitoramento Remoto Semanal
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Nossa equipe técnica faz contato direto e semanal com o responsável pelos cuidados da piscina (caseiro, tratador ou zelador) para auditar os parâmetros químicos de pH e cloro.
            </p>

            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Auditoria proativa de pH e Cloro sem custo mensal.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Relatórios periódicos da saúde do revestimento no WhatsApp.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Bloqueio preventivo de corrosão ou ataque mineral.</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-cyan-400 font-bold">
            • Acompanhamento contínuo dos 3 anos
          </div>
        </div>

        {/* Pilar 2: Intervenção Anual Preventiva */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
                MÃO DE OBRA 100% ISENTA
              </span>
            </div>

            <h3 className="font-black text-white text-base">
              2. Intervenção Preventiva (Ano 1 e 2)
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Uma vez ao ano, nossa equipe especializada se desloca até o local para esvaziar a piscina, realizar lavagem técnica e reaplicar a resina protetora preventiva.
            </p>

            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Mão de obra técnica qualificada 100% gratuita.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Esvaziamento, lavagem técnica profunda e resina preventiva.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Cliente arca apenas com custos de deslocamento da equipe e materiais (resinas).</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-amber-400 font-bold">
            • Executado no 12º e no 24º mês
          </div>
        </div>

        {/* Pilar 3: Manutenção Pesada e Revitalização */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                CHECK-UP PROFUNDO & RENOVAÇÃO
              </span>
            </div>

            <h3 className="font-black text-white text-base">
              3. Revitalização Pesada (Ano 3)
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              No encerramento do ciclo de garantia estendida, realizamos um check-up profundo com lavagem química intensiva de alta pressão e camada final de proteção.
            </p>

            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Mão de obra 100% isenta mantida no 3º ano.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Lavagem intensiva com maquinário e camada final de resina.</span>
              </li>
              <li className="flex items-start gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Opção soberana de renovação do plano para novos ciclos.</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-emerald-400 font-bold">
            • Ciclo completo de 36 meses
          </div>
        </div>
      </div>

      {/* 3. Cronograma Interativo dos 3 Anos (Linha do Tempo) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
              CRONOGRAMA DO CICLO TRIENAL
            </span>
            <h3 className="text-lg font-black text-white">
              Linha do Tempo de Cuidado & Intervenções Presenciais
            </h3>
          </div>

          {/* Abas dos Anos */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['ANO_1', 'ANO_2', 'ANO_3', 'POS_CICLO'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCycleTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeCycleTab === tab
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'ANO_1' && 'Ano 1'}
                {tab === 'ANO_2' && 'Ano 2'}
                {tab === 'ANO_3' && 'Ano 3'}
                {tab === 'POS_CICLO' && 'Renovação'}
              </button>
            ))}
          </div>
        </div>

        {/* Detalhe do Ano Selecionado */}
        {activeCycleTab === 'ANO_1' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn text-xs">
            <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <span className="text-amber-400 font-bold font-mono text-[11px] uppercase">
                Mês 01 ao Mês 11 • Acompanhamento Semanal
              </span>
              <h4 className="text-white font-bold text-sm">Auditoria Química e Cura Inicial</h4>
              <p className="text-slate-300 leading-relaxed">
                Supervisão remota do início de uso do monólito. Alinhamento de dosagens semanais de pH e cloro via WhatsApp com o tratador. Verificação de estabilização dos 28 dias iniciais.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Mensalidade da Gestão: R$ 0,00</span>
              </div>
            </div>

            <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-amber-500/30">
              <span className="text-amber-400 font-bold font-mono text-[11px] uppercase">
                Mês 12 • 1ª Intervenção Presencial Anual
              </span>
              <h4 className="text-white font-bold text-sm">Revisão, Lavagem e Aplicação de Resina</h4>
              <p className="text-slate-300 leading-relaxed">
                Esvaziamento programado, higienização técnica especializada da superfície monolítica e aplicação de nova camada selante protetora.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>Mão de obra da equipe técnica:</span>
                  <strong className="text-emerald-400">100% ISENTA</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Custos assumidos pelo cliente:</span>
                  <span className="text-amber-300">Deslocamento + Resina</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeCycleTab === 'ANO_2' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn text-xs">
            <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <span className="text-amber-400 font-bold font-mono text-[11px] uppercase">
                Mês 13 ao Mês 23 • Monitoramento Contínuo
              </span>
              <h4 className="text-white font-bold text-sm">Manutenção da Longevidade Mineral</h4>
              <p className="text-slate-300 leading-relaxed">
                Monitoramento contínuo da estabilidade hídrica durante as diferentes estações climáticas (chuvas de verão e estiagem de inverno).
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Contato semanal com o tratador responsável mantido</span>
              </div>
            </div>

            <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-amber-500/30">
              <span className="text-amber-400 font-bold font-mono text-[11px] uppercase">
                Mês 24 • 2ª Intervenção Presencial Anual
              </span>
              <h4 className="text-white font-bold text-sm">Segunda Selagem de Proteção Monolítica</h4>
              <p className="text-slate-300 leading-relaxed">
                Nova lavagem técnica completa e aplicação da resina protetora anual para manter a impermeabilidade e toque suave de areia natural.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>Mão de obra especializada JHoston:</span>
                  <strong className="text-emerald-400">100% GRATUITA</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cliente arca apenas com:</span>
                  <span className="text-amber-300">Deslocamento da equipe + Materiais</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeCycleTab === 'ANO_3' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn text-xs">
            <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <span className="text-emerald-400 font-bold font-mono text-[11px] uppercase">
                Mês 25 ao Mês 35 • Reta Final do Ciclo
              </span>
              <h4 className="text-white font-bold text-sm">Supervisão Preventiva Pré-Encerramento</h4>
              <p className="text-slate-300 leading-relaxed">
                Auditorias químicas semanais intensificadas para preparação do check-up profundo e histórico do primeiro triênio.
              </p>
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-[11px]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Histórico pericial completo arquivado no sistema</span>
              </div>
            </div>

            <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-emerald-500/40">
              <span className="text-emerald-400 font-bold font-mono text-[11px] uppercase">
                Mês 36 • Manutenção Pesada e Revitalização
              </span>
              <h4 className="text-white font-bold text-sm">Lavagem Química Intensiva & Camada Final</h4>
              <p className="text-slate-300 leading-relaxed">
                Uso de maquinário de alta pressão, higienização química profunda e aplicação da camada final de resina de alta resistência.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>Mão de obra pesada:</span>
                  <strong className="text-emerald-400">ISENÇÃO TOTAL</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Responsabilidade do cliente:</span>
                  <span className="text-amber-300">Deslocamento da equipe + Insumos de resina</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeCycleTab === 'POS_CICLO' && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-emerald-500/30 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <RotateCcw className="w-4 h-4" />
              <span>Transparência Total & Renovação Sem Surpresas</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Ao final do ciclo de 3 anos do <strong>Plano de Manutenção Ativo</strong>, você terá a tranquilidade de poder optar pela <strong>renovação do nosso plano de cuidados preditivos</strong> ou seguir com a manutenção padrão homologada. 
              Sua piscina permanece com a mesma beleza, conforto e integridade do primeiro dia de entrega técnica.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-900/40">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <span>&ldquo;Sua única preocupação será aproveitar o seu espaço de lazer. A responsabilidade técnica e o cuidado contínuo são nossos.&rdquo;</span>
            </div>
          </div>
        )}
      </div>

      {/* 4. Quadro Comparativo: Garantia Tradicional de Mercado vs. Plano Ativo JHöston */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-base font-black text-white flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-amber-400" />
          Por que o Plano de Manutenção Ativo é Superior ao Modelo Tradicional?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Lado A: Mercado Tradicional */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-2">
            <span className="text-red-400 font-mono font-bold text-[10px] uppercase block">
              COMO O MERCADO TRADICIONAL FAZ (PASSIVO)
            </span>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>❌ Termos de garantia vagos que colocam toda a culpa no cliente.</li>
              <li>❌ Nenhuma visita ou acompanhamento após a entrega técnica.</li>
              <li>❌ Quando surge um problema de mancha ou corrosão, a garantia é sumariamente negada.</li>
              <li>❌ O cliente fica refém de tratadores sem capacitação técnica específica.</li>
            </ul>
          </div>

          {/* Lado B: JHöston Pools */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
            <span className="text-emerald-400 font-mono font-bold text-[10px] uppercase block">
              NOSSO PLANO DE MANUTENÇÃO ATIVO (PROATIVO)
            </span>
            <ul className="space-y-1.5 text-slate-200 text-[11px]">
              <li>✅ Nós ligamos semanalmente para o tratador (pH e Cloro auditados).</li>
              <li>✅ Sem cobrança de mensalidade pelo monitoramento remoto.</li>
              <li>✅ Visitas presenciais anuais com mão de obra técnica 100% gratuita.</li>
              <li>✅ Esvaziamento, lavagem técnica especializada e reaplicação de resina protetora.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
