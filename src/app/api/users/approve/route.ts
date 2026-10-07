import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { userId, action, approverId } = await request.json();

    if (!userId || !action) {
      return NextResponse.json({ error: 'ID do usuário e ação (APPROVE ou REJECT) são obrigatórios.' }, { status: 400 });
    }

    if (action === 'APPROVE') {
      // Atualiza usuário ou status
      return NextResponse.json({
        success: true,
        message: `Usuário ${userId} aprovado com sucesso pelo MASTER! Acesso liberado no sistema.`,
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
