'use client';

import React, { useState } from 'react';
import { 
  Send, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Sparkles, 
  Smartphone, 
  Users, 
  ShieldCheck,
  Crown,
  Loader2
} from 'lucide-react';

interface SendMagazineModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfType?: 'EXECUTIVE' | 'CLIENTE';
}

export function SendMagazineModal({ isOpen, onClose, pdfType = 'EXECUTIVE' }: SendMagazineModalProps) {
  const [recipientType, setRecipientType] = useState<'MASTER_DANIEL' | 'MASTER_PATRICIA' | 'DIRETORIA_JHOSTON' | 'GRUPO_OFICIAL' | 'CUSTOM'>('MASTER_DANIEL');
  const [customPhone, setCustomPhone] = useState('');
  const [selectedEdition, setSelectedEdition] = useState<'EXECUTIVE' | 'CLIENTE'>(pdfType);
  const [clientProfile, setClientProfile] = useState<'B2B_HOTEL' | 'B2C_FAMILIA'>('B2B_HOTEL');
  const [clientName, setClientName] = useState('Resort Terravista Trancoso');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!isOpen) return null;

  const phoneBook = {
    MASTER_DANIEL: { name: 'Daniel Lopes (Master)', phone: '5511913192703' },
    MASTER_PATRICIA: { name: 'Patrícia Grübel (Master)', phone: '551178543369' },
    DIRETORIA_JHOSTON: { name: 'Joabson / Diretoria JHoston', phone: '5511988139833' },
    GRUPO_OFICIAL: { name: 'Grupo Oficial JHoston Pools (G-ADAP)', phone: '120363025244519635@g.us' },
  };

  const getTargetPhone = () => {
    if (recipientType === 'CUSTOM') return customPhone;
    return phoneBook[recipientType]?.phone || '';
  };

  const getTargetName = () => {
    if (recipientType === 'CUSTOM') return 'Destinatário VIP';
    return phoneBook[recipientType]?.name || '';
  };

  const getPdfUrl = () => {
    if (selectedEdition === 'EXECUTIVE') {
      return 'https://jhpcs.vercel.app/api/pdf/luxury-compendium?download=true';
    }
    return `https://jhpcs.vercel.app/api/pdf/client-magazine?clientType=${clientProfile}&clientName=${encodeURIComponent(clientName)}`;
  };

  const getPdfFilename = () => {
    if (selectedEdition === 'EXECUTIVE') {
      return 'JHPCS_Revista_Executiva_Edicao_Unica_2026.pdf';
    }
    return `JHPCS_Revista_Proprietario_${clientProfile}.pdf`;
  };

  const getCaptionMessage = () => {
    if (selectedEdition === 'EXECUTIVE') {
      return `👑 *JHPCS EXECUTIVE COMPENDIUM 2026 • EDIÇÃO ÚNICA*\n\nPrezada Diretoria e Gestores,\n\nSegue anexo o documento oficial em PDF de alta resolução da *Revista Executiva JHPCS 2026* contendo:\n• A Carta Aberta & Blindagem Forense da Engenharia Mineral\n• Manifesto GADAP Sistemas (Inovação, Ética & Solidez)\n• Cockpit de Telemetria F1 & Balanço ISA / Langelier\n• O Novo Plano de Manutenção Ativo de 3 Anos (Mão de Obra Isenta)\n• Etiquetas QR Code da Casa de Máquinas & Testes de Estresse EX-01 a EX-08.\n\n_Desenvolvido por Daniel Lopes & Patrícia Grübel (GADAP Sistemas)_`;
    }
    return `💎 *REVISTA JHOSTON POOLS • GUIA DO PROPRIETÁRIO*\n\nPrezado(a) *${clientName}*,\n\nSegue anexo o seu exemplar em PDF da revista de acompanhamento do seu revestimento monolítico:\n• Status do seu Plano de Manutenção Ativo (3 Anos)\n• Acompanhamento contínuo da estabilidade mineral da água\n• Orientações vitais (proibição de ácidos)\n• Certificado de Conformidade do seu ativo.\n\n_JHoston Pools • Engenharia de Revestimentos Monolíticos_`;
  };

  const handleSend = async () => {
    const targetPhone = getTargetPhone();
    if (!targetPhone) {
      alert('Por favor, informe um número de WhatsApp válido.');
      return;
    }

    setIsSending(true);
    setResult(null);

    try {
      const res = await fetch('/api/evolution/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pool_id: 'p-1',
          pool_name: selectedEdition === 'EXECUTIVE' ? 'Rede JHoston Pools' : clientName,
          maintainer_name: 'Daniel Lopes (Master)',
          target_phone: targetPhone,
          alert_type: 'RELATORIO_MENSAL',
          pdf_type: selectedEdition,
          client_type: clientProfile,
          pdf_filename: getPdfFilename(),
          details: {
            violation: getCaptionMessage(),
          }
        })
      });

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message || 'Erro ao conectar à Evolution API' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-amber-950/40 flex flex-col max-h-[92vh]">
        {/* Topo do Modal */}
        <div className="p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Smartphone className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                EVOLUTION API • DISPACHO DIRETO DO PDF
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">
                Enviar Revista em PDF via WhatsApp
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Seletor de Tipo de Revista */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold block">Selecione a Versão da Revista (PDF):</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedEdition('EXECUTIVE')}
                className={`p-3.5 rounded-xl border text-left transition flex items-start gap-2.5 ${
                  selectedEdition === 'EXECUTIVE'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Crown className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs">Revista Executiva (Diretoria)</strong>
                  <span className="text-[10px] text-slate-400">Compêndio completo de 8 capítulos, GADAP e telemetria F1.</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEdition('CLIENTE')}
                className={`p-3.5 rounded-xl border text-left transition flex items-start gap-2.5 ${
                  selectedEdition === 'CLIENTE'
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs">Revista do Proprietário (Cliente)</strong>
                  <span className="text-[10px] text-slate-400">Foco em cuidados, lazer, cura 28 dias e garantia trienal.</span>
                </div>
              </button>
            </div>
          </div>

          {/* Configuração adicional se for Revista do Cliente */}
          {selectedEdition === 'CLIENTE' && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 text-xs block mb-1">Perfil do Ativo:</label>
                  <select
                    value={clientProfile}
                    onChange={(e: any) => setClientProfile(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs font-mono"
                  >
                    <option value="B2B_HOTEL">Resort / Hotelaria / Clube (B2B)</option>
                    <option value="B2C_FAMILIA">Residencial / Família (B2C)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-xs block mb-1">Nome do Cliente / Empreendimento:</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs"
                    placeholder="Ex: Família Silva ou Resort Trancoso"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Seletor de Destinatário */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold block">Selecione o Destinatário no WhatsApp:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'MASTER_DANIEL', label: 'Daniel Lopes (Master)', phone: '55 11 91319-2703' },
                { id: 'MASTER_PATRICIA', label: 'Patrícia Grübel (Master)', phone: '55 11 7854-3369' },
                { id: 'DIRETORIA_JHOSTON', label: 'Joabson (Diretoria JHoston)', phone: '55 11 98813-9833' },
                { id: 'GRUPO_OFICIAL', label: 'Grupo Oficial JHoston / G-ADAP', phone: 'Grupo WhatsApp' },
              ].map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => setRecipientType(dest.id as any)}
                  className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                    recipientType === dest.id
                      ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <span className="block text-xs">{dest.label}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{dest.phone}</span>
                  </div>
                  {recipientType === dest.id && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                </button>
              ))}
            </div>

            {/* Número Customizado */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setRecipientType('CUSTOM')}
                className={`text-xs font-mono underline hover:text-amber-400 transition ${
                  recipientType === 'CUSTOM' ? 'text-amber-400 font-bold' : 'text-slate-400'
                }`}
              >
                + Digitar outro número de WhatsApp avulso
              </button>
              {recipientType === 'CUSTOM' && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    placeholder="Ex: 5511999998888 (com DDI e DDD)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-xs focus:border-amber-400 outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Card de Informação do Envio Nativo de Arquivo */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-3 text-xs text-slate-300">
            <FileText className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-300 block">Envio Direto de Documento em Anexo:</strong>
              <p className="text-[11px] text-slate-400">
                O arquivo <code className="text-white">{getPdfFilename()}</code> será enviado diretamente como documento no chat, sem forçar o usuário a abrir links externos no navegador.
              </p>
            </div>
          </div>

          {/* Resultado do Envio */}
          {result && (
            <div className={`p-4 rounded-xl border text-xs ${
              result.success 
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}>
              {result.success ? (
                <div className="space-y-1">
                  <strong className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> PDF Despachado com Sucesso via Evolution API!
                  </strong>
                  <p>SLA Registrado: <strong>{result.sla_seconds} segundos</strong> (Status: {result.sla_status})</p>
                  <p className="font-mono text-[10px] text-slate-400">ID da Mensagem: {result.evolution_dispatch?.evolution_message_id}</p>
                </div>
              ) : (
                <div>
                  <strong className="flex items-center gap-1.5 text-rose-400 font-bold">
                    <AlertTriangle className="w-4 h-4" /> Falha no Envio:
                  </strong>
                  <p>{result.error || 'Não foi possível completar o disparo.'}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rodapé com Botão de Ação */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-slate-400">
            Instância: <code className="text-emerald-400">ecostone</code> (Evolution API Oficial)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition text-xs font-bold"
            >
              Fechar
            </button>
            <button
              type="button"
              disabled={isSending}
              onClick={handleSend}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 transition disabled:opacity-50 shadow-lg shadow-emerald-500/20"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Enviando PDF...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar PDF Agora</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
