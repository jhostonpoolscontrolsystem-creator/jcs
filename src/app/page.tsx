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
import { SystemTrainingAcademy } from '@/components/SystemTrainingAcademy';
import { SystemHelpCenter } from '@/components/SystemHelpCenter';
import { PoolMedicalRecordModal } from '@/components/PoolMedicalRecordModal';
import { MasterGovernanceHub } from '@/components/MasterGovernanceHub';
import { MetricDrilldownModal, MetricDrilldownType } from '@/components/MetricDrilldownModal';
import { DocumentDownloadCenter } from '@/components/DocumentDownloadCenter';
import { ChemicalSuppliesStore } from '@/components/ChemicalSuppliesStore';
import ClientPortfolioViewer from '@/components/ClientPortfolioViewer';
import ExecutiveWelcomeKitModal, { WelcomeKitAudience } from '@/components/ExecutiveWelcomeKitModal';
import { UserRole, Pool } from '@/types/database';
import { LogIn, LogOut, Users, UserCheck, GraduationCap, HelpCircle, Crown, Download, ShoppingBag, Building2 } from 'lucide-react';

export default function JHPCSApp() {
  const [activeTab, setActiveTab] = useState<'master' | 'dashboard' | 'clients' | 'client_portal' | 'pwa' | 'whatsapp' | 'rbac' | 'audit_live' | 'users' | 'executive_reports' | 'training' | 'help' | 'downloads' | 'store'>('master');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWelcomeKitOpen, setIsWelcomeKitOpen] = useState(false);
  const [welcomeKitAudience, setWelcomeKitAudience] = useState<WelcomeKitAudience>('DIRETORIA_JHOSTON');
  const [inspectingPool, setInspectingPool] = useState<Pool | null>(null);
  const [activeDrilldown, setActiveDrilldown] = useState<MetricDrilldownType>(null);

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
        <div className="flex items-center gap-3.5">
          <div className="relative group cursor-pointer">
            <div className="h-12 w-12 rounded-2xl bg-slate-900/90 border border-cyan-500/40 p-1 flex items-center justify-center shadow-lg shadow-cyan-950/60 overflow-hidden group-hover:border-cyan-400 group-hover:shadow-cyan-500/20 transition-all">
              <img 
                src="/logo.png" 
                alt="JHPCS Logo" 
                className="h-full w-full object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" 
              />
            </div>
            {/* Efeito de halo neon dinâmico */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 -z-10" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-wider text-white bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                JHPCS
              </span>
              <span className="text-[10px] uppercase font-mono font-black tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-sm">
                AUDITORIA & REVESTIMENTOS MONOLÍTICOS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              JHoston Pools Control System • Garantia Decenal & Digital Twin F1
            </p>
          </div>
        </div>

        {/* User Profile / Auth Button */}
        <div className="flex items-center gap-3">
          {/* BOTÃO EXCLUSIVO DE BOAS-VINDAS: MASTER ou DIRETORIA_JH */}
          {(currentUser?.role === 'MASTER' || currentUser?.role === 'DIRETORIA_JH') && (
            <button
              onClick={() => {
                setWelcomeKitAudience(currentUser?.role === 'MASTER' ? 'DIRETORIA_JHOSTON' : 'CLIENTE_FINAL');
                setIsWelcomeKitOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-105 transition cursor-pointer"
              title="Disparador de Boas-Vindas & Revista Digital (WhatsApp)"
            >
              <Crown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kit Boas-Vindas (Revista VIP)</span>
              <span className="sm:hidden">Kit VIP</span>
            </button>
          )}

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

        {/* Navigation Tabs (Filtrados Estritamente por RBAC para cada perfil) */}
        <div className="w-full flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
          {/* EXCLUSIVO MASTER: Centro de Comando e Governança */}
          {currentUser?.role === 'MASTER' && (
            <button
              onClick={() => setActiveTab('master')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition-all ${
                activeTab === 'master'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-amber-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Crown className="w-4 h-4" />
              Painel MASTER
            </button>
          )}

          {/* MASTER ou DIRETORIA_JH ou TECNICO_JH: Centro Operacional */}
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

          {/* MASTER, DIRETORIA_JH, TECNICO_JH ou GERENCIA_CLI: Visão de Clientes & Telemetria F1 */}
          {(!currentUser || currentUser.role === 'MASTER' || currentUser.role === 'DIRETORIA_JH' || currentUser.role === 'TECNICO_JH' || currentUser.role === 'GERENCIA_CLI') && (
            <button
              onClick={() => setActiveTab('clients')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'clients'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Clientes & Telemetria F1
            </button>
          )}

          {/* MASTER, GERENCIA_CLI ou TECNICO_CLI: Portal do Cliente */}
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
              Portal do Cliente (Digital Twin)
            </button>
          )}

          {/* MASTER ou PISCINEIRO (Piscineiro enxerga apenas este app) */}
          {(!currentUser || currentUser.role === 'MASTER' || currentUser.role === 'PISCINEIRO') && (
            <button
              onClick={() => setActiveTab('pwa')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'pwa'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              App do Tratador (PWA)
            </button>
          )}

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

          {/* MASTER ou DIRETORIA_JH: Relatórios Executivos & WhatsApp */}
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

          {/* LOJA DE INSUMOS B2B (FASE 4): Master, Diretoria JH e Clientes */}
          {(!currentUser || currentUser.role === 'MASTER' || currentUser.role === 'DIRETORIA_JH' || currentUser.role === 'GERENCIA_CLI' || currentUser.role === 'TECNICO_CLI') && (
            <button
              onClick={() => setActiveTab('store')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'store'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'text-emerald-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Loja de Insumos B2B
            </button>
          )}

          {/* CENTRAL DE DOWNLOADS (RBAC): Universal */}
          <button
            onClick={() => setActiveTab('downloads')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'downloads'
                ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-md shadow-sky-500/30'
                : 'text-sky-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Download className="w-4 h-4" />
            Central de Downloads
          </button>

          {/* ACADEMIA & CURSO DO SISTEMA: Universal */}
          <button
            onClick={() => setActiveTab('training')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'training'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md shadow-purple-500/30'
                : 'text-purple-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Academia & Treinamento
          </button>

          {/* CENTRAL DE AJUDA & FAQ: Universal */}
          <button
            onClick={() => setActiveTab('help')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'help'
                ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-cyan-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Central de Ajuda & FAQ
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        
        {/* TAB 0: EXCLUSIVO MASTER (Centro de Comando & Governança Soberana) */}
        {activeTab === 'master' && (
          <MasterGovernanceHub
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenUserManagement={() => setActiveTab('users')}
            onOpenRegisterPool={() => setIsRegisterModalOpen(true)}
          />
        )}

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

            {/* Top Metric Cards Grid (4 Cards com Drilldown) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* CARD 1: ATIVOS MONITORADOS */}
              <div 
                onClick={() => setActiveDrilldown('TOTAL_POOLS')}
                className="glass-panel shimmer-border rounded-2xl p-5 relative overflow-hidden transition-all hover:border-cyan-500/80 hover:shadow-xl hover:shadow-cyan-950/40 cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-cyan-400 transition">Ativos Monitorados</p>
                    <h3 className="text-2xl font-black text-white mt-1">128 Piscinas</h3>
                  </div>
                  <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 shadow-md shadow-cyan-950/40 group-hover:scale-110 transition">
                    <Droplet className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold">94.2%</span> em conformidade
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold group-hover:underline">Ver Detalhes →</span>
                </div>
              </div>

              {/* CARD 2: RED ZONES ATIVAS */}
              <div 
                onClick={() => setActiveDrilldown('RED_ZONES')}
                className="glass-panel shimmer-border rounded-2xl p-5 relative overflow-hidden transition-all hover:border-rose-500/80 hover:shadow-xl hover:shadow-rose-950/50 bg-gradient-to-br from-rose-950/30 to-transparent cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11px] font-bold text-rose-300 uppercase tracking-wider group-hover:text-rose-400 transition">Red Zones Ativas</p>
                    <h3 className="text-2xl font-black text-rose-400 mt-1">3 Críticas</h3>
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-400 shadow-md shadow-rose-950/40 animate-pulse group-hover:scale-110 transition">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-rose-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Risco de corrosão</span>
                  </div>
                  <span className="text-[10px] text-rose-400 font-bold group-hover:underline">Auditar Agora →</span>
                </div>
              </div>

              {/* CARD 3: EM PERÍODO DE CURA */}
              <div 
                onClick={() => setActiveDrilldown('CURE_POOLS')}
                className="glass-panel shimmer-border rounded-2xl p-5 relative overflow-hidden transition-all hover:border-amber-500/80 hover:shadow-xl hover:shadow-amber-950/50 bg-gradient-to-br from-amber-950/30 to-transparent cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider group-hover:text-amber-400 transition">Em Período de Cura</p>
                    <h3 className="text-2xl font-black text-amber-300 mt-1">14 Ativos</h3>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-800/60 text-amber-300 shadow-md shadow-amber-950/40 group-hover:scale-110 transition">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <div className="text-amber-300 font-medium text-[11px]">
                    <span>Cura Seca (7d) & Submersa (28d)</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold group-hover:underline">Ver Lista →</span>
                </div>
              </div>

              {/* CARD 4: SLA WHATSAPP EVOLUTION */}
              <div 
                onClick={() => setActiveDrilldown('WHATSAPP_SLA')}
                className="glass-panel shimmer-border rounded-2xl p-5 relative overflow-hidden transition-all hover:border-emerald-500/80 hover:shadow-xl hover:shadow-emerald-950/50 bg-gradient-to-br from-emerald-950/30 to-transparent cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider group-hover:text-emerald-400 transition">SLA WhatsApp Evolution</p>
                    <h3 className="text-2xl font-black text-emerald-400 mt-1">&lt; 3.2 seg</h3>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 shadow-md shadow-emerald-950/40 group-hover:scale-110 transition">
                    <Send className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <div className="text-emerald-400 font-medium text-[11px]">
                    <span>Instância ecostone ativa</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold group-hover:underline">Ver Status →</span>
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
                        <button 
                          onClick={() => setInspectingPool(mockPools.find(p => p.status === 'RED_ZONE') || mockPools[1])}
                          className="px-2 py-1 rounded bg-red-600/80 text-white font-bold hover:bg-red-500 transition cursor-pointer"
                        >
                          Ver Prontuário
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
                        <button 
                          onClick={() => setInspectingPool(mockPools.find(p => p.status === 'SUBMERGED_CURE') || mockPools[2])}
                          className="px-2 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 transition cursor-pointer"
                        >
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
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Garantia 100% Protegida</span>
                        </div>
                        <button
                          onClick={() => setInspectingPool(mockPools[0])}
                          className="px-2 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 transition cursor-pointer"
                        >
                          Prontuário
                        </button>
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

        {/* TAB: VISÃO DO CLIENTE & COCKPIT TELEMETRIA F1 */}
        {activeTab === 'clients' && (
          <div className="animate-fadeIn">
            <ClientPortfolioViewer 
              userRole={currentUser?.role}
              onOpenMedicalRecord={(pool) => setInspectingPool(pool)}
            />
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
          <div className="space-y-4 animate-fadeIn">
            {/* Banner de Acesso Direto Isolado para Celular */}
            <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-800/60 flex items-center justify-between gap-4 shadow-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">PWA 100% Isolado & Independente</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Para o tratador instalar direto no celular sem menus do sistema: envie o link direto <strong className="text-cyan-400 font-mono">/pwa</strong>
                </p>
              </div>
              <a
                href="/pwa"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-black rounded-xl text-xs hover:opacity-95 transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap cursor-pointer"
              >
                Abrir App Isolado ↗
              </a>
            </div>

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

        {/* TAB: ACADEMIA & CURSO DO SISTEMA */}
        {activeTab === 'training' && (
          <div className="space-y-6 animate-fadeIn">
            <SystemTrainingAcademy onSelectTab={(tab) => setActiveTab(tab)} />
          </div>
        )}

        {/* TAB: CENTRAL DE DOWNLOADS (RBAC) */}
        {activeTab === 'downloads' && (
          <div className="space-y-6 animate-fadeIn">
            <DocumentDownloadCenter currentUserRole={currentUser?.role || 'MASTER'} />
          </div>
        )}

        {/* TAB: LOJA DE INSUMOS B2B (FASE 4) */}
        {activeTab === 'store' && (
          <div className="space-y-6 animate-fadeIn">
            <ChemicalSuppliesStore currentUserRole={currentUser?.role || 'MASTER'} />
          </div>
        )}

        {/* TAB: CENTRAL DE AJUDA & FAQ */}
        {activeTab === 'help' && (
          <div className="space-y-6 animate-fadeIn">
            <SystemHelpCenter onNavigateTab={(tab) => setActiveTab(tab)} />
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

      {/* Modal de Prontuário Completo de Piscina */}
      <PoolMedicalRecordModal
        pool={inspectingPool}
        isOpen={!!inspectingPool}
        onClose={() => setInspectingPool(null)}
        currentUserRole={currentUser?.role}
      />

      {/* Modal de Resumo & Drilldown dos 4 Cards de Métricas */}
      <MetricDrilldownModal
        type={activeDrilldown}
        isOpen={!!activeDrilldown}
        onClose={() => setActiveDrilldown(null)}
        onSelectPoolToInspect={(pool) => setInspectingPool(pool)}
        onNavigateToWhatsAppReports={() => setActiveTab('executive_reports')}
      />

      {/* Modal do Disparador Executivo de Boas-Vindas & Revista Digital */}
      <ExecutiveWelcomeKitModal
        isOpen={isWelcomeKitOpen}
        onClose={() => setIsWelcomeKitOpen(false)}
        currentUserRole={currentUser?.role}
        defaultAudience={welcomeKitAudience}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-4 text-center text-xs text-slate-500">
        JHoston Pools Control System (JHPCS) &copy; 2026 • Arquitetura Serverless (Vercel + Supabase PostgreSQL + Evolution API)
      </footer>
    </div>
  );
}
