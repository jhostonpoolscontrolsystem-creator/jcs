'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Send, 
  Building2, 
  Heart, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  RefreshCw, 
  ExternalLink,
  ChevronRight,
  Eye,
  FileCheck
} from 'lucide-react';

export function ClientMagazineApprovalPanel({ currentUserRole = 'DIRETORIA_JH' }: { currentUserRole?: string }) {
  const isDirectorOrMaster = currentUserRole === 'MASTER' || currentUserRole === 'DIRETORIA_JH';
  
  const [loading, setLoading] = useState(false);
  const [batch, setBatch] = useState<any>(null);
  const [recipients, setRecipients] = useState<any[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<'B2B_HOTEL' | 'B2C_FAMILIA'>('B2B_HOTEL');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchBatch = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/client-magazine/approval');
      const data = await res.json();
      if (data.batch) {
        setBatch(data.batch);
        setRecipients(data.recipientsPreview || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch();
  }, []);

  const handleApprove = async () => {
    setLoading(true);
    setFeedbackMsg(null);
    try {
      const res = await fetch('/api/client-magazine/approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'APPROVE', approvedBy: 'Diretoria Executiva JHoston Pools' })
      });
      const data = await res.json();
      if (data.success) {
        setBatch(data.batch);
        setFeedbackMsg({ text: 'Edição Homologada pela Diretoria! O botão de disparo para clientes foi liberado.', type: 'success' });
      }
    } catch (e) {
      setFeedbackMsg({ text: 'Falha ao registrar aprovação.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDispatch = async () => {
    if (!confirm('Confirmar o envio oficial da Revista para todos os clientes finais homologados via WhatsApp?')) return;
    setLoading(true);
    setFeedbackMsg(null);
    try {
      const res = await fetch('/api/client-magazine/approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'DISPATCH' })
      });
      const data = await res.json();
      if (data.success) {
        setBatch(data.batch);
        setFeedbackMsg({ text: `Disparo concluído com sucesso via Evolution API! (${data.message})`, type: 'success' });
      }
    } catch (e) {
      setFeedbackMsg({ text: 'Falha ao disparar mensagens.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              FLUXO EDITORIAL DE CLIENTES FINAIS
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Volume Nº {batch?.editionNumber || 1} • {batch?.editionMonth || 'Outubro'}/2026
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            Curadoria & Mesa de Aprovação da Diretoria
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Artigos segmentados por inteligência para B2B (Hotelaria / Lucro) e B2C (Família / Bem-Estar).
          </p>
        </div>

        <button
          onClick={fetchBatch}
          disabled={loading}
          className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Atualizar Lote</span>
        </button>
      </div>

      {feedbackMsg && (
        <div className={`p-4 rounded-xl border text-xs flex items-center gap-2.5 animate-in fade-in ${
          feedbackMsg.type === 'success' 
            ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' 
            : 'bg-rose-950/60 border-rose-800 text-rose-300'
        }`}>
          {feedbackMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
          <span className="font-medium">{feedbackMsg.text}</span>
        </div>
      )}

      {/* STATUS DO LOTE ATUAL */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 font-mono block uppercase">Status da Edição</span>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              batch?.status === 'APPROVED' ? 'bg-amber-400' : batch?.status === 'DISPATCHED' ? 'bg-emerald-400' : 'bg-sky-400 animate-pulse'
            }`} />
            <strong className="text-sm font-bold text-white">
              {batch?.status === 'PENDING_DIRECTOR_APPROVAL' && 'Aguardando Aprovação'}
              {batch?.status === 'APPROVED' && 'Homologado pela Diretoria'}
              {batch?.status === 'DISPATCHED' && 'Disparado aos Clientes'}
            </strong>
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            {batch?.status === 'APPROVED' ? `Aprovado por: ${batch?.approvedBy || 'Diretoria'}` : 'Necessita validação da JHoston'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 font-mono block uppercase">Segmento Hotelaria (B2B)</span>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <strong className="text-base font-black text-amber-400">{batch?.b2bCount || 8} Empreendimentos</strong>
          </div>
          <span className="text-[11px] text-slate-400 block">Resorts, Hotéis e Pousadas VIP</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 font-mono block uppercase">Segmento Família (B2C)</span>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-cyan-400" />
            <strong className="text-base font-black text-cyan-400">{batch?.b2cCount || 16} Residências</strong>
          </div>
          <span className="text-[11px] text-slate-400 block">Casas de Praia e Condomínios</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <span className="text-[10px] text-slate-500 font-mono block uppercase">Ação da Diretoria</span>
          {batch?.status === 'PENDING_DIRECTOR_APPROVAL' ? (
            <button
              onClick={handleApprove}
              disabled={loading || !isDirectorOrMaster}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-[1.02] transition cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Aprovar Edição</span>
            </button>
          ) : batch?.status === 'APPROVED' ? (
            <button
              onClick={handleDispatch}
              disabled={loading || !isDirectorOrMaster}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 hover:scale-[1.02] transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Disparar WhatsApp</span>
            </button>
          ) : (
            <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Edição Entregue com Sucesso</span>
            </div>
          )}
        </div>
      </div>

      {/* SELETOR DE PREVIEW EDITORIAL: B2B VS B2C */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Pré-visualização Editorial por Persona
            </h3>
            <p className="text-xs text-slate-400">
              Veja exatamente o que cada perfil de cliente receberá em seu exemplar oficial.
            </p>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setSelectedPersona('B2B_HOTEL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedPersona === 'B2B_HOTEL'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              B2B: Hotelaria & Resorts
            </button>
            <button
              onClick={() => setSelectedPersona('B2C_FAMILIA')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedPersona === 'B2C_FAMILIA'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              B2C: Família & Lazer
            </button>
          </div>
        </div>

        {/* CONTEÚDO EDITORIAL EM DESTAQUE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Card Esquerdo: Pautas de Curadoria */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
              PAUTAS HOMOLOGADAS NESTE EXEMPLAR
            </span>

            {selectedPersona === 'B2B_HOTEL' ? (
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                  <strong className="text-white block text-sm">A Piscina de Areia como Fator Decisivo na Diária Média (ADR)</strong>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Pesquisas de turismo de luxo mostram que piscinas com estética de praia elevam em até 27% a taxa de conversão direta de reservas.
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-[10px] font-bold">
                    Métrica: +27% de Conversão em Reservas
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                  <strong className="text-white block text-sm">Impacto nas Avaliações 5 Estrelas no TripAdvisor</strong>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Toque de seda nos cristais minerais e zero odor de cloro são elogiados espontaneamente por hóspedes exigentes.
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono text-[10px] font-bold">
                    Métrica: 4.9/5 Nota Média de Hospitalidade
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                  <strong className="text-white block text-sm">A Convivência em Família e o Estímulo à Saúde das Crianças</strong>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Água em equilíbrio LSI protege a pele e os olhos sensíveis das crianças, tornando as brincadeiras diárias livres de ardor.
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono text-[10px] font-bold">
                    Métrica: 100% Amigável a Peles Sensíveis
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                  <strong className="text-white block text-sm">O Conforto da Praia Privativa no Quintal de Casa</strong>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Entrada em rampa suave com acessibilidade total para crianças e idosos curtirem com máxima tranquilidade.
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono text-[10px] font-bold">
                    Métrica: 10 Anos de Garantia Decenal Ativa
                  </span>
                </div>
              </div>
            )}

            <div className="pt-2">
              <a
                href={selectedPersona === 'B2B_HOTEL' 
                  ? '/api/pdf/client-magazine?poolId=p-1&clientType=B2B_HOTEL' 
                  : '/api/pdf/client-magazine?poolId=p-3&clientType=B2C_FAMILIA'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar PDF Demonstrativo da Persona ({selectedPersona === 'B2B_HOTEL' ? 'Hotel' : 'Família'})</span>
                <ExternalLink className="w-3 h-3 text-slate-500 ml-1" />
              </a>
            </div>
          </div>

          {/* Card Direito: Destinatários Homologados na Fila */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                DESTINATÁRIOS PRÉ-CONFIGURADOS NO LOTE
              </span>
              <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded font-mono">
                {recipients.length} Ativos
              </span>
            </div>

            <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
              {recipients.map((rec) => (
                <div key={rec.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      {rec.type === 'B2B_HOTEL' ? <Building2 className="w-3.5 h-3.5 text-amber-400" /> : <Heart className="w-3.5 h-3.5 text-cyan-400" />}
                      <span>{rec.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{rec.poolName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{rec.phone}</div>
                  </div>

                  <a
                    href={rec.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-950 rounded-lg border border-slate-800 transition cursor-pointer"
                    title="Visualizar PDF"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClientMagazineApprovalPanel;
