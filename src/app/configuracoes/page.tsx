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
  Layers
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

