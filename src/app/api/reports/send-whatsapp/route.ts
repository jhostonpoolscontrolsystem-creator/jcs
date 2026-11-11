import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateMonthlyReportPdf } from '@/lib/reports/monthlyPdfGenerator';
import { sendMediaDocument, sendTextMessage, getConnectionState } from '@/lib/whatsapp/evolutionClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      poolId = 'p-1',
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear(),
      includePixReminder = true,
      tenantId = 'demo-fleet',
    } = body;

    // 1. Aciona endpoint interno ou consolidação direta
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://jhpcs.vercel.app';
    const reportRes = await fetch(`${appUrl}/api/reports/monthly?poolId=${poolId}&month=${month}&year=${year}&tenantId=${tenantId}`);
    const reportData = await reportRes.json();

    if (!reportData.success || !reportData.report) {
      return NextResponse.json(
        { error: 'Não foi possível consolidar os dados do relatório mensal para despacho.' },
        { status: 400 }
      );
    }

    const report = reportData.report;

    // 2. Gera o arquivo PDF A4 Leve (< 800KB) e armazena cópia no Cloudflare R2
    const { pdfBuffer, pdfBase64, fileName, publicPdfUrl } = await generateMonthlyReportPdf({
      tenantName: report.tenant.name,
      tenantDocument: report.tenant.document,
      tenantPhone: report.tenant.phone,
      tenantLogoUrl: report.tenant.logoUrl,
      poolId: report.poolId,
      poolName: report.poolName,
      clientName: report.clientName,
      clientPhone: report.clientPhone,
      substrate: report.substrate,
      volumeM3: report.volumeM3,
      month: report.month,
      year: report.year,
      attendanceRate: report.attendanceRate,
      averagePh: report.averagePh,
      averageChlorine: report.averageChlorine,
      averageAlkalinity: report.averageAlkalinity,
      averageLsi: report.averageLsi,
      waterQualityStatus: report.waterQualityStatus,
      visits: report.visits,
      chemicalConsumption: report.chemicalConsumption,
      financialInfo: report.financialInfo,
      publicReportUrl: report.publicReportUrl,
    }, tenantId);

    // 3. Verifica o status do WhatsApp do tenant em tenant_settings
    const { data: tenantSettings } = await supabase
      .from('tenant_settings')
      .select('whatsapp_instance_name, whatsapp_instance_status, whatsapp_number')
      .eq('tenant_id', tenantId)
      .maybeSingle();

    const instanceName = tenantSettings?.whatsapp_instance_name || 'jhpcs-master';
    const instanceStatus = tenantSettings?.whatsapp_instance_status || 'DISCONNECTED';
    const recipientPhone = report.clientPhone || '11987654321';

    // Texto de compartilhamento padrão
    const shareText = `Olá, *${report.clientName}*! Tudo bem?\n\n` +
      `Aqui está o seu *Relatório Mensal de Manutenção e Prestação de Contas* referente a *${report.month}/${report.year}* da piscina *${report.poolName}*.\n\n` +
      `📊 *Balanço Geral:* Água ${report.waterQualityStatus === 'EQUILIBRADA' ? 'Equilibrada e Saudável ✅' : 'Exige Atenção ⚠️'}\n` +
      `🏊 *Assiduidade:* ${report.attendanceRate}\n` +
      `📄 *Acesse a versão interativa com fotos:* ${report.publicReportUrl}\n\n` +
      (includePixReminder && report.financialInfo?.status === 'PENDING'
        ? `💳 *Mensalidade de Manutenção:* R$ ${report.financialInfo.monthlyFee.toFixed(2)}\n` +
          `🔑 *Chave PIX:* \`${report.financialInfo.pixKey}\`\n\n`
        : '') +
      `Obrigado por confiar no cuidado profissional do seu patrimônio! 🌊`;

    // 4. Se a instância da Evolution API estiver conectada no banco, valida estado real
    let isConnected = instanceStatus === 'CONNECTED';
    if (isConnected) {
      const stateCheck = await getConnectionState(instanceName);
      if (stateCheck.state !== 'open') {
        isConnected = false;
      }
    }

    // DISPARO VIA EVOLUTION API (BASE64 DIRETO)
    if (isConnected) {
      try {
        const sendDocRes = await sendMediaDocument(
          instanceName,
          recipientPhone,
          pdfBase64,
          fileName,
          `📄 Relatório Mensal Certificado JHPCS — ${report.month}/${report.year}`
        );

        // Se solicitado, dispara o lembrete de PIX com delay humanizado anti-ban
        if (includePixReminder && report.financialInfo?.status === 'PENDING') {
          setTimeout(async () => {
            const pixMessage = `💰 *Lembrete de Fechamento Mensal*\n\n` +
              `Prezado(a) *${report.clientName}*, segue a chave PIX para acerto da mensalidade de manutenção:\n\n` +
              `💵 *Valor:* R$ ${report.financialInfo.monthlyFee.toFixed(2)}\n` +
              `🔑 *Chave PIX:* \`${report.financialInfo.pixKey}\`\n\n` +
              `Após o envio, sinta-se à vontade para anexar o comprovante por aqui. Tenha uma excelente semana!`;
            
            await sendTextMessage(instanceName, recipientPhone, pixMessage);
          }, 2000);
        }

        return NextResponse.json({
          success: true,
          deliveryMethod: 'EVOLUTION_BASE64_ATTACHMENT',
          instanceName,
          recipientPhone,
          fileName,
          publicPdfUrl,
          publicReportUrl: report.publicReportUrl,
          evolutionResponse: sendDocRes,
        });
      } catch (err: any) {
        console.warn('Falha no envio direto via Evolution API, acionando fallback link:', err.message);
      }
    }

    // FALLBACK ELEGANTE: Link Público no Cloudflare R2 + Versão Web
    const whatsappWebLink = `https://api.whatsapp.com/send?phone=${recipientPhone.replace(/\D/g, '')}&text=${encodeURIComponent(shareText)}`;

    return NextResponse.json({
      success: true,
      deliveryMethod: 'FALLBACK_LINK',
      recipientPhone,
      fileName,
      publicPdfUrl,
      publicReportUrl: report.publicReportUrl,
      shareText,
      whatsappWebLink,
      reason: 'Instância de WhatsApp desconectada ou em contingência. Link público preparado para abertura instantânea.',
    });
  } catch (error: any) {
    console.error('Erro ao enviar relatório no WhatsApp:', error);
    return NextResponse.json(
      { error: error?.message || 'Falha ao processar despacho de relatório no WhatsApp.' },
      { status: 500 }
    );
  }
}

