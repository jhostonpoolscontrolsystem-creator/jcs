import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createInstance } from '@/lib/whatsapp/evolutionClient';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tierId = 'solo',
      documentType = 'CNPJ',
      document,
      companyName,
      tradeName,
      contactName,
      email,
      phone,
      password,
      paymentMethod = 'PIX',
    } = body;

    if (!document || !companyName || !email || !password) {
      return NextResponse.json(
        { error: 'Documento, Razão Social, E-mail e Senha são obrigatórios.' },
        { status: 400 }
      );
    }

    const cleanDoc = document.replace(/\D/g, '');
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

    // 1. Cria ou recupera o Tenant
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        name: companyName,
        trade_name: tradeName || companyName,
        document: cleanDoc,
        target_sector: tierId.toUpperCase(),
        contact_email: email,
        contact_phone: cleanPhone,
        is_active: true,
      })
      .select()
      .single();

    const createdTenantId = tenant?.id || `tenant-${Date.now()}`;

    // 2. Cria a Licença do Tenant
    await supabase.from('tenant_licenses').insert({
      tenant_id: createdTenantId,
      tier_id: tierId,
      status: 'ACTIVE',
      billing_cycle: 'MONTHLY',
      custom_enabled_modules: [],
      active_pools_count: 0,
      active_users_count: 1,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias grátis
    });

    // 3. Cria Usuário Gestor
    const passwordHash = await bcrypt.hash(password, 10);
    await supabase.from('users').insert({
      name: contactName || companyName,
      email: email.toLowerCase(),
      password_hash: passwordHash,
      role: 'GERENCIA_CLI',
      phone: cleanPhone,
      status: 'ACTIVE',
      approval_status: 'APPROVED',
      is_first_login: true,
    });

    // 4. Auto-Provisionamento de WhatsApp em Background
    const instanceName = `jhpcs_tenant_${createdTenantId.replace(/-/g, '').slice(0, 12)}`;
    createInstance(instanceName)
      .then(async (res) => {
        await supabase.from('tenant_settings').upsert({
          tenant_id: createdTenantId,
          company_name: companyName,
          whatsapp_instance_name: instanceName,
          whatsapp_instance_status: 'DISCONNECTED',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'tenant_id' });
      })
      .catch((e) => console.warn('Background WhatsApp Onboarding Instance:', e));

    return NextResponse.json({
      success: true,
      message: 'Onboarding concluído com sucesso!',
      tenantId: createdTenantId,
      userEmail: email,
      instanceName,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao processar cadastro de onboarding.' }, { status: 500 });
  }
}

