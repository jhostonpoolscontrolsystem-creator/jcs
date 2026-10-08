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
  Award
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
    audience === 'DIRETORIA_JHOSTON' ? 'Joabson & Diretoria JHoston' : 'Dr. Roberto (Gerente Geral Terravista)'
  );

  const [activeTab, setActiveTab] = useState<'REVISTA_PREVIEW' | 'DISPATCH_WHATSAPP'>('REVISTA_PREVIEW');
  const [magazinePage, setMagazinePage] = useState<number>(1);
  const [sending, setSending] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  // Texto formatado para disparo no WhatsApp
  const generateWhatsAppMessage = () => {
    if (audience === 'DIRETORIA_JHOSTON') {
      return `🌟 *BEM-VINDO AO JHPCS • EDIÇÃO EXECUTIVA PREMIUM* 🌟\n\nOlá, *${recipientName}*!\n\nÉ com enorme satisfação que disponibilizamos o acesso oficial ao *JHoston Pools Control System (JHPCS)* — a plataforma definitiva de Engenharia, Digital Twin & Auditoria Forense para Blindagem da Garantia Decenal.\n\n📖 *Acesse a Revista Digital de Apresentação & Manuais Ilustrados:*\n👉 https://jcs-delta.vercel.app/apresentacao-diretoria\n\n🛡️ *O que a Diretoria tem em mãos agora:*\n1. *Cockpit de Telemetria F1*: Tacômetros digitais de pH, Cloro e Langelier (LSI) em tempo real dos seus clientes.\n2. *Blindagem Jurídica*: Laudo forense automático contra uso de ácidos não homologados.\n3. *Central WhatsApp*: Mensagens e alertas automáticos com SLA < 3.2s via Evolution API.\n4. *PWA Offline do Piscineiro*: Com câmera inviolável e geolocalização por satélite.\n\n🔑 *Link Direto de Acesso ao Sistema:*\n🔗 https://jcs-delta.vercel.app\n👤 Login: diretoria@jhostonpools.com.br\n🔒 Senha Provisória: JHoston@2026!\n\n_JHoston Pools Control System • Tecnologia Master Daniel Lopes & Patrícia Grübel_`;
    }

    return `💎 *JHoston Pools • Kit Boas-Vindas do Proprietário & Digital Twin* 💎\n\nPrezado(a) *${recipientName}*,\n\nParabéns pela escolha do revestimento monolítico JHoston Pools! A partir de hoje, sua piscina conta com uma réplica digital (*Digital Twin*) monitorando a garantia decenal do seu patrimônio.\n\n📖 *Consulte o Guia de Boas-Vindas & Manual do Proprietário Ilustrado:*\n👉 https://jcs-delta.vercel.app/guia-cliente\n\n🌊 *Vantagens do Seu Portal Exclusivo:*\n• *Garantia 100% Protegida*: Acompanhamento contínuo da estabilidade mineral da água.\n• *Contador de Cura Submersa (28 Dias)*: Cronômetro dia a dia com bloqueios de segurança.\n• *Previsão Meteorológica Live*: Alertas contra chuvas fortes e tempestades.\n• *Certificado Mensal em PDF*: Laudo assinado pelos auditores da JHoston Pools.\n\n🔑 *Seu Acesso Exclusivo ao Portal:*\n🔗 https://jcs-delta.vercel.app\n\n_JHoston Pools • Engenharia de Revestimentos Monolíticos_`;
  };

  const handleSendWhatsApp = async () => {
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
      }, 1200);
    } catch (e) {
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
                    setRecipientName('Joabson & Diretoria JHoston');
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

          {/* Abas: Revista x WhatsApp */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('REVISTA_PREVIEW')}
              className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                activeTab === 'REVISTA_PREVIEW'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Edição Revista Digital (3 Páginas)
            </button>
            <button
              onClick={() => setActiveTab('DISPATCH_WHATSAPP')}
              className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                activeTab === 'DISPATCH_WHATSAPP'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              Disparar via WhatsApp Oficial
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

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setMagazinePage(1)}
                    className={`px-3 py-1 rounded-lg font-mono font-bold ${
                      magazinePage === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    Pág 1: Capa & Visão
                  </button>
                  <button
                    onClick={() => setMagazinePage(2)}
                    className={`px-3 py-1 rounded-lg font-mono font-bold ${
                      magazinePage === 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    Pág 2: Telemetria & IA
                  </button>
                  <button
                    onClick={() => setMagazinePage(3)}
                    className={`px-3 py-1 rounded-lg font-mono font-bold ${
                      magazinePage === 3 ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    Pág 3: Manual & Garantia
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

                {/* PÁGINA 2: COCKPIT TELEMETRIA F1 & IA MULTIMODAL */}
                {magazinePage === 2 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-black block">
                        TECNOLOGIA DE PONTA
                      </span>
                      <h3 className="text-2xl font-black text-white">Cockpit de Telemetria Fórmula 1 & Leitor de Fitas por IA</h3>
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

                {/* PÁGINA 3: MANUAL ILUSTRADO & CERTIFICADO DE GARANTIA */}
                {magazinePage === 3 && (
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
                          A Regra de Ouro da Blindagem Decenal
                        </h4>
                        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                            <strong className="text-white block">1. Proibição de Ácido Muriático e Limpa Pedras:</strong>
                            O uso de agentes corrosivos é detectado pela IA e suspende imediatamente o certificado de garantia.
                          </div>
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                            <strong className="text-white block">2. Cura Submersa Rigorosa (28 Dias):</strong>
                            Escovação diária suave com cerdas macias sem nenhum cloro choque concentrado no fundo.
                          </div>
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                            <strong className="text-white block">3. Laudo Mensal com Assinatura Digital:</strong>
                            Disponível para download em PDF no portal com memória de cálculo químico forense.
                          </div>
                        </div>
                      </div>

                      {/* Mockup do Certificado */}
                      <div className="p-6 rounded-3xl bg-slate-950 border border-emerald-500/30 flex flex-col justify-between space-y-4 text-center">
                        <div className="space-y-2">
                          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
                          <h4 className="font-black text-white text-base">Certificado Oficial de Garantia</h4>
                          <p className="text-xs text-slate-400">
                            Emitido mensalmente com carimbo de tempo inviolável, fotos comprovadas por GPS e dados espectrais.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
                          STATUS: 100% VÁLIDO & HOMOLOGADO PELO MASTER
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'DISPATCH_WHATSAPP' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    placeholder="Ex: Joabson / Dr. Roberto"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    WhatsApp de Destino (com DDD):
                  </label>
                  <input
                    type="text"
                    value={targetPhone}
                    onChange={(e) => setTargetPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    placeholder="5511999998888"
                  />
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
                    className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition"
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

              {/* Prévia da Mensagem (Smartphone Preview) */}
              <div className="space-y-3 bg-slate-900/60 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-3">
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                      Prévia do WhatsApp (Visualização no Celular)
                    </h4>
                  </div>

                  <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-2xl p-4 text-xs font-sans text-slate-200 space-y-2 whitespace-pre-wrap leading-relaxed shadow-inner max-h-[360px] overflow-y-auto">
                    {generateWhatsAppMessage()}
                  </div>
                </div>

                <span className="text-[10px] text-slate-500 text-center font-mono">
                  Evolution API • Instância 'ecostone' • Vercel Serverless Hook
                </span>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px]">
            JHPCS EXECUTIVE VIP SUITE • AUTORIZADO POR MASTER DANIEL LOPES
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl border border-slate-800 transition"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
}
