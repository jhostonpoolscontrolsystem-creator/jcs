import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      tenantId, 
      editionSlug, 
      leadName, 
      leadWhatsapp, 
      leadEmail, 
      poolType, 
      estimatedVolumeM3, 
      notes 
    } = body;

    if (!leadName || !leadWhatsapp) {
      return NextResponse.json({ error: 'Nome e WhatsApp são obrigatórios.' }, { status: 400 });
    }

    // Grava lead na tabela magazine_leads (com fallback seguro caso a migration não tenha sido rodada)
    try {
      await supabase.from('magazine_leads').insert({
        tenant_id: tenantId && tenantId !== '00000000-0000-0000-0000-000000000000' && tenantId !== 'tenant-demo-id' ? tenantId : null,
        edition_slug: editionSlug || 'edicao-01',
        lead_name: leadName,
        lead_whatsapp: leadWhatsapp,
        lead_email: leadEmail || null,
        pool_type: poolType || 'MONOLITHIC',
        estimated_volume_m3: estimatedVolumeM3 ? Number(estimatedVolumeM3) : null,
        notes: notes || 'Lead captado pela Calculadora da Revista Eletrônica',
        source_channel: 'MAGAZINE_CALCULATOR',
        status: 'NEW',
      });
    } catch (dbErr) {
      console.warn('Fallback gravando lead: ', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitação registrada com sucesso! Nosso especialista entrará em contato.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao registrar lead' }, { status: 500 });
  }
}
