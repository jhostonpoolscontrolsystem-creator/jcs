'use client';

import React from 'react';

interface EditorialFrameProps {
  children: React.ReactNode;
  accent?: 'cyan' | 'green' | 'amber' | 'emerald';
  secondaryAccent?: 'amber' | 'cyan' | 'slate' | 'green' | 'emerald';
  showInnerBorder?: boolean;
  className?: string;
}

export function EditorialFrame({
  children,
  accent = 'cyan',
  secondaryAccent = 'amber',
  showInnerBorder = true,
  className = '',
}: EditorialFrameProps) {
  const accentBorderColor = 
    accent === 'green' || accent === 'emerald' ? 'border-emerald-500/50' :
    accent === 'amber' ? 'border-amber-500/50' : 
    'border-cyan-500/40';

  const innerBorderColor =
    secondaryAccent === 'cyan' ? 'border-cyan-500/20' :
    secondaryAccent === 'green' || secondaryAccent === 'emerald' ? 'border-emerald-500/20' :
    secondaryAccent === 'slate' ? 'border-slate-800/80' :
    'border-amber-500/20';

  return (
    <div className={`relative w-full h-full p-4 box-border flex flex-col justify-between ${className}`}>
      {/* Moldura Externa Fina */}
      <div className={`absolute inset-3 rounded-2xl border ${accentBorderColor} pointer-events-none z-10`} />

      {/* Moldura Interna Arquitetônica Discreta */}
      {showInnerBorder && (
        <div className={`absolute inset-4 rounded-xl border ${innerBorderColor} pointer-events-none z-10`} />
      )}

      {/* Marcadores de Esquinas Arquitetônicos */}
      <div className="absolute top-3 left-3 w-2 h-2 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
      <div className="absolute top-3 right-3 w-2 h-2 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-2 h-2 border-b-2 border-l-2 border-amber-400 z-20 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-2 h-2 border-b-2 border-r-2 border-amber-400 z-20 pointer-events-none" />

      {/* Conteúdo Seguro Interno */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-3">
        {children}
      </div>
    </div>
  );
}

interface PageHeaderProps {
  publicationLabel: string;
  editionLabel?: string;
  sectionLabel?: string;
  accent?: 'cyan' | 'green' | 'amber' | 'emerald';
}

export function PageHeader({
  publicationLabel,
  editionLabel,
  sectionLabel,
  accent = 'cyan',
}: PageHeaderProps) {
  const accentText = 
    accent === 'green' || accent === 'emerald' ? 'text-emerald-400' :
    accent === 'amber' ? 'text-amber-400' :
    'text-cyan-400';

  return (
    <header className="w-full pb-2.5 mb-4 border-b border-slate-800/90 flex items-center justify-between text-xs font-mono">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span className={`font-black tracking-widest uppercase ${accentText}`}>
          {publicationLabel}
        </span>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
        {sectionLabel && <span>{sectionLabel}</span>}
        {sectionLabel && editionLabel && <span>•</span>}
        {editionLabel && <span className="text-slate-300">{editionLabel}</span>}
      </div>
    </header>
  );
}

interface PageFooterProps {
  organizationLabel?: string;
  contactLabel?: string;
  pageNumber: number;
  totalPages: number;
}

export function PageFooter({
  organizationLabel,
  contactLabel,
  pageNumber,
  totalPages,
}: PageFooterProps) {
  return (
    <footer className="w-full pt-2.5 mt-auto border-t border-slate-800/90 flex items-center justify-between text-[10px] text-slate-400 font-mono">
      <div className="flex items-center gap-2 truncate max-w-[70%]">
        {organizationLabel && (
          <span className="text-slate-300 font-bold uppercase truncate">
            {organizationLabel}
          </span>
        )}
        {organizationLabel && contactLabel && <span>•</span>}
        {contactLabel && <span className="truncate">{contactLabel}</span>}
      </div>

      <div className="text-slate-400 font-mono font-bold shrink-0">
        Pág. <span className="text-white">{pageNumber}</span> de {totalPages}
      </div>
    </footer>
  );
}

interface SectionLabelProps {
  label: string;
  accent?: 'cyan' | 'green' | 'amber' | 'emerald';
  eyebrow?: string;
}

export function SectionLabel({ label, accent = 'cyan', eyebrow }: SectionLabelProps) {
  const colorClasses = 
    accent === 'green' || accent === 'emerald' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
    accent === 'amber' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
    'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';

  return (
    <div className="flex flex-wrap items-center gap-2 mb-2">
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border ${colorClasses}`}>
        {label}
      </span>
      {eyebrow && (
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          {eyebrow}
        </span>
      )}
    </div>
  );
}
