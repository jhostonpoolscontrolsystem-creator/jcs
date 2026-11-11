'use client';

import React, { useState, useEffect } from 'react';
import {
  CloudLightning,
  SunMedium,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface WeatherAlert {
  id: string;
  pool_id: string;
  tenant_id: string;
  alert_type: 'ACID_RAIN_BUFFER' | 'ALGAE_BLOOM_PREVENTION' | 'CURING_PROTECTION';
  severity: 'MODERATE' | 'HIGH' | 'CRITICAL';
  title: string;
  preventive_dosage_instruction: string;
  valid_until: string;
  acknowledged_at?: string | null;
  pool?: {
    name: string;
    volume_m3: number;
    substrate_type?: string;
  };
}

interface PredictiveWeatherRadarProps {
  tenantId?: string;
  poolId?: string;
  onAlertAcknowledged?: (alertId: string) => void;
}

export function PredictiveWeatherRadar({
  tenantId = 'demo-fleet',
  poolId,
  onAlertAcknowledged,
}: PredictiveWeatherRadarProps) {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [acknowledgedIds, setAcknowledgedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadAlerts() {
      try {
        setLoading(true);
        const url = poolId
          ? `/api/v1/pwa/weather-alerts?poolId=${poolId}&tenantId=${tenantId}`
          : `/api/v1/pwa/weather-alerts?tenantId=${tenantId}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success && data.alerts) {
          setAlerts(data.alerts);
        }
      } catch (err) {
        console.warn('Erro ao carregar radar preditivo:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAlerts();
  }, [tenantId, poolId]);

  const handleAcknowledge = (id: string) => {
    setAcknowledgedIds((prev) => new Set([...prev, id]));
    if (onAlertAcknowledged) onAlertAcknowledged(id);
  };

  const activeAlerts = alerts.filter((a) => !acknowledgedIds.has(a.id));

  if (loading || activeAlerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Radar Climático & Químico Preditivo 48h (Spatial Grid IoT)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {activeAlerts.length} alerta(s) de ação preventiva
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeAlerts.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          const isRain = alert.alert_type === 'ACID_RAIN_BUFFER';

          return (
            <div
              key={alert.id}
              className={`rounded-2xl border p-4 transition-all relative overflow-hidden ${
                isCritical
                  ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                  : isRain
                  ? 'bg-cyan-950/20 border-cyan-500/40 text-cyan-200'
                  : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isCritical
                      ? 'bg-rose-500/20 text-rose-400'
                      : isRain
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {isCritical ? (
                    <ShieldAlert className="w-5 h-5" />
                  ) : isRain ? (
                    <CloudLightning className="w-5 h-5" />
                  ) : (
                    <SunMedium className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {alert.severity} • {alert.pool?.name || 'Piscina'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Válido por 48h
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white mt-1.5 truncate">
                    {alert.title}
                  </h4>

                  <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-3">
                    {alert.preventive_dosage_instruction}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-cyan-400" />
                      Dosagem calculada para {alert.pool?.volume_m3 || 45}m³
                    </span>

                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Marcar Aplicada</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

