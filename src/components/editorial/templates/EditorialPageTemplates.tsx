'use client';

import React from 'react';
import { EditorialFrame, PageHeader, PageFooter, SectionLabel } from '../EditorialBaseComponents';
import { 
  MetricCard, 
  AuditTrailPanel, 
  EditorialColumns, 
  ComparisonPanel, 
  EditorialDataTable, 
  TechnicalCallout, 
  EditorialCTAPanel, 
  EditorialIndexItem, 
  EditorialImageSlot 
} from '../EditorialContentComponents';
import { EditorialPageSlotData } from '../editorialSchema';
import { Sparkles, Activity, ShieldCheck, Database, Layers } from 'lucide-react';

// =============================================================================
// TEMPLATE 1: CAPA PREMIUM DATA-DRIVEN
// =============================================================================
export function CoverPageTemplate({
  data,
  onNavigatePage,
}: {
  data: EditorialPageSlotData;
  onNavigatePage?: (pageNum: number) => void;
}) {
  return (
    <EditorialFrame accent="cyan" secondaryAccent="amber">
      {/* Topo da Capa */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-cyan-300 tracking-widest uppercase">
              {data.editionLabel}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider uppercase">
            {data.editionDate}
          </span>
        </div>

        {/* Masthead */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-none">
            {data.publicationTitle}
          </h1>
          {data.subtitle && (
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              {data.subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Meio da Capa: Imagem Hero + Manchete Principal */}
      <div className="my-auto space-y-4">
        {data.image && (
          <EditorialImageSlot imageData={data.image} className="h-44 sm:h-52 w-full" />
        )}

        <div className="space-y-2">
          {data.eyebrow && (
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
              {data.eyebrow}
            </span>
          )}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {data.title}
          </h2>
          {data.editorLetter && (
            <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-amber-400 pl-3">
              &ldquo;{data.editorLetter}&rdquo;
            </p>
          )}
        </div>

        {/* Grid de Métricas da Capa */}
        {data.metrics && data.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {data.metrics.map((m, idx) => (
              <MetricCard key={idx} metric={m} />
            ))}
          </div>
        )}
      </div>

      {/* Rodapé da Capa */}
      <PageFooter
        organizationLabel={data.organizationLabel}
        contactLabel={data.contactLabel}
        pageNumber={data.pageNumber}
        totalPages={data.totalPages}
      />
    </EditorialFrame>
  );
}

// =============================================================================
// TEMPLATE 2: ÍNDICE EDITORIAL INTELIGENTE
// =============================================================================
export function IndexPageTemplate({
  data,
  onNavigatePage,
}: {
  data: EditorialPageSlotData;
  onNavigatePage?: (pageNum: number) => void;
}) {
  return (
    <EditorialFrame accent="cyan" secondaryAccent="slate">
      <PageHeader
        publicationLabel={data.publicationTitle}
        editionLabel={data.editionLabel}
        sectionLabel={data.sectionLabel || 'Índice Editorial'}
        accent="cyan"
      />

      <div className="my-auto space-y-4">
        <div className="space-y-1">
          <SectionLabel label="Estrutura de Conteúdo" accent="cyan" />
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {data.title || 'Cadernos e Matérias da Edição'}
          </h2>
          {data.subtitle && (
            <p className="text-xs text-slate-400 leading-relaxed">{data.subtitle}</p>
          )}
        </div>

        {/* Lista de Matérias do Índice */}
        <div className="space-y-2.5">
          {data.indexEntries?.map((entry, idx) => (
            <EditorialIndexItem 
              key={idx} 
              entry={entry} 
              onSelect={() => onNavigatePage && onNavigatePage(entry.targetPage)} 
            />
          ))}
        </div>

        {/* Carta / Contexto Técnico */}
        {data.editorLetter && (
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
              Parecer Institucional:
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed italic">
              &ldquo;{data.editorLetter}&rdquo;
            </p>
          </div>
        )}
      </div>

      <PageFooter
        organizationLabel={data.organizationLabel}
        contactLabel={data.contactLabel}
        pageNumber={data.pageNumber}
        totalPages={data.totalPages}
      />
    </EditorialFrame>
  );
}

// =============================================================================
// TEMPLATE 3: MATÉRIA TÉCNICA COM AUDITORIA
// =============================================================================
export function ArticlePageTemplate({
  data,
}: {
  data: EditorialPageSlotData;
}) {
  return (
    <EditorialFrame accent={data.sectionAccent || 'emerald'} secondaryAccent="slate">
      <PageHeader
        publicationLabel={data.publicationTitle}
        editionLabel={data.editionLabel}
        sectionLabel={data.sectionLabel || 'Matéria Técnica'}
        accent={data.sectionAccent || 'emerald'}
      />

      <div className="space-y-3.5 my-auto">
        <div className="space-y-1">
          <SectionLabel label={data.sectionLabel || 'Engenharia Química'} accent={data.sectionAccent || 'emerald'} />
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-xs text-slate-400 leading-relaxed">{data.subtitle}</p>
          )}
        </div>

        {/* Imagem de Apoio */}
        {data.image && (
          <EditorialImageSlot imageData={data.image} className="h-40 sm:h-44 w-full" />
        )}

        {/* Trilha de Auditoria */}
        {data.auditItems && data.auditItems.length > 0 && (
          <AuditTrailPanel items={data.auditItems} />
        )}

        {/* Colunas de Texto */}
        <EditorialColumns paragraphs={data.bodyParagraphs} columns={2} />

        {/* Conclusões ou Parecer */}
        {data.quote && (
          <TechnicalCallout text={data.quote.text} title={data.quote.authorTitle} accent="green" />
        )}
      </div>

      <PageFooter
        organizationLabel={data.organizationLabel}
        contactLabel={data.contactLabel}
        pageNumber={data.pageNumber}
        totalPages={data.totalPages}
      />
    </EditorialFrame>
  );
}

// =============================================================================
// TEMPLATE 4: COMPARAÇÃO E EFICIÊNCIA
// =============================================================================
export function ComparisonPageTemplate({
  data,
}: {
  data: EditorialPageSlotData;
}) {
  return (
    <EditorialFrame accent="cyan" secondaryAccent="amber">
      <PageHeader
        publicationLabel={data.publicationTitle}
        editionLabel={data.editionLabel}
        sectionLabel={data.sectionLabel || 'Comparativo & Eficiência'}
        accent="cyan"
      />

      <div className="space-y-4 my-auto">
        <div className="space-y-1">
          <SectionLabel label={data.sectionLabel || 'Engenharia de Materiais'} accent="cyan" />
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-xs text-slate-400 leading-relaxed">{data.subtitle}</p>
          )}
        </div>

        {/* Painel de Comparação */}
        {data.comparisonItems && (
          <ComparisonPanel items={data.comparisonItems} />
        )}

        {/* Texto Editorial de Apoio */}
        <EditorialColumns paragraphs={data.bodyParagraphs} columns={2} />

        {/* Métricas de Economia */}
        {data.metrics && data.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {data.metrics.map((m, idx) => (
              <MetricCard key={idx} metric={m} />
            ))}
          </div>
        )}
      </div>

      <PageFooter
        organizationLabel={data.organizationLabel}
        contactLabel={data.contactLabel}
        pageNumber={data.pageNumber}
        totalPages={data.totalPages}
      />
    </EditorialFrame>
  );
}

