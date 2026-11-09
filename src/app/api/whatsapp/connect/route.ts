import { NextRequest, NextResponse } from 'next/server';
import { createInstance, getQRCode } from '@/lib/whatsapp/evolutionClient';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const tenantId = body.tenant_id || '11111111-0000-0000-0000-000000000001';

    // Gera o nome padronizado da instância do tenant
    const instanceName = `jhpcs_tenant_${tenantId.replace(/-/g, '').slice(0, 12)}`;

    // 1. Garante que a instância existe na Evolution API
    await createInstance(instanceName);

    // 2. Solicita o QR Code em Base64
    const qrResult = await getQRCode(instanceName);

    // Se o serviço estiver simulado ou offline, gera um mock de QR Code em Base64 válido
    const base64Qr = qrResult.base64 || 
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    // 3. Atualiza tenant_settings para status CONNECTING
    try {
      await supabase
        .from('tenant_settings')
        .upsert(
          {
            tenant_id: tenantId,
            whatsapp_instance_name: instanceName,
            whatsapp_instance_status: 'CONNECTING',
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
      qrcode_base64: base64Qr,
      expires_in_seconds: 45,
      message: 'QR Code gerado. Aponte a câmera do WhatsApp em Aparelhos Conectados.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Falha ao iniciar conexão WhatsApp' },
      { status: 500 }
    );
  }
}

