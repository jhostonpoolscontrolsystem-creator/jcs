import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MASTER_CONTACTS, notifyAllMastersViaWhatsApp } from '@/lib/master-contacts';

/**
 * Interface do Red Flag de Engenharia
 */
export interface RedFlagAlertPayload {
  pool_id: string;
  pool_name: string;
  client_name: string;
  client_phone: string;
  maintainer_name: string;
  location_city?: string;
  location_state?: string;
  current_ph: number;
  current_cl: number;
  current_alkalinity?: number;
  lsi_index?: number;
  risk_description: string;
  prescribed_chemical_action: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Contatos do Corpo Técnico & Diretoria JHoston Pools
 */
export const JHOSTON_TECHNICAL_DIRECTORATE = [
  { name: 'Joabson (Diretor Executivo JHoston)', phone: '5511999998888', role: 'DIRETORIA_JH' },
  { name: 'Carlos (Engenharia de Materiais JHoston)', phone: '5511988887777', role: 'TECNICO_JH' },
];

/**
 * POST /api/alerts/red-zone-technical
 * Dispara notificação de Red Flag para o Corpo Técnico da JHoston, para os Masters e orienta o tratador no WhatsApp
 */
export async function POST(req: NextRequest) {
  try {
    const payload: RedFlagAlertPayload = await req.json();

    const {
      pool_id,
      pool_name,
      client_name,
      client_phone,
      maintainer_name,
      location_city = 'São Paulo',
      location_state = 'SP',
      current_ph,
      current_cl,
      current_alkalinity = 70,
      lsi_index = -0.7,
      risk_description,
      prescribed_chemical_action
    } = payload;

    const evolutionApiUrl = process.env.EVOLUTION_API_URL || 'https://whatsapp-ecostone.onrender.com';
    const evolutionApiKey = process.env.EVOLUTION_API_KEY || 'jcs_evo_2026_secret_key';
    const instanceName = process.env.EVOLUTION_INSTANCE_NAME || 'jcs-primary';

    // 1. Mensagem para o Corpo Técnico da JHoston Pools
    const technicalMessage = `🚨 *JHOSTON POOLS • ALERTA VERMELHO DE ENGENHARIA*
*Ativo:* ${pool_name}
*Cliente:* ${client_name}
*Localização:* ${location_city} - ${location_state}
*Tratador Local:* ${maintainer_name}

⚠️ *DESVIO QUÍMICO CRÍTICO:*
• *pH Registrado:* ${current_ph.toFixed(1)} (Faixa segura: 7.2 a 7.6)
• *Cloro:* ${current_cl.toFixed(1)} ppm
• *LSI Térmico:* ${lsi_index.toFixed(2)} (Risco de corrosão da resina)
• *Diagnóstico:* ${risk_description}

🧪 *PRESCRIÇÃO DE ENGENHARIA:*
${prescribed_chemical_action}

⏱️ *PROTOCOLO NACIONAL JH:*
• Cronômetro de 48h de tolerância iniciado no sistema JHPCS.
• O tratador e o síndico receberam a tele-orientação de neutralização.
• Se não houver re-teste com água equilibrada em 48h, a garantia será formalmente suspensa.`;

    const dispatchedToTechnical: string[] = [];

    for (const tech of JHOSTON_TECHNICAL_DIRECTORATE) {
      try {
        await fetch(`${evolutionApiUrl}/message/sendText/${instanceName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': evolutionApiKey,
          },
          body: JSON.stringify({
            number: tech.phone,
            text: technicalMessage,
            options: { delay: 1000, presence: 'composing' },
          }),
        });
        dispatchedToTechnical.push(tech.name);
      } catch (err) {
        console.error(`Falha ao despachar alerta técnico para ${tech.name}:`, err);
      }
    }

    // 2. Notificação Sentinela aos Fundadores MASTER (Daniel Lopes & Patrícia Grübel)
    try {
      await notifyAllMastersViaWhatsApp(
        (masterName) => `🛡️ *JHPCS MASTER SENTINELA • RED FLAG NACIONAL*
Olá, *${masterName}*!

Um alerta de alta criticidade química foi acionado em *${pool_name}* (${client_name}).
• *pH:* ${current_ph.toFixed(1)} (Corrosão Ativa)
• *Local:* ${location_city}/${location_state}
• *Corpo Técnico Notificado:* Joabson e Engenharia JH já receberam o protocolo de 48 horas.`
      );
    } catch (err) {
      console.warn('Erro ao notificar masters:', err);
    }

    // 3. Tele-orientação de Resgate enviada ao Tratador e ao Síndico
    if (client_phone) {
      const clientMessage = `⚠️ *JHOSTON POOLS • ORIENTAÇÃO DE RESGATE IMEDIATO*
Olá, *${client_name}* / Tratador *${maintainer_name}*!

O sistema JHPCS detectou uma variação química que pode agredir o revestimento da sua piscina:
• *pH Medido:* ${current_ph.toFixed(1)} (Água ácida corrosiva)

📋 *AÇÃO IMEDIATA RECOMENDADA:*
${prescribed_chemical_action}

_Realize a aplicação e faça um novo teste no app em até 24h para manter a conformidade integral da sua Garantia JHoston Pools._`;

      try {
        await fetch(`${evolutionApiUrl}/message/sendText/${instanceName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': evolutionApiKey,
          },
          body: JSON.stringify({
            number: client_phone.replace(/\D/g, ''),
            text: clientMessage,
            options: { delay: 1200, presence: 'composing' },
          }),
        });
      } catch (err) {
        console.error('Falha ao orientar cliente via WhatsApp:', err);
      }
    }

    return NextResponse.json({
      success: true,
      pool_id,
      pool_name,
      alert_status: 'RED_FLAG_DISPATCHED',
      technical_team_notified: dispatchedToTechnical,
      masters_notified: true,
      sla_tolerance_hours: 48,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Erro no despacho de Red Flag Técnico:', error);
    return NextResponse.json(
      { error: 'Falha ao despachar Red Flag.', details: error.message },
      { status: 500 }
    );
  }
}
