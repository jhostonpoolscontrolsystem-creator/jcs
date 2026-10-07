'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Droplet, 
  CheckCircle2, 
  Smartphone, 
  LayoutDashboard, 
  Layers, 
  Send, 
  FileText,
  AlertTriangle,
  MapPin,
  Camera,
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';
import { mockPools, mockMaintenanceLogs } from '@/lib/mock-data';
import { evaluateChemicalRules, calculateChemicalDose } from '@/lib/chemical-rules';

export default function JHPCSApp() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pwa' | 'audit_live'>('dashboard');

  // Estado da Simulação Operacional do PWA do Piscineiro
  const [selectedPoolId, setSelectedPoolId] = useState('p-2');
  const [phInput, setPhInput] = useState(6.8);
  const [chlorineInput, setChlorineInput] = useState(1.5);
  const [alkalinityInput, setAlkalinityInput] = useState(60);
  const [acidUsed, setAcidUsed] = useState(false);
  const [brushedSurface, setBrushedSurface] = useState(true);
  const [backwashedFilter, setBackwashedFilter] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [submissionFeedback, setSubmissionFeedback] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  // Piscina selecionada
  const activePool = mockPools.find(p => p.id === selectedPoolId) || mockPools[0];

  // Cálculo prévio em tempo real
  const currentAuditPreview = evaluateChemicalRules(
    {
      ph: phInput,
      chlorine_ppm: chlorineInput,
      alkalinity_ppm: alkalinityInput,
      acid_product_used: acidUsed,
    },
    activePool
  );

  const dosePreview = calculateChemicalDose(
    'ALCALINIZANTE',
    alkalinityInput,
    100,
    activePool.volume_m3
  );

  const handleSimulateSubmit = async () => {
    setSubmitting(true);
    setSubmissionFeedback(null);
    try {
      const res = await fetch('/api/maintenance/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pool_id: activePool.id,
          maintainer_id: 'u-4',
          ph: phInput,
          chlorine_ppm: chlorineInput,
          alkalinity_ppm: alkalinityInput,
          acid_product_used: acidUsed,
          brushed_surface: brushedSurface,
          backwashed_filter: backwashedFilter,
          gps_lat: activePool.gps_lat,
          gps_lng: activePool.gps_lng,
          liability_accepted: termsAccepted,
          evidences: [
            {
              id: 'ev-1',
              evidence_type: 'FOTO_PISCINA_PANORAMICA',
              photo_url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80',
              gps_lat: activePool.gps_lat,
              gps_lng: activePool.gps_lng,
              captured_at: new Date().toISOString(),
            },
            {
              id: 'ev-2',
              evidence_type: 'FOTO_TESTE_AGUA',
              photo_url: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80',
              gps_lat: activePool.gps_lat,
              gps_lng: activePool.gps_lng,
              captured_at: new Date().toISOString(),
            }
          ]
        }),
      });
      const data = await res.json();
      setSubmissionFeedback(data);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Header / Brand */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-emerald-400 p-[2px] shadow-lg shadow-cyan-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Droplet className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-white">JHPCS</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                Auditoria & Revestimentos Monolíticos
              </span>
            </div>
            <p className="text-xs text-slate-400">JHoston Pools Control System • Garantia & Digital Twin</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard JHostonTec
          </button>

          <button
            onClick={() => setActiveTab('pwa')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'pwa'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            PWA Tratador (Mobile)
          </button>

          <button
            onClick={() => setActiveTab('audit_live')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'audit_live'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Motor Químico & Regras
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        
        {/* TAB 1: DASHBOARD JHOSTONTEC */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ativos Monitorados</p>
                    <h3 className="text-2xl font-bold text-white mt-1">128 Piscinas</h3>
                  </div>
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
                    <Droplet className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
                  <span className="font-semibold">94.2%</span> em conformidade química
                </div>
              </div>

              <div className="bg-slate-900/60 border border-red-900/40 rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br from-red-950/20 to-transparent">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-red-300 uppercase tracking-wider">Red Zones Ativas</p>
                    <h3 className="text-2xl font-bold text-red-400 mt-1">3 Críticas</h3>
                  </div>
                  <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800/50 text-red-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-red-400">
                  <span>Risco iminente de corrosão</span>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-amber-900/40 rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br from-amber-950/20 to-transparent">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Em Período de Cura</p>
                    <h3 className="text-2xl font-bold text-amber-300 mt-1">14 Ativos</h3>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-800/50 text-amber-300">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-300">
                  <span>Cura Seca (7d) & Submersa (28d)</span>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-emerald-900/40 rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br from-emerald-950/20 to-transparent">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">SLA WhatsApp Evolution</p>
                    <h3 className="text-2xl font-bold text-emerald-400 mt-1">&lt; 3.2 seg</h3>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/50 text-emerald-400">
                    <Send className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
                  <span>Disparo de emergência validado</span>
                </div>
              </div>
            </div>

            {/* Fila de Triagem Kanban & Mapa Global */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Kanban de Triagem */}
              <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/90 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    <h2 className="font-bold text-base text-white">Fila de Triagem Técnica (Auditoria JHostonTec)</h2>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Live Updates (Supabase RLS)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Coluna 1: Novo Alerta Crítico */}
                  <div className="bg-slate-950/60 rounded-xl p-3.5 border border-red-950/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                        Alerta Crítico (Red Zone)
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded">1</span>
                    </div>

                    <div className="bg-slate-900/90 border border-red-800/40 rounded-lg p-3 text-xs space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-white">Hotel Fasano - Areia</span>
                        <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded font-mono">pH 6.8</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        Risco iminente de ataque químico ao monólito. Tratador João realizou log há 1h.
                      </p>
                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                        <span className="text-red-400 font-semibold">WhatsApp Notificado</span>
                        <button className="px-2 py-1 rounded bg-red-600/80 text-white font-bold hover:bg-red-500">
                          Assumir Triagem
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Coluna 2: Em Análise */}
                  <div className="bg-slate-950/60 rounded-xl p-3.5 border border-amber-950/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                        Em Análise Técnica
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded">1</span>
                    </div>

                    <div className="bg-slate-900/90 border border-amber-800/30 rounded-lg p-3 text-xs space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-white">Resort Alphaville #4</span>
                        <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded font-mono">Dia 18 / 28</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        Cura Submersa: Verificação de dosagem preventiva de cloreto e ausência de escovação.
                      </p>
                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                        <span className="text-slate-400">Auditor: Carlos O.</span>
                        <button className="px-2 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700">
                          Ver Laudo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Coluna 3: Aguardando Cliente / Resolvido */}
                  <div className="bg-slate-950/60 rounded-xl p-3.5 border border-emerald-950/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                        Conformidade Garantida
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded">24</span>
                    </div>

                    <div className="bg-slate-900/90 border border-emerald-800/20 rounded-lg p-3 text-xs space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-white">Resort Terravista</span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Score 98/100</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        pH 7.4 | Cloro 2.2 ppm | Alcalinidade 100 ppm. Estoque com runway para 14 dias.
                      </p>
                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Garantia 100% Protegida</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa de Saúde Global & Digital Twin da Piscina */}
              <div className="bg-slate-900/40 border border-slate-800/90 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <h2 className="font-bold text-base text-white">Geolocalização & Anti-Fraude</h2>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-4">
                  <div className="relative h-44 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {/* Simulated Map View */}
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
                    
                    {/* Map Pins */}
                    <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30 animate-pulse"></div>
                      <span className="text-[9px] bg-slate-900/90 text-white px-1.5 rounded mt-1 border border-slate-700">Terravista (OK)</span>
                    </div>

                    <div className="absolute top-1/2 right-1/4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-red-500 ring-4 ring-red-500/40 animate-ping"></div>
                      <span className="text-[9px] bg-slate-900/90 text-red-300 px-1.5 rounded mt-1 border border-red-800">Fasano (Red Zone)</span>
                    </div>

                    <div className="absolute bottom-1/4 left-1/2 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-amber-500 ring-4 ring-amber-500/30"></div>
                      <span className="text-[9px] bg-slate-900/90 text-amber-200 px-1.5 rounded mt-1 border border-amber-800">Cura 28d</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-2 text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-400">Raio Máximo Autorizado:</span>
                      <span className="font-semibold text-cyan-400">100 metros</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-400">Captura de Câmera:</span>
                      <span className="font-semibold text-emerald-400">Nativa (Bloqueio de Galeria)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Termo de Responsabilidade:</span>
                      <span className="font-semibold text-emerald-400">Assinatura Eletrônica Obrigatória</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PWA PISCINEIRO (WIZARD OPERACIONAL OFFLINE-FIRST) */}
        {activeTab === 'pwa' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            {/* Header Mobile Frame */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">PWA Operacional do Piscineiro</h3>
                    <p className="text-xs text-slate-400">Operação em Campo • Offline-First com IndexedDB</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-[11px] text-emerald-400 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  Online / GPS OK
                </div>
              </div>

              {/* Offline Banner Simulation */}
              <div className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-between text-xs text-amber-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Modo de Contingência: Armazenamento seguro de até 72h em fila IndexedDB</span>
                </div>
              </div>

              {/* Wizard Form */}
              <div className="mt-6 space-y-6">
                {/* Seleção do Ativo */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    1. Roteiro do Dia (Piscina Designada)
                  </label>
                  <select
                    value={selectedPoolId}
                    onChange={(e) => setSelectedPoolId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                  >
                    {mockPools.map((pool) => (
                      <option key={pool.id} value={pool.id}>
                        [{pool.facility_type}] {pool.name} ({pool.volume_m3} m³)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Evidências Fotográficas In-App */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    2. Evidências Obrigatórias (Câmera Nativa)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border-2 border-dashed border-cyan-800/40 rounded-xl p-4 bg-cyan-950/10 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-cyan-500">
                      <Camera className="w-6 h-6 text-cyan-400" />
                      <span className="text-xs font-bold text-slate-200">Foto 1: Espelho D&apos;água</span>
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Capturada & Georreferenciada
                      </span>
                    </div>

                    <div className="border-2 border-dashed border-cyan-800/40 rounded-xl p-4 bg-cyan-950/10 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-cyan-500">
                      <Camera className="w-6 h-6 text-cyan-400" />
                      <span className="text-xs font-bold text-slate-200">Foto 2: Estojo de Testes</span>
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Amostra + Escala Colorimétrica
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sliders Químicos */}
                <div className="space-y-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      3. Coleta de Parâmetros Químicos
                    </label>
                    <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                      Hard-Rules Ativas
                    </span>
                  </div>

                  {/* pH Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">pH da Água (Ideal: 7.4 - 7.6):</span>
                      <span className={`font-bold font-mono px-2 py-0.5 rounded ${
                        phInput < 7.0 ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-slate-800 text-cyan-400'
                      }`}>
                        {phInput.toFixed(1)} {phInput < 7.0 ? '(RED ZONE!)' : ''}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="6.5"
                      max="8.2"
                      step="0.1"
                      value={phInput}
                      onChange={(e) => setPhInput(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  {/* Cloro Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Cloro Livre (0 a 5 ppm):</span>
                      <span className="font-bold font-mono text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">
                        {chlorineInput.toFixed(1)} ppm
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5.0"
                      step="0.1"
                      value={chlorineInput}
                      onChange={(e) => setChlorineInput(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  {/* Alcalinidade */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Alcalinidade Total (ppm):</span>
                      <span className="font-bold font-mono text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">
                        {alkalinityInput} ppm
                      </span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="180"
                      step="10"
                      value={alkalinityInput}
                      onChange={(e) => setAlkalinityInput(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Check-ins de Ação & Regra Letal de Ácidos */}
                <div className="space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    4. Check-in de Intervenções
                  </label>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={brushedSurface}
                        onChange={(e) => setBrushedSurface(e.target.checked)}
                        className="rounded accent-cyan-400"
                      />
                      <span>Escovação das paredes</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={backwashedFilter}
                        onChange={(e) => setBackwashedFilter(e.target.checked)}
                        className="rounded accent-cyan-400"
                      />
                      <span>Retrolavagem do filtro</span>
                    </label>
                  </div>

                  {/* Alerta Letal: Ácido / Limpa Pedras */}
                  <div className="pt-2">
                    <label className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      acidUsed 
                        ? 'bg-red-950/60 border-red-800 text-red-200' 
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}>
                      <input
                        type="checkbox"
                        checked={acidUsed}
                        onChange={(e) => setAcidUsed(e.target.checked)}
                        className="mt-0.5 rounded accent-red-500"
                      />
                      <div className="space-y-1">
                        <span className="font-bold text-xs flex items-center gap-1.5 text-red-400">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Houve aplicação de Limpa Pedras / Ácido Muriático?
                        </span>
                        <p className="text-[11px] leading-tight opacity-80">
                          AVISO: O uso de compostos ácidos em revestimentos monolíticos destrói a matriz mineral e aciona a SUSPENSÃO IMEDIATA DA GARANTIA.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Termo de Responsabilidade Legal Obrigatório */}
                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded accent-cyan-400"
                    />
                    <span className="text-[11px] leading-relaxed text-slate-300">
                      &quot;Declaro que as informações refletem o estado real da água e estou ciente de que as informações prestadas são de responsabilidade do cliente contratante, impactando na validade da garantia JHoston Pools.&quot;
                    </span>
                  </label>
                </div>

                {/* Botão de Submissão com SLA < 10s */}
                <button
                  onClick={handleSimulateSubmit}
                  disabled={submitting || !termsAccepted}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 hover:opacity-95 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Processando Auditoria em Tempo Real...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Registrar e Auditar Tratamento</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Resultado do Envio e Feedback da API Serverless */}
            {submissionFeedback && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Resposta do Motor Serverless (/api/maintenance/submit)
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">
                    HTTP 200 OK
                  </span>
                </div>

                {submissionFeedback.audit && (
                  <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                    submissionFeedback.audit.isWarrantySuspended
                      ? 'bg-red-950/60 border-red-800 text-red-200'
                      : submissionFeedback.audit.isRedZone
                      ? 'bg-red-950/40 border-red-800/80 text-red-300'
                      : 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
                  }`}>
                    <div className="font-bold flex items-center gap-2 text-sm">
                      <ShieldAlert className="w-4 h-4" />
                      Status Resultante: {submissionFeedback.audit.newStatus}
                    </div>
                    <div>
                      <strong>Ação Recomendada:</strong> {submissionFeedback.audit.recommendedAction}
                    </div>
                    {submissionFeedback.audit.flags.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 pt-1 opacity-90">
                        {submissionFeedback.audit.flags.map((flag: string, idx: number) => (
                          <li key={idx}>{flag}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Disparo WhatsApp Evolution API */}
                {submissionFeedback.evolution_dispatch && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/60 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-emerald-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5" />
                        Disparo Evolution API (WhatsApp)
                      </span>
                      <span>SLA: {submissionFeedback.evolution_dispatch.sla_seconds}s (&lt; 10s cumprido)</span>
                    </div>
                    <p className="text-slate-300 italic font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      {submissionFeedback.evolution_dispatch.message}
                    </p>
                  </div>
                )}

                {/* Memória de Cálculo de Estoque */}
                {submissionFeedback.log?.calculation_memory && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <span className="font-bold text-slate-300">Memória de Cálculo de Dedução de Estoque:</span>
                    <p className="text-cyan-300 font-mono">
                      {submissionFeedback.log.calculation_memory.formula} = {submissionFeedback.log.calculation_memory.totalDebited}g debitados
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MOTOR QUÍMICO & ESPECIFICAÇÃO DE REGRAS */}
        {activeTab === 'audit_live' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-cyan-400" />
                <div>
                  <h2 className="font-bold text-lg text-white">Especificação do Motor Químico JHostonTec</h2>
                  <p className="text-xs text-slate-400">Diretrizes de proteção e garantia para revestimentos monolíticos de alta durabilidade</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <h3 className="font-bold text-cyan-400 text-sm">pH Ideal (7,4 - 7,6)</h3>
                  <p className="text-slate-400">
                    Se o input for <strong>&lt; 7.0</strong>, o sistema aciona <strong>Red Zone imediato</strong> por Risco de Corrosão e dispara webhook WhatsApp para a Diretoria JHostonTec e Gerência em até 10 segundos.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <h3 className="font-bold text-cyan-400 text-sm">Alcalinidade (80 - 120 ppm)</h3>
                  <p className="text-slate-400">
                    Controlada rigorosamente para evitar eflorescência e oscilações bruscas (efeito rebote). Toda correção gera memória de cálculo preditiva transparente.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-red-950/80 space-y-2 text-xs">
                  <h3 className="font-bold text-red-400 text-sm">Proibição de Ácidos (Regra Letal)</h3>
                  <p className="text-slate-400">
                    Se reportado o uso de Limpa Pedras ou ácido muriático, o status muda compulsoriamente para <strong>WARRANTY_SUSPENDED</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Simulação em Tempo Real da Memória de Cálculo */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Exemplo Vivo: Memória de Cálculo de Insumos (Volume: {activePool.volume_m3}m³)
              </h3>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 space-y-2">
                <p>Formula Aplicada: {dosePreview.formula}</p>
                <p>Volume do Tanque: {activePool.volume_m3} m³</p>
                <p>Dedução Projetada no Supabase: {dosePreview.totalDebited} {dosePreview.unit}</p>
                <p className="text-slate-400 text-[11px] pt-2 border-t border-slate-900">
                  Transparência Absoluta: O gerente do hotel/resort tem acesso exato a por que o produto do estoque foi consumido.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-4 text-center text-xs text-slate-500">
        JHoston Pools Control System (JHPCS) &copy; 2026 • Arquitetura Serverless (Vercel + Supabase PostgreSQL + Evolution API)
      </footer>
    </div>
  );
}
