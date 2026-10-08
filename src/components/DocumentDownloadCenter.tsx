'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  FileDown, 
  Eye, 
  FileSpreadsheet, 
  BookOpen, 
  Sparkles,
  Users,
  Smartphone,
  AlertTriangle
} from 'lucide-react';
import { UserRole } from '@/types/database';

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  category: 'MANUAL' | 'ROTEIRO_ESTRESSE' | 'CERTIFICADO' | 'CONTRATO';
  format: 'PDF' | 'MD' | 'OFICIAL';
  version: string;
  targetRoles: UserRole[];
  downloadFileName: string;
  contentMarkdownPath?: string;
  badge: string;
  badgeColor: string;
}

interface DocumentDownloadCenterProps {
  currentUserRole?: UserRole;
}

export function DocumentDownloadCenter({ currentUserRole = 'MASTER' }: DocumentDownloadCenterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Catálogo completo de documentos oficiais com controle rigoroso de acesso (RBAC)
  const allDocuments: DocumentItem[] = [
    {
      id: 'doc-manual-master',
      title: 'Manual do Usuário Master (Soberano)',
      description: 'Diretrizes supremas de governança, aprovação de contas, supervisão da Evolution API e auditoria de contratos.',
      category: 'MANUAL',
      format: 'PDF',
      version: 'v2.4 - Out/2026',
      targetRoles: ['MASTER'],
      downloadFileName: 'MANUAL_USUARIO_MASTER.pdf',
      badge: 'Exclusivo Master',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
    },
    {
      id: 'doc-manual-jhoston',
      title: 'Manual do Usuário JHoston Pools (Diretoria & Engenharia)',
      description: 'Guia prático para triagem técnica na Fila Kanban, motor de cálculo LSI, cadastro com geocodificação e laudos periciais.',
      category: 'MANUAL',
      format: 'PDF',
      version: 'v2.4 - Out/2026',
      targetRoles: ['MASTER', 'DIRETORIA_JH', 'TECNICO_JH'],
      downloadFileName: 'MANUAL_USUARIO_JHOSTON_POOLS.pdf',
      badge: 'Corpo Técnico JH',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
    },
    {
      id: 'doc-manual-cliente',
      title: 'Manual do Usuário Cliente Final (Resorts, Hotéis & Condomínios)',
      description: 'Navegação no Portal do Cliente (Digital Twin), certificado de garantia de 10 anos, previsão meteorológica e runway de insumos.',
      category: 'MANUAL',
      format: 'PDF',
      version: 'v2.4 - Out/2026',
      targetRoles: ['MASTER', 'DIRETORIA_JH', 'GERENCIA_CLI', 'TECNICO_CLI'],
      downloadFileName: 'MANUAL_USUARIO_CLIENTE_FINAL.pdf',
      badge: 'Clientes & Síndicos',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    },
    {
      id: 'doc-manual-piscineiro',
      title: 'Manual do Usuário Piscineiro / Tratador de Campo (PWA)',
      description: 'Instalação em 1 toque na tela inicial do celular, login com CPF e PIN, rotina de coleta com câmera WebP e operação 100% offline.',
      category: 'MANUAL',
      format: 'PDF',
      version: 'v2.4 - Out/2026',
      targetRoles: ['MASTER', 'DIRETORIA_JH', 'TECNICO_JH', 'GERENCIA_CLI', 'TECNICO_CLI', 'PISCINEIRO'],
      downloadFileName: 'MANUAL_USUARIO_PISCINEIRO.pdf',
      badge: 'Tratadores de Campo',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
    },
    {
      id: 'doc-estresse-jhoston',
      title: 'Roteiro de Testes de Estresse Técnico (Diretoria JHoston Pools)',
      description: 'Exercícios de simulação extrema: ataque ácido súbito (pH 6.2), tentativa de uso de ácido muriático proibido e blecaute de rede.',
      category: 'ROTEIRO_ESTRESSE',
      format: 'PDF',
      version: 'v2.0 - Homologação',
      targetRoles: ['MASTER', 'DIRETORIA_JH', 'TECNICO_JH'],
      downloadFileName: 'ROTEIRO_TESTES_ESTRESSE_JHOSTON.pdf',
      badge: 'Auditoria & Estresse',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
    },
    {
      id: 'doc-estresse-cliente',
      title: 'Roteiro de Testes de Estresse do Cliente Final (Resorts & Condomínios)',
      description: 'Validação da detecção de desvios químicos em tempo real, auditoria de presença do tratador por GPS e laudo de garantia.',
      category: 'ROTEIRO_ESTRESSE',
      format: 'PDF',
      version: 'v1.0 - Executivo',
      targetRoles: ['MASTER', 'DIRETORIA_JH', 'GERENCIA_CLI', 'TECNICO_CLI'],
      downloadFileName: 'ROTEIRO_TESTES_ESTRESSE_CLIENTE.pdf',
      badge: 'Validação Cliente',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
    },
    {
      id: 'doc-usuarios-liberados',
      title: 'Relação Oficial de Usuários Liberados & Credenciais de Acesso',
      description: 'Mapeamento hierárquico oficial com logins ativos, níveis de privilégio RBAC, regras de primeiro acesso e senhas padrão.',
      category: 'CONTRATO',
      format: 'OFICIAL',
      version: 'v1.0 - Confidencial',
      targetRoles: ['MASTER'],
      downloadFileName: 'USUARIOS_LIBERADOS.pdf',
      badge: 'Ultra Confidencial',
      badgeColor: 'bg-red-950 text-red-300 border-red-800',
    },
    {
      id: 'doc-laudo-mensal-template',
      title: 'Certificado Modelo de Garantia Monolítica JHostonTec (10 Anos)',
      description: 'Atestado de conformidade físico-química com selo digital e validade jurídica para seguro patrimonial e convenções.',
      category: 'CERTIFICADO',
      format: 'PDF',
      version: 'v3.1 - Jurídico',
      targetRoles: ['MASTER', 'DIRETORIA_JH', 'GERENCIA_CLI', 'TECNICO_CLI'],
      downloadFileName: 'CERTIFICADO_GARANTIA_JHOSTONTEC.pdf',
      badge: 'Garantia Jurídica',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    },
  ];

  // Filtra documentos de acordo com o nível do usuário logado (RBAC)
  const accessibleDocuments = allDocuments.filter(doc => 
    doc.targetRoles.includes(currentUserRole)
  );

  const filteredDocuments = accessibleDocuments.filter(doc => {
    if (selectedCategory === 'TODOS') return true;
    return doc.category === selectedCategory;
  });

  const handleDownload = (doc: DocumentItem) => {
    setDownloadingId(doc.id);

    setTimeout(() => {
      // Simula a geração e download seguro de arquivo
      const element = document.createElement('a');
      const sampleContent = `# ${doc.title}\n\n${doc.description}\n\nVersão: ${doc.version}\nClassificação: ${doc.badge}\nEmitido em: ${new Date().toLocaleDateString('pt-BR')}\nJHoston Pools Control System (JHPCS)`;
      const file = new Blob([sampleContent], { type: 'text/markdown' });
      element.href = URL.createObjectURL(file);
      element.download = doc.downloadFileName.replace('.pdf', '.md');
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadingId(null);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner da Central de Downloads */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-wrap justify-between items-center gap-6 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[11px] font-bold tracking-wide flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              CENTRAL OFICIAL DE DOWNLOADS & DOCUMENTAÇÃO
            </span>
            <span className="text-xs text-slate-400">Restrito por RBAC</span>
          </div>
          <h2 className="text-2xl font-black text-white">Documentos, Manuais e Roteiros de Estresse</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Acesso seguro e restrito a manuais operacionais, roteiros periciais de estresse, certificados de garantia e documentação oficial da JHoston Pools.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800">
          <Lock className="w-4 h-4 text-cyan-400" />
          <div className="text-xs">
            <span className="text-slate-400 block text-[10px]">Nível Autenticado:</span>
            <span className="font-bold text-white uppercase">{currentUserRole}</span>
          </div>
        </div>
      </div>

      {/* Barra de Filtros por Categoria */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        {[
          { key: 'TODOS', label: 'Todos os Documentos' },
          { key: 'MANUAL', label: 'Manuais de Usuários' },
          { key: 'ROTEIRO_ESTRESSE', label: 'Roteiros de Testes (Estresse)' },
          { key: 'CERTIFICADO', label: 'Certificados & Laudos' },
          { key: 'CONTRATO', label: 'Credenciais & Governança' },
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-850'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grade de Documentos Disponíveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocuments.map((doc) => (
          <div 
            key={doc.id}
            className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all hover:shadow-xl hover:shadow-cyan-950/20 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${doc.badgeColor}`}>
                  {doc.badge}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {doc.version}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <FileDown className="w-3.5 h-3.5 text-cyan-400" />
                <span>Formato: <strong className="text-slate-200">{doc.format}</strong></span>
              </div>

              <button
                onClick={() => handleDownload(doc)}
                disabled={downloadingId === doc.id}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:opacity-90 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
              >
                {downloadingId === doc.id ? (
                  <span>Baixando...</span>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar Arquivo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Aviso de Segurança e Sigilo */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <p>
          Os documentos disponibilizados nesta central contêm metodologias proprietárias da <strong>JHostonTec</strong> e regras de garantia protegidas por direito autoral. O compartilhamento externo sem autorização é estritamente proibido.
        </p>
      </div>
    </div>
  );
}
