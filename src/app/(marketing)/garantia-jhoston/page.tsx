'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  ArrowRight, 
  FileText, 
  Activity, 
  Cpu, 
  Calendar, 
  Droplet, 
  Layers, 
  Building2, 
  HardHat, 
  Compass, 
  Clock, 
  ExternalLink,
  Lock,
  ChevronRight,
  XCircle
} from 'lucide-react';

export default function GarantiaJhostonPage() {
  const [certInput, setCertInput] = useState('');
  const [searchingCert, setSearchingCert] = useState(false);
  const [certResult, setCertResult] = useState<any>(null);

  const handleSearchCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;

    setSearchingCert(true);
    setCertResult(null);

    setTimeout(() => {
      setSearchingCert(false);
      const clean = certInput.trim().toUpperCase();

      if (clean.includes('PF') || clean.includes('001')) {
        setCertResult({
          code: clean,
          owner: 'Dr. Carlos Eduardo (Pessoa Física)',
          poolName: 'Residência Granja Viana (Monolítico Sand)',
          type: 'PESSOA FÍSICA (PF)',
          warrantyStatus: 'ATIVA E HOMOLOGADA',
          issuedAt: '15/01/2026',
          validUntil: '15/01/2036 (Garantia Decenal 10 Anos)',
          substrate: 'Monolítico Mineral Sand com Polímero Estrutural',
          avgIsl: '+0.08 (Equilíbrio Químico Perfeito)',
          obligation: 'Pelo menos 1 medição semanal (Cumprido: 98% de assiduidade)',
          isCompliant: true,
        });
      } else if (clean.includes('PJ') || clean.includes('084')) {
        setCertResult({
          code: clean,
          owner: 'Resort & Spa Vista Bela (Pessoa Jurídica)',
          poolName: 'Parque Aquático Principal - Complexo Olímpico',
          type: 'PESSOA JURÍDICA (PJ)',
          warrantyStatus: 'ATIVA E HOMOLOGADA',
          issuedAt: '10/02/2026',
          validUntil: '10/02/2036 (Garantia Decenal 10 Anos)',
          substrate: 'Revestimento Resinóide de Alta Performance',
          avgIsl: '+0.12 (Equilíbrio Físico-Químico Rigoroso)',
          obligation: 'No mínimo 3 medições semanais por turno (Cumprido: 100%)',
          isCompliant: true,
        });
      } else {
        setCertResult({
          code: clean,
          warrantyStatus: 'CERTIFICADO EM PROCESSO OU NÃO LOCALIZADO',
          isCompliant: false,
          errorMsg: 'O código informado não consta na base pública unificada da Jhoston. Verifique a digitação ou contate a construtora responsável pela obra.',
        });
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* Topo Institucional de Alto Padrão */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20">
              J
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white tracking-wider">JHOSTON POOLS & LAGOONS</span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold border border-amber-500/30">
                  Divisão de Engenharia Pericial
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block font-medium">Garantia Decenal de Revestimentos Monolíticos</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/solucoes"
              className="text-xs font-bold text-slate-300 hover:text-amber-400 transition px-3 py-2 rounded-xl hover:bg-slate-900 hidden sm:inline-block"
            >
              Setores & Soluções
            </Link>
            <Link
              href="/planos"
              className="text-xs font-bold text-slate-300 hover:text-amber-400 transition px-3 py-2 rounded-xl hover:bg-slate-900 hidden md:inline-block"
            >
              Planos
            </Link>
            <Link
              href="/onboarding"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
            >
              <span>Homologar Obra</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. HERO PERICIAL */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 px-6">
        {/* Glows Decorativos em Âmbar Nobre e Azul Profundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold tracking-wide shadow-sm">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Engenharia Pericial de Revestimentos Monolíticos & Resinas Especiais</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Garantia Decenal com <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">Rastreabilidade Físico-Química</span> Contínua
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            A única tecnologia de mercado que audita a preservação de resinas, matrizes minerais e gelcoats através do Índice de Saturação de Langelier (ISL), separando com rigor pericial falhas de aplicação de negligência química operacional.
          </p>

          {/* BUSCA DE AUTENTICIDADE DE CERTIFICADO */}
          <div className="pt-6 max-w-xl mx-auto">
            <form onSubmit={handleSearchCert} className="p-2 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="Digite o código (ex: JH-2026-DECENAL-PF-001)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono uppercase font-bold"
                />
              </div>
              <button
                type="submit"
                disabled={searchingCert}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                <span>{searchingCert ? 'Auditando...' : 'Consultar Certificado'}</span>
              </button>
            </form>

            {/* Resultado da Consulta do Certificado */}
            {certResult && (
              <div className="mt-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-3 animate-fadeIn shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    {certResult.isCompliant ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                    <span className="font-mono text-xs font-bold text-amber-400">{certResult.code}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${certResult.isCompliant ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
                    {certResult.warrantyStatus}
                  </span>
                </div>

                {certResult.isCompliant ? (
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <p><strong className="text-white">Titular:</strong> {certResult.owner}</p>
                    <p><strong className="text-white">Ativo:</strong> {certResult.poolName}</p>
                    <p><strong className="text-white">Substrato Homologado:</strong> {certResult.substrate}</p>
                    <p><strong className="text-white">Vigência:</strong> {certResult.issuedAt} até {certResult.validUntil}</p>
                    <p><strong className="text-white">Média Termodinâmica ISL:</strong> <span className="text-emerald-400 font-mono">{certResult.avgIsl}</span></p>
                    <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800"><strong className="text-white">Compromisso do Titular:</strong> {certResult.obligation}</p>
                  </div>
                ) : (
                  <p className="text-xs text-rose-300">{certResult.errorMsg}</p>
                )}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 2. A MATRIZ DE DEGRADAÇÃO QUÍMICA (O Que Destrói uma Piscina) */}
      <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">
            Ciência dos Materiais Aquáticos
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            A Matriz de Degradação Química: O Que Destrói um Revestimento Nobre
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A grande maioria das patologias não é defeito de argamassa ou aplicação, mas corrosão termodinâmica provocada pela água desregulada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Ataque Ácido */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-rose-500/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">ISL &lt; -0.30 • Água Ácida</span>
              <h3 className="text-lg font-black text-white">Ataque Ácido e Lixiviação</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Água com déficit de carbonato de cálcio ataca ativamente a matriz mineral do reboco, dissolvendo ligantes poliméricos, desagregando rejuntes e gerando branqueamento irreversível nos acabamentos monolíticos.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-rose-400">Dano Frequente:</strong> Superfície porosa e esfarelamento precoce em menos de 24 meses de uso.
            </div>
          </div>

          {/* Card 2: Água Incrustante */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-sky-500/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Droplet className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-sky-400 uppercase font-bold">ISL &gt; +0.50 • Água Supersaturada</span>
              <h3 className="text-lg font-black text-white">Incrustação e Perda de Brilho</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Excesso de alcalinidade e cálcio em suspensão precipita na forma de calcário duro sobre a resina e a areia compactada, criando manchas brancas, aspereza extrema para os banhistas e perda de transparência.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-sky-400">Dano Frequente:</strong> Lixa abrasiva na pele dos banhistas e entupimento de trocadores de calor.
            </div>
          </div>

          {/* Card 3: Bloqueio do Ácido Muriático */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/40 space-y-4 relative overflow-hidden shadow-xl">
            <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[9px] font-black uppercase">
              Uso Proibido
            </span>

            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Bloqueio Algorítmico Ativo</span>
              <h3 className="text-lg font-black text-white">Veto ao Ácido Muriático</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              O ácido muriático impuro causa choque térmico químico e queima o gelcoat e os minerais da piscina. O JHPCS proíbe expressamente seu uso no receituário: qualquer registro anula a garantia pericial da Jhoston.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-amber-400">Defesa Pericial:</strong> Prescrição estrita de bissulfato de sódio ou redutores tamponados seguros.
            </div>
          </div>

        </div>
      </section>

      {/* 3. O PROTOCOLO DOS 28 DIAS DE CURA */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-800/80 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">
              Procedimento Técnico Padronizado
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              O Protocolo Inviolável dos 28 Dias de Cura
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              O primeiro mês após o abastecimento da piscina define se o acabamento durará 2 anos ou 20 anos. O JHPCS monitora diariamente essa maturação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold uppercase border border-cyan-500/30">
                Fase 1 • Dias 01 a 07
              </span>
              <h4 className="text-base font-extrabold text-white">Hidratação & Estabilização</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                A argamassa mineral monolítica absorve água e inicia a cristalização. Proibição absoluta de cloração de choque. Escovação bi-diária para evitar acúmulo de poeira de cimento na superfície.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 pt-2 border-t border-slate-800">
                Meta ISL: -0.05 a +0.10
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold uppercase border border-amber-500/30">
                Fase 2 • Dias 08 a 21
              </span>
              <h4 className="text-base font-extrabold text-white">Passivação da Matriz</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ajuste milimétrico da dureza cálcica (200-250 ppm) e alcalinidade total (90-110 ppm). Formação da camada natural de passivação que impermeabiliza quimicamente o revestimento contra agentes externos.
              </p>
              <div className="text-[11px] font-mono text-amber-400 pt-2 border-t border-slate-800">
                Meta ISL: +0.00 a +0.15
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase border border-emerald-500/30">
                Fase 3 • Dias 22 a 28
              </span>
              <h4 className="text-base font-extrabold text-white">Homologação Pericial</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Auditoria final dos 28 registros. Se a curva termodinâmica for aprovada sem desvios, o sistema emite o Certificado Oficial de Garantia Decenal com chave criptográfica SHA-256 e gravação na Plaqueta NFC.
              </p>
              <div className="text-[11px] font-mono text-emerald-400 pt-2 border-t border-slate-800">
                Certificado: 10 Anos de Cobertura
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MODELO DO LAUDO PERICIAL INVIOLÁVEL */}
      <section className="py-20 md:py-28 px-6 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">
            Prova Técnica Irrefutável
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Laudo Pericial Oficial Emitido em 1 Clique
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Documento aceito em perícias judiciais, laudos cautelares e assembleias de condomínio.
          </p>
        </div>

        {/* Mockup do Laudo Pericial em PDF */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-black text-white">LAUDO PERICIAL DE INTEGRIDADE PATRIMONIAL</h4>
                <span className="text-xs font-mono text-slate-400">JHPCS-PERICIA-DOC • NBR 10.818</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
              HOMOLOGADO
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 font-bold block mb-1">Equilíbrio Termodinâmico</span>
              <p className="font-mono text-emerald-400 text-sm font-bold">ISL Médio: +0.08</p>
              <span className="text-[10px] text-slate-400">Faixa ideal: -0.10 a +0.20</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 font-bold block mb-1">Rastreabilidade R2</span>
              <p className="font-mono text-white text-sm font-bold">52 Fotos Arquivadas</p>
              <span className="text-[10px] text-slate-400">Evidências com carimbo de tempo</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 font-bold block mb-1">Autenticação Notarial</span>
              <p className="font-mono text-amber-400 text-sm font-bold">SHA-256 Inviolável</p>
              <span className="text-[10px] text-slate-400">Certificação eletrônica permanente</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-1">
            <strong className="text-white block">PARECER TÉCNICO CONCLUSIVO DA ENGENHARIA:</strong>
            <p>
              "Após análise estequiométrica contínua durante o período auditado, atesta-se que o ativo operou sob condições físico-químicas controladas, não sendo verificada agressão ácida aos minerais ou incrustação de cálcio. A garantia decenal permanece plenamente válida e ratificada."
            </p>
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO PARA CONSTRUTORAS, ENGENHEIROS & ARQUITETOS */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-950 border border-amber-500/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Building2 className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">
              Parcerias Estratégicas B2B
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Construtoras, Engenheiros e Arquitetos: Credenciem suas Obras
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Proteja sua construtora contra chamados indevidos de pós-obra. Entregue a piscina com plaqueta NFC, termo de compromisso digital e acompanhamento contínuo da Jhoston.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/onboarding?plan=fleet"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <span>Cadastrar Construtora no Ecossistema</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500 space-y-2">
        <p>Jhoston Pools & Lagoons • Divisão de Engenharia Pericial de Estruturas Aquáticas</p>
        <p className="text-[11px] text-slate-600 font-mono">NBR 10.818 • Proteção Patrimonial Decenal</p>
      </footer>

    </div>
  );
}
