import { NextResponse } from 'next/server';
import { generateLuxuryCompendiumPdf } from '@/lib/luxury-compendium-pdf';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const download = searchParams.get('download') === 'true';

    const doc = generateLuxuryCompendiumPdf();
    const pdfBuffer = doc.output('arraybuffer');

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');

    const filename = 'JHPCS_Revista_Executiva_Edicao_Unica_2026.pdf';
    if (download) {
      headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    } else {
      headers.set('Content-Disposition', `inline; filename="${filename}"`);
    }

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers
    });
  } catch (error: any) {
    console.error('Erro ao gerar Revista Compêndio Executivo JHPCS:', error);
    return NextResponse.json(
      { error: 'Falha ao compilar Compêndio Executivo de Luxo em PDF', details: error?.message },
      { status: 500 }
    );
  }
}
