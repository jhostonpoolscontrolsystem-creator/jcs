import { NextRequest, NextResponse } from 'next/server';
import { 
  JHPCSFiscalEngine, 
  NFeEmissionPayload, 
  NFSeEmissionPayload, 
  FiscalEnvironment 
} from '@/lib/fiscal/fiscalEngine';

/**
 * Endpoint Unificado para Emissão e Consulta de NF-e e NFS-e
 * Permite alternar entre ambiente de HOMOLOGAÇÃO e PRODUÇÃO.
 * Permanece em STANDBY controlado por NEXT_PUBLIC_ENABLE_FISCAL_ERP.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type = 'NFE', environment = 'HOMOLOGATION', payload } = body;

    if (!payload) {
      return NextResponse.json({ error: 'Payload da nota fiscal não informado.' }, { status: 400 });
    }

    const engine = new JHPCSFiscalEngine(environment as FiscalEnvironment);

    if (type === 'NFE') {
      const result = await engine.emitNFe(payload as NFeEmissionPayload);
      return NextResponse.json(result, { status: result.success ? 200 : 422 });
    } else if (type === 'NFSE') {
      const result = await engine.emitNFSe(payload as NFSeEmissionPayload);
      return NextResponse.json(result, { status: result.success ? 200 : 422 });
    } else {
      return NextResponse.json({ error: 'Tipo de documento fiscal inválido. Use NFE ou NFSE.' }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao processar documento fiscal.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_FISCAL_ERP === 'true';

  return NextResponse.json({
    status: isEnabled ? 'ACTIVE' : 'STANDBY',
    module: 'JHPCS_FISCAL_ENGINE_NFE_NFSE',
    supportedInvoices: ['NF-e (Produtos & Químicos)', 'NFS-e (Serviços & Manutenção)'],
    supportedEnvironments: ['HOMOLOGATION (Homologação / Teste Sefaz)', 'PRODUCTION (Produção com Validade Jurídica)'],
    isStandby: !isEnabled,
    notice: !isEnabled 
      ? 'Módulo em Standby Arquitetural. Desenvolvido e validado para ativação sob demanda comercial.' 
      : 'Módulo de Emissão Fiscal Ativo.',
    timestamp: new Date().toISOString()
  });
}
