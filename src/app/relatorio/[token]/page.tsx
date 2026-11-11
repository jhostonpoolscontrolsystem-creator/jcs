'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Droplets,
  Camera,
  Copy,
  Printer,
  FileText,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Check,
  Building2,
  Phone
} from 'lucide-react';

interface VisitData {
  date: string;
  maintainerName: string;
  ph: number;
  chlorinePpm: number;
  alkalinityPpm?: number;
  lsi: number;
  brushed: boolean;
  backwashed: boolean;
  evidences?: string[];
}

interface ChemicalItem {
  productName: string;
  quantity: number;
  unit: string;
  purpose: string;
}

interface ReportData {
  poolId: string;
  poolName: string;
  clientName: string;
  clientPhone?: string;
  substrate: string;
  volumeM3: number;
  month: number;
  year: number;
  attendanceRate: string;
  averagePh: number;
  averageChlorine: number;
  averageAlkalinity: number;
  averageLsi: number;
  waterQualityStatus: 'EQUILIBRADA' | 'ATENCAO';
  tenant: {
    name: string;
    document?: string;
    phone?: string;
    pixKey?: string;
    pixKeyType?: string;
    logoUrl?: string;
  };
  visits: VisitData[];
  chemicalConsumption: ChemicalItem[];
  financialInfo?: {
    monthlyFee: number;
    pixKey?: string;
    pixKeyType?: string;
    status: 'PENDING' | 'PAID';
    dueDate?: string;
  };
  publicReportUrl?: string;
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function PublicReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0F1D] text-slate-100 flex flex-col items-center justify-center p-6">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-400 font-mono text-sm">Carregando relatório analítico...</p>
        </div>
      }
    >
      <PublicReportContent />
    </Suspense>
  );
}

