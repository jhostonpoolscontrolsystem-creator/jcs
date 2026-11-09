import { NextRequest, NextResponse } from 'next/server';
import { sendTextMessage } from '@/lib/whatsapp/evolutionClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tenant_id = '11111111-0000-0000-0000-000000000001', target_phone = '5511999998888' } = body;
    const instanceName = `jhpcs_tenant_${tenant_id.replace(/-/g, '').slice(0, 12)}`;

    const testMessage = 
`✅ *JHPCS • PAREAMENTO WHATSAPP CONCLUÍDO COM SUCESSO!*

Parabéns! Seu número de WhatsApp corporativo foi vinculado com sucesso à plataforma JHPCS.

A partir de agora:
1. Os laudos periciais de manutenção serão enviados automaticamente com a sua marca.
2. Os links de cobrança PIX e lembretes de fatura sairão deste número.

_Tecnologia & Gestão Inteligente de Piscinas JHPCS_`;

    const sendRes = await sendTextMessage(instanceName, target_phone, testMessage);

    return NextResponse.json({
      success: true,
      message: 'Mensagem de teste despachada com sucesso!',
      sendRes,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Falha ao enviar mensagem de teste' },
      { status: 500 }
    );
  }
}

