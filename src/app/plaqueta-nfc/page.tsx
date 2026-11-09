'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Download, 
  Printer, 
  ArrowLeft, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Copy, 
  Building2, 
  Waves, 
  FileCode,
  Sparkles,
  QrCode,
  Radio
} from 'lucide-react';

export default function MetalPlateGeneratorPage() {
  const [poolId, setPoolId] = useState('resort-vista-bela');
  const [poolName, setPoolName] = useState('Piscina Olímpica Central');
  const [facilityName, setFacilityName] = useState('Resort & Spa Vista Bela');
  const [volumeM3, setVolumeM3] = useState<number>(350);
  const [warrantyCode, setWarrantyCode] = useState('JH-2026-DECENAL-084');
  const [nfcUid, setNfcUid] = useState('04:8A:F3:1B:90:4C:80');
  const [destination, setDestination] = useState<'CASA_DE_MAQUINAS' | 'RECEPCAO_TOTEM'>('CASA_DE_MAQUINAS');
  const [copiedLink, setCopiedLink] = useState(false);

  const downloadSvgUrl = `/api/laser/plate-svg?pool_id=${encodeURIComponent(poolId)}&pool_name=${encodeURIComponent(poolName)}&facility_name=${encodeURIComponent(facilityName)}&volume_m3=${volumeM3}&warranty_code=${encodeURIComponent(warrantyCode)}&nfc_uid=${encodeURIComponent(nfcUid)}&destination=${destination}&format=svg`;

  const previewSvgUrl = `/api/laser/plate-svg?pool_id=${encodeURIComponent(poolId)}&pool_name=${encodeURIComponent(poolName)}&facility_name=${encodeURIComponent(facilityName)}&volume_m3=${volumeM3}&warranty_code=${encodeURIComponent(warrantyCode)}&nfc_uid=${encodeURIComponent(nfcUid)}&destination=${destination}&format=svg`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition"
              title="Voltar ao Painel"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2.5 py-0.5 rounded-full border border-cyan-500/20 font-black flex items-center gap-1 uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5" /> Hardware & Telemetria Física
                </span>
                <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-0.5 rounded-full border border-amber-500/20 font-semibold">
                  Alumínio Naval 5052-H32
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
                Gerador de Plaqueta Metálica NFC & Laser Vetorial
              </h1>
              <p className="text-xs md:text-sm text-slate-400">
                Gere arquivos vetoriais SVG prontos para gravação laser fiber e usinagem CNC para casa de máquinas e recepção
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={downloadSvgUrl}
              download={`PLAQUETA_LASER_${poolId}.svg`}
              className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-900/30 transition cursor-pointer"
            >
              <Download className="w-4 h-4" /> Baixar SVG Laser (100x150mm)
            </a>
          </div>
        </div>

        {/* Grid: Formulário de Configuração à esquerda vs Preview Vetorial da Chapa de Alumínio à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LADO ESQUERDO: Dados da Placa e Parâmetros Industriais */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" /> Parâmetros da Placa Industrial
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure os dados gravados a laser na chapa metálica de 1,5mm.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Local de Fixação</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDestination('CASA_DE_MAQUINAS')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      destination === 'CASA_DE_MAQUINAS'
                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    Casa de Máquinas
                  </button>
                  <button
                    type="button"
                    onClick={() => setDestination('RECEPCAO_TOTEM')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      destination === 'RECEPCAO_TOTEM'
                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    Totem Recepção
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Complexo / Empreendimento</label>
                <input
                  type="text"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Identificação da Piscina</label>
                <input
                  type="text"
                  value={poolName}
                  onChange={(e) => setPoolName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Volume (m³)</label>
                  <input
                    type="number"
                    value={volumeM3}
                    onChange={(e) => setVolumeM3(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Código Garantia</label>
                  <input
                    type="text"
                    value={warrantyCode}
                    onChange={(e) => setWarrantyCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-amber-300 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">NFC Tag UID (Sensor Dual)</label>
                <div className="relative">
                  <Radio className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={nfcUid}
                    onChange={(e) => setNfcUid(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Especificações Técnicas de Fabricação */}
              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl space-y-2 text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-wider block">Especificação Metalúrgica:</span>
                <ul className="text-slate-400 space-y-1 text-[11px]">
                  <li>• <strong>Chapa:</strong> Alumínio Naval 5052-H32 Anodizado (Espessura 1,5mm)</li>
                  <li>• <strong>Tolerância CNC:</strong> Dimensões 100 x 150 mm com 4 furos de Ø 4,0 mm</li>
                  <li>• <strong>Gravação:</strong> Fibra Óptica 1064nm (Profundidade 0,08mm resistente a intempéries e vapores de cloro)</li>
                  <li>• <strong>Frequência NFC:</strong> NTAG213 / 215 (13.56 MHz ISO 14443A)</li>
                </ul>
              </div>

            </div>
          </div>

          {/* LADO DIREITO: Preview Vetorial em Alta Definição */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-cyan-400" /> Visualização Real da Gravação Laser
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
                Escala 1:1 • 100mm x 150mm
              </span>
            </div>

            {/* Quadro de Chapa de Alumínio Estilizado com Efeito Escovado */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-center">
              <div className="relative shadow-2xl rounded-2xl overflow-hidden border border-slate-700 bg-white max-w-sm w-full transition-transform hover:scale-[1.01]">
                <img
                  src={previewSvgUrl}
                  alt="Pré-visualização Vetorial da Plaqueta Metálica"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between text-xs text-slate-400">
              <span>Arquivo vetorial 100% compatível com softwares EZCad, LightBurn e máquinas CNC router.</span>
              <a
                href={downloadSvgUrl}
                download={`PLAQUETA_LASER_${poolId}.svg`}
                className="text-cyan-400 hover:text-cyan-300 font-bold whitespace-nowrap ml-2 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Salvar .SVG
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