// =============================================================================
// TEMPLATE 5: TABELA TÉCNICA E DIMENSIONAMENTO
// =============================================================================
export function TablePageTemplate({
  data,
}: {
  data: EditorialPageSlotData;
}) {
  return (
    <EditorialFrame accent="cyan" secondaryAccent="green">
      <PageHeader
        publicationLabel={data.publicationTitle}
        editionLabel={data.editionLabel}
        sectionLabel={data.sectionLabel || 'Tabela Técnica'}
        accent="cyan"
      />

      <div className="space-y-4 my-auto">
        <div className="space-y-1">
          <SectionLabel label={data.sectionLabel || 'Dimensionamento Hidráulico'} accent="cyan" />
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-xs text-slate-400 leading-relaxed">{data.subtitle}</p>
          )}
        </div>

        {/* Tabela Técnica */}
        <EditorialDataTable columns={data.tableColumns} rows={data.tableRows} />

        {/* Texto Explicativo */}
        <EditorialColumns paragraphs={data.bodyParagraphs} columns={2} />

        {/* CTA Integrado */}
        {data.cta && (
          <EditorialCTAPanel cta={data.cta} />
        )}
      </div>

      <PageFooter
        organizationLabel={data.organizationLabel}
        contactLabel={data.contactLabel}
        pageNumber={data.pageNumber}
        totalPages={data.totalPages}
      />
    </EditorialFrame>
  );
}

// =============================================================================
// TEMPLATE 6: ENCERRAMENTO INSTITUCIONAL & CONTATO
// =============================================================================
export function ClosingPageTemplate({
  data,
}: {
  data: EditorialPageSlotData;
}) {
  return (
    <EditorialFrame accent="amber" secondaryAccent="cyan">
      <PageHeader
        publicationLabel={data.publicationTitle}
        editionLabel={data.editionLabel}
        sectionLabel={data.sectionLabel || 'Encerramento'}
        accent="amber"
      />

      <div className="space-y-5 my-auto max-w-2xl mx-auto text-center">
        <div className="space-y-2">
          <SectionLabel label="Compromisso Técnico" accent="amber" />
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{data.subtitle}</p>
          )}
        </div>

        {data.editorLetter && (
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
            <p className="text-xs text-slate-300 leading-relaxed italic">
              &ldquo;{data.editorLetter}&rdquo;
            </p>
          </div>
        )}

        {/* Chamada para Ação */}
        {data.cta && (
          <div className="text-left">
            <EditorialCTAPanel cta={data.cta} />
          </div>
        )}
      </div>

      <PageFooter
        organizationLabel={data.organizationLabel}
        contactLabel={data.contactLabel}
        pageNumber={data.pageNumber}
        totalPages={data.totalPages}
      />
    </EditorialFrame>
  );
}

