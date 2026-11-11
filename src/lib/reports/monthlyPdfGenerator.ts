import { jsPDF } from 'jspdf';
import { uploadToR2, isR2Configured } from '@/lib/r2';

export interface MonthlyReportPdfInput {
  tenantName: string;
  tenantDocument?: string;
  tenantPhone?: string;
  tenantLogoUrl?: string;
  poolId: string;
  poolName: string;
  clientName: string;
  clientPhone?: string;
  substrate: string;
  volumeM3: number;
  month: number;
  year: number;
  attendanceRate: string;
  averagePh: number;
  averageChlorine: number;
  averageAlkalinity: number;
  averageLsi: number;
  waterQualityStatus: 'EQUILIBRADA' | 'ATENCAO';
  visits: Array<{
    date: string;
    maintainerName: string;
    ph: number;
    chlorinePpm: number;
    alkalinityPpm?: number;
    lsi: number;
    brushed: boolean;
    backwashed: boolean;
    evidences?: string[];
  }>;
  chemicalConsumption: Array<{
    productName: string;
    quantity: number;
    unit: string;
    purpose: string;
  }>;
  financialInfo?: {
    monthlyFee: number;
    pixKey?: string;
    pixKeyType?: string;
    status: 'PENDING' | 'PAID';
    dueDate?: string;
  };
  publicReportUrl?: string;
}

export interface MonthlyReportPdfOutput {
  pdfBuffer: Buffer;
  pdfBase64: string;
  fileName: string;
  publicPdfUrl: string;
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

/**
 * Gerador de Relatório Mensal White-Label e Prestação de Contas em PDF A4 Leve (< 800KB)
 * Com upload automático de backup para Cloudflare R2
 */
export async function generateMonthlyReportPdf(
  input: MonthlyReportPdfInput,
  tenantId: string = 'default-tenant'
): Promise<MonthlyReportPdfOutput> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  type RGB = [number, number, number];
  const colors: Record<string, RGB> = {
    darkBg: [10, 15, 29],         // #0a0f1d
    navyCard: [15, 23, 42],        // #0f172a
    navyBorder: [30, 41, 59],      // #1e293b
    cyan: [6, 182, 212],           // #06b6d4
    cyanDark: [8, 145, 178],       // #0891b2
    emerald: [16, 185, 129],       // #10b981
    amber: [245, 158, 11],         // #f59e0b
    rose: [244, 63, 94],           // #f43f5e
    white: [255, 255, 255],
    slate300: [203, 213, 225],     // #cbd5e1
    slate400: [148, 163, 184],     // #94a3b8
    slate500: [100, 116, 139],     // #64748b
    cardBgLight: [24, 34, 53],
  };

  const monthName = MONTH_NAMES[input.month - 1] || `Mês ${input.month}`;
  const fileName = `Relatorio_Mensal_${input.poolId}_${input.year}_${String(input.month).padStart(2, '0')}.pdf`;

  // =========================================================================
  // PÁGINA 1: CABEÇALHO WHITE-LABEL, MÉTRICAS E VISITAS DO MÊS
  // =========================================================================
  // Background completo
  doc.setFillColor(...colors.darkBg);
  doc.rect(0, 0, 210, 297, 'F');

  // Faixa gradiente superior
  doc.setFillColor(...colors.cyan);
  doc.rect(14, 10, 182, 1.5, 'F');

  // Cabeçalho White-Label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...colors.white);
  doc.text((input.tenantName || 'JHPCS POOL CARE').toUpperCase(), 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...colors.slate400);
  const docInfo = [
    input.tenantDocument ? `CNPJ/CPF: ${input.tenantDocument}` : '',
    input.tenantPhone ? `WhatsApp: ${input.tenantPhone}` : '',
    'Auditoria Estequiométrica: JHPCS Engine v6.19'
  ].filter(Boolean).join(' | ');
  doc.text(docInfo, 14, 23);

  // Selo JHPCS à direita
  doc.setFillColor(...colors.cardBgLight);
  doc.roundedRect(140, 13, 56, 11, 2, 2, 'F');
  doc.setDrawColor(...colors.navyBorder);
  doc.roundedRect(140, 13, 56, 11, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...colors.emerald);
  doc.text('AUDITORIA OFICIAL JHPCS', 168, 18, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...colors.slate300);
  doc.text('Proteção de Substrato & Garantia', 168, 22, { align: 'center' });

