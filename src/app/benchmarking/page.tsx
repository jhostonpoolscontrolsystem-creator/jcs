'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Download, 
  ExternalLink, 
  TrendingUp, 
  Activity, 
  Cpu, 
  Lock, 
  Database, 
  Layers, 
  Smartphone, 
  Flame, 
  Zap,
  ArrowRight,
  FileText,
  Users,
  Compass,
  Check,
  Scale,
  DollarSign,
  HelpCircle,
  Eye,
  Crosshair,
  Radar
} from 'lucide-react';

type CompetitorKey = 'appTratador' | 'gencoHth' | 'osGenerica';

interface CompetitorInfo {
  key: CompetitorKey;
  name: string;
  tagline: string;
  badgeColor: string;
  weaknessSummary: string;
  priceModel: string;
}

const COMPETITORS: Record<CompetitorKey, CompetitorInfo> = {
  appTratador: {
    key: 'appTratador',
    name: 'Apps do Tratador (Limpa Fácil / Similares)',
    tagline: 'Foco informal em apontamento de horas para tratador solo',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    weaknessSummary: 'Calculadoras simplórias de cloro fixo. Não calculam saturação ISL, não protegem substratos e permitem check-in fake à distância sem GPS pericial.',
    priceModel: 'Cobrança por técnico / Servidor tradicional com custo crescente'
  },
  gencoHth: {
    key: 'gencoHth',
    name: 'Aplicativos de Fabricantes (Genco / HTH)',
    tagline: 'Calculadoras comerciais de empurrar produtos de prateleira',
    badgeColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    weaknessSummary: 'Total lock-in comercial. Se a água pedir outro químico ou correção termodinâmica, o app não avisa. Sem PWA offline, sem laudos forenses e sem histórico decenal.',
    priceModel: 'Gratuito com lock-in forçado de químicos da marca'
  },
  osGenerica: {
    key: 'osGenerica',
    name: 'Sistemas Genéricos de O.S. (Civil / Facilities)',
    tagline: 'Softwares genéricos de ordem de serviço e manutenção predial',
    badgeColor: 'text-slate-400 border-slate-700 bg-slate-800/40',
    weaknessSummary: 'Completamente cegos para a química da água. Tratam uma piscina como uma lâmpada trocada. Exigem dezenas de cliques manuais e custam fortunas por licença.',
    priceModel: 'R$ 80 a R$ 250 / mês por usuário ativo'
  }
};

