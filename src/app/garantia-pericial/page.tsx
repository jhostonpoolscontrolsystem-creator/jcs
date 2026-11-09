'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Send, 
  FileText, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  Building2, 
  User, 
  Download, 
  Sparkles,
  RefreshCw,
  PhoneCall
} from 'lucide-react';

export default function WarrantyAuditingControlPage() {
  const [customerType, setCustomerType] = useState<'PF' | 'PJ'>('PF');
  const [periodType, setPeriodType] = useState<'QUINZENAL' | 'MENSAL'>('MENSAL');
  const [clientName, setClientName] = useState('Dr. Carlos Eduardo');
  const [poolName, setPoolName] = useState('Residência Granja Viana (Monolítico Sand)');
  const [targetPhone, setTargetPhone] = useState('5511999998888');
  const [warrantyCode, setWarrantyCode] = useState('JH-2026-DECENAL-PF-001');

  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [pdfResult, setPdfResult] = useState<any>(null);
  const [sendingAlert, setSendingAlert] = useState(false);
  const [alertResult, setAlertResult] = useState<any>(null);

  // Geração e envio do laudo periódico em Base64
  const handleGenerateBase64Report = async () => {
    setGeneratingPdf(true);
    setPdfResult(null);
    try {
      const res = await fetch('/api/warranty/health-report-base64', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: clientName,
          pool_name: poolName,
          customer_type: customerType,
          period_type: periodType,
          target_phone: targetPhone,
          warranty_code: warrantyCode,
          direct_whatsapp_dispatch: true,
        }),
      });
      const data = await res.json();
      setPdfResult(data);
    } catch (e: any) {
      console.error(e);
    } finally {
      setGeneratingPdf(false);
    }
  };

  // Simulação de Desvio Crítico disparando informe à Diretoria
  const handleSimulateCriticalDeviation = async () => {
    setSendingAlert(true);
    setAlertResult(null);
    try {
      const res = await fetch('/api/warranty/notify-deviation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pool_name: poolName,
          client_name: clientName,
          warranty_certificate_number: warrantyCode,
          deviation_type: 'DESVIO_QUIMICO_ISL',
          ph: 6.4,
          chlorine: 4.5,
          isl: -0.72,
          acid_used: true,
        }),
      });
      const data = await res.json();
      setAlertResult(data);
    } catch (e: any) {
      console.error(e);
    } finally {
      setSendingAlert(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-amber-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
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
                <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-0.5 rounded-full border border-amber-500/20 font-black flex items-center gap-1 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" /> Garantia Decenal Ativa
                </span>
                <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-0.5 rounded-full border border-sky-500/20 font-semibold">
                  JHoston Pools & Lagoons
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
                Central de Perícia & Informes de Garantia
              </h1>
              <p className="text-xs md:text-sm text-slate-400">
                Auditoria contínua por tipo de cliente (PF/PJ), informes WhatsApp à diretoria e despacho de laudos em Base64
              </p>
            </div>
          </div>
        </div>

        {/* Quadro Comparativo de Obrigações do Termo de Garantia: PF vs PJ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-3xl border transition ${
            customerType === 'PF' 
              ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/40' 
              : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  PESSOA FÍSICA (PF)
                </span>
                <h3 className="text-lg font-black text-white mt-1">Residências & Chácaras</h3>
              </div>
              <User className="w-6 h-6 text-amber-400" />
            </div>

            <ul className="text-xs text-slate-300 space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Obrigação Contratual: <strong>Pelo menos 01 medição por semana</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Frequência do Laudo Pericial: <strong>Mensal Consolidado</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Envio automático de PDF em <strong>Base64 via WhatsApp</strong></span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setCustomerType('PF');
                  setPeriodType('MENSAL');
                  setWarrantyCode('JH-2026-DECENAL-PF-001');
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${
                  customerType === 'PF'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {customerType === 'PF' ? 'Regra Selecionada (PF)' : 'Selecionar Perfil PF'}
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border transition ${
            customerType === 'PJ' 
              ? 'bg-slate-900 border-sky-500 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500/40' 
              : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                  PESSOA JURÍDICA (PJ)
                </span>
                <h3 className="text-lg font-black text-white mt-1">Condomínios, Resorts & Hotéis</h3>
              </div>
              <Building2 className="w-6 h-6 text-sky-400" />
            </div>

            <ul className="text-xs text-slate-300 space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Obrigação Contratual: <strong>Mínimo de 03 medições por semana</strong> (ou diário por turno)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Frequência do Laudo Pericial: <strong>Quinzenal</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Conformidade com <strong>RDC Anvisa e NBR 10.818</strong></span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setCustomerType('PJ');
                  setPeriodType('QUINZENAL');
                  setWarrantyCode('JH-2026-DECENAL-PJ-084');
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${
                  customerType === 'PJ'
                    ? 'bg-sky-500 text-slate-950 font-black shadow-md shadow-sky-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {customerType === 'PJ' ? 'Regra Selecionada (PJ)' : 'Selecionar Perfil PJ'}
              </button>
            </div>
          </div>
        </div>

        {/* Ações e Disparadores Operacionais */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LADO ESQUERDO: Emissão do Laudo em Base64 */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-5 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                Despacho de Laudo de Saúde em Base64
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Gera o PDF completo com assinatura pericial e transmite em Base64 via WhatsApp para o cliente.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Piscina / Ativo</label>
                <input
                  type="text"
                  value={poolName}
                  onChange={(e) => setPoolName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Frequência</label>
                  <select
                    value={periodType}
                    onChange={(e) => setPeriodType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="MENSAL">Mensal (Padrão PF)</option>
                    <option value="QUINZENAL">Quinzenal (Padrão PJ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Destino</label>
                  <input
                    type="text"
                    value={targetPhone}
                    onChange={(e) => setTargetPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={generatingPdf}
                onClick={handleGenerateBase64Report}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-950/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {generatingPdf ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Gerar Laudo Base64 & Enviar WhatsApp ao Cliente
              </button>

              {pdfResult && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-2xl text-xs space-y-2 animate-fadeIn">
                  <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Laudo Pericial Transmitido com Sucesso!
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Bytes Base64 gerados: <strong className="font-mono text-emerald-400">{pdfResult.pdf_base64_length} chars</strong>.
                  </p>
                  <div className="pt-2">
                    <a
                      href={pdfResult.pdf_data_uri}
                      download={`LAUDO_${warrantyCode}.pdf`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" /> Baixar Cópia Local do Laudo (PDF)
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* LADO DIREITO: Informes em Tempo Real à Diretoria */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-5 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Informe de Desvio à Diretoria JHoston
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Quando a piscina apresenta anomalia química ou omissão de reporte, a diretoria é alertada imediatamente no WhatsApp.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Telefones Cadastrados:</span>
                <span className="text-amber-400 font-mono font-bold">Joabson & Diretoria JH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Gatilho Automático:</span>
                <span className="text-rose-400 font-bold">ISL &lt; -0.30 ou pH &lt; 7.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Violação Gravíssima:</span>
                <span className="text-rose-400 font-bold">Ácido Muriático sem Diluição</span>
              </div>
            </div>

            <button
              type="button"
              disabled={sendingAlert}
              onClick={handleSimulateCriticalDeviation}
              className="w-full py-3.5 bg-gradient-to-r from-rose-600 via-amber-600 to-rose-500 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-950/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {sendingAlert ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <PhoneCall className="w-4 h-4" />
              )}
              Simular Desvio Crítico & Disparar Alerta WhatsApp
            </button>

            {alertResult && (
              <div className="p-4 bg-rose-950/40 border border-rose-800/80 rounded-2xl text-xs space-y-2 animate-fadeIn">
                <div className="text-rose-300 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Alerta Despachado para o WhatsApp da Diretoria!
                </div>
                <p className="text-slate-300 text-[11px]">
                  Severidade: <strong className="font-mono text-rose-400">{alertResult.alert?.severity}</strong>. O relatório já instrui o departamento pericial a acionar o proprietário.
                </p>
              </div>
            )}

            <div className="pt-2 text-[11px] text-slate-500">
              * A blindagem pericial da JHoston protege a matriz mineral monolítica contra acionamentos judiciais indevidos causados por erro de tratadores autônomos.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

