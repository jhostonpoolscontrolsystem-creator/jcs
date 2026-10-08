'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Droplet, 
  ShieldCheck, 
  AlertTriangle, 
  Gauge, 
  Search, 
  Filter, 
  ChevronRight, 
  Layers, 
  Activity, 
  MapPin, 
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Thermometer
} from 'lucide-react';
import { mockPools } from '@/lib/mock-data';
import { Pool } from '@/types/database';
import PoolF1TelemetryCockpit, { F1TelemetryPool } from './PoolF1TelemetryCockpit';

export interface ClientPortfolio {
  id: string;
  name: string;
  segment: 'RESORT' | 'HOTEL' | 'CONDOMINIO' | 'CLUBE' | 'RESIDENCIAL';
  city: string;
  state: string;
  contractStatus: 'ATIVO' | 'IMPLANTACAO' | 'REVISAO';
  pools: Pool[];
}

// Portfólio Estruturado de Clientes JHoston Pools
export const mockClientPortfolios: ClientPortfolio[] = [
  {
    id: 'cli-terravista',
    name: 'Resort Terravista Trancoso',
    segment: 'RESORT',
    city: 'Porto Seguro (Trancoso)',
    state: 'BA',
    contractStatus: 'ATIVO',
    pools: [
      mockPools[0], // Resort Terravista (350m³)
    ]
  },
  {
    id: 'cli-fasano',
    name: 'Hotel Fasano Angra dos Reis',
    segment: 'HOTEL',
    city: 'Angra dos Reis',
    state: 'RJ',
    contractStatus: 'ATIVO',
    pools: [
      mockPools[1], // Fasano (450m³)
    ]
  },
  {
    id: 'cli-alphaville',
    name: 'Condomínio Residencial Alphaville',
    segment: 'CONDOMINIO',
    city: 'Barueri',
    state: 'SP',
    contractStatus: 'IMPLANTACAO',
    pools: [
      mockPools[2], // Alphaville #4 (180m³)
    ]
  },
  {
    id: 'cli-copacabana',
    name: 'Copacabana Palace & Spa',
    segment: 'HOTEL',
    city: 'Rio de Janeiro',
    state: 'RJ',
    contractStatus: 'ATIVO',
    pools: [
      {
        id: 'p-4',
        owner_id: 'c-4',
        name: 'Piscina Semi-Olímpica Copacabana Palace',
        facility_type: 'HOTEL',
        volume_m3: 620,
        pump_flow_m3_h: 80,
        application_date: '2026-02-10',
        gps_lat: -22.967,
        gps_lng: -43.178,
        status: 'NORMAL',
        created_at: '2026-02-10T00:00:00Z',
      }
    ]
  }
];

interface ClientPortfolioViewerProps {
  userRole?: string;
  onOpenMedicalRecord?: (pool: Pool) => void;
}

