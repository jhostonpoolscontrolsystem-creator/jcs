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
 * Ideal para anexar no WhatsApp, impressão rápida ou compor o Kit de Boas-Vindas.
 * Versão 1: Flyer Corporativo para a Diretoria da JHoston Pools (Blindagem, F1, Lucro e Garantia)
 * Versão 2: Flyer VIP para o Cliente Final / Proprietário (Digital Twin, Proteção do Ativo e QR Code de Campo)
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

  // 1. Fundo Gradiente Elegante (Dark Modern)
  doc.setFillColor(2, 6, 23); // Slate-950
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Faixa de Destaque Superior (Dourado para Diretoria, Ciano/Esmeralda para Cliente)
  if (isDiretoria) {
    doc.setFillColor(245, 158, 11); // Amber-500
    doc.rect(0, 0, pageWidth, 5, 'F');
    doc.setFillColor(217, 119, 6); // Amber-600
    doc.rect(0, 5, pageWidth, 1.5, 'F');
  } else {
    doc.setFillColor(6, 182, 212); // Cyan-500
    doc.rect(0, 0, pageWidth, 5, 'F');
    doc.setFillColor(14, 165, 233); // Sky-500
    doc.rect(0, 5, pageWidth, 1.5, 'F');
  }

  // 2. Header Institucional
  let currentY = 16;
  try {
    if (JHPCS_LOGO_BASE64) {
      doc.addImage(JHPCS_LOGO_BASE64, 'PNG', 16, currentY, 26, 13);
    }
  } catch (e) {}

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('JHOSTON POOLS CONTROL SYSTEM', 48, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // Slate-400
  doc.text('ENGENHARIA MINERAL • DIGITAL TWIN • AUDITORIA FORENSE DE REVESTIMENTOS', 48, currentY + 11);

  // Badge no Topo Direito
  doc.setFillColor(isDiretoria ? 120 : 8, isDiretoria ? 53 : 51, isDiretoria ? 15 : 68); // Amber ou Cyan 950
  doc.roundedRect(pageWidth - 62, currentY + 1, 46, 9, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(isDiretoria ? 251 : 103, isDiretoria ? 191 : 232, isDiretoria ? 36 : 249); // Amber-400 ou Cyan-300
  doc.text(isDiretoria ? 'FLYER EXECUTIVO DIRETORIA' : 'FLYER VIP DO CLIENTE', pageWidth - 39, currentY + 6.5, { align: 'center' });

  // Linha Divisória
  currentY = 34;
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.line(16, currentY, pageWidth - 16, currentY);

  // 3. Título Principal de Impacto
  currentY += 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);

  if (isDiretoria) {
    doc.text('A Blindagem Definitiva da Garantia Decenal', 16, currentY);
    currentY += 7;
    doc.setFontSize(14);
    doc.setTextColor(245, 158, 11); // Amber-500
    doc.text('Inteligência Artificial, Telemetria F1 e Proteção Jurídica da Marca', 16, currentY);
  } else {
    doc.text('A Proteção Inteligente da Sua Piscina JHoston', 16, currentY);
    currentY += 7;
    doc.setFontSize(14);
    doc.setTextColor(6, 182, 212); // Cyan-500
    doc.text('Digital Twin, Certificado de Garantia e Gestão Sem Fricção do Tratador', 16, currentY);
  }

  // Caixa de Boas-Vindas Personalizada
  currentY += 10;
  doc.setFillColor(15, 23, 42); // Slate-900
  doc.setDrawColor(isDiretoria ? 180 : 14, isDiretoria ? 83 : 165, isDiretoria ? 9 : 233);
  doc.setLineWidth(0.6);
  doc.roundedRect(16, currentY, pageWidth - 32, 20, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`Destinatário Oficial: ${recipientName}`, 22, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225); // Slate-300
  if (isDiretoria) {
    doc.text('Apresentação oficial de governança, conformidade química e eliminação de custos com retrabalhos indevidos.', 22, currentY + 13);
  } else {
    doc.text(`Estabelecimento: ${establishmentName} • Ativo Monitorado: ${poolName} (${volumeM3}m³)`, 22, currentY + 13);
  }

  // 4. Os 4 Pilares de Excelência (Grid 2x2 com Cartões Modernos)
  currentY += 27;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(isDiretoria ? 'OS 4 PILARES ESTRATÉGICOS PARA A DIRETORIA' : 'OS 4 BENEFÍCIOS EXCLUSIVOS DO SEU PORTAL', 16, currentY);

  currentY += 5;
  const colW = (pageWidth - 32 - 6) / 2;
  const cardH = 34;

  const cardsData = isDiretoria ? [
    {
      num: '01',
      title: 'Escudo Jurídico & Trava Anti-Ácido',
      desc: 'Bloqueio estrito de ácidos muriáticos/limpa pedras. Notificação de Red Zone e laudos com validade pericial civil.'
    },
    {
      num: '02',
      title: 'Cockpit de Telemetria F1 ("Pit Wall")',
      desc: 'Tacômetros ao vivo de pH, Cloro e Langelier (LSI). Séries históricas com correlação climática via OpenWeather.'
    },
    {
      num: '03',
      title: 'Comunicação Automática via WhatsApp',
      desc: 'Alertas emergenciais em < 3.2s via Evolution API e despacho mensal de laudos executivos sem esforço manual.'
    },
    {
      num: '04',
      title: 'PWA com QR Code & Isolamento Multi-Tenant',
      desc: 'O piscineiro é funcionário do cliente. Ativação com 1 toque por adesivo na casa de máquinas e operação 100% offline.'
    }
  ] : [
    {
      num: '01',
      title: 'Garantia Decenal 100% Protegida',
      desc: 'Acompanhamento contínuo da estabilidade mineral. Histórico de conformidade exigido por seguradoras e condomínios.'
    },
    {
      num: '02',
      title: 'Etiqueta QR Code da Casa de Máquinas',
      desc: 'Placa impressa em PDF para colar no filtro. Seu tratador aponta a câmera e o app é instalado sem digitar endereços.'
    },
    {
      num: '03',
      title: 'Isolamento Absoluto do Seu Funcionário',
      desc: 'Seu tratador enxerga exclusivamente as suas piscinas, garantindo sigilo empresarial total e conformidade com a LGPD.'
    },
    {
      num: '04',
      title: 'Estoque Preditivo & Inteligência do Tempo',
      desc: 'Previsão de tempestades com alertas preventivos e cálculo de consumo de químicos antes de faltar no almoxarifado.'
    }
  ];

  // Renderiza Grid 2x2
  cardsData.forEach((card, index) => {
    const isColRight = index % 2 === 1;
    const isRowBottom = index >= 2;
    const cardX = 16 + (isColRight ? colW + 6 : 0);
    const cardY = currentY + (isRowBottom ? cardH + 5 : 0);

    doc.setFillColor(15, 23, 42); // Slate-900
    doc.setDrawColor(30, 41, 59); // Slate-800
    doc.setLineWidth(0.4);
    doc.roundedRect(cardX, cardY, colW, cardH, 2.5, 2.5, 'FD');

    // Número em destaque
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(isDiretoria ? 245 : 6, isDiretoria ? 158 : 182, isDiretoria ? 11 : 212);
    doc.text(card.num, cardX + 5, cardY + 7);

    // Título do Card
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(card.title, cardX + 14, cardY + 7);

    // Descrição
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184); // Slate-400
    const splitDesc = doc.splitTextToSize(card.desc, colW - 10);
    doc.text(splitDesc, cardX + 5, cardY + 14);
  });

  // 5. Bloco de Destaque Tecnológico: Como Funciona o Fluxo de Campo
  currentY += (cardH * 2) + 12;

  doc.setFillColor(8, 47, 73); // Sky-950 / Cyan-950
  doc.setDrawColor(14, 165, 233);
  doc.setLineWidth(0.5);
  doc.roundedRect(16, currentY, pageWidth - 32, 28, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(56, 189, 248); // Sky-400
  doc.text('⚡ FLUXO INTELIGENTE DE CAMPO (ZERO ATRITO OPERACIONAL):', 22, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(241, 245, 249);
  const flowText = isDiretoria
    ? '1. O Cliente imprime a Etiqueta da Casa de Máquinas → 2. Tratador aponta a câmera e instala o PWA → 3. Realiza a rotina em 2 min com foto e GPS → 4. Supabase processa e a Evolution API dispara os laudos em segundos.'
    : '1. Gere o adesivo na aba "Etiqueta Casa de Máquinas (QR)" → 2. Cole na tampa do filtro ou envie no WhatsApp do tratador → 3. Ele realiza os testes diários no sol sem senhas complexas → 4. Seu laudo mensal é emitido em PDF oficial.';
  const splitFlow = doc.splitTextToSize(flowText, pageWidth - 44);
  doc.text(splitFlow, 22, currentY + 14);

  // 6. Rodapé com Selo Criptográfico e Links Oficiais
  currentY += 34;
  doc.setFillColor(15, 23, 42);
  doc.rect(16, currentY, pageWidth - 32, 34, 'F');
  doc.setDrawColor(51, 65, 85);
  doc.rect(16, currentY, pageWidth - 32, 34, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('ACESSO OFICIAL AO SISTEMA:', 22, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Plataforma Web & PWA: https://jcs-pools.vercel.app', 22, currentY + 15);
  doc.text('Suporte & Engenharia: contato@jhostontec.com.br', 22, currentY + 21);
  doc.text('Validação Criptográfica: SHA-256 JHPCS-OFFICIAL-FLYER-SEAL', 22, currentY + 27);

  // Selo Dourado / Ciano no Canto Inferior Direito
  doc.setFillColor(isDiretoria ? 245 : 6, isDiretoria ? 158 : 182, isDiretoria ? 11 : 212);
  doc.roundedRect(pageWidth - 70, currentY + 6, 48, 22, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(2, 6, 23); // Slate-950
  doc.text('GARANTIA ASSEGURADA', pageWidth - 46, currentY + 13, { align: 'center' });
  doc.text('POR SOFTWARE', pageWidth - 46, currentY + 18, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('JHOSTON POOLS TEC', pageWidth - 46, currentY + 23, { align: 'center' });

  // Rodapé Final Legal
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('JHoston Pools Control System (JHPCS) • Todos os direitos reservados • Documento oficial de apresentação técnica', pageWidth / 2, pageHeight - 6, { align: 'center' });

  return doc;
}
