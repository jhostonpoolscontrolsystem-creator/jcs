'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Copy, 
  Send, 
  Plus, 
  Filter, 
  FileText, 
  ArrowLeft,
  ShieldCheck,
  Building2,
  Lock,
  Wallet
} from 'lucide-react';
import { ModuleGate, useModuleAccess } from '@/lib/licensing/moduleGuard';

export default function FinancialDashboardPage() {
  const [activeSubTab, setActiveSubTab] = useState<'recurring' | 'commissions' | 'cashflow'>('recurring');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PAID' | 'PENDING' | 'OVERDUE'>('ALL');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedPixId, setCopiedPixId] = useState<string | null>(null);
  const [commissionPaidMsg, setCommissionPaidMsg] = useState<string | null>(null);

  // Permissões modulares dos 3 pilares financeiros
  const hasRecurring = useModuleAccess('fin_recurring');
  const hasCommissions = useModuleAccess('fin_commissions');
  const hasCashflow = useModuleAccess('fin_cashflow');

  useEffect(() => {
    async function loadFinances() {
      setLoading(true);
      try {
        const res = await fetch('/api/financial/overview?tenant_id=demo-fleet&tier_id=fleet');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadFinances();
  }, []);

  const handleCopyPix = (id: string, clientName: string, amount: number) => {
    const pixKey = data?.pix_key_configured || 'financeiro@jhpcs.com.br';
    const fakeCopyPaste = `00020126580014br.gov.bcb.pix0136${pixKey}520400005303986540${amount.toFixed(2)}5802BR5920JHhoston Pools6009Sao Paulo62070503***6304`;
    navigator.clipboard.writeText(fakeCopyPaste);
    setCopiedPixId(id);
    setTimeout(() => setCopiedPixId(null), 2500);
  };

  const handleSendWhatsAppReminder = (client: any) => {
    const pixKey = data?.pix_key_configured || 'Chave PIX da Empresa';
    const message = `Olá, ${client.client_name}! Lembramos que a sua mensalidade de manutenção da piscina (R$ ${client.monthly_fee.toFixed(2)}) vence no dia ${client.billing_day}. Chave PIX: ${pixKey}. Obrigado pela parceria!`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleMarkCommissionPaid = (techId: string, techName: string) => {
    setCommissionPaidMsg(`✓ Comissão de ${techName} marcada como paga com sucesso!`);
    setTimeout(() => setCommissionPaidMsg(null), 3000);
  };

  // Cálculos de Indicadores
  const totalReceivables = data?.contracts?.reduce((acc: number, c: any) => acc + c.monthly_fee, 0) || 2350;
  const totalPaid = data?.entries?.filter((e: any) => e.entry_type === 'RECEITA' && e.payment_status === 'PAID')
    .reduce((acc: number, e: any) => acc + e.amount, 0) || 1580;
  const totalPending = data?.entries?.filter((e: any) => e.entry_type === 'RECEITA' && e.payment_status === 'PENDING')
    .reduce((acc: number, e: any) => acc + e.amount, 0) || 320;
  const totalOverdue = data?.entries?.filter((e: any) => e.entry_type === 'RECEITA' && e.payment_status === 'OVERDUE')
    .reduce((acc: number, e: any) => acc + e.amount, 0) || 450;

  const totalExpenses = data?.entries?.filter((e: any) => e.entry_type === 'DESPESA')
    .reduce((acc: number, e: any) => acc + e.amount, 0) || 2050;
  const netBalance = totalPaid - totalExpenses;

  // Filtro de Contratos
  const filteredContracts = (data?.contracts || []).filter((c: any) => {
    if (filterStatus === 'ALL') return true;
    const entry = data?.entries?.find((e: any) => e.description.includes(c.client_name.split(' ')[0]));
    if (filterStatus === 'PAID') return entry?.payment_status === 'PAID';
    if (filterStatus === 'PENDING') return entry?.payment_status === 'PENDING';
    if (filterStatus === 'OVERDUE') return entry?.payment_status === 'OVERDUE';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition"
              title="Voltar ao Painel"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-black flex items-center gap-1 uppercase tracking-wider">
                  <Wallet className="w-3.5 h-3.5" /> JHPCS Financeiro
                </span>
                <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-0.5 rounded-full border border-sky-500/20 font-semibold">
                  Gestão & Cobrança Recorrente
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
                Contratos, Mensalidades & Fluxo de Caixa
              </h1>
              <p className="text-xs md:text-sm text-slate-400">
                Gestão simplificada de faturamento direto via PIX sem taxas de intermediação
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/configuracoes"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition"
            >
              Chave PIX & Regras
            </Link>
          </div>
        </div>

        {commissionPaidMsg && (
          <div className="p-4 rounded-xl border border-emerald-800 bg-emerald-950/40 text-emerald-300 text-xs font-bold animate-fadeIn">
            {commissionPaidMsg}
          </div>
        )}

        {/* 4 Cards de Métricas Rápidas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Previsto no Mês</span>
            <div className="text-2xl font-black text-white font-mono">
              R$ {totalReceivables.toFixed(2).replace('.', ',')}
            </div>
            <span className="text-[10px] text-slate-500 font-semibold">Contratos Ativos</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recebido (PIX / Dinheiro)</span>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              R$ {totalPaid.toFixed(2).replace('.', ',')}
            </div>
            <span className="text-[10px] text-emerald-500/80 font-bold">Liquidado em Conta</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Em Aberto (A Vencer)</span>
            <div className="text-2xl font-black text-amber-400 font-mono">
              R$ {totalPending.toFixed(2).replace('.', ',')}
            </div>
            <span className="text-[10px] text-amber-500/80 font-bold">Aguardando Pagamento</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Inadimplência</span>
            <div className="text-2xl font-black text-rose-400 font-mono">
              R$ {totalOverdue.toFixed(2).replace('.', ',')}
            </div>
            <span className="text-[10px] text-rose-500/80 font-bold">Vencidos sem Baixa</span>
          </div>
        </div>

        {/* Abas Condicionais por Módulo Contratado */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          {hasRecurring.hasAccess !== false && (
            <button
              onClick={() => setActiveSubTab('recurring')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeSubTab === 'recurring'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              Mensalidades & Cobrança
            </button>
          )}

          {hasCommissions.hasAccess !== false && (
            <button
              onClick={() => setActiveSubTab('commissions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeSubTab === 'commissions'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              Comissões da Equipe
            </button>
          )}

          {hasCashflow.hasAccess !== false && (
            <button
              onClick={() => setActiveSubTab('cashflow')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeSubTab === 'cashflow'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              Fluxo de Caixa & Contas
            </button>
          )}
        </div>

        {/* ABA 1: MENSALIDADES & COBRANÇA */}
        {activeSubTab === 'recurring' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold">Filtrar:</span>
                {(['ALL', 'PAID', 'PENDING', 'OVERDUE'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      filterStatus === s
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {s === 'ALL' ? 'Todos' : s === 'PAID' ? 'Pagos' : s === 'PENDING' ? 'Pendentes' : 'Atrasados'}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400">
                Chave PIX de Recebimento: <strong className="text-emerald-400 font-mono">{data?.pix_key_configured}</strong>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Cliente / Piscina</th>
                    <th className="py-3 px-4">Telefone (LGPD)</th>
                    <th className="py-3 px-4">Dia Venc.</th>
                    <th className="py-3 px-4">Valor Mensal</th>
                    <th className="py-3 px-4">Técnico Resp.</th>
                    <th className="py-3 px-4 text-center">Ações Rápidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredContracts.map((c: any) => (
                    <tr key={c.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 px-4 text-white font-bold">{c.client_name}</td>
                      <td className="py-3 px-4 text-slate-400 font-mono">{c.client_phone_masked}</td>
                      <td className="py-3 px-4 text-slate-300">Dia {c.billing_day}</td>
                      <td className="py-3 px-4 text-emerald-400 font-mono font-bold">
                        R$ {c.monthly_fee.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="py-3 px-4 text-slate-400">{c.assigned_technician_name || 'Geral'}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleCopyPix(c.id, c.client_name, c.monthly_fee)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[11px] font-bold border border-slate-700 flex items-center gap-1 transition"
                            title="Copiar Código PIX"
                          >
                            <Copy className="w-3 h-3 text-emerald-400" />
                            {copiedPixId === c.id ? 'Copiado!' : 'PIX'}
                          </button>
                          <button
                            onClick={() => handleSendWhatsAppReminder(c)}
                            className="px-2.5 py-1 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 rounded-lg text-[11px] font-bold border border-emerald-800/80 flex items-center gap-1 transition"
                            title="Lembrar no WhatsApp"
                          >
                            <Send className="w-3 h-3 text-emerald-400" /> WhatsApp
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA 2: COMISSÕES DA EQUIPE */}
        {activeSubTab === 'commissions' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Rateio & Fechamento de Comissões por Técnico</h3>
              <p className="text-xs text-slate-400">Apuração automática calculada pelas visitas concluídas com geofencing homologado</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(data?.technicians || []).map((t: any) => (
                <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{t.name}</h4>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                      R$ {t.commission_rate.toFixed(2)} / visita
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 block">Visitas Concluídas:</span>
                      <strong className="text-white text-sm">{t.completed_visits}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Comissão Apurada:</span>
                      <strong className="text-emerald-400 text-sm font-mono">
                        R$ {t.commission_total.toFixed(2).replace('.', ',')}
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={() => handleMarkCommissionPaid(t.id, t.name)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition"
                  >
                    Marcar Comissão como Paga
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA 3: FLUXO DE CAIXA & CONTAS */}
        {activeSubTab === 'cashflow' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Demonstrativo de Fluxo de Caixa</h3>
                <p className="text-xs text-slate-400">Entradas de mensalidades e saídas operacionais (químicos, bombas, combustível)</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Saldo Líquido do Mês:</span>
                <div className={`text-xl font-black font-mono ${netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  R$ {netBalance.toFixed(2).replace('.', ',')}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Tipo</th>
                    <th className="py-3 px-4">Categoria</th>
                    <th className="py-3 px-4">Descrição</th>
                    <th className="py-3 px-4">Vencimento</th>
                    <th className="py-3 px-4">Valor</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {(data?.entries || []).map((e: any) => {
                    const isIncome = e.entry_type === 'RECEITA';
                    return (
                      <tr key={e.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                            isIncome ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                          }`}>
                            {e.entry_type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">{e.category}</td>
                        <td className="py-3 px-4 text-white font-bold">{e.description}</td>
                        <td className="py-3 px-4 text-slate-400 font-mono">{e.due_date}</td>
                        <td className={`py-3 px-4 font-mono font-bold ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isIncome ? '+' : '-'} R$ {e.amount.toFixed(2).replace('.', ',')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            e.payment_status === 'PAID' ? 'text-emerald-400 bg-emerald-950/60' :
                            e.payment_status === 'PENDING' ? 'text-amber-400 bg-amber-950/60' :
                            'text-rose-400 bg-rose-950/60'
                          }`}>
                            {e.payment_status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Banner de Standby Fiscal */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>
              <strong>Modo Operacional Ativo:</strong> Módulo Fiscal (NFC-e / NFS-e / SAT) mantido em standby sob demanda corporativa.
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            FLAG: NEXT_PUBLIC_ENABLE_FISCAL_ERP=false
          </span>
        </div>

      </div>
    </div>
  );
}

