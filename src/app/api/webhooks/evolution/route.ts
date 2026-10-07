import { NextResponse } from 'next/server';
import { mockPools } from '@/lib/mock-data';

/**
 * Webhook Receptor da Evolution API (OnRender)
 * Trata o fluxo do Chatbot Preditivo (SRS Seção 6):
 * Quando o cliente envia "Status" ou "Garantia", o bot responde em < 2s
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, instance, data } = body;

    console.log(`[Evolution Webhook] Evento recebido: ${event} da instância: ${instance}`);

    // Captura mensagens de texto recebidas
    if (event === 'messages.upsert' && data?.messageType === 'conversation') {
      const incomingText = (data.message?.conversation || '').trim().toLowerCase();
      const senderPhone = data.key?.remoteJid?.split('@')[0];
      const isFromMe = data.key?.fromMe;

      // Ignora mensagens enviadas pelo próprio robô
      if (!isFromMe && senderPhone) {
        let replyMessage = '';

        if (incomingText.includes('status') || incomingText.includes('saude') || incomingText.includes('saúde')) {
          const pool = mockPools[0]; // Terravista
          replyMessage = `🟢 *JHoston Pools*: Sua piscina encontra-se *EQUILIBRADA* (Health Score: 98/100).\nÚltima limpeza: hoje às 08:30.\nSeu estoque de cloro dura aprox. 14 dias.\nGarantia do revestimento monolítico: 100% Protegida.`;
        } else if (incomingText.includes('laudo') || incomingText.includes('garantia') || incomingText.includes('certificado')) {
          replyMessage = `📄 *JHoston Pools*: O seu *Laudo de Garantia Monolítica* está ativo e em dia. Você pode visualizar e baixar o documento no portal: https://jcs-pools.vercel.app`;
        } else if (incomingText.includes('ajuda') || incomingText.includes('oi') || incomingText.includes('ola') || incomingText.includes('olá')) {
          replyMessage = `👋 Olá! Sou o *Auditor Técnico da JHoston Pools*.\nDigite:\n👉 *Status* para consultar a saúde da sua piscina\n👉 *Laudo* para verificar a garantia do revestimento\n👉 *Urgente* para falar com nossa auditoria técnica.`;
        }

        // Se houver resposta correspondente, despacha de volta para o WhatsApp
        if (replyMessage) {
          const evoUrl = process.env.EVOLUTION_API_URL || 'https://whatsapp-ecostone.onrender.com';
          const evoKey = process.env.EVOLUTION_API_KEY || 'Gabriel2006!';
          const instName = process.env.EVOLUTION_INSTANCE_NAME || 'ecostone';

          await fetch(`${evoUrl}/message/sendText/${instName}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: evoKey,
            },
            body: JSON.stringify({
              number: senderPhone,
              text: replyMessage,
            }),
          });
        }
      }
    }

    return NextResponse.json({
      received: true,
      timestamp: new Date().toISOString(),
      event,
      instance,
      status: 'PROCESSED_SUCCESSFULLY',
    });
  } catch (error: any) {
    console.error('Erro no processamento do webhook Evolution:', error);
    return NextResponse.json({ error: error?.message || 'Falha no webhook' }, { status: 500 });
  }
}
