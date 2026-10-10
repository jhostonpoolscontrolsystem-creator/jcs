import { jsPDF } from 'jspdf';
import { JHPCS_LOGO_BASE64 } from './logo-base64';

export interface PresentationFlyerParams {
  type: 'DIRETORIA_JHOSTON' | 'CLIENTE_FINAL';
  recipientName?: string;
  establishmentName?: string;
  poolName?: string;
  volumeM3?: number;
}

/**
 * Gerador de Flyer Executivo / Apresentação Comercial em PDF (1 Página Alta Definição)
 * Diagramação matemática perfeita em A4 (210 x 297 mm) sem sobreposições e sem overflow de texto.
 */
export function generatePresentationFlyerPdf(params: PresentationFlyerParams): jsPDF {
  const {
    type,
    recipientName = type === 'DIRETORIA_JHOSTON' ? 'Diretoria Executiva JHoston Pools' : 'Gestão & Diretoria do Estabelecimento',
    establishmentName = type === 'DIRETORIA_JHOSTON' ? 'JHoston Pools do Brasil' : 'Resort Terravista Trancoso',
    poolName = 'Piscina de Areia Monolítica EcoStone',
    volumeM3 = 350
  } = params;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const isDiretoria = type === 'DIRETORIA_JHOSTON';

  // 1. Fundo Dark Modern
  doc.setFillColor(2, 6, 23); // Slate-950
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Faixa de Destaque Superior
  if (isDiretoria) {
    doc.setFillColor(245, 158, 11); // Amber-500
    doc.rect(0, 0, pageWidth, 4, 'F');
  } else {
    doc.setFillColor(6, 182, 212); // Cyan-500
    doc.rect(0, 0, pageWidth, 4, 'F');
  }

  // 2. Header Institucional (Topo Seguro: Y = 12)
  let currentY = 12;
  try {
    if (JHPCS_LOGO_BASE64) {
      doc.addImage(JHPCS_LOGO_BASE64, 'PNG', 14, currentY, 20, 10);
    }
  } catch (e) {}

  // Textos do Header com largura máxima e sem conflitar com o badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('JHOSTON POOLS CONTROL SYSTEM', 38, currentY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // Slate-400
  doc.text('ENGENHARIA MINERAL • DIGITAL TWIN • AUDITORIA FORENSE DE REVESTIMENTOS', 38, currentY + 9.5);

  // Badge no Topo Direito (Posição Absoluta Segura: X = 152, W = 44)
  doc.setFillColor(isDiretoria ? 120 : 8, isDiretoria ? 53 : 51, isDiretoria ? 15 : 68);
  doc.setDrawColor(isDiretoria ? 245 : 6, isDiretoria ? 158 : 182, isDiretoria ? 11 : 212);
  doc.setLineWidth(0.3);
  doc.roundedRect(pageWidth - 58, currentY + 0.5, 44, 8, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(isDiretoria ? 251 : 103, isDiretoria ? 191 : 232, isDiretoria ? 36 : 249);
  doc.text(isDiretoria ? 'FLYER EXECUTIVO DIRETORIA' : 'FLYER VIP DO CLIENTE', pageWidth - 36, currentY + 5.5, { align: 'center' });

  // Linha Divisória
  currentY = 25;
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.4);
  doc.line(14, currentY, pageWidth - 14, currentY);

  // 3. Título Principal de Impacto
  currentY = 32;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);

  if (isDiretoria) {
    doc.text('A Blindagem Definitiva do Revestimento Monolítico', 14, currentY);
    currentY += 6;
    doc.setFontSize(12);
    doc.setTextColor(245, 158, 11); // Amber-500
    doc.text('Plano de Manutenção Ativo (3 Anos), Telemetria F1 e Proteção Jurídica', 14, currentY);
  } else {
    doc.text('A Proteção Inteligente da Sua Piscina JHoston', 14, currentY);
    currentY += 6;
    doc.setFontSize(12);
    doc.setTextColor(6, 182, 212); // Cyan-500
    doc.text('Digital Twin, Plano de Manutenção Ativo de 3 Anos e Pós-Venda Proativo', 14, currentY);
  }

  // Caixa de Boas-Vindas Personalizada
  currentY += 8;
  const welcomeBoxH = 17;
  doc.setFillColor(15, 23, 42); // Slate-900
  doc.setDrawColor(isDiretoria ? 180 : 14, isDiretoria ? 83 : 165, isDiretoria ? 9 : 233);
  doc.setLineWidth(0.5);
  doc.roundedRect(14, currentY, pageWidth - 28, welcomeBoxH, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(`Destinatário Oficial: ${recipientName}`, 19, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  if (isDiretoria) {
    doc.text('Apresentação oficial de governança, conformidade química e eliminação de custos com retrabalhos indevidos.', 19, currentY + 11.5);
  } else {
    doc.text(`Estabelecimento: ${establishmentName} • Ativo Monitorado: ${poolName} (${volumeM3}m³)`, 19, currentY + 11.5);
  }

  // 4. Os 4 Pilares Estratégicos (Grid 2x2 com Cartões Modernos)
  currentY += welcomeBoxH + 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text(isDiretoria ? 'OS 4 PILARES ESTRATÉGICOS PARA A DIRETORIA' : 'OS 4 BENEFÍCIOS EXCLUSIVOS DO SEU PORTAL', 14, currentY);

  currentY += 4;
  const colW = (pageWidth - 28 - 6) / 2; // ~88mm por coluna
  const cardH = 34;

  const cardsData = isDiretoria ? [
    {
      num: '01',
      title: 'Plano de Manutenção Ativo (3 Anos)',
      desc: 'Substituição da garantia passiva pelo cuidado proativo. Acompanhamento semanal sem mensalidade e revisões anuais com mão de obra isenta.'
    },
    {
      num: '02',
      title: 'Cockpit Telemetria F1 ("Pit Wall")',
      desc: 'Tacômetros ao vivo de pH, Cloro e Langelier (LSI). Séries históricas com correlação climática via OpenWeather e radar precoce.'
    },
    {
      num: '03',
      title: 'Comunicação Automática via WhatsApp',
      desc: 'Alertas emergenciais em < 3.2s via Evolution API e despacho mensal de laudos executivos para síndicos e gerentes sem esforço manual.'
    },
    {
      num: '04',
      title: 'PWA com QR Code & Isolamento Multi-Tenant',
      desc: 'O tratador é funcionário do cliente. Ativação rápida com 1 toque por adesivo na casa de máquinas e operação 100% offline.'
    }
  ] : [
    {
      num: '01',
      title: 'Plano de Manutenção Ativo (3 Anos)',
      desc: 'Nós ligamos semanalmente para seu tratador (zero mensalidade). Visitas anuais (Ano 1, 2 e 3) com mão de obra especializada 100% isenta!'
    },
    {
      num: '02',
      title: 'Etiqueta QR Code da Casa de Máquinas',
      desc: 'Placa impermeável para colar no filtro. Seu tratador aponta a câmera e o app é instalado na hora, sem senhas complexas.'
    },
    {
      num: '03',
      title: 'Isolamento Absoluto do Seu Tratador',
      desc: 'Seu tratador enxerga exclusivamente as suas piscinas, garantindo sigilo empresarial total e blindagem conforme a LGPD.'
    },
    {
      num: '04',
      title: 'Estoque Preditivo & Inteligência do Clima',
      desc: 'Previsão de tempestades com alertas preventivos e cálculo de consumo de químicos antes de faltar no almoxarifado.'
    }
  ];

  // Renderiza Grid 2x2
  cardsData.forEach((card, index) => {
    const isColRight = index % 2 === 1;
    const isRowBottom = index >= 2;
    const cardX = 14 + (isColRight ? colW + 6 : 0);
    const cardY = currentY + (isRowBottom ? cardH + 4 : 0);

    doc.setFillColor(15, 23, 42); // Slate-900
    doc.setDrawColor(30, 41, 59); // Slate-800
    doc.setLineWidth(0.4);
    doc.roundedRect(cardX, cardY, colW, cardH, 2.5, 2.5, 'FD');

    // Número em destaque
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(isDiretoria ? 245 : 6, isDiretoria ? 158 : 182, isDiretoria ? 11 : 212);
    doc.text(card.num, cardX + 5, cardY + 6.5);

    // Título do Card
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(card.title, cardX + 13, cardY + 6.5);

    // Descrição
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(148, 163, 184); // Slate-400
    const splitDesc = doc.splitTextToSize(card.desc, colW - 10);
    doc.text(splitDesc, cardX + 5, cardY + 13);
  });

  // 5. Bloco de Destaque Tecnológico: Como Funciona o Fluxo de Campo
  currentY += (cardH * 2) + 10;
  const flowBoxH = 34;

  doc.setFillColor(8, 47, 73); // Sky-950
  doc.setDrawColor(14, 165, 233);
  doc.setLineWidth(0.5);
  doc.roundedRect(14, currentY, pageWidth - 28, flowBoxH, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(56, 189, 248); // Sky-400
  doc.text('⚡ FLUXO INTELIGENTE DE CAMPO (ZERO ATRITO OPERACIONAL):', 19, currentY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(241, 245, 249);

  // Quebra em 2 linhas organizadas com marcadores ASCII seguros
  if (isDiretoria) {
    const line1 = '• Passo 1 & 2: Cliente imprime a etiqueta da casa de máquinas -> Tratador aponta a câmera e instala o PWA sem login.';
    const line2 = '• Passo 3 & 4: Rotina rápida de 2 min com foto e GPS -> Supabase audita e a Evolution API dispara laudos em segundos.';
    doc.text(line1, 19, currentY + 14);
    doc.text(line2, 19, currentY + 21);
  } else {
    const line1 = '• Passo 1 & 2: Imprima o adesivo impermeável no painel -> Cole na casa de máquinas ou envie o link direto no WhatsApp.';
    const line2 = '• Passo 3 & 4: Tratador registra testes com câmera nativa -> Histórico validado garante mão de obra gratuita nas revisões.';
    doc.text(line1, 19, currentY + 14);
    doc.text(line2, 19, currentY + 21);
  }

  // Frase lema do pós-venda
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(253, 224, 71); // Yellow-300
  doc.text('"Sua única preocupação é aproveitar o lazer. A responsabilidade técnica e o cuidado contínuo são nossos."', 19, currentY + 28.5);

  // 6. Rodapé com Selo Criptográfico e Links Oficiais
  currentY += flowBoxH + 6;
  const accessBoxH = 36;
  doc.setFillColor(15, 23, 42);
  doc.rect(14, currentY, pageWidth - 28, accessBoxH, 'F');
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.rect(14, currentY, pageWidth - 28, accessBoxH, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text('ACESSO OFICIAL AO SISTEMA:', 19, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Plataforma Web & PWA: https://jhpcs.vercel.app', 19, currentY + 15);
  doc.text('Revista Executiva Online: https://jhpcs.vercel.app/revista-executiva', 19, currentY + 21);
  doc.text('Validação Criptográfica: SHA-256 JHPCS-OFFICIAL-FLYER-SEAL', 19, currentY + 27);

  // Selo Dourado / Ciano no Canto Inferior Direito
  const sealW = 46;
  const sealH = 22;
  const sealX = pageWidth - 14 - sealW - 4;
  const sealY = currentY + 7;

  doc.setFillColor(isDiretoria ? 245 : 6, isDiretoria ? 158 : 182, isDiretoria ? 11 : 212);
  doc.roundedRect(sealX, sealY, sealW, sealH, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(2, 6, 23); // Slate-950
  doc.text('PLANO DE MANUTENÇÃO', sealX + (sealW / 2), sealY + 7, { align: 'center' });
  doc.text('ATIVO (3 ANOS)', sealX + (sealW / 2), sealY + 12, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('JHÖSTON POOLS OFICIAL', sealX + (sealW / 2), sealY + 17, { align: 'center' });

  // Rodapé Final Legal (Posição Segura: pageHeight - 6)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('JHoston Pools Control System (JHPCS) • Todos os direitos reservados • Documento oficial de apresentação técnica', pageWidth / 2, pageHeight - 6, { align: 'center' });

  return doc;
}
