'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ShieldAlert, Droplets, MapPin, Eye, CheckCircle2, Clock } from 'lucide-react';
import { Pool } from '@/types/database';
import { mockPools } from '@/lib/mock-data';

// Import dinâmico do Leaflet para compatibilidade com SSR (Next.js)
const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((m) => m.Popup),
  { ssr: false }
);

export function GlobalHealthMap() {
  const [pools, setPools] = useState<Pool[]>(mockPools);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [customIcons, setCustomIcons] = useState<any>(null);

  useEffect(() => {
    // Carrega o CSS do Leaflet e define ícones SVG coloridos
    import('leaflet').then((L) => {
      const createColoredIcon = (colorHex: string, pulse: boolean = false) => {
        return L.divIcon({
          className: 'custom-leaflet-marker',
          html: `
            <div style="
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 32px;
              height: 32px;
            ">
              ${pulse ? `
                <span style="
                  position: absolute;
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  background-color: ${colorHex};
                  opacity: 0.4;
                  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                "></span>
              ` : ''}
              <span style="
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background-color: ${colorHex};
                border: 3px solid #0f172a;
                box-shadow: 0 4px 10px rgba(0,0,0,0.5);
              "></span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });
      };

      setCustomIcons({
        NORMAL: createColoredIcon('#10b981', false),       // Verde
        SUBMERGED_CURE: createColoredIcon('#f59e0b', false), // Amarelo
        DRY_CURE: createColoredIcon('#f59e0b', false),       // Amarelo
        RED_ZONE: createColoredIcon('#ef4444', true),        // Vermelho Pulsante
        WARRANTY_SUSPENDED: createColoredIcon('#991b1b', true),
      });

      setLeafletLoaded(true);
    });
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Mapa Global de Saúde dos Revestimentos</h3>
            <p className="text-xs text-slate-400">Georreferenciamento em Tempo Real dos Ativos Homologados</p>
          </div>
        </div>

        {/* Legenda dos Pins */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            Conforme (Garantia Ativa)
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
            Em Cura (7d / 28d)
          </span>
          <span className="flex items-center gap-1.5 text-red-400">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
            Red Zone (Risco Corrosão)
          </span>
        </div>
      </div>

      {/* Container do Mapa Leaflet */}
      <div className="relative h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
        {leafletLoaded && customIcons ? (
          <MapContainer
            center={[-16.435, -39.065]}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pools.map((pool) => {
              const icon = customIcons[pool.status] || customIcons.NORMAL;
              return (
                <Marker
                  key={pool.id}
                  position={[pool.gps_lat, pool.gps_lng]}
                  icon={icon}
                  eventHandlers={{
                    click: () => setSelectedPool(pool),
                  }}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="p-1 space-y-1 text-slate-900 text-xs font-sans">
                      <p className="font-bold text-sm text-slate-950">{pool.name}</p>
                      <p className="text-[11px] text-slate-600">
                        {pool.facility_type} • {pool.volume_m3} m³
                      </p>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        pool.status === 'RED_ZONE'
                          ? 'bg-red-100 text-red-700'
                          : pool.status === 'NORMAL'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        Status: {pool.status}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">
            Carregando coordenadas e mapa de satélite...
          </div>
        )}

        {/* Modal de Detalhes Rápidos quando um Pin é clicado */}
        {selectedPool && (
          <div className="absolute top-4 right-4 z-[1000] w-80 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3 animate-fadeIn">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                  Prontuário Rápido
                </span>
                <h4 className="font-bold text-sm text-white">{selectedPool.name}</h4>
              </div>
              <button
                onClick={() => setSelectedPool(null)}
                className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Volume do Monólito:</span>
                <span className="font-bold text-white">{selectedPool.volume_m3} m³</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Vazão da Bomba:</span>
                <span className="font-bold text-white">{selectedPool.pump_flow_m3_h} m³/h</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Status Operacional:</span>
                <span className={`font-bold ${
                  selectedPool.status === 'RED_ZONE' ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {selectedPool.status}
                </span>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => alert(`Abrindo prontuário histórico completo de ${selectedPool.name}`)}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-cyan-600/20"
              >
                <Eye className="w-3.5 h-3.5" />
                Ver Prontuário Completo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
