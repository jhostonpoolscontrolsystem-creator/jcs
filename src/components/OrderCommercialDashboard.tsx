'use client';

import React, { useEffect, useState } from 'react';
import { 
  ShoppingBag, 
  TrendingUp, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  DollarSign, 
  Package, 
  FileSpreadsheet, 
  Search, 
  Filter, 
  RefreshCw, 
  Send, 
  Building2, 
  ShieldCheck, 
  Crown,
  ChevronRight,
  MapPin,
  Barcode,
  ExternalLink,
  Plus
} from 'lucide-react';
import { UserRole } from '@/types/database';

interface OrderCommercialDashboardProps {
  currentUserRole?: UserRole;
  onNavigateTab?: (tab: string) => void;
}

export function OrderCommercialDashboard({ 
  currentUserRole = 'MASTER', 
  onNavigateTab 
}: OrderCommercialDashboardProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Cadeia de Permissão: MASTER tem poder de arbitrar e exportar; DIRETORIA_JH e TECNICO_JH acompanham e despacham
  const isMaster = currentUserRole === 'MASTER';
  const isDirectorate = currentUserRole === 'DIRETORIA_JH' || currentUserRole === 'MASTER';

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders/commercial');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
        setSummary(data.summary || null);
      }
    } catch (err) {
      console.error('Erro ao buscar pedidos comerciais:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateShipping = async (orderId: string, nextStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch('/api/orders/commercial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'UPDATE_STATUS',
          order_id: orderId,
          new_shipping_status: nextStatus
        })
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg(`Status do pedido ${orderId} atualizado para ${nextStatus}!`);
        await fetchOrders();
        setTimeout(() => setFeedbackMsg(null), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtro
  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.pool_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.location_city.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && o.shipping_status === statusFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      
      {/* 1. Header do Módulo Comercial */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-black">
                {isMaster ? 'GOVERNANÇA COMERCIAL SOBERANA' : 'CONTROLE DE VENDAS & EXPEDIÇÃO B2B'}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Gestão Comercial de Insumos & Loja B2B
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30 font-bold">
                Brasil Inteiro
              </span>
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Monitore o abastecimento dos insumos homologados que blindam a garantia dos revestimentos de areia e quartzo. Conversões automáticas via alertas de telemetria e compra direta.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('store')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Venda / Abrir Catálogo B2B</span>
              </button>
            )}

            <button
              onClick={fetchOrders}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition cursor-pointer"
              title="Atualizar Pedidos"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Alerta de Feedback */}
      {feedbackMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center gap-2.5 text-xs shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{feedbackMsg}</span>
        </div>
      )}

      {/* 2. Grid de KPIs Comerciais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GMV Total */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Faturamento B2B (GMV)</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            R$ {(summary?.total_gmv_brl || 6050.0).toFixed(2).replace('.', ',')}
          </div>
          <p className="text-[11px] text-slate-400">Volume total de pedidos homologados</p>
        </div>

        {/* Total de Pedidos */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pedidos Processados</span>
            <Package className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {summary?.total_orders || 3} <span className="text-xs text-slate-500 font-normal">entregas</span>
          </div>
          <p className="text-[11px] text-slate-400">Condomínios e resorts ativos</p>
        </div>

        {/* Conversões por Telemetria Red Flag */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">Conversão via Red Flag</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {summary?.red_zone_conversions || 1} <span className="text-xs text-amber-300/70 font-normal">pedidos</span>
          </div>
          <p className="text-[11px] text-slate-400">Gerados por alertas de correção química</p>
        </div>

        {/* Ticket Médio */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-bold uppercase tracking-wider">Ticket Médio B2B</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300">
            R$ {(summary?.average_ticket_brl || 2016.66).toFixed(2).replace('.', ',')}
          </div>
          <p className="text-[11px] text-slate-400">Lotes de 30 a 60 dias de tratamento</p>
        </div>
      </div>

      {/* 3. Filtros e Tabela de Pedidos */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Buscar por cliente, piscina, pedido ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="ALL">Todos os Envios</option>
            <option value="PREPARANDO_ENVIO">Preparando Envio</option>
            <option value="DESPACHADO">Despachado</option>
            <option value="ENTREGUE_CASA_MAQUINAS">Entregue na Casa de Máquinas</option>
          </select>
        </div>
      </div>

      {/* Tabela de Pedidos */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Barcode className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Livro-Razão de Pedidos & Logística Nacional de Insumos
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            *Insumos 100% Homologados vinculados à blindagem da garantia decenal
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 text-[11px] font-mono uppercase border-b border-slate-800">
              <tr>
                <th className="p-3.5">Pedido / Data</th>
                <th className="p-3.5">Cliente / Estabelecimento</th>
                <th className="p-3.5">Destino Logístico</th>
                <th className="p-3.5">Itens do Lote</th>
                <th className="p-3.5">Valor Total</th>
                <th className="p-3.5">Pagamento</th>
                <th className="p-3.5">Status Envio</th>
                <th className="p-3.5 text-right">Ação / Expedição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-900/40 transition">
                  {/* ID / Data */}
                  <td className="p-3.5">
                    <div className="font-mono font-bold text-emerald-400">{order.id}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {new Date(order.created_at).toLocaleString('pt-BR')}
                    </div>
                    {order.origin_trigger === 'TELEMETRIA_RED_FLAG' && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Via Red Flag
                      </span>
                    )}
                  </td>

                  {/* Cliente / Piscina */}
                  <td className="p-3.5">
                    <div className="font-bold text-white">{order.client_name}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{order.pool_name}</span>
                    </div>
                  </td>

                  {/* Destino Logístico */}
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{order.location_city} - {order.location_state}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      Rastreio: {order.tracking_code}
                    </div>
                  </td>

                  {/* Itens */}
                  <td className="p-3.5">
                    <div className="space-y-1">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="text-[11px] text-slate-300">
                          <span className="font-bold text-emerald-300">{item.quantity}x</span> {item.product_name}
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Valor Total */}
                  <td className="p-3.5 font-bold font-mono text-emerald-400 text-sm">
                    R$ {order.total_amount.toFixed(2).replace('.', ',')}
                  </td>

                  {/* Pagamento */}
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono block w-fit ${
                      order.payment_status === 'PAGO' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : order.payment_status === 'FATURADO_28D'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {order.payment_status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      {order.payment_method}
                    </span>
                  </td>

                  {/* Status Envio */}
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono block w-fit ${
                      order.shipping_status === 'ENTREGUE_CASA_MAQUINAS'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : order.shipping_status === 'DESPACHADO'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {order.shipping_status === 'ENTREGUE_CASA_MAQUINAS' ? 'Entregue' : order.shipping_status === 'DESPACHADO' ? 'Em Trânsito' : 'Preparando'}
                    </span>
                  </td>

                  {/* Ações por Perfil */}
                  <td className="p-3.5 text-right whitespace-nowrap">
                    {order.shipping_status === 'PREPARANDO_ENVIO' && (
                      <button
                        onClick={() => handleUpdateShipping(order.id, 'DESPACHADO')}
                        disabled={updatingId === order.id}
                        className="px-2.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] flex items-center gap-1 ml-auto transition cursor-pointer"
                        title="Despachar pedido via Transportadora/Sedex"
                      >
                        <Truck className="w-3 h-3" />
                        <span>Despachar</span>
                      </button>
                    )}

                    {order.shipping_status === 'DESPACHADO' && (
                      <button
                        onClick={() => handleUpdateShipping(order.id, 'ENTREGUE_CASA_MAQUINAS')}
                        disabled={updatingId === order.id}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 ml-auto transition cursor-pointer"
                        title="Confirmar entrega na casa de máquinas"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Confirmar Entrega</span>
                      </button>
                    )}

                    {order.shipping_status === 'ENTREGUE_CASA_MAQUINAS' && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center justify-end gap-1">
                        <ShieldCheck className="w-3 h-3" /> Garantia Blindada
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
