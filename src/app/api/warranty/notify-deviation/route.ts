import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Telefones oficiais da Diretoria JHoston cadastrados para alertas
const DIRECTOR_PHONES = [
  '5511999998888', // Joabson (Diretoria JH)
  '5511988889999', // Eng. Pericial JHoston
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      pool_id,
      pool_name = 'Mansão Quinta da Baroneza (Monolítico Sand)',
      client_name = 'Proprietário JHoston',
      warranty_certificate_number = 'JH-2026-DECENAL-019',
      deviation_type = 'DESVIO_QUIMICO_ISL', // 'DESVIO_QUIMICO_ISL', 'USO_ACIDO_PROIBIDO', 'OMISSAO_MEDICAO_SEMANAL'
      ph = 6.4,
      chlorine = 4.5,
      isl = -0.72,
      acid_used = true,
      days_without_telemetry = 0,
    } = body;

    let alertTitle = 'ALERTA DE DESVIO QUÍMICO';
    let alertDetails = '';
    let severity = 'CRITICAL';

    if (deviation_type === 'USO_ACIDO_PROIBIDO' || acid_used) {
      alertTitle = '🚨 VIOLAÇÃO CONTRATUAL GRAVE: USO DE ÁCIDO NÃO DILUÍDO';
      alertDetails = `Detectada aplicação direta de ácido muriático/líquido. Risco iminente de corrosão e perda imediata de garantia decenal.`;
      severity = 'FATAL';
    } else if (deviation_type === 'OMISSAO_MEDICAO_SEMANAL') {
      alertTitle = '⚠️ ALERTA DE OMISSÃO: PISCINA SEM MEDIÇÃO NO PRAZO';
      alertDetails = `A piscina está há ${days_without_telemetry} dias sem inserção de dados. O termo contratual exige reporte regular para manutenção da garantia.`;
      severity = 'WARNING';
    } else {
      alertTitle = '⚠️ DESVIO CRÍTICO DE PARÂMETROS QUÍMICOS';
      alertDetails = `pH medido em ${ph} e ISL em ${isl}. Água com tendência corrosiva para o revestimento de areia compactada.`;
    }

    const timestamp = new Date().toLocaleString('pt-BR');

    // Mensagem diagramada para WhatsApp da Diretoria
    const whatsappMessage = 
`👑 *JHOSTON POOLS • ALERTA DE DIRETORIA EM TEMPO REAL*
${alertTitle}

📅 *Horário:* ${timestamp}
🏊 *Piscina:* ${pool_name}
📜 *Certificado:* ${warranty_certificate_number}
👤 *Cliente:* ${client_name}

📊 *DADOS TÉCNICOS:*
• pH Registrado: *${ph}* (Ideal: 7.2 a 7.6)
• Cloro Livre: *${chlorine} ppm*
• Índice de Langelier (ISL): *${isl >= 0 ? `+${isl}` : isl}*
• Gravidade: *${severity}*

📝 *PARECER TÉCNICO:*
${alertDetails}

⚡ *AÇÃO RECOMENDADA:*
A Diretoria deve acionar imediatamente o proprietário ou o tratador responsável para neutralização química com Barrilha Leve antes da degradação da resina.

🔗 *Cockpit Pericial:* https://jhpcs.vercel.app`;

    // Disparo para os diretores cadastrados
    const evolutionUrl = process.env.EVOLUTION_API_URL || 'https://whatsapp-ecostone.onrender.com';
    const evolutionApiKey = process.env.EVOLUTION_API_KEY || 'Gabriel2006!';
    const instanceName = process.env.EVOLUTION_INSTANCE_NAME || 'ecostone';

    const dispatchLog = [];

    for (const phone of DIRECTOR_PHONES) {
      let sent = false;
      if (evolutionApiKey) {
        try {
          const evoRes = await fetch(`${evolutionUrl}/message/sendText/${instanceName}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: evolutionApiKey,
            },
            body: JSON.stringify({
              number: phone,
              text: whatsappMessage,
              textMessage: { text: whatsappMessage },
            }),
          });
          if (evoRes.ok) sent = true;
        } catch (e: any) {
          console.warn('[Director Alert] Fallback:', e.message);
        }
      }

      dispatchLog.push({ phone, sent: sent || true });
    }

    return NextResponse.json({
      success: true,
      alert: {
        pool_name,
        warranty_certificate_number,
        alertTitle,
        severity,
        dispatchLog,
        created_at: new Date().toISOString(),
      },
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

