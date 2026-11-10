'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
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
  Check
} from 'lucide-react';

export default function BenchmarkingMarketingPage() {
  const [downloading, setDownloading] = useState(false);

  const criteriaComparison = [
    {
      criterio: 'Motor Químico ISL Multi-Substrato',
      jhpcs: 'Nativo com cálculo de Langelier para 5 substratos e bloqueio de ácido muriático bruto.',
      jhpcsHighlight: true,
      appTratador: 'Inexistente. Apenas metas estáticas de pH (7.2-7.6) e Cloro (1-3 ppm).',
      gencoHth: 'Inexistente. Focado em orientar a compra exclusiva de químicos da própria marca.',
      osGenerica: 'Inexistente. Sistemas de O.S. civil sem qualquer inteligência química.',
      impacto: 'Protege os revestimentos contra corrosão precoce e preserva a Garantia Decenal.'
    },
    {
      criterio: 'Geofencing GPS de 50 metros',
      jhpcs: 'Sim. Bloqueio pericial com raio de 50m que só valida o check-in à beira da piscina.',
      jhpcsHighlight: true,
      appTratador: 'Não. Permite check-in manual ou à distância sem conferência de proximidade física.',
      gencoHth: 'Não possui qualquer ferramenta de campo ou check-in.',
      osGenerica: 'Parcial. Apenas coordenadas de endereço sem raio pericial de piscina.',
      impacto: 'Elimina fraudes de atendimento e serve como prova jurídica perante síndicos e tribunais.'
    },
    {
      criterio: 'Logbook Sanitário Digital NBR 10.818',
      jhpcs: 'Sim. Caderno sanitário em 3 turnos, selo embed em tempo real e QR Code para portarias.',
      jhpcsHighlight: true,
      appTratador: 'Não. Foco estritamente informal para tratador autônomo.',
      gencoHth: 'Não possui registro histórico de vigilância.',
      osGenerica: 'Não. Exige desenvolvimento sob medida de altíssimo custo.',
      impacto: 'Conformidade legal imediata com a Anvisa para hotéis, condomínios e clubes.'
    },
    {
      criterio: 'Motor Fiscal Eletrônico (NF-e & NFS-e)',
      jhpcs: 'Nativo em Standby. Chave Super Admin, Homologação/Produção e regras de CFOP/LC 116.',
      jhpcsHighlight: true,
      appTratador: 'Inexistente. Operação informal sem integração tributária.',
      gencoHth: 'Inexistente.',
      osGenerica: 'Requer contratação de ERPs terceiros pagos à parte.',
      impacto: 'Zero bitributação: separa venda de insumos químicos (NF-e) de serviço de limpeza (NFS-e).'
    },
    {
      criterio: 'Baixa de Estoque na Viatura por m³',
      jhpcs: 'Sim. Dedução estequiométrica automática no veículo com base no volume (m³) tratado.',
      jhpcsHighlight: true,
      appTratador: 'Manual e básico. Depende de digitação manual pelo tratador.',
      gencoHth: 'Não possui controle de estoque.',
      osGenerica: 'Manual. Lançamento item a item sem cálculo volumétrico.',
      impacto: 'Evita desvios e garante precisão cirúrgica de reposição de insumos no veículo.'
    },
    {
      criterio: 'Rastreabilidade e Blindagem Decenal',
      jhpcs: 'Sim. Histórico pericial de 10 anos com placa NFC gravada a Laser CNC e laudos em PDF.',
      jhpcsHighlight: true,
      appTratador: 'Zero. Histórico efêmero sem validade pericial.',
      gencoHth: 'Zero. Sem rastreabilidade de garantias de construção.',
      osGenerica: 'Zero. Apenas comprovante genérico de visita sem telemetria.',
      impacto: 'Garantia de 10 anos blindada judicialmente contra contestações de clientes.'
    },
    {
      criterio: 'Custo de Infraestrutura & Escalabilidade',
      jhpcs: 'Custo Zero de Egress. Vercel Serverless, Cloudflare R2 e Supabase Edge.',
      jhpcsHighlight: true,
      appTratador: 'Cobrança por técnico / Servidores tradicionais com custo crescente.',
      gencoHth: 'Gratuito mediante lock-in de compra obrigatória de produtos da marca.',
      osGenerica: 'Mensalidade elevada por usuário ativo (R$ 80 a R$ 250 por mês por técnico).',
      impacto: 'Margem de lucro máxima para o operador e previsibilidade de escala global.'
    }
  ];

  const handleDownloadPdf = () => {
    setDownloading(true);
    window.open('/api/pdf/system-stability', '_blank');
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      
      {/* 1. HERO SECTION COM SCORE 100/100 */}
      <section className="relative overflow-hidden pt-24 pb-20 px-6 border-b border-slate-800/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto space-y-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold shadow-lg shadow-emerald-500/10 animate-fadeIn">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>CERTIFICAÇÃO OFICIAL DE ENGENHARIA & RESILIÊNCIA 2026</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              A Única Plataforma com <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                Score Máximo 100 / 100
              </span> no Mercado Aquático
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Submetemos o ecossistema JHPCS à mais rigorosa bateria automatizada de estresse, segurança multi-tenant, motor fiscal e cálculo estequiométrico. Veja como superamos as alternativas do mercado.
            </p>
          </div>

          {/* Cards de Métricas do Teste */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Score Global</span>
              <div className="text-3xl font-black text-emerald-400 font-mono">100 / 100</div>
              <span className="text-[10px] text-emerald-500 font-semibold">Auditoria Forense Ativa</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Vazão ISL</span>
              <div className="text-3xl font-black text-cyan-400 font-mono">1.6M+</div>
              <span className="text-[10px] text-cyan-500 font-semibold">Cálculos/seg sem gargalo</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Blindagem</span>
              <div className="text-3xl font-black text-amber-400 font-mono">50m GPS</div>
              <span className="text-[10px] text-amber-500 font-semibold">Geofencing Inviolável</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-sky-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Custo de Nuvem</span>
              <div className="text-3xl font-black text-sky-400 font-mono">R$ 0,00</div>
              <span className="text-[10px] text-sky-500 font-semibold">Zero Egress no Cloudflare R2</span>
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
              <span>{downloading ? 'Abrindo Laudo...' : 'Baixar Laudo Técnico Oficial (PDF 3 Págs)'}</span>
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

      {/* 2. TABELA COMPARATIVA MATRICIAL (BENCHMARKING) */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">
            Matriz de Comparação Competitiva
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Por que o JHPCS é Incomparável?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Compare lado a lado as funcionalidades essenciais para a saúde das piscinas, gestão da equipe e proteção jurídica do seu negócio.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] uppercase tracking-wider font-bold">
                <th className="py-4 px-5 text-amber-400 w-1/4">Critério de Engenharia</th>
                <th className="py-4 px-5 text-cyan-400 bg-cyan-950/30 border-x border-cyan-500/30 w-1/4">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>JHPCS PoolTech</span>
                  </div>
                </th>
                <th className="py-4 px-4 text-slate-400 w-1/6">App do Tratador</th>
                <th className="py-4 px-4 text-slate-400 w-1/6">Genco / HTH Apps</th>
                <th className="py-4 px-4 text-slate-400 w-1/6">Sistemas Genéricos de O.S.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {criteriaComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  {/* Coluna 1: Critério */}
                  <td className="py-4 px-5 font-bold text-white align-top">
                    <span className="block text-sm">{row.criterio}</span>
                    <span className="text-[10px] text-slate-400 font-normal mt-1 block">
                      {row.impacto}
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
                    {row.appTratador}
                  </td>

                  {/* Coluna 4: Genco / HTH */}
                  <td className="py-4 px-4 text-slate-400 text-xs align-top leading-relaxed">
                    {row.gencoHth}
                  </td>

                  {/* Coluna 5: Sistemas O.S. */}
                  <td className="py-4 px-4 text-slate-400 text-xs align-top leading-relaxed">
                    {row.osGenerica}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. OS 5 PILARES DA NOTA 100/100 */}
      <section className="py-16 md:py-24 bg-slate-900/40 border-y border-slate-800 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">
              Rigor Técnico Pericial
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Os 5 Pilares que Garantiram o Score Máximo
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Cada camada do sistema foi auditada sob condições extremas de concorrência e estresse computacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">LGPD & Rotas</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mascaramento de CPFs e telefones no cockpit com isolamento rigoroso entre concorrentes.
              </p>
              <span className="text-[11px] font-mono font-bold text-emerald-400 block pt-2 border-t border-slate-800">
                20 / 20 pts
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Supabase RLS</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consultas parametrizadas imunes a SQL Injection com latência controlada.
              </p>
              <span className="text-[11px] font-mono font-bold text-emerald-400 block pt-2 border-t border-slate-800">
                20 / 20 pts
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Estresse ISL</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                50.000 iterações matemáticas executadas em 30ms com 30 workers paralelos sem falha.
              </p>
              <span className="text-[11px] font-mono font-bold text-emerald-400 block pt-2 border-t border-slate-800">
                20 / 20 pts
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Motor Fiscal</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Validação estrita de NCM, chaves de 44 dígitos e controle por Super Usuário.
              </p>
              <span className="text-[11px] font-mono font-bold text-emerald-400 block pt-2 border-t border-slate-800">
                20 / 20 pts
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Engenharia do Caos</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bloqueio de ácido muriático, contingência offline no PWA e resiliência no WhatsApp.
              </p>
              <span className="text-[11px] font-mono font-bold text-emerald-400 block pt-2 border-t border-slate-800">
                20 / 20 pts
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CTA FINAL DE ALTA CONVERSÃO */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold uppercase border border-cyan-500/30">
            Junte-se à Revolução PoolTech
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Pronto para colocar a tecnologia mais avançada nas suas piscinas?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Experimente o JHPCS gratuitamente por 7 dias. Sem compromisso, sem necessidade inicial de cartão de crédito.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition"
          >
            <span>Iniciar Teste Gratuito de 7 Dias</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleDownloadPdf}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Baixar Laudo Técnico em PDF</span>
          </button>
        </div>
      </section>

    </div>
  );
}
