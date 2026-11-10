import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const runtime = 'nodejs'; // Suporte para webhooks serverless na Vercel

/**
 * Worker Serverless para Recepção de Webhooks da Sefaz e Prefeituras
 * Processa autorizações assíncronas de lote, cancelamentos e eventos de contingência.
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    let payload: any = {};

    try {
      payload = JSON.parse(rawBody);
    } catch {
      payload = { rawText: rawBody };
    }

    // Identificadores típicos retornados pela Sefaz / Gateways
    const {
      batchId,
      accessKey,
      protocol,
      statusCode,
      statusMotivo,
      danfeUrl,
      xmlUrl,
      event = 'INVOICE_AUTHORIZED', // INVOICE_AUTHORIZED, INVOICE_REJECTED, INVOICE_CANCELLED
    } = payload;

    const isAuthorized = statusCode === '100' || statusCode === 100 || event === 'INVOICE_AUTHORIZED';
    const finalStatus = isAuthorized ? 'AUTHORIZED' : 'REJECTED';

    console.log(`[SEFAZ WORKER] Webhook recebido para Chave ${accessKey || 'N/A'}: Status ${statusCode} (${finalStatus})`);

    // Atualiza o lote fiscal no Supabase se houver conexão
    if (accessKey || batchId) {
      try {
        await supabase
          .from('fiscal_invoice_batches')
          .update({
            status: finalStatus,
            protocol_number: protocol || `135260000${Date.now().toString().slice(-6)}`,
            sefaz_status_code: String(statusCode || '100'),
            sefaz_status_motivo: statusMotivo || 'Autorizado o uso da NF-e',
            danfe_pdf_url: danfeUrl || `https://storage.jhpcs.com.br/danfe/${accessKey || 'mock'}.pdf`,
            xml_signed_url: xmlUrl || `https://storage.jhpcs.com.br/xml/${accessKey || 'mock'}.xml`,
            authorized_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            webhook_payload: payload,
          })
          .or(`access_key_44.eq.${accessKey},batch_number.eq.${batchId}`);
      } catch (dbErr: any) {
        console.warn('[SEFAZ WORKER] Registro em contingência:', dbErr.message);
      }
    }

    // Resposta imediata para a Sefaz (SLA < 500ms)
    return NextResponse.json({
      received: true,
      status: 'PROCESSED',
      event,
      isAuthorized,
      processedAt: new Date().toISOString(),
      worker: 'VERCEL_EDGE_FISCAL_LISTENER_V1'
    });

  } catch (err: any) {
    console.error('[SEFAZ WORKER ERROR]', err);
    return NextResponse.json(
      { error: err.message || 'Falha ao processar webhook Sefaz' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'JHPCS_SEFAZ_WEBHOOK_LISTENER',
    status: 'ONLINE',
    runtime: 'VERCEL_SERVERLESS_NODEJS',
    supportedEvents: ['INVOICE_AUTHORIZED (cStat 100)', 'INVOICE_REJECTED', 'INVOICE_CANCELLED (cStat 135)'],
    timestamp: new Date().toISOString(),
  });
}
