'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Layers, 
  Zap, 
  Users, 
  Waves, 
  Sparkles, 
  PlusCircle, 
  Calendar,
  Lock,
  Building2,
  Receipt,
  Download
} from 'lucide-react';
import { 
  DEFAULT_TIERS, 
  SubscriptionTier, 
  TenantLicenseInfo, 
  SystemModuleKey 
} from '@/lib/licensing/moduleGuard';

export default function SubscriptionSettingsPage() {
  const [license, setLicense] = useState<TenantLicenseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgradingTier, setUpgradingTier] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const availableAddons: { key: SystemModuleKey; name: string; price: number; description: string }[] = [
    {
      key: 'retail_trade',
      name: 'Receituário de Balcão & PIX Dinâmico',
      price: 69.90,
      description: 'Ideal para faturar químicos e diagnósticos no balcão de lojas com impressão térmica.',
    },
    {
      key: 'facility_logbook',
      name: 'Logbook Sanitário Digital Anvisa',
      price: 89.90,
      description: 'Livro diário de registros em 3 turnos com geofencing por GPS para condomínios e resorts.',
    },
    {
      key: 'stock_deduction',
      name: 'Baixa Estequiométrica de Químicos',
      price: 49.90,
      description: 'Dedução automática do estoque volante no veículo com base no volume (m³) tratado.',
    },
    {
      key: 'fleet_routes',
      name: 'Gestão de Frotas & Despacho de Ordens',
      price: 79.90,
      description: 'Otimização de trajetos e acompanhamento em tempo real de equipes de campo.',
    },
  ];

  useEffect(() => {
    loadLicense();
  }, []);

  async function loadLicense() {
    setLoading(true);
    try {
      const res = await fetch('/api/tenant/license?tenant_id=tenant_demo');
      const data = await res.json();
      if (data.license) {
        setLicense(data.license);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectPlan(tierId: string) {
    setUpgradingTier(tierId);
    setFeedback(null);
    try {
      const res = await fetch('/api/tenant/license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant_id: 'tenant_demo',
          tier_id: tierId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback(`✓ Plano atualizado para ${DEFAULT_TIERS[tierId]?.name}!`);
        loadLicense();
      } else {
        setFeedback(`❌ Erro: ${data.error}`);
      }
    } catch {
      setFeedback('❌ Erro de comunicação com o servidor');
    } finally {
      setUpgradingTier(null);
    }
  }

  async function handleAddAddon(addonKey: SystemModuleKey) {
    setFeedback(null);
    try {
      const res = await fetch('/api/tenant/license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant_id: 'tenant_demo',
          addon_module: addonKey,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback(`✓ Módulo adicional contratado e ativado com sucesso!`);
        loadLicense();
      }
    } catch {
      setFeedback('❌ Erro ao ativar módulo');
    }
  }

  const currentTier = license?.tier || (license?.tier_id ? DEFAULT_TIERS[license.tier_id] : DEFAULT_TIERS.fleet);
  const maxPools = currentTier?.max_pools ?? 'Ilimitado';
  const maxUsers = currentTier?.max_users ?? 'Ilimitado';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition"
              title="Voltar ao Painel"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-0.5 rounded-full border border-sky-500/20 font-semibold flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" /> Faturamento & Licenças
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Multi-Tenant Ativo
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
                Gestão da Assinatura & Módulos Contratados
              </h1>
              <p className="text-sm text-slate-400">
                Acompanhe o consumo de piscinas e operadores, ative novos add-ons e gerencie sua licença
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/configuracoes"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition"
            >
              Configurações Gerais
            </Link>
          </div>
        </div>

        {feedback && (
          <div className={`p-4 rounded-xl border text-sm font-medium ${
            feedback.startsWith('✓') 
              ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300' 
              : 'bg-rose-950/40 border-rose-800/80 text-rose-300'
          }`}>
            {feedback}
          </div>
        )}

        {/* Current Plan Overview Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black rounded-lg uppercase tracking-wider">
                  {currentTier?.target_sector}
                </span>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black rounded-lg uppercase tracking-wider">
                  STATUS: {license?.status || 'ACTIVE'}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white">
                {currentTier?.name}
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Cobrança {license?.billing_cycle === 'ANNUAL' ? 'Anual' : 'Mensal'} direta. Próxima renovação em{' '}
                <strong className="text-white">
                  {license?.expires_at ? new Date(license.expires_at).toLocaleDateString('pt-BR') : '30 dias'}
                </strong>.
              </p>
            </div>

            <div className="flex items-baseline gap-2 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
              <span className="text-sm text-slate-400 font-semibold">Valor Base:</span>
              <span className="text-3xl font-black text-emerald-400">
                R$ {currentTier?.base_monthly_price.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-xs text-slate-500 font-mono">/mês</span>
            </div>

          </div>

          {/* Quota Progress Trackers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800/80">
            
            {/* Pools Quota */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-sky-400" /> Piscinas Monitoradas
                </span>
                <span className="font-mono text-white font-bold">
                  {license?.active_pools_count || 0} / {maxPools}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-sky-500 h-full rounded-full transition-all duration-500" 
                  style={{ 
                    width: typeof maxPools === 'number' && maxPools > 0
                      ? `${Math.min(100, ((license?.active_pools_count || 0) / maxPools) * 100)}%` 
                      : '30%' 
                  }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Excedente: R$ {currentTier?.overage_pool_price.toFixed(2).replace('.', ',')} por piscina adicional.
              </p>
            </div>

            {/* Users / Maintainers Quota */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-400" /> Operadores & Técnicos
                </span>
                <span className="font-mono text-white font-bold">
                  {license?.active_users_count || 1} / {maxUsers}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                  style={{ 
                    width: typeof maxUsers === 'number' && maxUsers > 0
                      ? `${Math.min(100, ((license?.active_users_count || 1) / maxUsers) * 100)}%` 
                      : '20%' 
                  }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Assento adicional: R$ {currentTier?.overage_user_price.toFixed(2).replace('.', ',')}/mês.
              </p>
            </div>

          </div>
        </div>

        {/* Catalog of Plans (Switching) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white">Planos de Assinatura por Setor</h3>
              <p className="text-xs text-slate-400">Escolha o plano mais adequado para o seu modelo operacional</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.values(DEFAULT_TIERS).map((t) => {
              const isCurrent = (license?.tier_id || 'fleet') === t.id;
              return (
                <div 
                  key={t.id}
                  className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                    isCurrent 
                      ? 'bg-slate-900 border-sky-500 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500' 
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {t.target_sector}
                    </span>
                    <h4 className="font-bold text-sm text-white">{t.name}</h4>
                    <div className="text-xl font-black text-emerald-400">
                      R$ {t.base_monthly_price.toFixed(2).replace('.', ',')}
                      <span className="text-[10px] text-slate-500 font-normal"> /mês</span>
                    </div>
                    <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800">
                      <li>• {t.max_pools ? `Até ${t.max_pools} piscinas` : 'Piscinas ilimitadas'}</li>
                      <li>• {t.max_users ? `Até ${t.max_users} operadores` : 'Equipe ilimitada'}</li>
                      <li>• {t.included_modules.length} módulos inclusos</li>
                    </ul>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800">
                    {isCurrent ? (
                      <span className="w-full block py-2 text-center text-xs font-black text-sky-400 bg-sky-950/40 rounded-xl border border-sky-800/60">
                        Plano Ativo
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSelectPlan(t.id)}
                        disabled={upgradingTier === t.id}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition"
                      >
                        {upgradingTier === t.id ? 'Alterando...' : 'Mudar para este'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add-ons Catalog */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Catálogo de Add-ons & Módulos Extras
            </h3>
            <p className="text-xs text-slate-400">
              Personalize sua experiência ativando módulos avulsos sob demanda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableAddons.map((addon) => {
              const isIncludedInPlan = currentTier?.included_modules?.includes(addon.key);
              const isHiredAsAddon = license?.custom_enabled_modules?.includes(addon.key);
              const isEnabled = isIncludedInPlan || isHiredAsAddon;

              return (
                <div 
                  key={addon.key}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">{addon.name}</h4>
                      {isEnabled && (
                        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded border border-emerald-500/20">
                          {isIncludedInPlan ? 'INCLUSO NO PLANO' : 'ADD-ON ATIVO'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{addon.description}</p>
                    <p className="text-xs font-bold text-emerald-400 pt-1">
                      + R$ {addon.price.toFixed(2).replace('.', ',')}/mês
                    </p>
                  </div>

                  <div>
                    {isEnabled ? (
                      <span className="p-2 text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAddAddon(addon.key)}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg shadow-sm transition whitespace-nowrap"
                      >
                        Contratar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
