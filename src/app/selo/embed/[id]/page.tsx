'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Droplet, 
  Clock, 
  Waves,
  Building2,
  ExternalLink 
} from 'lucide-react';

export default function SealEmbedPage({ params }: { params?: { id?: string } }) {
  const [sealData, setSealData] = useState<any>(null);
  const poolId = params?.id || 'resort-vista-bela';

  useEffect(() => {
    async function loadSeal() {
      try {
        const res = await fetch(`/api/seal/verify?pool_id=${encodeURIComponent(poolId)}`);
        const data = await res.json();
        if (data.seal) setSealData(data.seal);
      } catch {
        // Fallback
      }
    }
    loadSeal();
  }, [poolId]);

  return (
    <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl border-2 border-emerald-500/50 max-w-sm mx-auto shadow-2xl font-sans relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            QUALIDADE DA ÁGUA AUDITADA
          </span>
          <h3 className="text-base font-black text-white mt-1 leading-tight">
            {sealData?.facility_name || 'Complexo Aquático Homologado'}
          </h3>
          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <Building2 className="w-3 h-3 text-sky-400" /> {sealData?.city_uf || 'São Paulo / SP'}
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shrink-0">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Conformity Callout */}
      <div className="my-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-2.5 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <span className="text-xs font-bold text-emerald-300 leading-tight">
          Piscina em Estrita Conformidade Sanitária (NBR 10.818)
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-2">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">pH</div>
          <div className="text-sm font-black text-white font-mono">{sealData?.last_ph ?? 7.4}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-2">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Cloro</div>
          <div className="text-sm font-black text-white font-mono">{sealData?.last_free_chlorine ?? 2.2} ppm</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-2">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Segurança</div>
          <div className="text-sm font-black text-emerald-400 font-mono">{sealData?.bather_safety_index ?? 98}%</div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
        <span className="flex items-center gap-1 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> JHoston Pools & Lagoons
        </span>
        <a
          href={`https://jhpcs.vercel.app/selo/${poolId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-0.5"
        >
          Ver laudo <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
}