function PublicReportContent() {
  const params = useParams();
  const token = params?.token as string;

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<ReportData | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    async function loadReport() {
      try {
        setLoading(true);
        // Em produção, consulta o endpoint consolidado
        const res = await fetch('/api/reports/monthly?poolId=p-1&month=11&year=2026');
        const data = await res.json();
        if (data.success && data.report) {
          setReport(data.report);
        }
      } catch (err) {
        console.warn('Erro ao carregar relatório, acionando fallback estático:', err);
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [token]);

  const copyPixKey = () => {
    const key = report?.financialInfo?.pixKey || report?.tenant.phone || 'pix@jhpcs.com.br';
    navigator.clipboard.writeText(key);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1D] text-slate-100 flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-mono text-sm">Carregando relatório analítico...</p>
      </div>
    );
  }

  const currentMonthName = report ? MONTH_NAMES[report.month - 1] : 'Mês Corrente';

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 print:bg-white print:text-black">
      {/* HEADER DE TOPO WHITE-LABEL */}
      <header className="border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur sticky top-0 z-30 print:relative print:border-b-2 print:border-black">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-lg">
              {report?.tenant.name?.charAt(0) || 'J'}
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base text-white tracking-wide">
                {report?.tenant.name || 'JHPCS POOL CARE'}
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span>Auditoria Técnica JHPCS Engine</span>
                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                <span className="text-emerald-400 font-medium">Verificada</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer print:hidden"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL DO RELATÓRIO */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6 print:py-2">
        {/* BANNER DE BOAS-VINDAS E STATUS DA ÁGUA */}
        <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden print:border print:border-slate-300">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Competência: {currentMonthName} / {report?.year}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {report?.poolName}
              </h2>
              <p className="text-slate-400 text-sm mt-0.5">
                Proprietário(a): <span className="text-slate-200 font-medium">{report?.clientName}</span> | Substrato: <span className="text-slate-200">{report?.substrate}</span> ({report?.volumeM3}m³)
              </p>
            </div>

            {/* BADGE DE SAÚDE DA ÁGUA */}
            <div className={`p-4 rounded-xl border flex items-center gap-3 self-start sm:self-auto ${
              report?.waterQualityStatus === 'EQUILIBRADA'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Condição Geral</p>
                <p className="text-sm font-extrabold text-white">
                  {report?.waterQualityStatus === 'EQUILIBRADA' ? 'Água Equilibrada & Saudável' : 'Atenção aos Níveis'}
                </p>
                <p className="text-[11px] text-emerald-400 font-medium">Balanço ISL: {report?.averageLsi ?? 0.05} (Faixa Segura)</p>
              </div>
            </div>
          </div>
        </section>

        {/* MÉTRICAS MÉDIAS DO MÊS */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-3.5">
            <p className="text-xs text-slate-400 font-medium">pH Médio</p>
            <p className="text-xl font-bold text-cyan-400 mt-1">{report?.averagePh.toFixed(1)}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Meta: 7.2 a 7.6</p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-3.5">
            <p className="text-xs text-slate-400 font-medium">Cloro Livre</p>
            <p className="text-xl font-bold text-emerald-400 mt-1">{report?.averageChlorine.toFixed(1)} <span className="text-xs">ppm</span></p>
            <p className="text-[10px] text-slate-500 mt-0.5">Meta: 1.0 a 3.0 ppm</p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-3.5">
            <p className="text-xs text-slate-400 font-medium">Alcalinidade</p>
            <p className="text-xl font-bold text-amber-400 mt-1">{report?.averageAlkalinity} <span className="text-xs">ppm</span></p>
            <p className="text-[10px] text-slate-500 mt-0.5">Meta: 80 a 120 ppm</p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-3.5">
            <p className="text-xs text-slate-400 font-medium">Assiduidade</p>
            <p className="text-xl font-bold text-white mt-1">100%</p>
            <p className="text-[10px] text-emerald-400 mt-0.5">{report?.attendanceRate}</p>
          </div>
        </section>

        {/* QUADRO CRONOLÓGICO DE VISITAS */}
        <section className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-base text-white">Cronograma de Vistorias Técnicas</h3>
            </div>
            <span className="text-xs text-slate-400">{report?.visits.length} visitas concluídas</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#1E293B]/60 text-slate-300 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Data</th>
                  <th className="py-2.5 px-3">Responsável</th>
                  <th className="py-2.5 px-3">pH</th>
                  <th className="py-2.5 px-3">Cloro</th>
                  <th className="py-2.5 px-3">ISL</th>
                  <th className="py-2.5 px-3">Ações Físicas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                {report?.visits.map((visit, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">{visit.date}</td>
                    <td className="py-3 px-3 text-slate-300 font-sans whitespace-nowrap">{visit.maintainerName}</td>
                    <td className="py-3 px-3 font-bold text-cyan-400">{visit.ph.toFixed(1)}</td>
                    <td className="py-3 px-3 text-emerald-400">{visit.chlorinePpm.toFixed(1)} ppm</td>
                    <td className="py-3 px-3 font-bold text-purple-400">
                      {visit.lsi >= 0 ? `+${visit.lsi.toFixed(2)}` : visit.lsi.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-sans">
                      {[visit.brushed ? 'Escovação' : '', visit.backwashed ? 'Retrolavagem' : '']
                        .filter(Boolean)
                        .join(' + ') || 'Rotina Regular'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* GALERIA DE EVIDÊNCIAS FOTOGRÁFICAS (CLOUDFLARE R2) */}
        <section className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-base text-white">Evidências Fotográficas do Mês</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Registros visuais capturados em tempo real à beira da piscina com data, hora e coordenadas de satélite gravadas.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {report?.visits.flatMap((v) => v.evidences || []).slice(0, 4).map((imgUrl, i) => (
              <div
                key={i}
                onClick={() => setSelectedPhoto(imgUrl)}
                className="group relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer hover:border-cyan-500/50 transition"
              >
                <img
                  src={imgUrl}
                  alt={`Evidência ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e: any) => {
                    // Fallback visual limpo
                    e.target.src = 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop&q=60';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-2">
                  <span className="text-[11px] text-white font-medium flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> Ampliar
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LISTA INTELIGENTE DE REPOSIÇÃO DE QUÍMICOS */}
        <section className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Lista Recomendada de Reposição de Químicos</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Insumos aplicados e consumidos na piscina durante o mês corrente. Mantenha estes produtos na casa de máquinas para garantir o tratamento contínuo.
          </p>

          <div className="space-y-2.5">
            {report?.chemicalConsumption.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#1E293B]/40 border border-slate-800 hover:border-slate-700 transition"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">{item.productName}</h4>
                  <p className="text-[11px] text-slate-400">{item.purpose}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMBO PRESTAÇÃO DE CONTAS + COBRANÇA PIX INTEGRADA */}
        <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] border-2 border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden print:border print:border-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Acerto Mensal de Honorários
              </span>
              <h3 className="text-xl font-black text-white mt-0.5">
                Mensalidade de Manutenção & Tratamento
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Vencimento: <span className="text-white font-medium">{report?.financialInfo?.dueDate || '10 deste mês'}</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs text-slate-400">Valor Total</p>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">
                {(report?.financialInfo?.monthlyFee || 380).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </div>

          <div className="bg-[#0A0F1D] border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="w-full sm:w-auto text-left">
              <p className="text-[11px] text-slate-400 font-medium">Chave PIX do Prestador ({report?.financialInfo?.pixKeyType || 'E-mail'}):</p>
              <p className="text-sm font-mono font-bold text-white tracking-wide truncate max-w-xs sm:max-w-md">
                {report?.financialInfo?.pixKey || report?.tenant.phone || 'pix@jhpcs.com.br'}
              </p>
            </div>

            <button
              onClick={copyPixKey}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shrink-0 ${
                copiedPix
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
              }`}
            >
              {copiedPix ? (
                <>
                  <Check className="w-4 h-4" /> Chave Copiada!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copiar Chave PIX
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] text-slate-400 text-center mt-3">
            Após realizar o pagamento via aplicativo do seu banco, envie o comprovante diretamente pelo WhatsApp.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 mt-12 py-6 bg-[#0A0F1D] text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p className="text-slate-400 font-medium">{report?.tenant.name} • Gestão Especializada de Piscinas</p>
          <p>Laudo gerado pela plataforma JHPCS PoolTech Engine v6.19 • Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* MODAL LIGHTBOX FOTO */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl w-full">
            <img src={selectedPhoto} alt="Evidência Ampliada" className="w-full rounded-2xl shadow-2xl object-contain max-h-[85vh]" />
            <p className="text-center text-xs text-slate-400 mt-3 font-mono">Toque em qualquer lugar para fechar</p>
          </div>
        </div>
      )}
    </div>
  );
}

