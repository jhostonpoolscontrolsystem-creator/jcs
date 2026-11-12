export interface MagazineArticle {
  id: string;
  category: 'CAPA' | 'TECNICA' | 'DESIGN' | 'CHECKLIST' | 'SUSTENTABILIDADE';
  categoryLabel: string;
  title: string;
  subtitle: string;
  author: string;
  readTimeMinutes: number;
  featuredImageUrl: string;
  content: string[]; // Parágrafos editoriais
  highlights?: string[];
  pericialInsight?: string;
}

export interface MagazineEdition {
  id: string;
  slug: string;
  editionNumber: number;
  periodLabel: string;
  title: string;
  subtitle: string;
  themeFocus: string;
  coverImageUrl: string;
  publishedAt: string;
  articles: MagazineArticle[];
}

export interface TenantMagazineConfig {
  tenantId: string;
  tenantSlug: string;
  brandName: string;
  logoUrl?: string;
  primaryColor: string;
  whatsappNumber: string;
  ctaText: string;
  showCalculator: boolean;
  isMasterEnabled: boolean;
}

export const FIRST_BIMONTHLY_EDITION: MagazineEdition = {
  id: 'edicao-01-nov-dez-2026',
  slug: 'edicao-01',
  editionNumber: 1,
  periodLabel: 'Novembro / Dezembro 2026',
  title: 'Revista PoolTech Living & Engenharia',
  subtitle: 'A Nova Era das Piscinas de Areia, Inteligência Estequiométrica e Sustentabilidade de Alta Performance',
  themeFocus: 'Preparação para o Verão & Revestimentos Monolíticos',
  coverImageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80',
  publishedAt: '2026-11-12T00:00:00Z',
  articles: [
    {
      id: 'art-01-capa',
      category: 'CAPA',
      categoryLabel: 'Arquitetura & Vanguarda',
      title: 'A Revolução das Piscinas Orgânicas: Revestimentos Monolíticos e Praias Artificiais',
      subtitle: 'Como a tecnologia vítreo-polimérica eliminou as juntas de rejunte e transformou o lazer residencial em refúgios naturais de luxo.',
      author: 'Comitê de Arquitetura Jhoston & GADAP',
      readTimeMinutes: 5,
      featuredImageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Eliminação de 100% dos rejuntes cimentícios propensos a fungos e algas.',
        'Sensação térmica agradável e textura antiderrapante suave ao toque descalço.',
        'Valorização patrimonial média de 18% no valor venal do imóvel residencial.'
      ],
      content: [
        'O conceito tradicional de piscina retangular azul com azulejos e rejuntes visíveis está cedendo espaço a uma estética orgânica que se integra harmonicamente ao paisagismo e à topografia do terreno. Inspiradas nas lagoas cristalinas e resorts caribenhos, as piscinas monolíticas de areia compactada e matriz polimérica representam o ápice do design contemporâneo.',
        'Além do apelo visual cinematográfico com entradas suaves em declive suave (estilo praia), a engenharia por trás do revestimento monolítico resolve a maior dor de cabeça de proprietários: a desagregação e o escurecimento de rejuntes cimentícios. Ao criar uma película contínua e impermeável, anulam-se os pontos de acúmulo de algas pretas e bactérias.',
        'Para manter essa integridade vítrea por décadas, é mandatório o acompanhamento estequiométrico contínuo. É aqui que entra a tecnologia SaaS de ponta: calibrar o balanço iônico da água evita que a matriz polimérica sofra lixiviação ácida ou incrustação salina precoce.'
      ],
      pericialInsight: 'Piscinas monolíticas não toleram o uso de ácido muriático bruto ou desequilíbrio persistente do ISL. O monitoramento digital é a garantia legal da preservação decenal do investimento.'
    },
    {
      id: 'art-02-tecnica',
      category: 'TECNICA',
      categoryLabel: 'Guia Técnico Descomplicado',
      title: 'O Enigma do ISL: Por que uma Água Cristalina Pode Estar Destruindo Sua Piscina',
      subtitle: 'Entenda como o Índice de Saturação de Langelier diferencia um tratamento cosmético amador de uma engenharia química de preservação.',
      author: 'Eng. Daniel Lopes & Corpo Pericial JHPCS',
      readTimeMinutes: 4,
      featuredImageUrl: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Água transparente pode ser altamente agressiva e corrosiva para motores e revestimentos.',
        'O ISL equilibra pH, temperatura, alcalinidade, dureza cálcica e sólidos totais dissolvidos.',
        'Economia de até 40% em reposição de produtos químicos com dosagens estequiométricas exatas.'
      ],
      content: [
        'Muitos proprietários acreditam que ver o fundo da piscina com nitidez é sinônimo de água saudável. No entanto, quimicamente falando, uma água perfeitamente cristalina pode ser vorazmente corrosiva ou incrustante.',
        'Quando a água está insaturada em carbonato de cálcio (ISL < -0.3), ela busca o cálcio onde quer que ele esteja: lixiviando rejuntes, atacando o gelcoat da fibra, enrugando o vinil e corroendo serpentinas de trocadores de calor. Por outro lado, quando o ISL ultrapassa +0.3, a água deposita microcristais que tornam as paredes ásperas e entopem a tubulação.',
        'Contratar um profissional ou empresa que utiliza o motor inteligente JHPCS garante que cada grama de produto adicionado respeite a fórmula matemática exata para o volume e o revestimento específico da sua residência ou condomínio.'
      ],
      pericialInsight: 'O equilíbrio do ISL na faixa de -0.3 a +0.3 protege simultaneamente a saúde dos banhistas e o patrimônio estrutural da piscina.'
    },
    {
      id: 'art-03-design',
      category: 'DESIGN',
      categoryLabel: 'Lazer & Automação',
      title: 'Iluminação Cênica Subaquática & Spas Integrados: O Lazer Noturno Elevado',
      subtitle: 'Refletores LED RGB sincronizados por smartphone e jatos de hidroterapia transformam a área externa em um santuário de bem-estar.',
      author: 'Equipe de Curadoria GADAP Living',
      readTimeMinutes: 3,
      featuredImageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'LEDs de alta eficiência com protocolo DMX para automação residencial completa.',
        'Spas com bancos ergonômicos e temperatura controlada entre 34°C e 38°C.',
        'Aproveitamento do espaço em 365 dias do ano, não apenas nos dias quentes de verão.'
      ],
      content: [
        'A piscina moderna deixou de ser utilizada apenas nos fins de semana ensolarados de verão. Com a chegada da iluminação cênica de alto IRC (Índice de Reprodução de Cor) e automação de aquecimento híbrido (solar + bomba de calor), o espaço aquático tornou-se o elemento central da arquitetura social noturna.',
        'Spas integrados na mesma lâmina dágua, com bordas infinitas transbordantes para a piscina principal, proporcionam uma experiência relaxante de hidroterapia sem a necessidade de duas estruturas de alvenaria isoladas.',
        'A integração com sistemas de automação permite acionar cascatas, lâmpadas subaquáticas e aquecedores diretamente do celular, com retorno de telemetria em tempo real.'
      ]
    },
    {
      id: 'art-04-checklist',
      category: 'CHECKLIST',
      categoryLabel: 'Segurança & Manutenção',
      title: 'Checklist Preventivo de Pré-Verão: As 5 Verificações Vitais',
      subtitle: 'O que você precisa inspecionar na casa de máquinas antes de abrir a temporada de festas e recepções.',
      author: 'Suporte Técnico JHPCS',
      readTimeMinutes: 3,
      featuredImageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Troca da areia do filtro ou substituição por elementos vítreos ativados a cada 2 anos.',
        'Inspeção mandatória dos ralos de fundo com grelha anti-aprisionamento (Norma ABNT 10.339).',
        'Verificação de estanqueidade e ruído dos rolamentos da moto-bomba.'
      ],
      content: [
        '1. Carga Filtrante: A areia saturada perde a capacidade de reter micropartículas e consome até o dobro de cloro livre. O elemento vítreo reduz a necessidade de retrolavagens em 50%.',
        '2. Ralos de Fundo Anti-Aprisionamento: Jamais permita o uso de piscina com ralo quebrado ou sem dreno duplo interligado por alívio atmosférico.',
        '3. Teste Hidráulico de Válvulas: Válvulas de retenção e registros esféricos precisam girar suavemente sem vazamentos no selo mecânico.',
        '4. Medição Antecipada dos Parâmetros Químicos: Faça um check-up com seu tratador credenciado pelo menos 15 dias antes das confraternizações.'
      ]
    }
  ]
};
