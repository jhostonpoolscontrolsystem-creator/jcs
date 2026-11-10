'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  CreditCard, 
  QrCode, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Compass, 
  FileText, 
  AlertCircle,
  RefreshCw,
  Phone,
  Layers,
  MessageSquare,
  Send,
  Power,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function TenantSettingsPage() {
  const [clientId, setClientId] = useState('c-1');
  const [pixKey, setPixKey] = useState('jhostontec@jhostontec.com.br');
  const [pixKeyType, setPixKeyType] = useState<'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'RANDOM'>('EMAIL');
  const [pixBeneficiaryName, setPixBeneficiaryName] = useState('JHOSTON POOLS TECNOLOGIA');
  const [pixBeneficiaryCity, setPixBeneficiaryCity] = useState('SAO PAULO');
  
  // Customização de Marca (White-Label)
  const [whiteLabelCompanyName, setWhiteLabelCompanyName] = useState('JHoston Pools & Lagoons');
  const [supportPhone, setSupportPhone] = useState('5511999998888');

  // Parâmetros Operacionais de Campo & Vigilância
  const [autoDeductInventory, setAutoDeductInventory] = useState(true);
  const [geofenceRadiusMeters, setGeofenceRadiusMeters] = useState(50);
  const [anvisaShiftInspection, setAnvisaShiftInspection] = useState(true);

  // Estados de WhatsApp Multi-Instância (Evolution API)
  const [waStatus, setWaStatus] = useState<'CONNECTED' | 'CONNECTING' | 'DISCONNECTED'>('DISCONNECTED');
  const [waConnectedNumber, setWaConnectedNumber] = useState<string | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrBase64, setQrBase64] = useState<string | null>(null);
  const [qrCountdown, setQrCountdown] = useState(45);
  const [waAutoReports, setWaAutoReports] = useState(true);
  const [waAutoPix, setWaAutoPix] = useState(true);
  const [waConnecting, setWaConnecting] = useState(false);
  const [testSentSuccess, setTestSentSuccess] = useState(false);

  // Consulta de status inicial de WhatsApp
  useEffect(() => {
    fetch('/api/whatsapp/status?tenant_id=demo-solo')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setWaStatus(d.status);
          setWaConnectedNumber(d.connectedNumber);
        }
      })
      .catch(() => {});
  }, []);

  // Polling automático a cada 3 segundos durante o modal aberto com QR Code
  useEffect(() => {
    let interval: any = null;
    if (isQrModalOpen && waStatus !== 'CONNECTED') {
      interval = setInterval(async () => {
        try {
          const res = await fetch('/api/whatsapp/status?tenant_id=demo-solo');
          const data = await res.json();
          if (data.status === 'CONNECTED') {
            setWaStatus('CONNECTED');
            setWaConnectedNumber(data.connectedNumber || '+55 (11) 98888-0001');
            setIsQrModalOpen(false);
          }
        } catch {}
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isQrModalOpen, waStatus]);

  // Contagem regressiva do QR Code
  useEffect(() => {
    let timer: any = null;
    if (isQrModalOpen && qrCountdown > 0) {
      timer = setInterval(() => setQrCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isQrModalOpen, qrCountdown]);

  const handleOpenConnectModal = async () => {
    setWaConnecting(true);
    setIsQrModalOpen(true);
    setQrCountdown(45);
    try {
      const res = await fetch('/api/whatsapp/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenant_id: 'demo-solo' }),
      });
      const data = await res.json();
      if (data.qrcode_base64) {
        setQrBase64(data.qrcode_base64);
        setWaStatus('CONNECTING');
      }
    } catch {
      // Ignore
    } finally {
      setWaConnecting(false);
    }
  };

  const handleDisconnectWhatsapp = async () => {
    try {
      await fetch('/api/whatsapp/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenant_id: 'demo-solo' }),
      });
      setWaStatus('DISCONNECTED');
      setWaConnectedNumber(null);
    } catch {}
  };

  const handleSendTestMessage = async () => {
    try {
      const res = await fetch('/api/whatsapp/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenant_id: 'demo-solo', target_phone: supportPhone }),
      });
      if (res.ok) {
        setTestSentSuccess(true);
        setTimeout(() => setTestSentSuccess(false), 3500);
      }
    } catch {}
  };

  // Estados de Controle
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/tenant/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          pixKey,
          pixKeyType,
          pixBeneficiaryName,
          pixBeneficiaryCity,
          whiteLabelCompanyName,
          supportPhone,
          autoDeductInventory,
          geofenceRadiusMeters: Number(geofenceRadiusMeters),
          anvisaShiftInspection,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao salvar configurações.');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 selection:bg-cyan-500 selection:text-slate-950">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-sky-400 p-[2px] shadow-lg shadow-cyan-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Settings className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold uppercase">
                Painel do Cliente & Lojista
              </span>
              <h1 className="text-xl md:text-2xl font-black text-white mt-1">
                Configurações da Sua Empresa & PIX
              </h1>
            </div>
          </div>

          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition"
          >
            ← Voltar ao Cockpit
          </Link>
        </header>

        {/* Feedback Alert */}
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-300 text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Configurações salvas e aplicadas em tempo real em todas as instâncias do seu tenant!</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs font-bold animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* BLOCO 1: DADOS BANCÁRIOS & CHAVE PIX */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-extrabold text-white">1. Recebimento Direto via PIX (Balcão & Vendas)</h2>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Sem Intermediários</span>
            </div>

            <p className="text-xs text-slate-400">
              Configure sua própria chave bancária para que os pagamentos gerados na tela de balcão e reposição caiam diretamente na conta da sua empresa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tipo de Chave PIX</label>
                <select
                  value={pixKeyType}
                  onChange={(e) => setPixKeyType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
                >
                  <option value="CNPJ">CNPJ</option>
                  <option value="CPF">CPF</option>
                  <option value="EMAIL">E-mail</option>
                  <option value="PHONE">Telefone</option>
                  <option value="RANDOM">Chave Aleatória (EVP)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Chave PIX Oficial</label>
                <input
                  type="text"
                  required
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="ex: financeiro@suarepousa.com.br ou CNPJ"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nome do Titular / Razão Social</label>
                <input
                  type="text"
                  required
                  value={pixBeneficiaryName}
                  onChange={(e) => setPixBeneficiaryName(e.target.value)}
                  placeholder="ex: PISCINAS DO BRASIL LTDA"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cidade da Conta</label>
                <input
                  type="text"
                  required
                  value={pixBeneficiaryCity}
                  onChange={(e) => setPixBeneficiaryCity(e.target.value)}
                  placeholder="ex: SAO PAULO"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 uppercase font-bold"
                />
              </div>
            </div>
          </div>

          {/* BLOCO 2: PERSONALIZAÇÃO WHITE-LABEL */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-extrabold text-white">2. Identidade Visual da Sua Empresa (White-Label)</h2>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">Marca Própria</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nome Comercial para Relatórios</label>
                <input
                  type="text"
                  value={whiteLabelCompanyName}
                  onChange={(e) => setWhiteLabelCompanyName(e.target.value)}
                  placeholder="ex: Aquatec Piscinas & Manutenção"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-bold"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Este nome aparecerá no topo dos comprovantes disparados no WhatsApp do seu cliente.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp de Atendimento / Suporte</label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  placeholder="ex: 5511999998888"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* BLOCO DE CONEXÃO WHATSAPP MULTI-TENANT (EVOLUTION API) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base font-extrabold text-white">Conexão WhatsApp Corporativo (White-Label)</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                  waStatus === 'CONNECTED'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : waStatus === 'CONNECTING'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    waStatus === 'CONNECTED' ? 'bg-emerald-400' : waStatus === 'CONNECTING' ? 'bg-amber-400' : 'bg-rose-400'
                  }`} />
                  {waStatus === 'CONNECTED' ? 'ONLINE' : waStatus === 'CONNECTING' ? 'SINCRONIZANDO' : 'OFFLINE'}
                </span>
                {waConnectedNumber && (
                  <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">+{waConnectedNumber}</span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Conecte o WhatsApp do seu negócio para que os laudos periciais e cobranças PIX sejam disparados diretamente do seu número próprio, fortalecendo a credibilidade perante os clientes.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Status da Conexão Evolution API</span>
                  {waStatus === 'CONNECTED' && (
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Número Pareado com Sucesso
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  {waStatus === 'CONNECTED'
                    ? 'Mensagens enviadas com atraso humanizado anti-ban (1.5s) e indicação de digitação.'
                    : 'Nenhum número conectado no momento para este tenant. Escaneie o QR Code.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {waStatus === 'CONNECTED' ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSendTestMessage}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{testSentSuccess ? 'Enviado!' : 'Testar Disparo'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDisconnectWhatsapp}
                      className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/20 transition flex items-center gap-1.5"
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>Desconectar</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleOpenConnectModal}
                    disabled={waConnecting}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {waConnecting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Gerando QR Code...</span>
                      </>
                    ) : (
                      <>
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Conectar via QR Code</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Configurações de Automação de Mensagens */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <div className="space-y-0.5">
                  <strong className="text-xs text-white block">Auto-envio de Laudos Periciais</strong>
                  <p className="text-[11px] text-slate-400">Disparar PDF/Base64 após cada manutenção física realizada.</p>
                </div>
                <input
                  type="checkbox"
                  checked={waAutoReports}
                  onChange={(e) => setWaAutoReports(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-slate-900 border-slate-700 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <div className="space-y-0.5">
                  <strong className="text-xs text-white block">Lembrete de Vencimento e Chave PIX</strong>
                  <p className="text-[11px] text-slate-400">Notificar cobrança automaticamente 2 dias antes do vencimento às 08:00.</p>
                </div>
                <input
                  type="checkbox"
                  checked={waAutoPix}
                  onChange={(e) => setWaAutoPix(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-slate-900 border-slate-700 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* MODAL QR CODE WHATSAPP */}
          {isQrModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-6 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-extrabold text-white">Conectar WhatsApp</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsQrModalOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-center">
                  <div className="p-4 bg-white rounded-2xl inline-block mx-auto shadow-inner">
                    {qrBase64 ? (
                      <img
                        src={qrBase64.startsWith('data:') ? qrBase64 : `data:image/png;base64,${qrBase64}`}
                        alt="QR Code WhatsApp"
                        className="w-48 h-48 object-contain"
                      />
                    ) : (
                      <div className="w-48 h-48 flex flex-col items-center justify-center gap-2 text-slate-400">
                        <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
                        <span className="text-xs font-bold text-slate-600">Carregando QR Code...</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-300 font-semibold">
                      Abra o WhatsApp &gt; Dispositivos Conectados &gt; Conectar um aparelho
                    </p>
                    <p className="text-[11px] text-slate-500">
                      O QR Code expira em <span className="font-mono text-emerald-400 font-bold">{qrCountdown}s</span>. Polling ativo a cada 3s.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsQrModalOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                  >
                    Fechar Janela
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* BLOCO 3: PARÂMETROS OPERACIONAIS DE CAMPO (GEOFENCING & ANVISA) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base font-extrabold text-white">3. Regras de Campo, Geofencing & Vigilância Sanitária</h2>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Fase 3 Roadmap</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="space-y-0.5">
                  <strong className="text-xs text-white block">Raio Máximo de Geofencing GPS (Metros)</strong>
                  <p className="text-[11px] text-slate-400">Distância limite entre o celular do técnico e a piscina no check-in.</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={10}
                    max={200}
                    value={geofenceRadiusMeters}
                    onChange={(e) => setGeofenceRadiusMeters(Number(e.target.value))}
                    className="w-20 bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-2 text-center text-xs font-mono font-bold text-emerald-300"
                  />
                  <span className="text-xs text-slate-400">metros</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="space-y-0.5">
                  <strong className="text-xs text-white block">Baixa Estequiométrica Automática</strong>
                  <p className="text-[11px] text-slate-400">Debitar o estoque volante do veículo automaticamente a cada visita por m³.</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoDeductInventory}
                  onChange={(e) => setAutoDeductInventory(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="space-y-0.5">
                  <strong className="text-xs text-white block">Logbook Sanitário Obrigatório (Anvisa / Turnos)</strong>
                  <p className="text-[11px] text-slate-400">Ativa o livro digital de inspeção para hotéis, clubes e condomínios.</p>
                </div>
                <input
                  type="checkbox"
                  checked={anvisaShiftInspection}
                  onChange={(e) => setAnvisaShiftInspection(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700 cursor-pointer"
                />
              </div>

              {/* Status da Chave Fiscal */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-xs text-white block">Módulo Fiscal (NF-e de Insumos & NFS-e de Serviços)</strong>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                      SUPER ADMIN
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    A liberação e o modo de operação (Homologação / Produção) são gerenciados exclusivamente pelo Super Admin Daniel Lopes / Patrícia Grübel.
                  </p>
                </div>
                <Link
                  href="/cockpit"
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-400 text-xs font-bold hover:bg-amber-500/10 transition"
                >
                  Ver no Cockpit
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Salvando Configurações...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar Todas as Configurações</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

