import { NextResponse } from 'next/server';
import { FIRST_BIMONTHLY_EDITION, TenantMagazineConfig } from '@/lib/magazine/bimonthlyMagazineEngine';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantSlug = searchParams.get('tenantSlug') || 'master';
    const editionSlug = searchParams.get('edition') || 'edicao-01';

    // Se for o tenant institucional Master Jhoston
    if (tenantSlug === 'master' || tenantSlug === 'jhoston') {
      const config: TenantMagazineConfig = {
        tenantId: '00000000-0000-0000-0000-000000000000',
        tenantSlug: 'jhoston',
        brandName: 'Jhoston Pools & Lagoons',
        logoUrl: '/images/jhpcs-full-logo.png',
        primaryColor: '#06B6D4',
        whatsappNumber: '5511999998888',
        ctaText: 'Solicitar Consultoria com a Engenharia Jhoston',
        showCalculator: true,
        isMasterEnabled: true,
      };

      return NextResponse.json({
        success: true,
        edition: FIRST_BIMONTHLY_EDITION,
        tenantConfig: config,
      });
    }

    // Consulta no Supabase se houver tenant customizado
    let tenantConfig: TenantMagazineConfig = {
      tenantId: 'tenant-demo-id',
      tenantSlug: tenantSlug,
      brandName: tenantSlug.toUpperCase() + ' Piscinas & Lazer',
      logoUrl: undefined,
      primaryColor: '#06B6D4',
      whatsappNumber: '5511999998888',
      ctaText: 'Solicitar Avaliação da Minha Piscina',
      showCalculator: true,
      isMasterEnabled: true, // Homologado no motor
    };

    try {
      const { data: dbTenant } = await supabase
        .from('tenants')
        .select('id, name, trade_name, contact_phone')
        .or(`trade_name.ilike.%${tenantSlug}%,name.ilike.%${tenantSlug}%`)
        .single();

      if (dbTenant) {
        tenantConfig = {
          tenantId: dbTenant.id,
          tenantSlug: tenantSlug,
          brandName: dbTenant.trade_name || dbTenant.name,
          logoUrl: undefined,
          primaryColor: '#06B6D4',
          whatsappNumber: dbTenant.contact_phone || '5511999998888',
          ctaText: `Falar com Especialista de ${dbTenant.trade_name || dbTenant.name}`,
          showCalculator: true,
          isMasterEnabled: true,
        };
      }
    } catch {}

    return NextResponse.json({
      success: true,
      edition: FIRST_BIMONTHLY_EDITION,
      tenantConfig,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao carregar edição' }, { status: 500 });
  }
}
