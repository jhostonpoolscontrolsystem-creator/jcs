'use client';

import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  MapPin, 
  AlertTriangle, 
  Send, 
  Wifi, 
  WifiOff, 
  CheckCircle2, 
  Calendar,
  Lock,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { mockPools } from '@/lib/mock-data';
import { NativeCameraCapture } from '@/components/NativeCameraCapture';
import { saveOfflineMaintenanceLog, getPendingOfflineLogs, removeOfflineLog } from '@/lib/offline-db';
import { evaluateChemicalRules, calculateChemicalDose } from '@/lib/chemical-rules';

export function MaintainerPwaWizard() {
  const [selectedPoolId, setSelectedPoolId] = useState('p-2');
  const [isOnline, setIsOnline] = useState(true);
  const [pendingLogsCount, setPendingLogsCount] = useState(0);

  // Estados dos inputs de coleta
  const [phInput, setPhInput] = useState(6.8);
  const [chlorineInput, setChlorineInput] = useState(1.5);
  const [alkalinityInput, setAlkalinityInput] = useState(60);
  const [calciumInput, setCalciumInput] = useState(200);

  // Check-ins de intervenção
  const [brushedSurface, setBrushedSurface] = useState(true);
  const [backwashedFilter, setBackwashedFilter] = useState(false);
  const [acidUsed, setAcidUsed] = useState(false);

  // Fotos em tempo real com GPS
  const [panoramicPhoto, setPanoramicPhoto] = useState<string | null>(null);
  const [chemicalTestPhoto, setChemicalTestPhoto] = useState<string | null>(null);
  const [currentGps, setCurrentGps] = useState<{ lat: number; lng: number }>({ lat: -16.441123, lng: -39.071234 });

  // Termo Legal
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Estado de envio / resultado
  const [submitting, setSubmitting] = useState(false);
  const [resultFeedback, setResultFeedback] = useState<any>(null);

  const activePool = mockPools.find((p) => p.id === selectedPoolId) || mockPools[0];

  // Monitoramento de conexão online/offline
  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineQueue();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    checkOfflineQueue();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkOfflineQueue = async () => {
    try {
      const logs = await getPendingOfflineLogs();
      setPendingLogsCount(logs.length);
    } catch (e) {
      console.warn('Falha ao verificar fila offline:', e);
    }
  };

  const syncOfflineQueue = async () => {
    try {
      const pending = await getPendingOfflineLogs();
      if (pending.length === 0) return;

      console.log(`[Sync] Enviando ${pending.length} registros offline acumulados...`);
      for (const log of pending) {
        await fetch('/api/maintenance/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(log),
        });
        await removeOfflineLog(log.id);
      }
      checkOfflineQueue();
    } catch (err) {
      console.error('[Sync] Falha ao sincronizar fila offline:', err);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setResultFeedback(null);

    const logPayload = {
      id: `log-${Date.now()}`,
      pool_id: activePool.id,
      maintainer_id: 'u-4', // João Tratador
      ph: phInput,
      chlorine_ppm: chlorineInput,
      alkalinity_ppm: alkalinityInput,
      calcium_hardness_ppm: calciumInput,
      brushed_surface: brushedSurface,
      backwashed_filter: backwashedFilter,
      acid_product_used: acidUsed,
      liability_accepted: termsAccepted,
      gps_lat: currentGps.lat,
      gps_lng: currentGps.lng,
      evidences: [
        {
          evidence_type: 'FOTO_PISCINA_PANORAMICA',
          photo_base64: panoramicPhoto || '',
          gps_lat: currentGps.lat,
          gps_lng: currentGps.lng,
          captured_at: new Date().toISOString(),
        },
        {
          evidence_type: 'FOTO_TESTE_AGUA',
          photo_base64: chemicalTestPhoto || '',
          gps_lat: currentGps.lat,
          gps_lng: currentGps.lng,
          captured_at: new Date().toISOString(),
        },
      ],
      created_at: new Date().toISOString(),
      synced: false,
    };

    // Cenário OFFLINE (IndexedDB)
    if (!navigator.onLine) {
      await saveOfflineMaintenanceLog(logPayload);
      await checkOfflineQueue();
      setResultFeedback({
        isOfflineSaved: true,
        message: 'Coleta armazenada com sucesso no IndexedDB local. O envio será realizado automaticamente assim que restabelecer a conexão.',
      });
      setSubmitting(false);
      return;
    }

    // Cenário ONLINE (Chamada da API Serverless)
    try {
      const res = await fetch('/api/maintenance/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logPayload),
      });

      const data = await res.json();
      setResultFeedback(data);
    } catch (err: any) {
      // Falha de rede imprevista -> contingência para IndexedDB
      await saveOfflineMaintenanceLog(logPayload);
      await checkOfflineQueue();
      setResultFeedback({
        isOfflineSaved: true,
        message: 'Falha momentânea de conexão detectada. Registro salvo no IndexedDB local de contingência.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Barra de Status e Roteiro */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">PWA do Tratador (Campo)</h3>
              <p className="text-xs text-slate-400">Coleta com Georreferenciamento & Trava Anti-Fraude</p>
            </div>
          </div>

          {/* Tarja de Conexão */}
          {isOnline ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-xs text-emerald-400 font-semibold">
              <Wifi className="w-3.5 h-3.5" />
              <span>Conectado</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-xs text-amber-300 font-semibold animate-pulse">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Modo Offline (72h)</span>
            </div>
          )}
        </div>

        {/* Notificação de Fila Offline */}
        {pendingLogsCount > 0 && (
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 flex items-center justify-between text-xs text-amber-200">
            <span className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-400 animate-spin" />
              {pendingLogsCount} log(s) salvo(s) localmente aguardando sincronização
            </span>
            {isOnline && (
              <button
                onClick={syncOfflineQueue}
                className="px-2.5 py-1 bg-amber-700 hover:bg-amber-600 text-white rounded font-bold"
              >
                Sincronizar Agora
              </button>
            )}
          </div>
        )}

        {/* 1. Seleção da Piscina do Roteiro */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            1. Roteiro de Atendimento Diário
          </label>
          <select
            value={selectedPoolId}
            onChange={(e) => setSelectedPoolId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
          >
            {mockPools.map((pool) => (
              <option key={pool.id} value={pool.id}>
                [{pool.facility_type}] {pool.name} - Volume: {pool.volume_m3}m³
              </option>
            ))}
          </select>

          <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800/60">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span>
              Geofencing: Coordenadas esperadas: Lat {activePool.gps_lat.toFixed(4)}, Lng {activePool.gps_lng.toFixed(4)} (Raio de tolerância: 100m)
            </span>
          </div>
        </div>

        {/* 2. Câmera Nativa em Tempo Real (Anti-Fraude) */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            2. Evidências Obrigatórias In-App
          </label>

          <NativeCameraCapture
            label="Foto 1: Espelho d'Água (Panorâmica)"
            subLabel="Capture a superfície da água e integridade visual do monólito"
            capturedPhoto={panoramicPhoto}
            onPhotoCaptured={(photo, coords) => {
              setPanoramicPhoto(photo);
              setCurrentGps(coords);
            }}
          />

          <NativeCameraCapture
            label="Foto 2: Teste Químico (Estojo de Comparação)"
            subLabel="Capture o estojo de testes contendo a amostra ao lado da escala colorimétrica"
            capturedPhoto={chemicalTestPhoto}
            onPhotoCaptured={(photo, coords) => {
              setChemicalTestPhoto(photo);
              setCurrentGps(coords);
            }}
          />
        </div>

        {/* 3. Coleta de Parâmetros com Sliders */}
        <div className="space-y-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              3. Parâmetros Químicos Coletados
            </label>
            <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
              Hard-Rules Ativas
            </span>
          </div>

          {/* pH */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300">pH da Água (Ideal: 7.4 - 7.6):</span>
              <span className={`font-bold font-mono px-2 py-0.5 rounded ${
                phInput < 7.0 ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-slate-800 text-cyan-400'
              }`}>
                {phInput.toFixed(1)} {phInput < 7.0 ? '⚠️ RISCO DE CORROSÃO' : ''}
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

          {/* Cloro */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300">Cloro Livre (Ideal: 1.5 - 3.0 ppm):</span>
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
              <span className="text-slate-300">Alcalinidade Total (Ideal: 80 - 120 ppm):</span>
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

        {/* 4. Intervenções & Regra Fatal de Ácidos */}
        <div className="space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            4. Check-in de Procedimentos
          </label>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={brushedSurface}
                onChange={(e) => setBrushedSurface(e.target.checked)}
                className="rounded accent-cyan-400"
              />
              <span>Escovação Monólito</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={backwashedFilter}
                onChange={(e) => setBackwashedFilter(e.target.checked)}
                className="rounded accent-cyan-400"
              />
              <span>Retrolavagem Filtro</span>
            </label>
          </div>

          {/* Regra Fatal: Limpa Pedras */}
          <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
            acidUsed 
              ? 'bg-red-950/70 border-red-800 text-red-200' 
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
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                Houve uso de Limpa Pedras ou Ácido Muriático?
              </span>
              <p className="text-[11px] leading-tight text-slate-300 opacity-90">
                PROIBIÇÃO LETAL: Substâncias ácidas causam desagregação do aglomerado mineral e resultam na <strong>suspensão imediata da garantia</strong> JHostonTec.
              </p>
            </div>
          </label>
        </div>

        {/* 5. Termo de Responsabilidade Legal Obrigatório */}
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

        {/* Botão de Envio com Auditoria e SLA < 10s */}
        <button
          onClick={handleSubmit}
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

      {/* Exibição da Resposta do Motor */}
      {resultFeedback && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              {resultFeedback.isOfflineSaved ? 'Armazenado em Contingência Offline' : 'Auditoria Concluída'}
            </h4>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">
              {resultFeedback.isOfflineSaved ? 'IndexedDB OK' : 'HTTP 200 OK'}
            </span>
          </div>

          {resultFeedback.isOfflineSaved && (
            <p className="text-xs text-amber-200">{resultFeedback.message}</p>
          )}

          {resultFeedback.audit && (
            <div className={`p-4 rounded-xl border text-xs space-y-2 ${
              resultFeedback.audit.isWarrantySuspended
                ? 'bg-red-950/70 border-red-800 text-red-200'
                : resultFeedback.audit.isRedZone
                ? 'bg-red-950/50 border-red-800 text-red-300'
                : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
            }`}>
              <div className="font-bold text-sm flex items-center gap-2">
                Status Resultante: {resultFeedback.audit.newStatus}
              </div>
              <p><strong>Ação Recomendada:</strong> {resultFeedback.audit.recommendedAction}</p>
              {resultFeedback.audit.flags.length > 0 && (
                <ul className="list-disc list-inside space-y-1 pt-1 opacity-90">
                  {resultFeedback.audit.flags.map((flag: string, idx: number) => (
                    <li key={idx}>{flag}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {resultFeedback.evolution_dispatch && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/60 space-y-2 text-xs">
              <div className="flex justify-between items-center text-emerald-400 font-bold">
                <span>Disparo Evolution API (WhatsApp)</span>
                <span>SLA: {resultFeedback.evolution_dispatch.sla_seconds}s (&lt; 10s)</span>
              </div>
              <p className="text-slate-300 italic font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                {resultFeedback.evolution_dispatch.message}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
