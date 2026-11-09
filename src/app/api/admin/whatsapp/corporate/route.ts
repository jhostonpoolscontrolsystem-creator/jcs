import { NextRequest, NextResponse } from 'next/server';
import { 
  createInstance, 
  getConnectionState, 
  getQRCode, 
  disconnectInstance, 
  sendTextMessage 
} from '@/lib/whatsapp/evolutionClient';

export const dynamic = 'force-dynamic';

const MASTER_EMAILS = ['danielsmlopes@hotmail.com', 'patigrubel@gmail.com'];
const CORPORATE_INSTANCE_NAME = 'jhoston_corporate_master';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('x-user-email') || req.headers.get('authorization') || '';
    const userEmail = authHeader.replace('Bearer ', '').trim().toLowerCase();

    if (!userEmail || !MASTER_EMAILS.includes(userEmail)) {
      return NextResponse.json({ error: 'Acesso restrito ao Super Administrador.' }, { status: 403 });
    }

    const connState = await getConnectionState(CORPORATE_INSTANCE_NAME);
    return NextResponse.json({
      success: true,
      instanceName: CORPORATE_INSTANCE_NAME,
      state: connState.state,
      connectedNumber: connState.connectedNumber || null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao consultar WhatsApp Corporativo' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('x-user-email') || req.headers.get('authorization') || '';
    const userEmail = authHeader.replace('Bearer ', '').trim().toLowerCase();

    if (!userEmail || !MASTER_EMAILS.includes(userEmail)) {
      return NextResponse.json({ error: 'Acesso restrito ao Super Administrador.' }, { status: 403 });
    }

    const body = await req.json();
    const { action, targetPhone } = body as {
      action: 'CONNECT' | 'DISCONNECT' | 'SEND_TEST' | 'STATUS';
      targetPhone?: string;
    };

    if (action === 'CONNECT') {
      // 1. Cria a instância se ainda não existir
      await createInstance(CORPORATE_INSTANCE_NAME);

      // 2. Busca o QR Code
      const qrRes = await getQRCode(CORPORATE_INSTANCE_NAME);
      return NextResponse.json({
        success: true,
        instanceName: CORPORATE_INSTANCE_NAME,
        qrcode: qrRes.base64 || null,
        pairingCode: qrRes.pairingCode || null,
      });
    }

    if (action === 'DISCONNECT') {
      const result = await disconnectInstance(CORPORATE_INSTANCE_NAME);
      return NextResponse.json({
        success: result.success,
        message: 'WhatsApp Matriz Jhoston desconectado com sucesso.',
      });
    }

    if (action === 'SEND_TEST') {
      const recipient = targetPhone || '5511999998888';
      const msg = `🏛️ *Jhoston Pools & Lagoons (Matriz)*\n\nOlá! Esta é uma mensagem de teste do canal institucional do ecossistema JHPCS.\n\nStatus: Homologado e Operacional.\nData: ${new Date().toLocaleString('pt-BR')}`;
      
      const res = await sendTextMessage(CORPORATE_INSTANCE_NAME, recipient, msg);
      return NextResponse.json({
        success: res.success,
        message: res.success ? 'Mensagem de teste disparada com sucesso!' : (res.error || 'Falha no envio'),
      });
    }

    if (action === 'STATUS') {
      const connState = await getConnectionState(CORPORATE_INSTANCE_NAME);
      return NextResponse.json({
        success: true,
        instanceName: CORPORATE_INSTANCE_NAME,
        state: connState.state,
        connectedNumber: connState.connectedNumber || null,
      });
    }

    return NextResponse.json({ error: 'Ação inválida.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro interno no conector corporativo.' }, { status: 500 });
  }
}
