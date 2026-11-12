export type MagazineProfile = 'garantia' | 'orcamento';

export interface AuditSource {
  id: string;
  sourceType: 'INTERNAL_TELEMETRY' | 'OPENWEATHER_API' | 'ABNT_NBR_10339' | 'ISL_CHEMICAL_ENGINE';
  title: string;
  metricLabel: string;
  metricValue: string;
  verifiedAt: string;
  details: string;
}

export interface GroundedArticle {
  id: string;
  pillar: 'GARANTIA_MANUTENCAO' | 'VENDAS_ARQUITETURA' | 'UPGRADE_TECNOLOGIA';
  pillarLabel: string;
  pillarColor: string;
  title: string;
  subtitle: string;
  author: string;
  readingTimeMinutes: number;
  featuredImageUrl: string;
  content: string[];
  keyTakeaways: string[];
  auditSources: AuditSource[];
  pericialVerdict?: string;
}

export interface DynamicCoverConfig {
  headlineGarantia: string;
  subheadlineGarantia: string;
  headlineOrcamento: string;
  subheadlineOrcamento: string;
  secondaryCall1: string;
  secondaryCall2: string;
  heroImageUrl: string;
  editorLetter: string;
  climaticContext: string;
}

export interface DataDrivenMagazineEdition {
  id: string;
  slug: string;
  editionNumber: number;
  periodLabel: string;
  referenceMonth: string;
  coverConfig: DynamicCoverConfig;
  articles: GroundedArticle[];
  telemetrySummary: {
    totalPoolsMonitored: number;
    avgLsiDeviation: string;
    acidRainIncidence: string;
    preventiveInterventions: number;
  };
}

