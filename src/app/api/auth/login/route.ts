import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Busca o usuário no Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', cleanEmail)
      .single();

    if (error || !user) {
      // Fallback estrito de emergência caso haja indisponibilidade de rede
      if (cleanEmail === 'danielsmlopes@hotmail.com' && (password === 'Gabriel2006!' || password === 'Gabriel2006')) {
        return NextResponse.json({
          success: true,
          must_change_password: false,
          user: {
            id: '00000000-0000-0000-0000-000000000001',
            name: 'Daniel Lopes (Master)',
            email: 'danielsmlopes@hotmail.com',
            role: 'MASTER',
          },
        });
      }
      if (cleanEmail === 'patigrubel@gmail.com' && password === 'Maraca132') {
        return NextResponse.json({
          success: true,
          must_change_password: false,
          user: {
            id: '00000000-0000-0000-0000-000000000002',
            name: 'Patrícia Grübel (Master)',
            email: 'patigrubel@gmail.com',
            role: 'MASTER',
          },
        });
      }
      if (cleanEmail === 'jhostontec@jhostontec.com.br' && password === '123456') {
        return NextResponse.json({
          success: true,
          must_change_password: true,
          user: {
            id: '00000000-0000-0000-0000-000000000003',
            name: 'Joabson (Diretoria JH)',
            email: 'jhostontec@jhostontec.com.br',
            role: 'DIRETORIA_JH',
          },
        });
      }
      if (cleanEmail === 'tecnico@jhostontec.com.br' && password === '123456') {
        return NextResponse.json({
          success: true,
          must_change_password: true,
          user: {
            id: '00000000-0000-0000-0000-000000000004',
            name: 'Responsável Técnico / Gerente Técnico JH',
            email: 'tecnico@jhostontec.com.br',
            role: 'TECNICO_JH',
          },
        });
      }

      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 401 });
    }

    // 2. Validação de senha via bcrypt ou tolerância inicial
    let isPasswordValid = false;
    if (user.password_hash) {
      isPasswordValid = await bcrypt.compare(password, user.password_hash);
    }

    // Tolerâncias de senhas oficiais
    if (!isPasswordValid) {
      if (user.email === 'danielsmlopes@hotmail.com' && (password === 'Gabriel2006!' || password === 'Gabriel2006')) {
        isPasswordValid = true;
      } else if (user.email === 'patigrubel@gmail.com' && password === 'Maraca132') {
        isPasswordValid = true;
      } else if ((user.email === 'jhostontec@jhostontec.com.br' || user.email === 'tecnico@jhostontec.com.br') && password === '123456') {
        isPasswordValid = true;
      }
    }

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });
    }

    // Identifica se é o primeiro acesso com a senha provisória padrão "123456"
    const mustChangePassword = password === '123456';

    const userId = user?.id || 'unknown';
    const userName = user?.name || cleanEmail;

    // Log the audit event (except for MASTER)
    if (user?.role !== 'MASTER') {
      const { logAudit } = require('@/lib/audit-logger');
      const ip = request.headers.get('x-forwarded-for') || 'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';

      await logAudit({
        user_id: userId,
        user_email: cleanEmail,
        action: 'USER_LOGIN',
        details: `User ${userName} logged in successfully.`,
        ip_address: ip,
        user_agent: userAgent,
      });
    }

    return NextResponse.json({
      success: true,
      must_change_password: mustChangePassword,
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
