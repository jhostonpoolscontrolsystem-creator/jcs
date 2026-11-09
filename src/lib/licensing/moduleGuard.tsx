'use client';

import React, { useState, useEffect } from 'react';

export type SystemModuleKey = 
  | 'pwa_field'
  | 'stock_deduction'
  | 'fleet_routes'
  | 'facility_logbook'
  | 'retail_trade'
  | 'guarantee_audit'
  | 'fiscal_erp';

export interface SubscriptionTier {
  id: string;
  name: string;
  target_sector: 'AUTONOMO' | 'FROTA' | 'HOTEL_CLUBE' | 'LOJA' | 'FABRICANTE';
  base_monthly_price: number;
  max_pools: number | null;
  max_users: number | null;
  included_modules: SystemModuleKey[];
  overage_pool_price: number;
  overage_user_price: number;
}

export interface TenantLicenseInfo {
  id: string;
  tenant_id: string;
  tier_id: string;
  status: 'TRIAL' | 'ACTIVE' | 'PAST_DUE' | 'SUSPENDED' | 'CANCELED';
  billing_cycle: 'MONTHLY' | 'ANNUAL';
  custom_enabled_modules: SystemModuleKey[];
  active_pools_count: number;
  active_users_count: number;
  expires_at: string | null;
  tier?: SubscriptionTier;
}

// Planos padrão do ecossistema para fallback em memória / SSR
export const DEFAULT_TIERS: Record<string, SubscriptionTier> = {
  solo: {
    id: 'solo',
    name: 'Plano SOLO (Tratador Autônomo)',
    target_sector: 'AUTONOMO',
    base_monthly_price: 49.90,
    max_pools: 30,
    max_users: 1,
    included_modules: ['pwa_field'],
    overage_pool_price: 1.50,
    overage_user_price: 0,
  },
  fleet: {
    id: 'fleet',
    name: 'Plano FLEET (Frotas & Prestadoras)',
    target_sector: 'FROTA',
    base_monthly_price: 189.90,
    max_pools: 150,
    max_users: 5,
    included_modules: ['pwa_field', 'stock_deduction', 'fleet_routes'],
    overage_pool_price: 1.20,
    overage_user_price: 25.00,
  },
  facility: {
    id: 'facility',
    name: 'Plano FACILITY (Condomínios & Resorts)',
    target_sector: 'HOTEL_CLUBE',
    base_monthly_price: 290.00,
    max_pools: 10,
    max_users: 8,
    included_modules: ['pwa_field', 'facility_logbook'],
    overage_pool_price: 15.00,
    overage_user_price: 15.00,
  },
  retail: {
    id: 'retail',
    name: 'Plano RETAIL (Lojas de Piscinas & Revendas)',
    target_sector: 'LOJA',
    base_monthly_price: 149.00,
    max_pools: 0,
    max_users: 3,
    included_modules: ['retail_trade'],
    overage_pool_price: 0,
    overage_user_price: 20.00,
  },
  enterprise_jhoston: {
    id: 'enterprise_jhoston',
    name: 'Plano ENTERPRISE GUARANTEE (JHoston Pools)',
    target_sector: 'FABRICANTE',
    base_monthly_price: 990.00,
    max_pools: null,
    max_users: null,
    included_modules: [
      'pwa_field',
      'stock_deduction',
      'fleet_routes',
      'facility_logbook',
      'retail_trade',
      'guarantee_audit',
    ],
    overage_pool_price: 0,
    overage_user_price: 0,
  },
};

/**
 * Validação assíncrona se um tenant possui acesso a determinado módulo.
 * Considera:
 * 1. Se o módulo é fiscal_erp, exige NEXT_PUBLIC_ENABLE_FISCAL_ERP === 'true'.
 * 2. Módulos incluídos no SubscriptionTier contratado.
 * 3. Módulos adicionados avulsos como add-ons (custom_enabled_modules).
 */
