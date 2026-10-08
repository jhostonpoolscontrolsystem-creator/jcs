import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: dbUsers, error } = await supabase
      .from('users')
      .select('id, name, phone, email, role, created_at')
      .order('created_at', { ascending: false });

    if (error || !dbUsers || dbUsers.length === 0) {
      // Retorna vazio ou fallback caso a tabela esteja zerada
      return NextResponse.json({ success: true, contacts: [] });
    }

    const contacts = dbUsers.map((u) => {
      let company = 'JHoston Pools';
      if (u.role === 'GERENCIA_CLI' || u.role === 'TECNICO_CLI') {
        company = 'Cliente (Hotel / Resort / Residencial)';
      } else if (u.role === 'PISCINEIRO') {
        company = 'Prestador Operacional / Tratador';
      }

      return {
        id: u.id,
        name: u.name,
        phone: u.phone,
        category: u.role,
        company,
        notes: u.email,
      };
    });

    return NextResponse.json({ success: true, contacts });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao consultar contatos do Supabase' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, phone, category = 'GERENCIA_CLI', company = 'Cliente', notes = '' } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Nome e telefone são obrigatórios' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    const generatedEmail = `${name.toLowerCase().replace(/\s+/g, '.')}-${Date.now()}@agenda.jhostonpools.internal`;

    // Salva diretamente na tabela users do Supabase
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        name: name.trim(),
        phone: formattedPhone,
        email: generatedEmail,
        role: category,
      })
      .select('id, name, phone, role, created_at')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const contact = {
      id: newUser.id,
      name: newUser.name,
      phone: newUser.phone,
      category: newUser.role,
      company: company.trim(),
      notes: notes.trim(),
    };

    return NextResponse.json({
      success: true,
      message: 'Contato persistido com sucesso no banco de dados Supabase!',
      contact,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao persistir contato' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID do contato é obrigatório' }, { status: 400 });
    }

    const { error } = await supabase.from('users').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Contato excluído com sucesso!',
      deleted_id: id
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao excluir contato' }, { status: 500 });
  }
}

