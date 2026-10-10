import { jsPDF } from 'jspdf';
import { JHPCS_LOGO_BASE64 } from './logo-base64';

export interface LuxuryCompendiumData {
  editionTitle?: string;
  recipientName?: string;
  targetRole?: 'MASTER' | 'DIRETORIA_JH' | 'CLIENTE_FINAL';
  dateStr?: string;
}

/**
 * Gerador de Revista de Altíssimo Padrão • Edição Única (Compêndio Oficial JHPCS)
 * 
 * Estrutura Editorial Executiva (8 Páginas A4 Premium):
 * PÁG 1: Capa de Gala • Dourado & Dark Slate • Selo de Edição Especial Colecionável
 * PÁG 2: Sumário Executivo & Carta Editorial dos Fundadores (Daniel Lopes & Patrícia Grübel)
 * PÁG 3: Roteiro Executivo de Apresentação JHoston Pools (Os 5 Personagens & Atos 1 e 2)
 * PÁG 4: Demonstração de Telemetria F1, Alertas WhatsApp e Portal do Cliente (Atos 3 e 4)
 * PÁG 5: Manual do Usuário JHoston Pools • Engenharia, Pilares de Blindagem & Regra de Ácido
 * PÁG 6: Gestão de Campo Descomplicada • O Piscineiro como Funcionário & Adesivos QR Code
 * PÁG 7: Roteiro Oficial de Testes de Estresse & Exercícios Extremos (EX-01 a EX-08)
 * PÁG 8: Certificado Soberano de Homologação Tecnológica & Matriz de Conformidade Trienal
 */
