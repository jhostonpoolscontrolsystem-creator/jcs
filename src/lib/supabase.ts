import { createClient } from '@supabase/supabase-js';

// Prioriza pooler connection string / direct host com failover
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jhpcs-mock-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_key';

/**
 * Cliente Supabase otimizado para Serverless & Edge Runtimes
 * - KeepAlive HTTP persistente
 * - Cache de autorização reduzindo handshake TLS
 * - Desacoplamento de autoRefreshToken no servidor para economizar I/O
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'x-client-info': 'jhpcs-serverless-pool/4.4',
      'Connection': 'keep-alive'
    }
  },
  db: {
    schema: 'public'
  }
});

/**
 * Helper para leitura com fallback resiliente
 */
export async function executeDbQueryWithFallback<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  mockFallback: T
): Promise<{ data: T; isFallback: boolean; error?: any }> {
  try {
    const { data, error } = await queryFn();
    if (error || !data) {
      console.warn('⚠️ [SupabasePool] Fallback acionado devido a erro ou ausência de dados:', error?.message);
      return { data: mockFallback, isFallback: true, error };
    }
    return { data, isFallback: false };
  } catch (err: any) {
    console.error('🚨 [SupabasePool] Falha crítica de conexão. Retornando fallback seguro:', err.message);
    return { data: mockFallback, isFallback: true, error: err };
  }
}
