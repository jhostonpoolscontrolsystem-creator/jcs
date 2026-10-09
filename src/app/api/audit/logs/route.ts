import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    // Busca logs de auditoria ordenados do mais recente pro mais antigo
    const { data: logs, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200); // Traz os últimos 200 logs

    if (error) {
      // Se a tabela não existir ainda ou der erro
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, logs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Falha ao buscar logs' }, { status: 500 });
  }
}
