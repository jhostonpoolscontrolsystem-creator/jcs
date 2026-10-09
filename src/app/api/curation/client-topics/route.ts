import { NextResponse } from 'next/server';

export interface MagazineTopic {
  id: string;
  category: 'B2B_HOTEL' | 'B2C_FAMILIA';
  title: string;
  summary: string;
  sourceUrl?: string;
  impactMetrics: string;
}

export const CURATED_TOPICS: MagazineTopic[] = [
  // B2B: Hotéis, Resorts e Empreendimentos
  {
    id: 'b2b-1',
    category: 'B2B_HOTEL',
    title: 'A Piscina de Areia como Fator Decisivo na Diária Média (ADR)',
    summary: 'Estudo do setor de hospitalidade de alto padrão aponta que piscinas instagramáveis com aspecto natural de praia aumentam a conversão de reservas diretas em até 27% e justificam diárias até 35% mais elevadas.',
    sourceUrl: 'https://jcs-pools.vercel.app/artigos/hospitalidade-piscinas',
    impactMetrics: '+27% em Reservas Diretas',
  },
  {
    id: 'b2b-2',
    category: 'B2B_HOTEL',
    title: 'Impacto nas Avaliações 5 Estrelas no TripAdvisor e Booking',
    summary: 'A ausência de cheiro forte de cloro e o toque macio dos cristais de areia compactada são citados espontaneamente em 42% das avaliações de excelência de resorts em Trancoso e litoral paulista.',
    sourceUrl: 'https://jcs-pools.vercel.app/artigos/reputacao-hoteis',
    impactMetrics: '4.9/5 Média de Avaliações',
  },
  {
    id: 'b2b-3',
    category: 'B2B_HOTEL',
    title: 'Zero Dias de Interdição na Alta Temporada',
    summary: 'O monitoramento químico termodinâmico contínuo impede que o hotel enfrente o pesadelo da água turva em feriados, preservando o faturamento de alimentos e bebidas à beira da piscina.',
    sourceUrl: 'https://jcs-pools.vercel.app/artigos/seguranca-operacional',
    impactMetrics: '100% de Disponibilidade Operacional',
  },

  // B2C: Casas de Família e Residências
  {
    id: 'b2c-1',
    category: 'B2C_FAMILIA',
    title: 'A Convivência em Família e o Estímulo à Saúde das Crianças',
    summary: 'Pediatras e terapeutas destacam a natação recreativa em águas balanceadas quimicamente como o melhor exercício para o desenvolvimento motor infantil e conexão familiar longe das telas.',
    sourceUrl: 'https://jcs-pools.vercel.app/artigos/familia-e-saude',
    impactMetrics: 'Água Pura sem Ardor nos Olhos',
  },
  {
    id: 'b2c-2',
    category: 'B2C_FAMILIA',
    title: 'O Conforto da Praia Privativa no Quintal de Casa',
    summary: 'Com a entrada em rampa suave e a ausência de degraus pontiagudos, idosos e crianças desfrutam com total segurança de uma autêntica sensação de estar nas águas calmas do Caribe.',
    sourceUrl: 'https://jcs-pools.vercel.app/artigos/praia-privativa',
    impactMetrics: 'Acessibilidade & Segurança Plena',
  },
  {
    id: 'b2c-3',
    category: 'B2C_FAMILIA',
    title: 'Blindagem Patrimonial: Por Que a Garantia Decenal Dá Paz de Espírito',
    summary: 'Ter o Digital Twin do JHPCS auditando as visitas do tratador assegura que o investimento da família permaneça valorizado, sem riscos de reformas precoces causadas por ácido incorreto.',
    sourceUrl: 'https://jcs-pools.vercel.app/artigos/garantia-decenal-familia',
    impactMetrics: '10 Anos de Cobertura Garantida',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let filtered = CURATED_TOPICS;
  if (category) {
    filtered = filtered.filter(t => t.category === category);
  }

  return NextResponse.json({
    topics: filtered,
    total: filtered.length,
    lastCuratedAt: new Date().toISOString(),
  });
}
