import { NextRequest, NextResponse } from 'next/server';
import { disconnectInstance } from '@/lib/whatsapp/evolutionClient';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const tenantId = body.tenant_id || '11111111-0000-0000-0000-000000000001';
    const instanceName = `jhpcs_tenant_${tenantId.replace(/-/g, '').slice(0, 12)}`;

    await disconnectInstance(instanceName);

    try {
      await supabase
        .from('tenant_settings')
        .update({
          whatsapp_instance_status: 'DISCONNECTED',
          whatsapp_connected_number: null,
          whatsapp_last_sync_at: new Date().toISOString(),
        })
        .eq('tenant_id', tenantId);
    } catch {
      // Ignore
    }

    return NextResponse.json({
      success: true,
      message: 'Instância de WhatsApp desconectada com sucesso.',
      status: 'DISCONNECTED',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Falha ao desconectar' },
      { status: 500 }
    );
  }
}
