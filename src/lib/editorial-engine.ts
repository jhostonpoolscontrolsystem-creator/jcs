/**
 * Motor de Curadoria e Temas Editoriais Mensais do JHPCS
 * Permite alternar estilos editoriais mensalmente ou sob demanda da Diretoria/Master
 */

export type EditorialStyleId = 
  | 'LUXURY_ARCHITECTURAL'  // Alta Engenharia Mineral & Luxo Imersivo (Vogue / Arch Digest)
  | 'FORENSIC_LEGAL'        // Blindagem Jurídica, Laudos Periciais & Segurança Contratual
  | 'ROI_COMMERCIAL'        // Foco em Lucratividade, Diárias de Alta Estação & Economia
  | 'SUMMER_WELLNESS'       // Bem-estar Familiar, Saúde das Crianças & Pureza Hídrica
  | 'SUSTAINABILITY_BIO';   // Bioclimatismo, Química Verde & Eficiência Ecológica

export interface EditorialTheme {
  id: EditorialStyleId;
  name: string;
  badge: string;
  tagline: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
  };
  headlinePrefix: string;
  coverDescription: string;
  b2bHeroTitle: string;
  b2bHeroSubtitle: string;
  b2bArticleTitle: string;
  b2bArticleBody: string;
  b2cHeroTitle: string;
  b2cHeroSubtitle: string;
  b2cArticleTitle: string;
  b2cArticleBody: string;
  editorialLetterQuote: string;
}

