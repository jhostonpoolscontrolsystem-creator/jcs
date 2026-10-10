'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  CheckCircle2, 
  Crown, 
  Building2, 
  Smartphone, 
  ShieldCheck, 
  FileText, 
  Layers, 
  X, 
  Eye, 
  ExternalLink,
  Copy,
  Clock,
  Image,
  Award,
  ArrowLeft,
  ArrowRight,
  Download
} from 'lucide-react';
import { mockPools } from '@/lib/mock-data';

export type WelcomeKitAudience = 'DIRETORIA_JHOSTON' | 'CLIENTE_FINAL';

interface ExecutiveWelcomeKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserRole?: string;
  defaultAudience?: WelcomeKitAudience;
}

export default function ExecutiveWelcomeKitModal({
  isOpen,
  onClose,
  currentUserRole = 'MASTER',
  defaultAudience = 'DIRETORIA_JHOSTON'
}: ExecutiveWelcomeKitModalProps) {
  // Permissões: MASTER pode enviar para ambos. DIRETORIA_JH pode enviar para CLIENTE_FINAL.
  const isMaster = currentUserRole === 'MASTER';
  const [audience, setAudience] = useState<WelcomeKitAudience>(
    isMaster ? defaultAudience : 'CLIENTE_FINAL'
  );

  const [targetPhone, setTargetPhone] = useState(
    audience === 'DIRETORIA_JHOSTON' ? '5511999998888' : '5573999991234'
  );
  const [recipientName, setRecipientName] = useState(
    audience === 'DIRETORIA_JHOSTON' ? 'Diretoria Executiva JHoston Pools' : 'Dr. Roberto (Gerente Geral Terravista)'
  );

  const [activeTab, setActiveTab] = useState<'REVISTA_PREVIEW' | 'FLYER_PREVIEW' | 'DISPATCH_WHATSAPP'>('REVISTA_PREVIEW');
  const [magazinePage, setMagazinePage] = useState<number>(1);
  const [sending, setSending] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/whatsapp-groups')
      .then(res => res.json())
      .then(data => {
        if (data.groups) setGroups(data.groups);
      })
      .catch(() => {});
  }, []);

  if (!isOpen) return null;

  // Texto formatado para disparo no WhatsApp
  const generateWhatsAppMessage = () => {
    if (audience === 'DIRETORIA_JHOSTON') {
      return `🌟 *BEM-VINDO AO JHPCS • EDIÇÃO EXECUTIVA PREMIUM* 🌟\n\nOlá, *${recipientName}*!\n\nÉ com enorme satisfação que disponibilizamos o acesso oficial ao *JHoston Pools Control System (JHPCS)* — a plataforma definitiva de Engenharia, Digital Twin & Auditoria Forense com o *Plano de Manutenção Ativo de 3 Anos*.\n\n👑 *Baixar a Revista Executiva de Alto Padrão (Edição Única • 8 Páginas PDF):*\n👉 https://jhpcs.vercel.app/api/pdf/luxury-compendium?download=true\n\n📖 *Consultar Revista Online e Interativa:* \n👉 https://jhpcs.vercel.app/revista-executiva\n\n📄 *Baixar o Flyer Executivo Sintético (1 Página):*\n👉 https://jhpcs.vercel.app/api/pdf/presentation-flyer?type=DIRETORIA_JHOSTON\n\n🎭 *Roteiro de Apresentação & Personagens:* \n👉 https://jhpcs.vercel.app/apresentacao-diretoria\n\n🛡️ *O que a Diretoria tem em mãos agora:*\n1. *Plano de Manutenção Ativo*: Monitoramento semanal e revisões anuais com mão de obra isenta.\n2. *Cockpit de Telemetria F1*: Tacômetros digitais de pH, Cloro e LSI em tempo real.\n3. *Blindagem Jurídica*: Laudo forense automático contra uso de ácidos não homologados.\n4. *Central WhatsApp*: Mensagens e alertas automáticos com SLA < 3.2s via Evolution API.\n5. *PWA Offline com QR Code*: Instalação em 1 toque na casa de máquinas e operação 100% offline.\n\n🔑 *Link Direto de Acesso ao Sistema:*\n🔗 https://jhpcs.vercel.app\n👤 Login: jhostontec@jhostontec.com.br\n🔒 Senha Provisória: 123456\n\n_JHoston Pools Control System • Responsável Editorial: Daniel Lopes & Patrícia Grübel_`;
    }

    return `💎 *JHoston Pools • Kit Boas-Vindas do Proprietário & Digital Twin* 💎\n\nPrezado(a) *${recipientName}*,\n\nParabéns pela escolha do revestimento monolítico JHoston Pools! A partir de hoje, sua piscina conta com uma réplica digital (*Digital Twin*) e o exclusivo *Plano de Manutenção Ativo de 3 Anos* garantindo acompanhamento técnico semanal sem mensalidade e revisões anuais com mão de obra 100% isenta.\n\n👑 *Revista Executiva Colecionável JHPCS 2026 (PDF Completo):*\n👉 https://jhpcs.vercel.app/api/pdf/luxury-compendium?download=true\n\n📄 *Baixar o Flyer VIP de Apresentação (1 Página):*\n👉 https://jhpcs.vercel.app/api/pdf/presentation-flyer?type=CLIENTE_FINAL\n\n📖 *Consulte o Guia de Boas-Vindas & Manual Web do Proprietário:*\n👉 https://jhpcs.vercel.app/guia-cliente\n\n🌊 *Vantagens do Seu Portal Exclusivo:*\n• *Garantia Trienal Ativa*: Acompanhamento contínuo da estabilidade mineral da água.\n• *Etiqueta da Casa de Máquinas (QR)*: Instalação fácil do app pelo seu tratador sem digitar links.\n• *Contador de Cura Submersa (28 Dias)*: Cronômetro dia a dia com bloqueios de segurança.\n• *Previsão Meteorológica Live*: Alertas contra chuvas fortes e tempestades.\n\n🔑 *Seu Acesso Exclusivo ao Portal:*\n🔗 https://jhpcs.vercel.app\n\n_JHoston Pools • Engenharia de Revestimentos Monolíticos_`;
  };

  const handleSendWhatsApp = async () => {
    if (targetPhone.includes('@g.us') && !isMaster) {
      alert('Permissão Restrita: O disparo do Kit de Boas-Vindas para GRUPOS de WhatsApp está autorizado no momento apenas para o usuário MASTER.');
      return;
    }

    setSending(true);
    setDispatchStatus(null);

    const messageText = generateWhatsAppMessage();

    try {
      const res = await fetch('/api/evolution/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pool_id: 'p-1',
          pool_name: audience === 'DIRETORIA_JHOSTON' ? 'Rede JHoston Pools' : 'Resort Terravista Trancoso',
          maintainer_name: 'Daniel Lopes (Master)',
          target_phone: targetPhone,
          alert_type: 'RELATORIO_MENSAL',
          details: {
            ph: 7.4,
            chlorine_ppm: 2.0,
            health_score: 98,
            stock_runway_days: 14,
            violation: messageText
          }
        })
      });

      const data = await res.json();
      setTimeout(() => {
        setDispatchStatus(data);
        setSending(false);
      }, 800);
    } catch (e: any) {
      setDispatchStatus({ error: e.message || 'Erro de rede ao disparar mensagem' });
      setSending(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-amber-500/40 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl shadow-amber-950/80 flex flex-col max-h-[94vh]">
        {/* HEADER EXECUTIVO DE LUXO */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400 shadow-inner">
              <Crown className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                  EXECUTIVE WELCOME SUITE • PADRÃO REVISTA DE LUXO
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {isMaster ? 'Acesso Master Soberano' : 'Acesso Diretoria JHoston'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Disparador Executivo de Boas-Vindas & Revista Digital
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SUBHEADER: SELETOR DE PÚBLICO-ALVO & ABAS */}
        <div className="px-6 py-3 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Seletor de Destinatário */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">Enviar Kit Para:</span>
            {isMaster ? (
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => {
                    setAudience('DIRETORIA_JHOSTON');
                    setRecipientName('Diretoria Executiva JHoston Pools');
                    setTargetPhone('5511999998888');
                  }}
                  className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 ${
                    audience === 'DIRETORIA_JHOSTON'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  Diretoria JHoston Pools
                </button>
                <button
                  onClick={() => {
                    setAudience('CLIENTE_FINAL');
                    setRecipientName('Dr. Roberto (Gerente Geral Terravista)');
                    setTargetPhone('5573999991234');
                  }}
                  className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 ${
                    audience === 'CLIENTE_FINAL'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5" />
                  Cliente Final (Resort / Luxo)
                </button>
              </div>
            ) : (
              <span className="px-3 py-1 bg-cyan-950 text-cyan-300 font-bold rounded-xl border border-cyan-800">
                Cliente Final (Resort / Hotel / Residencial)
              </span>
            )}
          </div>

          {/* Abas: Revista x Flyer x WhatsApp */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('REVISTA_PREVIEW')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition text-xs ${
                activeTab === 'REVISTA_PREVIEW'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Revista Digital</span>
            </button>
            <button
              onClick={() => setActiveTab('FLYER_PREVIEW')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition text-xs ${
                activeTab === 'FLYER_PREVIEW'
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-black shadow-md'
                  : 'text-cyan-400 hover:text-white border border-cyan-500/30'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Flyer de Apresentação (1 Pág)</span>
            </button>
            <button
              onClick={() => setActiveTab('DISPATCH_WHATSAPP')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition text-xs ${
                activeTab === 'DISPATCH_WHATSAPP'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Disparar WhatsApp</span>
            </button>
          </div>
        </div>

        {/* CORPO PRINCIPAL */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'REVISTA_PREVIEW' && (
            <div className="space-y-6">
              {/* Barra de Paginação da Revista */}
              <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-2xl border border-slate-800 text-xs">
                <span className="text-slate-400">
                  Edição Especial: <strong className="text-white">{audience === 'DIRETORIA_JHOSTON' ? 'Apresentação Corporativa para a Diretoria' : 'Guia de Garantia & Digital Twin do Proprietário'}</strong>
                </span>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setMagazinePage(1)}
                    className={`px-2.5 py-1 rounded-lg font-mono font-bold ${
                      magazinePage === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    1: Capa
                  </button>
                  <button
                    onClick={() => setMagazinePage(2)}
                    className={`px-2.5 py-1 rounded-lg font-mono font-bold ${
                      magazinePage === 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    2: Índice & Editorial
                  </button>
                  <button
                    onClick={() => setMagazinePage(3)}
                    className={`px-2.5 py-1 rounded-lg font-mono font-bold ${
                      magazinePage === 3 ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    3: Telemetria F1
                  </button>
                  <button
                    onClick={() => setMagazinePage(4)}
                    className={`px-2.5 py-1 rounded-lg font-mono font-bold ${
                      magazinePage === 4 ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    4: Manual & Regras
                  </button>
                  <button
                    onClick={() => setMagazinePage(5)}
                    className={`px-2.5 py-1 rounded-lg font-mono font-bold ${
                      magazinePage === 5 ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    5: Certificado Decenal
                  </button>
                </div>
              </div>

              {/* LAYOUT EDITORIAL DE REVISTA DE LUXO */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                {/* Background Decorativo */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* PÁGINA 1: CAPA & VISÃO ESTRATÉGICA */}
                {magazinePage === 1 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 gap-4">
                      <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Logo JHPCS" className="h-12 w-12 object-contain" />
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-black block">
                            EDITION 2026 • VOLUME IV
                          </span>
                          <h3 className="text-2xl font-black text-white">JHPCS ENTERPRISE MAGAZINE</h3>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-950 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold self-start sm:self-auto">
                        HOMOLOGAÇÃO OFICIAL
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                          {audience === 'DIRETORIA_JHOSTON' ? 'Para a Diretoria Executiva' : 'Para o Proprietário & Gerência'}
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                          A Revolução da Garantia Decenal & Telemetria F1 de Piscinas
                        </h1>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {audience === 'DIRETORIA_JHOSTON' 
                            ? 'O JHPCS foi desenvolvido para blindar a JHoston Pools contra garantias indevidas provocadas por tratadores despreparados, transformando dados físicos e químicos em provas periciais invioláveis com imagens e GPS.'
                            : 'O seu investimento em revestimento monolítico agora é protegido dia e noite por um Digital Twin inteligente que monitora o equilíbrio Langelier, estoque e emite laudos automáticos em PDF.'}
                        </p>

                        <div className="pt-2 flex flex-wrap gap-2 text-xs">
                          <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                            🛡️ Garantia Decenal Ativa
                          </span>
                          <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                            🏎️ Pit Wall F1
                          </span>
                          <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                            🤖 Visão Computacional
                          </span>
                        </div>
                      </div>

                      {/* Imagem Editorial em Destaque */}
                      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-black aspect-video flex items-center justify-center group">
                        <img 
                          src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80" 
                          alt="Piscina de Areia Monolítica de Alto Luxo" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
                          <span className="font-mono text-cyan-400 text-[10px] block">MONÓLITO DE ALTO PADRÃO</span>
                          <strong>Resort Terravista Trancoso (BA) • 350 m³ Protegidos</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PÁGINA 2: SUMÁRIO EXECUTIVO & EDITORIAL */}
                {magazinePage === 2 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-black block">
                          CADERNO EDITORIAL & ESTRUTURA
                        </span>
                        <h3 className="text-2xl font-black text-white">Sumário Executivo & Editorial Oficial</h3>
                      </div>
                      <span className="px-3 py-1 bg-amber-950 text-amber-400 text-xs font-mono font-bold rounded-full border border-amber-800">
                        PÁG 02
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Índice Estrutural */}
                      <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                        <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-amber-400" />
                          Índice da Publicação Executiva
                        </h4>
                        <div className="space-y-3 text-xs text-slate-300">
                          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                            <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-1.5 py-0.5 rounded text-[10px]">PÁG 01</span>
                            <div>
                              <strong className="text-white block">Capa de Luxo & Indicadores Gerais</strong>
                              <span className="text-slate-400 text-[11px]">Destaques tecnológicos e métricas ativas do portfólio.</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                            <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-1.5 py-0.5 rounded text-[10px]">PÁG 02</span>
                            <div>
                              <strong className="text-white block">Sumário & Editorial Oficial</strong>
                              <span className="text-slate-400 text-[11px]">Manifesto técnico por Daniel Lopes (Responsável Editorial).</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                            <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-1.5 py-0.5 rounded text-[10px]">PÁG 03</span>
                            <div>
                              <strong className="text-white block">Cockpit de Telemetria F1 & Satélite</strong>
                              <span className="text-slate-400 text-[11px]">Tacômetros de pH, Cloro, LSI e inteligência OpenWeather.</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                            <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-1.5 py-0.5 rounded text-[10px]">PÁG 04</span>
                            <div>
                              <strong className="text-white block">Manual do Usuário & As 3 Regras de Ouro</strong>
                              <span className="text-slate-400 text-[11px]">Preservação mineral, cura dos 28 dias e insumos homologados.</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                            <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-1.5 py-0.5 rounded text-[10px]">PÁG 05</span>
                            <div>
                              <strong className="text-white block">Certificado Decenal & Laudo Pericial</strong>
                              <span className="text-slate-400 text-[11px]">Validação jurídica e chancela criptográfica SHA-256.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Editorial Completo */}
                      <div className="p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h4 className="font-bold text-white text-sm flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            Editorial: A Precisão Científica a Serviço da Garantia
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            "A durabilidade e o refinamento estético de um revestimento monolítico não decorrem do acaso, mas de rigor científico inegociável. Ao longo dos anos, constatou-se que a quase totalidade das patologias precoces registradas decorre de intervenções inadequadas, sobretudo o uso clandestino de ácido muriático, desequilíbrio termodinâmico contínuo e negligência nos ciclos de cura."
                          </p>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            "O JHPCS transforma a gestão de piscinas em uma operação de precisão cirúrgica no estilo Fórmula 1. Cada dado auditado por inteligência artificial e satélite alimenta a blindagem jurídica e garante a integridade da garantia decenal."
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-800/80">
                          <div className="text-xs font-bold text-white">DANIEL LOPES</div>
                          <div className="text-[11px] text-amber-400 font-medium">Responsável Editorial & Engenharia JHPCS</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">Disponível em: https://jcs-pools.vercel.app</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PÁGINA 3: COCKPIT TELEMETRIA F1 & IA MULTIMODAL */}
                {magazinePage === 3 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-black block">
                        TECNOLOGIA DE PONTA • PIT WALL
                      </span>
                      <h3 className="text-2xl font-black text-white">Cockpit de Telemetria Fórmula 1 & Balanço LSI</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                          <Layers className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-white text-sm">Tacômetros Digitais de Precisão</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Medidores com zonas de tolerância restrita para pH (7.2 - 7.6), Cloro ppm e Alcalinidade, reagindo a cada gota aferida.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-white text-sm">Mostrador Langelier (LSI)</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Equação termodinâmica que atesta se a água está neutra (-0.3 a +0.3) ou ácida/corrosiva, garantindo a integridade dos minerais.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-white text-sm">IA de Visão Computacional</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          O tratador aponta a câmera e a IA extrai cores da fita de teste e analisa o espelho d'água contra eflorescências sem digitação.
                        </p>
                      </div>
                    </div>

                    {/* Banner de Séries Históricas */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-bold text-white text-sm">Séries Históricas com Target Bands Seguras</h4>
                        <p className="text-xs text-slate-300">
                          Curvas de estabilidade dos últimos 14 dias acopladas à previsão meteorológica da OpenWeather.
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800">
                        ESTABILIDADE QUÍMICA: 98.4%
                      </span>
                    </div>
                  </div>
                )}

                {/* PÁGINA 4: MANUAL ILUSTRADO & AS REGRAS DE OURO */}
                {magazinePage === 4 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-black block">
                        MANUAL ILUSTRADO & REGULAMENTO
                      </span>
                      <h3 className="text-2xl font-black text-white">Manual Operacional com Diretrizes de Engenharia</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-400" />
                          As 3 Regras de Ouro da Blindagem Decenal
                        </h4>
                        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                          <div className="p-3 rounded-xl bg-slate-950 border border-red-500/30">
                            <strong className="text-red-400 block">1. Proibição de Ácido Muriático e Limpa Pedras:</strong>
                            O uso de agentes corrosivos é detectado pela IA e suspende imediatamente o certificado de garantia.
                          </div>
                          <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/30">
                            <strong className="text-teal-300 block">2. Cura Submersa Rigorosa (28 Dias):</strong>
                            Escovação diária suave com cerdas macias sem nenhum cloro choque concentrado no fundo.
                          </div>
                          <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30">
                            <strong className="text-indigo-300 block">3. Check-in com Carimbo de GPS e Câmera ao Vivo:</strong>
                            Registro pelo aplicativo PWA com verificação via satélite no raio homologado de 100m.
                          </div>
                        </div>
                      </div>

                      {/* Insumos Homologados */}
                      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
                        <h4 className="font-bold text-amber-400 text-sm">Insumos 100% Homologados pela JHostonTec</h4>
                        <div className="space-y-2 text-xs text-slate-300">
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <strong className="text-cyan-400">Barrilha Leve (Carbonato de Sódio):</strong> Elevação de pH sem agredir a resina.
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <strong className="text-cyan-400">Bicarbonato de Sódio Puro:</strong> Manutenção do tampão de alcalinidade total.
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <strong className="text-cyan-400">Hipoclorito de Cálcio 65%:</strong> Cloração pura e sem risco de desbotamento.
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <strong className="text-cyan-400">Sequestrante de Metais:</strong> Barreira contra manchas de ferro e cobre.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PÁGINA 5: CERTIFICADO OFICIAL DE GARANTIA DECENAL */}
                {magazinePage === 5 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-black block">
                        CERTIFICAÇÃO OFICIAL & LAUDO PERICIAL
                      </span>
                      <h3 className="text-2xl font-black text-white">Termo de Validade da Garantia Decenal</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-4">
                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-emerald-400" />
                          Conformidade Estrita com Normas NBR & LSI
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Certificamos para todos os fins jurídicos e periciais que os revestimentos sob gestão encontram-se em conformidade estrita com o Protocolo Internacional de Equilíbrio Termodinâmico LSI.
                        </p>
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                          <div>• <strong>Registros Auditados:</strong> 100% validados por telemetria sem interrupções.</div>
                          <div>• <strong>Contaminação Ácida:</strong> 0 (Zero) detecções de ácido corrosivo.</div>
                          <div>• <strong>Rastreabilidade de Campo:</strong> Coletas assinadas via PWA Mobile com GPS.</div>
                        </div>
                      </div>

                      {/* Mockup do Certificado */}
                      <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/40 flex flex-col justify-between space-y-4 text-center">
                        <div className="space-y-2">
                          <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto" />
                          <h4 className="font-black text-white text-base">Selo de Garantia Homologado</h4>
                          <p className="text-xs text-slate-400">
                            Assinatura digital e responsabilidade editorial registradas no motor pericial.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
                          RESPONSÁVEL EDITORIAL: DANIEL LOPES
                        </div>

                        <div className="text-[10px] text-slate-500 font-mono">
                          SHA-256: JHPCS-VIP-MONOLITHIC-SEAL
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                  {magazinePage < 5 ? (
                    <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Página {magazinePage} de 5
                      </span>
                      <button
                        onClick={() => setMagazinePage(magazinePage + 1)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition cursor-pointer"
                      >
                        <span>Próxima Página</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href="/api/pdf/luxury-compendium?download=true"
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
                        >
                          <Crown className="w-3.5 h-3.5 text-slate-950" />
                          <span>Baixar Revista Edição Única (PDF 8 Págs)</span>
                        </a>

                        <a
                          href="/revista-executiva"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center gap-2 border border-amber-500/40 transition cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                          <span>Consultar Revista Online</span>
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                        </a>
                      </div>

                      <button
                        onClick={() => setActiveTab('FLYER_PREVIEW')}
                        className="px-4 py-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 hover:bg-cyan-900 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Ver Flyer Sintético (1 Pág)</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('DISPATCH_WHATSAPP')}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition cursor-pointer"
                      >
                        <span>Avançar para WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* ABA: FLYER DE APRESENTAÇÃO (1 PÁGINA) */}
          {activeTab === 'FLYER_PREVIEW' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Barra Superior do Flyer */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950/40 border border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Flyer Executivo Sintético (1 Página A4)
                    </span>
                    <span className="text-xs text-slate-400 font-bold">
                      {audience === 'DIRETORIA_JHOSTON' ? 'Para a Diretoria Executiva JH' : 'Para o Cliente Final / Gerência'}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white">
                    {audience === 'DIRETORIA_JHOSTON' 
                      ? 'Flyer Corporativo: Blindagem, F1 & Garantia Decenal' 
                      : 'Flyer VIP: Digital Twin & Proteção do Revestimento'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`/api/pdf/presentation-flyer?type=${audience}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar Flyer em PDF (1 Pág)</span>
                  </a>
                </div>
              </div>

              {/* Visualizador Simulador da Página do Flyer */}
              <div className="max-w-2xl mx-auto bg-slate-950 rounded-3xl border-2 border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                <div className={`h-1.5 w-full -mt-6 -mx-6 mb-4 ${audience === 'DIRETORIA_JHOSTON' ? 'bg-amber-500' : 'bg-cyan-500'}`} />

                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <span className="font-black text-sm uppercase tracking-wider text-white">
                      JHOSTON POOLS CONTROL SYSTEM
                    </span>
                    <p className="text-[11px] text-slate-400 font-mono">
                      ENGENHARIA MINERAL • DIGITAL TWIN • AUDITORIA FORENSE
                    </p>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded font-mono ${
                    audience === 'DIRETORIA_JHOSTON' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  }`}>
                    {audience === 'DIRETORIA_JHOSTON' ? 'DIRETORIA EXECUTIVA' : 'CLIENTE VIP'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-black text-white leading-tight">
                    {audience === 'DIRETORIA_JHOSTON'
                      ? 'A Blindagem Definitiva da Garantia Decenal de Revestimentos'
                      : 'A Proteção Inteligente da Sua Piscina Monolítica JHoston'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {audience === 'DIRETORIA_JHOSTON'
                      ? 'Eliminação de custos com garantias indevidas provocadas por tratadores, aliada à telemetria ao vivo estilo Fórmula 1 e alertas em < 3.2s via WhatsApp oficial.'
                      : 'Digital Twin com monitoramento termodinâmico contínuo, laudos periciais mensais em PDF e facilidade máxima de instalação do app do tratador via QR Code.'}
                  </p>
                </div>

                {/* 4 Destaques do Flyer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-black text-cyan-400 uppercase">01 • {audience === 'DIRETORIA_JHOSTON' ? 'Escudo Jurídico' : 'Garantia 100% Protegida'}</span>
                    <p className="text-[11px] text-slate-300">
                      {audience === 'DIRETORIA_JHOSTON'
                        ? 'Trava letal contra ácidos muriáticos e comprovação com fotos carimbadas por satélite (GPS).'
                        : 'Estabilidade físico-química diária que mantém a garantia decenal ativa sem riscos de manchas.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-black text-cyan-400 uppercase">02 • {audience === 'DIRETORIA_JHOSTON' ? 'Telemetria F1' : 'Etiqueta QR da Casa de Máquinas'}</span>
                    <p className="text-[11px] text-slate-300">
                      {audience === 'DIRETORIA_JHOSTON'
                        ? 'Tacômetros ao vivo de pH, Cloro e LSI com target bands sombreadas e correlação climática.'
                        : 'Placa impressa em PDF para colar no filtro. O tratador apenas aponta a câmera e instala o app.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-black text-cyan-400 uppercase">03 • {audience === 'DIRETORIA_JHOSTON' ? 'WhatsApp Evolution' : 'Isolamento Multi-Tenant'}</span>
                    <p className="text-[11px] text-slate-300">
                      {audience === 'DIRETORIA_JHOSTON'
                        ? 'Alertas instantâneos e certificados mensais automáticos com entrega abaixo de 3.2s.'
                        : 'O tratador enxerga exclusivamente as piscinas do seu condomínio, com privacidade e LGPD.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-black text-cyan-400 uppercase">04 • {audience === 'DIRETORIA_JHOSTON' ? 'Adoção Sem Atrito' : 'Estoque & Meteorologia Live'}</span>
                    <p className="text-[11px] text-slate-300">
                      {audience === 'DIRETORIA_JHOSTON'
                        ? 'Adesivo QR Code na casa de máquinas e PWA operando 100% offline em subsolos.'
                        : 'Previsão de tempestades com dias de antecedência e cálculo automático de estoque.'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Documento Oficial de Apresentação Sintética • 1 Página A4
                  </span>
                  <a
                    href={`/api/pdf/presentation-flyer?type=${audience}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold hover:bg-cyan-900 transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'DISPATCH_WHATSAPP' && (
            <div className="space-y-4">
              {/* BARRA SUPERIOR DE RETORNO E AÇÕES RÁPIDAS */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('REVISTA_PREVIEW')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 border border-slate-700 transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span>Voltar para Edição da Revista</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="/api/pdf/executive-magazine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/30 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Baixar PDF Oficial</span>
                  </a>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/80">
                    SLA &lt; 3.2s
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Formulário de Configuração do Disparo */}
                <div className="space-y-4 bg-slate-900/60 p-5 rounded-3xl border border-slate-800">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                    <Send className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                      Configurar Disparo via Evolution API
                    </h4>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Nome do Destinatário:
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
                      placeholder="Ex: Diretoria Executiva / Dr. Roberto"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        {targetPhone.includes('@g.us') ? 'ID do Grupo WhatsApp (JID):' : 'WhatsApp de Destino (com DDD):'}
                      </label>
                      {groups.length > 0 && (
                        <span className="text-[10px] text-cyan-400 font-semibold">
                          {groups.length} Grupos Disponíveis
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={targetPhone}
                        onChange={(e) => setTargetPhone(e.target.value)}
                        className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono ${
                          targetPhone.includes('@g.us') ? 'border-emerald-500/70 text-emerald-300' : 'border-slate-800 focus:border-cyan-500'
                        }`}
                        placeholder="5511999998888 ou 120363023456789012@g.us"
                      />
                      {targetPhone.includes('@g.us') && (
                        <span className="absolute right-3 top-2.5 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                          GRUPO WHATSAPP
                        </span>
                      )}
                    </div>

                    {/* Seletor Rápido de Grupos Cadastrados */}
                    {groups.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] text-slate-500">Ou selecione um grupo:</span>
                        {groups.slice(0, 4).map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => {
                              setRecipientName(`Grupo: ${g.name}`);
                              setTargetPhone(g.jid);
                            }}
                            className={`text-[10px] px-2 py-0.5 rounded-lg border transition cursor-pointer ${
                              targetPhone === g.jid
                                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                                : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border-slate-800'
                            }`}
                          >
                            {g.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                    <span className="font-bold text-slate-300 block">SLA Garantido:</span>
                    <p className="text-[11px]">
                      A mensagem formatada com emojis, links da revista e credenciais é entregue em menos de <strong>3.2 segundos</strong> na instância oficial <code>ecostone</code>.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      disabled={sending}
                      onClick={handleSendWhatsApp}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{sending ? 'Disparando no WhatsApp...' : 'Disparar Kit Boas-Vindas Agora'}</span>
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedLink ? 'Texto Copiado para Área de Transferência!' : 'Copiar Texto Completo'}</span>
                    </button>
                  </div>

                  {dispatchStatus && (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Disparo concluído com sucesso! SLA: {dispatchStatus.sla_seconds}s</span>
                    </div>
                  )}
                </div>

                {/* Prévia da Mensagem (Smartphone Preview com Scroll Suave) */}
                <div className="space-y-3 bg-slate-900/60 p-5 rounded-3xl border border-slate-800 flex flex-col h-full">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-cyan-400" />
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                        Prévia do WhatsApp (Visualização no Celular)
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-500">Role para ler tudo</span>
                  </div>

                  <div 
                    tabIndex={0}
                    className="bg-emerald-950/30 border border-emerald-800/50 rounded-2xl p-4 text-xs font-sans text-slate-200 space-y-2 whitespace-pre-wrap leading-relaxed shadow-inner h-[400px] max-h-[480px] overflow-y-auto overscroll-contain focus:outline-none focus:ring-1 focus:ring-emerald-500/40 select-text"
                  >
                    {generateWhatsAppMessage()}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Evolution API • 'ecostone'</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('REVISTA_PREVIEW')}
                      className="text-amber-400 hover:text-amber-300 font-sans font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Voltar à Revista
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] hidden sm:inline">
              JHPCS EXECUTIVE VIP SUITE • AUTORIZADO POR MASTER DANIEL LOPES
            </span>
            <a
              href="/api/pdf/executive-magazine"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 cursor-pointer underline decoration-amber-500/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Kit em PDF</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === 'DISPATCH_WHATSAPP' && (
              <button
                type="button"
                onClick={() => setActiveTab('REVISTA_PREVIEW')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold rounded-xl border border-slate-800 transition flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>Voltar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl border border-slate-800 transition cursor-pointer"
            >
              Fechar Janela
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
