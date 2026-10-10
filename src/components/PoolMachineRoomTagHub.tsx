'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  QrCode, 
  Printer, 
  Share2, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  MapPin, 
  Droplet, 
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  Building2,
  FileCheck2
} from 'lucide-react';
import { Pool } from '@/types/database';
import { mockPools } from '@/lib/mock-data';
import QRCode from 'qrcode';

interface PoolMachineRoomTagHubProps {
  userRole?: string;
  pools?: Pool[];
}

export function PoolMachineRoomTagHub({ userRole = 'CLIENTE_FINAL', pools: initialPools }: PoolMachineRoomTagHubProps) {
  const [pools, setPools] = useState<Pool[]>(initialPools && initialPools.length > 0 ? initialPools : mockPools);
  const [selectedPoolId, setSelectedPoolId] = useState<string>(pools[0]?.id || mockPools[0].id);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [maintainerPhone, setMaintainerPhone] = useState('55');
  const [sendingWhatsApp, setSendingWhatsApp] = useState(false);
  const [whatsappResult, setWhatsappResult] = useState<{ success?: boolean; message?: string } | null>(null);

  const selectedPool = pools.find(p => p.id === selectedPoolId) || pools[0] || mockPools[0];

  // URL direta de ativação vinculada à piscina
  const appActivationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/pwa?pool_id=${selectedPool.id}&auto_install=true`
    : `https://jcs-pools.vercel.app/pwa?pool_id=${selectedPool.id}&auto_install=true`;

  // Carrega piscinas dinâmicas se não passadas
  useEffect(() => {
    if (!initialPools || initialPools.length === 0) {
      fetch('/api/pools/list')
        .then(r => r.json())
        .then(data => {
          if (data.success && data.pools && data.pools.length > 0) {
            setPools(data.pools);
            setSelectedPoolId(data.pools[0].id);
          }
        })
        .catch(e => console.warn(e));
    }
  }, [initialPools]);

  // Gera o QR Code em alta definição sempre que a piscina muda
  useEffect(() => {
    QRCode.toDataURL(appActivationUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#020617', // Slate-950
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    })
      .then(url => setQrCodeDataUrl(url))
      .catch(err => console.error('Erro ao gerar QR Code:', err));
  }, [selectedPool.id, appActivationUrl]);

  // Copia o link direto
  const handleCopyLink = () => {
    navigator.clipboard.writeText(appActivationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Disparo do convite via WhatsApp usando Evolution API
  const handleSendWhatsApp = async () => {
    const cleanPhone = maintainerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setWhatsappResult({ success: false, message: 'Digite um número de telefone com DDD válido.' });
      return;
    }

    setSendingWhatsApp(true);
    setWhatsappResult(null);

    const message = 
      `🌊 *JHOSTON POOLS • CONVITE EXCLUSIVO DO TRATADOR*\n\n` +
      `Olá! Segue o seu link oficial para instalar o aplicativo de manutenção da piscina:\n\n` +
      `📍 *Ativo:* ${selectedPool.name}\n` +
      `📏 *Volume:* ${selectedPool.volume_m3}m³\n\n` +
      `📲 *Link de Ativação em 1 Toque:*\n${appActivationUrl}\n\n` +
      `💡 *Como usar:* Toque no link acima e clique em "Instalar no Celular". Seus laudos e fotos diárias comprovam a garantia técnica da piscina!`;

    try {
      const res = await fetch('/api/reports/whatsapp-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          message,
          reportType: 'CONVITE_PISCINEIRO_QR'
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWhatsappResult({ success: true, message: 'Convite com link de ativação disparado com sucesso via WhatsApp!' });
      } else {
        // Fallback: abre direto no WhatsApp Web / App
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
        setWhatsappResult({ success: true, message: 'WhatsApp aberto com a mensagem pronta para envio!' });
      }
    } catch (err: any) {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
      setWhatsappResult({ success: true, message: 'WhatsApp aberto com a mensagem pré-formatada!' });
    } finally {
      setSendingWhatsApp(false);
    }
  };

  // Impressão nativa da etiqueta pericial
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner de Governança */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-800/60 rounded-3xl p-6 md:p-8 flex flex-wrap justify-between items-center gap-6 shadow-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <QrCode className="w-3.5 h-3.5" />
              Central de Ativação do Tratador
            </span>
            <span className="text-xs text-slate-400 font-bold hidden sm:inline">Exclusivo Diretoria & Cliente Final</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Etiqueta da Casa de Máquinas & Acesso Rápido
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Elimine atritos: gere o <strong>adesivo oficial impermeável em PDF</strong> para fixação na tampa do filtro ou casa de máquinas. 
            O piscineiro aponta a câmera do celular, instala o app em 1 toque e acessa <strong>estritamente as piscinas do seu condomínio/hotel</strong>.
          </p>
        </div>

        {/* Seletor de Piscina da Diretoria */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 min-w-[260px]">
          <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider">
            Selecione a Piscina do Ativo:
          </label>
          <select
            value={selectedPoolId}
            onChange={(e) => setSelectedPoolId(e.target.value)}
            className="w-full bg-slate-900 border border-cyan-500/30 text-xs text-cyan-300 font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            {pools.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.volume_m3}m³)
              </option>
            ))}
          </select>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
            <span className="truncate">Lat: {Number(selectedPool.gps_lat || -16.425).toFixed(4)}, Lng: {Number(selectedPool.gps_lng || -39.062).toFixed(4)}</span>
          </div>
        </div>
      </div>

      {/* Grid Principal: Visualização da Etiqueta vs Ações de Despacho */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LADO ESQUERDO: Modelo da Etiqueta Física (Preview Pronto para Impressão) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Preview da Placa / Etiqueta Oficial (Padrão ABNT / JHostonTec)
              </h3>
            </div>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Etiqueta (PDF)</span>
            </button>
          </div>

          {/* Cartão Físico com Estilo Placa Metálica / Vinil Impermeável */}
          <div 
            id="machine-room-printable-tag" 
            className="bg-white text-slate-950 rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-slate-900 relative overflow-hidden space-y-6 print:m-0 print:border-2"
          >
            {/* Header da Placa */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-slate-950 flex items-center justify-center text-white">
                    <Droplet className="w-4 h-4 fill-white" />
                  </div>
                  <span className="font-black text-lg tracking-wider uppercase text-slate-950">
                    JHOSTON POOLS
                  </span>
                </div>
                <p className="text-[11px] font-bold text-slate-600 tracking-wide uppercase">
                  SISTEMA DE CONTROLE & GARANTIA DE REVESTIMENTOS MONOLÍTICOS
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded bg-slate-950 text-white font-mono font-black text-[10px] uppercase">
                  ETIQUETA DE ATIVAÇÃO
                </span>
                <p className="text-[10px] text-slate-600 font-bold mt-1">CASA DE MÁQUINAS</p>
              </div>
            </div>

            {/* Conteúdo Central: QR Code + Instruções de Campo */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* QR Code de Alta Densidade */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 bg-slate-100 rounded-2xl border-2 border-slate-300">
                {qrCodeDataUrl ? (
                  <img 
                    src={qrCodeDataUrl} 
                    alt="QR Code de Ativação do Piscineiro" 
                    className="w-44 h-44 object-contain rounded-xl"
                  />
                ) : (
                  <div className="w-44 h-44 bg-slate-200 animate-pulse rounded-xl flex items-center justify-center text-xs text-slate-500 font-bold">
                    Gerando QR Code...
                  </div>
                )}
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 mt-2 text-center">
                  Aponte a Câmera do Celular
                </span>
              </div>

              {/* Instruções para o Tratador */}
              <div className="sm:col-span-7 space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-cyan-800 tracking-wider">
                    ATIVO PROTEGIDO POR LAUDO DIGITAL
                  </span>
                  <h4 className="text-base font-black text-slate-950 leading-tight">
                    {selectedPool.name}
                  </h4>
                  <p className="text-xs text-slate-700 font-medium">
                    Volume Oficial: <strong>{selectedPool.volume_m3} m³</strong> • Revestimento Monolítico Sand/Quartzo
                  </p>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-600 p-2.5 rounded text-[11px] text-amber-950 space-y-1">
                  <p className="font-black uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    INSTRUÇÕES OBRIGATÓRIAS AO TRATADOR:
                  </p>
                  <ol className="list-decimal pl-4 space-y-0.5 text-[10px] font-semibold">
                    <li>Aponte a câmera para o QR Code ao lado.</li>
                    <li>Toque no botão <strong>"Instalar Aplicativo"</strong> no seu celular.</li>
                    <li>Acesse com seu <strong>CPF + PIN</strong> (sem senhas longas).</li>
                    <li>Envie as fotos e testes diários para manter a garantia ativa.</li>
                  </ol>
                </div>

                <div className="text-[9px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-200 font-mono">
                  <p>Código do Ativo: {selectedPool.id}</p>
                  <p>Isolamento: Exclusivo para funcionários deste estabelecimento</p>
                </div>
              </div>
            </div>

            {/* Rodapé da Etiqueta */}
            <div className="flex items-center justify-between pt-3 border-t-2 border-slate-900 text-[10px] font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Garantia Decenal Assegurada por Software
              </span>
              <span>www.jhostonpools.com.br</span>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: Disparo por WhatsApp & Compartilhamento */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card 1: Envio Rápido por WhatsApp */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <div className="h-9 w-9 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Enviar Convite no WhatsApp do Tratador</h3>
                <p className="text-xs text-slate-400">Mensagem pronta com link mágico de instalação</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  WhatsApp do Tratador (com DDD):
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={maintainerPhone}
                    onChange={(e) => setMaintainerPhone(e.target.value)}
                    placeholder="5511999998888"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-500 font-mono">DDI + DDD + Fone</span>
                </div>
              </div>

              <button
                onClick={handleSendWhatsApp}
                disabled={sendingWhatsApp}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                {sendingWhatsApp ? (
                  <span>Disparando via Evolution API...</span>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    <span>Disparar Link no WhatsApp</span>
                  </>
                )}
              </button>

              {whatsappResult && (
                <div className={`p-3 rounded-xl text-xs border ${
                  whatsappResult.success
                    ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                    : 'bg-red-950/60 border-red-800 text-red-300'
                }`}>
                  {whatsappResult.message}
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Link Direto para Copiar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <div className="h-9 w-9 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Link de Instalação Direta</h3>
                <p className="text-xs text-slate-400">Compartilhe em grupos de manutenção do condomínio</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300 break-all select-all">
                {appActivationUrl}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link'}</span>
                </button>

                <a
                  href={appActivationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Testar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Benefícios para o Cliente Final */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-slate-950 border border-cyan-900/40 text-xs text-slate-300 space-y-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Por que a Etiqueta na Casa de Máquinas é Essencial?
            </span>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-400">
              <li><strong>Zero Digitação:</strong> O funcionário não precisa digitar URLs complexas.</li>
              <li><strong>Rotatividade Zero Atrito:</strong> Se o condomínio trocar de piscineiro, o novo funcionário só precisa apontar o celular para o adesivo.</li>
              <li><strong>Isolamento Garantido:</strong> O link já vem travado nas piscinas do seu condomínio.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
