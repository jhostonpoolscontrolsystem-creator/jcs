'use client';

import React, { useEffect, useState } from 'react';
import { MaintainerPwaWizard } from '@/components/MaintainerPwaWizard';
import { Droplet, Smartphone, ShieldCheck, Download, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function StandalonePwaPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Detecta se já está rodando como PWA instalado (Standalone no Android/iOS)
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    setIsStandalone(checkStandalone);

    // Captura o evento nativo de instalação do Chrome / Edge Android
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        'Como instalar o App do Piscineiro no seu celular:\n\n' +
        '• No Android (Chrome): Toque no menu de 3 pontinhos (⋮) no topo direito e selecione "Instalar aplicativo" ou "Adicionar à tela inicial".\n\n' +
        '• No iPhone (Safari): Toque no botão de Compartilhar (ícone com quadrado e seta para cima) e escolha "Adicionar à Tela de Início".\n\n' +
        'O ícone do JHPCS Tratador será criado e funcionará como um aplicativo nativo e offline!'
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-6 max-w-2xl mx-auto w-full">
      {/* Header Mobile Clean & Isolado */}
      <header className="flex items-center justify-between pb-4 border-b border-slate-900 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/25">
            <Droplet className="w-5 h-5 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-black text-white tracking-wide">JHPCS Tratador</h1>
              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                PWA Nativo
              </span>
            </div>
            <p className="text-[11px] text-slate-400">JHoston Pools • Auditoria de Campo</p>
          </div>
        </div>

        {/* Botão de Instalar na Tela Inicial do Celular */}
        {!isStandalone && !installed && (
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Instalar no Celular</span>
            <span className="xs:hidden">Instalar</span>
          </button>
        )}

        {isStandalone && (
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Modo App Ativo</span>
          </div>
        )}
      </header>

      {/* Núcleo Operacional 100% Isolado */}
      <main className="flex-1">
        <MaintainerPwaWizard />
      </main>

      {/* Footer Mobile Compacto */}
      <footer className="pt-6 pb-2 text-center text-[10px] text-slate-500 flex flex-col items-center gap-1">
        <p>JHPCS Tratador v1.0 • Operação Offline-First & Sincronização Automática</p>
        <p className="text-slate-600">Exclusivo para tratadores e técnicos credenciados JHoston Pools</p>
      </footer>
    </div>
  );
}
