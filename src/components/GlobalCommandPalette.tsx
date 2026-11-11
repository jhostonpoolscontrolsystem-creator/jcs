'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Command,
  LayoutDashboard,
  ShieldCheck,
  ShoppingBag,
  Building2,
  FileText,
  Activity,
  Calculator,
  QrCode,
  Download,
  Award,
  Wallet,
  Settings,
  X,
  ArrowRight,
  Sparkles,
  CloudLightning,
  Send,
  Sliders,
  ChevronRight,
  Zap
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navegação' | 'Ações Rápidas' | 'Perícia & Química' | 'Comercial & Financeiro';
  description: string;
  icon: any;
  shortcut?: string;
  action: () => void;
}

export function GlobalCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Atalho global: Ctrl+K ou Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands: CommandItem[] = [
    {
      id: 'cockpit-master',
      title: 'Cockpit Master de Governança',
      category: 'Navegação',
      description: 'Centro soberano com mapa georreferenciado e controle de tenants',
      icon: LayoutDashboard,
      shortcut: 'G M',
      action: () => {
        router.push('/cockpit');
        setIsOpen(false);
      },
    },
    {
      id: 'trade-balcao',
      title: 'Receituário de Balcão & PIX Expresso',
      category: 'Comercial & Financeiro',
      description: 'Prescrição estequiométrica em 5 segundos para lojas de piscinas',
      icon: ShoppingBag,
      shortcut: 'G B',
      action: () => {
        router.push('/trade/balcao');
        setIsOpen(false);
      },
    },
    {
      id: 'logbook-sanitario',
      title: 'Logbook Sanitário Digital Anvisa',
      category: 'Navegação',
      description: 'Caderno de conformidade NBR 10.818 com selo público para hotéis',
      icon: Building2,
      shortcut: 'G L',
      action: () => {
        router.push('/logbook-sanitario');
        setIsOpen(false);
      },
    },
    {
      id: 'benchmarking',
      title: 'Benchmarking & Auditoria Competitiva (Score 100)',
      category: 'Perícia & Química',
      description: 'Comparativo cirúrgico contra AquApp, PiscinApp, Poolloop e Blue Connect',
      icon: Award,
      shortcut: 'G C',
      action: () => {
        router.push('/benchmarking');
        setIsOpen(false);
      },
    },
    {
      id: 'financeiro',
      title: 'Módulo Financeiro & Mensalidades',
      category: 'Comercial & Financeiro',
      description: 'Gestão de faturamento recorrente, baixas e comissões de frotas',
      icon: Wallet,
      shortcut: 'G F',
      action: () => {
        router.push('/financeiro');
        setIsOpen(false);
      },
    },
    {
      id: 'garantia-pericial',
      title: 'Perícia de Garantia Decenal JHoston',
      category: 'Perícia & Química',
      description: 'Laudos forenses de cura de 28 dias e bloqueio de ácido muriático',
      icon: ShieldCheck,
      shortcut: 'G P',
      action: () => {
        router.push('/garantia-pericial');
        setIsOpen(false);
      },
    },
    {
      id: 'plaqueta-nfc',
      title: 'Gerador de Plaquetas Metálicas NFC (CNC Laser)',
      category: 'Ações Rápidas',
      description: 'Geração de vetor SVG para gravação permanente na casa de máquinas',
      icon: QrCode,
      action: () => {
        router.push('/plaqueta-nfc');
        setIsOpen(false);
      },
    },
    {
      id: 'pdf-estabilidade',
      title: 'Baixar Laudo Técnico de Estabilidade (PDF 3 Páginas)',
      category: 'Ações Rápidas',
      description: 'Laudo executivo com chancela Score 100/100 para investidores',
      icon: Download,
      action: () => {
        window.open('/api/pdf/system-stability', '_blank');
        setIsOpen(false);
      },
    },
    {
      id: 'pdf-pwa',
      title: 'Baixar Relatório de Refatoração PWA de Campo (PDF)',
      category: 'Ações Rápidas',
      description: 'Plano pericial em 5 fases com matriz de prompts',
      icon: FileText,
      action: () => {
        window.open('/api/pdf/pwa-refactoring', '_blank');
        setIsOpen(false);
      },
    },
    {
      id: 'radar-weather',
      title: 'Radar Climático & Químico Preditivo 48h',
      category: 'Perícia & Química',
      description: 'Previsão de tempestades, ondas de calor e dosagem preventiva de tampão',
      icon: CloudLightning,
      action: () => {
        router.push('/cockpit');
        setIsOpen(false);
      },
    },
    {
      id: 'configuracoes',
      title: 'Configurações de Tenant & WhatsApp Evolution',
      category: 'Navegação',
      description: 'Pareamento de instância QR Code, chaves PIX e dados white-label',
      icon: Settings,
      action: () => {
        router.push('/configuracoes');
        setIsOpen(false);
      },
    },
  ];

  const filtered = commands.filter((cmd) => {
    const q = search.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <>
      {/* TRIGGER VISUAL MINIMALISTA NO RODAPÉ DIREITO (TOUCH OU TECLADO) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-2xl backdrop-blur-md transition-all group cursor-pointer hover:border-cyan-500/50 hover:shadow-cyan-500/10"
        title="Busca rápida e comando (Ctrl + K)"
      >
        <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition">
          <Zap className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-semibold">Comandos & Busca</span>
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-400 group-hover:text-cyan-300">
          ⌘K
        </kbd>
      </button>

      {/* MODAL OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDownList}
          >
            {/* SEARCH INPUT HEADER */}
            <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/50">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="O que você deseja fazer ou acessar? (ex: balcão, laudo, pix, anvisa...)"
                autoFocus
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* LIST OF ACTIONS */}
            <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-800/40">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  Nenhum comando ou rota encontrada para "{search}".
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-500/15 via-sky-500/10 to-transparent border border-cyan-500/30 text-white'
                          : 'text-slate-300 hover:bg-slate-800/40 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-white truncate">
                              {cmd.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 shrink-0">
                              {cmd.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {cmd.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {cmd.shortcut && (
                          <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 bg-slate-800 rounded hidden sm:inline-block">
                            {cmd.shortcut}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ para navegar</span>
                <span>↵ para selecionar</span>
                <span>ESC para sair</span>
              </div>
              <span className="text-cyan-400/80 font-semibold">JHPCS OmniSearch</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

