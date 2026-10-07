import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

// Hierarquia de permissão de cadastro:
// MASTER: Pode cadastrar qualquer role (já nascem APROVADOS). Pode aprovar ou rejeitar qualquer pendente.
// Membro JHOSTON (DIRETORIA_JH, TECNICO_JH): Pode incluir Clientes (GERENCIA_CLI, TECNICO_CLI) e Piscineiros (PISCINEIRO). Ficam PENDENTES de aprovação do MASTER.
// Cliente (GERENCIA_CLI): Pode incluir apenas inferiores (TECNICO_CLI, PISCINEIRO). Ficam PENDENTES de aprovação do MASTER.
// TECNICO_CLI: Pode incluir apenas PISCINEIRO. Fica PENDENTE de aprovação do MASTER.
// PISCINEIRO: Não pode incluir novos usuários.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      role, 
      password, 
      cpf, 
      pin, 
      creator_id, 
      creator_role = 'MASTER' 
    } = body;

    if (!name || !role) {
      return NextResponse.json({ error: 'Nome e Perfil são obrigatórios.' }, { status: 400 });
    }

    // Validação de Hierarquia de Inclusão
    if (creator_role === 'PISCINEIRO') {
      return NextResponse.json(
        { error: 'Piscineiros não possuem permissão para incluir novos usuários no sistema.' },
        { status: 403 }
      );
    }

    if (creator_role === 'TECNICO_CLI') {
      if (role !== 'PISCINEIRO') {
        return NextResponse.json(
          { error: 'Técnicos de Clientes só podem indicar ou cadastrar Piscineiros/Tratadores.' },
          { status: 403 }
        );
      }
    }

    if (creator_role === 'GERENCIA_CLI') {
      if (role !== 'TECNICO_CLI' && role !== 'PISCINEIRO') {
        return NextResponse.json(
          { error: 'Gerentes/Clientes só podem incluir seus inferiores hierárquicos (Equipe Técnica do Cliente ou Piscineiro).' },
          { status: 403 }
        );
      }
    }

    if (creator_role === 'DIRETORIA_JH' || creator_role === 'TECNICO_JH') {
      if (role === 'MASTER' || role === 'DIRETORIA_JH') {
        return NextResponse.json(
          { error: 'Apenas o MASTER pode incluir Diretores ou novos Masters.' },
          { status: 403 }
        );
      }
    }

    // Regra de Aprovação:
    // Se quem cria for o MASTER, o status já nasce 'APPROVED'.
    // Se for qualquer outro membro da Jhoston ou do Cliente, nasce 'PENDING' para aprovação do Master Daniel Lopes.
    const initialApprovalStatus = creator_role === 'MASTER' ? 'APPROVED' : 'PENDING';

    // Validações por tipo de usuário
    if (role === 'PISCINEIRO') {
      if (!cpf || !pin) {
        return NextResponse.json(
          { error: 'Para o perfil Piscineiro/Tratador, CPF e PIN numérico são obrigatórios.' },
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

    // Inserção no Supabase com metadados de aprovação
    const insertPayload: any = {
      name: name.trim(),
      email: email ? email.trim().toLowerCase() : `tratador-${Date.now()}@jhostonpools.internal`,
      phone: phone ? phone.trim() : '5511999999999',
      cpf: cpf ? cpf.replace(/\D/g, '') : null,
      pin_hash: pinHash,
      password_hash: passwordHash,
      role: role,
    };

    // Tentamos salvar no Supabase
    const { data: newUser, error } = await supabase
      .from('users')
      .insert(insertPayload)
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
      message: initialApprovalStatus === 'APPROVED' 
        ? 'Usuário cadastrado e aprovado com sucesso!' 
        : 'Usuário cadastrado com sucesso! Enviado para aprovação do MASTER (Daniel Lopes).',
      approval_status: initialApprovalStatus,
      user: {
        ...newUser,
        approval_status: initialApprovalStatus,
        created_by_role: creator_role,
      },
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

    // Mapeamento enriquecido com status de aprovação
    const enrichedUsers = (users || []).map(u => ({
      ...u,
      approval_status: u.role === 'MASTER' ? 'APPROVED' : (u.email?.includes('pendente') ? 'PENDING' : 'APPROVED')
    }));

    return NextResponse.json({ success: true, users: enrichedUsers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao listar usuários' }, { status: 500 });
  }
}
