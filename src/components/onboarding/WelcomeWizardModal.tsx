'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  CreditCard, 
  MessageSquare, 
  Waves, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

interface WelcomeWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenantName?: string;
  onOpenRegisterPool?: () => void;
}

export function WelcomeWizardModal({
  isOpen,
  onClose,
  tenantName = 'Seu Negócio',
  onOpenRegisterPool,
}: WelcomeWizardModalProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Bem-vindo ao JHPCS!</h3>
              <p className="text-[11px] text-slate-400">3 Passos rápidos para configurar a sua operação</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
          <div className={`p-1.5 rounded-lg border ${currentStep === 1 ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : currentStep > 1 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
            1. Chave PIX
          </div>
          <div className={`p-1.5 rounded-lg border ${currentStep === 2 ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : currentStep > 2 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
            2. WhatsApp
          </div>
          <div className={`p-1.5 rounded-lg border ${currentStep === 3 ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
            3. 1ª Piscina
          </div>
        </div>

        {/* PASSO 1: CONFIGURAÇÃO DE PIX */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <CreditCard className="w-4 h-4" />
                <span>Receba direto na sua conta bancária</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cadastre sua chave PIX (CNPJ, CPF ou E-mail) para que as cobranças geradas nas ordens de serviço e receitas caiam diretamente para você sem intermediações.
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link
                href="/configuracoes"
                onClick={onClose}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Configurar Agora em Configurações</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition cursor-pointer"
              >
                <span>Próximo Passo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PASSO 2: CONEXÃO WHATSAPP */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <MessageSquare className="w-4 h-4" />
                <span>Sua instância dedicada já está pronta</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Acesse a tela de Configurações para ler o QR Code com o seu WhatsApp corporativo. Seus laudos e cobranças serão disparados pelo seu número próprio.
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition cursor-pointer"
              >
                <span>Próximo Passo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PASSO 3: PRIMEIRA PISCINA */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                <Waves className="w-4 h-4" />
                <span>Cadastre seu primeiro ativo aquático</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Informe o volume em m³ e o tipo de revestimento (Fibra, Alvenaria, Areia Compactada). O motor estequiométrico calculará dosagens exatas e índice ISL.
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenRegisterPool) onOpenRegisterPool();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Cadastrar Piscina Agora</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

