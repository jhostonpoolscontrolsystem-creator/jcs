import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    let pdfPath = path.resolve(process.cwd(), 'public', 'LAUDO_ESTABILIDADE_SISTEMA_JHPCS_v2.pdf');
    if (!fs.existsSync(pdfPath)) {
      pdfPath = path.resolve(process.cwd(), 'public', 'LAUDO_ESTABILIDADE_SISTEMA_JHPCS.pdf');
    }

    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json({ error: 'Laudo ainda não gerado. Execute scripts/run-system-audit.mjs' }, { status: 404 });
    }

    const pdfBuffer = fs.readFileSync(pdfPath);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="LAUDO_ESTABILIDADE_SISTEMA_JHPCS.pdf"',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

