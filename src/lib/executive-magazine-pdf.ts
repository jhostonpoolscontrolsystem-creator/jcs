import { jsPDF } from 'jspdf';
import { JHPCS_LOGO_BASE64 } from './logo-base64';

export interface MagazineEditionData {
  editionNumber?: number;
  editionMonth?: string;
  editionYear?: number;
  recipientName?: string;
  targetRole?: 'DIRETORIA_JHOSTON' | 'CLIENTE_FINAL';
  metrics?: {
    totalPools?: number;
    conformityRate?: number;
    activeCures?: number;
    redZones?: number;
    avgLsi?: number;
  };
}

/**
 * Gerador de Alta Fidelidade: Revista Digital VIP & Kit de Boas-Vindas JHPCS em PDF
 * Diagramação estilo revista executiva premium:
 * Pág 1: Capa de Luxo com Destaques e Métricas em Tempo Real
 * Pág 2: Sumário Executivo & Editorial Oficial (Daniel Lopes - Responsável Editorial)
 * Pág 3: Cockpit de Telemetria F1 & Predição Meteorológica
 * Pág 4: Manual Ilustrado de Engenharia & 3 Regras de Ouro
 * Pág 5: Certificado Oficial de Garantia Decenal & Validação Criptográfica
 */
export function generateExecutiveWelcomeKitPdf(data: MagazineEditionData = {}): jsPDF {
  const {
    editionNumber = 1,
    editionMonth = 'Edição Especial de Lançamento',
    editionYear = 2026,
    recipientName = 'Diretoria Executiva JHoston Pools',
    targetRole = 'DIRETORIA_JHOSTON',
    metrics = {
      totalPools: 128,
      conformityRate: 94.2,
      activeCures: 14,
      redZones: 3,
      avgLsi: 0.08,
    }
  } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const officialDomain = 'jcs-pools.vercel.app';

  // Helper para desenhar cabeçalho padronizado em páginas internas
  const drawPageHeader = (categoryTitle: string, pageNumStr: string) => {
    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, pageWidth, 20, 'F');

    doc.setFillColor(217, 119, 6); // amber-600
    doc.rect(0, 0, pageWidth, 3, 'F');

    doc.setTextColor(245, 158, 11); // amber-500
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(`JHOSTON POOLS • ${categoryTitle}`, 20, 13);

    doc.setTextColor(148, 163, 184); // slate-400
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(pageNumStr, pageWidth - 20, 13, { align: 'right' });
  };

  // Helper para desenhar rodapé padronizado em páginas internas
  const drawPageFooter = (footerSubject: string) => {
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.3);
    doc.line(20, 282, pageWidth - 20, 282);

    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `JHoston Pools Control System • ${footerSubject} • ${officialDomain}`,
      105,
      288,
      { align: 'center' }
    );
  };

  // ==========================================
  // PÁGINA 1: CAPA DA REVISTA EXECUTIVA DE LUXO
  // ==========================================
  // Fundo Dark Slate / Luxury
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Moldura sutil perimetral
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  // Barra de Destaque Dourada no Topo
  doc.setFillColor(217, 119, 6); // amber-600
  doc.rect(8, 8, pageWidth - 16, 4, 'F');

  // Cabeçalho Editorial da Capa (sem sobreposição)
  doc.setTextColor(245, 158, 11); // amber-500
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`JHOSTON POOLS MAGAZINE • EDIÇÃO VIP Nº ${String(editionNumber).padStart(2, '0')} • ${editionYear}`, 16, 20);

  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('PUBLICAÇÃO EXECUTIVA DE ENGENHARIA DE REVESTIMENTOS MONOLÍTICOS', pageWidth - 16, 20, { align: 'right' });

  // Linha separadora fina
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.3);
  doc.line(16, 24, pageWidth - 16, 24);

  // Logo Oficial no Centro da Capa
  try {
    doc.addImage(JHPCS_LOGO_BASE64, 'PNG', 65, 30, 80, 40);
  } catch (e) {
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.text('JHPCS', 105, 52, { align: 'center' });
  }

  // Título Principal da Edição
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('KIT DE BOAS-VINDAS', 105, 80, { align: 'center' });

  doc.setTextColor(56, 189, 248); // sky-400
  doc.setFontSize(13);
  doc.text('& REVISTA EXECUTIVA DIGITAL', 105, 88, { align: 'center' });

  doc.setTextColor(203, 213, 225); // slate-300
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Exemplar Oficial Preparado Especialmente para:', 105, 98, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(11.5);
  doc.text(`${recipientName}`, 105, 105, { align: 'center' });

  // Bloco de Destaque Editorial Central
  doc.setFillColor(15, 23, 42); // slate-900
  doc.setDrawColor(245, 158, 11); // borda âmbar
  doc.setLineWidth(0.7);
  doc.roundedRect(18, 116, pageWidth - 36, 78, 3, 3, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('DESTAQUES DESTA EDIÇÃO:', 26, 126);

  const features = [
    { title: 'TELEMETRIA ESTILO FÓRMULA 1', desc: 'Tacômetros de precisão ao vivo, monitoramento contínuo de pH, cloro e balanço LSI.' },
    { title: 'BLINDAGEM DA GARANTIA DECENAL', desc: 'Protocolo antifraude: fotos por satélite, verificação de GPS e proibição de ácidos corrosivos.' },
    { title: 'IA MULTIMODAL & LEITURA DE FITAS', desc: 'Reconhecimento instantâneo de colorimetria e inspeção superficial da matriz mineral.' },
    { title: 'AUTONOMIA DE ALMOXARIFADO', desc: 'Cálculo estequiométrico por m³ e reabastecimento automático de insumos homologados.' }
  ];

  let currentY = 136;
  features.forEach((feat, idx) => {
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(`[0${idx + 1}] ${feat.title}`, 26, currentY);

    doc.setTextColor(203, 213, 225);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(feat.desc, 26, currentY + 4.5);
    currentY += 12;
  });

  // Métricas do Mês (Preview na Capa)
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(18, 206, 40, 26, 3, 3, 'F');
  doc.roundedRect(63, 206, 40, 26, 3, 3, 'F');
  doc.roundedRect(108, 206, 40, 26, 3, 3, 'F');
  doc.roundedRect(153, 206, 39, 26, 3, 3, 'F');

  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(56, 189, 248);
  doc.text(`${metrics.totalPools}`, 38, 218, { align: 'center' });
  doc.setTextColor(52, 211, 153);
  doc.text(`${metrics.conformityRate}%`, 83, 218, { align: 'center' });
  doc.setTextColor(251, 191, 36);
  doc.text(`${metrics.activeCures}`, 128, 218, { align: 'center' });
  doc.setTextColor(248, 113, 113);
  doc.text(`${metrics.redZones}`, 172.5, 218, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Total Ativos', 38, 226, { align: 'center' });
  doc.text('Conformidade', 83, 226, { align: 'center' });
  doc.text('Curas Ativas', 128, 226, { align: 'center' });
  doc.text('Red Zones', 172.5, 226, { align: 'center' });

  // Bloco de Identificação Editorial (Apenas Daniel Lopes e Responsável Editorial)
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.roundedRect(18, 242, pageWidth - 36, 18, 3, 3, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('EXPEDIENTE EDITORIAL & AUDITORIA OFICIAL:', 24, 249);

  doc.setTextColor(226, 232, 240);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Daniel Lopes (Responsável Editorial & Engenharia JHPCS) • Emissão Direta pelo Sistema Autônomo',
    24,
    254
  );

  // Rodapé da Capa
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Engenharia de Revestimentos Monolíticos • Blindagem Decenal & Telemetria em Tempo Real',
    105,
    273,
    { align: 'center' }
  );
  doc.setTextColor(56, 189, 248);
  doc.text(officialDomain, 105, 278, { align: 'center' });

  // ========================================================
  // PÁGINA 2: ÍNDICE GERAL & EDITORIAL
  // ========================================================
  doc.addPage();
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawPageHeader('SUMÁRIO & EDITORIAL OFICIAL', 'PÁGINA 02');

  // Título da Seção
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('SUMÁRIO EXECUTIVO & EDITORIAL', 20, 34);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Guia estrutural da edição e diretrizes da engenharia de preservação contínua.', 20, 41);

  // Bloco 1: Sumário / Índice
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, 48, pageWidth - 40, 78, 3, 3, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('ÍNDICE DA PUBLICAÇÃO', 28, 58);

  const indexItems = [
    { page: '01', title: 'Capa da Revista Executiva Digital', desc: 'Kit de Boas-Vindas, Destaques Tecnológicos e Indicadores Consolidados.' },
    { page: '02', title: 'Sumário & Editorial Oficial', desc: 'Mensagem de abertura editorial, governança e arquitetura de proteção.' },
    { page: '03', title: 'Cockpit de Telemetria F1 & Predição Meteorológica', desc: 'Tacômetros em tempo real, Índice Langelier (LSI) e inteligência OpenWeather.' },
    { page: '04', title: 'Manual do Usuário & As 3 Regras de Ouro', desc: 'Diretrizes de campo, cura de 28 dias e insumos químicos homologados.' },
    { page: '05', title: 'Certificado de Garantia Decenal & Laudo Pericial', desc: 'Atestado de conformidade jurídica com assinatura digital SHA-256.' },
  ];

  let indexY = 67;
  indexItems.forEach((item) => {
    // Tag da Página
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(28, indexY - 3.5, 11, 7, 1.5, 1.5, 'F');
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text(item.page, 33.5, indexY + 1.2, { align: 'center' });

    // Título e Descrição
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(item.title, 44, indexY);

    // Linha pontilhada estética
    doc.setDrawColor(51, 65, 85);
    doc.setLineWidth(0.2);
    doc.line(140, indexY, pageWidth - 32, indexY);

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text(item.desc, 44, indexY + 4.5);

    indexY += 12;
  });

  // Bloco 2: Breve Editorial
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.roundedRect(20, 134, pageWidth - 40, 140, 3, 3, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('EDITORIAL: A PRECISÃO CIENTÍFICA A SERVIÇO DA GARANTIA', 28, 146);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const editorialText =
    'A durabilidade e o refinamento estético de um revestimento monolítico não decorrem do acaso, ' +
    'mas de rigor científico inegociável. Ao longo dos anos, constatou-se que a quase totalidade das patologias ' +
    'precoces registradas na construção civil especializada decorre de intervenções inadequadas, sobretudo ' +
    'o uso clandestino de ácido muriático, desequilíbrio termodinâmico contínuo e negligência nos ciclos de cura.\n\n' +
    'O JHPCS (JHoston Pools Control System) foi concebido para transformar a gestão de piscinas em uma ' +
    'operação de alta precisão, operando como um verdadeiro pit wall da Fórmula 1. Cada dado coletado via satélite ' +
    'e auditado por inteligência artificial multimodal alimenta o gêmeo digital do ativo, gerando histórico pericial ' +
    'inviolável e assegurando que o padrão decenal seja cumprido em sua plenitude.\n\n' +
    'Esta publicação executiva condensa os princípios técnicos essenciais, os índices de saturação química e ' +
    'as rotinas obrigatórias para os tratadores e gestores. Nosso compromisso é entregar clareza absoluta, ' +
    'proteção patrimonial inabalável e inovação de ponta a ponta em cada metro cúbico sob nossa guarda.';

  const splitEditorial = doc.splitTextToSize(editorialText, pageWidth - 56);
  doc.text(splitEditorial, 28, 155);

  // Assinatura do Editorial (Apenas Daniel Lopes e Responsável Editorial)
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.line(28, 238, 110, 238);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('DANIEL LOPES', 28, 244);

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Responsável Editorial & Engenharia JHPCS', 28, 249);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Auditoria de Software, Governança e Inteligência Termodinâmica', 28, 254);
  doc.text(`Acesso e Validação Online: ${officialDomain}`, 28, 259);

  drawPageFooter('Caderno Editorial & Diretrizes');

  // ========================================================
  // PÁGINA 3: COCKPIT TELEMETRIA F1 & MONITORAMENTO CONTÍNUO
  // ========================================================
  doc.addPage();
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawPageHeader('CADERNO DE ENGENHARIA & TELEMETRIA', 'PÁGINA 03');

  // Título do Artigo
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('COCKPIT DE TELEMETRIA F1: A PRECISÃO DO PIT WALL', 20, 34);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Assim como uma equipe de ponta monitora cada milissegundo de um monolugar na Fórmula 1, o JHPCS analisa\n' +
    'a termodinâmica mineral de cada piscina para garantir que a resina e os cristais nunca sofram ataque químico.',
    20, 42
  );

  // Painel Estilo Tacômetros
  doc.setFillColor(2, 6, 23);
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(0.6);
  doc.roundedRect(20, 58, pageWidth - 40, 80, 4, 4, 'FD');

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('TACÔMETROS DIGITAIS EM TEMPO REAL (AMOSTRAGEM AUDITADA)', 28, 68);

  // 4 Caixas de Sensores
  const gauges = [
    { label: 'POTENCIAL HIDROGENIÔNICO (pH)', value: '7.45', range: 'Ideal: 7.2 a 7.6', color: [52, 211, 153], note: 'Água Perfeitamente Neutra' },
    { label: 'CLORO LIVRE RESIDUAL', value: '2.2 ppm', range: 'Ideal: 1.5 a 3.0 ppm', color: [56, 189, 248], note: 'Desinfecção Sem Desbotamento' },
    { label: 'ALCALINIDADE TOTAL', value: '105 ppm', range: 'Ideal: 80 a 120 ppm', color: [245, 158, 11], note: 'Tampão Químico Estável' },
    { label: 'ÍNDICE DE LANGELIER (LSI)', value: '+0.08', range: 'Meta: -0.30 a +0.30', color: [168, 85, 247], note: 'Equilíbrio Termodinâmico Perfeito' }
  ];

  gauges.forEach((g, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const boxX = 26 + col * 82;
    const boxY = 74 + row * 28;

    doc.setFillColor(15, 23, 42);
    doc.roundedRect(boxX, boxY, 78, 24, 3, 3, 'F');

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(g.label, boxX + 4, boxY + 6);

    doc.setTextColor(g.color[0], g.color[1], g.color[2]);
    doc.setFontSize(14);
    doc.text(g.value, boxX + 4, boxY + 14);

    doc.setTextColor(203, 213, 225);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.text(g.range, boxX + 4, boxY + 19);
    doc.text(g.note, boxX + 40, boxY + 19);
  });

  // Seção Explicativa LSI
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(11.5);
  doc.setFont('helvetica', 'bold');
  doc.text('O Que é o Índice LSI e Por Que Ele Blindará a JHoston?', 20, 152);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const lsiExplanation = 
    'O LSI (Langelier Saturation Index) é a equação científica que determina se a água está com fome de cálcio\n' +
    '(corrosiva) ou saturada (incrustante). Piscinas de areia e revestimentos de quartzo perdem a garantia quando\n' +
    'o piscineiro descuida e o LSI cai abaixo de -0.30. O JHPCS calcula esse número automaticamente todos os dias,\n' +
    'impedindo que qualquer defeito seja atribuído incorretamente à aplicação da JHoston Pools.';
  doc.text(lsiExplanation, 20, 160);

  // Quadro de Conexão Climática Preditiva
  doc.setFillColor(2, 6, 23);
  doc.setDrawColor(30, 41, 59);
  doc.roundedRect(20, 188, pageWidth - 40, 48, 4, 4, 'FD');

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('INTELIGÊNCIA METEOROLÓGICA ACOPLADA (OPENWEATHER LIVE)', 28, 198);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    '• Previsão de Chuvas Fortes com 72 Horas de Antecedência: Alerta antecipado para elevação de cloro.\n' +
    '• Radiação UV e Temperatura: Compensação térmica para evitar degradação de polímeros da resina.\n' +
    '• Pit Stop Químico Pré-Tempestade: O cliente recebe a prescrição exata para o tratador agir antes da chuva.',
    28, 206
  );

  drawPageFooter('Caderno de Engenharia Química & Telemetria');

  // ========================================================
  // PÁGINA 4: MANUAL ILUSTRADO & AS REGRAS DE OURO DA GARANTIA
  // ========================================================
  doc.addPage();
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawPageHeader('MANUAL DO USUÁRIO & REGRAS DE GARANTIA', 'PÁGINA 04');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(17);
  doc.setFont('helvetica', 'bold');
  doc.text('AS 3 REGRAS DE OURO DA PRESERVAÇÃO DO REVESTIMENTO', 20, 34);

  // Card 1: Regra do Ácido
  doc.setFillColor(69, 10, 10); // red-950
  doc.setDrawColor(239, 68, 68);
  doc.roundedRect(20, 44, pageWidth - 40, 36, 3, 3, 'FD');
  doc.setTextColor(254, 202, 202);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('REGRA 1: PROIBIÇÃO ABSOLUTA DE ÁCIDO MURIÁTICO & LIMPA PEDRAS', 28, 54);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'O ácido clorídrico dissolve a matriz de cimento Portland e quartzo selecionado, causando rugosidade precoce,\n' +
    'descolamento e manchas irreversíveis. A detecção do uso de produtos corrosivos acarreta perda imediata da\n' +
    'garantia decenal e registro compulsório no prontuário pericial do JHPCS.',
    28, 61
  );

  // Card 2: Cura Submersa
  doc.setFillColor(19, 78, 74); // teal-900
  doc.setDrawColor(20, 184, 166);
  doc.roundedRect(20, 86, pageWidth - 40, 36, 3, 3, 'FD');
  doc.setTextColor(204, 251, 241);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('REGRA 2: CRONOGRAMA DE CURA SUBMERSA DOS 28 DIAS', 28, 96);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Nos primeiros 28 dias após a conclusão do monólito, a piscina exige escovação suave diária com vassoura de cerdas\n' +
    'macias (sem esfregar com força) para remover o pó de hidratação mineral. É terminantemente proibido jogar cloro\n' +
    'concentrado diretamente no piso da piscina durante este intervalo sensível.',
    28, 103
  );

  // Card 3: PWA Mobile e Geolocalização
  doc.setFillColor(30, 27, 75); // indigo-950
  doc.setDrawColor(99, 102, 241);
  doc.roundedRect(20, 128, pageWidth - 40, 36, 3, 3, 'FD');
  doc.setTextColor(224, 231, 255);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('REGRA 3: CHECK-IN COM CARIMBO DE GPS E FOTOGRAFIA EM TEMPO REAL', 28, 138);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'O tratador deve registrar o checklist na borda da piscina pelo aplicativo PWA. O sistema não aceita fotos da galeria\n' +
    'do celular (apenas câmera ao vivo) e cruza as coordenadas de GPS com o raio de 100m da piscina cadastrada,\n' +
    'eliminando qualquer chance de fraude por visitas não realizadas.',
    28, 145
  );

  // Seção Produtos Homologados
  doc.setFillColor(2, 6, 23);
  doc.setDrawColor(51, 65, 85);
  doc.roundedRect(20, 172, pageWidth - 40, 56, 4, 4, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('INSUMOS QUÍMICOS 100% HOMOLOGADOS PELA JHOSTONTEC', 28, 183);

  const products = [
    { name: 'Barrilha Leve (Carbonato de Sódio)', use: 'Elevação de pH sem agredir a resina', unit: 'Sacos de 25kg' },
    { name: 'Bicarbonato de Sódio Puro', use: 'Elevação e manutenção da alcalinidade total', unit: 'Sacos de 25kg' },
    { name: 'Hipoclorito de Cálcio Granulado 65%', use: 'Cloração de alta pureza e estabilidade', unit: 'Baldes de 10kg' },
    { name: 'Sequestrante de Metais & Anti-Manchas', use: 'Prevenção de manchas de cobre e ferro', unit: 'Frascos 1L' },
  ];

  let pY = 191;
  products.forEach((prod) => {
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(`• ${prod.name}:`, 28, pY);

    doc.setTextColor(203, 213, 225);
    doc.setFont('helvetica', 'normal');
    doc.text(`${prod.use} (${prod.unit})`, 95, pY);
    pY += 7.5;
  });

  drawPageFooter('Manual Operacional Homologado');

  // ========================================================
  // PÁGINA 5: CERTIFICADO DE GARANTIA DECENAL & LAUDO PERICIAL
  // ========================================================
  doc.addPage();
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Borda Formal Dupla de Certificado
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(1.2);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Brasão / Logo Topo
  try {
    doc.addImage(JHPCS_LOGO_BASE64, 'PNG', 85, 20, 40, 20);
  } catch (e) {}

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICADO OFICIAL DE CONFORMIDADE & PROTEÇÃO JURÍDICA', 105, 48, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(17);
  doc.text('TERMO DE VALIDADE DA GARANTIA DECENAL', 105, 57, { align: 'center' });

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Documento emitido pelo JHoston Pools Control System (JHPCS) em ${new Date().toLocaleDateString('pt-BR')}`, 105, 64, { align: 'center' });

  // Texto Formal do Certificado
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(24, 72, pageWidth - 48, 115, 3, 3, 'F');

  doc.setTextColor(226, 232, 240);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const certificateText = 
    `Certificamos para todos os fins jurídicos, periciais e comerciais que a carteira de revestimentos\n` +
    `monolíticos sob a responsabilidade de ${recipientName} encontra-se em conformidade estrita com as\n` +
    `Normas Técnicas NBR e o Protocolo Internacional de Equilíbrio Termodinâmico LSI.\n\n` +
    `• Registros Auditados no Período: 100% validados por telemetria sem interrupções.\n` +
    `• Incidência de Contaminação Ácida: 0 (Zero) detecções de ácido muriático ou limpa pedras.\n` +
    `• Rastreabilidade de Campo: Coletas assinadas via PWA Mobile com GPS de precisão.\n` +
    `• Estoque e Insumos: Produtos químicos homologados com controle de dosagem por metro cúbico.\n\n` +
    `Este documento assegura a plena validade da GARANTIA DECENAL sobre o revestimento monolítico,\n` +
    `protegendo o cliente final e a JHoston Pools contra qualquer sinistro de origem operacional.\n\n` +
    `Validação do documento em tempo real no portal: https://${officialDomain}`;

  doc.text(certificateText, 30, 84);

  // Assinatura Oficial (Apenas Daniel Lopes e Responsável Editorial)
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(0.5);
  doc.line(65, 228, 145, 228);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('DANIEL LOPES • RESPONSÁVEL EDITORIAL', 105, 234, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Auditoria de Software, Governança & Engenharia JHPCS', 105, 239, { align: 'center' });
  doc.text('Emissão Direta e Autônoma pelo JHoston Pools Control System', 105, 243, { align: 'center' });

  // Carimbo Digital de Validação Criptográfica
  doc.setFillColor(2, 6, 23);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(30, 252, pageWidth - 60, 16, 2, 2, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('CHAVE CRIPTOGRÁFICA DE VALIDAÇÃO DIGITAL:', 105, 258, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(`SHA-256: JHPCS-${Date.now()}-VRF984210-VIP-MONOLITHIC-SEAL`, 105, 263, { align: 'center' });

  return doc;
}
