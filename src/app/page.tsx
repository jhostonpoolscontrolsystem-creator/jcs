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
import { MaintainerPwaWizard } from '@/components/MaintainerPwaWizard';
import { ClientManagerDashboard } from '@/components/ClientManagerDashboard';
import { EvolutionWhatsAppTester } from '@/components/EvolutionWhatsAppTester';
import { GlobalHealthMap } from '@/components/GlobalHealthMap';
import { PoolRegistrationModal } from '@/components/PoolRegistrationModal';
import { UserRoleHierarchyViewer } from '@/components/UserRoleHierarchyViewer';
import { AuthModal } from '@/components/AuthModal';
import { UserManagementPanel } from '@/components/UserManagementPanel';
import { ExecutiveReportsWhatsAppPanel } from '@/components/ExecutiveReportsWhatsAppPanel';
import { UserRole } from '@/types/database';
import { LogIn, LogOut, Users, UserCheck } from 'lucide-react';

export default function JHPCSApp() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'client_portal' | 'pwa' | 'whatsapp' | 'rbac' | 'audit_live' | 'users' | 'executive_reports'>('dashboard');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Usuário Autenticado (Inicia como Master Daniel Lopes por conveniência)
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: UserRole;
  } | null>({
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Daniel Lopes (Master)',
    email: 'danielsmlopes@hotmail.com',
    role: 'MASTER',
  });

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

        {/* User Profile / Auth Button */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-800 py-1.5 px-3 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-sky-400 flex items-center justify-center text-slate-950 font-black text-xs">
                {currentUser.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-white leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">{currentUser.role}</div>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setActiveTab('pwa');
                }}
                className="ml-2 p-1 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                title="Sair / Desconectar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 hover:opacity-95 transition cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar / Cadastrar</span>
            </button>
          )}
        </div>

        {/* Navigation Tabs (Filtrados Estritamente por RBAC) */}
        <div className="w-full flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
          {/* MASTER ou DIRETORIA_JH ou TECNICO_JH */}
          {(!currentUser || currentUser.role === 'MASTER' || currentUser.role === 'DIRETORIA_JH' || currentUser.role === 'TECNICO_JH') && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard JHostonTec
            </button>
          )}

          {/* MASTER ou GERENCIA_CLI ou TECNICO_CLI */}
          {(!currentUser || currentUser.role === 'MASTER' || currentUser.role === 'GERENCIA_CLI' || currentUser.role === 'TECNICO_CLI') && (
            <button
              onClick={() => setActiveTab('client_portal')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'client_portal'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              Portal Gerência / Cliente
            </button>
          )}

          {/* PWA Tratador (Todos podem testar, mas é a ÚNICA tela do Piscineiro) */}
          <button
            onClick={() => setActiveTab('pwa')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'pwa'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            PWA Tratador (Mobile)
          </button>

          {/* MASTER ou DIRETORIA_JH: Gestão de Usuários */}
          {(!currentUser || currentUser.role === 'MASTER' || currentUser.role === 'DIRETORIA_JH') && (
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'users'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              Gestão de Usuários
            </button>
          )}

          {/* MASTER ou DIRETORIA_JH: Relatórios Executivos & Agenda WhatsApp */}
          {(!currentUser || currentUser.role === 'MASTER' || currentUser.role === 'DIRETORIA_JH') && (
            <button
              onClick={() => setActiveTab('executive_reports')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'executive_reports'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'text-emerald-400 hover:text-emerald-200 hover:bg-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              Relatórios Diretoria (WhatsApp)
            </button>
          )}

          {/* MASTER ou DIRETORIA_JH: WhatsApp Evolution */}
          {(!currentUser || currentUser.role === 'MASTER' || currentUser.role === 'DIRETORIA_JH') && (
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'whatsapp'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Send className="w-4 h-4" />
              WhatsApp Evolution
            </button>
          )}

          {/* MASTER ou DIRETORIA_JH: Hierarquia RBAC */}
          {(!currentUser || currentUser.role === 'MASTER' || currentUser.role === 'DIRETORIA_JH') && (
            <button
              onClick={() => setActiveTab('rbac')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'rbac'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Hierarquia (RBAC)
            </button>
          )}

          {/* MASTER ou TECNICO_JH: Motor Químico */}
          {(!currentUser || currentUser.role === 'MASTER' || currentUser.role === 'TECNICO_JH') && (
            <button
              onClick={() => setActiveTab('audit_live')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'audit_live'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Motor Químico & Regras
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        
        {/* TAB 1: DASHBOARD JHOSTONTEC */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Metric Cards & Botão Cadastrar Ativo */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-white">Centro de Comando & Auditoria</h2>
                <p className="text-xs text-slate-400">Monitoramento Contínuo e Gestão da Garantia de Revestimentos</p>
              </div>

              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all cursor-pointer"
              >
                <span>+ Cadastrar Nova Piscina</span>
              </button>
            </div>

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

              {/* Mapa Interativo de Saúde Global com Pins Georreferenciados (Leaflet) */}
              <div className="lg:col-span-3">
                <GlobalHealthMap />
              </div>
            </div>
          </div>
        )}

        {/* TAB: PORTAL DA GERÊNCIA / CLIENTE (DIGITAL TWIN & METEOROLOGIA) */}
        {activeTab === 'client_portal' && (
          <div className="animate-fadeIn">
            <ClientManagerDashboard />
          </div>
        )}

        {/* TAB 2: PWA PISCINEIRO (WIZARD OPERACIONAL OFFLINE-FIRST) */}
        {activeTab === 'pwa' && (
          <div className="animate-fadeIn">
            <MaintainerPwaWizard />
          </div>
        )}

        {/* TAB: WHATSAPP EVOLUTION API */}
        {activeTab === 'whatsapp' && (
          <div className="animate-fadeIn">
            <EvolutionWhatsAppTester />
          </div>
        )}

        {/* TAB: HIERARQUIA & PERFIS (RBAC) */}
        {activeTab === 'rbac' && (
          <div className="animate-fadeIn">
            <UserRoleHierarchyViewer
              currentRole={currentUser?.role || 'MASTER'}
              onRoleChange={(role) => {
                if (currentUser) {
                  setCurrentUser({ ...currentUser, role });
                }
              }}
            />
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

        {/* TAB: GESTÃO DE USUÁRIOS (MASTER E DIRETORIA) */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-fadeIn">
            <UserManagementPanel 
              currentUser={currentUser}
              onOpenRegisterModal={() => setIsAuthModalOpen(true)} 
            />
          </div>
        )}

        {/* TAB: RELATÓRIOS EXECUTIVOS & WHATSAPP (MASTER E DIRETORIA) */}
        {activeTab === 'executive_reports' && (
          <div className="space-y-6 animate-fadeIn">
            <ExecutiveReportsWhatsAppPanel />
          </div>
        )}
      </main>

      {/* Modal Unificado de Login e Cadastro de Usuários */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          // Redirecionamento inteligente baseado no perfil (RBAC)
          if (user.role === 'PISCINEIRO') {
            setActiveTab('pwa');
          } else if (user.role === 'GERENCIA_CLI' || user.role === 'TECNICO_CLI') {
            setActiveTab('client_portal');
          } else {
            setActiveTab('dashboard');
          }
        }}
      />

      {/* Modal de Cadastro de Novas Piscinas */}
      <PoolRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onPoolCreated={(newPool) => {
          alert(`Digital Twin criado com sucesso para: ${newPool.name}!`);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-4 text-center text-xs text-slate-500">
        JHoston Pools Control System (JHPCS) &copy; 2026 • Arquitetura Serverless (Vercel + Supabase PostgreSQL + Evolution API)
      </footer>
    </div>
  );
}
