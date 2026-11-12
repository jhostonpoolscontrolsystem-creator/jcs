'use client';

import React from 'react';
import { 
  MetricSlot, 
  AuditItemSlot, 
  ComparisonItemSlot, 
  TableColumnSlot, 
  TableRowSlot,
  CTASlot,
  QuoteSlot,
  IndexEntrySlot,
  ImageSlotData
} from './editorialSchema';
import { 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Activity, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import Image from 'next/image';

// 1. METRIC CARD
export function MetricCard({ metric }: { metric: MetricSlot }) {
  const accentColor = 
    metric.accent === 'green' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5' :
    metric.accent === 'amber' ? 'text-amber-400 border-amber-500/30 bg-amber-500/5' :
    metric.accent === 'white' ? 'text-white border-slate-700 bg-slate-900/60' :
    'text-cyan-400 border-cyan-500/30 bg-cyan-500/5';

  return (
    <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${accentColor}`}>
      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block truncate">
        {metric.label}
      </span>
      <div className="my-1">
        <span className="text-xl sm:text-2xl font-black font-mono tracking-tight block">
          {metric.value}
        </span>
      </div>
      {metric.sublabel && (
        <span className="text-[9.5px] text-slate-400 block leading-tight truncate">
          {metric.sublabel}
        </span>
      )}
    </div>
  );
}

// 2. AUDIT TRAIL PANEL (Painel de Rastreabilidade e Dados Auditados)
export function AuditTrailPanel({ items }: { items: AuditItemSlot[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
          <Database className="w-3 h-3 text-cyan-400" />
          Trilha de Auditoria Técnica (Audit Trail)
        </span>
        <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Fonte Verificada
        </span>
      </div>

      <div className="space-y-1.5 pt-0.5">
        {items.map((item) => (
          <div key={item.id} className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10.5px]">
            <div className="truncate">
              <strong className="text-slate-200 block truncate">{item.title}</strong>
              {item.details && <span className="text-[9.5px] text-slate-400 block truncate">{item.details}</span>}
            </div>
            <div className="font-mono text-cyan-300 font-bold sm:text-right shrink-0 text-[10px]">
              {item.metricLabel}: <span className="text-white">{item.metricValue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. EDITORIAL COLUMNS (Colunas com leitura confortável e gap calibrado)
export function EditorialColumns({
  paragraphs,
  columns = 2,
  className = '',
}: {
  paragraphs?: string[];
  columns?: 2 | 3;
  className?: string;
}) {
  if (!paragraphs || paragraphs.length === 0) return null;

  const colClass = columns === 3 
    ? 'grid grid-cols-1 md:grid-cols-3 gap-5' 
    : 'grid grid-cols-1 md:grid-cols-2 gap-6';

  return (
    <div className={`${colClass} text-xs text-slate-300 leading-relaxed font-normal ${className}`}>
      {paragraphs.map((p, idx) => (
        <p key={idx} className="text-justify leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  );
}

// 4. COMPARISON PANEL (Comparativo Técnico Editorial)
export function ComparisonPanel({ items }: { items: ComparisonItemSlot[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, idx) => {
        const accentBorder = 
          item.accent === 'green' ? 'border-emerald-500/40' :
          item.accent === 'amber' ? 'border-amber-500/40' :
          'border-cyan-500/40';

        const accentTitle = 
          item.accent === 'green' ? 'text-emerald-400' :
          item.accent === 'amber' ? 'text-amber-400' :
          'text-cyan-400';

        return (
          <div key={idx} className={`p-4 rounded-xl bg-slate-900/60 border ${accentBorder} space-y-2 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${accentTitle}`}>
                  {item.badge || `Opção 0${idx + 1}`}
                </span>
                {item.highlightValue && (
                  <span className="text-[10px] font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {item.highlightValue}
                  </span>
                )}
              </div>
              <h4 className="text-xs font-bold text-white block mb-1">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 5. DATA TABLE (Tabela Editorial Técnica com alto contraste)
export function EditorialDataTable({
  columns,
  rows,
}: {
  columns?: TableColumnSlot[];
  rows?: TableRowSlot[];
}) {
  if (!columns || !rows || rows.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-900/90 border-b border-slate-800 font-mono text-[10px] uppercase text-cyan-400">
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className="py-2.5 px-3.5 font-bold tracking-wider"
                style={{ textAlign: col.align || 'left', width: col.widthPercent ? `${col.widthPercent}%` : 'auto' }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-transparent' : 'bg-slate-900/40'}>
              {columns.map((col, cIdx) => (
                <td 
                  key={cIdx} 
                  className="py-2.5 px-3.5 text-slate-200"
                  style={{ textAlign: col.align || 'left' }}
                >
                  {row[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 6. TECHNICAL CALLOUT & QUOTE
export function TechnicalCallout({
  text,
  title = 'Parecer Pericial de Engenharia:',
  accent = 'amber',
}: {
  text: string;
  title?: string;
  accent?: 'cyan' | 'green' | 'amber';
}) {
  const borderClass = 
    accent === 'green' ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300' :
    accent === 'cyan' ? 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' :
    'border-amber-500/40 bg-amber-950/20 text-amber-300';

  return (
    <div className={`p-3.5 rounded-xl border ${borderClass} space-y-1`}>
      <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>{title}</span>
      </div>
      <p className="text-[11.5px] text-slate-200 italic leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

// 7. CTA PANEL (Chamada para Ação Editorial)
export function EditorialCTAPanel({ cta }: { cta?: CTASlot }) {
  if (!cta) return null;

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 border border-cyan-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="space-y-1 max-w-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          {cta.title}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          {cta.description}
        </p>
        {cta.contactLine && (
          <span className="text-[10px] font-mono text-cyan-400 block pt-1">
            {cta.contactLine}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        <a
          href={cta.buttonUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:brightness-110 text-slate-950 font-black text-xs transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <span>{cta.buttonLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        {cta.secondaryLabel && (
          <a
            href={cta.secondaryUrl || '#'}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold transition cursor-pointer"
          >
            {cta.secondaryLabel}
          </a>
        )}
      </div>
    </div>
  );
}

// 8. INDEX ITEM (Item de Índice)
export function EditorialIndexItem({
  entry,
  onSelect,
}: {
  entry: IndexEntrySlot;
  onSelect?: () => void;
}) {
  return (
    <div 
      onClick={onSelect}
      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 transition cursor-pointer flex items-center justify-between gap-3 group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl font-black font-mono text-slate-600 group-hover:text-cyan-400 transition-colors w-9 shrink-0">
          {entry.indexNumber}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[9.5px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              {entry.pillarLabel}
            </span>
            {entry.readingTimeMinutes && (
              <span className="text-[9.5px] font-mono text-slate-500 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {entry.readingTimeMinutes} min
              </span>
            )}
          </div>
          <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition truncate mt-0.5">
            {entry.title}
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-white">
          Pág. 0{entry.targetPage}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition" />
      </div>
    </div>
  );
}

// 9. IMAGE SLOT (Área com proporção controlada e estado vazio geométrico)
export function EditorialImageSlot({
  imageData,
  className = '',
}: {
  imageData?: ImageSlotData;
  className?: string;
}) {
  if (imageData?.src) {
    return (
      <div className={`relative rounded-xl overflow-hidden border border-slate-800 shadow-xl ${className}`}>
        <Image
          src={imageData.src}
          alt={imageData.alt || 'Imagem Editorial'}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
        {imageData.caption && (
          <div className="absolute bottom-2 left-3 right-3 text-[9px] font-mono text-slate-300 truncate">
            {imageData.caption}
          </div>
        )}
      </div>
    );
  }

  // Estado Vazio: Composição Geométrica Abstrata (Nunca quebra o layout)
  return (
    <div className={`relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60 flex items-center justify-center p-4 text-center ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
      <div className="relative z-10 space-y-1">
        <Sparkles className="w-5 h-5 text-cyan-400/60 mx-auto" />
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
          Composição Gráfica Editorial
        </span>
      </div>
    </div>
  );
}

