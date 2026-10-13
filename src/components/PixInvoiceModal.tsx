'use client';

import React, { useState } from 'react';
import { 
  QrCode, 
  Copy, 
  Check, 
  Send, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  AlertCircle, 
  X,
  CreditCard,
  Building2,
  Clock
} from 'lucide-react';

interface PixInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  poolItem: {
    pool_id: string;
    pool_name: string;
    client_name: string;
    client_phone: string;
    client_chosen_tier: string;
    monthly_value_brl: number;
  } | null;
}

export function PixInvoiceModal({ isOpen, onClose, poolItem }: PixInvoiceModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>(poolItem?.client_chosen_tier || 'PRO_EXECUTIVE');
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  if (!isOpen || !poolItem) return null;

  const handleGenerateInvoice = async (sendWhatsApp: boolean = false) => {
    setLoading(true);
    setDispatchSuccess(null);
    try {
      const res = await fetch('/api/subscriptions/pix-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pool_id: poolItem.pool_id,
          client_name: poolItem.client_name,
          client_phone: poolItem.client_phone,
          tier: selectedTier,
          send_whatsapp: sendWhatsApp
        })
      });
      const data = await res.json();
      if (data.success) {
        setInvoiceData(data);
        if (sendWhatsApp) {
          setDispatchSuccess(`Fatura PIX despachada com sucesso no WhatsApp de ${poolItem.client_name} (${poolItem.client_phone})!`);
        }
      }
    } catch (e) {
      console.error('Erro ao gerar fatura:', e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                Emissão de Fatura PIX Dinâmico
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                  BACEN EMV
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Regra comercial: Vencimento antecipado até o dia 05 do mês vigente
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informações do Cliente */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-1.5 font-mono">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Ativo:
            </span>
            <span className="font-bold text-white">{poolItem.pool_name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-mono">Cliente / Síndico:</span>
            <span className="font-semibold text-slate-200">{poolItem.client_name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-mono">WhatsApp Notificação:</span>
            <span className="font-mono text-cyan-300">{poolItem.client_phone}</span>
          </div>
        </div>

        {/* Seletor de Tiers */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Selecione o Plano da Fatura:
          </label>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              type="button"
              onClick={() => { setSelectedTier('PRO_EXECUTIVE'); setInvoiceData(null); }}
              className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                selectedTier === 'PRO_EXECUTIVE'
                  ? 'bg-cyan-950/40 border-cyan-500/60 text-white shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-black text-cyan-400">Pro Executive</div>
              <div className="text-lg font-black mt-1">R$ 29,90<span className="text-[10px] text-slate-400 font-normal">/mês</span></div>
              <div className="text-[10px] text-slate-400 mt-1">Despacho quinzenal (01 e 15)</div>
            </button>

            <button
              type="button"
              onClick={() => { setSelectedTier('BLACK_ELITE'); setInvoiceData(null); }}
              className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                selectedTier === 'BLACK_ELITE'
                  ? 'bg-amber-950/40 border-amber-500/60 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-black text-amber-400">Black Elite / Resort</div>
              <div className="text-lg font-black mt-1">R$ 49,90<span className="text-[10px] text-slate-400 font-normal">/mês</span></div>
              <div className="text-[10px] text-slate-400 mt-1">Despacho semanal toda seg-feira</div>
            </button>
          </div>
        </div>

        {/* Feedback de Envio */}
        {dispatchSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{dispatchSuccess}</span>
          </div>
        )}

        {/* Dados da Fatura Gerada */}
        {invoiceData ? (
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* QR Code Imagem */}
              <div className="p-2 bg-white rounded-2xl shrink-0 shadow-lg">
                <img 
                  src={invoiceData.qr_code_url} 
                  alt="QR Code Pix" 
                  className="w-32 h-32 object-contain"
                />
              </div>

              {/* Detalhes de Pagamento */}
              <div className="space-y-2 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono">Valor Total:</span>
                  <span className="text-base font-black text-emerald-400">
                    R$ {invoiceData.amount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono">Vencimento:</span>
                  <span className="font-bold text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {invoiceData.due_date} (Até dia 05)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono">Identificador (TxID):</span>
                  <span className="font-mono text-[10px] text-slate-300">{invoiceData.txid}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono">Beneficiário:</span>
                  <span className="font-semibold text-slate-200">JHOSTON POOLS TEC</span>
                </div>
              </div>
            </div>

            {/* Pix Copia e Cola */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block font-mono">
                PIX Copia e Cola:
              </span>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={invoiceData.pix_copia_e_cola} 
                  className="w-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 p-2.5 rounded-xl truncate focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(invoiceData.pix_copia_e_cola)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 transition shrink-0 cursor-pointer"
                  title="Copiar Código"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <button
              type="button"
              onClick={() => handleGenerateInvoice(false)}
              disabled={loading}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs hover:from-amber-400 hover:to-yellow-400 shadow-lg shadow-amber-500/20 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Calculando e gerando EMV...' : 'Gerar Cobrança PIX Antecipada'}
            </button>
          </div>
        )}

        {/* Rodapé e Botões de Despacho */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <span className="text-[10px] text-slate-500 font-mono">
            *Sem pagamento até dia 05, o ativo é revertido ao Tier Standard gratuito.
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleGenerateInvoice(true)}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? 'Processando...' : 'Despachar no WhatsApp do Cliente'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
