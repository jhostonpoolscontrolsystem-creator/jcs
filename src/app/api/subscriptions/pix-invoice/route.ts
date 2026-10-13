import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MASTER_CONTACTS, notifyAllMastersViaWhatsApp } from '@/lib/master-contacts';

/**
 * Utilitário de Geração de Payload PIX Padrão EMV BR Code (Bacen / Banco Central)
 */
function generatePixPayload(key: string, name: string, city: string, amount: number, txid: string): string {
  const formatField = (id: string, value: string) => {
    const len = value.length.toString().padStart(2, '0');
    return `${id}${len}${value}`;
  };

  const cleanKey = key.replace(/[^0-9a-zA-Z@._-]/g, '');
  const cleanName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().slice(0, 25);
  const cleanCity = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().slice(0, 15);
  const strAmount = amount.toFixed(2);
  const cleanTxid = txid.slice(0, 25);

  const merchantAccountInfo = formatField('00', 'BR.GOV.BCB.PIX') + formatField('01', cleanKey);
  const additionalDataField = formatField('05', cleanTxid);

  let payload = 
    formatField('00', '01') +
    formatField('26', merchantAccountInfo) +
    formatField('52', '0000') +
    formatField('53', '986') +
    formatField('54', strAmount) +
    formatField('58', 'BR') +
    formatField('59', cleanName) +
    formatField('60', cleanCity) +
    formatField('62', additionalDataField);

  // Cálculo de CRC16 CCITT
  payload += '6304';
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= (payload.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  const crcHex = crc.toString(16).toUpperCase().padStart(4, '0');
  return payload + crcHex;
}

/**
 * POST /api/subscriptions/pix-invoice
 * Gera cobrança Pix com vencimento no dia 05, QR Code e envia fatura no WhatsApp
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pool_id, client_name, client_phone, tier, send_whatsapp } = body;

    const tierPrices: Record<string, { value: number; label: string; period: string }> = {
      STANDARD: { value: 0, label: 'Standard Incluso', period: 'Mensal (1 Laudo)' },
      PRO_EXECUTIVE: { value: 29.90, label: 'Pro Executive (Quinzenal)', period: 'Mensal' },
      BLACK_ELITE: { value: 49.90, label: 'Black Elite / Resort (Semanal)', period: 'Mensal' },
      PRO_ANNUAL: { value: 299.00, label: 'Pro Executive Anual', period: 'Anual' },
      BLACK_ANNUAL: { value: 499.00, label: 'Black Elite Anual', period: 'Anual' },
    };

    const plan = tierPrices[tier] || tierPrices.PRO_EXECUTIVE;
    if (plan.value === 0) {
      return NextResponse.json({
        message: 'Tier gratuito não requer fatura Pix.',
        amount: 0
      });
    }

    // Vencimento fixado até o dia 05 do mês subsequente ou corrente
    const now = new Date();
    let dueDay = 5;
    let dueMonth = now.getMonth();
    let dueYear = now.getFullYear();

    if (now.getDate() > 5) {
      dueMonth += 1;
      if (dueMonth > 11) {
        dueMonth = 0;
        dueYear += 1;
      }
    }
    const dueDate = new Date(dueYear, dueMonth, dueDay);
    const dueDateFormatted = dueDate.toLocaleDateString('pt-BR');

    // Chave Pix Oficial JHoston Pools (CNPJ ou Chave Cadastrada)
    const pixKey = process.env.PIX_KEY || '51989445000109'; // CNPJ JHoston Tec / Stone
    const merchantName = 'JHOSTON POOLS TEC';
    const merchantCity = 'SAO PAULO';
    const txid = `JHP${pool_id ? pool_id.replace(/[^a-zA-Z0-9]/g, '').slice(-10) : 'SUB'}${Date.now().toString().slice(-6)}`;

    const pixCopiaECola = generatePixPayload(pixKey, merchantName, merchantCity, plan.value, txid);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pixCopiaECola)}`;

    let whatsappSent = false;
    let whatsappResponse = null;

    // Disparo imediato via WhatsApp se solicitado
    if (send_whatsapp && client_phone) {
      const evolutionApiUrl = process.env.EVOLUTION_API_URL || 'https://whatsapp-ecostone.onrender.com';
      const evolutionApiKey = process.env.EVOLUTION_API_KEY || 'jcs_evo_2026_secret_key';
      const instanceName = process.env.EVOLUTION_INSTANCE_NAME || 'jcs-primary';
      const cleanPhone = client_phone.replace(/\D/g, '');

      const messageText = `🌊 *JHOSTON POOLS • FATURA DE ASSINATURA JHPCS*
Olá, *${client_name || 'Gestor'}*!

Sua assinatura do sistema *JHPCS Analytics VIP* referente ao plano *${plan.label}* está disponível para quitação antecipada.

💎 *Plano:* ${plan.label}
💰 *Valor:* R$ ${plan.value.toFixed(2).replace('.', ',')}
📅 *Vencimento Antecipado:* ${dueDateFormatted} (Vencimento rigoroso até dia 05)
🔒 *Chave PIX (CNPJ):* ${pixKey}

*Código PIX Copia e Cola:*
\`\`\`${pixCopiaECola}\`\`\`

_A confirmação antecipada garante o envio ininterrupto dos laudos quinzenais/semanais com blindagem pericial da garantia da piscina._`;

      try {
        const evoRes = await fetch(`${evolutionApiUrl}/message/sendText/${instanceName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': evolutionApiKey,
          },
          body: JSON.stringify({
            number: cleanPhone,
            text: messageText,
            options: { delay: 1200, presence: 'composing' },
          }),
        });

        if (evoRes.ok) {
          whatsappSent = true;
          whatsappResponse = await evoRes.json();
        }
      } catch (err) {
        console.error('Erro ao enviar fatura Pix no WhatsApp:', err);
      }
    }

    return NextResponse.json({
      success: true,
      pool_id,
      client_name,
      plan_name: plan.label,
      amount: plan.value,
      due_date: dueDateFormatted,
      txid,
      pix_key: pixKey,
      pix_copia_e_cola: pixCopiaECola,
      qr_code_url: qrCodeUrl,
      whatsapp_dispatched: whatsappSent,
      whatsapp_response: whatsappResponse
    });

  } catch (error: any) {
    console.error('Erro na geração da fatura Pix:', error);
    return NextResponse.json(
      { error: 'Falha ao gerar cobrança Pix.', details: error.message },
      { status: 500 }
    );
  }
}