export const EDITORIAL_STYLES: Record<EditorialStyleId, EditorialTheme> = {
  LUXURY_ARCHITECTURAL: {
    id: 'LUXURY_ARCHITECTURAL',
    name: 'Alta Engenharia Mineral & Luxo Imersivo',
    badge: 'LUXO & DESIGN',
    tagline: 'O diálogo entre a geologia viva e a arquitetura sensorial contemporânea',
    palette: {
      primary: '#d97706', // amber-600
      secondary: '#06b6d4', // cyan-500
      accent: '#f59e0b', // amber-500
    },
    headlinePrefix: 'A ARTE MONOLÍTICA & A MATRIZ DE QUARTZO',
    coverDescription: 'Superfícies monolíticas de areia e quartzo nobre transformadas em santuários de arte e hospitalidade mundial.',
    b2bHeroTitle: 'A PISCINA COMO ESCULTURA PROTAGONISTA DA HOSPITALIDADE',
    b2bHeroSubtitle: 'O design biofílico como vetor de reputação internacional e diárias de alto padrão.',
    b2bArticleTitle: 'POR QUE O DESIGN SENSORIAL DEFINE A REPUTAÇÃO DO RESORT?',
    b2bArticleBody: 
      'Empreendimentos de hospitalidade ultra-luxo que elegem piscinas de areia e revestimentos monolíticos ' +
      'redefinem o ápice do design biofílico e da arquitetura sensorial. No turismo de elite mundial, ' +
      'a piscina é o elemento escultural protagonista: ela estampa capas internacionais, protagoniza memórias ' +
      'inesquecíveis e ancora onde o hóspede desfruta mais de 65% de suas horas de contemplação e lazer no resort.\n\n' +
      'Contudo, a nobreza de uma praia privativa monolítica exige uma custódia química invisível e infalível. ' +
      'Qualquer oscilação de transparência ou agressividade na água compromete a reputação do estabelecimento e o ' +
      'valor intangível da marca. A custódia algorítmica do JHPCS garante o balanço termodinâmico contínuo (LSI neutro), ' +
      'preservando o toque de seda da água, as tonalidades esmeralda e a integridade perene do ativo mineral.',
    b2cHeroTitle: 'MEMÓRIAS QUE DURAM GERAÇÕES AO REDOR DA ÁGUA CARIBENHA',
    b2cHeroSubtitle: 'A essência das enseadas paradisíacas integrada com máxima exclusividade à sua residência.',
    b2cArticleTitle: 'A CIÊNCIA DA ÁGUA QUE CUIDA DA SUA FAMÍLIA COM TOQUE DE SEDA',
    b2cArticleBody:
      'Possuir uma piscina de areia monolítica JHoston Pools é materializar uma obra de arte viva no coração ' +
      'do seu patrimônio familiar. Inspirada nas mais exclusivas enseadas caribenhas, a superfície monolítica ' +
      'combina a suavidade tátil da areia compactada com a solidez mineral do quartzo nobre, eliminando de forma definitiva ' +
      'os rejuntes frios, ásperos e suscetíveis a fungos das piscinas convencionais.\n\n' +
      'Por trás dessa experiência sensorial de refúgio particular, o JHPCS atua como um concierge científico permanente. ' +
      'Ao auditar semanalmente os parâmetros físico-químicos, o sistema previne a corrosão ácida e assegura uma água ' +
      'equilibrada em sua máxima pureza: sem ressecamento de pele, sem irritação ocular para as crianças e com o brilho ' +
      'cristalino que celebra as memórias mais preciosas da sua família.',
    editorialLetterQuote:
      '"Superfícies monolíticas de areia e matrizes de quartzo nobre representam o estado da arte na arquitetura de lazer de alto padrão. ' +
      'O JHPCS assegura que essa poesia arquitetônica seja protegida por uma fortaleza termodinâmica inviolável."'
  },

  ROI_COMMERCIAL: {
    id: 'ROI_COMMERCIAL',
    name: 'Retorno sobre Investimento & Eficiência Patrimonial',
    badge: 'ROI & NEGÓCIOS',
    tagline: 'Economia comprovada, valorização imobiliária e blindagem contra reformas precoces',
    palette: {
      primary: '#059669', // emerald-600
      secondary: '#0284c7', // sky-600
      accent: '#10b981', // emerald-500
    },
    headlinePrefix: 'A ECONOMIA BLINDADA DE R$ 50.000+ EM PATRIMÔNIO',
    coverDescription: 'Como o Plano de Manutenção Ativo elimina custos de retrabalho e valoriza o metro quadrado em até 22%.',
    b2bHeroTitle: 'MAXIMIZAÇÃO DE DIÁRIAS (ADR) E ZERO DIAS DE INTERDIÇÃO',
    b2bHeroSubtitle: 'A métrica financeira de como a água equilibrada sustenta altas taxas de ocupação.',
    b2bArticleTitle: 'O IMPACTO DE UMA PISCINA PERFEITA NO BALANÇO FINANCEIRO',
    b2bArticleBody:
      'No setor hoteleiro e de multipropriedade, cada dia de piscina interditada por desequilíbrio químico ' +
      'custa em média R$ 18.000 em devoluções de diárias, compensações e perda de consumo de alimentos e bebidas. ' +
      'Mais que um capricho estético, o monitoramento preventivo JHPCS é uma apólice de faturamento contínuo.\n\n' +
      'Com o Plano de Manutenção Ativo de 02 Anos e as revisões anuais com mão de obra técnica 100% isenta, ' +
      'a administração economiza custos exorbitantes com empreiteiras terceiras e garante que a atração ' +
      'mais lucrativa do empreendimento opere em 100% de capacidade nos feriados mais rentáveis do ano.',
    b2cHeroTitle: 'VALORIZAÇÃO DO IMÓVEL & PRESERVAÇÃO DE INVESTIMENTO FAMILIAR',
    b2cHeroSubtitle: 'Seu patrimônio valorizado em até 22% a mais em comparação com piscinas tradicionais.',
    b2cArticleTitle: 'POR QUE UMA PISCINA AUDITADA VALE MUITO MAIS NO MERCADO?',
    b2cArticleBody:
      'Na hora de avaliar ou comercializar um imóvel de condomínio fechado, o estado de conservação da área de lazer ' +
      'é o principal termômetro de liquidez. Casas com piscinas de areia impecáveis, que contam com dossiê ' +
      'digital completo de auditoria química e garantia ativa JHoston Pools, registram valorização média de até 22%.\n\n' +
      'O comprador adquire a certeza absoluta de que não terá que desembolsar R$ 40.000 ou R$ 60.000 em reformas ' +
      'traumáticas após a compra. A rastreabilidade de dados do JHPCS transforma a piscina em um ativo com selo de procedência.',
    editorialLetterQuote:
      '"O maior custo de uma obra de alto padrão não é a sua execução primorosa, mas sim o retrabalho decorrente da falta de governança. ' +
      'O JHPCS protege seu bolso garantindo previsibilidade financeira absoluta."'
  },

  FORENSIC_LEGAL: {
    id: 'FORENSIC_LEGAL',
    name: 'Auditoria Forense & Blindagem Jurídica Irrefutável',
    badge: 'JURÍDICO & PERÍCIA',
    tagline: 'Conformidade legal NBR, custódia de dados SHA-256 e blindagem contra má operação',
    palette: {
      primary: '#4f46e5', // indigo-600
      secondary: '#e11d48', // rose-600
      accent: '#6366f1', // indigo-500
    },
    headlinePrefix: 'A PROVA MATERIAL CONTRA O USO DE PRODUTOS CORROSIVOS',
    coverDescription: 'O dossiê pericial com geolocalização e fotos in-app que anula litígios e resguarda a garantia.',
    b2bHeroTitle: 'SEGURANÇA JURÍDICA ESTRITA PARA SÍNDICOS E GESTORES GERAIS',
    b2bHeroSubtitle: 'A blindagem pericial contra responsabilidade civil e contestações infundadas de garantia.',
    b2bArticleTitle: 'COMO O LIVRO-RAZÃO PERICIAL PROTEGE A GESTÃO CONDOMINIAL',
    b2bArticleBody:
      'Síndicos de condomínios horizontais e gerentes de manutenção enfrentam frequentes contestações ' +
      'quando terceirizados realizam manejos incorretos na casa de máquinas. O JHPCS institui a rastreabilidade ' +
      'forense compulsória: fotos da cubeta colorimétrica em tempo real, geolocalização por satélite e assinatura SHA-256.\n\n' +
      'Caso ocorra tentativa de aplicação de ácido muriático ou limpa pedras não autorizados, o sistema registra a infração ' +
      'no ato, emitindo alerta pericial. Isso blinda a construtora, a JHoston Pools e o próprio síndico perante ' +
      'as assembleias e peritos judiciais, transformando dados em evidências irrefutáveis.',
    b2cHeroTitle: 'SUA GARANTIA CONTRATUAL 100% PROTEGIDA E AUDITADA',
    b2cHeroSubtitle: 'Transparência total entre o proprietário, o tratador e a fábrica.',
    b2cArticleTitle: 'O FIM DAS DÚVIDAS E DISCUSSÕES SOBRE QUEM DANIFICOU A PISCINA',
    b2cArticleBody:
      'Quantas vezes proprietários foram surpreendidos por manchas esbranquiçadas ou pisos corroídos e ouviram ' +
      'versões contraditórias entre o piscineiro e o instalador? Com o aplicativo do tratador conectado ao JHPCS, ' +
      'cada visita é georreferenciada e registrada com fotos inalteráveis.\n\n' +
      'Você sabe exatamente o que foi dosado, quando foi escovado e como a água está se comportando. ' +
      'Sua garantia de 02 anos permanece viva e cristalina, com regras claras, sem letras miúdas e sem surpresas desagradáveis.',
    editorialLetterQuote:
      '"Na era dos dados, a palavra da fábrica ou do cliente dá lugar à evidência matemática. ' +
      'A rastreabilidade pericial do JHPCS é o escudo que preserva reputações e sustenta a verdade técnica."'
  },

  SUMMER_WELLNESS: {
    id: 'SUMMER_WELLNESS',
    name: 'Temporada de Verão & Bem-Estar Familiar',
    badge: 'VERÃO & FAMÍLIA',
    tagline: 'Água pura, pele hidratada e celebrações inesquecíveis nos meses mais ensolarados',
    palette: {
      primary: '#0ea5e9', // sky-500
      secondary: '#f59e0b', // amber-500
      accent: '#38bdf8', // sky-400
    },
    headlinePrefix: 'O VERÃO PERFEITO EM ÁGUAS CRISTALINAS E PURAS',
    coverDescription: 'Estratégias de compensação de cloro e fotoproteção mineral para os dias de alta radiação solar.',
    b2bHeroTitle: 'ALTA TEMPORADA DE SOL: CAPACIDADE MÁXIMA SEM INTERRUPÇÕES',
    b2bHeroSubtitle: 'Como absorver picos de 500+ banhistas/dia mantendo o brilho caribenho.',
    b2bArticleTitle: 'ALTA RADIAÇÃO UV E CARGA ORGÂNICA: O PLANO DE CONTINGÊNCIA',
    b2bArticleBody:
      'Nos meses de verão, a radiação solar intensa consome o cloro residual em poucas horas, enquanto o ' +
      'aumento exponencial de banhistas com protetores solares exige oxidação rápida para evitar oleosidade superficial. ' +
      'O motor de inteligência preditiva do JHPCS antecipa as ondas de calor e frentes de chuva via OpenWeather.\n\n' +
      'Com orientações automáticas enviadas diretamente ao smartphone do piscineiro, a equipe faz a dosagem estequiométrica ' +
      'preventiva antes do pico de uso, garantindo que os hóspedes desfrutem de um espelho d’água convidativo e brilhante.',
    b2cHeroTitle: 'O CENÁRIO DOS MELHORES DIAS DE FÉRIAS DA SUA FAMÍLIA',
    b2cHeroSubtitle: 'Crianças na água do amanhecer ao pôr do sol sem ressecamento ou ardor.',
    b2cArticleTitle: 'DICAS ESSENCIAIS PARA UM VERÃO INESQUECÍVEL NA SUA PRAIA PARTICULAR',
    b2cArticleBody:
      'Verão é sinônimo de casa cheia, risadas e finais de tarde inesquecíveis à beira da piscina. ' +
      'Para que a experiência seja impecável, nossa equipe técnica monitora a água semanalmente sem que você ' +
      'precise se preocupar com filtros, dosagens ou medições químicas.\n\n' +
      'A superfície de areia natural monolítica mantém uma temperatura térmica agradável mesmo sob sol escaldante, ' +
      'enquanto o equilíbrio do LSI garante que a água pareça mineralmente revigorante como uma fonte natural.',
    editorialLetterQuote:
      '"O verão passa rápido demais para perdermos um único fim de semana com problemas técnicos. ' +
      'Nosso papel é assegurar que o palco das suas celebrações esteja sempre impecável."'
  },

  SUSTAINABILITY_BIO: {
    id: 'SUSTAINABILITY_BIO',
    name: 'Química Verde & Eficiência Ecológica',
    badge: 'SUSTENTABILIDADE',
    tagline: 'Economia hídrica, redução de 40% no descarte de químicos e preservação ambiental',
    palette: {
      primary: '#10b981', // emerald-500
      secondary: '#14b8a6', // teal-500
      accent: '#34d399', // emerald-400
    },
    headlinePrefix: 'ENGENHARIA MINERAL EM HARMONIA COM O PLANETA',
    coverDescription: 'Como a estabilidade termodinâmica economiza milhares de litros de água e reduz o uso de sanitizantes.',
    b2bHeroTitle: 'GESTÃO HÍDRICA SUSTENTÁVEL E CERTIFICAÇÃO ESG',
    b2bHeroSubtitle: 'Métricas de governança ambiental para resorts e empreendimentos com selo verde.',
    b2bArticleTitle: 'COMO A QUÍMICA DE PRECISÃO REDUZ A PEGADA HÍDRICA DA SUA PISCINA',
    b2bArticleBody:
      'Piscinas desreguladas costumam exigir esvaziamentos frequentes e descartes maciços de água na rede pluvial. ' +
      'Através do equilíbrio contínuo de alcalinidade e dureza cálcica, o JHPCS estabiliza a água de forma que ' +
      'a necessidade de retro-lavagens de filtros seja otimizada e o consumo de sanitizantes seja reduzido em até 38%.\n\n' +
      'Resorts que utilizam a plataforma conquistam pontuação técnica em auditorias de certificações ambientais e ESG, ' +
      'demonstrando respeito aos recursos naturais e eficiência hídrica perante investidores e hóspedes conscientes.',
    b2cHeroTitle: 'UM OÁSIS PRIVATIVO QUE RESPEITA A NATUREZA E O FUTURO',
    b2cHeroSubtitle: 'A união entre agregados naturais de quartzo e tecnologia limpa.',
    b2cArticleTitle: 'PISCINA ECOLÓGICA: MENOS QUÍMICA, MAIS SAÚDE E PUREZA',
    b2cArticleBody:
      'A piscina de areia monolítica nasce da fusão de elementos minerais nobres da natureza. ' +
      'O sistema JHPCS honra essa origem ao abolir produtos tóxicos, solventes abrasivos e excessos químicos desnecessários.\n\n' +
      'O resultado é um banho natural, suave como um lago alpino, em harmonia com a vegetação ao redor e ' +
      'seguro para os animais de estimação da família. A inteligência artificial evita o desperdício e cuida do futuro.',
    editorialLetterQuote:
      '"A verdadeira sofisticação é sustentável. Ao equilibrar a água em seu estado de repouso natural, ' +
      'preservamos tanto a obra mineral quanto o meio ambiente ao nosso redor."'
  }
};

