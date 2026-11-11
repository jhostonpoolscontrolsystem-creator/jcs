'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Droplet, 
  QrCode, 
  Copy, 
  CheckCircle2, 
  Printer, 
  RefreshCw, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight,
  Send,
  AlertTriangle,
  Receipt,
  User,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import { ModuleGate } from '@/lib/licensing/moduleGuard';

export default function CounterPrescriptionPage() {
  // Dados do Cliente
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  // Parâmetros da Piscina
  const [poolVolumeM3, setPoolVolumeM3] = useState<number>(45);
  const [substrateType, setSubstrateType] = useState('MONOLITICO_SAND');
  const [ph, setPh] = useState<number>(6.8);
  const [chlorinePpm, setChlorinePpm] = useState<number>(0.5);
  const [alkalinityPpm, setAlkalinityPpm] = useState<number>(60);
  const [calciumHardnessPpm, setCalciumHardnessPpm] = useState<number>(200);
  const [tempC, setTempC] = useState<number>(27);

  // Estado da Prescrição e Resposta
  const [loading, setLoading] = useState(false);
  const [prescription, setPrescription] = useState<any>(null);
  const [copiedPix, setCopiedPix] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGeneratePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setPrescription(null);

    try {
      const res = await fetch('/api/trade/counter-prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          poolVolumeM3: Number(poolVolumeM3),
          substrateType,
          ph: Number(ph),
          chlorinePpm: Number(chlorinePpm),
          alkalinityPpm: Number(alkalinityPpm),
          calciumHardnessPpm: Number(calciumHardnessPpm),
          tempC: Number(tempC),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao processar receita de balcão.');
      setPrescription(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (!prescription?.checkout?.pixCopyAndPaste) return;
    navigator.clipboard.writeText(prescription.checkout.pixCopyAndPaste);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ModuleGate module="retail_trade">
      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 selection:bg-amber-500 selection:text-slate-950">
        <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Superior da Loja / Revenda */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 p-[2px] shadow-lg shadow-amber-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Receipt className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 font-bold uppercase">
                  Módulo Lojas & Revendas
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  PIX Instantâneo
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white mt-1">
                Receituário Digital de Balcão & Checkout
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition"
            >
              ← Voltar ao Cockpit
            </Link>
          </div>
        </header>

        {/* Grid Principal: Formulário de Diagnóstico (Esquerda) vs Prescrição & PIX (Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LADO ESQUERDO: Formulário do Balconista */}
          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            {/* OPORTUNIDADE COMERCIAL PREDITIVA (RADAR CLIMÁTICO 48H) */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-amber-300">Radar Climático 48h na Região:</span>
                  <p className="text-[11px] text-slate-300 mt-0.5">Previsão de tempestades e calor intenso. Sugira o <strong className="text-white">Kit Pré-Tempestade</strong> (Bicarbonato + Algicida sem Cobre) para elevar o ticket médio.</p>
                </div>
              </div>
            </div>

            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Droplet className="w-5 h-5 text-cyan-400" />
                1. Teste da Amostra d'Água do Cliente
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Insira os dados medidos na fita de teste da garrafa trazida ao balcão.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleGeneratePrescription} className="space-y-4">
              
              {/* Identificação do Cliente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Cliente</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="ex: Dr. Carlos Eduardo"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp (Opcional)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="ex: (11) 99999-8888"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Substrato & Volume da Piscina */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Revestimento</label>
                  <select
                    value={substrateType}
                    onChange={(e) => setSubstrateType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="MONOLITICO_SAND">Monolítico Sand (JHoston)</option>
                    <option value="FIBRA_VIDRO">Fibra de Vidro (Gelcoat)</option>
                    <option value="VINIL">Bolsão de Vinil</option>
                    <option value="PASTILHA_CERAMICA">Pastilha Cerâmica / Azulejo</option>
                    <option value="ALVENARIA_PINTADA">Alvenaria Pintada / Epóxi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Volume do Tanque (m³)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={poolVolumeM3}
                    onChange={(e) => setPoolVolumeM3(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
                  />
                </div>
              </div>

              {/* Parâmetros Físico-Químicos da Fita com Quick Steppers Táteis */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Medições da Fita de Teste (Toque Rápido / Steppers)
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">Modo Balcão Ágil</span>
                </div>

                {/* pH Stepper */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-slate-300">pH da Água</label>
                    <span className="text-xs font-mono font-black text-cyan-400">{ph.toFixed(1)}</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {[6.8, 7.0, 7.2, 7.4, 7.6, 7.8].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setPh(val)}
                        className={`py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                          ph === val
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                        }`}
                      >
                        {val.toFixed(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cloro Stepper */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-slate-300">Cloro Livre (ppm)</label>
                    <span className="text-xs font-mono font-black text-amber-400">{chlorinePpm.toFixed(1)} ppm</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {[0.0, 0.5, 1.0, 1.5, 2.0, 3.0].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setChlorinePpm(val)}
                        className={`py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                          chlorinePpm === val
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                        }`}
                      >
                        {val.toFixed(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Alcalinidade & Dureza */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-slate-300">Alcalinidade</label>
                      <span className="text-xs font-mono font-black text-emerald-400">{alkalinityPpm} ppm</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[40, 80, 100, 140].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAlkalinityPpm(val)}
                          className={`py-1 rounded-md text-[11px] font-mono font-bold transition cursor-pointer ${
                            alkalinityPpm === val
                              ? 'bg-emerald-500 text-slate-950 font-black'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-slate-300">Dureza Cálcica</label>
                      <span className="text-xs font-mono font-black text-purple-400">{calciumHardnessPpm} ppm</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[150, 200, 250, 350].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setCalciumHardnessPpm(val)}
                          className={`py-1 rounded-md text-[11px] font-mono font-bold transition cursor-pointer ${
                            calciumHardnessPpm === val
                              ? 'bg-purple-500 text-slate-950 font-black'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Calculando Estequiometria & Gerando PIX...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Gerar Prescrição de Balcão & Cobrança PIX</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* LADO DIREITO: Prescrição Gerada & QR Code PIX */}
          <div className="lg:col-span-6 space-y-6">
            {!prescription ? (
              <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-[420px]">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500">
                  <Receipt className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-300">Aguardando dados da amostra</h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  Preencha os valores da fita de teste ao lado e clique em "Gerar Prescrição" para exibir os produtos recomendados e o QR Code de cobrança imediata.
                </p>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl animate-fadeIn">
                
                {/* Header da Prescrição */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-black tracking-wider block">
                      Prescrição Nº {prescription.prescriptionId}
                    </span>
                    <h3 className="text-lg font-black text-white">
                      {prescription.customer.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Volume: <strong>{poolVolumeM3} m³</strong> • ISL: <strong className={prescription.diagnosis.isSafe ? 'text-emerald-400' : 'text-rose-400'}>{prescription.diagnosis.lsi} ({prescription.diagnosis.classification})</strong>
                    </p>
                  </div>

                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir</span>
                  </button>
                </div>

                {/* Lista de Produtos Recomendados */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Cesta de Produtos Recomendados ({prescription.items.length})
                  </span>

                  <div className="space-y-2">
                    {prescription.items.map((item: any) => (
                      <div key={item.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <strong className="text-xs text-white block">{item.name}</strong>
                          <p className="text-[11px] text-slate-400 leading-snug">{item.instructions}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-amber-400 font-mono">
                            R$ {item.priceEstimateBrl.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bloco de Cobrança PIX */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-950 to-slate-950 border border-amber-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-black block">Total a Pagar no Balcão</span>
                      <h4 className="text-2xl font-black text-white font-mono">
                        R$ {prescription.totalAmountBrl.toFixed(2)}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      PIX Automático
                    </div>
                  </div>

                  {/* QR Code na Tela */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                    <img 
                      src={prescription.checkout.pixQrCodeUrl} 
                      alt="QR Code PIX Balcão" 
                      className="w-32 h-32 rounded-lg bg-white p-1.5 shrink-0" 
                    />
                    <div className="space-y-2 w-full text-center sm:text-left">
                      <p className="text-xs text-slate-300 font-medium">
                        Aponte a câmera do celular do cliente ou use o código Copia e Cola:
                      </p>
                      <button
                        onClick={handleCopyPix}
                        className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold font-mono flex items-center justify-center gap-2 border border-slate-700 transition cursor-pointer"
                      >
                        {copiedPix ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Código PIX Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Código PIX</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Status da Emissão Fiscal */}
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-slate-400">
                        Chave Fiscal (NFC-e / Cupom Fiscal): <strong className="text-slate-300">Standby (Super Admin)</strong>
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 font-mono">
                      CFOP 5102 / 5405
                    </span>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
    </ModuleGate>
  );
}