export default function ClientPortfolioViewer({
  userRole = 'MASTER',
  onOpenMedicalRecord
}: ClientPortfolioViewerProps) {
  const [selectedClientId, setSelectedClientId] = useState<string>('cli-terravista');
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NORMAL' | 'SUBMERGED_CURE' | 'RED_ZONE'>('ALL');
  const [f1TelemetryPool, setF1TelemetryPool] = useState<F1TelemetryPool | null>(null);

  // Cliente Ativo
  const activeClient = mockClientPortfolios.find(c => c.id === selectedClientId) || mockClientPortfolios[0];

  // Helper para converter Pool do DB em F1TelemetryPool
  const mapToF1Pool = (pool: Pool, clientName: string): F1TelemetryPool => {
    // Valores de telemetria simulados/reais de alta precisão
    const isRedZone = pool.status === 'RED_ZONE';
    const isCure = pool.status === 'SUBMERGED_CURE';

    const ph = isRedZone ? 6.8 : isCure ? 7.3 : 7.4;
    const chlorine = isRedZone ? 1.0 : isCure ? 1.8 : 2.2;
    const alk = isRedZone ? 60 : isCure ? 95 : 105;
    const lsi = isRedZone ? -0.48 : isCure ? -0.05 : 0.08;
    const health = isRedZone ? 58 : isCure ? 88 : 98;

    return {
      id: pool.id,
      name: pool.name,
      clientName: clientName,
      volume_m3: pool.volume_m3,
      flow_rate_m3h: pool.pump_flow_m3_h,
      pool_type: pool.facility_type,
      coating_type: (pool as any).coating_type || 'REVESTIMENTO MONOLÍTICO JHOSTON',
      ph: ph,
      chlorine_ppm: chlorine,
      alkalinity_ppm: alk,
      calcium_hardness_ppm: 250,
      temperature_c: 29.5,
      lsi: lsi,
      last_maintenance: 'Hoje às 08:30 (PWA Sincronizado)',
      maintainer_name: 'Carlos Oliveira (Certificado JHoston)',
      status: isRedZone ? 'CRITICAL' : isCure ? 'ATTENTION' : 'OPTIMAL',
      health_score: health,
      cure_days_left: isCure ? 18 : undefined
    };
  };

  const handleOpenF1Cockpit = (pool: Pool) => {
    const f1Pool = mapToF1Pool(pool, activeClient.name);
    setF1TelemetryPool(f1Pool);
  };

  // Filtragem de Piscinas
  const filteredPools = activeClient.pools.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          p.facility_type.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* SELETOR DE CLIENTES & RESORTS (NÍVEL JHOSTON POOLS & MASTER) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-mono font-black tracking-widest uppercase">
                PORTFÓLIO DE CLIENTES & PARCEIROS
              </span>
              <span className="text-xs text-slate-400">
                Acesso Diretoria JHoston & Master
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-cyan-400" />
              Gestão Centralizada de Piscinas
            </h2>
          </div>

          {/* Dropdown de Clientes / Resorts */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">Cliente Selecionado:</span>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="bg-slate-950 text-cyan-300 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl border border-cyan-500/40 focus:outline-none focus:border-cyan-400 shadow-md shadow-cyan-950/50 cursor-pointer"
            >
              {mockClientPortfolios.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} ({client.city}/{client.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resumo Rápido do Cliente Ativo */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Segmento</span>
            <span className="text-sm font-black text-white">{activeClient.segment}</span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Localização</span>
            <span className="text-sm font-bold text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {activeClient.city} - {activeClient.state}
            </span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Piscinas no Contrato</span>
            <span className="text-sm font-black text-cyan-400">{activeClient.pools.length} Ativo(s)</span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Volume Total Monitorado</span>
            <span className="text-sm font-black text-emerald-400">
              {activeClient.pools.reduce((acc, p) => acc + p.volume_m3, 0)} m³
            </span>
          </div>
        </div>
      </div>

      {/* CABEÇALHO DO GRID COM FILTRO & BOTÃO DE TELEMETRIA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            Piscinas de {activeClient.name}
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
              {filteredPools.length} piscina(s)
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Clique no card para abrir o <strong className="text-cyan-400">Cockpit de Telemetria F1</strong> com tacômetros ao vivo e séries históricas.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar piscina..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">Todos os Status</option>
            <option value="OPTIMAL">100% Protegida</option>
            <option value="ATTENTION">Em Atenção</option>
            <option value="RED_ZONE">Red Zone (Crítica)</option>
          </select>
        </div>
      </div>

      {/* GRID DE PISCINAS DO CLIENTE SELECIONADO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPools.map((pool) => {
          const isRedZone = pool.status === 'RED_ZONE';
          const isCure = pool.status === 'SUBMERGED_CURE';
          const healthScore = isRedZone ? 58 : isCure ? 88 : 98;

          return (
            <div
              key={pool.id}
              onClick={() => handleOpenF1Cockpit(pool)}
              className={`glass-panel shimmer-border rounded-3xl p-6 relative overflow-hidden transition-all duration-300 cursor-pointer group hover:scale-[1.02] ${
                isRedZone 
                  ? 'border-rose-500/50 hover:border-rose-500 hover:shadow-xl hover:shadow-rose-950/60 bg-gradient-to-b from-rose-950/20 to-slate-950' 
                  : isCure
                  ? 'border-amber-500/40 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-950/60 bg-gradient-to-b from-amber-950/20 to-slate-950'
                  : 'border-cyan-500/30 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-950/60 bg-gradient-to-b from-slate-900/60 to-slate-950'
              }`}
            >
              {/* Badge de Status Superior */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-black border flex items-center gap-1.5 ${
                  isRedZone
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : isCure
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}>
                  <Activity className="w-3 h-3" />
                  HEALTH SCORE: {healthScore}%
                </span>

                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                  <Gauge className="w-4 h-4" />
                </div>
              </div>

              {/* Informações da Piscina */}
              <div className="space-y-1 mb-5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  {(pool as any).coating_type || 'REVESTIMENTO MONOLÍTICO'} • {pool.facility_type}
                </span>
                <h4 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                  {pool.name}
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Volume: <strong className="text-cyan-400">{pool.volume_m3} m³</strong> • Vazão: <strong className="text-slate-300">{pool.pump_flow_m3_h} m³/h</strong>
                </p>
              </div>

              {/* Mini Tacômetros de Prévia */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/80 rounded-2xl border border-slate-800/80 font-mono text-center mb-5">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">pH</span>
                  <span className={`text-sm font-black ${isRedZone ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {isRedZone ? '6.8' : isCure ? '7.3' : '7.4'}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Cloro</span>
                  <span className="text-sm font-black text-cyan-400">
                    {isRedZone ? '1.0' : isCure ? '1.8' : '2.2'} ppm
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">LSI</span>
                  <span className={`text-sm font-black ${isRedZone ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {isRedZone ? '-0.48' : isCure ? '-0.05' : '+0.08'}
                  </span>
                </div>
              </div>

              {/* Barra de Ação F1 */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-medium group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Abrir Telemetria F1 <ArrowUpRight className="w-3.5 h-3.5" />
                </span>

                {onOpenMedicalRecord && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenMedicalRecord(pool);
                    }}
                    className="text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition"
                  >
                    Prontuário Completo
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL COCKPIT TELEMETRIA FÓRMULA 1 */}
      {f1TelemetryPool && (
        <PoolF1TelemetryCockpit
          pool={f1TelemetryPool}
          isOpen={!!f1TelemetryPool}
          onClose={() => setF1TelemetryPool(null)}
          availablePools={activeClient.pools.map(p => mapToF1Pool(p, activeClient.name))}
          onSelectAnotherPool={(poolId) => {
            const nextPool = activeClient.pools.find(p => p.id === poolId);
            if (nextPool) setF1TelemetryPool(mapToF1Pool(nextPool, activeClient.name));
          }}
        />
      )}
    </div>
  );
}
