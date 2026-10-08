import { NextResponse } from 'next/server';
import { generateExecutiveWelcomeKitPdf } from '@/lib/executive-magazine-pdf';
import { supabase } from '@/lib/supabase';
import { mockPools } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      editionNumber = 1,
      editionMonth = 'Edição Especial de Lançamento',
      editionYear = 2026,
      recipientName = 'Diretoria JHoston Pools & Engenharia',
      targetRole = 'DIRETORIA_JHOSTON'
    } = body;

    // Busca métricas reais do banco Supabase
    let totalPools = 128;
    let normalPools = 120;
    let activeCures = 14;
    let redZones = 3;

    try {
      const { data: dbPools } = await supabase.from('pools').select('*');
      if (dbPools && dbPools.length > 0) {
        totalPools = dbPools.length;
        normalPools = dbPools.filter(p => p.status === 'NORMAL').length;
        activeCures = dbPools.filter(p => p.status === 'DRY_CURE' || p.status === 'SUBMERGED_CURE').length;
        redZones = dbPools.filter(p => p.status === 'RED_ZONE').length;
      }
    } catch (e) {
      // Fallback
    }

    const conformityRate = totalPools > 0 ? Number(((normalPools / totalPools) * 100).toFixed(1)) : 94.2;

    const doc = generateExecutiveWelcomeKitPdf({
      editionNumber,
      editionMonth,
      editionYear,
      recipientName,
      targetRole,
      metrics: {
        totalPools,
        conformityRate,
        activeCures,
        redZones,
        avgLsi: 0.08,
      }
    });

    const pdfBuffer = doc.output('arraybuffer');

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="JHPCS_Revista_Executiva_Edicao_${editionNumber}.pdf"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao gerar PDF da Revista' }, { status: 500 });
  }
}
