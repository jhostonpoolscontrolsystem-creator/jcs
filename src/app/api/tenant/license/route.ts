import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_TIERS, TenantLicenseInfo, SystemModuleKey } from '@/lib/licensing/moduleGuard';

// Armazenamento em memória para demonstração / runtime local sem conexão física
let memoryTenantLicenses: Record<string, TenantLicenseInfo> = {
  tenant_demo: {
    id: 'lic-demo-1',
    tenant_id: 'tenant_demo',
    tier_id: 'fleet',
    status: 'ACTIVE',
    billing_cycle: 'MONTHLY',
    custom_enabled_modules: ['facility_logbook', 'retail_trade'],
    active_pools_count: 24,
    active_users_count: 3,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    tier: DEFAULT_TIERS.fleet,
  },
  tenant_solo: {
    id: 'lic-solo-1',
    tenant_id: 'tenant_solo',
    tier_id: 'solo',
    status: 'ACTIVE',
    billing_cycle: 'MONTHLY',
    custom_enabled_modules: [],
    active_pools_count: 18,
    active_users_count: 1,
    expires_at: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    tier: DEFAULT_TIERS.solo,
  },
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get('tenant_id') || 'tenant_demo';

    let license = memoryTenantLicenses[tenantId];
    if (!license) {
      license = {
        id: `lic-${tenantId}`,
        tenant_id: tenantId,
        tier_id: 'enterprise_jhoston',
        status: 'ACTIVE',
        billing_cycle: 'ANNUAL',
        custom_enabled_modules: [],
        active_pools_count: 42,
        active_users_count: 5,
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        tier: DEFAULT_TIERS.enterprise_jhoston,
      };
      memoryTenantLicenses[tenantId] = license;
    }

    return NextResponse.json({
      success: true,
      license,
      tiers: DEFAULT_TIERS,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Falha ao buscar licença' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tenant_id, tier_id, addon_module } = body;

    const tid = tenant_id || 'tenant_demo';
    let license = memoryTenantLicenses[tid];

    if (!license) {
      license = {
        id: `lic-${tid}`,
        tenant_id: tid,
        tier_id: tier_id || 'fleet',
        status: 'ACTIVE',
        billing_cycle: 'MONTHLY',
        custom_enabled_modules: [],
        active_pools_count: 10,
        active_users_count: 2,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        tier: DEFAULT_TIERS[tier_id] || DEFAULT_TIERS.fleet,
      };
    }

    if (tier_id && DEFAULT_TIERS[tier_id]) {
      license.tier_id = tier_id;
      license.tier = DEFAULT_TIERS[tier_id];
    }

    if (addon_module) {
      const mod = addon_module as SystemModuleKey;
      if (!license.custom_enabled_modules.includes(mod)) {
        license.custom_enabled_modules.push(mod);
      }
    }

    memoryTenantLicenses[tid] = license;

    return NextResponse.json({
      success: true,
      message: 'Licença atualizada com sucesso',
      license,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Falha ao atualizar licença' },
      { status: 500 }
    );
  }
}

