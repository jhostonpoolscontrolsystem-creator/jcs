import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, role, password, cpf, pin } = body;

    if (!name || !role) {
      return NextResponse.json({ error: 'Nome e Perfil são obrigatórios.' }, { status: 400 });
    }

    // Validações por tipo de usuário
    if (role === 'PISCINEIRO') {
      if (!cpf || !pin) {
        return NextResponse.json(
          { error: 'Para o perfil Piscineiro/Tratador, CPF e PIN numérico de 4 a 6 dígitos são obrigatórios.' },
          { status: 400 }
        );
      }
    } else {
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Para diretores, técnicos e clientes, Email e Senha são obrigatórios.' },
          { status: 400 }
        );
      }
    }

    // Hashes
    const passwordHash = password ? await bcrypt.hash(password, 10) : null;
    const pinHash = pin ? await bcrypt.hash(pin, 10) : null;

    // Inserção no Supabase
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        name: name.trim(),
        email: email ? email.trim().toLowerCase() : `tratador-${Date.now()}@jhostonpools.internal`,
        phone: phone ? phone.trim() : '5511999999999',
        cpf: cpf ? cpf.replace(/\D/g, '') : null,
        pin_hash: pinHash,
        password_hash: passwordHash,
        role: role,
      })
      .select('id, name, email, phone, role, cpf, created_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Já existe um usuário cadastrado com este e-mail ou CPF.' },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Usuário cadastrado com sucesso!',
      user: newUser,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro interno no servidor' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, phone, role, cpf, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, users });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao listar usuários' }, { status: 500 });
  }
}
