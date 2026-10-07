import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, currentPassword, newPassword } = await request.json();

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Email, senha atual e nova senha são obrigatórios.' }, { status: 400 });
    }

    // Regra Obrigatória: A nova senha deve ter no mínimo 6 caracteres e conter ao menos 1 caractere especial
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'A nova senha deve ter pelo menos 6 caracteres.' }, { status: 400 });
    }

    if (!specialCharRegex.test(newPassword)) {
      return NextResponse.json({ 
        error: 'A nova senha deve conter pelo menos 1 caractere especial (ex: ! @ # $ % & *).' 
      }, { status: 400 });
    }

    if (newPassword === '123456') {
      return NextResponse.json({ error: 'A nova senha não pode ser a senha provisória padrão.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Atualiza no Supabase
    const { error: updateError } = await supabase
      .from('users')
      .update({ password_hash: newPasswordHash })
      .eq('email', cleanEmail);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Senha alterada com sucesso e validada com caracteres especiais!',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao alterar senha.' }, { status: 500 });
  }
}