  // Sub-banner do Período
  doc.setFillColor(...colors.navyCard);
  doc.rect(14, 27, 182, 10, 'F');
  doc.setDrawColor(...colors.navyBorder);
  doc.setLineWidth(0.3);
  doc.rect(14, 27, 182, 10, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...colors.white);
  doc.text(`RELATÓRIO MENSAL DE MANUTENÇÃO — ${monthName.toUpperCase()} / ${input.year}`, 18, 33.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...colors.cyan);
  doc.text(`Cliente: ${input.clientName}`, 192, 33.5, { align: 'right' });

  // Box 1: Dados do Ativo & Resumo da Água
  doc.setFillColor(...colors.navyCard);
  doc.rect(14, 40, 182, 32, 'F');
  doc.setDrawColor(...colors.cyanDark);
  doc.rect(14, 40, 182, 32, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...colors.cyan);
  doc.text('DADOS TÉCNICOS DO ATIVO MONITORADO', 18, 46);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...colors.slate300);
  doc.text(`• Piscina: ${input.poolName}`, 18, 52);
  doc.text(`• Substrato: ${input.substrate}`, 18, 57);
  doc.text(`• Volume: ${input.volumeM3} m³`, 18, 62);
  doc.text(`• Assiduidade Técnica: ${input.attendanceRate}`, 18, 67);

  // Cards de Médias Químicas (Lado Direito do Box 1)
  const chemCards = [
    { label: 'pH Médio', val: input.averagePh.toFixed(1), target: '7.2 - 7.6', color: colors.cyan },
    { label: 'Cloro Livre', val: `${input.averageChlorine.toFixed(1)} ppm`, target: '1.0 - 3.0', color: colors.emerald },
    { label: 'Alcalinidade', val: `${input.averageAlkalinity} ppm`, target: '80 - 120', color: colors.amber },
    { label: 'ISL Langelier', val: `${input.averageLsi >= 0 ? '+' : ''}${input.averageLsi.toFixed(2)}`, target: '-0.30 a +0.30', color: input.waterQualityStatus === 'EQUILIBRADA' ? colors.emerald : colors.rose },
  ];

  chemCards.forEach((c, idx) => {
    const cx = 95 + (idx % 2) * 48;
    const cy = 44 + Math.floor(idx / 2) * 13;
    doc.setFillColor(...colors.cardBgLight);
    doc.roundedRect(cx, cy, 45, 11, 1.5, 1.5, 'F');
    doc.setDrawColor(...colors.navyBorder);
    doc.roundedRect(cx, cy, 45, 11, 1.5, 1.5, 'S');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...colors.slate400);
    doc.text(c.label, cx + 3, cy + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...c.color);
    doc.text(c.val, cx + 3, cy + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(...colors.slate500);
    doc.text(c.target, cx + 42, cy + 7, { align: 'right' });
  });

  // Título Tabela de Visitas
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...colors.white);
  doc.text('CRONOGRAMA DE VISTORIAS E PARÂMETROS REGISTRADOS', 14, 78);

  // Cabeçalho da Tabela
  const tableCols = [
    { name: 'Data', x: 14, w: 24 },
    { name: 'Profissional', x: 38, w: 42 },
    { name: 'pH', x: 80, w: 18 },
    { name: 'Cloro', x: 98, w: 20 },
    { name: 'Alcalinidade', x: 118, w: 24 },
    { name: 'ISL LSI', x: 142, w: 22 },
    { name: 'Intervenções', x: 164, w: 32 }
  ];

  doc.setFillColor(...colors.cardBgLight);
  doc.rect(14, 81, 182, 6.5, 'F');
  doc.setDrawColor(...colors.navyBorder);
  doc.rect(14, 81, 182, 6.5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...colors.cyan);
  tableCols.forEach(col => {
    doc.text(col.name, col.x + 2, 85.5);
  });

  // Linhas da Tabela
  let yVisit = 87.5;
  const maxVisitsPage1 = Math.min(input.visits.length, 6);
  for (let i = 0; i < maxVisitsPage1; i++) {
    const v = input.visits[i];
    const rowH = 9.5;
    doc.setFillColor(i % 2 === 0 ? colors.navyCard[0] : colors.cardBgLight[0], i % 2 === 0 ? colors.navyCard[1] : colors.cardBgLight[1], i % 2 === 0 ? colors.navyCard[2] : colors.cardBgLight[2]);
    doc.rect(14, yVisit, 182, rowH, 'F');
    doc.setDrawColor(...colors.navyBorder);
    doc.rect(14, yVisit, 182, rowH, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...colors.white);
    doc.text(v.date, tableCols[0].x + 2, yVisit + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...colors.slate300);
    doc.text(v.maintainerName || 'Técnico Especialista', tableCols[1].x + 2, yVisit + 6);

    // pH
    const phColor: RGB = v.ph < 7.0 || v.ph > 7.8 ? colors.rose : colors.white;
    doc.setTextColor(...phColor);
    doc.text(v.ph.toFixed(1), tableCols[2].x + 2, yVisit + 6);

    // Cloro
    doc.setTextColor(...colors.white);
    doc.text(`${v.chlorinePpm.toFixed(1)} ppm`, tableCols[3].x + 2, yVisit + 6);

    // Alcalinidade
    doc.text(`${v.alkalinityPpm ?? 100} ppm`, tableCols[4].x + 2, yVisit + 6);

    // ISL
    const islColor: RGB = Math.abs(v.lsi) <= 0.3 ? colors.emerald : colors.rose;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...islColor);
    doc.text(`${v.lsi >= 0 ? '+' : ''}${v.lsi.toFixed(2)}`, tableCols[5].x + 2, yVisit + 6);

    // Ações Físicas
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(...colors.slate400);
    const actions = [
      v.brushed ? 'Escovação' : '',
      v.backwashed ? 'Retrolavagem' : '',
    ].filter(Boolean).join(' + ') || 'Manutenção de Rotina';
    doc.text(actions, tableCols[6].x + 2, yVisit + 6);

    yVisit += rowH;
  }

  // Box 2: Lista Inteligente de Reposição de Químicos
  const yChemBox = yVisit + 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...colors.white);
  doc.text('LISTA INTELIGENTE DE REPOSIÇÃO DE QUÍMICOS (CONSUMO NO MÊS)', 14, yChemBox);

  const chemColX = [14, 75, 115, 150];
  doc.setFillColor(...colors.cardBgLight);
  doc.rect(14, yChemBox + 3, 182, 6, 'F');
  doc.setDrawColor(...colors.navyBorder);
  doc.rect(14, yChemBox + 3, 182, 6, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...colors.emerald);
  doc.text('Insumo Homologado', chemColX[0] + 2, yChemBox + 7);
  doc.text('Quantidade Consumida', chemColX[1] + 2, yChemBox + 7);
  doc.text('Unidade', chemColX[2] + 2, yChemBox + 7);
  doc.text('Finalidade Técnica', chemColX[3] + 2, yChemBox + 7);

  let yChemItem = yChemBox + 9;
  if (input.chemicalConsumption && input.chemicalConsumption.length > 0) {
    input.chemicalConsumption.forEach((item, idx) => {
      const rowH = 7.5;
      doc.setFillColor(idx % 2 === 0 ? colors.navyCard[0] : colors.cardBgLight[0], idx % 2 === 0 ? colors.navyCard[1] : colors.cardBgLight[1], idx % 2 === 0 ? colors.navyCard[2] : colors.cardBgLight[2]);
      doc.rect(14, yChemItem, 182, rowH, 'F');
      doc.setDrawColor(...colors.navyBorder);
      doc.rect(14, yChemItem, 182, rowH, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...colors.white);
      doc.text(item.productName, chemColX[0] + 2, yChemItem + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...colors.slate300);
      doc.text(String(item.quantity), chemColX[1] + 2, yChemItem + 5);
      doc.text(item.unit, chemColX[2] + 2, yChemItem + 5);
      doc.text(item.purpose, chemColX[3] + 2, yChemItem + 5);

      yChemItem += rowH;
    });
  } else {
    // Fallback gracioso
    doc.setFillColor(...colors.navyCard);
    doc.rect(14, yChemItem, 182, 8, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...colors.slate400);
    doc.text('Nenhum insumo crítico demandado no período. Balanço hídrico estável.', 18, yChemItem + 5.5);
    yChemItem += 8;
  }

  // Box 3: Combo Prestação de Contas + Cobrança PIX Integrada (Rodapé Página 1)
  const yPixBox = Math.max(yChemItem + 5, 210);
  doc.setFillColor(...colors.navyCard);
  doc.roundedRect(14, yPixBox, 182, 58, 2, 2, 'F');
  doc.setDrawColor(...colors.emerald);
  doc.setLineWidth(0.4);
  doc.roundedRect(14, yPixBox, 182, 58, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...colors.emerald);
  doc.text('PRESTAÇÃO DE CONTAS & ACERTO DA MENSALIDADE', 18, yPixBox + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...colors.slate300);
  const monthlyFeeFormatted = (input.financialInfo?.monthlyFee || 380).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  doc.text(`Valor da Mensalidade de Manutenção: ${monthlyFeeFormatted}`, 18, yPixBox + 13);
  doc.text(`Status: ${input.financialInfo?.status === 'PAID' ? 'QUITADO / CONCLUÍDO' : 'PENDENTE DE PAGAMENTO'}`, 18, yPixBox + 18);
  if (input.financialInfo?.dueDate) {
    doc.text(`Vencimento: ${input.financialInfo.dueDate}`, 18, yPixBox + 23);
  }

  // Chave PIX em destaque
  const pixKey = input.financialInfo?.pixKey || input.tenantPhone || 'pix@jhpcs.com.br';
  doc.setFillColor(...colors.cardBgLight);
  doc.roundedRect(18, yPixBox + 27, 174, 18, 1.5, 1.5, 'F');
  doc.setDrawColor(...colors.navyBorder);
  doc.roundedRect(18, yPixBox + 27, 174, 18, 1.5, 1.5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...colors.cyan);
  doc.text('CHAVE PIX PARA TRANSFERÊNCIA DIRETA:', 22, yPixBox + 33);

  doc.setFont('courier', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...colors.white);
  doc.text(pixKey, 22, yPixBox + 39);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(...colors.slate400);
  doc.text('Após o pagamento, o comprovante pode ser enviado diretamente pelo WhatsApp.', 22, yPixBox + 43);

  // Link interativo da página pública
  if (input.publicReportUrl) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...colors.cyan);
    doc.text(`Acesse a versão interativa completa com fotos em alta resolução:`, 18, yPixBox + 50);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.slate300);
    doc.text(input.publicReportUrl, 18, yPixBox + 54);
  }

  // Rodapé da Página 1
  doc.setDrawColor(...colors.navyBorder);
  doc.line(14, 284, 196, 284);
  doc.setFontSize(7);
  doc.setTextColor(...colors.slate500);
  doc.text(`${input.tenantName || 'JHPCS'} © ${input.year} — Relatório Mensal Certificado`, 14, 289);
  doc.text('Página 1 de 1 | Documento Oficial', 196, 289, { align: 'right' });

  // Gera o buffer e base64
  const pdfBytes = doc.output('arraybuffer');
  const pdfBuffer = Buffer.from(pdfBytes);
  const pdfBase64 = pdfBuffer.toString('base64');

  // Backup automático para Cloudflare R2
  const r2Key = `relatorios/${tenantId}/${input.poolId}-${input.year}-${String(input.month).padStart(2, '0')}.pdf`;
  let publicPdfUrl = `https://pub-0698df4992464295bd9d323e91a2aee4.r2.dev/${r2Key}`;

  if (isR2Configured) {
    try {
      const uploadRes = await uploadToR2(r2Key, pdfBuffer, 'application/pdf');
      publicPdfUrl = uploadRes.url;
      console.log(`[MonthlyReportPDF] Upload R2 realizado com sucesso: ${publicPdfUrl}`);
    } catch (r2Err: any) {
      console.warn(`[MonthlyReportPDF] Fallback R2 não impeditivo: ${r2Err.message}`);
    }
  }

  return {
    pdfBuffer,
    pdfBase64,
    fileName,
    publicPdfUrl,
  };
}

