import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const startTime = Date.now();
  
  try {
    // 1. Query leve para manter o banco PostgreSQL aquecido e ativo
    const { data, error, count } = await supabase
      .from('pools')
      .select('id, name', { count: 'exact', head: false })
      .limit(1);

    const latency = Date.now() - startTime;

    if (error) {
      console.warn('⚠️ [KeepAlive] Erro ao consultar Supabase:', error.message);
      return NextResponse.json({
        status: 'warning',
        message: 'Falha ao acordar banco de dados',
        error: error.message,
        latency_ms: latency,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // 2. Registro de pulso de vida
    return NextResponse.json({
      status: 'ok',
      message: 'Supabase PostgreSQL está 100% ativo e acordado',
      database: 'connected',
      latency_ms: latency,
      pools_count: count ?? data?.length ?? 0,
      timestamp: new Date().toISOString()
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Exceção ao executar Keep-Alive',
      error: err.message,
      latency_ms: Date.now() - startTime,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

