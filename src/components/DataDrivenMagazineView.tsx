'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  ExternalLink, 
  Calendar, 
  Clock, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  Share2, 
  MessageSquare, 
  Send, 
  Calculator, 
  Zap, 
  Activity, 
  ChevronRight, 
  BarChart3, 
  Info,
  Check,
  AlertTriangle
} from 'lucide-react';
import { 
  DATA_DRIVEN_EDITION_01, 
  GroundedArticle, 
  MagazineProfile 
} from '@/lib/magazine/dataDrivenMagazineEngine';
import { toast } from 'sonner';

interface DataDrivenMagazineProps {
  tenantSlug?: string;
  brandName?: string;
  whatsappContact?: string;
}

export function DataDrivenMagazineView({
  tenantSlug = 'jhoston',
  brandName = 'Jhoston Pools & Lagoons',
  whatsappContact = '+55 (11) 99999-8888',
}: DataDrivenMagazineProps) {
  const searchParams = useSearchParams();
  const rawProfile = searchParams.get('perfil');
  
  // Perfil da audiência (Garantia/Retenção ou Orçamento/Expansão)
  const [profile, setProfile] = useState<MagazineProfile>(
    rawProfile === 'orcamento' ? 'orcamento' : 'garantia'
  );

  useEffect(() => {
    if (rawProfile === 'orcamento' || rawProfile === 'garantia') {
      setProfile(rawProfile);
    }
  }, [rawProfile]);

  const edition = DATA_DRIVEN_EDITION_01;
  const [activeArticle, setActiveArticle] = useState<GroundedArticle>(edition.articles[0]);
  const [readingProgress, setReadingProgress] = useState(0);

  // Estados da Calculadora Interativa & Lead Funnel
  const [lengthM, setLengthM] = useState<number>(8);
  const [widthM, setWidthM] = useState<number>(4);
  const [depthM, setDepthM] = useState<number>(1.4);
  const [poolType, setPoolType] = useState('MONOLITHIC');
  const [leadName, setLeadName] = useState('');
  const [leadWhatsapp, setLeadWhatsapp] = useState('');
  const [leadSending, setLeadSending] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  const volumeM3 = Math.round(lengthM * widthM * depthM * 10) / 10;
  const volumeLitros = Math.round(volumeM3 * 1000);
  const pumpHp = volumeM3 <= 30 ? '1/2 CV' : volumeM3 <= 60 ? '3/4 CV' : volumeM3 <= 90 ? '1.0 CV' : '1.5 CV';
  const heaterKw = Math.round(volumeM3 * 0.7 * 10) / 10;

  // Barra de progresso de leitura
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado com sucesso! Compartilhe com seus clientes pelo WhatsApp.');
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadWhatsapp) {
      toast.error('Preencha seu nome e WhatsApp.');
      return;
    }
    setLeadSending(true);
    try {
      const res = await fetch('/api/magazine/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantSlug,
          editionSlug: edition.slug,
          leadName,
          leadWhatsapp,
          poolType,
          estimatedVolumeM3: volumeM3,
          notes: `Lead via Revista Data-Driven (${profile.toUpperCase()}): ${lengthM}m x ${widthM}m x ${depthM}m = ${volumeM3}m³ (${volumeLitros}L). Bomba: ${pumpHp}, Aquecedor: ${heaterKw}kW.`,
        }),
      });

      if (res.ok) {
        setLeadSent(true);
        toast.success('Solicitação enviada! Nossa engenharia entrará em contato.');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Erro ao enviar dados. Tente novamente.');
    } finally {
      setLeadSending(false);
    }
  };

  // Alterna manchete baseada no perfil
  const activeHeadline = profile === 'garantia'
    ? edition.coverConfig.headlineGarantia
    : edition.coverConfig.headlineOrcamento;

  const activeSubheadline = profile === 'garantia'
    ? edition.coverConfig.subheadlineGarantia
    : edition.coverConfig.subheadlineOrcamento;

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans pb-24">
      
      {/* BARRA DE PROGRESSO DE LEITURA (FIXA NO TOPO) */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      {/* 1. HEADER EDITORIAL COMPACTO WHITE-LABEL */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base text-white tracking-wide block truncate">
                  {brandName}
                </span>
                <span className="text-[10px] text-cyan-400 font-mono block">
                  Revista PoolTech Data-Driven • Edição #{edition.editionNumber}
                </span>
              </div>
            </Link>
          </div>

          {/* Toggle de Perfil de Leitura (Garantia vs Orçamento) */}
          <div className="hidden md:flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              type="button"
              onClick={() => setProfile('garantia')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                profile === 'garantia'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Foco: Garantia & Pós-Venda</span>
            </button>
            <button
              type="button"
              onClick={() => setProfile('orcamento')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                profile === 'orcamento'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Foco: Arquitetura & Novas Obras</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Compartilhar</span>
            </button>

            <a
              href="/api/pdf/magazine-edition?download=true"
              target="_blank"
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">Baixar PDF Oficial</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>

            <a
              href={`https://wa.me/5511999998888?text=Ol%C3%A1%2C%20estou%20lendo%20a%20Revista%20Data-Driven%20da%20${encodeURIComponent(brandName)}%20e%20gostaria%20de%20um%20atendimento.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">Falar com Engenharia</span>
            </a>
          </div>

        </div>
      </header>

      {/* 2. CAPA DINÂMICA EM CAMADAS (FULL-BLEED RESPONSIVA) */}
      <section className="relative py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl min-h-[500px] flex flex-col justify-between">
          
          {/* Camada 1: Background com Imagem & Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={edition.coverConfig.heroImageUrl}
              alt="Capa da Revista"
              fill
              priority
              className="object-cover opacity-35 filter brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/85 to-transparent" />
          </div>

          {/* Camada 2: Cabeçalho da Capa com Selos de Auditoria */}
          <div className="relative z-10 p-6 sm:p-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
                EDIÇÃO #{edition.editionNumber} • {edition.periodLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase hidden sm:inline">
                DATA-DRIVEN EDITORIAL
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              <Database className="w-3.5 h-3.5" />
              <span>1.420 Piscinas Monitoradas na Base</span>
            </div>
          </div>

          {/* Camada 3: Manchete Principal & Chamadas Cruzadas */}
          <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>MANCHETE PRINCIPAL DO BIMESTRE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              {activeHeadline}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
              {activeSubheadline}
            </p>

            {/* Chamadas Secundárias Cruzadas (Garantia + Upgrade) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-xs space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">
                  Pilar de Garantia:
                </span>
                <p className="text-slate-200 font-semibold leading-snug">
                  {edition.coverConfig.secondaryCall1}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 text-xs space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block">
                  Pilar de Expansão:
                </span>
                <p className="text-slate-200 font-semibold leading-snug">
                  {edition.coverConfig.secondaryCall2}
                </p>
              </div>
            </div>
          </div>

          {/* Camada 4: Selo de Confiabilidade no Rodapé */}
          <div className="relative z-10 p-6 bg-slate-950/90 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Princípio Antialucinação JHPCS:</strong> Todo dado citado possui fonte auditável via OpenWeather API e queries SQL internas anonimizadas.
              </span>
            </div>
            <span className="text-cyan-400 font-mono text-[11px] font-bold">
              Chancela Pericial Jhoston & GADAP
            </span>
          </div>

        </div>
      </section>

      {/* 3. ÍNDICE INTELIGENTE & CARTA AO LEITOR (SMART TABLE OF CONTENTS) */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CARTA AO LEITOR & TERMO DO ECOSSISTEMA (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Bloco Carta ao Leitor */}
            <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">Carta da Engenharia</h4>
                  <span className="text-[10px] font-mono text-slate-400">Contexto Técnico do Mês</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                &ldquo;{edition.coverConfig.editorLetter}&rdquo;
              </p>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="font-bold text-white block">Equipe Técnica de {brandName}</span>
                <span className="text-[10px] font-mono text-cyan-400 block">{edition.coverConfig.climaticContext}</span>
              </div>
            </div>

            {/* Termômetro do Ecossistema (Métricas Reais) */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-cyan-950/30 border border-cyan-500/30 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Termômetro da Base JHPCS
                </span>
                <BarChart3 className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block font-mono">Piscinas Ativas Analisadas</span>
                  <strong className="text-base font-black text-white font-mono">{edition.telemetrySummary.totalPoolsMonitored} unidades</strong>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block font-mono">Desvio Médio do ISL</span>
                  <strong className="text-base font-black text-emerald-400 font-mono">{edition.telemetrySummary.avgLsiDeviation}</strong>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block font-mono">Sensibilidade à Chuva Ácida</span>
                  <strong className="text-base font-black text-amber-400 font-mono">{edition.telemetrySummary.acidRainIncidence}</strong>
                </div>
              </div>
            </div>

            {/* Atalho Rápido de Ação */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white block">Atalho do Leitor:</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Deseja simular o dimensionamento hidráulico e térmico da sua piscina? Vá direto para nossa calculadora.
              </p>
              <a 
                href="#calculadora" 
                className="pt-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition"
              >
                <span>Ir para a Calculadora Interativa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* ÍNDICE DINÂMICO & LEITURA DAS MATÉRIAS (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Seletor de Matérias do Índice */}
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-3 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Índice Estruturado da Edição</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">3 Artigos Auditados</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {edition.articles.map((art, idx) => {
                  const isSelected = activeArticle.id === art.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => setActiveArticle(art)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            art.pillar === 'GARANTIA_MANUTENCAO'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : art.pillar === 'VENDAS_ARQUITETURA'
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            0{idx + 1}. {art.pillarLabel}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {art.readingTimeMinutes} min
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                          {art.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-cyan-400 font-mono font-bold bg-cyan-950/40 px-2 py-1 rounded-lg border border-cyan-500/20 hidden sm:inline flex items-center gap-1">
                          <Database className="w-2.5 h-2.5" />
                          Fonte Auditada
                        </span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : 'text-slate-600'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ARTIGO COMPLETO EM FOCO */}
            <article className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 space-y-8 shadow-2xl backdrop-blur-md">
              
              <div className="space-y-3 border-b border-slate-800 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                    {activeArticle.pillarLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {activeArticle.readingTimeMinutes} minutos de leitura estimada
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {activeArticle.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                  {activeArticle.subtitle}
                </p>

                <div className="text-xs text-slate-500 font-mono pt-1">
                  Por {activeArticle.author}
                </div>
              </div>

              {/* Imagem de Apoio com Tratamento Editorial */}
              <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                <Image
                  src={activeArticle.featuredImageUrl}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Takeaways / Pontos Chave */}
              {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2.5">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                    Conclusões Técnicas Essenciais:
                  </span>
                  <ul className="space-y-2">
                    {activeArticle.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Parágrafos da Matéria */}
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {activeArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* PARECER PERICIAL & AUDIT TRAIL (FONTES RASTREÁVEIS) */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                {activeArticle.pericialVerdict && (
                  <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-1">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Parecer Pericial de Garantia Decenal:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                      &ldquo;{activeArticle.pericialVerdict}&rdquo;
                    </p>
                  </div>
                )}

                {/* Bloco de Auditoria e Fontes */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-400 uppercase text-[10px] flex items-center gap-1.5">
                      <Database className="w-3 h-3 text-cyan-400" />
                      Trilha de Auditoria Técnica (Audit Trail)
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">
                      Verificado & Auditado
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {activeArticle.auditSources.map((source) => (
                      <div key={source.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                        <div>
                          <strong className="text-white block">{source.title}</strong>
                          <span className="text-slate-400 text-[10px]">{source.details}</span>
                        </div>
                        <span className="font-mono text-cyan-300 font-bold sm:text-right shrink-0">
                          {source.metricLabel}: {source.metricValue}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </article>

          </div>

        </div>
      </section>

      {/* 4. WIDGET INTERATIVO: CALCULADORA DE DIMENSIONAMENTO & LEAD FUNNEL */}
      <section id="calculadora" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/40 p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                <Calculator className="w-3.5 h-3.5" />
                <span>DIMENSIONAMENTO DATA-DRIVEN</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Simule a Capacidade e Potência Ideal da Sua Piscina
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ajuste os parâmetros métricos reais da sua área de lazer para calcular o volume dágua, a capacidade da motobomba e a carga térmica recomendada.
              </p>

              {/* Sliders Interativos */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Comprimento:</span>
                    <strong className="text-white font-mono">{lengthM} metros</strong>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="25"
                    step="0.5"
                    value={lengthM}
                    onChange={(e) => setLengthM(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Largura:</span>
                    <strong className="text-white font-mono">{widthM} metros</strong>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="0.5"
                    value={widthM}
                    onChange={(e) => setWidthM(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Profundidade Média:</span>
                    <strong className="text-white font-mono">{depthM} metros</strong>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="2.2"
                    step="0.1"
                    value={depthM}
                    onChange={(e) => setDepthM(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Métricas Calculadas */}
              <div className="grid grid-cols-3 gap-2.5 pt-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">Volume Total</span>
                  <strong className="text-sm sm:text-base text-cyan-400 font-mono font-black">{volumeLitros.toLocaleString()} L</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">Bomba Ideal</span>
                  <strong className="text-sm sm:text-base text-white font-mono font-bold">{pumpHp}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">Aquecedor</span>
                  <strong className="text-sm sm:text-base text-amber-400 font-mono font-bold">{heaterKw} kW</strong>
                </div>
              </div>
            </div>

            {/* Formulário de Envio do Lead (Col 6) */}
            <div className="lg:col-span-6 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">
                  Receba a Proposta Técnica com Dimensionamento
                </h4>
                <p className="text-xs text-slate-400">
                  A equipe de engenharia de <strong className="text-white">{brandName}</strong> receberá a telemetria desta simulação para elaborar um plano de preservação ou execução sob medida.
                </p>
              </div>

              {leadSent ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <strong className="text-sm font-bold text-white block">Simulação Encaminhada!</strong>
                  <p className="text-xs text-slate-300">
                    Nossa equipe técnica entrará em contato via WhatsApp para apresentar o relatório completo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Seu Nome Completo</label>
                    <input
                      type="text"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Ex: Roberto Silveira"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">WhatsApp para Contato</label>
                    <input
                      type="tel"
                      value={leadWhatsapp}
                      onChange={(e) => setLeadWhatsapp(e.target.value)}
                      placeholder="(11) 99999-8888"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Revestimento Atual / Desejado</label>
                    <select
                      value={poolType}
                      onChange={(e) => setPoolType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition"
                    >
                      <option value="MONOLITHIC">Revestimento Monolítico (Jhoston / Areia)</option>
                      <option value="FIBER">Fibra de Vidro</option>
                      <option value="VINYL">Vinil</option>
                      <option value="CONCRETE">Pastilha / Azulejo</option>
                      <option value="NEW_PROJECT">Ainda não possuo piscina (Construção)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={leadSending}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {leadSending ? (
                      <span>Encaminhando Dados...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Solicitar Dimensionamento Oficial</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 5. RODAPÉ INSTITUCIONAL */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <p>
          © 2026 {brandName}. Publicação Bimestral • Todos os direitos reservados.
        </p>
        <p className="text-[11px]">
          Plataforma editorial desenvolvida por{' '}
          <Link href="/gadap" className="text-cyan-400 hover:underline">
            GADAP Engenharia & Sistemas
          </Link>{' '}
          • Motor JHPCS PoolTech Ecosystem.
        </p>
      </footer>

    </div>
  );
}
