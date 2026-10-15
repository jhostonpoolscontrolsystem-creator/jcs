import { NextResponse } from 'next/server';
import { EDITORIAL_STYLES, EditorialStyleId, getActiveEditorialStyle } from '@/lib/editorial-engine';

export interface ClientEditionBatch {
  id: string;
  editionMonth: string;
  editionYear: number;
  editionNumber: number;
  status: 'PENDING_DIRECTOR_APPROVAL' | 'APPROVED' | 'DISPATCHED' | 'REJECTED';
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
  b2bCount: number;
  b2cCount: number;
  totalRecipients: number;
  editorialStyleId: EditorialStyleId;
}

// Armazenamento em memória para demonstração imediata resiliente
let memoryBatch: ClientEditionBatch = {
  id: 'batch-2026-10',
  editionMonth: 'Outubro',
  editionYear: 2026,
  editionNumber: 1,
  status: 'PENDING_DIRECTOR_APPROVAL',
  b2bCount: 8,
  b2cCount: 16,
  totalRecipients: 24,
  editorialStyleId: 'LUXURY_ARCHITECTURAL',
  notes: 'Edição contendo Artigos B2B de Hotelaria (Reservas Diretas e TripAdvisor) e B2C (Saúde Familiar e Convivência).',
};

export async function GET() {
  const currentStyle = getActiveEditorialStyle(memoryBatch.editorialStyleId);

  return NextResponse.json({
    batch: memoryBatch,
    currentStyle,
    availableStyles: Object.values(EDITORIAL_STYLES).map(s => ({
      id: s.id,
      name: s.name,
      badge: s.badge,
      tagline: s.tagline,
      palette: s.palette,
    })),
    recipientsPreview: [
      {
        id: 'rec-1',
        name: 'Resort Terravista Trancoso',
        poolName: 'Piscina de Areia Monolítica (350m³)',
        type: 'B2B_HOTEL',
        phone: '5573999992222',
        status: 'AGUARDANDO_APROVACAO',
        pdfUrl: `https://jcs-pools.vercel.app/api/pdf/client-magazine?poolId=p-1&clientType=B2B_HOTEL&style=${memoryBatch.editorialStyleId}`
      },
      {
        id: 'rec-2',
        name: 'Hotel Fasano Boa Vista',
        poolName: 'Piscina Olímpica Aquecida (180m³)',
        type: 'B2B_HOTEL',
        phone: '5511999998888',
        status: 'AGUARDANDO_APROVACAO',
        pdfUrl: `https://jcs-pools.vercel.app/api/pdf/client-magazine?poolId=p-2&clientType=B2B_HOTEL&style=${memoryBatch.editorialStyleId}`
      },
      {
        id: 'rec-3',
        name: 'Família Oliveira (Alphaville Graciosa)',
        poolName: 'Piscina de Areia Privativa (65m³)',
        type: 'B2C_FAMILIA',
        phone: '5541999997777',
        status: 'AGUARDANDO_APROVACAO',
        pdfUrl: `https://jcs-pools.vercel.app/api/pdf/client-magazine?poolId=p-3&clientType=B2C_FAMILIA&style=${memoryBatch.editorialStyleId}`
      },
    ]
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, approvedBy = 'Diretoria Executiva JHoston Pools', notes, editorialStyleId } = body;

    // Atualização do estilo editorial mensal
    if (action === 'CHANGE_STYLE' && editorialStyleId) {
      if (EDITORIAL_STYLES[editorialStyleId as EditorialStyleId]) {
        memoryBatch.editorialStyleId = editorialStyleId as EditorialStyleId;
        const newStyle = EDITORIAL_STYLES[memoryBatch.editorialStyleId];
        memoryBatch.notes = `Estilo editorial alterado para: ${newStyle.name} (${newStyle.badge}).`;
        return NextResponse.json({
          success: true,
          message: `Linha editorial mensal alterada com sucesso para "${newStyle.name}"!`,
          batch: memoryBatch,
          currentStyle: newStyle
        });
      }
    }

    if (action === 'APPROVE') {
      memoryBatch.status = 'APPROVED';
      memoryBatch.approvedBy = approvedBy;
      memoryBatch.approvedAt = new Date().toISOString();
      if (notes) memoryBatch.notes = notes;

      return NextResponse.json({
        success: true,
        message: 'Edição do Cliente Final aprovada pela Diretoria! Pronta para despacho.',
        batch: memoryBatch
      });
    }

    if (action === 'DISPATCH') {
      memoryBatch.status = 'DISPATCHED';

      return NextResponse.json({
        success: true,
        message: `Disparo da Revista realizado com sucesso para ${memoryBatch.totalRecipients} clientes homologados sob o estilo "${EDITORIAL_STYLES[memoryBatch.editorialStyleId]?.name}"!`,
        batch: memoryBatch,
        sla_seconds: 2.4
      });
    }

    if (action === 'REJECT') {
      memoryBatch.status = 'REJECTED';
      memoryBatch.notes = notes || 'Edição suspensa para revisão de pautas.';
      return NextResponse.json({
        success: true,
        message: 'Lote retornado para rascunho.',
        batch: memoryBatch
      });
    }

    return NextResponse.json({ error: 'Ação não reconhecida' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao processar aprovação da diretoria' }, { status: 500 });
  }
}
