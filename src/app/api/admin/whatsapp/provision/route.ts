import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { 
  createInstance, 
  restartInstance, 
  deleteInstance, 
  getConnectionState 
} from '@/lib/whatsapp/evolutionClient';

const MASTER_EMAILS = ['danielsmlopes@hotmail.com', 'patigrubel@gmail.com'];

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('x-user-email') || req.headers.get('authorization') || '';
    const userEmail = authHeader.replace('Bearer ', '').trim().toLowerCase();

    // Verificação estrita para Super Admins MASTER
    if (!userEmail || !MASTER_EMAILS.includes(userEmail)) {
      return NextResponse.json(
        { error: 'Acesso negado. Ação restrita à Governança Soberana (Super Administradores).' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { tenantId, action } = body as {
      tenantId: string;
      action: 'CREATE' | 'RESTART' | 'DELETE' | 'STATUS';
    };

    if (!tenantId || !action) {
      return NextResponse.json(
        { error: 'Parâmetros tenantId e action são obrigatórios.' },
        { status: 400 }
      );
    }

    // Padronização do nome da instância: jhpcs_tenant_<clean_12>
    const cleanId = tenantId.replace(/-/g, '').slice(0, 12);
    const instanceName = `jhpcs_tenant_${cleanId}`;

    if (action === 'CREATE') {
      // 1. Cria a instância na Evolution API
      const result = await createInstance(instanceName);

      if (!result.success && !result.error?.includes('already in use')) {
        return NextResponse.json(
          { error: `Falha ao criar instância na Evolution API: ${result.error || 'Erro desconhecido'}` },
          { status: 502 }
        );
      }

      // 2. Salva no banco tenant_settings
      const { error: dbError } = await supabase
        .from('tenant_settings')
        .upsert(
          {
            tenant_id: tenantId,
            whatsapp_instance_name: instanceName,
            whatsapp_instance_status: 'DISCONNECTED',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'tenant_id' }
        );

      if (dbError) {
        console.warn('Erro ao atualizar tenant_settings no Supabase (prosseguindo em fallback):', dbError.message);
      }

      return NextResponse.json({
        success: true,
        message: `Instância ${instanceName} provisionada com sucesso na Evolution API!`,
        instanceName,
        status: 'DISCONNECTED',
      });
    }

    if (action === 'RESTART') {
      const result = await restartInstance(instanceName);
      return NextResponse.json({
        success: result.success,
        message: result.success
          ? `Instância ${instanceName} reiniciada com sucesso.`
          : `Falha ao reiniciar: ${result.error || 'Instância pode estar inativa'}`,
        instanceName,
      });
    }

    if (action === 'DELETE') {
      // 1. Deleta na Evolution API
      const result = await deleteInstance(instanceName);

      // 2. Limpa dados de WhatsApp na tabela tenant_settings
      await supabase
        .from('tenant_settings')
        .update({
          whatsapp_instance_name: null,
          whatsapp_instance_status: 'DISCONNECTED',
          whatsapp_connected_number: null,
          updated_at: new Date().toISOString(),
        })
        .eq('tenant_id', tenantId);

      return NextResponse.json({
        success: true,
        message: `Instância ${instanceName} removida com sucesso.`,
      });
    }

    if (action === 'STATUS') {
      const connState = await getConnectionState(instanceName);
      const isConnected = connState.success && connState.state === 'open';
      const status = isConnected ? 'CONNECTED' : connState.state === 'connecting' ? 'CONNECTING' : 'DISCONNECTED';

      // Atualiza banco com estado atual
      await supabase
        .from('tenant_settings')
        .update({
          whatsapp_instance_status: status,
          whatsapp_connected_number: connState.connectedNumber || null,
          whatsapp_last_sync_at: new Date().toISOString(),
        })
        .eq('tenant_id', tenantId);

      return NextResponse.json({
        success: true,
        instanceName,
        status,
        connectedNumber: connState.connectedNumber || null,
      });
    }

    return NextResponse.json({ error: 'Ação não suportada.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Erro interno no provisionamento de WhatsApp.' },
      { status: 500 }
    );
  }
}

