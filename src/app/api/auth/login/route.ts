import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios.' }, { status: 400 });
    }

    // Busca o usuário no Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error || !user) {
      // Fallback para Master durante testes locais se não houver internet
      if (email.trim().toLowerCase() === 'danielsmlopes@hotmail.com' && (password === 'Gabriel2006!' || password === 'Gabriel2006')) {
        return NextResponse.json({
          success: true,
          user: {
            id: '00000000-0000-0000-0000-000000000001',
            name: 'Daniel Lopes (Master)',
            email: 'danielsmlopes@hotmail.com',
            role: 'MASTER',
          },
        });
      }
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 401 });
    }

    // Valida senha com bcrypt ou senha padrão temporária
    let isPasswordValid = false;
    if (user.password_hash) {
      isPasswordValid = await bcrypt.compare(password, user.password_hash);
    }

    // Tolerância para Daniel com Gabriel2006 ou Gabriel2006!
    if (!isPasswordValid && user.role === 'MASTER' && (password === 'Gabriel2006!' || password === 'Gabriel2006')) {
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token: `jwt-jhpcs-${user.id}-${Date.now()}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Falha no login' }, { status: 500 });
  }
}
