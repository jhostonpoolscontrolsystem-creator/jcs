import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { maskEmail } from '@/lib/lgpd-masking';

export async function GET(request: Request) {
  try {
    // Busca logs de auditoria ordenados do mais recente pro mais antigo
    const { data: logs, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // LGPD Compliance: Mascara e-mails e dados de identificação sensíveis de terceiros
    const sanitizedLogs = (logs || []).map((log: any) => ({
      ...log,
      user_email: log.user_email ? maskEmail(log.user_email) : '***@***.com',
      ip_address: log.ip_address ? log.ip_address.replace(/\.\d+$/, '.***') : '***.***.***.***',
    }));

    return NextResponse.json({ success: true, logs: sanitizedLogs, lgpd_protected: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Falha ao buscar logs' }, { status: 500 });
  }
}
