'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Calculator, 
  MessageSquare, 
  Send, 
  Share2, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Flame, 
  Layers, 
  ExternalLink,
  Phone,
  Waves
} from 'lucide-react';
import { FIRST_BIMONTHLY_EDITION, MagazineArticle } from '@/lib/magazine/bimonthlyMagazineEngine';
import { toast } from 'sonner';

export default function RevistaPublicaPage() {
  const params = useParams();
  const tenantSlug = (params?.slug as string) || 'jhoston';

  // Configuração White-Label dinâmica
  const brandName = tenantSlug === 'jhoston' || tenantSlug === 'master' 
    ? 'Jhoston Pools & Lagoons' 
    : tenantSlug.charAt(0).toUpperCase() + tenantSlug.slice(1) + ' Piscinas & Engenharia';

  const [activeArticle, setActiveArticle] = useState<MagazineArticle>(FIRST_BIMONTHLY_EDITION.articles[0]);
  
  // Estado da Calculadora de Piscina / Captação de Lead
  const [lengthM, setLengthM] = useState<number>(8);
  const [widthM, setWidthM] = useState<number>(4);
  const [depthM, setDepthM] = useState<number>(1.4);
  const [poolType, setPoolType] = useState('MONOLITHIC');

  const [leadName, setLeadName] = useState('');
  const [leadWhatsapp, setLeadWhatsapp] = useState('');
  const [leadSending, setLeadSending] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  // Volume Calculado (m³)
  const volumeM3 = Math.round(lengthM * widthM * depthM * 10) / 10;
  const volumeLitros = Math.round(volumeM3 * 1000);
  
  // Recomendações Técnicas
  const recommendedPumpHp = volumeM3 <= 30 ? '1/2 CV' : volumeM3 <= 60 ? '3/4 CV' : volumeM3 <= 90 ? '1.0 CV' : '1.5 CV';
  const filterSize = volumeM3 <= 30 ? 'Filtro D-40 (40kg)' : volumeM3 <= 60 ? 'Filtro D-50 (75kg)' : 'Filtro D-60 (125kg)';
  const heaterKw = Math.round((volumeM3 * 0.7) * 10) / 10;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link da revista copiado! Compartilhe pelo WhatsApp.');
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
          editionSlug: FIRST_BIMONTHLY_EDITION.slug,
          leadName,
          leadWhatsapp,
          poolType,
          estimatedVolumeM3: volumeM3,
          notes: `Piscina calculada: ${lengthM}m x ${widthM}m x ${depthM}m = ${volumeM3}m³ (${volumeLitros}L). Bomba sugerida: ${recommendedPumpHp}, Aquecimento: ${heaterKw}kW.`,
        }),
      });

      if (res.ok) {
        setLeadSent(true);
        toast.success('Solicitação enviada com sucesso! Entraremos em contato.');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setLeadSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080C16] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 1. BARRA SUPERIOR WHITE-LABEL */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                  {brandName}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/30 hidden sm:inline">
                  Edição Bimestral #01
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block font-mono">
                {FIRST_BIMONTHLY_EDITION.periodLabel} • Curadoria PoolTech
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="Compartilhar Revista"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Compartilhar</span>
            </button>

            <a
              href={`https://wa.me/5511999998888?text=Ol%C3%A1%2C%20estou%20lendo%20a%20Revista%20PoolTech%20da%20${encodeURIComponent(brandName)}%20e%20gostaria%20de%20uma%20avalia%C3%A7%C3%A3o.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Falar com Especialista</span>
            </a>
          </div>

        </div>
      </header>

      {/* 2. HERO DA EDIÇÃO (CAPA EDITORIAL) */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <Image
              src={FIRST_BIMONTHLY_EDITION.coverImageUrl}
              alt="Capa da Edição"
              fill
              priority
              className="object-cover opacity-35 filter brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080C16] via-[#080C16]/80 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>EDIÇÃO DE VERÃO • {FIRST_BIMONTHLY_EDITION.periodLabel}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              {FIRST_BIMONTHLY_EDITION.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {FIRST_BIMONTHLY_EDITION.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Bimestre Nov/Dez
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Chancela Pericial JHPCS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ÍNDICE DE ARTIGOS & LEITURA INTERATIVA */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MENU LATERAL DE MATÉRIAS (Col 4) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="px-2 pb-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                Cadernos da Edição #01
              </span>
            </div>

            {FIRST_BIMONTHLY_EDITION.articles.map((art) => {
              const isSelected = activeArticle.id === art.id;
              return (
                <button
                  key={art.id}
                  onClick={() => setActiveArticle(art)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/5'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                  }`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                      isSelected ? 'text-cyan-400' : 'text-slate-500'
                    }`}>
                      {art.categoryLabel}
                    </span>
                    <strong className="text-xs text-white block mt-0.5 leading-snug line-clamp-2">
                      {art.title}
                    </strong>
                    <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTimeMinutes} min de leitura
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Banner de Autoridade Técnica */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/30 border border-amber-500/30 space-y-2 mt-6">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Auditoria Técnica JHPCS Engine</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Esta revista é publicada bimestralmente com base no motor estequiométrico de preservação patrimonial de revestimentos monolíticos e conformidade Anvisa NBR 10.818.
              </p>
            </div>
          </div>

          {/* MATÉRIA COMPLETA EM DESTAQUE (Col 8) */}
          <div className="lg:col-span-8">
            <article className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 space-y-8 shadow-2xl backdrop-blur-md">
              
              {/* Header da Matéria */}
              <div className="space-y-3 border-b border-slate-800 pb-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                    {activeArticle.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeArticle.readTimeMinutes} min de leitura
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  {activeArticle.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                  {activeArticle.subtitle}
                </p>

                <div className="text-xs text-slate-500 font-mono pt-1">
                  Por {activeArticle.author}
                </div>
              </div>

              {/* Imagem de Apoio da Matéria */}
              <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-800">
                <Image
                  src={activeArticle.featuredImageUrl}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Highlights de Impacto */}
              {activeArticle.highlights && activeArticle.highlights.length > 0 && (
                <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                    Pontos-Chave & Conclusões:
                  </span>
                  <ul className="space-y-1.5">
                    {activeArticle.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Corpo Editorial dos Parágrafos */}
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {activeArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Alerta Pericial Exclusivo */}
              {activeArticle.pericialInsight && (
                <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Parecer Pericial de Engenharia:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    &ldquo;{activeArticle.pericialInsight}&rdquo;
                  </p>
                </div>
              )}

            </article>
          </div>

        </div>
      </section>

      {/* 4. CALCULADORA INTERATIVA & CAPTAÇÃO DE LEAD */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/40 p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                <Calculator className="w-3.5 h-3.5" />
                <span>DIMENSIONAMENTO INTELIGENTE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Descubra o Volume e a Potência Ideal para Sua Piscina
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Informe as dimensões aproximadas para calcular a litragem exata, a potência da moto-bomba e a carga térmica de aquecimento recomendadas pela engenharia.
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

              {/* Resultados Calculados */}
              <div className="grid grid-cols-3 gap-2.5 pt-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">Volume Total</span>
                  <strong className="text-sm sm:text-base text-cyan-400 font-mono font-black">{volumeLitros.toLocaleString()} L</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">Bomba Ideal</span>
                  <strong className="text-sm sm:text-base text-white font-mono font-bold">{recommendedPumpHp}</strong>
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
                  Receba o Laudo Técnico de Dimensionamento
                </h4>
                <p className="text-xs text-slate-400">
                  Um especialista técnico de <strong className="text-white">{brandName}</strong> enviará o dimensionamento com custo estimado de insumos e aquecimento pelo WhatsApp.
                </p>
              </div>

              {leadSent ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <strong className="text-sm font-bold text-white block">Solicitação Recebida com Sucesso!</strong>
                  <p className="text-xs text-slate-300">
                    Nossa engenharia recebeu o cálculo da sua piscina de {volumeLitros.toLocaleString()} litros e entrará em contato em breve.
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
                      placeholder="Ex: Carlos Eduardo"
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
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Tipo de Revestimento da Piscina</label>
                    <select
                      value={poolType}
                      onChange={(e) => setPoolType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition"
                    >
                      <option value="MONOLITHIC">Revestimento Monolítico (Jhoston / Areia)</option>
                      <option value="FIBER">Fibra de Vidro</option>
                      <option value="VINYL">Vinil</option>
                      <option value="CONCRETE">Pastilha / Azulejo de Alvenaria</option>
                      <option value="NEW_PROJECT">Ainda vou construir (Projeto Novo)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={leadSending}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {leadSending ? (
                      <span>Enviando Dados...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Solicitar Dimensionamento Gratuito</span>
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
          © 2026 {brandName}. Todos os direitos reservados. Edição Bimestral #01.
        </p>
        <p className="text-[11px]">
          Publicação com curadoria pericial e tecnologia{' '}
          <Link href="/gadap" className="text-cyan-400 hover:underline">
            GADAP Engenharia & Sistemas
          </Link>{' '}
          • Plataforma JHPCS PoolTech Ecosystem.
        </p>
      </footer>

    </div>
  );
}

