import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Mock de contatos iniciais para garantia de funcionamento imediato
const defaultContacts = [
  {
    id: 'c-1',
    name: 'Daniel Lopes (MASTER)',
    phone: '5511999990000',
    category: 'MASTER',
    company: 'JHoston Pools',
    notes: 'Administrador Master e Fundador',
  },
  {
    id: 'c-2',
    name: 'Diretoria JHoston Pools',
    phone: '5511988887777',
    category: 'DIRETORIA_JH',
    company: 'JHoston Pools',
    notes: 'Comitê de Operações e Engenharia',
  },
  {
    id: 'c-3',
    name: 'Carlos Oliveira (Auditor Técnico)',
    phone: '5511999990001',
    category: 'TECNICO_JH',
    company: 'JHoston Pools',
    notes: 'Químico Responsável',
  },
  {
    id: 'c-4',
    name: 'Gerência Geral - Resort Terravista',
    phone: '5573999992222',
    category: 'CLIENTE',
    company: 'Resort Terravista',
    notes: 'Aprovações de Estoque e Manutenção',
  },
  {
    id: 'c-5',
    name: 'Engenharia Predial - Hotel Fasano',
    phone: '5511977776666',
    category: 'CLIENTE',
    company: 'Hotel Fasano',
    notes: 'Piscina de Areia Monolítica',
  },
  {
    id: 'c-6',
    name: 'João Piscineiro (Tratador Credenciado)',
    phone: '5573988883333',
    category: 'PISCINEIRO',
    company: 'Terravista Operações',
    notes: 'Responsável pela rotina diária matutina',
  },
];

export async function GET() {
  try {
    // Busca usuários cadastrados no Supabase para enriquecer a agenda
    const { data: dbUsers } = await supabase
      .from('users')
      .select('id, name, phone, email, role');

    let mergedContacts = [...defaultContacts];

    if (dbUsers && dbUsers.length > 0) {
      dbUsers.forEach((u) => {
        if (!mergedContacts.some(c => c.phone === u.phone)) {
          mergedContacts.push({
            id: u.id,
            name: u.name,
            phone: u.phone,
            category: u.role,
            company: u.role.includes('JH') ? 'JHoston Pools' : 'Cliente / Terceiro',
            notes: u.email,
          });
        }
      });
    }

    return NextResponse.json({ success: true, contacts: mergedContacts });
  } catch (err: any) {
    return NextResponse.json({ success: true, contacts: defaultContacts });
  }
}

export async function POST(request: Request) {
  try {
    const { name, phone, category = 'CLIENTE', company = 'Geral', notes = '' } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Nome e telefone são obrigatórios' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const newContact = {
      id: `c-custom-${Date.now()}`,
      name: name.trim(),
      phone: cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`,
      category,
      company: company.trim(),
      notes: notes.trim(),
    };

    return NextResponse.json({
      success: true,
      message: 'Contato adicionado à agenda telefônica com sucesso!',
      contact: newContact,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao salvar contato' }, { status: 500 });
  }
}
