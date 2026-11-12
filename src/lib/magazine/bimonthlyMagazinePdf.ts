import { jsPDF } from 'jspdf';
import { FIRST_BIMONTHLY_EDITION } from './bimonthlyMagazineEngine';

export interface BimonthlyMagazinePdfInput {
  tenantName?: string;
  tenantWhatsapp?: string;
  tenantLogoUrl?: string;
}

type RGB = [number, number, number];

export async function generateBimonthlyMagazinePdf(input?: BimonthlyMagazinePdfInput): Promise<Buffer> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const tenantName = input?.tenantName || 'Jhoston Pools & Lagoons';
  const tenantWhatsapp = input?.tenantWhatsapp || '+55 (11) 99999-8888';

  const colors = {
    darkBg: [8, 12, 22] as RGB,
    cardBg: [15, 23, 42] as RGB,
    cyan: [6, 182, 212] as RGB,
    gold: [245, 158, 11] as RGB,
    emerald: [16, 185, 129] as RGB,
    white: [255, 255, 255] as RGB,
    slate300: [203, 213, 225] as RGB,
    slate400: [148, 163, 184] as RGB,
    slate800: [30, 41, 59] as RGB,
  };

  const applyDarkBackground = () => {
    doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
    doc.rect(0, 0, 210, 297, 'F');
  };

  const drawHeaderFooter = (pageNum: number, totalPages: number) => {
    // Header
    doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
    doc.rect(0, 0, 210, 16, 'F');
    doc.setDrawColor(colors.slate800[0], colors.slate800[1], colors.slate800[2]);
    doc.setLineWidth(0.4);
    doc.line(0, 16, 210, 16);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
    doc.text('REVISTA POOLTECH LIVING & ENGENHARIA', 14, 10.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colors.slate400[0], colors.slate400[1], colors.slate400[2]);
    doc.text(`Edição #01 • ${FIRST_BIMONTHLY_EDITION.periodLabel}`, 130, 10.5);

    // Footer
    doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
    doc.rect(0, 283, 210, 14, 'F');
    doc.setDrawColor(colors.slate800[0], colors.slate800[1], colors.slate800[2]);
    doc.line(0, 283, 210, 283);

    doc.setFontSize(7.5);
    doc.setTextColor(colors.slate400[0], colors.slate400[1], colors.slate400[2]);
    doc.text(`Publicação oficial White-Label por ${tenantName} • WhatsApp: ${tenantWhatsapp}`, 14, 291);
    doc.text(`Página ${pageNum} de ${totalPages}`, 180, 291);
  };

  // =========================================================================
  // PÁGINA 1: CAPA MONUMENTAL
  // =========================================================================
  applyDarkBackground();

  // Banner Superior da Capa
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(14, 20, 182, 255, 4, 4, 'F');
  doc.setDrawColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.setLineWidth(0.8);
  doc.roundedRect(14, 20, 182, 255, 4, 4, 'D');

  // Badge da Edição
  doc.setFillColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.roundedRect(24, 32, 75, 7, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
  doc.text('EDIÇÃO BIMESTRAL DE VERÃO #01', 27, 36.8);

  // Período
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.text(FIRST_BIMONTHLY_EDITION.periodLabel.toUpperCase(), 140, 37);

  // Título da Revista
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text('PoolTech Living', 24, 52);

  doc.setFontSize(14);
  doc.setTextColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.text('& ENGENHARIA DE PRESERVAÇÃO', 24, 60);

  // Linha divisória
  doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.setLineWidth(0.6);
  doc.line(24, 65, 186, 65);

  // Chamada da Matéria de Capa
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.text('A REVOLUÇÃO DAS PISCINAS ORGÂNICAS', 24, 80);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text('Revestimentos Monolíticos &', 24, 90);
  doc.text('Praias Artificiais de Areia', 24, 98);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  const introLines = doc.splitTextToSize(
    'Descubra como a tecnologia vítreo-polimérica eliminou 100% dos rejuntes cimentícios, ' +
    'anulando focos de algas e fungos e elevando o padrão arquitetônico a um novo patamar de luxo e valorização patrimonial.',
    160
  );
  doc.text(introLines, 24, 107);

  // Box Destaques da Edição
  doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
  doc.roundedRect(24, 130, 162, 70, 3, 3, 'F');
  doc.setDrawColor(colors.slate800[0], colors.slate800[1], colors.slate800[2]);
  doc.roundedRect(24, 130, 162, 70, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.text('NESTA EDIÇÃO BIMESTRAL:', 30, 140);

  const highlights = [
    '01. ARQUITETURA: Piscinas monolíticas com declive suave e sensações caribenhas.',
    '02. GUIA TÉCNICO: O Enigma do ISL — Por que a água cristalina pode estar corroendo motores.',
    '03. BEM-ESTAR: Iluminação cênica subaquática e automação de spas para uso 365 dias/ano.',
    '04. SEGURANÇA: Checklist das 5 verificações vitais da casa de máquinas antes das festas.'
  ];

  let hY = 149;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  highlights.forEach((h) => {
    doc.text(h, 30, hY);
    hY += 10;
  });

  // Rodapé da Capa White-Label
  doc.setFillColor(colors.slate800[0], colors.slate800[1], colors.slate800[2]);
  doc.roundedRect(24, 215, 162, 45, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.text('OFINECIMENTO EXCLUSIVO:', 30, 224);

  doc.setFontSize(13);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text(tenantName.toUpperCase(), 30, 233);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  doc.text(`Atendimento e Engenharia de Aplicação: ${tenantWhatsapp}`, 30, 241);
  doc.text('Chancela Técnica: JHPCS PoolTech Ecosystem • GADAP Engenharia & Sistemas', 30, 248);

  // =========================================================================
  // PÁGINA 2: MATÉRIA DE CAPA (PISCINAS MONOLÍTICAS)
  // =========================================================================
  doc.addPage();
  applyDarkBackground();
  drawHeaderFooter(2, 4);

  const art1 = FIRST_BIMONTHLY_EDITION.articles[0];

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.text(art1.categoryLabel.toUpperCase(), 14, 25);

  doc.setFontSize(16);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  const art1Title = doc.splitTextToSize(art1.title, 182);
  doc.text(art1Title, 14, 33);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  const art1Sub = doc.splitTextToSize(art1.subtitle, 182);
  doc.text(art1Sub, 14, 48);

  // Box de Highlights
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(14, 60, 182, 35, 3, 3, 'F');
  doc.setDrawColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.roundedRect(14, 60, 182, 35, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.text('PONTOS-CHAVE DESTA ARQUITETURA:', 20, 68);

  let pY = 75;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  art1.highlights?.forEach((hl) => {
    doc.text(`• ${hl}`, 20, pY);
    pY += 6;
  });

  // Texto da Matéria em 2 Colunas
  let textY = 105;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);

  const colWidth = 87;
  const col1X = 14;
  const col2X = 109;

  const col1Text = doc.splitTextToSize(art1.content[0] + '\n\n' + art1.content[1], colWidth);
  doc.text(col1Text, col1X, textY);

  const col2Text = doc.splitTextToSize(art1.content[2], colWidth);
  doc.text(col2Text, col2X, textY);

  // Box Pericial no Rodapé da Página 2
  doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
  doc.roundedRect(14, 215, 182, 50, 3, 3, 'F');
  doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(14, 215, 182, 50, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.text('PARECER PERICIAL DE ENGENHARIA (JHPCS ENGINE):', 20, 225);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  const pericial1 = doc.splitTextToSize(`"${art1.pericialInsight}"`, 170);
  doc.text(pericial1, 20, 233);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.slate400[0], colors.slate400[1], colors.slate400[2]);
  doc.text('Rastreabilidade Físico-Química auditada em conformidade com o Protocolo de Garantia Decenal Jhoston.', 20, 255);

  // =========================================================================
  // PÁGINA 3: GUIA TÉCNICO DESCOMPLICADO (O ENIGMA DO ISL)
  // =========================================================================
  doc.addPage();
  applyDarkBackground();
  drawHeaderFooter(3, 4);

  const art2 = FIRST_BIMONTHLY_EDITION.articles[1];

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.text(art2.categoryLabel.toUpperCase(), 14, 25);

  doc.setFontSize(16);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  const art2Title = doc.splitTextToSize(art2.title, 182);
  doc.text(art2Title, 14, 33);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  const art2Sub = doc.splitTextToSize(art2.subtitle, 182);
  doc.text(art2Sub, 14, 48);

  // Fórmula Matemática do ISL Ilustrada
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(14, 60, 182, 30, 3, 3, 'F');
  doc.setDrawColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.roundedRect(14, 60, 182, 30, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.text('ISL = pH + TF + CF + AF - 12.1', 65, 74);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.slate400[0], colors.slate400[1], colors.slate400[2]);
  doc.text('TF = Fator Temp | CF = Fator Dureza Cálcica | AF = Fator Alcalinidade Total | Meta Pericial: -0.3 a +0.3', 38, 82);

  // Conteúdo do Artigo 2
  textY = 100;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);

  const art2Col1 = doc.splitTextToSize(art2.content[0] + '\n\n' + art2.content[1], colWidth);
  doc.text(art2Col1, col1X, textY);

  const art2Col2 = doc.splitTextToSize(art2.content[2], colWidth);
  doc.text(art2Col2, col2X, textY);

  // Box de Destaques
  doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
  doc.roundedRect(col2X, 160, colWidth, 48, 2, 2, 'F');
  doc.setDrawColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.roundedRect(col2X, 160, colWidth, 48, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.text('ECONOMIA & PRESERVAÇÃO:', col2X + 5, 168);

  let p2Y = 175;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  art2.highlights?.forEach((hl) => {
    const hlLines = doc.splitTextToSize(`• ${hl}`, colWidth - 10);
    doc.text(hlLines, col2X + 5, p2Y);
    p2Y += 9;
  });

  // Parecer Pericial do Artigo 2
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(14, 220, 182, 45, 3, 3, 'F');
  doc.setDrawColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.roundedRect(14, 220, 182, 45, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.text('DIRETRIZ DA ENGENHARIA QUÍMICA:', 20, 230);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  const pericial2 = doc.splitTextToSize(`"${art2.pericialInsight}"`, 170);
  doc.text(pericial2, 20, 238);

  // =========================================================================
  // PÁGINA 4: CHECKLIST PREVENTIVO & CALCULADORA WHITE-LABEL
  // =========================================================================
  doc.addPage();
  applyDarkBackground();
  drawHeaderFooter(4, 4);

  const art4 = FIRST_BIMONTHLY_EDITION.articles[3];

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.text('MANUTENÇÃO PREVENTIVA DE PRÉ-VERÃO', 14, 25);

  doc.setFontSize(15);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text(art4.title, 14, 33);

  // Checklist
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(14, 42, 182, 65, 3, 3, 'F');
  doc.setDrawColor(colors.slate800[0], colors.slate800[1], colors.slate800[2]);
  doc.roundedRect(14, 42, 182, 65, 3, 3, 'D');

  let cY = 52;
  art4.content.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
    const colonIdx = item.indexOf(':');
    const title = item.substring(0, colonIdx + 1);
    const desc = item.substring(colonIdx + 1);
    doc.text(title, 20, cY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
    const descLines = doc.splitTextToSize(desc, 170);
    doc.text(descLines, 20, cY + 4.5);
    cY += 13.5;
  });

  // Bloco de Conversão & CTA da Empresa
  doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
  doc.roundedRect(14, 115, 182, 150, 4, 4, 'F');
  doc.setDrawColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.setLineWidth(0.8);
  doc.roundedRect(14, 115, 182, 150, 4, 4, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.text('SOLICITE UMA AVALIAÇÃO TÉCNICA DA SUA PISCINA', 30, 130);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  const ctaExpl = doc.splitTextToSize(
    `Sua piscina merece uma gestão preventiva com base científica. A equipe de ${tenantName} ` +
    'utiliza o motor inteligente JHPCS para diagnosticar a estequiometria exata, balancear o ISL e evitar custos astronômicos com trocas precoces de bombas, areia e revestimento.',
    150
  );
  doc.text(ctaExpl, 30, 140);

  // Tabela Exemplo de Dimensionamento
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(30, 165, 150, 45, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text('GUIA DE DIMENSIONAMENTO RÁPIDO (CASA DE MÁQUINAS):', 35, 174);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  doc.text('• Até 30.000 L: Bomba 1/2 CV | Filtro 40kg areia | Aquecedor 21 kW', 35, 182);
  doc.text('• Até 60.000 L: Bomba 3/4 CV | Filtro 75kg areia | Aquecedor 42 kW', 35, 190);
  doc.text('• Até 90.000 L: Bomba 1.0 CV | Filtro 125kg areia | Aquecedor 63 kW', 35, 198);

  // Botão / Contato
  doc.setFillColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.roundedRect(30, 222, 150, 16, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
  doc.text(`WHATSAPP DIRETO: ${tenantWhatsapp}`, 55, 232);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.text('Acesse a versão interativa completa na web em:', 62, 248);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.text('https://jhpcs.vercel.app/revista/jhoston/edicao-01', 65, 254);

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
