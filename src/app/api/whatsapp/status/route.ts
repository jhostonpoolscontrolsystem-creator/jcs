import { NextRequest, NextResponse } from 'next/server';
import { getConnectionState } from '@/lib/whatsapp/evolutionClient';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get('tenant_id') || '11111111-0000-0000-0000-000000000001';
    const instanceName = `jhpcs_tenant_${tenantId.replace(/-/g, '').slice(0, 12)}`;

    const stateResult = await getConnectionState(instanceName);

    let dbStatus: 'CONNECTED' | 'CONNECTING' | 'DISCONNECTED' = 'DISCONNECTED';
    let connectedNumber = stateResult.connectedNumber || null;

    if (stateResult.state === 'open') {
      dbStatus = 'CONNECTED';
      connectedNumber = connectedNumber || '+55 (11) 98888-0001';
    } else if (stateResult.state === 'connecting') {
      dbStatus = 'CONNECTING';
    }

    // Atualiza estado no banco
    try {
      await supabase
        .from('tenant_settings')
        .upsert(
          {
            tenant_id: tenantId,
            whatsapp_instance_name: instanceName,
            whatsapp_instance_status: dbStatus,
            whatsapp_connected_number: connectedNumber,
            whatsapp_last_sync_at: new Date().toISOString(),
          },
          { onConflict: 'tenant_id' }
        );
    } catch {
      // Ignore
    }

    return NextResponse.json({
      success: true,
      instanceName,
      status: dbStatus,
      connectedNumber,
      last_sync: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Falha ao consultar status WhatsApp' },
      { status: 500 }
    );
  }
}

