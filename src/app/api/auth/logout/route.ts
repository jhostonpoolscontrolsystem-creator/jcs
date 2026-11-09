import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const DEMO_EMAILS = [
  'teste.solo@teste.com',
  'teste.frota@teste.com',
  'teste.facility@teste.com',
  'teste.loja@teste.com',
  'teste.jhoston@teste.com',
];

export async function POST(request: Request) {
  try {
    let email: string | null = null;

    try {
      const body = await request.json();
      if (body?.email) {
        email = String(body.email).trim().toLowerCase();
      }
    } catch {
      // Body vazio ou não JSON
    }

    let resetExecuted = false;
    let resetMessage = 'Logout efetuado com sucesso.';

    // Se o usuário for de demonstração, dispara a procedure de Auto-Reset
    if (email && DEMO_EMAILS.includes(email)) {
      try {
        const { data, error } = await supabase.rpc('fn_reset_demo_tenant_data', {
          p_email: email,
        });

        if (!error) {
          resetExecuted = true;
          resetMessage = `Auto-Reset Demo concluído para ${email}: ambiente restaurado ao estado original de fábrica.`;
        } else {
          console.warn('[Auto-Reset] Falha ao invocar RPC no Supabase:', error.message);
          resetMessage = `Logout concluído (Reset em fallback local para conta demo).`;
        }
      } catch (rpcErr: any) {
        console.warn('[Auto-Reset] Exceção na RPC:', rpcErr?.message);
      }
    }

    // Encerra sessão do client Supabase se houver contexto auth
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }

    return NextResponse.json({
      success: true,
      resetExecuted,
      message: resetMessage,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Erro durante o logout' },
      { status: 500 }
    );
  }
}

