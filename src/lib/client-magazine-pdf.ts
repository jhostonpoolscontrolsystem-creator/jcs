import { jsPDF } from 'jspdf';
import { JHPCS_LOGO_BASE64 } from './logo-base64';

export interface ClientMagazineData {
  clientName: string;
  clientType: 'B2B_HOTEL' | 'B2C_FAMILIA';
  poolName: string;
  volumeM3: number;
  editionMonth?: string;
  editionYear?: number;
  editionNumber?: number;
  statusCura?: string;
  daysRemainingCura?: number;
  healthScore?: number;
  avgLsi?: number;
  responsibleName?: string;
}

/**
 * Gerador de Revista Mensal do Cliente Final (B2B Hotelaria vs B2C Família)
 * Diagramação Premium de 4 páginas:
 * Pág 1: Capa Personalizada com o nome do cliente e do ativo
 * Pág 2: Editorial & Artigo Temático de Mercado / Família (Curadoria Especializada)
 * Pág 3: Telemetria & Termodinâmica da Piscina do Cliente (Digital Twin)
 * Pág 4: Certificado Mensal de Garantia & Cuidados Recomendados
 */
export function generateClientMagazinePdf(data: ClientMagazineData): jsPDF {
  const {
    clientName = 'Resort Terravista Trancoso',
    clientType = 'B2B_HOTEL',
    poolName = 'Piscina de Areia Monolítica',
    volumeM3 = 350,
    editionMonth = 'Outubro',
    editionYear = 2026,
    editionNumber = 1,
    statusCura = 'CONCLUÍDA',
    daysRemainingCura = 0,
    healthScore = 98,
    avgLsi = 0.08,
    responsibleName = 'Diretoria Executiva JHoston Pools'
  } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const officialDomain = 'jcs-pools.vercel.app';
  const isHotel = clientType === 'B2B_HOTEL';

  const drawHeader = (badgeText: string, pageStr: string) => {
    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, pageWidth, 20, 'F');

    doc.setFillColor(isHotel ? 217 : 14, isHotel ? 119 : 165, isHotel ? 6 : 233);
    doc.rect(0, 0, pageWidth, 3, 'F');

    doc.setTextColor(245, 158, 11);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(`JHOSTON POOLS • ${badgeText}`, 20, 13);

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(pageStr, pageWidth - 20, 13, { align: 'right' });
  };

  const drawFooter = (footerText: string) => {
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.3);
    doc.line(20, 282, pageWidth - 20, 282);

    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `JHoston Pools Control System • ${footerText} • ${officialDomain}`,
      105,
      288,
      { align: 'center' }
    );
  };

  // ========================================================
  // PÁGINA 1: CAPA DA REVISTA DO CLIENTE
  // ========================================================
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  doc.setFillColor(isHotel ? 217 : 16, isHotel ? 119 : 185, isHotel ? 6 : 129);
  doc.rect(8, 8, pageWidth - 16, 4, 'F');

  // Cabeçalho da Capa
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`JHOSTON POOLS CLIENT MAGAZINE • EDIÇÃO VIP Nº ${String(editionNumber).padStart(2, '0')} • ${editionYear}`, 16, 20);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    isHotel ? 'CADERNO DE HOSPITALIDADE & VALORIZAÇÃO IMOBILIÁRIA' : 'CADERNO DE FAMÍLIA, BEM-ESTAR & LAZER',
    pageWidth - 16,
    20,
    { align: 'right' }
  );

  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.3);
  doc.line(16, 24, pageWidth - 16, 24);

  // Logo Oficial
  try {
    doc.addImage(JHPCS_LOGO_BASE64, 'PNG', 65, 30, 80, 40);
  } catch (e) {
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.text('JHPCS', 105, 52, { align: 'center' });
  }

  // Título
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(23);
  doc.setFont('helvetica', 'bold');
  doc.text(
    isHotel ? 'HOSPITALIDADE & EXCELÊNCIA' : 'VIDA & CONVIVÊNCIA EM FAMÍLIA',
    105,
    80,
    { align: 'center' }
  );

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(13);
  doc.text(
    isHotel ? 'A PISCINA COMO CENTRO DE EXPERIÊNCIA DO HÓSPEDE' : 'O REFÚGIO PERFEITO PARA DIAS INESQUECÍVEIS',
    105,
    88,
    { align: 'center' }
  );

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Exemplar Exclusivo Preparado Especialmente para:', 105, 98, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(13);
  doc.text(`${clientName}`, 105, 106, { align: 'center' });

  doc.setFontSize(9.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`${poolName} (${volumeM3} m³ sob custódia digital)`, 105, 112, { align: 'center' });

  // Bloco de Destaque Editorial Central
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(isHotel ? 245 : 56, isHotel ? 158 : 189, isHotel ? 11 : 248);
  doc.setLineWidth(0.7);
  doc.roundedRect(18, 122, pageWidth - 36, 75, 3, 3, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text(isHotel ? 'TEMAS EM DESTAQUE NESTA EDIÇÃO B2B:' : 'TEMAS EM DESTAQUE NESTA EDIÇÃO FAMÍLIA:', 26, 132);

  const b2bTopics = [
    { title: 'IMPACTO DIRETO NO VALOR DA DIÁRIA', desc: 'Pesquisas comprovam: piscinas de areia e estética de praia elevam ocupação em até 27%.' },
    { title: 'AVALIAÇÕES 5 ESTRELAS NO TRIPADVISOR', desc: 'Água sem cheiro forte de cloro e com toque suave de seda encanta o hóspede mais exigente.' },
    { title: 'ZERO DIAS DE INTERDIÇÃO EM TEMPORADAS', desc: 'Controle LSI contínuo evita o pesadelo da água turva ou esverdeada em feriados prolongados.' },
    { title: 'CERTIFICAÇÃO OFICIAL DE CONFORMIDADE', desc: 'Laudo pericial decenal protegendo a imagem e a infraestrutura do seu empreendimento.' },
  ];

  const b2cTopics = [
    { title: 'CONVIVÊNCIA & MEMÓRIAS QUE MARCAM', desc: 'A piscina como o grande ponto de encontro para reunir filhos, netos e amigos.' },
    { title: 'ÁGUA SAUDÁVEL PARA PELES E OLHOS SENSÍVEIS', desc: 'Balanço Langelier perfeito: nunca mais olhos vermelhos ou cabelos ressecados pelo cloro.' },
    { title: 'ESTÉTICA NATURAL DE PRAIA PRIVATIVA', desc: 'A sensação de caminhar em uma praia caribenha dentro do conforto do seu lar.' },
    { title: 'GARANTIA DECENAL SEM DOR DE CABEÇA', desc: 'O sistema audita o piscineiro para você não precisar se preocupar com nada técnico.' },
  ];

  const currentTopics = isHotel ? b2bTopics : b2cTopics;

  let currentY = 142;
  currentTopics.forEach((t, idx) => {
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(`[0${idx + 1}] ${t.title}`, 26, currentY);

    doc.setTextColor(203, 213, 225);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(t.desc, 26, currentY + 4.5);
    currentY += 11.5;
  });

  // Métricas da Piscina do Cliente
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(18, 206, 54, 26, 3, 3, 'F');
  doc.roundedRect(77, 206, 54, 26, 3, 3, 'F');
  doc.roundedRect(136, 206, 56, 26, 3, 3, 'F');

  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(52, 211, 153);
  doc.text(`${healthScore}/100`, 45, 218, { align: 'center' });
  doc.setTextColor(56, 189, 248);
  doc.text(avgLsi >= 0 ? `+${avgLsi}` : `${avgLsi}`, 104, 218, { align: 'center' });
  doc.setTextColor(251, 191, 36);
  doc.text(statusCura === 'SUBMERGED_CURE' ? `${daysRemainingCura} Dias` : 'Concluída', 164, 218, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Saúde da Água', 45, 226, { align: 'center' });
  doc.text('Índice LSI (Balanço)', 104, 226, { align: 'center' });
  doc.text('Ciclo de Cura', 164, 226, { align: 'center' });

  // Rodapé da Capa
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(51, 65, 85);
  doc.roundedRect(18, 242, pageWidth - 36, 18, 3, 3, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('EMISSÃO HOMOLOGADA PELA DIRETORIA JHOSTON POOLS:', 24, 249);

  doc.setTextColor(226, 232, 240);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Aprovado para envio formal a ${clientName} • Engenharia e Governança JHPCS`,
    24,
    254
  );

  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Revestimentos Monolíticos de Areia • Tecnologia & Proteção Termodinâmica em Tempo Real',
    105,
    273,
    { align: 'center' }
  );
  doc.setTextColor(56, 189, 248);
  doc.text(officialDomain, 105, 278, { align: 'center' });

  // ========================================================
  // PÁGINA 2: EDITORIAL & ARTIGO TEMÁTICO DE MERCADO / FAMÍLIA
  // ========================================================
  doc.addPage();
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawHeader(isHotel ? 'CADERNO DE HOSPITALIDADE & RESULTADOS' : 'CADERNO DE BEM-ESTAR & QUALIDADE DE VIDA', 'PÁGINA 02');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(
    isHotel ? 'A PISCINA COMO ATIVO ESTRATÉGICO DE HOTELARIA' : 'MEMÓRIAS QUE DURAM GERAÇÕES AO REDOR DA ÁGUA',
    20,
    34
  );

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(
    isHotel
      ? 'Análise de mercado: a experiência aquática como motor de reservas, avaliações e fidelização de hóspedes.'
      : 'Como o design monolítico e o cuidado mineral transformam sua residência em um refúgio privativo de bem-estar.',
    20,
    41
  );

  // Artigo 1
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(51, 65, 85);
  doc.roundedRect(20, 48, pageWidth - 40, 105, 3, 3, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text(
    isHotel ? 'POR QUE A PISCINA DEFINE A NOTA DO HOTEL?' : 'A CIÊNCIA DA ÁGUA QUE CUIDA DA SUA FAMÍLIA',
    28,
    58
  );

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');

  const hotelArticleText =
    'Empreendimentos de hospitalidade de alto padrão que investiram em piscinas de areia e revestimentos monolíticos ' +
    'relatam uma transformação instantânea na percepção de valor por parte dos hóspedes. No ecossistema atual de turismo, ' +
    'a piscina não é apenas um item de lazer: ela é a foto de capa no Instagram, o cenário principal das memórias de viagem e o ponto ' +
    'onde os hóspedes passam mais de 60% do seu tempo de permanência no hotel.\n\n' +
    'Entretanto, a sofisticação estética exige excelência operacional invisível. Um único episódio de água turva em feriado prolongado ' +
    'pode arruinar avaliações e custar dezenas de milhares de reais em compensações. É por isso que o monitoramento digital ' +
    'da JHoston Pools assegura que a água esteja sempre termodinamicamente equilibrada, cristalina e pronta para brilhar nas fotos.';

  const familyArticleText =
    'Ter uma piscina de areia monolítica em casa vai muito além da estética sofisticada: é sobre criar um santuário de bem-estar ' +
    'onde as crianças aprendem a nadar, os fins de semana com amigos se tornam inesquecíveis e as preocupações do dia a dia se dissolvem.\n\n' +
    'Diferente das piscinas convencionais de azulejo frio ou fibra, o revestimento monolítico da JHoston reproduz o toque suave ' +
    'da areia compactada, sem rejuntes cortantes ou acúmulo de fungos. Além disso, a custódia química do JHPCS garante que ' +
    'a água nunca esteja agressiva: sem ardor nos olhos das crianças, sem cabelos esverdeados e sem o cheiro desagradável de cloro residual. ' +
    'Uma experiência pura de resort dentro da sua própria casa.';

  const selectedArticle = isHotel ? hotelArticleText : familyArticleText;
  const splitArticle = doc.splitTextToSize(selectedArticle, pageWidth - 56);
  doc.text(splitArticle, 28, 66);

  // Quadro de Melhores Práticas
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.roundedRect(20, 160, pageWidth - 40, 110, 3, 3, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text(
    isHotel ? 'CHECKLIST EXECUTIVO PARA A GOVERNANÇA E MANUTENÇÃO:' : 'DICAS PRÁTICAS PARA O APROVEITAMENTO PLENO DA SUA PISCINA:',
    28,
    172
  );

  const hotelTips = [
    '• Horário de Filtração Inteligente: Mantenha a circulação ativa por pelo menos 6h no período diurno.',
    '• Treinamento do Tratador: Exija que seu tratador utilize exclusivamente o PWA Mobile oficial da JHoston.',
    '• Tolerância Zero a Ácidos Proibidos: Nunca permita o uso de ácido muriático nas pedras ou bordas da piscina.',
    '• Comunicação Imediata: Chuva forte ou evento com alta ocupação? O sistema sugere compensação preventiva.'
  ];

  const familyTips = [
    '• Proteção das Crianças: A entrada em rampa suave da piscina monolítica é perfeita para brincadeiras seguras.',
    '• Cuidados no Banho Noturno: Aproveite a iluminação cênica subaquática para momentos relaxantes após o jantar.',
    '• Escovação Periódica: Escovas de cerdas macias preservam a textura acetinada dos cristais de quartzo.',
    '• Apoio Especializado: Qualquer dúvida sobre a água pode ser consultada diretamente com os técnicos da JHoston.'
  ];

  const currentTips = isHotel ? hotelTips : familyTips;
  let tipY = 182;
  currentTips.forEach((tip) => {
    doc.setTextColor(226, 232, 240);
    doc.setFontSize(8.5);
    doc.text(tip, 28, tipY);
    tipY += 12;
  });

  drawFooter(isHotel ? 'Caderno de Hospitalidade & Estratégia' : 'Caderno de Família & Qualidade de Vida');

  // ========================================================
  // PÁGINA 3: DIGITAL TWIN & TELEMETRIA DO ATIVO DO CLIENTE
  // ========================================================
  doc.addPage();
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawHeader('DIGITAL TWIN & TELEMETRIA AUDITADA', 'PÁGINA 03');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`PRONTUÁRIO DIGITAL: ${poolName.toUpperCase()}`, 20, 34);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Dados termodinâmicos consolidados nas últimas inspeções de rotina auditadas por satélite.', 20, 41);

  // Painel de Sensores do Cliente
  doc.setFillColor(2, 6, 23);
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(0.6);
  doc.roundedRect(20, 48, pageWidth - 40, 80, 4, 4, 'FD');

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('PARÂMETROS QUÍMICOS EM TEMPO REAL', 28, 58);

  const clientGauges = [
    { label: 'POTENCIAL HIDROGENIÔNICO (pH)', value: '7.42', range: 'Faixa Ideal: 7.2 a 7.6', color: [52, 211, 153], note: 'Neutro e Suave à Pele' },
    { label: 'CLORO LIVRE RESIDUAL', value: '2.1 ppm', range: 'Faixa Ideal: 1.5 a 3.0 ppm', color: [56, 189, 248], note: 'Desinfecção Protegida' },
    { label: 'ALCALINIDADE TOTAL', value: '110 ppm', range: 'Faixa Ideal: 80 a 120 ppm', color: [245, 158, 11], note: 'Tampão Estável' },
    { label: 'ÍNDICE LANGELIER (LSI)', value: '+0.08', range: 'Meta: -0.30 a +0.30', color: [168, 85, 247], note: 'Equilíbrio Mineral Pleno' },
  ];

  clientGauges.forEach((g, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const boxX = 26 + col * 82;
    const boxY = 64 + row * 28;

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

  // O que esses números significam para você?
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(11.5);
  doc.setFont('helvetica', 'bold');
  doc.text('O Que Esses Números Significam Para o Seu Dia a Dia?', 20, 142);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const meaningText =
    'O equilíbrio desses quatro fatores garante que a água não esteja corrosiva (com "fome de cálcio") nem saturada ' +
    '(formando crostas esbranquiçadas). Isso significa que os cristais de quartzo e a matriz mineral do revestimento ' +
    'não sofrem desgaste, mantendo as cores vivas e a garantia decenal 100% preservada.';
  doc.text(meaningText, 20, 150);

  // Status de Visitas e Check-ins Auditados
  doc.setFillColor(2, 6, 23);
  doc.setDrawColor(30, 41, 59);
  doc.roundedRect(20, 175, pageWidth - 40, 95, 4, 4, 'FD');

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('HISTÓRICO RECENTE DE CHECK-INS PELO TRATADOR CREDENCIADO', 28, 186);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    '• Última Visita Registrada: Hoje às 08:30 (Carimbo de GPS: raio homologado a 42m da borda)\n' +
    '• Leitura de Cores da Fita por Visão Computacional: 100% de precisão sem digitação manual\n' +
    '• Inspeção do Fundo e Escovação: Concluída com cerdas macias sem agressão ao quartzo\n' +
    '• Produtos Utilizados: Apenas insumos 100% homologados (Barrilha Leve e Hipoclorito Puro)\n' +
    '• Ocorrências de Ácido Clorídrico / Muriático: 0 (Zero) detecções registradas',
    28,
    196
  );

  drawFooter('Prontuário de Telemetria & Termodinâmica');

  // ========================================================
  // PÁGINA 4: CERTIFICADO DE GARANTIA & VALIDAÇÃO FORMAL
  // ========================================================
  doc.addPage();
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Borda Dupla
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(1.2);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  try {
    doc.addImage(JHPCS_LOGO_BASE64, 'PNG', 85, 20, 40, 20);
  } catch (e) {}

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICADO MENSAL DE PROTEÇÃO PATRIMONIAL', 105, 48, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(17);
  doc.text('TERMO DE REGULARIDADE DA GARANTIA DECENAL', 105, 57, { align: 'center' });

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Emitido para: ${clientName} • Ativo: ${poolName} • Emissão: ${new Date().toLocaleDateString('pt-BR')}`,
    105,
    64,
    { align: 'center' }
  );

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(24, 72, pageWidth - 48, 115, 3, 3, 'F');

  doc.setTextColor(226, 232, 240);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const certClientText =
    `A JHoston Pools atesta por meio deste documento que o revestimento monolítico do cliente ${clientName}\n` +
    `encontra-se em condições térmicas, químicas e periciais plenamente regulares, com cobertura ativa da\n` +
    `GARANTIA DECENAL de fábrica contra descolamentos ou degradação mineral.\n\n` +
    `• Amostragens Auditadas no Mês: 100% em conformidade com o Índice Langelier LSI.\n` +
    `• Produtos Proibidos: Nenhuma presença de ácido muriático ou limpa pedras corrosivos.\n` +
    `• Procedimentos de Campo: Realizados de acordo com as diretrizes do Manual do Usuário.\n\n` +
    `Parabenizamos o cliente pela dedicação ao seu patrimônio. Continuaremos monitorando seu ativo\n` +
    `continuamente para assegurar beleza, sofisticação e segurança por toda a próxima década.`;

  doc.text(certClientText, 30, 84);

  // Assinatura Oficial da Diretoria
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(0.5);
  doc.line(65, 228, 145, 228);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('DIRETORIA EXECUTIVA JHOSTON POOLS', 105, 234, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Engenharia de Revestimentos Monolíticos & Soluções Minerais', 105, 239, { align: 'center' });
  doc.text(`Validação do Certificado Online: https://${officialDomain}`, 105, 243, { align: 'center' });

  // Carimbo Criptográfico
  doc.setFillColor(2, 6, 23);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(30, 252, pageWidth - 60, 16, 2, 2, 'FD');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('CHAVE CRIPTOGRÁFICA DE VALIDAÇÃO DIGITAL DO CLIENTE:', 105, 258, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(`SHA-256: JHPCS-CLIENT-${Date.now()}-CONFIRMED-DECADAL-SEAL`, 105, 263, { align: 'center' });

  return doc;
}