/**
 * Função utilitária para recuperar o estilo editorial configurado para o mês corrente
 * Permite override via parâmetro ou variável
 */
export function getActiveEditorialStyle(styleOverride?: string | null): EditorialTheme {
  if (styleOverride && EDITORIAL_STYLES[styleOverride as EditorialStyleId]) {
    return EDITORIAL_STYLES[styleOverride as EditorialStyleId];
  }

  // Calendário temático padrão por mês do ano (1 a 12)
  const month = new Date().getMonth() + 1;
  switch (month) {
    case 12:
    case 1:
    case 2:
      return EDITORIAL_STYLES.SUMMER_WELLNESS; // Verão / Férias
    case 3:
    case 4:
      return EDITORIAL_STYLES.SUSTAINABILITY_BIO; // Outono / Sustentabilidade
    case 5:
    case 6:
      return EDITORIAL_STYLES.ROI_COMMERCIAL; // Maio / Junho (Foco B2B / Economia)
    case 7:
    case 8:
      return EDITORIAL_STYLES.FORENSIC_LEGAL; // Inverno (Revisões / Auditoria Forense)
    case 9:
    case 10:
    case 11:
    default:
      return EDITORIAL_STYLES.LUXURY_ARCHITECTURAL; // Primavera / Alto Luxo & Lançamentos
  }
}
