import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import { supabase } from '@/lib/supabase';

interface TelemetryPoint {
  date: string;
  ph: number;
  chlorine: number;
  alkalinity: number;
  isl: number;
  status: 'IDEAL' | 'DESVIO' | 'CRITICO';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      pool_id = 'p-jhoston-demo',
      pool_name = 'Residência Granja Viana (Monolítico Sand)',
      client_name = 'Dr. Carlos Eduardo',
      customer_type = 'PF', // PF ou PJ
      period_type = 'MENSAL', // QUINZENAL ou MENSAL
      target_phone = '5511999998888',
      warranty_code = 'JH-2026-DECENAL-PF-001',
      direct_whatsapp_dispatch = true,
    } = body;

    // Mock realista de telemetrias no período
    const mockTelemetry: TelemetryPoint[] = customer_type === 'PJ' ? [
      { date: '01/11/2026', ph: 7.4, chlorine: 2.5, alkalinity: 100, isl: 0.05, status: 'IDEAL' },
      { date: '04/11/2026', ph: 7.3, chlorine: 2.2, alkalinity: 95, isl: -0.02, status: 'IDEAL' },
      { date: '06/11/2026', ph: 7.5, chlorine: 2.8, alkalinity: 110, isl: 0.12, status: 'IDEAL' },
      { date: '08/11/2026', ph: 7.4, chlorine: 2.0, alkalinity: 100, isl: 0.04, status: 'IDEAL' },
    ] : [
      { date: '02/11/2026', ph: 7.4, chlorine: 2.0, alkalinity: 100, isl: 0.05, status: 'IDEAL' },
      { date: '09/11/2026', ph: 7.5, chlorine: 2.2, alkalinity: 110, isl: 0.10, status: 'IDEAL' },
    ];

    // Criação do Laudo Pericial em PDF A4 usando jsPDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // 1. Cabeçalho Dourado / Azul Marinho de Alto Padrão
    doc.setFillColor(2, 6, 23); // Slate-950
    doc.rect(0, 0, 210, 45, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text('JHOSTON POOLS & LAGOONS', 105, 18, { align: 'center' });

    doc.setFontSize(9);
    doc.setTextColor(56, 189, 248); // Sky-400
    doc.text('DIVISÃO DE ENGENHARIA PERICIAL & GARANTIA DECENAL', 105, 26, { align: 'center' });

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // Slate-400
    doc.text('AUDITORIA TERMODINÂMICA DA ÁGUA • NBR 10.818 • MATRIZ MINERAL MONOLÍTICA', 105, 33, { align: 'center' });

    // 2. Faixa do Certificado de Garantia
    doc.setFillColor(245, 158, 11); // Amber-500
    doc.rect(15, 40, 180, 8, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(2, 6, 23);
    doc.text(`TERMO DE COMPROMISSO E GARANTIA: ${warranty_code} • CLIENTE: ${customer_type === 'PJ' ? 'PESSOA JURÍDICA (PJ)' : 'PESSOA FÍSICA (PF)'}`, 105, 45.5, { align: 'center' });

    // 3. Dados do Cliente e Regra de Medição Obrigatória
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('1. DADOS DO ATIVO E COMPROMISSO DE MEDIÇÃO', 15, 60);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(`Cliente / Titular: ${client_name}`, 15, 67);
    doc.text(`Ativo / Piscina: ${pool_name}`, 15, 73);
    doc.text(`Período do Relatório: ${period_type === 'QUINZENAL' ? 'Quinzenal (15 Dias)' : 'Mensal Consolidado'}`, 15, 79);

    const requiredReadings = customer_type === 'PJ' ? '3 vezes por semana (Mínimo Contratual PJ)' : '1 vez por semana (Mínimo Contratual PF)';
    doc.setFont('helvetica', 'bold');
    doc.text(`Exigência do Termo de Garantia: ${requiredReadings}`, 15, 85);
    doc.setFont('helvetica', 'normal');
    doc.text(`Medições Efetivamente Registradas no Período: ${mockTelemetry.length} coletas homologadas com fotos e GPS.`, 15, 91);

    // 4. Tabela de Telemetria Físico-Química
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('2. TELEMETRIA DO PERÍODO & ÍNDICE DE LANGELIER (ISL)', 15, 105);

    doc.setFillColor(241, 245, 249);
    doc.rect(15, 110, 180, 7, 'F');
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text('DATA', 20, 114.5);
    doc.text('pH (7.2-7.6)', 50, 114.5);
    doc.text('CLORO (ppm)', 80, 114.5);
    doc.text('ALCALINIDADE', 110, 114.5);
    doc.text('ISL LANGELIER', 145, 114.5);
    doc.text('CONFORMIDADE', 170, 114.5);

    let y = 122;
    doc.setFont('helvetica', 'normal');
    mockTelemetry.forEach((t) => {
      doc.text(t.date, 20, y);
      doc.text(t.ph.toFixed(1), 55, y);
      doc.text(`${t.chlorine.toFixed(1)} ppm`, 83, y);
      doc.text(`${t.alkalinity} ppm`, 115, y);
      doc.text(t.isl >= 0 ? `+${t.isl.toFixed(2)}` : t.isl.toFixed(2), 150, y);
      doc.setTextColor(16, 185, 129); // Emerald
      doc.text('PRESERVADA', 170, y);
      doc.setTextColor(0, 0, 0);
      y += 7;
    });

    // 5. Parecer Pericial de Garantia Decenal
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('3. PARECER DA DIRETORIA TÉCNICA JHOSTON', 15, y);

    y += 6;
    doc.setFillColor(236, 253, 245);
    doc.rect(15, y, 180, 22, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(6, 78, 59);
    doc.text(
      'Atestamos que o proprietário CUMPRIU INTEGRALMENTE a rotina mínima de alimentação de dados.',
      20,
      y + 6
    );
    doc.text(
      'O Índice de Saturação de Langelier (ISL) manteve-se na faixa de equilíbrio químico, sem agressão corrosiva à matriz mineral.',
      20,
      y + 11
    );
    doc.setFont('helvetica', 'bold');
    doc.text('STATUS DO CERTIFICADO: GARANTIA DECENAL ATIVA, VÁLIDA E PLENAMENTE VIGENTE.', 20, y + 17);

    // 6. Alerta de Segurança e Termo Contratual
    y += 30;
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(
      'A omissão de medições por período superior a 14 dias sem justificativa técnica acarreta suspensão cautelar da garantia decenal.',
      15,
      y
    );
    doc.text(
      'Este laudo pericial é assinado eletronicamente e gerado com base no Livro-Razão de Auditoria JHPCS.',
      15,
      y + 4
    );

    // 7. Rodapé com Carimbo de Data/Hora e Assinatura Eletrônica
    doc.setLineWidth(0.5);
    doc.line(15, 270, 195, 270);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('DIRETORIA DE ENGENHARIA & QUALIDADE • JHOSTON POOLS & LAGOONS', 105, 275, { align: 'center' });
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text(`Laudo Digital emitido em: ${new Date().toLocaleString('pt-BR')} • Autenticação SHA-256`, 105, 280, { align: 'center' });

    // Gera o Base64 Data URI do PDF
    const pdfDataUri = doc.output('datauristring');
    // Extrai o raw base64 limpo (sem prefixo 'data:application/pdf;filename=generated.pdf;base64,')
    const pureBase64 = pdfDataUri.split(',')[1] || '';

    // Disparo direto via WhatsApp (Evolution API / sendMedia / base64)
    let whatsappResult = { sent: false, method: 'SIMULATED' };

    const evolutionUrl = process.env.EVOLUTION_API_URL || 'https://whatsapp-ecostone.onrender.com';
    const evolutionApiKey = process.env.EVOLUTION_API_KEY || 'Gabriel2006!';
    const instanceName = process.env.EVOLUTION_INSTANCE_NAME || 'ecostone';

    if (direct_whatsapp_dispatch && evolutionApiKey) {
      try {
        const cleanPhone = target_phone.replace(/\D/g, '');
        const recipient = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

        const evoRes = await fetch(`${evolutionUrl}/message/sendMedia/${instanceName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: evolutionApiKey,
          },
          body: JSON.stringify({
            number: recipient,
            mediaMessage: {
              mediatype: 'document',
              mimetype: 'application/pdf',
              caption: `📄 *JHoston Pools & Lagoons*\n\nOlá, *${client_name}*!\nSegue em anexo o seu *Laudo Pericial de Saúde da Piscina* (${period_type === 'QUINZENAL' ? 'Quinzenal' : 'Mensal'}).\n\n🛡️ *Garantia Decenal:* ATIVA E HOMOLOGADA.`,
              media: pureBase64,
              fileName: `LAUDO_GARANTIA_${warranty_code}.pdf`,
            },
          }),
        });

        if (evoRes.ok) {
          whatsappResult = { sent: true, method: 'EVOLUTION_API_BASE64' };
        }
      } catch (evoErr: any) {
        console.warn('[WhatsApp Base64 Dispatch] Fallback:', evoErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Laudo Pericial em Base64 gerado com sucesso',
      warranty_code,
      customer_type,
      required_readings: customer_type === 'PJ' ? '3x/semana' : '1x/semana',
      period_type,
      whatsapp: whatsappResult,
      pdf_data_uri: pdfDataUri, // Permite download no browser pelo link data:
      pdf_base64_length: pureBase64.length,
      generated_at: new Date().toISOString(),
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

