import { NextResponse } from 'next/server';
import { generateBimonthlyMagazinePdf } from '@/lib/magazine/bimonthlyMagazinePdf';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantName = searchParams.get('tenant') || 'Jhoston Pools & Lagoons';
    const whatsapp = searchParams.get('whatsapp') || '+55 (11) 99999-8888';

    const pdfBuffer = await generateBimonthlyMagazinePdf({
      tenantName,
      tenantWhatsapp: whatsapp,
    });

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', 'inline; filename="REVISTA_POOLTECH_EDICAO_01.pdf"');
    headers.set('Cache-Control', 'public, max-age=3600');

    return new NextResponse(new Uint8Array(pdfBuffer), { status: 200, headers });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao gerar PDF da revista' }, { status: 500 });
  }
}
