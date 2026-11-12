'use client';

import React, { useState } from 'react';
import { EditorialPageSlotData } from './editorialSchema';
import { 
  CoverPageTemplate, 
  IndexPageTemplate, 
  ArticlePageTemplate, 
  ComparisonPageTemplate, 
  TablePageTemplate, 
  ClosingPageTemplate 
} from './templates/EditorialPageTemplates';
import { 
  Printer, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  FileDown, 
  Maximize2 
} from 'lucide-react';
import '@/styles/editorial/editorialTokens.css';

interface EditorialDocumentProps {
  pages: EditorialPageSlotData[];
  onShare?: () => void;
  pdfDownloadUrl?: string;
}

export function EditorialDocument({
  pages,
  onShare,
  pdfDownloadUrl = '/api/pdf/magazine-edition',
}: EditorialDocumentProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleNavigate = (pageNumber: number) => {
    const idx = pages.findIndex(p => p.pageNumber === pageNumber);
    if (idx !== -1) {
      setCurrentPageIndex(idx);
      const element = document.getElementById(`a4-page-${pageNumber}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderTemplate = (pageData: EditorialPageSlotData) => {
    switch (pageData.type) {
      case 'cover':
        return <CoverPageTemplate data={pageData} onNavigatePage={handleNavigate} />;
      case 'index':
        return <IndexPageTemplate data={pageData} onNavigatePage={handleNavigate} />;
      case 'article':
        return <ArticlePageTemplate data={pageData} />;
      case 'comparison':
        return <ComparisonPageTemplate data={pageData} />;
      case 'table':
        return <TablePageTemplate data={pageData} />;
      case 'closing':
        return <ClosingPageTemplate data={pageData} />;
      default:
        return <ArticlePageTemplate data={pageData} />;
    }
  };

  return (
    <div className="editorial-document-viewport">
      
      {/* BARRA DE FERRAMENTAS FLUTUANTE (SOMENTE DIGITAL - NÃO IMPRIME) */}
      <div className="editorial-no-print sticky top-4 z-50 mb-6 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl flex items-center gap-2">
        <div className="flex items-center gap-1 border-r border-slate-800 pr-2">
          <button
            type="button"
            onClick={() => {
              if (currentPageIndex > 0) {
                handleNavigate(pages[currentPageIndex - 1].pageNumber);
              }
            }}
            disabled={currentPageIndex === 0}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
            title="Página Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold text-slate-300 px-2">
            Página <strong className="text-cyan-400">{currentPageIndex + 1}</strong> de {pages.length}
          </span>

          <button
            type="button"
            onClick={() => {
              if (currentPageIndex < pages.length - 1) {
                handleNavigate(pages[currentPageIndex + 1].pageNumber);
              }
            }}
            disabled={currentPageIndex === pages.length - 1}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
            title="Próxima Página"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-cyan-400" />
          <span>Imprimir A4</span>
        </button>

        <a
          href={pdfDownloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-xs font-black text-slate-950 transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span>Baixar PDF</span>
        </a>

        {onShare && (
          <button
            type="button"
            onClick={onShare}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Compartilhar Link"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
          </button>
        )}
      </div>

      {/* RENDERIZAÇÃO DAS PÁGINAS EM FORMATO A4 RETRATO */}
      <div className="w-full flex flex-col items-center">
        {pages.map((pageData, index) => (
          <div 
            key={pageData.pageNumber} 
            id={`a4-page-${pageData.pageNumber}`}
            className="a4-page-sheet"
            onMouseEnter={() => setCurrentPageIndex(index)}
          >
            {renderTemplate(pageData)}
          </div>
        ))}
      </div>

    </div>
  );
}

