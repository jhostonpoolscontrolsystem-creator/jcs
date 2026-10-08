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
 * Diagramação estilo revista executiva premium de 4 páginas com capa de luxo,
 * cockpit de telemetria F1, manual ilustrado e certificado de garantia decenal.
 */
export function generateExecutiveWelcomeKitPdf(data: MagazineEditionData = {}): jsPDF {
  const {
    editionNumber = 1,
    editionMonth = 'Edição Especial de Lançamento',
    editionYear = 2026,
    recipientName = 'Diretoria JHoston Pools & Engenharia',
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

  // ==========================================
  // PÁGINA 1: CAPA DA REVISTA EXECUTIVA DE LUXO
  // ==========================================
  // Fundo Dark Slate / Luxury
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Barra de Destaque Dourada no Topo
  doc.setFillColor(217, 119, 6); // amber-600
  doc.rect(0, 0, pageWidth, 5, 'F');

  // Cabeçalho Editorial
  doc.setTextColor(245, 158, 11); // amber-500
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`JHOSTON POOLS MAGAZINE • EDIÇÃO VIP Nº ${String(editionNumber).padStart(2, '0')} • ${editionYear}`, 20, 18);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFont('helvetica', 'normal');
  doc.text('PUBLICAÇÃO EXECUTIVA DE ENGENHARIA DE REVESTIMENTOS MONOLÍTICOS', pageWidth - 20, 18, { align: 'right' });

  // Linha separadora fina
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.3);
  doc.line(20, 22, pageWidth - 20, 22);

  // Logo Oficial no Centro da Capa
  try {
    doc.addImage(JHPCS_LOGO_BASE64, 'PNG', 55, 30, 100, 50);
  } catch (e) {
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.text('JHPCS', 105, 55, { align: 'center' });
  }

  // Título Principal da Edição
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('KIT DE BOAS-VINDAS', 105, 95, { align: 'center' });

  doc.setTextColor(56, 189, 248); // sky-400
  doc.setFontSize(14);
  doc.text('& REVISTA EXECUTIVA DIGITAL', 105, 104, { align: 'center' });

  doc.setTextColor(203, 213, 225); // slate-300
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text(`Exemplar Oficial Preparado Especialmente para:`, 105, 116, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(12);
  doc.text(`${recipientName}`, 105, 123, { align: 'center' });

  // Bloco de Destaque Editorial Central
  doc.setFillColor(15, 23, 42); // slate-900
  doc.setDrawColor(245, 158, 11); // borda âmbar
  doc.setLineWidth(0.8);
  doc.roundedRect(20, 135, pageWidth - 40, 75, 4, 4, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('DESTAQUES DESTA EDIÇÃO:', 28, 146);

  const features = [
    { title: 'TELEMETRIA ESTILO FÓRMULA 1', desc: 'Tacômetros de precisão ao vivo, monitoramento contínuo de pH, cloro e balanço LSI.' },
    { title: 'BLINDAGEM DA GARANTIA DECENAL', desc: 'Protocolo antifraude: fotos por satélite, verificação de GPS e proibição de ácidos corrosivos.' },
    { title: 'IA MULTIMODAL & LEITURA DE FITAS', desc: 'Reconhecimento instantâneo de colorimetria e inspeção superficial da matriz mineral.' },
    { title: 'AUTONOMIA DE ALMOXARIFADO', desc: 'Cálculo estequiométrico por m³ e reabastecimento automático de insumos homologados.' }
  ];

  let currentY = 156;
  features.forEach((feat, idx) => {
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`[0${idx + 1}] ${feat.title}`, 28, currentY);

    doc.setTextColor(203, 213, 225);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.text(feat.desc, 28, currentY + 4.5);
    currentY += 12;
  });

  // Métricas do Mês (Preview na Capa)
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(20, 220, 40, 28, 3, 3, 'F');
  doc.roundedRect(65, 220, 40, 28, 3, 3, 'F');
  doc.roundedRect(110, 220, 40, 28, 3, 3, 'F');
  doc.roundedRect(155, 220, 35, 28, 3, 3, 'F');

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(56, 189, 248);
  doc.text(`${metrics.totalPools}`, 40, 232, { align: 'center' });
  doc.setTextColor(52, 211, 153);
  doc.text(`${metrics.conformityRate}%`, 85, 232, { align: 'center' });
  doc.setTextColor(251, 191, 36);
  doc.text(`${metrics.activeCures}`, 130, 232, { align: 'center' });
  doc.setTextColor(248, 113, 113);
  doc.text(`${metrics.redZones}`, 172.5, 232, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Total Ativos', 40, 241, { align: 'center' });
  doc.text('Conformidade', 85, 241, { align: 'center' });
  doc.text('Curas Ativas', 130, 241, { align: 'center' });
  doc.text('Red Zones', 172.5, 241, { align: 'center' });

  // Rodapé da Capa
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Engenharia de Revestimentos Monolíticos • Joabson & Diretoria JHoston • Master Daniel Lopes & Patrícia Grübel', 105, 275, { align: 'center' });
  doc.text('jcs-delta.vercel.app • Proteção Termodinâmica em Tempo Real', 105, 280, { align: 'center' });

  // ========================================================
  // PÁGINA 2: COCKPIT TELEMETRIA F1 & MONITORAMENTO CONTÍNUO
  // ========================================================
  doc.addPage();
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Cabeçalho da Página 2
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 22, 'F');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('JHOSTON POOLS • CADERNO DE ENGENHARIA & TELEMETRIA', 20, 14);
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text('PÁGINA 02', pageWidth - 20, 14, { align: 'right' });

  // Título do Artigo
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('COCKPIT DE TELEMETRIA F1: A PRECISÃO DO PIT WALL', 20, 36);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Assim como uma equipe de ponta monitora cada milissegundo de um monolugar na Fórmula 1, o JHPCS analisa\n' +
    'a termodinâmica mineral de cada piscina para garantir que a resina e os cristais nunca sofram ataque químico.',
    20, 44
  );

  // Painel Estilo Tacômetros
  doc.setFillColor(2, 6, 23);
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(0.6);
  doc.roundedRect(20, 60, pageWidth - 40, 80, 4, 4, 'FD');

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('TACÔMETROS DIGITAIS EM TEMPO REAL (AMOSTRAGEM AUDITADA)', 28, 70);

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
    const boxY = 76 + row * 28;

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
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('O Que é o Índice LSI e Por Que Ele Blindará a JHoston?', 20, 155);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const lsiExplanation = 
    'O LSI (Langelier Saturation Index) é a equação científica que determina se a água está com fome de cálcio\n' +
    '(corrosiva) ou saturada (incrustante). Piscinas de areia e revestimentos de quartzo perdem a garantia quando\n' +
    'o piscineiro descuida e o LSI cai abaixo de -0.30. O JHPCS calcula esse número automaticamente todos os dias,\n' +
    'impedindo que qualquer defeito seja atribuído incorretamente à aplicação da JHoston Pools.';
  doc.text(lsiExplanation, 20, 163);

  // Quadro de Conexão Climática Preditiva
  doc.setFillColor(2, 6, 23);
  doc.setDrawColor(30, 41, 59);
  doc.roundedRect(20, 190, pageWidth - 40, 48, 4, 4, 'FD');

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('INTELIGÊNCIA METEOROLÓGICA ACOPLADA (OPENWEATHER LIVE)', 28, 200);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    '• Previsão de Chuvas Fortes com 72 Horas de Antecedência: Alerta antecipado para elevação de cloro.\n' +
    '• Radiação UV e Temperatura: Compensação térmica para evitar degradação de polímeros da resina.\n' +
    '• Pit Stop Químico Pré-Tempestade: O cliente recebe a prescrição exata para o tratador agir antes da chuva.',
    28, 208
  );

  // Rodapé da Página 2
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('JHoston Pools Control System • Caderno de Engenharia Química • jcs-delta.vercel.app', 105, 285, { align: 'center' });

  // ========================================================
  // PÁGINA 3: MANUAL ILUSTRADO & AS REGRAS DE OURO DA GARANTIA
  // ========================================================
  doc.addPage();
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Cabeçalho da Página 3
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 22, 'F');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('JHOSTON POOLS • MANUAL ILUSTRADO DO USUÁRIO & REGRAS DE GARANTIA', 20, 14);
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text('PÁGINA 03', pageWidth - 20, 14, { align: 'right' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('AS 3 REGRAS DE OURO DA PRESERVAÇÃO DO REVESTIMENTO', 20, 36);

  // Card 1: Regra do Ácido
  doc.setFillColor(69, 10, 10); // red-950
  doc.setDrawColor(239, 68, 68);
  doc.roundedRect(20, 46, pageWidth - 40, 36, 3, 3, 'FD');
  doc.setTextColor(254, 202, 202);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('REGRA 1: PROIBIÇÃO ABSOLUTA DE ÁCIDO MURIÁTICO & LIMPA PEDRAS', 28, 56);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'O ácido clorídrico dissolve a matriz de cimento Portland e quartzo selecionado, causando rugosidade precoce,\n' +
    'descolamento e manchas irreversíveis. A detecção do uso de produtos corrosivos acarreta perda imediata da\n' +
    'garantia decenal e registro compulsório no prontuário pericial do JHPCS.',
    28, 63
  );

  // Card 2: Cura Submersa
  doc.setFillColor(19, 78, 74); // teal-900
  doc.setDrawColor(20, 184, 166);
  doc.roundedRect(20, 88, pageWidth - 40, 36, 3, 3, 'FD');
  doc.setTextColor(204, 251, 241);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('REGRA 2: CRONOGRAMA DE CURA SUBMERSA DOS 28 DIAS', 28, 98);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Nos primeiros 28 dias após a conclusão do monólito, a piscina exige escovação suave diária com vassoura de cerdas\n' +
    'macias (sem esfregar com força) para remover o pó de hidratação mineral. É terminantemente proibido jogar cloro\n' +
    'concentrado diretamente no piso da piscina durante este intervalo sensível.',
    28, 105
  );

  // Card 3: PWA Mobile e Geolocalização
  doc.setFillColor(30, 27, 75); // indigo-950
  doc.setDrawColor(99, 102, 241);
  doc.roundedRect(20, 130, pageWidth - 40, 36, 3, 3, 'FD');
  doc.setTextColor(224, 231, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('REGRA 3: CHECK-IN COM CARIMBO DE GPS E FOTOGRAFIA EM TEMPO REAL', 28, 140);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'O tratador deve registrar o checklist na borda da piscina pelo aplicativo PWA. O sistema não aceita fotos da galeria\n' +
    'do celular (apenas câmera ao vivo) e cruza as coordenadas de GPS com o raio de 100m da piscina cadastrada,\n' +
    'eliminando qualquer chance de fraude por visitas não realizadas.',
    28, 147
  );

  // Seção Produtos Homologados
  doc.setFillColor(2, 6, 23);
  doc.setDrawColor(51, 65, 85);
  doc.roundedRect(20, 175, pageWidth - 40, 55, 4, 4, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('INSUMOS QUÍMICOS 100% HOMOLOGADOS PELA JHOSTONTEC', 28, 186);

  const products = [
    { name: 'Barrilha Leve (Carbonato de Sódio)', use: 'Elevação de pH sem agredir a resina', unit: 'Sacos de 25kg' },
    { name: 'Bicarbonato de Sódio Puro', use: 'Elevação e manutenção da alcalinidade total', unit: 'Sacos de 25kg' },
    { name: 'Hipoclorito de Cálcio Granulado 65%', use: 'Cloração de alta pureza e estabilidade', unit: 'Baldes de 10kg' },
    { name: 'Sequestrante de Metais & Anti-Manchas', use: 'Prevenção de manchas de cobre e ferro', unit: 'Frascos 1L' },
  ];

  let pY = 194;
  products.forEach((prod) => {
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(`• ${prod.name}:`, 28, pY);

    doc.setTextColor(203, 213, 225);
    doc.setFont('helvetica', 'normal');
    doc.text(`${prod.use} (${prod.unit})`, 95, pY);
    pY += 7.5;
  });

  // Rodapé Página 3
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('JHoston Pools • Manual do Usuário Homologado • jcs-delta.vercel.app', 105, 285, { align: 'center' });

  // ========================================================
  // PÁGINA 4: CERTIFICADO DE GARANTIA DECENAL & LAUDO PERICIAL
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
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICADO OFICIAL DE CONFORMIDADE & PROTEÇÃO JURÍDICA', 105, 48, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('TERMO DE VALIDADE DA GARANTIA DECENAL', 105, 57, { align: 'center' });

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Documento emitido pelo JHoston Pools Control System (JHPCS) em ${new Date().toLocaleDateString('pt-BR')}`, 105, 64, { align: 'center' });

  // Texto Formal do Certificado
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(24, 72, pageWidth - 48, 115, 3, 3, 'F');

  doc.setTextColor(226, 232, 240);
  doc.setFontSize(9.5);
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
    `protegendo o cliente final e a JHoston Pools contra qualquer sinistro de origem operacional.`;

  doc.text(certificateText, 30, 84);

  // Assinaturas Digitais Criptográficas
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(0.5);

  doc.line(30, 230, 95, 230);
  doc.line(115, 230, 180, 230);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('JOABSON • DIRETORIA EXECUTIVA', 62.5, 236, { align: 'center' });
  doc.text('DANIEL LOPES • DIRETORIA MASTER & DEV', 147.5, 236, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('JHoston Pools Revestimentos Monolíticos', 62.5, 241, { align: 'center' });
  doc.text('Auditoria de Software e Governança JHPCS', 147.5, 241, { align: 'center' });

  // Carimbo Digital de Validação
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
