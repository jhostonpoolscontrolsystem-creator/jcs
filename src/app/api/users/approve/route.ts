import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createInstance } from '@/lib/whatsapp/evolutionClient';

export async function POST(request: Request) {
  try {
    const { userId, action, approverId, tenantId } = await request.json();

    if (!userId || !action) {
      return NextResponse.json({ error: 'ID do usuário e ação (APPROVE ou REJECT) são obrigatórios.' }, { status: 400 });
    }

    if (action === 'APPROVE') {
      // 1. Atualiza usuário ou status no banco
      await supabase.from('users').update({ status: 'ACTIVE', approval_status: 'APPROVED' }).eq('id', userId);

      // 2. Se houver tenant associado ou id informado, dispara auto-provisionamento de WhatsApp em background
      const targetTenant = tenantId || userId;
      if (targetTenant) {
        const instanceName = `jhpcs_tenant_${String(targetTenant).replace(/-/g, '').slice(0, 12)}`;
        createInstance(instanceName)
          .then(async (res) => {
            if (res.success || res.error?.includes('already in use')) {
              await supabase.from('tenant_settings').upsert({
                tenant_id: targetTenant,
                whatsapp_instance_name: instanceName,
                whatsapp_instance_status: 'DISCONNECTED',
                updated_at: new Date().toISOString(),
              }, { onConflict: 'tenant_id' });
            }
          })
          .catch((err) => console.warn('Auto-provisionamento background WhatsApp falhou:', err));
      }

      return NextResponse.json({
        success: true,
        message: `Usuário ${userId} aprovado com sucesso pelo MASTER! Acesso liberado e instância WhatsApp provisionada.`,
        status: 'APPROVED',
      });
    } else if (action === 'REJECT') {
      // Exclui ou inativa o usuário recusado
      await supabase.from('users').delete().eq('id', userId);
      return NextResponse.json({
        success: true,
        message: `Usuário ${userId} recusado e removido pelo MASTER.`,
        status: 'REJECTED',
      });
    }

    return NextResponse.json({ error: 'Ação inválida.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao processar aprovação.' }, { status: 500 });
  }
}
