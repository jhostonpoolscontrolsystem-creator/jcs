'use client';

import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Sun, 
  Umbrella, 
  BadgePercent,
  Plus,
  Minus
} from 'lucide-react';
import { UserRole } from '@/types/database';

interface ProductItem {
  id: string;
  name: string;
  category: 'CLORO' | 'BALANCEADOR' | 'ESPECIAL_CURA' | 'EQUIPAMENTO';
  description: string;
  weightUnit: string;
  priceBrl: number;
  homologatedByJHoston: boolean;
  recommendedSeason: 'TODAS' | 'VERAO_PICO' | 'FERIADOS' | 'CHUVA';
  inStock: boolean;
  minBatch: number;
}

export function ChemicalSuppliesStore({ currentUserRole = 'MASTER' }: { currentUserRole?: UserRole }) {
  // Simulação de Carrinho
  const [cart, setCart] = useState<{ [productId: string]: number }>({
    'prod-1': 2, // 2 baldes de Cloro Granulado
    'prod-2': 4, // 4 sacos de Bicarbonato
  });

  const [deliveryRegion, setDeliveryRegion] = useState<'SUDESTE' | 'NORDESTE' | 'SUL' | 'CENTRO_OESTE' | 'NORTE'>('SUDESTE');
  const [selectedSeasonPreset, setSelectedSeasonPreset] = useState<'PADRAO' | 'VERAO_ALTA' | 'CARNAVAL_FERIADO'>('VERAO_ALTA');
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'BOLETO_28D' | 'FATURADO'>('PIX');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Catálogo oficial de insumos químicos homologados JHostonTec
  const products: ProductItem[] = [
    {
      id: 'prod-1',
      name: 'Cloro Estabilizado Concentrado JHostonTec 65%',
      category: 'CLORO',
      description: 'Livre de insolúveis e de rápida dissolução. Não altera a matriz nem esbranquiça a resina monolítica.',
      weightUnit: 'Balde 10 kg',
      priceBrl: 245.00,
      homologatedByJHoston: true,
      recommendedSeason: 'VERAO_PICO',
      inStock: true,
      minBatch: 1,
    },
    {
      id: 'prod-2',
      name: 'Bicarbonato de Sódio Puro (Elevador de Alcalinidade)',
      category: 'BALANCEADOR',
      description: 'Grau técnico puro para manutenção da faixa de 80 a 120 ppm. Essencial para neutralizar chuvas ácidas.',
      weightUnit: 'Saco 25 kg',
      priceBrl: 135.00,
      homologatedByJHoston: true,
      recommendedSeason: 'CHUVA',
      inStock: true,
      minBatch: 2,
    },
    {
      id: 'prod-3',
      name: 'Carbonato de Sódio / Barrilha Leve JH (Elevador de pH)',
      category: 'BALANCEADOR',
      description: 'Ação rápida na correção de água ácida. Tratamento mandatório para resgate imediato de Red Zones.',
      weightUnit: 'Saco 25 kg',
      priceBrl: 155.00,
      homologatedByJHoston: true,
      recommendedSeason: 'TODAS',
      inStock: true,
      minBatch: 1,
    },
    {
      id: 'prod-4',
      name: 'Kit Protetor Mineral - Protocolo de Cura Submersa (28 Dias)',
      category: 'ESPECIAL_CURA',
      description: 'Composto quelante sem fosfatos para inibir depósitos minerais precoces durante as 4 semanas iniciais.',
      weightUnit: 'Galão 5 L',
      priceBrl: 320.00,
      homologatedByJHoston: true,
      recommendedSeason: 'TODAS',
      inStock: true,
      minBatch: 1,
    },
    {
      id: 'prod-5',
      name: 'Escova Especial de Cerdas de Polipropileno Macio JH (50cm)',
      category: 'EQUIPAMENTO',
      description: 'Única homologada para escovação diária sem riscar ou arranhar os agregados minerais monolíticos.',
      weightUnit: 'Unidade',
      priceBrl: 180.00,
      homologatedByJHoston: true,
      recommendedSeason: 'TODAS',
      inStock: true,
      minBatch: 1,
    },
  ];

  // Matriz de Lead Time Logístico Real por Região no Brasil
  const logisticsLeadTimes = {
    SUDESTE: { days: '5 a 7 dias úteis', bufferAdvice: 'Antecedência recomendada: 12 dias' },
    SUL: { days: '6 a 8 dias úteis', bufferAdvice: 'Antecedência recomendada: 14 dias' },
    CENTRO_OESTE: { days: '7 a 10 dias úteis', bufferAdvice: 'Antecedência recomendada: 16 dias' },
    NORDESTE: { days: '7 a 10 dias úteis', bufferAdvice: 'Antecedência recomendada: 16 dias' },
    NORTE: { days: '12 a 16 dias úteis', bufferAdvice: 'Antecedência recomendada: 22 dias' },
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const calculateSubtotal = () => {
    return Object.entries(cart).reduce((acc, [id, qty]) => {
      const prod = products.find(p => p.id === id);
      return acc + (prod ? prod.priceBrl * qty : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const freightBrl = subtotal > 0 ? (deliveryRegion === 'SUDESTE' ? 95 : 160) : 0;
  const totalBrl = subtotal + freightBrl;

  const handleApplyPreset = (preset: 'PADRAO' | 'VERAO_ALTA' | 'CARNAVAL_FERIADO') => {
    setSelectedSeasonPreset(preset);
    if (preset === 'VERAO_ALTA') {
      // Dobra cloro e adiciona elevadores para suportar radiação UV extrema
      setCart({
        'prod-1': 4, // 4 baldes de Cloro
        'prod-2': 6, // 6 sacos de Bicarbonato
        'prod-3': 2, // 2 sacos de Barrilha
      });
    } else if (preset === 'CARNAVAL_FERIADO') {
      // Pacote com foco em contingência e carga orgânica máxima
      setCart({
        'prod-1': 6,
        'prod-2': 8,
        'prod-3': 4,
        'prod-5': 1,
      });
    } else {
      setCart({
        'prod-1': 2,
        'prod-2': 4,
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner da Loja de Insumos B2B */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-wrap justify-between items-center gap-6 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[11px] font-bold tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              LOJA B2B • INSUMOS QUÍMICOS HOMOLOGADOS
            </span>
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
              Garantia Vitalícia Preservada
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">Abastecimento Preditivo & Logística Nacional</h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Compre produtos formulados especificamente para revestimentos monolíticos. Prevenção contra cloro genérico agressivo, frete programado com lead time de 7 a 10 dias e faturamento direto para resorts e condomínios.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-3">
            <Truck className="w-6 h-6 text-cyan-400" />
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px]">Lead Time Médio Brasil:</span>
              <span className="font-bold text-white">7 a 10 dias úteis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seletor de Inteligência Sazonal (Verão, Carnaval & Feriados) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Simulador de Demanda Sazonal (Supply Chain Preditivo)</span>
          </div>
          <span className="text-[10px] text-slate-400">Multiplicadores de consumo aplicados</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => handleApplyPreset('PADRAO')}
            className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
              selectedSeasonPreset === 'PADRAO'
                ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-xs text-white">Consumo Regular</span>
              <span className="text-[10px] text-cyan-400 font-mono">1.0x</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Rotina operacional em baixa e média temporada. Entregas a cada 30 dias.
            </p>
          </button>

          <button
            onClick={() => handleApplyPreset('VERAO_ALTA')}
            className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
              selectedSeasonPreset === 'VERAO_ALTA'
                ? 'bg-amber-950/60 border-amber-500 text-white shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" /> Verão / Alta Temporada
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-bold">2.2x Consumo</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Degradação UV triplicada. Antecipação do pedido em 21 dias com lote reforçado.
            </p>
          </button>

          <button
            onClick={() => handleApplyPreset('CARNAVAL_FERIADO')}
            className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
              selectedSeasonPreset === 'CARNAVAL_FERIADO'
                ? 'bg-purple-950/60 border-purple-500 text-white shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-xs text-purple-300 flex items-center gap-1.5">
                <BadgePercent className="w-3.5 h-3.5 text-purple-400" /> Feriadão / Carnaval
              </span>
              <span className="text-[10px] text-purple-400 font-mono font-bold">Lote Buffer</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Buffer prévio para paralisações de transportadoras e carga orgânica máxima.
            </p>
          </button>
        </div>
      </div>

      {/* Conteúdo Principal: Catálogo de Produtos e Checkout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Catálogo de Produtos (2 Colunas) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Package className="w-5 h-5 text-cyan-400" /> Insumos Químicos Oficiais JHostonTec
            </h3>
            <span className="text-xs text-slate-400">{products.length} itens homologados</span>
          </div>

          <div className="space-y-3">
            {products.map((product) => {
              const qty = cart[product.id] || 0;

              return (
                <div 
                  key={product.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-wrap md:flex-nowrap justify-between items-center gap-4 transition"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{product.name}</span>
                      {product.homologatedByJHoston && (
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.2 rounded font-bold">
                          Selo JH 100%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>Embalagem: <strong className="text-slate-300">{product.weightUnit}</strong></span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">Pronta Entrega na Fábrica</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Preço B2B:</span>
                      <span className="font-mono font-black text-cyan-400 text-base">
                        R$ {product.priceBrl.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    {/* Controles de Quantidade */}
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-xs w-6 text-center text-white">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resumo do Pedido, Logística e Checkout (1 Coluna) */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Resumo do Pedido B2B</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {Object.values(cart).reduce((a, b) => a + b, 0)} itens
              </span>
            </div>

            {/* Seleção de Região para Cálculo do Lead Time */}
            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 font-bold uppercase text-[10px]">
                Região de Destino (Brasil):
              </label>
              <select
                value={deliveryRegion}
                onChange={(e) => setDeliveryRegion(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="SUDESTE">Sudeste (SP, RJ, MG, ES)</option>
                <option value="NORDESTE">Nordeste (BA, PE, CE, RN, AL, SE, PB, PI, MA)</option>
                <option value="SUL">Sul (PR, SC, RS)</option>
                <option value="CENTRO_OESTE">Centro-Oeste (GO, MT, MS, DF)</option>
                <option value="NORTE">Norte (AM, PA, RO, AC, TO, RR, AP)</option>
              </select>

              <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-[11px] text-cyan-300 space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>Prazo Rodoviário: {logisticsLeadTimes[deliveryRegion].days}</span>
                </div>
                <p className="text-[10px] text-slate-300">
                  {logisticsLeadTimes[deliveryRegion].bufferAdvice}
                </p>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 font-bold uppercase text-[10px]">
                Forma de Pagamento Homologada:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { key: 'PIX', label: 'Pix 5% Off', icon: <QrCode className="w-3.5 h-3.5" /> },
                  { key: 'BOLETO_28D', label: 'Boleto 28d', icon: <CreditCard className="w-3.5 h-3.5" /> },
                  { key: 'FATURADO', label: 'Faturado JH', icon: <Calendar className="w-3.5 h-3.5" /> },
                ].map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setPaymentMethod(m.key as any)}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                      paymentMethod === m.key
                        ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.icon}
                    <span className="text-[10px]">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Totais Financeiros */}
            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal dos Produtos:</span>
                <span className="font-mono text-slate-200">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Frete Rodoviário Segurado:</span>
                <span className="font-mono text-slate-200">R$ {freightBrl.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-slate-800">
                <span>Total do Pedido:</span>
                <span className="font-mono text-cyan-400 text-base">R$ {totalBrl.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            {/* Botão de Envio de Pedido */}
            <button
              onClick={() => {
                if (subtotal === 0) return alert('Selecione ao menos 1 item para o pedido.');
                setIsOrderPlaced(true);
              }}
              disabled={subtotal === 0}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:opacity-95 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Emitir Pedido de Compra B2B</span>
            </button>

            {isOrderPlaced && (
              <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Pedido #JH-2026-9812 Gerado com Sucesso!</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Proposta despachada automaticamente no WhatsApp da gerência. Despacho programado pela fábrica da JHoston com rastreio rodoviário ativo.
                </p>
              </div>
            )}
          </div>

          {/* Garantia de Blindagem JHostonTec */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-950/80 flex items-start gap-3 text-xs text-slate-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              O uso contínuo de químicos homologados JHostonTec mantém ativo o <strong>Certificado de Garantia de 10 Anos</strong> contra manchas, delaminação e perda de cor da piscina.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
