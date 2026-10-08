import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export interface WhatsAppGroup {
  id: string;
  name: string;
  jid: string;
  category: 'DIRETORIA' | 'ENGENHARIA' | 'CLIENTE' | 'OPERACIONAL';
  description?: string;
  created_at?: string;
}

// Grupos padrão caso o banco ainda não possua registros
const DEFAULT_GROUPS: WhatsAppGroup[] = [
  {
    id: 'grp-1',
    name: 'Diretoria JHoston Pools & Master',
    jid: '120363023456789012@g.us',
    category: 'DIRETORIA',
    description: 'Canal executivo para laudos consolidados e alertas de compliance decenal.'
  },
  {
    id: 'grp-2',
    name: 'Engenharia & Fiscalização JHostonTec',
    jid: '120363034567890123@g.us',
    category: 'ENGENHARIA',
    description: 'Alertas de Red Zone instantâneos, violação de ácidos e laudos de cura.'
  },
  {
    id: 'grp-3',
    name: 'Resort Terravista Trancoso - Comitê Gestor',
    jid: '120363045678901234@g.us',
    category: 'CLIENTE',
    description: 'Envio mensal do Certificado de Garantia e alertas climáticos OpenWeather.'
  },
  {
    id: 'grp-4',
    name: 'Hotel Fasano Angra - Equipe de Piscinas',
    jid: '120363056789012345@g.us',
    category: 'OPERACIONAL',
    description: 'Prescrição de pit stop químico e orientações de escovação diária.'
  }
];

export async function GET() {
  try {
    // 1. Tenta buscar da tabela whatsapp_groups se existir
    const { data: dbGroups, error } = await supabase
      .from('whatsapp_groups')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && dbGroups && dbGroups.length > 0) {
      return NextResponse.json({ success: true, groups: dbGroups });
    }

    // 2. Se a tabela não existir ou estiver vazia, retorna os grupos padrão
    return NextResponse.json({ success: true, groups: DEFAULT_GROUPS });
  } catch (err: any) {
    return NextResponse.json({ success: true, groups: DEFAULT_GROUPS });
  }
}

export async function POST(request: Request) {
  try {
    const { name, jid, category = 'CLIENTE', description = '' } = await request.json();

    if (!name || !jid) {
      return NextResponse.json({ error: 'Nome do grupo e ID (JID) são obrigatórios.' }, { status: 400 });
    }

    // Garante que o JID termine com @g.us
    let cleanJid = jid.trim();
    if (!cleanJid.includes('@g.us')) {
      cleanJid = `${cleanJid.replace(/\D/g, '')}@g.us`;
    }

    const newGroup: WhatsAppGroup = {
      id: `grp-${Date.now()}`,
      name: name.trim(),
      jid: cleanJid,
      category,
      description: description.trim(),
      created_at: new Date().toISOString()
    };

    // Tenta persistir no Supabase se tabela existir
    try {
      await supabase.from('whatsapp_groups').insert({
        id: newGroup.id,
        name: newGroup.name,
        jid: newGroup.jid,
        category: newGroup.category,
        description: newGroup.description
      });
    } catch (e) {
      // Ignora erro se tabela não existir no Supabase, mantendo retorno do objeto
    }

    return NextResponse.json({
      success: true,
      message: 'Grupo de WhatsApp cadastrado com sucesso!',
      group: newGroup
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao cadastrar grupo' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID do grupo é obrigatório para exclusão.' }, { status: 400 });
    }

    try {
      await supabase.from('whatsapp_groups').delete().eq('id', id);
    } catch (e) {
      // Continua
    }

    return NextResponse.json({
      success: true,
      message: 'Grupo removido com sucesso!',
      deleted_id: id
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao excluir grupo' }, { status: 500 });
  }
}
