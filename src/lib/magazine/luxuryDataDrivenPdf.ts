import { jsPDF } from 'jspdf';
import { DATA_DRIVEN_EDITION_01 } from './dataDrivenMagazineEngine';

export interface LuxuryPdfInput {
  tenantName?: string;
  tenantWhatsapp?: string;
  profile?: 'garantia' | 'orcamento';
}

type RGB = [number, number, number];

export async function generateLuxuryDataDrivenPdf(input?: LuxuryPdfInput): Promise<Buffer> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const tenantName = input?.tenantName || 'Jhoston Pools & Lagoons';
  const tenantWhatsapp = input?.tenantWhatsapp || '+55 (11) 99999-8888';
  const profile = input?.profile || 'garantia';

  const edition = DATA_DRIVEN_EDITION_01;

  const colors = {
    darkBg: [7, 11, 20] as RGB,
    cardBg: [13, 20, 36] as RGB,
    innerCard: [18, 28, 48] as RGB,
    cyan: [6, 182, 212] as RGB,
    cyanLight: [34, 211, 238] as RGB,
    gold: [245, 158, 11] as RGB,
    goldLight: [251, 191, 36] as RGB,
    emerald: [16, 185, 129] as RGB,
    white: [255, 255, 255] as RGB,
    slate200: [226, 232, 240] as RGB,
    slate300: [203, 213, 225] as RGB,
    slate400: [148, 163, 184] as RGB,
    slate700: [51, 65, 85] as RGB,
    slate800: [30, 41, 59] as RGB,
  };

  const applyPageCanvas = () => {
    // Fundo Principal Dark Slate
    doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
    doc.rect(0, 0, 210, 297, 'F');

    // Moldura Arquitetônica Fina
    doc.setDrawColor(colors.slate800[0], colors.slate800[1], colors.slate800[2]);
    doc.setLineWidth(0.3);
    doc.rect(7, 7, 196, 283);
  };

  const drawEditorialHeaderFooter = (pageNum: number, totalPages: number, sectionTitle: string) => {
    // Header da Página
    doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
    doc.rect(7, 7, 196, 12, 'F');
    doc.setDrawColor(colors.slate700[0], colors.slate700[1], colors.slate700[2]);
    doc.setLineWidth(0.3);
    doc.line(7, 19, 203, 19);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
    doc.text('JHPCS DATA-DRIVEN EDITORIAL ENGINE', 12, 14.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(colors.slate400[0], colors.slate400[1], colors.slate400[2]);
    doc.text(`${sectionTitle.toUpperCase()} • EDIÇÃO #${edition.editionNumber}`, 110, 14.5);

    // Footer da Página
    doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
    doc.rect(7, 280, 196, 10, 'F');
    doc.setDrawColor(colors.slate700[0], colors.slate700[1], colors.slate700[2]);
    doc.line(7, 280, 203, 280);

    doc.setFontSize(7);
    doc.setTextColor(colors.slate400[0], colors.slate400[1], colors.slate400[2]);
    doc.text(`Publicação oficial White-Label por ${tenantName} • Atendimento: ${tenantWhatsapp}`, 12, 286.5);
    doc.text(`Página ${pageNum} de ${totalPages}`, 180, 286.5);
  };

  // =========================================================================
  // PÁGINA 1: CAPA EDITORIAL DE ALTA FIDELIDADE (MAGAZINE COVER)
  // =========================================================================
  applyPageCanvas();

  // Box Nobre Central com Borda Dupla Ciano e Ouro
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(12, 14, 186, 268, 4, 4, 'F');
  
  doc.setDrawColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.setLineWidth(0.8);
  doc.roundedRect(12, 14, 186, 268, 4, 4, 'D');

  doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(14, 16, 182, 264, 3, 3, 'D');

  // Badge da Edição
  doc.setFillColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.roundedRect(20, 24, 75, 7, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
  doc.text('EDIÇÃO BIMESTRAL DATA-DRIVEN #01', 23, 28.8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.goldLight[0], colors.goldLight[1], colors.goldLight[2]);
  doc.text(edition.periodLabel.toUpperCase(), 138, 29);

  // Masthead / Nome da Revista
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text('PoolTech Living', 20, 46);

  doc.setFontSize(13);
  doc.setTextColor(colors.cyanLight[0], colors.cyanLight[1], colors.cyanLight[2]);
  doc.text('& ENGENHARIA DE PRESERVAÇÃO PATRIMONIAL', 20, 54);

  // Linha Dourada
  doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.setLineWidth(0.6);
  doc.line(20, 58, 190, 58);

  // Selo de Métricas Auditadas (Termômetro na Capa)
  doc.setFillColor(colors.innerCard[0], colors.innerCard[1], colors.innerCard[2]);
  doc.roundedRect(20, 64, 170, 22, 2, 2, 'F');
  doc.setDrawColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, 64, 170, 22, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.text('BASE MONITORADA JHPCS (1.420 PISCINAS):', 25, 71);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  doc.text(`• Desvio do ISL: ${edition.telemetrySummary.avgLsiDeviation}`, 25, 77);
  doc.text(`• Ocorrências pós-chuva ácida: ${edition.telemetrySummary.acidRainIncidence}`, 25, 82);
  doc.text(`• Intervenções preditivas: ${edition.telemetrySummary.preventiveInterventions}`, 115, 77);
  doc.text('• Princípio: Zero alucinação técnica', 115, 82);

  // Manchete Principal Selecionada
  const activeHeadline = profile === 'garantia'
    ? edition.coverConfig.headlineGarantia
    : edition.coverConfig.headlineOrcamento;

  const activeSubheadline = profile === 'garantia'
    ? edition.coverConfig.subheadlineGarantia
    : edition.coverConfig.subheadlineOrcamento;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(colors.goldLight[0], colors.goldLight[1], colors.goldLight[2]);
  doc.text('MANCHETE PRINCIPAL DO BIMESTRE:', 20, 98);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  const headlineLines = doc.splitTextToSize(activeHeadline, 170);
  doc.text(headlineLines, 20, 107);

  const headlineOffset = headlineLines.length * 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  const subLines = doc.splitTextToSize(activeSubheadline, 170);
  doc.text(subLines, 20, 107 + headlineOffset);

  // Box Chamadas Secundárias Cruzadas (Garantia vs Expansão)
  const crossY = 142;
  doc.setFillColor(colors.innerCard[0], colors.innerCard[1], colors.innerCard[2]);
  doc.roundedRect(20, crossY, 82, 45, 2, 2, 'F');
  doc.setDrawColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.roundedRect(20, crossY, 82, 45, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.text('01. RETENÇÃO & GARANTIA:', 24, crossY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.slate200[0], colors.slate200[1], colors.slate200[2]);
  const c1Text = doc.splitTextToSize(edition.coverConfig.secondaryCall1, 74);
  doc.text(c1Text, 24, crossY + 15);

  doc.setFillColor(colors.innerCard[0], colors.innerCard[1], colors.innerCard[2]);
  doc.roundedRect(108, crossY, 82, 45, 2, 2, 'F');
  doc.setDrawColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.roundedRect(108, crossY, 82, 45, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colors.cyanLight[0], colors.cyanLight[1], colors.cyanLight[2]);
  doc.text('02. ARQUITETURA & UPGRADE:', 112, crossY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.slate200[0], colors.slate200[1], colors.slate200[2]);
  const c2Text = doc.splitTextToSize(edition.coverConfig.secondaryCall2, 74);
  doc.text(c2Text, 112, crossY + 15);

  // Carta ao Leitor / Editorial Resumido na Capa
  const edLetterY = 195;
  doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
  doc.roundedRect(20, edLetterY, 170, 32, 2, 2, 'F');
  doc.setDrawColor(colors.slate700[0], colors.slate700[1], colors.slate700[2]);
  doc.roundedRect(20, edLetterY, 170, 32, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.text('CARTA DA ENGENHARIA (CONTEXTO CLIMÁTICO):', 25, edLetterY + 7);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  const letterLines = doc.splitTextToSize(`"${edition.coverConfig.editorLetter}"`, 160);
  doc.text(letterLines, 25, edLetterY + 14);

  // Rodapé da Capa
  const botY = 233;
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(20, botY, 170, 42, 2, 2, 'F');
  doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.roundedRect(20, botY, 170, 42, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colors.goldLight[0], colors.goldLight[1], colors.goldLight[2]);
  doc.text('DISTRIBUIÇÃO E ENGENHARIA RESPONSÁVEL:', 25, botY + 8);

  doc.setFontSize(14);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text(tenantName.toUpperCase(), 25, botY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.cyanLight[0], colors.cyanLight[1], colors.cyanLight[2]);
  doc.text(`Canal Direto WhatsApp: ${tenantWhatsapp}`, 25, botY + 26);
  doc.text('Chancela Técnica: JHPCS PoolTech Ecosystem • GADAP Engenharia & Sistemas', 25, botY + 33);

  // =========================================================================
  // PÁGINA 2: ARTIGO DE GARANTIA & TELEMETRIA DATA-DRIVEN
  // =========================================================================
  doc.addPage();
  applyPageCanvas();
  drawEditorialHeaderFooter(2, 4, 'Saúde da Água & Garantia');

  const art1 = edition.articles[0];

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.text(art1.pillarLabel.toUpperCase(), 14, 26);

  doc.setFontSize(15);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  const art1Title = doc.splitTextToSize(art1.title, 182);
  doc.text(art1Title, 14, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  const art1Sub = doc.splitTextToSize(art1.subtitle, 182);
  doc.text(art1Sub, 14, 48);

  // Trilha de Auditoria (Audit Trail Box)
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(14, 58, 182, 38, 3, 3, 'F');
  doc.setDrawColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.roundedRect(14, 58, 182, 38, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colors.cyanLight[0], colors.cyanLight[1], colors.cyanLight[2]);
  doc.text('TRILHA DE AUDITORIA DESTA MATÉRIA (DADOS RASTREÁVEIS):', 20, 66);

  let audY = 73;
  art1.auditSources.forEach((src) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.text(`[${src.sourceType}] ${src.title}:`, 20, audY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
    doc.text(`${src.metricLabel} -> ${src.metricValue}`, 85, audY);
    audY += 6;
  });

  // Texto em 2 Colunas com Justificação de Espaço
  const textColY = 104;
  const colW = 88;
  const col1X = 14;
  const col2X = 108;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);

  const p1Col1 = doc.splitTextToSize(art1.content[0] + '\n\n' + art1.content[1], colW);
  doc.text(p1Col1, col1X, textColY);

  const p1Col2 = doc.splitTextToSize(art1.content[2], colW);
  doc.text(p1Col2, col2X, textColY);

  // Conclusões Técnicas
  const takeY = 180;
  doc.setFillColor(colors.innerCard[0], colors.innerCard[1], colors.innerCard[2]);
  doc.roundedRect(14, takeY, 182, 42, 2, 2, 'F');
  doc.setDrawColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.roundedRect(14, takeY, 182, 42, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.text('CONCLUSÕES TÉCNICAS ESSENCIAIS:', 20, takeY + 7);

  let tkY = takeY + 14;
  art1.keyTakeaways.forEach((tk) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    const tkLines = doc.splitTextToSize(`• ${tk}`, 170);
    doc.text(tkLines, 20, tkY);
    tkY += 8;
  });

  // Parecer Pericial
  const percY = 228;
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(14, percY, 182, 44, 2, 2, 'F');
  doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.roundedRect(14, percY, 182, 44, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.goldLight[0], colors.goldLight[1], colors.goldLight[2]);
  doc.text('PARECER PERICIAL DE ENGENHARIA QUÍMICA:', 20, percY + 8);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  const verdLines = doc.splitTextToSize(`"${art1.pericialVerdict}"`, 170);
  doc.text(verdLines, 20, percY + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(colors.slate400[0], colors.slate400[1], colors.slate400[2]);
  doc.text('Validação de conformidade técnica NBR 10.818 e Protocolo de Garantia Decenal Jhoston.', 20, percY + 36);

  // =========================================================================
  // PÁGINA 3: ARQUITETURA MONOLÍTICA & MODERNIZAÇÃO
  // =========================================================================
  doc.addPage();
  applyPageCanvas();
  drawEditorialHeaderFooter(3, 4, 'Arquitetura & Novas Obras');

  const art2 = edition.articles[1];

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.cyanLight[0], colors.cyanLight[1], colors.cyanLight[2]);
  doc.text(art2.pillarLabel.toUpperCase(), 14, 26);

  doc.setFontSize(15);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  const art2Title = doc.splitTextToSize(art2.title, 182);
  doc.text(art2Title, 14, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  const art2Sub = doc.splitTextToSize(art2.subtitle, 182);
  doc.text(art2Sub, 14, 48);

  // Box Comparativo Técnico (Azulejo vs Monolítico)
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(14, 58, 182, 34, 3, 3, 'F');
  doc.setDrawColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.roundedRect(14, 58, 182, 34, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colors.cyanLight[0], colors.cyanLight[1], colors.cyanLight[2]);
  doc.text('COMPARATIVO DE ENGENHARIA DE MATERIAIS:', 20, 66);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  doc.text('• Azulejo Tradicional: 1.200m lineares de rejunte cimentício suscetível a fungos, lixiviação e descolamento.', 20, 73);
  doc.text('• Revestimento Monolítico Jhoston: 0 juntas, acabamento contínuo em areia compactada e resina atóxica.', 20, 80);
  doc.text('• Coeficiente de atrito NBR 10.339: Classe III (> 0.40 antiderrapante suave ao toque descalço).', 20, 87);

  // Texto Artigo 2
  const textColY2 = 100;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);

  const p2Col1 = doc.splitTextToSize(art2.content[0] + '\n\n' + art2.content[1], colW);
  doc.text(p2Col1, col1X, textColY2);

  const p2Col2 = doc.splitTextToSize(art2.content[2], colW);
  doc.text(p2Col2, col2X, textColY2);

  // Artigo 3 (Upgrades e Automação na mesma página 3)
  const art3Y = 175;
  const art3 = edition.articles[2];

  doc.setFillColor(colors.innerCard[0], colors.innerCard[1], colors.innerCard[2]);
  doc.roundedRect(14, art3Y, 182, 95, 3, 3, 'F');
  doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.roundedRect(14, art3Y, 182, 95, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(colors.goldLight[0], colors.goldLight[1], colors.goldLight[2]);
  doc.text('UPGRADE & EFICIÊNCIA ENERGÉTICA:', 20, art3Y + 8);

  doc.setFontSize(11);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text(art3.title, 20, art3Y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  const a3Text = doc.splitTextToSize(
    'A automação da casa de máquinas com gerador de cloro a sal e motobombas com inversor de frequência ' +
    'reduz em até 42% os custos de energia elétrica e elimina em 85% a manipulação direta de produtos químicos agressivos. ' +
    'O retorno do investimento (ROI) é atingido em média em 22 meses.',
    170
  );
  doc.text(a3Text, 20, art3Y + 24);

  // Tabela Comparativa de Economia
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(20, art3Y + 45, 170, 42, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.cyanLight[0], colors.cyanLight[1], colors.cyanLight[2]);
  doc.text('SIMULAÇÃO DE ECONOMIA ANUAL (PISCINA RESIDENCIAL 50.000 L):', 25, art3Y + 53);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text('• Sistema Convencional: R$ 4.200/ano (cloro pó/pastilha) + R$ 1.950/ano (eletricidade 3/4 CV)', 25, art3Y + 62);
  doc.text('• Sistema Automatizado Sal + Inverter: R$ 680/ano (sal mineral) + R$ 890/ano (eletricidade ECO)', 25, art3Y + 70);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.text('• ECONOMIA LÍQUIDA ESTIMADA: R$ 4.580,00 POR ANO (Redução de 74%)', 25, art3Y + 79);

  // =========================================================================
  // PÁGINA 4: CHECKLIST, DIMENSIONAMENTO & CONVERSÃO WHITE-LABEL
  // =========================================================================
  doc.addPage();
  applyPageCanvas();
  drawEditorialHeaderFooter(4, 4, 'Consultoria & Dimensionamento');

  // Box Guia de Dimensionamento
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(14, 25, 182, 85, 3, 3, 'F');
  doc.setDrawColor(colors.cyan[0], colors.cyan[1], colors.cyan[2]);
  doc.roundedRect(14, 25, 182, 85, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(colors.cyanLight[0], colors.cyanLight[1], colors.cyanLight[2]);
  doc.text('TABELA DE DIMENSIONAMENTO RECOMENDADA PELA ENGENHARIA:', 20, 36);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  doc.text('Valores calculados para taxa de recirculação ideal de 6 horas (Norma NBR 10.339):', 20, 44);

  // Tabela
  const tableY = 52;
  doc.setFillColor(colors.innerCard[0], colors.innerCard[1], colors.innerCard[2]);
  doc.rect(20, tableY, 170, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.goldLight[0], colors.goldLight[1], colors.goldLight[2]);
  doc.text('VOLUME (L)', 25, tableY + 5);
  doc.text('POTÊNCIA BOMBA', 65, tableY + 5);
  doc.text('CARGA FILTRO', 110, tableY + 5);
  doc.text('AQUECEDOR (KW)', 150, tableY + 5);

  const rows = [
    { vol: 'Até 30.000 L', pump: '1/2 CV', filter: '40 kg (areia/vidro)', kw: '21 kW' },
    { vol: 'Até 60.000 L', pump: '3/4 CV', filter: '75 kg (areia/vidro)', kw: '42 kW' },
    { vol: 'Até 90.000 L', pump: '1.0 CV', filter: '125 kg (areia/vidro)', kw: '63 kW' },
    { vol: 'Acima 100.000 L', pump: '1.5 CV + Inverter', filter: '175 kg vítreo ativado', kw: 'Sob Medida' },
  ];

  let rY = tableY + 13;
  rows.forEach((r, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
      doc.rect(20, rY - 4.5, 170, 7, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.text(r.vol, 25, rY);
    doc.text(r.pump, 65, rY);
    doc.text(r.filter, 110, rY);
    doc.text(r.kw, 150, rY);
    rY += 7.5;
  });

  // CTA Monumental White-Label
  const ctaY = 120;
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(14, ctaY, 182, 145, 4, 4, 'F');
  doc.setDrawColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.setLineWidth(0.8);
  doc.roundedRect(14, ctaY, 182, 145, 4, 4, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text('SOLICITE SEU LAUDO DE DIMENSIONAMENTO OU PROJETO', 22, ctaY + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.slate300[0], colors.slate300[1], colors.slate300[2]);
  const ctaDesc = doc.splitTextToSize(
    `Seja para manter a garantia decenal da sua piscina atual ou para iniciar um novo projeto monolítico, ` +
    `a engenharia de ${tenantName} oferece auditoria presencial com teste de ISL em tempo real. ` +
    'Receba um planejamento completo de tratamento, estequiometria e equipamentos sem compromisso.',
    165
  );
  doc.text(ctaDesc, 22, ctaY + 26);

  // Card de Contato Direto
  doc.setFillColor(colors.innerCard[0], colors.innerCard[1], colors.innerCard[2]);
  doc.roundedRect(22, ctaY + 54, 166, 42, 2, 2, 'F');
  doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.roundedRect(22, ctaY + 54, 166, 42, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colors.goldLight[0], colors.goldLight[1], colors.goldLight[2]);
  doc.text('ATENDIMENTO TÉCNICO EXCLUSIVO:', 28, ctaY + 65);

  doc.setFontSize(14);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text(tenantName.toUpperCase(), 28, ctaY + 76);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(colors.cyanLight[0], colors.cyanLight[1], colors.cyanLight[2]);
  doc.text(`WhatsApp de Plantão: ${tenantWhatsapp}`, 28, ctaY + 86);

  // Botão Verde de WhatsApp
  doc.setFillColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.roundedRect(22, ctaY + 105, 166, 16, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
  doc.text(`ENVIAR MENSAGEM VIA WHATSAPP: ${tenantWhatsapp}`, 38, ctaY + 115.5);

  // Link Web da Versão Interativa
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.slate400[0], colors.slate400[1], colors.slate400[2]);
  doc.text('Acesse a versão interativa com a calculadora dinâmica em:', 55, ctaY + 130);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.cyanLight[0], colors.cyanLight[1], colors.cyanLight[2]);
  doc.text('https://jhpcs.vercel.app/revista/jhoston/edicao-01', 58, ctaY + 136);

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