export function generateLuxuryCompendiumPdf(data: LuxuryCompendiumData = {}): jsPDF {
  const {
    editionTitle = 'COMPÊNDIO EXECUTIVO DE HOMOLOGAÇÃO & ENGENHARIA',
    recipientName = 'Diretoria Executiva JHoston Pools & Clientes VIP',
    targetRole = 'DIRETORIA_JH',
    dateStr = 'Outubro de 2026'
  } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const officialDomain = 'jcs-pools.vercel.app';

  // Helper para desenhar o cabeçalho nobre em páginas internas
  const drawPageHeader = (title: string, sectionBadge: string, pageNum: number) => {
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 20, 'F');

    // Faixa dourada no topo
    doc.setFillColor(245, 158, 11); // amber-500
    doc.rect(0, 0, pageWidth, 2.5, 'F');

    // Logo
    try {
      if (JHPCS_LOGO_BASE64) {
        doc.addImage(JHPCS_LOGO_BASE64, 'PNG', 14, 5, 18, 9);
      }
    } catch (e) {}

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(245, 158, 11);
    doc.text('JHOSTON POOLS CONTROL SYSTEM', 36, 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(title.toUpperCase(), 36, 14.5);

    // Badge da seção
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(pageWidth - 75, 5, 45, 8.5, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(56, 189, 248); // sky-400
    doc.text(sectionBadge, pageWidth - 52.5, 10.5, { align: 'center' });

    // Número da página
    doc.setFontSize(8);
    doc.setTextColor(245, 158, 11);
    doc.text(String(pageNum).padStart(2, '0'), pageWidth - 16, 11, { align: 'right' });
  };

  // Helper para rodapé das páginas internas
  const drawPageFooter = (pageNum: number) => {
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.4);
    doc.line(14, pageHeight - 12, pageWidth - 14, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text('JHPCS Luxury Edition • Engenharia de Revestimentos Monolíticos • Blindagem Trienal Homologada • Plano Ativo 3 Anos', 14, pageHeight - 7);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11);
    doc.text(officialDomain, pageWidth - 14, pageHeight - 7, { align: 'right' });
  };

  // ========================================================
  // PÁGINA 1: CAPA DE GALA (EDIÇÃO ÚNICA COLECIONÁVEL)
  // ========================================================
  doc.setFillColor(2, 6, 23); // Slate-950
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Moldura dourada externa ultrafina
  doc.setDrawColor(217, 119, 6); // amber-600
  doc.setLineWidth(0.8);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16, 'S');

  doc.setDrawColor(245, 158, 11); // amber-500
  doc.setLineWidth(0.3);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');

  // Topo: Badge de Edição Única
  doc.setFillColor(180, 83, 9); // amber-700
  doc.roundedRect(pageWidth / 2 - 40, 18, 80, 8.5, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('EDIÇÃO ÚNICA • COMPÊNDIO OFICIAL', pageWidth / 2, 23.5, { align: 'center' });

  // Logo Oficial no Centro do Cabeçalho
  let curY = 38;
  try {
    if (JHPCS_LOGO_BASE64) {
      doc.addImage(JHPCS_LOGO_BASE64, 'PNG', pageWidth / 2 - 24, curY, 48, 24);
      curY += 30;
    }
  } catch (e) {
    curY += 15;
  }

  // Título e Subtítulo Nobres
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text('JHOSTON POOLS', pageWidth / 2, curY, { align: 'center' });

  curY += 8;
  doc.setFontSize(14);
  doc.setTextColor(245, 158, 11); // amber-500
  doc.text('CONTROL SYSTEM • JHPCS', pageWidth / 2, curY, { align: 'center' });

  curY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text('A REVOLUÇÃO DA GARANTIA INTELIGENTE & DIGITAL TWIN DE REVESTIMENTOS MONOLÍTICOS', pageWidth / 2, curY, { align: 'center' });

  // Bloco Central: O que este compêndio une
  curY += 14;
  doc.setFillColor(15, 23, 42); // slate-900
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.roundedRect(18, curY, pageWidth - 36, 86, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(245, 158, 11);
  doc.text('CONTEÚDO INTEGRAL UNIFICADO NESTA EDIÇÃO:', 26, curY + 11);

  const pillars = [
    { title: 'ROTEIRO EXECUTIVO DE APRESENTAÇÃO', desc: 'Os 5 personagens estratégicos, demonstração ao vivo para a Diretoria (Joabson) e argumentos comerciais de fechamento.' },
    { title: 'MANUAL DO USUÁRIO JHOSTON POOLS', desc: 'Diretrizes de Engenharia, Regra Pétrea contra Ácidos, Cockpit Telemetria F1 e Proteção da Garantia Trienal Ativa (3 Anos).' },
    { title: 'ROTEIRO DE TESTES DE ESTRESSE (EX-01 A EX-08)', desc: 'Exercícios práticos de ataque ácido, travamento offline 72h, disparos via Evolution API e validação pericial.' },
    { title: 'GESTÃO DO TRATADOR & ETIQUETAS QR CODE', desc: 'Isolamento de tenant (o tratador é funcionário do cliente final) e adesivos impressos para a casa de máquinas.' },
  ];

  let pillarY = curY + 21;
  pillars.forEach((p, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(56, 189, 248);
    doc.text(`[0${idx + 1}] ${p.title}`, 26, pillarY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(203, 213, 225);
    const splitDesc = doc.splitTextToSize(p.desc, pageWidth - 56);
    doc.text(splitDesc, 26, pillarY + 4);
    pillarY += 15;
  });

  // Caixa de Expediente e Dedicatória
  curY += 94;
  doc.setFillColor(11, 15, 25);
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.roundedRect(18, curY, pageWidth - 36, 26, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(245, 158, 11);
  doc.text('HOMOLOGAÇÃO SUPREMA & EXPEDIENTE EDITORIAL:', 24, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(226, 232, 240);
  doc.text('Fundadores & Gestores Tecnológicos: Daniel Lopes & Patrícia Grübel', 24, curY + 13);
  doc.text(`Dedicado a: ${recipientName} • ${dateStr}`, 24, curY + 19);

  // Rodapé da Capa
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Edição Especial de Altíssimo Padrão • Impresso Oficial do Ecossistema JHPCS', pageWidth / 2, pageHeight - 16, { align: 'center' });
  doc.setTextColor(56, 189, 248);
  doc.text(officialDomain, pageWidth / 2, pageHeight - 12, { align: 'center' });

  // ========================================================
  // PÁGINA 2: SUMÁRIO & CARTA EDITORIAL DOS FUNDADORES
  // ========================================================
  doc.addPage();
  doc.setFillColor(2, 6, 23);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawPageHeader('SUMÁRIO EXECUTIVO & EDITORIAL', 'INTRODUÇÃO', 2);

  curY = 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('A Blindagem Científica da Engenharia Mineral', 16, curY);

  curY += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(245, 158, 11);
  doc.text('Carta Aberta de Daniel Lopes & Patrícia Grübel à Diretoria da JHoston Pools', 16, curY);

  curY += 8;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(16, curY, pageWidth - 32, 90, 3, 3, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240);
  const editorialText = 
    `"Prezada Diretoria e Parceiros da JHoston Pools,\n\n` +
    `Durante anos, o maior pesadelo dos aplicadores de revestimentos monolíticos e piscinas de areia foi o pós-obra. Após investir meses em projetos arquitetônicos impecáveis e acabamento mineral de padrão internacional, as obras ficavam à mercê de tratadores desqualificados, chuvas torrenciais e produtos químicos clandestinos como ácido muriático e limpa pedras.\n\n` +
    `Quando surgiam manchas ou delaminação provocadas por pura imperícia, a culpa recaía injustamente sobre a JHoston Pools, gerando custos de garantias indevidas e desgaste de marca.\n\n` +
    `O JHPCS (JHoston Pools Control System) nasceu para colocar um ponto final definitivo nessa vulnerabilidade. Nós não desenvolvemos apenas um software de gestão: nós criamos uma blindagem termodinâmica, operacional e forense. Com Digital Twin em tempo real, inteligência de geolocalização e automação via WhatsApp em menos de 3.2 segundos, transformamos o cumprimento da garantia em um ativo incontestável perante o Código Civil.\n\n` +
    `Este Compêndio reúne tudo o que a liderança precisa para apresentar, auditar, estressar e proteger cada metro quadrado de piscina construído sob a bandeira JHoston Pools."\n\n` +
    `— Daniel Lopes & Patrícia Grübel (Fundadores & Gestores MASTER JHPCS)`;

  const splitEditorial = doc.splitTextToSize(editorialText, pageWidth - 44);
  doc.text(splitEditorial, 22, curY + 8);

  // Bloco de Índice / Sumário
  curY += 97;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('ESTRUTURA DO COMPÊNDIO NESTA EDIÇÃO:', 16, curY);

  curY += 6;
  const indexItems = [
    { page: 'PÁG 03', title: 'ROTEIRO DE APRESENTAÇÃO EXECUTIVA (PARTE 1)', desc: 'Os 5 Personagens, Narrativa de Abertura e o Impacto Estratégico para Joabson.' },
    { page: 'PÁG 04', title: 'ROTEIRO DE APRESENTAÇÃO EXECUTIVA (PARTE 2)', desc: 'Cockpit Telemetria F1, Alertas WhatsApp em <3.2s e o Portal do Cliente.' },
    { page: 'PÁG 05', title: 'MANUAL DO USUÁRIO JHOSTON POOLS', desc: 'Diretrizes Técnicas, Proibição Letal de Ácidos e os 28 Dias de Cura Submersa.' },
    { page: 'PÁG 06', title: 'GESTÃO DO PISCINEIRO & ETIQUETAS QR CODE', desc: 'Isolamento de Tenants e Adesivos Oficiais Impressos para a Casa de Máquinas.' },
    { page: 'PÁG 07', title: 'ROTEIRO DE TESTES DE ESTRESSE & EXERCÍCIOS', desc: 'Bateria EX-01 a EX-08: Red Zones, Ataques Ácidos, Blecaute Offline e SLA.' },
    { page: 'PÁG 08', title: 'CERTIFICADO DE HOMOLOGAÇÃO & TERMO TRIENAL', desc: 'Validação Criptográfica SHA-256 e Blindagem Jurídica do Acervo.' },
  ];

  indexItems.forEach((item) => {
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(16, curY, pageWidth - 32, 11, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(245, 158, 11);
    doc.text(item.page, 22, curY + 7);

    doc.setTextColor(255, 255, 255);
    doc.text(item.title, 42, curY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(148, 163, 184);
    doc.text(item.desc, 115, curY + 7);

    curY += 13.5;
  });

  drawPageFooter(2);

  // ========================================================
  // PÁGINA 3: ROTEIRO DE APRESENTAÇÃO EXECUTIVA (PARTE 1)
  // ========================================================
  doc.addPage();
  doc.setFillColor(2, 6, 23);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawPageHeader('ROTEIRO EXECUTIVO DE APRESENTAÇÃO', 'COMERCIAL & HOMOLOGAÇÃO', 3);

  curY = 28;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('O Pitch Comercial: Como Convencer e Proteger a Diretoria', 16, curY);

  curY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(245, 158, 11);
  doc.text('Apresentação estruturada para Joabson e Equipe Comercial da JHoston Pools', 16, curY);

  // Tabela dos 5 Personagens
  curY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('OS 5 PERSONAGENS CHAVE DA APRESENTAÇÃO:', 16, curY);

  curY += 4;
  const characters = [
    { role: '1. Daniel & Patrícia (MASTER)', goal: 'Donos da Tecnologia: Controle total, governança soberana, cockpit forense inviolável e blindagem multi-tenant.' },
    { role: '2. Joabson (Diretoria JH)', goal: 'Diretor Comercial: Visão macro da carteira, relatórios executivos no WhatsApp, proteção da marca e receita recorrente.' },
    { role: '3. Carlos Oliveira (Engenharia)', goal: 'Responsável Técnico: Prontuário químico das piscinas, LSI (Langelier), Red Zones e fiscalização dos 28 dias de cura.' },
    { role: '4. Gerente do Resort / Cliente', goal: 'Proprietário do Ativo: Certificado de garantia digital, Digital Twin, emissão de etiquetas QR e supervisão do seu tratador.' },
    { role: '5. João Tratador (Piscineiro)', goal: 'Funcionário de Campo: App simples no celular instalado por QR Code na casa de máquinas, sem senhas longas, 100% offline.' },
  ];

  characters.forEach(c => {
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(16, curY, pageWidth - 32, 13, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(245, 158, 11);
    doc.text(c.role, 20, curY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(203, 213, 225);
    const splitGoal = doc.splitTextToSize(c.goal, pageWidth - 40);
    doc.text(splitGoal, 20, curY + 9.5);

    curY += 15.5;
  });

  // ATO 1 & ATO 2
  curY += 4;
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.5);
  doc.roundedRect(16, curY, pageWidth - 32, 70, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(245, 158, 11);
  doc.text('ATO 1: O IMPACTO ESTRATÉGICO PARA A DIRETORIA', 22, curY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(226, 232, 240);
  const ato1 = 
    `Narrativa de Abertura: "Joabson, quando um revestimento monolítico apresenta corrosão aos 8 meses, o cliente culpa a aplicação da JHoston Pools. Como provar que o piscineiro dele jogou ácido ou deixou o pH em 6.2 sem escovar o monólito durante a cura submersa de 28 dias? O JHPCS é o escudo técnico e jurídico da JHoston Pools."\n\n` +
    `• Acesso Blindado: Autenticação com políticas de senhas fortes e perfil soberano MASTER.\n` +
    `• 4 Cards Executivos de Comando: Ativos Monitorados, Red Zones Críticas, Obras em Período de Cura e SLA WhatsApp Evolution (< 3.2 seg).\n` +
    `• Mapa Global Georreferenciado: Pins coloridos (Verde = Seguro, Vermelho = Crítico) com abertura imediata do Prontuário Médico da piscina e cálculo contínuo de LSI (Langelier Saturation Index).`;
  doc.text(doc.splitTextToSize(ato1, pageWidth - 44), 22, curY + 15);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(56, 189, 248);
  doc.text('ATO 2: AGILIDADE OPERACIONAL — WHATSAPP EVOLUTION API', 22, curY + 44);

  const ato2 = 
    `"A Diretoria não tem tempo de navegar em menus complexos. O JHPCS envia laudos e certificados no WhatsApp com 1 toque."\n` +
    `Demonstração: Selecionar o Diretor Joabson na agenda corporativa, clicar em "Disparar Relatório no WhatsApp" e mostrar a notificação real chegando no smartphone em menos de 3.2 segundos via Evolution API oficial.`;
  doc.setFont('helvetica', 'normal');
  doc.text(doc.splitTextToSize(ato2, pageWidth - 44), 22, curY + 51);

  drawPageFooter(3);

  // ========================================================
  // PÁGINA 4: ROTEIRO DE APRESENTAÇÃO (PARTE 2: F1 & CLIENTE)
  // ========================================================
  doc.addPage();
  doc.setFillColor(2, 6, 23);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawPageHeader('TELEMETRIA F1 & PORTAL DO CLIENTE', 'DEMONSTRAÇÃO AO VIVO', 4);

  curY = 27;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('O "Pit Wall" da Piscina: Telemetria Contínua & Experiência VIP', 16, curY);

  curY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(56, 189, 248);
  doc.text('Do monitoramento termodinâmico à fidelização e venda recorrente de insumos homologados', 16, curY);

  // Bloco Cockpit F1
  curY += 6.5;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(16, curY, pageWidth - 32, 58, 2.5, 2.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(245, 158, 11);
  doc.text('COCKPIT DE TELEMETRIA F1 ("PIT WALL") NOVO MÓDULO', 22, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(226, 232, 240);
  const f1Text = 
    `Ao navegar na aba "Clientes & Telemetria F1", a Diretoria acessa medidores no estilo cockpit esportivo de alta precisão:\n\n` +
    `• Tacômetros Digitais de Precisão: Visualização instantânea de pH (7.2 a 7.6), Cloro Livre (1.5 a 3.0 ppm), Alcalinidade Total (80 a 120 ppm), Termometria e Dureza Cálcica.\n` +
    `• Medidor Dinâmico de LSI (Langelier): Dial analógico colorido identificando tendências corrosivas (< -0.3) ou incrustantes (> +0.3).\n` +
    `• Séries Históricas em Gráfico: Curvas de estabilidade com target bands seguras dos últimos 7 e 14 dias com correlação meteorológica via OpenWeather.\n` +
    `• Pit Stop Químico: Prescrição estequiométrica exata de dosagem para reequilíbrio sem produtos abrasivos.`;
  doc.text(doc.splitTextToSize(f1Text, pageWidth - 44), 22, curY + 13.5);

  // ATO 3 & ATO 4: PORTAL DO CLIENTE
  curY += 63;
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(0.5);
  doc.roundedRect(16, curY, pageWidth - 32, 60, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(56, 189, 248);
  doc.text('ATO 3: O PORTAL DO PROPRIETÁRIO & GERENTE GERAL', 22, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(226, 232, 240);
  const portalCli = 
    `"O cliente da JHoston Pools (seja um Hotel, Resort ou Residencial de Luxo) sente que contratou uma empresa de engenharia de ponta, não um simples prestador de serviços."\n\n` +
    `• Contador de Cura Submersa (28 Dias): Barra de progresso visual mostrando o dia exato do ciclo e bloqueando cloração de choque.\n` +
    `• Satélite Meteorológico Live: Alerta com dias de antecedência sobre chuvas ácidas e recomenda elevação preventiva de pH.\n` +
    `• Estoque Preditivo de Produtos (Runway): Tabela informando dias restantes de estoque de Cloro e Bicarbonato, com botão para compra direta homologada gerando receita contínua à JHoston Pools.\n` +
    `• Laudo Técnico Mensal em PDF: Emissão instantânea do relatório com selo oficial de conformidade para seguro e vigilância.`;
  doc.text(doc.splitTextToSize(portalCli, pageWidth - 44), 22, curY + 13.5);

  // Argumento de Fechamento Comercial & Assinatura Recorrente
  curY += 63;
  doc.setFillColor(15, 23, 42); // slate-900
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.roundedRect(16, curY, pageWidth - 32, 28, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(245, 158, 11);
  doc.text('[ ASSINATURA VIP ] 6 MESES INCLUSOS + EXTENSÃO TÉCNICA AUDITADA', 22, curY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.4);
  doc.setTextColor(226, 232, 240);
  const argComercialText = 
    `• Degustação VIP (6 Meses): Relatórios semanais/quinzenais inclusos com avisos aos 30 e 15 dias do término.\n` +
    `• Extensão Técnica (Até +3 Meses): Requer justificativa técnica da equipe e aprovação mandatória da Diretoria (Joabson).\n` +
    `• Pós-Degustação: Standard (Incluso 1x/mês) | Pro Executive (R$ 29,90/mês quinzenal) | Black Elite (R$ 49,90/mês semanal F1).\n` +
    `• Condição Financeira: Pagamento antecipado até o dia 05 do mês corrente para liberação dos despachos frequentes.`;
  doc.text(doc.splitTextToSize(argComercialText, pageWidth - 44), 22, curY + 10);

  drawPageFooter(4);

  // ========================================================
  // PÁGINA 5: MANUAL DO USUÁRIO JHOSTON POOLS
  // ========================================================
  doc.addPage();
  doc.setFillColor(2, 6, 23);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawPageHeader('MANUAL DO USUÁRIO JHOSTON POOLS', 'ENGENHARIA & REGRAS TÉCNICAS', 5);

  curY = 27;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('Diretrizes de Engenharia Mineral & Regras Inegociáveis', 16, curY);

  curY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(245, 158, 11);
  doc.text('Protocolos normativos que regem o Plano de Manutenção Ativo e a garantia de revestimentos monolíticos', 16, curY);

  // Box 1: A Regra Letal de Ácido
  curY += 6.5;
  doc.setFillColor(69, 10, 10); // red-950
  doc.setDrawColor(239, 68, 68); // red-500
  doc.setLineWidth(0.6);
  doc.roundedRect(16, curY, pageWidth - 32, 43, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(248, 113, 113);
  doc.text('[ REGRA PÉTREA ] PROIBIÇÃO ABSOLUTA DE ÁCIDOS CORROSIVOS', 22, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(254, 202, 202);
  const acidRule = 
    `Revestimentos cimentícios monolíticos e agregados de quartzo/areia possuem matriz mineral sensível ao ataque ácido.\n` +
    `• O uso de Ácido Muriático (Clorídrico), Limpa Pedras ou desincrustantes agressivos provoca dissolução da pasta de cimento e exposição prematura dos agregados.\n` +
    `• REGRA PÉTREA JHPCS: Se qualquer laudo, foto ou checklist acusar o uso de produtos não homologados ou pH < 6.8 persistente, o sistema altera compulsoriamente o status do ativo para WARRANTY_SUSPENDED (Garantia Suspensa), gerando notificação pericial e blindando a JHoston Pools.`;
  doc.text(doc.splitTextToSize(acidRule, pageWidth - 44), 22, curY + 12.5);

  // Box 2: Cura Submersa dos 28 Dias
  curY += 47.5;
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.5);
  doc.roundedRect(16, curY, pageWidth - 32, 41, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(245, 158, 11);
  doc.text('[ PROTOCOLO CRÍTICO ] 28 DIAS DE CURA SUBMERSA', 22, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(226, 232, 240);
  const cureRule = 
    `Piscinas recém-aplicadas passam por regime crítico de 7 dias de cura a seco e 28 dias de cura submersa contínua:\n` +
    `• Escovação Diária Obrigatória: Remove poeira de carbonatação e evita incrustações precoces.\n` +
    `• Bloqueio de Cloração de Choque: A dosagem de choque de cloro no primeiro mês causa descoloração superficial irreversível.\n` +
    `• Proibição de Carrinhos Metálicos: Aspiradores com rodízios de metal são terminantemente proibidos na fase de polimerização inicial.`;
  doc.text(doc.splitTextToSize(cureRule, pageWidth - 44), 22, curY + 12.5);

  // Box 3: O Novo Plano de Manutenção Ativo (3 Anos de Cuidado Proativo)
  curY += 45.5;
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.roundedRect(16, curY, pageWidth - 32, 60, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(245, 158, 11);
  doc.text('[ PLANO DE MANUTENÇÃO ATIVO ] A REVOLUÇÃO NO PÓS-VENDA E GARANTIA', 22, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(226, 232, 240);
  const activePlanPdfText = 
    `Substituímos termos de garantia passivos pelo acompanhamento direto de 3 anos para longevidade impecável do revestimento:\n\n` +
    `• 1. Monitoramento Remoto Semanal (Sem Mensalidade): Contato direto com o tratador/caseiro para auditar pH e Cloro.\n` +
    `• 2. Intervenção Anual Preventiva (Ano 1 e 2): Equipe especializada no local para esvaziamento, lavagem técnica e aplicação de resina protetora preventiva. MÃO DE OBRA 100% ISENTA! Cliente arca apenas com deslocamento e resina.\n` +
    `• 3. Manutenção Pesada & Revitalização (Ano 3): Lavagem química intensiva de alta pressão e camada final de proteção. Isenção total de mão de obra mantida. Ao término do ciclo legal de 3 anos, o cliente pode optar pela renovação do plano.`;
  doc.text(doc.splitTextToSize(activePlanPdfText, pageWidth - 44), 22, curY + 13);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(56, 189, 248);
  doc.text('"Sua única preocupação será aproveitar o espaço de lazer. A responsabilidade técnica e o cuidado contínuo são nossos."', 22, curY + 54);

  drawPageFooter(5);

  // ========================================================
  // PÁGINA 6: GESTÃO DO PISCINEIRO & ETIQUETAS QR CODE
  // ========================================================
  doc.addPage();
  doc.setFillColor(2, 6, 23);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawPageHeader('OPERAÇÃO DE CAMPO & ETIQUETAS QR', 'ISOLAMENTO DE TENANTS', 6);

  curY = 27;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('O Piscineiro como Funcionário do Cliente & Adesivo na Casa de Máquinas', 16, curY);

  curY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(56, 189, 248);
  doc.text('Adoção de campo sem resistência tecnológica: aponte a câmera e opere em 2 minutos', 16, curY);

  // Box 1: Diretriz de Isolamento
  curY += 6.5;
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.5);
  doc.roundedRect(16, curY, pageWidth - 32, 47, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(245, 158, 11);
  doc.text('[ DIRETRIZ DE ISOLAMENTO ] O PISCINEIRO É FUNCIONÁRIO DO CLIENTE', 22, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(226, 232, 240);
  const tenantText = 
    `O piscineiro é contratado diretamente pelo cliente final (hotel, condomínio ou residência):\n\n` +
    `• Escopo Estrito de Visualização: O tratador visualiza e opera exclusivamente as piscinas do seu contratante. Nenhum dado, foto ou estoque de outros estabelecimentos é trafegado para o aparelho celular do tratador.\n` +
    `• Trava de Submissão no Backend: O endpoint /api/maintenance/submit valida o vínculo em pool_maintainers. Qualquer tentativa forjada de registrar laudos em tanques alheios é bloqueada com 403 Forbidden.\n` +
    `• Acesso Rápido Sem Senhas Longas: O tratador acessa apenas com seu CPF e um PIN numérico de 4 dígitos.`;
  doc.text(doc.splitTextToSize(tenantText, pageWidth - 44), 22, curY + 13);

  // Box 2: A Nova Aba "Etiqueta Casa de Máquinas (QR)"
  curY += 51.5;
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(0.5);
  doc.roundedRect(16, curY, pageWidth - 32, 53, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(56, 189, 248);
  doc.text('[ NOVA FERRAMENTA ] A NOVA ABA "ETIQUETA CASA DE MÁQUINAS (QR)"', 22, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(226, 232, 240);
  const qrHubText = 
    `Disponível no painel do cliente final e da diretoria para erradicar a necessidade de digitação de URLs:\n\n` +
    `1. Impressão da Placa em PDF: O sistema formata a etiqueta em padrão técnico ABNT com QR Code em alta definição pronto para impressão em adesivo vinílico impermeável.\n` +
    `2. Fixação no Filtro: A placa é colada na tampa do filtro ou porta da casa de máquinas.\n` +
    `3. 1 Toque com a Câmera: O tratador aponta a câmera do celular para o adesivo e o app é instalado na hora!\n` +
    `4. Disparo WhatsApp Alternativo: Permite enviar o link mágico de ativação diretamente para o WhatsApp do tratador via Evolution API.`;
  doc.text(doc.splitTextToSize(qrHubText, pageWidth - 44), 22, curY + 13);

  // Box 3: Resiliência Offline
  curY += 57.5;
  doc.setFillColor(8, 47, 73);
  doc.roundedRect(16, curY, pageWidth - 32, 34, 2.5, 2.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(56, 189, 248);
  doc.text('[ RESILIÊNCIA OFFLINE-FIRST ] OPERAÇÃO (72 HORAS DE RESILIÊNCIA EM SUBSOLOS):', 22, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(241, 245, 249);
  const offText = 
    `Em casas de máquinas subterrâneas ou áreas rurais sem sinal de celular, o aplicativo salva todas as fotos (comprimidas em WebP nativo) e medições no banco local IndexedDB do celular.\n` +
    `Ao retornar para uma área com Wi-Fi ou 4G, a sincronização é disparada automaticamente com integridade criptográfica.`;
  doc.text(doc.splitTextToSize(offText, pageWidth - 44), 22, curY + 13);

  drawPageFooter(6);

  // ========================================================
  // PÁGINA 7: ROTEIRO OFICIAL DE TESTES DE ESTRESSE
  // ========================================================
  doc.addPage();
  doc.setFillColor(2, 6, 23);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawPageHeader('ROTEIRO DE TESTES DE ESTRESSE', 'RESILIÊNCIA & AUDITORIA EXTREMA', 7);

  curY = 28;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Bateria de Testes Extremos: A Prova de Falhas do Sistema', 16, curY);

  curY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(245, 158, 11);
  doc.text('Exercícios práticos de validação contra fraudes, ataques químicos e blecautes de rede', 16, curY);

  curY += 8;
  const stressTests = [
    { id: 'EX-01', title: 'Ataque Ácido Imediato (pH 6.2)', desc: 'Simula tratador descuidado ou chuva torrencial. Indicador vira vermelho pulsante, entra em Red Zone na fila de triagem e dispara WhatsApp de emergência para a diretoria.' },
    { id: 'EX-02', title: 'Tentativa de Uso de Ácido Proibido', desc: 'Tratador tenta marcar uso de ácido muriático ou limpa pedras no checklist. O sistema bloqueia compulsoriamente e aciona flag de perda de garantia.' },
    { id: 'EX-03', title: 'Falta de Escovação na Cura Submersa', desc: 'Tratador tenta encerrar visita sem escovação nos 28 dias de cura. Prontuário registra não conformidade e impede emissão do certificado de garantia integral.' },
    { id: 'EX-04', title: 'Blecaute de Sinal (Modo 100% Offline)', desc: 'Desligamento intencional do Wi-Fi/4G. O app exibe tarja de contingência (72h), armazena laudo e fotos no IndexedDB e sincroniza ao reconectar.' },
    { id: 'EX-05', title: 'Disparo em Massa WhatsApp (SLA < 3.2s)', desc: 'Envio consecutivo de laudos via Evolution API. Validação de fila Docker e entrega instantânea com preview de smartphone formatado.' },
    { id: 'EX-06', title: 'Troca Obrigatória de Senha Provisória', desc: 'Tentativa de login com senha 123456. Sistema impõe bloqueio exigindo senha forte de 8 dígitos com letras maiúsculas, números e caractere especial.' },
    { id: 'EX-07', title: 'Cockpit Telemetria F1 & LSI ao Vivo', desc: 'Simulação de variações térmicas e de dureza. Tacômetros respondem em tempo real e mostrador LSI aponta riscos de incrustação ou corrosão.' },
    { id: 'EX-08', title: 'Isolamento de Segurança Multi-Tenant', desc: 'Simulação de acesso do tratador às piscinas de outro condomínio concorrente. O sistema bloqueia a consulta no banco de dados e retorna 403 Forbidden.' },
  ];

  stressTests.forEach(test => {
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(16, curY, pageWidth - 32, 17.5, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(245, 158, 11);
    doc.text(test.id, 20, curY + 6);

    doc.setTextColor(255, 255, 255);
    doc.text(test.title, 34, curY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(203, 213, 225);
    const splitDesc = doc.splitTextToSize(test.desc, pageWidth - 42);
    doc.text(splitDesc, 20, curY + 11);

    curY += 20;
  });

  drawPageFooter(7);

  // ========================================================
  // PÁGINA 8: CERTIFICADO SOBERANO DE HOMOLOGAÇÃO & SELO TRIENAL
  // ========================================================
  doc.addPage();
  doc.setFillColor(2, 6, 23);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  drawPageHeader('HOMOLOGAÇÃO SOBERANA & SELO TRIENAL', 'PLANO DE MANUTENÇÃO ATIVO', 8);

  curY = 32;
  // Moldura Nobre de Certificado
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.8);
  doc.roundedRect(16, curY, pageWidth - 32, 210, 4, 4, 'FD');

  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.3);
  doc.roundedRect(18, curY + 2, pageWidth - 36, 206, 3, 3, 'S');

  // Cabeçalho do Certificado
  let certY = curY + 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('CERTIFICADO SOBERANO DE HOMOLOGAÇÃO', pageWidth / 2, certY, { align: 'center' });

  certY += 7;
  doc.setFontSize(10);
  doc.setTextColor(245, 158, 11);
  doc.text('PLATAFORMA JHPCS • PLANO DE MANUTENÇÃO ATIVO (3 ANOS)', pageWidth / 2, certY, { align: 'center' });

  certY += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(226, 232, 240);
  const certP1 = 
    `Atestamos por meio deste documento pericial oficial que a plataforma JHPCS (JHoston Pools Control System) concluiu com 100% de êxito todas as etapas de homologação para sustentar o Plano de Manutenção Ativo de 3 Anos.\n\n` +
    `O ecossistema encontra-se homologado para auditar semanalmente o tratador da piscina sem mensalidade e garantir o suporte técnico das intervenções anuais (Ano 1, 2 e 3) com isenção total de mão de obra para esvaziamento, lavagem técnica e aplicação de resina protetora.`;
  doc.text(doc.splitTextToSize(certP1, pageWidth - 48), 24, certY);

  certY += 34;
  doc.setFillColor(2, 6, 23);
  doc.roundedRect(24, certY, pageWidth - 48, 54, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(56, 189, 248);
  doc.text('MATRIZ DE CONFORMIDADE TECNOLÓGICA & OPERACIONAL:', 30, certY + 8);

  const checklist = [
    '[OK] Banco de Dados Live Supabase com Isolamento Multi-Tenant Homologado',
    '[OK] Cockpit de Telemetria F1 com Tacômetros Digitais e Cálculo Contínuo de LSI',
    '[OK] Auditoria Semanal Direta com o Tratador via WhatsApp sem Mensalidade',
    '[OK] Registro de Intervenções Anuais (Ano 1, 2 e 3) com Mão de Obra Técnica 100% Isenta',
    '[OK] Livro-Razão Forense Inviolável com Exportação CSV para Perícias e Garantia Trienal',
  ];

  let checkY = certY + 16;
  checklist.forEach(item => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(52, 211, 153); // emerald-400
    doc.text(item, 30, checkY);
    checkY += 7;
  });

  // Assinaturas Digitais dos Fundadores
  certY += 66;
  const sigW = (pageWidth - 48 - 12) / 2;

  // Assinatura 1: Daniel Lopes
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(24, certY, sigW, 30, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('DANIEL LOPES', 24 + sigW / 2, certY + 10, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(245, 158, 11);
  doc.text('Fundador & Gestor MASTER JHPCS', 24 + sigW / 2, certY + 15, { align: 'center' });
  doc.setTextColor(148, 163, 184);
  doc.text('Engenharia de Software & Governança', 24 + sigW / 2, certY + 20, { align: 'center' });
  doc.setFontSize(6);
  doc.text('HASH: JHPCS-MASTER-DANIEL-2026', 24 + sigW / 2, certY + 25, { align: 'center' });

  // Assinatura 2: Patrícia Grübel
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(24 + sigW + 12, certY, sigW, 30, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('PATRÍCIA GRÜBEL', 24 + sigW + 12 + sigW / 2, certY + 10, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(245, 158, 11);
  doc.text('Fundadora & Gestora MASTER JHPCS', 24 + sigW + 12 + sigW / 2, certY + 15, { align: 'center' });
  doc.setTextColor(148, 163, 184);
  doc.text('Compliance & Gestão Operacional', 24 + sigW + 12 + sigW / 2, certY + 20, { align: 'center' });
  doc.setFontSize(6);
  doc.text('HASH: JHPCS-MASTER-PATRICIA-2026', 24 + sigW + 12 + sigW / 2, certY + 25, { align: 'center' });

  // Hash Criptográfico Final
  certY += 34;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('REGISTRO CRIPTOGRÁFICO: SHA-256 JHPCS-SOVEREIGN-TRIENNIAL-ACTIVE-PLAN-2026', pageWidth / 2, certY, { align: 'center' });

  drawPageFooter(8);

  return doc;
}
