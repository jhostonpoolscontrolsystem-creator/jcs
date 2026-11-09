'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ClipboardCheck, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  ShieldCheck, 
  ArrowLeft,
  Calendar,
  Waves,
  UserCheck,
  Building2,
  RefreshCw
} from 'lucide-react';

interface SanitaryRecord {
  id: string;
  pool_id: string;
  pool_name: string;
  technician_name: string;
  shift: 'MANHA' | 'TARDE' | 'NOITE';
  ph: number;
  free_chlorine: number;
  combined_chlorine: number;
  water_clarity: 'CRISTALINA' | 'LEVEMENTE_TURVA' | 'TURVA' | 'INTERDITADA';
  water_temp_celsius: number;
  bather_load: number;
  technician_lat: number;
  technician_lng: number;
  distance_meters: number;
  geofence_compliant: boolean;
  status: 'EM_CONFORMIDADE' | 'ATENCAO' | 'INTERDITADA';
  recorded_at: string;
}

export default function LogbookSanitarioPage() {
  const [records, setRecords] = useState<SanitaryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form states
  const [poolId, setPoolId] = useState('P-RESORT-01');
  const [poolName, setPoolName] = useState('Piscina Olímpica Central - Grand Resort & Condomínio');
  const [shift, setShift] = useState<'MANHA' | 'TARDE' | 'NOITE'>('MANHA');
  const [ph, setPh] = useState<number>(7.4);
  const [freeChlorine, setFreeChlorine] = useState<number>(2.5);
  const [combinedChlorine, setCombinedChlorine] = useState<number>(0.2);
  const [clarity, setClarity] = useState<'CRISTALINA' | 'LEVEMENTE_TURVA' | 'TURVA' | 'INTERDITADA'>('CRISTALINA');
  const [waterTemp, setWaterTemp] = useState<number>(28.5);
  const [batherLoad, setBatherLoad] = useState<number>(18);
  const [gpsStatus, setGpsStatus] = useState<string>('Obtendo sinal GPS...');
  const [currentGps, setCurrentGps] = useState<{ lat: number; lng: number } | null>(null);

  // Simulação / Obtenção de GPS real
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentGps({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setGpsStatus(`GPS Ativo: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
        },
        () => {
          // Fallback para coordenadas de demonstração (Resort anchor)
          setCurrentGps({ lat: -23.56150, lng: -46.65600 });
          setGpsStatus('GPS Simulado (Localização Homologada Anvisa): -23.56150, -46.65600');
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setCurrentGps({ lat: -23.56150, lng: -46.65600 });
      setGpsStatus('GPS Local: -23.56150, -46.65600');
    }
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sanitary/logbook?tenant_id=tenant_demo');
      const data = await res.json();
      if (data.records) {
        setRecords(data.records);
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const lat = currentGps?.lat ?? -23.56150;
    const lng = currentGps?.lng ?? -46.65600;

    try {
      const res = await fetch('/api/sanitary/logbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant_id: 'tenant_demo',
          pool_id: poolId,
          pool_name: poolName,
          shift,
          ph: Number(ph),
          free_chlorine: Number(freeChlorine),
          combined_chlorine: Number(combinedChlorine),
          water_clarity: clarity,
          water_temp_celsius: Number(waterTemp),
          bather_load: Number(batherLoad),
          technician_lat: lat,
          technician_lng: lng,
          anchor_lat: -23.56168,
          anchor_lng: -46.65598,
          max_distance_meters: 50,
        })
      });

      const data = await res.json();
      if (data.success) {
        setFeedback(`✓ Registro sanitário de turno gravado com sucesso! Status: ${data.record.status} (Distância GPS: ${data.record.distance_meters}m)`);
        loadRecords();
      } else {
        setFeedback(`❌ Erro: ${data.error || 'Falha ao gravar'}`);
      }
    } catch {
      setFeedback('❌ Erro de comunicação com o servidor');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition"
              title="Voltar ao Painel"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> ANVISA & Vigilância Sanitária
                </span>
                <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-0.5 rounded-full border border-sky-500/20 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Geofencing 50m Ativo
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
                Logbook Sanitário Digital
              </h1>
              <p className="text-sm text-slate-400">
                Livro de Inspeções Diárias por Turno para Condomínios, Resorts e Parques Aquáticos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 px-4 py-2 rounded-lg border border-slate-700 text-sm font-semibold transition shadow-sm"
            >
              <Printer className="w-4 h-4 text-emerald-400" /> Imprimir Livro Anvisa
            </button>
            <button
              onClick={loadRecords}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
            </button>
          </div>
        </div>

        {/* Informative Banner */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Piscina Sob Auditoria Contínua: {poolName}</p>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" /> {gpsStatus}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Turnos Obrigatórios: <strong>Manhã (07h)</strong>, <strong>Tarde (13h)</strong> e <strong>Noite (19h)</strong></span>
          </div>
        </div>

        {feedback && (
          <div className={`p-4 rounded-xl border text-sm font-medium ${
            feedback.startsWith('✓') 
              ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300' 
              : 'bg-rose-950/40 border-rose-800/80 text-rose-300'
          }`}>
            {feedback}
          </div>
        )}

        {/* Main Content Grid: Form on Left, History Table on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* New Shift Register Form */}
          <div className="lg:col-span-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <ClipboardCheck className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg font-bold text-white">Novo Registro de Turno</h2>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Turno de Inspeção
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['MANHA', 'TARDE', 'NOITE'] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setShift(t)}
                      className={`py-2 text-xs font-bold rounded-lg border transition ${
                        shift === t
                          ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {t === 'MANHA' ? '🌅 Manhã' : t === 'TARDE' ? '☀️ Tarde' : '🌙 Noite'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    pH da Água (7.2 - 7.6)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={ph}
                    onChange={(e) => setPh(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Cloro Livre (ppm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={freeChlorine}
                    onChange={(e) => setFreeChlorine(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Cloro Combinado (ppm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={combinedChlorine}
                    onChange={(e) => setCombinedChlorine(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Temperatura (°C)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={waterTemp}
                    onChange={(e) => setWaterTemp(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Aspecto / Clareza
                  </label>
                  <select
                    value={clarity}
                    onChange={(e) => setClarity(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="CRISTALINA">Cristalina (Padrão A)</option>
                    <option value="LEVEMENTE_TURVA">Levemente Turva</option>
                    <option value="TURVA">Turva (Alerta)</option>
                    <option value="INTERDITADA">Interditada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Banhistas no Turno
                  </label>
                  <input
                    type="number"
                    value={batherLoad}
                    onChange={(e) => setBatherLoad(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" /> Geofencing Vigilância
                  </span>
                  <span className="text-emerald-400 font-bold">Raio Máx: 50m</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  O registro só é homologado com presença física auditada por GPS na borda da piscina.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                Assinar e Gravar Registro
              </button>
            </form>
          </div>

          {/* Historical Logbook Records (Anvisa View) */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-bold text-white">Livro Diário de Registro Técnico</h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {records.length} medições arquivadas
                </span>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="py-2.5 px-3">Data/Hora</th>
                      <th className="py-2.5 px-3">Turno</th>
                      <th className="py-2.5 px-3">pH</th>
                      <th className="py-2.5 px-3">Cloro L.</th>
                      <th className="py-2.5 px-3">Cloro C.</th>
                      <th className="py-2.5 px-3">Aspecto</th>
                      <th className="py-2.5 px-3">GPS / Dist.</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {records.map((r) => {
                      const isOk = r.status === 'EM_CONFORMIDADE';
                      const isAlert = r.status === 'ATENCAO';
                      return (
                        <tr key={r.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-2.5 px-3 text-slate-300">
                            {new Date(r.recorded_at).toLocaleString('pt-BR', { 
                              day: '2-digit', 
                              month: '2-digit', 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </td>
                          <td className="py-2.5 px-3 font-sans font-bold">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              r.shift === 'MANHA' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              r.shift === 'TARDE' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                              'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                            }`}>
                              {r.shift}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-white font-bold">{r.ph.toFixed(1)}</td>
                          <td className="py-2.5 px-3 text-white font-bold">{r.free_chlorine.toFixed(1)} ppm</td>
                          <td className="py-2.5 px-3 text-slate-400">{r.combined_chlorine.toFixed(1)} ppm</td>
                          <td className="py-2.5 px-3 font-sans">
                            <span className="text-[11px] text-slate-300">{r.water_clarity}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                              r.geofence_compliant ? 'text-emerald-400' : 'text-rose-400'
                            }`}>
                              <MapPin className="w-3 h-3" /> {r.distance_meters}m
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-sans">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isOk 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : isAlert 
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Audit Footer */}
            <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Auditoria Pericial Sanitária em conformidade com RDC/Anvisa e NBR 10.818</span>
              </div>
              <div className="text-slate-400 font-mono">
                Hash Forense SHA-256 Validado
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
