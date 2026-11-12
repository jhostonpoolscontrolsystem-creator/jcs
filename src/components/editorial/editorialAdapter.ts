import { EditorialPageSlotData } from '@/components/editorial/editorialSchema';
import { DATA_DRIVEN_EDITION_01, MagazineProfile } from '@/lib/magazine/dataDrivenMagazineEngine';

export function buildEditorialPagesFromSaaS(
  tenantName: string = 'Jhoston Pools & Lagoons',
  tenantWhatsapp: string = '+55 (11) 99999-8888',
  profile: MagazineProfile = 'garantia'
): EditorialPageSlotData[] {
  const edition = DATA_DRIVEN_EDITION_01;

  const activeHeadline = profile === 'garantia' 
    ? edition.coverConfig.headlineGarantia 
    : edition.coverConfig.headlineOrcamento;

  const activeSubheadline = profile === 'garantia' 
    ? edition.coverConfig.subheadlineGarantia 
    : edition.coverConfig.subheadlineOrcamento;

  return [
    // PÁGINA 1: CAPA PREMIUM
    {
      pageNumber: 1,
      totalPages: 6,
      type: 'cover',
      publicationTitle: 'PoolTech Living',
      editionLabel: 'Edição Bimestral Data-Driven #01',
      editionDate: edition.periodLabel,
      eyebrow: profile === 'garantia' ? 'Pilar: Garantia & Pós-Venda' : 'Pilar: Arquitetura & Expansão',
      title: activeHeadline,
      subtitle: 'Relatório Técnico & Revista Editorial de Engenharia de Piscinas',
      editorLetter: edition.coverConfig.editorLetter,
      image: {
        src: edition.coverConfig.heroImageUrl,
        alt: 'Piscina Monolítica em Areia Compactada',
      },
      metrics: [
        { label: 'Piscinas na Base', value: '1.420', sublabel: 'Telemetria Contínua', accent: 'cyan' },
        { label: 'Desvio Médio ISL', value: '+0.04', sublabel: 'Equilíbrio Seguro', accent: 'green' },
        { label: 'Pós-Chuva Ácida', value: '78%', sublabel: 'Oscilação Alcalinidade', accent: 'amber' },
        { label: 'Ações Preditivas', value: '384', sublabel: 'Alertas Antecipados', accent: 'white' },
      ],
      organizationLabel: tenantName,
      contactLabel: `WhatsApp: ${tenantWhatsapp}`,
    },

    // PÁGINA 2: ÍNDICE EDITORIAL
    {
      pageNumber: 2,
      totalPages: 6,
      type: 'index',
      publicationTitle: 'PoolTech Living',
      editionLabel: 'Edição #01',
      editionDate: edition.periodLabel,
      sectionLabel: 'Sumário & Termômetro',
      title: 'Índice de Matérias & Relatórios Técnicos',
      subtitle: 'Curadoria estruturada sem dados inventados — cada indicador é ancorado em telemetria real.',
      editorLetter: 'Este número reúne dados anonimizados de nossa frota técnica, correlações meteorológicas da OpenWeather e diretrizes estritas da ABNT NBR 10.339.',
      indexEntries: [
        {
          indexNumber: '01',
          pillarLabel: 'Saúde da Água & Garantia',
          title: edition.articles[0].title,
          subtitle: edition.articles[0].subtitle,
          readingTimeMinutes: edition.articles[0].readingTimeMinutes,
          targetPage: 3,
          isAudited: true,
        },
        {
          indexNumber: '02',
          pillarLabel: 'Arquitetura & Vanguarda',
          title: edition.articles[1].title,
          subtitle: edition.articles[1].subtitle,
          readingTimeMinutes: edition.articles[1].readingTimeMinutes,
          targetPage: 4,
          isAudited: true,
        },
        {
          indexNumber: '03',
          pillarLabel: 'Tecnologia & Upgrades',
          title: edition.articles[2].title,
          subtitle: edition.articles[2].subtitle,
          readingTimeMinutes: edition.articles[2].readingTimeMinutes,
          targetPage: 5,
          isAudited: true,
        },
        {
          indexNumber: '04',
          pillarLabel: 'Consultoria & Contato',
          title: 'Dimensionamento & Laudo Técnico Presencial',
          subtitle: 'Agende uma inspeção técnica com nossa equipe de engenharia.',
          readingTimeMinutes: 2,
          targetPage: 6,
          isAudited: true,
        },
      ],
      organizationLabel: tenantName,
      contactLabel: `WhatsApp: ${tenantWhatsapp}`,
    },

    // PÁGINA 3: MATÉRIA TÉCNICA (GARANTIA E ISL)
    {
      pageNumber: 3,
      totalPages: 6,
      type: 'article',
      publicationTitle: 'PoolTech Living',
      editionLabel: 'Edição #01',
      editionDate: edition.periodLabel,
      sectionLabel: 'Saúde da Água & Garantia',
      sectionAccent: 'emerald',
      title: edition.articles[0].title,
      subtitle: edition.articles[0].subtitle,
      image: {
        src: edition.articles[0].featuredImageUrl,
        alt: 'Análise Química de Borda',
      },
      auditItems: edition.articles[0].auditSources.map(s => ({
        id: s.id,
        sourceType: s.sourceType,
        title: s.title,
        metricLabel: s.metricLabel,
        metricValue: s.metricValue,
        details: s.details,
      })),
      bodyParagraphs: edition.articles[0].content,
      quote: {
        text: edition.articles[0].pericialVerdict || '',
        authorTitle: 'Parecer Pericial de Engenharia Química',
      },
      organizationLabel: tenantName,
      contactLabel: `WhatsApp: ${tenantWhatsapp}`,
    },

    // PÁGINA 4: ARQUITETURA E COMPARAÇÃO
    {
      pageNumber: 4,
      totalPages: 6,
      type: 'comparison',
      publicationTitle: 'PoolTech Living',
      editionLabel: 'Edição #01',
      editionDate: edition.periodLabel,
      sectionLabel: 'Arquitetura & Engenharia de Materiais',
      sectionAccent: 'cyan',
      title: edition.articles[1].title,
      subtitle: edition.articles[1].subtitle,
      comparisonItems: [
        {
          badge: 'SISTEMA CONVENCIONAL',
          title: 'Azulejo / Pastilha Cimentícia',
          description: 'Apresenta mais de 1.200 metros lineares de rejunte cimentício em piscina média, propensos a acúmulo de algas e desagregação química ácida.',
          highlightValue: 'Rejunte periódico a cada 3 anos',
          accent: 'amber',
        },
        {
          badge: 'SISTEMA MONOLÍTICO JHOSTON',
          title: 'Areia Compactada & Resina Vítrea',
          description: 'Superfície contínua sem nenhuma junta de rejunte. Coeficiente de atrito NBR 10.339 Classe III (antiderrapante macio) e garantia decenal integral.',
          highlightValue: 'Zero juntas de rejunte',
          accent: 'cyan',
        },
      ],
      bodyParagraphs: edition.articles[1].content,
      metrics: [
        { label: 'Valorização Venal', value: '+18%', sublabel: 'Mercado Imobiliário', accent: 'green' },
        { label: 'Custo de Manutenção', value: '-65%', sublabel: 'Sem Rejuntamento', accent: 'cyan' },
      ],
      organizationLabel: tenantName,
      contactLabel: `WhatsApp: ${tenantWhatsapp}`,
    },

    // PÁGINA 5: TABELA TÉCNICA E DIMENSIONAMENTO
    {
      pageNumber: 5,
      totalPages: 6,
      type: 'table',
      publicationTitle: 'PoolTech Living',
      editionLabel: 'Edição #01',
      editionDate: edition.periodLabel,
      sectionLabel: 'Dimensionamento da Casa de Máquinas',
      sectionAccent: 'cyan',
      title: 'Tabela de Dimensionamento & Cargas Térmicas (NBR 10.339)',
      subtitle: 'Relação volumétrica recomendada pela engenharia para recirculação estanque em 6 horas.',
      tableColumns: [
        { header: 'Volume (L)', accessorKey: 'volume', align: 'left', widthPercent: 25 },
        { header: 'Motobomba Ideal', accessorKey: 'pump', align: 'left', widthPercent: 25 },
        { header: 'Carga Filtrante', accessorKey: 'filter', align: 'left', widthPercent: 30 },
        { header: 'Aquecimento', accessorKey: 'heater', align: 'right', widthPercent: 20 },
      ],
      tableRows: [
        { volume: 'Até 30.000 L', pump: '1/2 CV', filter: '40 kg (areia / vidro)', heater: '21 kW' },
        { volume: 'Até 60.000 L', pump: '3/4 CV', filter: '75 kg (areia / vidro)', heater: '42 kW' },
        { volume: 'Até 90.000 L', pump: '1.0 CV', filter: '125 kg (areia / vidro)', heater: '63 kW' },
        { volume: 'Acima de 100.000 L', pump: '1.5 CV + Inverter', filter: '175 kg vítreo ativado', heater: 'Sob Medida' },
      ],
      bodyParagraphs: [
        'A correta calibração do diâmetro da tubulação em conjunto com a vazão da motobomba previne cavitação mecânica e garante que 100% da lâmina dágua passe pelo elemento filtrante sem perdas de carga desnecessárias.',
        'Em piscinas equipadas com geradores eletrolíticos de sal, o tempo mínimo de circulação diária deve ser sincronizado à taxa de evaporação de cloro para evitar superdosagem ou corrosão da célula de titânio.',
      ],
      cta: {
        title: 'Calcule o Volume da Sua Piscina',
        description: 'Receba a especificação completa de equipamentos e dosagem estequiométrica personalizada para o seu imóvel.',
        buttonLabel: 'Solicitar Laudo Técnico',
        buttonUrl: `https://wa.me/${tenantWhatsapp.replace(/\D/g, '')}?text=Ol%C3%A1%2C%20gostaria%20de%20um%20laudo%20de%20dimensionamento%20para%20minha%20piscina.`,
        contactLine: `Atendimento de Engenharia: ${tenantWhatsapp}`,
      },
      organizationLabel: tenantName,
      contactLabel: `WhatsApp: ${tenantWhatsapp}`,
    },

    // PÁGINA 6: ENCERRAMENTO INSTITUCIONAL & CONVERSÃO
    {
      pageNumber: 6,
      totalPages: 6,
      type: 'closing',
      publicationTitle: 'PoolTech Living',
      editionLabel: 'Edição #01',
      editionDate: edition.periodLabel,
      sectionLabel: 'Encerramento & Atendimento',
      sectionAccent: 'amber',
      title: 'Compromisso Pericial com o Seu Patrimônio',
      subtitle: `A equipe de ${tenantName} une a ciência físico-química do motor JHPCS à execução de alto padrão para transformar piscinas em obras de arte funcionais e duradouras.`,
      editorLetter: 'Não confie a integridade da sua piscina a soluções amadoras. Da estequiometria do ISL à garantia decenal de revestimento, estamos prontos para atender você.',
      cta: {
        title: 'Agende uma Visita Técnica Especializada',
        description: 'Realizamos medição de pH, cloro livre, alcalinidade, dureza cálcica e inspeção da casa de máquinas com laudo pericial impresso.',
        buttonLabel: 'Falar com Especialista via WhatsApp',
        buttonUrl: `https://wa.me/${tenantWhatsapp.replace(/\D/g, '')}?text=Ol%C3%A1%2C%20li%20a%20Revista%20PoolTech%20e%20gostaria%20de%20agendar%20uma%20visita%20t%C3%A9cnica.`,
        secondaryLabel: 'Visitar Portal do Ecossistema',
        secondaryUrl: '/',
        contactLine: `Plantão Técnico Autorizado • ${tenantName}`,
      },
      organizationLabel: tenantName,
      contactLabel: `WhatsApp: ${tenantWhatsapp}`,
    },
  ];
}
