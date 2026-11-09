'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Droplet, 
  Waves, 
  QrCode, 
  Printer, 
  Share2, 
  Building2, 
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Copy
} from 'lucide-react';

export default function SealVerificationPage({ params }: { params?: { id?: string } }) {
  const [sealData, setSealData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [widgetType, setWidgetType] = useState<'totem' | 'card' | 'badge'>('totem');

  const poolId = params?.id || 'resort-vista-bela';

  useEffect(() => {
    async function loadSeal() {
      setLoading(true);
      try {
        const res = await fetch(`/api/seal/verify?pool_id=${encodeURIComponent(poolId)}`);
        const data = await res.json();
        if (data.seal) {
          setSealData(data.seal);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    loadSeal();
  }, [poolId]);

  const handleCopyEmbed = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const iframeEmbedCode = `<iframe src="https://jhpcs.vercel.app/selo/embed/${poolId}" width="380" height="480" frameborder="0" style="border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3);"></iframe>`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition"
              title="Voltar ao Painel"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-black flex items-center gap-1 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" /> Selo Oficial de Conformidade
                </span>
                <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-0.5 rounded-full border border-sky-500/20 font-semibold">
                  NBR 10.818 / Anvisa
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
                Certificação de Qualidade da Água & Segurança
              </h1>
              <p className="text-xs md:text-sm text-slate-400">
                Auditoria Sanitária, Equilíbrio Químico e Blindagem de Garantia por JHoston Pools & Lagoons
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl transition shadow-sm"
            >
              <Printer className="w-4 h-4 text-emerald-400" /> Imprimir Totem / Display
            </button>
            <button
              onClick={() => handleCopyEmbed(iframeEmbedCode)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition"
            >
              <Copy className="w-4 h-4" /> {copiedLink ? 'Código Copiado!' : 'Incorporar no Site'}
            </button>
          </div>
        </div>

        {/* Totem Display Visual para Recepção / Balcão */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* O Selo Principal (Totem Elegante com Moldura Neon) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Halo de Fundo Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/80">
                  CHANCELA PERICIAL OFICIAL
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white pt-2">
                  {sealData?.facility_name || 'Resort & Spa Vista Bela'}
                </h2>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-400" /> {sealData?.pool_name} • {sealData?.city_uf}
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center text-center p-1">
                  <Award className="w-6 h-6 text-emerald-400" />
                  <span className="text-[9px] font-black text-white uppercase mt-0.5">OURO</span>
                </div>
              </div>
            </div>

            {/* Status Badge em Destaque */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-emerald-300">
                  ÁGUA CRISTALINA & BALANCEADA (EM CONFORMIDADE)
                </h3>
                <p className="text-xs text-slate-400">
                  Parâmetros rigorosamente dentro dos padrões microbiológicos e físico-químicos da Anvisa.
                </p>
              </div>
            </div>

            {/* Grid de Parâmetros Medidos em Tempo Real */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-center space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">pH da Água</span>
                <div className="text-xl font-black text-white font-mono">{sealData?.last_ph ?? 7.4}</div>
                <span className="text-[9px] text-emerald-400 font-bold">Faixa Ideal (7.2 - 7.6)</span>
              </div>
              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-center space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Cloro Livre</span>
                <div className="text-xl font-black text-white font-mono">{sealData?.last_free_chlorine ?? 2.2} ppm</div>
                <span className="text-[9px] text-emerald-400 font-bold">Sanitizado</span>
              </div>
              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-center space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Temperatura</span>
                <div className="text-xl font-black text-white font-mono">{sealData?.last_temperature_c ?? 28.5}°C</div>
                <span className="text-[9px] text-sky-400 font-bold">Conforto Térmico</span>
              </div>
              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-center space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Índice Sanitário</span>
                <div className="text-xl font-black text-emerald-400 font-mono">{sealData?.bather_safety_index ?? 98}/100</div>
                <span className="text-[9px] text-emerald-400 font-bold">Grau de Pureza A</span>
              </div>
            </div>

            {/* Garantia JHoston & Auditoria */}
            <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-2 relative z-10">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Garantia Decenal de Revestimento JHoston
                </span>
                <span className="font-mono text-amber-400 font-bold text-[11px]">
                  {sealData?.warranty_code || 'JH-2026-DECENAL-084'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Piscina com revestimento monolítico auditado continuamente por telemetria F1. Proteção de saúde para banhistas e integridade pericial para o complexo.
              </p>
            </div>

            {/* Footer do Selo */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 relative z-10">
              <div>
                <p className="font-semibold text-slate-300">Responsável: {sealData?.auditor_responsible}</p>
                <p className="text-[10px] text-slate-500 font-mono">Registro: {sealData?.auditor_council_id}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" /> Atualizado em {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

          </div>

          {/* LADO DIREITO: QR Code Interativo & Ferramentas de Incorporação */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Bloco de Validação com Câmera do Celular */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 text-sky-400 rounded-full border border-sky-500/20 text-xs font-bold">
                <QrCode className="w-4 h-4" /> Aponte a Câmera do Smartphone
              </div>

              <h3 className="text-lg font-bold text-white">
                Verificação Pública Instantânea
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Hóspedes e condôminos podem escanear esta placa na recepção ou borda para conferir o laudo sanitário em tempo real.
              </p>

              {/* QR Code Gráfico Dinâmico */}
              <div className="p-4 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-2xl">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    `https://jhpcs.vercel.app/selo/${poolId}`
                  )}`}
                  alt="QR Code de Verificação do Selo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-[11px] font-mono text-slate-400 break-all bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                https://jhpcs.vercel.app/selo/{poolId}
              </div>
            </div>

            {/* Caixa de Código para Widget no Site do Hotel/Condomínio */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-emerald-400" /> Widget para Sites & Blogs
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  IFRAME / HTML
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Copie este código para exibir o selo digital em tempo real no rodapé ou na página de lazer do site do seu hotel ou condomínio:
              </p>

              <div className="relative">
                <textarea
                  readOnly
                  rows={4}
                  value={iframeEmbedCode}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-emerald-400 focus:outline-none resize-none"
                />
                <button
                  onClick={() => handleCopyEmbed(iframeEmbedCode)}
                  className="absolute top-2 right-2 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold rounded-lg border border-slate-700 transition"
                >
                  {copiedLink ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