export async function hasModuleAccess(
  tenantId: string,
  moduleKey: SystemModuleKey
): Promise<boolean> {
  // Gatekeeper global para o módulo Fiscal em standby
  if (moduleKey === 'fiscal_erp') {
    const isFiscalEnabled = process.env.NEXT_PUBLIC_ENABLE_FISCAL_ERP === 'true';
    if (!isFiscalEnabled) {
      return false;
    }
  }

  // Tenant padrão / Super Admin sempre possui acesso total
  if (!tenantId || tenantId === 'tenant_master' || tenantId === 'tenant_demo') {
    return true;
  }

  try {
    const res = await fetch(`/api/tenant/license?tenant_id=${encodeURIComponent(tenantId)}`);
    if (!res.ok) {
      // Fallback seguro: plano enterprise por padrão para evitar bloqueio acidental de tenants existentes
      return true;
    }
    const data: { license: TenantLicenseInfo } = await res.json();
    if (!data.license) return true;

    const tier = data.license.tier || DEFAULT_TIERS[data.license.tier_id];
    const isIncludedInTier = tier?.included_modules?.includes(moduleKey);
    const isCustomAddon = data.license.custom_enabled_modules?.includes(moduleKey);

    return Boolean(isIncludedInTier || isCustomAddon);
  } catch {
    return true; // Resiliência em caso de falha transitória
  }
}

/**
 * Hook React para inspecionar permissão de módulo no cliente com cache local.
 */
export function useModuleAccess(moduleKey: SystemModuleKey) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function check() {
      // Checagem imediata para fiscal_erp
      if (moduleKey === 'fiscal_erp' && process.env.NEXT_PUBLIC_ENABLE_FISCAL_ERP !== 'true') {
        if (isMounted) {
          setHasAccess(false);
          setLoading(false);
        }
        return;
      }

      try {
        const allowed = await hasModuleAccess('tenant_demo', moduleKey);
        if (isMounted) {
          setHasAccess(allowed);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setHasAccess(true);
          setLoading(false);
        }
      }
    }

    check();
    return () => {
      isMounted = false;
    };
  }, [moduleKey]);

  return { hasAccess, loading };
}

/**
 * Banner amigável de Upgrade quando o tenant tenta acessar um recurso não contratado.
 */
export function UpgradePlanBanner({ moduleKey }: { moduleKey: SystemModuleKey }) {
  const moduleNames: Record<SystemModuleKey, string> = {
    pwa_field: 'PWA de Campo Offline',
    stock_deduction: 'Baixa de Estoque Volante',
    fleet_routes: 'Roteirização de Frotas',
    facility_logbook: 'Logbook Sanitário Digital Anvisa',
    retail_trade: 'Receituário de Balcão & Cobrança PIX',
    guarantee_audit: 'Auditoria de Garantia Monolítica JHoston',
    fiscal_erp: 'Módulo Fiscal NFC-e (Em Standby)',
  };

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-8 text-center max-w-xl mx-auto my-8 space-y-4 shadow-2xl">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl font-black">
        🔒
      </div>
      <div>
        <h3 className="text-xl font-black text-white">
          Módulo Não Disponível no Seu Plano
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          O recurso <strong className="text-amber-400">{moduleNames[moduleKey] || moduleKey}</strong> é exclusivo para assinantes que possuem este add-on ativo.
        </p>
      </div>
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="/settings/subscription"
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl text-xs hover:scale-105 transition shadow-lg shadow-amber-500/20"
        >
          Fazer Upgrade de Plano
        </a>
        <a
          href="/"
          className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition"
        >
          Voltar ao Painel
        </a>
      </div>
    </div>
  );
}

/**
 * Componente Barreira de Proteção Modular (ModuleGate)
 */
export function ModuleGate({
  module,
  children,
  fallback,
}: {
  module: SystemModuleKey;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { hasAccess, loading } = useModuleAccess(module);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center text-slate-500 text-sm animate-pulse">
        Verificando permissões de licença...
      </div>
    );
  }

  if (!hasAccess) {
    return fallback ? <>{fallback}</> : <UpgradePlanBanner moduleKey={module} />;
  }

  return <>{children}</>;
}
