import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Endpoint para visualização/download do Relatório Executivo de Refatoração do PWA de Campo (c:\JHPCS-campo)
 */
export async function GET() {
  try {
    const filePath = path.resolve(process.cwd(), 'public', 'RELATORIO_REFATORACAO_PWA_CAMPO.pdf');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Relatório de refatoração do PWA ainda não gerado no servidor.' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="RELATORIO_REFATORACAO_PWA_CAMPO.pdf"',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Erro ao servir PDF do relatório de refatoração do PWA:', error);
    return NextResponse.json(
      { error: 'Erro interno ao carregar relatório em PDF.' },
      { status: 500 }
    );
  }
}