export default function BenchmarkingMarketingPage() {
  const [downloading, setDownloading] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorKey>('appTratador');

  const criteriaComparison = [
    {
      criterio: 'Motor Químico ISL Multi-Substrato',
      categoria: 'Química & Engenharia',
      jhpcs: 'Nativo. Termodinâmica de Langelier para 5 substratos (Monolítico, Fibra, Vinil, Pastilha, Areia Compactada) com BLOQUEIO MANDATÓRIO de ácido muriático bruto.',
      appTratador: 'Inexistente. Apenas metas estáticas de pH (7.2-7.6) e Cloro (1-3 ppm). Ignora dureza e alcalinidade.',
      gencoHth: 'Inexistente. Algoritmo enviesado para dosar apenas os produtos químicos do portfólio da marca.',
      osGenerica: 'Inexistente. Não possui nenhum campo ou cálculo estequiométrico nativo.',
      riscoConcorrente: 'Corrosão oculta de rejuntes e desagregação precoce do substrato da piscina.',
      vantagemJhpcs: 'Preservação de 10 anos de Garantia Decenal com respaldo pericial judicial.'
    },
    {
      criterio: 'Geofencing GPS de 50 metros na Borda',
      categoria: 'Governança de Campo',
      jhpcs: 'Sim (Bloqueio Pericial). O técnico só consegue abrir e concluir o checklist se estiver fisicamente dentro do raio de 50m do espelho d’água.',
      appTratador: 'Não. Permite check-in manual feito de casa, do trânsito ou sem validação do ponto físico.',
      gencoHth: 'Não possui aplicativo de campo para equipes.',
      osGenerica: 'Parcial. Registra coordenadas de endereço civil, sem delimitação da casa de máquinas.',
      riscoConcorrente: 'Fraude de visitas não realizadas, conflito com síndicos e vulnerabilidade trabalhista.',
      vantagemJhpcs: 'Auditoria inquestionável com telemetria GPS gravada e carimbo de hora/data.'
    },
    {
      criterio: 'Logbook Sanitário Digital NBR 10.818',
      categoria: 'Vigilância Sanitária',
      jhpcs: 'Sim. Livro digital em 3 turnos, selo público interativo via QR Code na recepção e alerta ao síndico.',
      appTratador: 'Não. Foco estritamente informal de tratador autônomo sem amparo regulatório.',
      gencoHth: 'Não possui módulo de vigilância sanitária.',
      osGenerica: 'Não. Exige desenvolvimento customizado que custa dezenas de milhares de reais.',
      riscoConcorrente: 'Multas pesadas da Vigilância Sanitária e interdição cautelar de piscinas coletivas.',
      vantagemJhpcs: 'Conformidade legal imediata com a Anvisa e totem de recepção que valoriza o condomínio.'
    },
    {
      criterio: 'Motor Fiscal Eletrônico (NF-e & NFS-e)',
      categoria: 'Tributação & Finanças',
      jhpcs: 'Nativo em Standby. Chave Super Admin, Homologação/Produção, catálogo NCM offline e separação estrita de produtos vs serviços.',
      appTratador: 'Inexistente. Operação informal sem nota fiscal ou integração contábil.',
      gencoHth: 'Inexistente.',
      osGenerica: 'Requer integração com ERPs externos pagos (Bling, Tiny, ContaAzul) com custo extra mensal.',
      riscoConcorrente: 'Bitributação do prestador de serviço e autuações da Receita Federal/Prefeituras.',
      vantagemJhpcs: 'Zero bitributação: separa NF-e de insumos químicos (CFOP 5102/5405) de NFS-e de mão de obra (Item 07.10).'
    },
    {
      criterio: 'Baixa Estequiométrica na Viatura por m³',
      categoria: 'Controle de Estoque',
      jhpcs: 'Sim. Dedução automática no estoque volante do carro proporcional ao volume (m³) e à dosagem ISL.',
      appTratador: 'Manual. O tratador precisa lembrar de digitar o que gastou após um dia cansativo de rota.',
      gencoHth: 'Não possui controle de estoque.',
      osGenerica: 'Manual. Lançamento item a item como se fosse material de escritório.',
      riscoConcorrente: 'Desvio de produtos químicos, compras de emergência e perda de margem de lucro.',
      vantagemJhpcs: 'Certeza matemática de quanto produto foi usado e estoque da viatura reposto com precisão.'
    },
    {
      criterio: 'Rastreabilidade Forense Decenal (10 Anos)',
      categoria: 'Blindagem Jurídica',
      jhpcs: 'Sim. Ficha médica pericial de 10 anos, laudo assinado digitalmente e plaqueta metálica NFC a Laser CNC.',
      appTratador: 'Zero. Histórico efêmero de poucas semanas que se perde se trocar de celular.',
      gencoHth: 'Zero. Sem qualquer rastreabilidade de suporte ao construtor.',
      osGenerica: 'Zero. Apenas ordem de serviço isolada sem dados físico-químicos.',
      riscoConcorrente: 'O construtor responde judicialmente por manchas e bolhas causadas pelo mau tratamento do cliente.',
      vantagemJhpcs: 'Blindagem da garantia da piscina: laudo comprova se o cliente usou produto proibido.'
    },
    {
      criterio: 'Custo de Infraestrutura & Escalabilidade',
      categoria: 'Modelo de Negócio',
      jhpcs: 'Custo Zero de Egress. Vercel Serverless, Cloudflare R2 e Supabase Edge. Fotos ilimitadas sem taxa.',
      appTratador: 'Cobrança por número de tratadores ou limites rígidos de armazenamento de fotos.',
      gencoHth: 'Gratuito mediante compra forçada de produtos caros da marca.',
      osGenerica: 'Preço exorbitante por usuário ativo (R$ 80 a R$ 250 / mês por técnico).',
      riscoConcorrente: 'Escalar o negócio significa ver a margem engolida por licenças de software caras.',
      vantagemJhpcs: 'Margem livre para a sua empresa crescer sem sustos na fatura no final do mês.'
    }
  ];

  const handleDownloadPdf = () => {
    setDownloading(true);
    window.open('/api/pdf/system-stability', '_blank');
    setTimeout(() => setDownloading(false), 2000);
  };

  const comp = COMPETITORS[selectedCompetitor];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      
      {/* 1. HERO COM SCORE 100/100 E ANÁLISE FORENSE */}
      <section className="relative overflow-hidden pt-24 pb-20 px-6 border-b border-slate-800/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto space-y-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold shadow-lg shadow-emerald-500/10 animate-fadeIn">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>RELATÓRIO OFICIAL DE AUDITORIA FORENSE & BENCHMARKING DE MERCADO</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Por que os Concorrentes Custam Mais <br />
              e <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                Entregam Menos Blindagem?
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
              O mercado de piscinas está saturado de aplicativos que são meras calculadoras comerciais de cloro ou sistemas de O.S. genéricos que ignoram a química da água. O <strong>JHPCS PoolTech</strong> é o primeiro ecossistema certificado com <strong>Score 100/100</strong> que une termodinâmica, geofencing pericial e proteção fiscal decenal.
            </p>
          </div>

          {/* Cards de Métricas da Auditoria */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Score Global</span>
              <div className="text-3xl font-black text-emerald-400 font-mono">100 / 100</div>
              <span className="text-[10px] text-emerald-500 font-semibold">Certificação Forense Ativa</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Vazão ISL</span>
              <div className="text-3xl font-black text-cyan-400 font-mono">1.6M+</div>
              <span className="text-[10px] text-cyan-500 font-semibold">Cálculos/seg em estresse</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Blindagem GPS</span>
              <div className="text-3xl font-black text-amber-400 font-mono">50m Raio</div>
              <span className="text-[10px] text-amber-500 font-semibold">Sem check-in falso</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-sky-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Custo de Nuvem</span>
              <div className="text-3xl font-black text-sky-400 font-mono">R$ 0,00</div>
              <span className="text-[10px] text-sky-500 font-semibold">Zero Egress no R2</span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-2 shadow-xl shadow-cyan-500/25 transition cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Abrindo Laudo...' : 'Baixar Laudo Técnico Oficial (PDF 3 Páginas)'}</span>
            </button>

            <Link
              href="/onboarding"
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-white font-bold text-xs flex items-center gap-2 transition"
            >
              <span>Testar Grátis por 7 Dias</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. RAIO-X DO CONCORRENTE: SELETOR DE COMPARATIVO CRÍTICO */}
      <section className="py-16 px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Crosshair className="w-4 h-4" /> Análise Crítica Individual
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Selecione um Concorrente para Ver o Raio-X
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Veja exatamente quais são as armadilhas de cada categoria que a concorrência esconde de você.
          </p>
        </div>

        {/* Abas dos 3 Concorrentes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(COMPETITORS) as CompetitorKey[]).map((key) => {
            const c = COMPETITORS[key];
            const isSelected = selectedCompetitor === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCompetitor(key)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${c.badgeColor}`}>
                    {key.toUpperCase()}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </div>
                <strong className="text-sm text-white block mt-2">{c.name}</strong>
                <span className="text-[11px] text-slate-400 line-clamp-1">{c.tagline}</span>
              </button>
            );
          })}
        </div>

        {/* Card de Raio-X Detalhado do Concorrente Selecionado vs JHPCS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
            <div>
              <span className="text-xs text-slate-400 font-medium">Diagnóstico Pericial do Concorrente:</span>
              <h3 className="text-lg sm:text-xl font-black text-white">{comp.name}</h3>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Modelo de Custo do Concorrente</span>
              <span className="text-xs font-mono font-bold text-amber-400">{comp.priceModel}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>Onde a Concorrência Falha e Gera Riscos:</span>
              </div>
              <p className="text-xs text-rose-200 leading-relaxed">
                {comp.weaknessSummary}
              </p>
              <ul className="space-y-1.5 text-[11px] text-rose-300 pt-2 border-t border-rose-900/40">
                <li className="flex items-center gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Sem amparo pericial para garantias construtivas decenais</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Permite a utilização de produtos danosos como ácido muriático</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Sem blindagem contra bitributação de químicos vs mão de obra</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Como o JHPCS Resolve e Protege seu Negócio:</span>
              </div>
              <p className="text-xs text-emerald-200 leading-relaxed">
                O JHPCS atua como um verdadeiro <strong>Digital Twin da Piscina</strong>: calcula o ISL adaptado ao substrato em milissegundos, impede erros graves de dosagem, grava a localização via GPS e emite laudos periciais com valor probatório.
              </p>
              <ul className="space-y-1.5 text-[11px] text-emerald-300 pt-2 border-t border-emerald-900/40">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Garantia Decenal blindada com plaqueta NFC a Laser CNC</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Geofencing de 50 metros elimina fraudes de atendimento</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Custo zero de infraestrutura na borda (Edge + Cloudflare R2)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MATRIZ COMPARATIVA GERAL TABULAR */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
            Matriz Comparativa Completa
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Comparativo Técnico & Econômico Ponto a Ponto
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A tabela abaixo sintetiza a análise técnica documentada no Laudo Pericial Oficial de Estabilidade.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] uppercase tracking-wider font-bold">
                <th className="py-4 px-5 text-amber-400 w-1/4">Critério & Categoria</th>
                <th className="py-4 px-5 text-cyan-400 bg-cyan-950/30 border-x border-cyan-500/30 w-1/4">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>JHPCS PoolTech</span>
                  </div>
                </th>
                <th className="py-4 px-4 text-slate-400 w-1/6">App do Tratador</th>
                <th className="py-4 px-4 text-slate-400 w-1/6">Genco / HTH</th>
                <th className="py-4 px-4 text-slate-400 w-1/6">Sistemas Genéricos O.S.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {criteriaComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  {/* Coluna 1: Critério & Categoria */}
                  <td className="py-4 px-5 font-bold text-white align-top">
                    <span className="text-[10px] text-cyan-400 font-mono block uppercase">{row.categoria}</span>
                    <span className="block text-sm mt-0.5">{row.criterio}</span>
                    <span className="text-[10px] text-slate-400 font-normal mt-1 block">
                      <strong>Vantagem:</strong> {row.vantagemJhpcs}
                    </span>
                  </td>

                  {/* Coluna 2: JHPCS (Destaque Ciano) */}
                  <td className="py-4 px-5 bg-cyan-950/20 border-x border-cyan-500/30 text-cyan-200 font-medium align-top">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs leading-relaxed">{row.jhpcs}</span>
                    </div>
                  </td>

                  {/* Coluna 3: App do Tratador */}
                  <td className="py-4 px-4 text-slate-400 text-xs align-top leading-relaxed">
                    <span className="text-rose-400 block mb-1 font-bold">Risco:</span>
                    {row.appTratador}
                  </td>

                  {/* Coluna 4: Genco / HTH */}
                  <td className="py-4 px-4 text-slate-400 text-xs align-top leading-relaxed">
                    <span className="text-rose-400 block mb-1 font-bold">Risco:</span>
                    {row.gencoHth}
                  </td>

                  {/* Coluna 5: Sistemas O.S. */}
                  <td className="py-4 px-4 text-slate-400 text-xs align-top leading-relaxed">
                    <span className="text-rose-400 block mb-1 font-bold">Risco:</span>
                    {row.osGenerica}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. SÍNTESE ESTRATÉGICA & CTA FINAL */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center space-y-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/40 space-y-6 shadow-2xl">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold uppercase border border-cyan-500/30">
              Conclusão da Análise Técnica
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              A Concorrência Vende Ferramentas. Nós Entregamos Soberania e Blindagem.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Ao escolher o JHPCS, sua empresa elimina custos desnecessários com softwares genéricos caros, blinda judicialmente suas obras e eleva o nível pericial do serviço entregue ao cliente final.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
            >
              <span>Começar Teste Grátis de 7 Dias</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleDownloadPdf}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Baixar Laudo em PDF</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