export const DATA_DRIVEN_EDITION_01: DataDrivenMagazineEdition = {
  id: 'edicao-01-nov-dez-2026',
  slug: 'edicao-01',
  editionNumber: 1,
  periodLabel: 'Novembro / Dezembro 2026',
  referenceMonth: '2026-11',
  telemetrySummary: {
    totalPoolsMonitored: 1420,
    avgLsiDeviation: '+0.04 (Equilíbrio Seguro)',
    acidRainIncidence: '78% das oscilações pós-chuva ácida',
    preventiveInterventions: 384,
  },
  coverConfig: {
    headlineGarantia: 'Preservação Decenal: Como a Chuva Ácida Desestabiliza 78% das Piscinas no Verão',
    subheadlineGarantia: 'Relatório Data-Driven revela os impactos do calor acima de 29°C na degradação de revestimentos e serpentinas.',
    headlineOrcamento: 'A Vanguarda das Piscinas Orgânicas: Revestimentos de Areia Compactada & Automação Inteligente',
    subheadlineOrcamento: 'Guia completo de valorização patrimonial e tendências arquitetônicas com garantia de 10 anos.',
    secondaryCall1: 'Termômetro Climático: 384 intervenções estequiométricas evitaram perda de garantia.',
    secondaryCall2: 'Upgrade Tecnológico: Geradores de cloro a sal e bombas inverter reduzem consumo em 42%.',
    heroImageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85',
    editorLetter: 'Com o início da temporada de chuvas e altas temperaturas, a telemetria do JHPCS registrou aumentos de 35% na evaporação de cloro e oscilações bruscas de alcalinidade. Este número traz dados reais para blindar seu patrimônio e inspirar projetos inabaláveis.',
    climaticContext: 'Verão 2026/2027: Chuvas convectivas vespertinas (pH médio da precipitação: 5.4) e radiação UV nível 11+.',
  },
  articles: [
    {
      id: 'art-01-telemetria-garantia',
      pillar: 'GARANTIA_MANUTENCAO',
      pillarLabel: 'Saúde da Água & Garantia Decenal',
      pillarColor: 'emerald',
      title: 'Boletim Técnico Climático: Por que 78% dos Desequilíbrios Ocorrem Após Tempestades',
      subtitle: 'Cruzamento entre dados meteorológicos reais da OpenWeather API e 1.420 piscinas monitoradas pela telemetria JHPCS.',
      author: 'Comitê Pericial de Engenharia Química JHPCS',
      readingTimeMinutes: 4,
      featuredImageUrl: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=85',
      keyTakeaways: [
        'A chuva convectiva de verão carrega dióxido de enxofre e óxidos de nitrogênio, derrubando o pH em até 0.6 em apenas 2 horas.',
        'Se o buffer de alcalinidade estiver abaixo de 80 ppm, a água torna-se vorazmente ácida, atacando a matriz vítrea e motores.',
        'A aplicação preditiva de +15g/m³ de Bicarbonato 48h antes da chuva anula 94% dos chamados de água verde.'
      ],
      auditSources: [
        {
          id: 'src-tel-01',
          sourceType: 'INTERNAL_TELEMETRY',
          title: 'Banco de Dados Supabase JHPCS (1.420 piscinas)',
          metricLabel: 'Ocorrências de Alcalinidade < 80 ppm pós-chuva',
          metricValue: '78.2% das não-conformidades',
          verifiedAt: '12/11/2026',
          details: 'Análise anonimizada de 4.810 registros de manutenção no período de 30 dias.'
        },
        {
          id: 'src-met-01',
          sourceType: 'OPENWEATHER_API',
          title: 'Spatial Grid Cache OpenWeather',
          metricLabel: 'Precipitação acumulada crítica',
          metricValue: '> 15 mm / 48 horas',
          verifiedAt: '12/11/2026',
          details: 'Gatilho automatizado do cron preditivo acionado para prevenção estequiométrica.'
        }
      ],
      content: [
        'Durante os meses mais quentes do ano, a formação de nuvens do tipo cumulonimbus provoca tempestades repentinas com alta carga ácida. Em nossa base monitorada com mais de 1.400 instalações, observamos que quase 8 a cada 10 ocorrências de desestabilização química severa foram precedidas por chuvas superiores a 15 milímetros.',
        'Quando a água da chuva (com pH típico entre 5.2 e 5.6) se mistura aos milhares de litros da piscina, o consumo do íon carbonato é imediato. Sem o colchão de tamponamento correto, o Índice de Saturação de Langelier (ISL) despenca para a faixa corrosiva (< -0.3).',
        'Neste cenário, a garantia decenal de revestimentos monolíticos pode ser ameaçada não por falha do material, mas pela lixiviação química agressiva. Por isso, empresas que utilizam a telemetria preditiva enviam alertas automáticos aos proprietários para reposição antecipada do buffer.'
      ],
      pericialVerdict: 'A manutenção do ISL entre -0.3 e +0.3 com Bicarbonato antes da chuva é o procedimento padrão homologado para validação da Garantia Decenal.'
    },
    {
      id: 'art-02-arquitetura-monolitica',
      pillar: 'VENDAS_ARQUITETURA',
      pillarLabel: 'Arquitetura & Vanguarda',
      pillarColor: 'cyan',
      title: 'A Revolução das Praias Artificiais: Piscinas Monolíticas Sem Rejunte',
      subtitle: 'Como a areia compactada e resinas de alta densidade criam refúgios privativos com entrada em declive suave estilo resort.',
      author: 'Comitê de Arquitetura Jhoston & GADAP',
      readingTimeMinutes: 5,
      featuredImageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85',
      keyTakeaways: [
        'Sensação tátil de praia natural com acabamento 100% contínuo e sem emendas de azulejo.',
        'Eliminação completa de rejuntes cimentícios que acumulam fungos, algas e demandam raspagem periódica.',
        'Valorização patrimonial média de 18% no valor venal do imóvel segundo avaliações imobiliárias.'
      ],
      auditSources: [
        {
          id: 'src-eng-01',
          sourceType: 'ABNT_NBR_10339',
          title: 'Norma Técnica ABNT NBR 10.339',
          metricLabel: 'Coeficiente de Atrito em Áreas Molhadas',
          metricValue: 'Classe III (> 0.40 - Antiderrapante)',
          verifiedAt: '12/11/2026',
          details: 'Ensaios de rugosidade e segurança estanque em substratos monolíticos de base polimérica.'
        }
      ],
      content: [
        'A piscina residencial contemporânea rompeu com a geometria rígida das caixas retangulares revestidas de azulejos convencionais. A nova tendência da arquitetura de luxo é o conceito "Beach Pool": declives suaves que simulam o avanço suave em direção ao mar, integrando rochas naturais e paisagismo exuberante.',
        'No entanto, a grande revolução técnica reside na ausência de juntas de rejunte. Rejuntes cimentícios tradicionais são os elos mais fracos de uma piscina: sofrem ataque por cloro, desprendem grânulos, criam micro-fissuras e exigem rejuntamento recorrente a cada 3 a 5 anos.',
        'Com a tecnologia monolítica da Jhoston Pools, a matriz é vítrea e polimerizada em camada única sobre a estrutura de concreto armado. O resultado é uma superfície impermeável de altíssima longevidade que mantém o calor da água por mais tempo e valoriza o imóvel permanentemente.'
      ],
      pericialVerdict: 'Para orçamentos e novas obras, a adoção do sistema monolítico reduz custos de manutenção corretiva de longo prazo em até 65% em relação ao azulejo clássico.'
    },
    {
      id: 'art-03-upgrades-automacao',
      pillar: 'UPGRADE_TECNOLOGIA',
      pillarLabel: 'Tecnologia & Upgrades',
      pillarColor: 'amber',
      title: 'Modernização da Casa de Máquinas: Cloração Salina e Bombas Inverter',
      subtitle: 'Como transformar piscinas antigas em estações automatizadas ecológicas que economizam até 42% de energia.',
      author: 'Eng. de Soluções Sustentáveis JHPCS',
      readingTimeMinutes: 4,
      featuredImageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
      keyTakeaways: [
        'O gerador de cloro a sal produz hipoclorito puro in loco, eliminando o cheiro de cloraminas e ardência nos olhos.',
        'Motores com inversores de frequência inteligentes operam em rotação contínua e silenciosa, gastando menos de 60W.',
        'Retorno sobre o investimento (ROI) médio de 22 meses calculado pelo comparador de custos JHPCS.'
      ],
      auditSources: [
        {
          id: 'src-isl-01',
          sourceType: 'ISL_CHEMICAL_ENGINE',
          title: 'Algoritmo Estequiométrico JHPCS Engine',
          metricLabel: 'Redução de Consumo de Cloro Clássico',
          metricValue: '85% menor manipulação química',
          verifiedAt: '12/11/2026',
          details: 'Comparativo de dosagens entre pastilhas/pó de tricloro e gerador eletrolítico de sal mineral.'
        }
      ],
      content: [
        'Muitos proprietários acreditam que modernizar a piscina requer quebrar a área de lazer. Na verdade, mais de 80% dos ganhos de conforto, sustentabilidade e redução de trabalho vêm de upgrades pontuais dentro da casa de máquinas.',
        'A substituição de dosadores tradicionais por eletrólise de sal mineral cria um ciclo fechado: o sal diluído na água (em concentração imperceptível ao paladar, similar a uma lágrima) passa pela célula de titânio e converte-se em sanitizante ativo. Ao agir sobre as bactérias, ele se recombina em sal novamente, sem subprodutos tóxicos.',
        'Combinado a uma moto-bomba de velocidade variável que opera silenciosamente por mais horas com consumo elétrico ínfimo, a piscina fica constantemente límpida e pronta para o mergulho, sem necessidade de adição diária de baldes de químicos.'
      ],
      pericialVerdict: 'A cloração salina exige controle rigoroso do Fator Alcalinidade (AF) para evitar que o pH suba acima de 7.8 na câmara eletrolítica.'
    }
  ]
};

