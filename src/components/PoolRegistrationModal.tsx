'use client';

import React, { useState } from 'react';
import { PlusCircle, Droplets, MapPin, Calendar, Clock, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { FacilityType } from '@/types/database';

interface PoolRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPoolCreated: (newPool: any) => void;
}

export function PoolRegistrationModal({ isOpen, onClose, onPoolCreated }: PoolRegistrationModalProps) {
  const [name, setName] = useState('');
  const [facilityType, setFacilityType] = useState<FacilityType>('HOTEL');
  const [address, setAddress] = useState('');
  const [geocoding, setGeocoding] = useState(false);
  const [volumeM3, setVolumeM3] = useState('120');
  const [pumpFlowM3H, setPumpFlowM3H] = useState('20');
  const [gpsLat, setGpsLat] = useState('-16.4350');
  const [gpsLng, setGpsLng] = useState('-39.0650');
  const [applicationDate, setApplicationDate] = useState('2026-10-01');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    setApplicationDate(new Date().toISOString().split('T')[0]);
  }, []);

  // Busca coordenadas automáticas através do endereço ou CEP digitado
  const handleFetchCoordinatesFromAddress = async () => {
    if (!address.trim()) return;
    setGeocoding(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
      const data = await res.json();
      if (data.success) {
        setGpsLat(data.lat);
        setGpsLng(data.lng);
      } else {
        setErrorMsg(data.message || 'Endereço não localizado automaticamente. Insira as coordenadas manualmente.');
      }
    } catch (e) {
      setErrorMsg('Falha ao buscar coordenadas do endereço.');
    } finally {
      setGeocoding(false);
    }
  };

  // Pega a localização atual do dispositivo via GPS
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLat(pos.coords.latitude.toFixed(6));
          setGpsLng(pos.coords.longitude.toFixed(6));
        },
        (err) => {
          setErrorMsg('Não foi possível obter a localização do dispositivo: ' + err.message);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/pools/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          facility_type: facilityType,
          volume_m3: volumeM3,
          pump_flow_m3_h: pumpFlowM3H,
          gps_lat: gpsLat,
          gps_lng: gpsLng,
          application_date: applicationDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Erro ao cadastrar piscina.');
      } else {
        onPoolCreated(data.pool);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg('Falha de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-fadeIn">
        <div className="flex justify-between items-start pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Cadastrar Novo Ativo Monolítico</h3>
              <p className="text-xs text-slate-400">Geração de Digital Twin & Parâmetros de Garantia</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 text-xs">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
              Nome da Piscina / Localização:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Piscina de Areia - Hotel Fasano"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
              required
            />
          </div>

          {/* Campo de Endereço / CEP Inteligente */}
          <div className="space-y-1.5 p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex justify-between items-center">
              <label className="block font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                Endereço, Condomínio ou CEP da Piscina:
              </label>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <MapPin className="w-3 h-3" />
                Usar Meu GPS Atual
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ex: Av. Beira Mar, 1200 - Trancoso, BA ou CEP"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
              />
              <button
                type="button"
                onClick={handleFetchCoordinatesFromAddress}
                disabled={geocoding || !address.trim()}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
              >
                {geocoding ? 'Buscando...' : 'Obter GPS'}
              </button>
            </div>
            <p className="text-[10px] text-slate-400">
              O sistema busca automaticamente a Latitude/Longitude para o geofencing anti-fraude de 100m.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Tipo de Cliente:</label>
              <select
                value={facilityType}
                onChange={(e) => setFacilityType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
              >
                <option value="HOTEL">Hotel</option>
                <option value="RESORT">Resort</option>
                <option value="PESSOA_FISICA">Pessoa Física (Residencial)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Data da Aplicação:</label>
              <input
                type="date"
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Volume (m³):</label>
              <input
                type="number"
                step="0.1"
                value={volumeM3}
                onChange={(e) => setVolumeM3(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Vazão da Bomba (m³/h):</label>
              <input
                type="number"
                step="0.1"
                value={pumpFlowM3H}
                onChange={(e) => setPumpFlowM3H(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Latitude GPS:</label>
              <input
                type="text"
                value={gpsLat}
                onChange={(e) => setGpsLat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Longitude GPS:</label>
              <input
                type="text"
                value={gpsLng}
                onChange={(e) => setGpsLng(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                required
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 rounded-xl font-black shadow-lg shadow-cyan-500/20 hover:opacity-90 flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              {loading ? 'Criando Ativo...' : 'Ativar Digital Twin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
