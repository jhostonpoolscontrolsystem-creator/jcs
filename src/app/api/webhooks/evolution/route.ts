import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, instance, data } = body;

    // Resposta de webhook simulado da Evolution API
    // Por exemplo: confirmação de mensagem entregue ou resposta interativa de chatbot
    return NextResponse.json({
      received: true,
      timestamp: new Date().toISOString(),
      event,
      instance,
      status: 'PROCESSED',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Falha no processamento do webhook' },
      { status: 500 }
    );
  }
}
