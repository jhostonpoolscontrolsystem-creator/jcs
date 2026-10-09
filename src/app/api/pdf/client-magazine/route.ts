import { NextResponse } from 'next/server';
import { generateClientMagazinePdf, ClientMagazineData } from '@/lib/client-magazine-pdf';
import { supabase } from '@/lib/supabase';
import { mockPools } from '@/lib/mock-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const poolId = searchParams.get('poolId') || 'p-1';
    const clientType = (searchParams.get('clientType') as any) || 'B2B_HOTEL';
    const editionNumber = Number(searchParams.get('editionNumber')) || 1;
    const clientName = searchParams.get('clientName') || (clientType === 'B2B_HOTEL' ? 'Resort Terravista Trancoso' : 'Família Oliveira & Amigos');

    // Busca detalhes da piscina
    let pool = mockPools.find(p => p.id === poolId) || mockPools[0];
    try {
      const { data: dbPool } = await supabase.from('pools').select('*').eq('id', poolId).single();
      if (dbPool) {
        pool = dbPool;
      }
    } catch (e) {}

    const doc = generateClientMagazinePdf({
      clientName,
      clientType,
      poolName: pool.name,
      volumeM3: pool.volume_m3,
      editionNumber,
      editionMonth: new Date().toLocaleDateString('pt-BR', { month: 'long' }),
      editionYear: new Date().getFullYear(),
      statusCura: pool.status,
      daysRemainingCura: 14,
      healthScore: pool.status === 'RED_ZONE' ? 78 : 98,
      avgLsi: 0.08,
      responsibleName: 'Diretoria Executiva JHoston Pools'
    });

    const pdfBuffer = doc.output('arraybuffer');

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="JHPCS_Revista_Cliente_${clientType}_${editionNumber}.pdf"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao gerar PDF da Revista do Cliente' }, { status: 500 });
  }
}
