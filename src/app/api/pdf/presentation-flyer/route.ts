import { NextResponse } from 'next/server';
import { generatePresentationFlyerPdf } from '@/lib/presentation-flyer-pdf';
import { supabase } from '@/lib/supabase';
import { mockPools } from '@/lib/mock-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get('type') as any) || 'DIRETORIA_JHOSTON';
    const recipientName = searchParams.get('recipientName') || (type === 'DIRETORIA_JHOSTON' ? 'Diretoria Executiva JHoston Pools' : 'Gestão & Diretoria do Estabelecimento');
    const poolId = searchParams.get('poolId') || 'a0000001-0000-0000-0000-000000000001';

    let pool = mockPools.find(p => p.id === poolId) || mockPools[0];
    try {
      const { data: dbPool } = await supabase.from('pools').select('*').eq('id', poolId).single();
      if (dbPool) {
        pool = dbPool;
      }
    } catch (e) {}

    const doc = generatePresentationFlyerPdf({
      type,
      recipientName,
      establishmentName: pool.name.includes('Resort') ? 'Resort Terravista Trancoso' : 'Estabelecimento Parceiro JHoston',
      poolName: pool.name,
      volumeM3: pool.volume_m3 || 350
    });

    const pdfBuffer = doc.output('arraybuffer');
    const filename = type === 'DIRETORIA_JHOSTON' 
      ? 'JHPCS_Flyer_Executivo_Diretoria.pdf' 
      : 'JHPCS_Flyer_VIP_Cliente_Final.pdf';

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao gerar Flyer em PDF' }, { status: 500 });
  }
}
