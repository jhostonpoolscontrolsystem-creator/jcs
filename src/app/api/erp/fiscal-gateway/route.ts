import { NextResponse } from 'next/server';

/**
 * Feature Flag Global para o Módulo de ERP Fiscal Completo
 * Padrão: FALSE (Em Standby / Adormecido até contratação comercial)
 */
export const IS_FISCAL_ERP_ENABLED = process.env.NEXT_PUBLIC_ENABLE_FISCAL_ERP === 'true';

export interface FiscalInvoiceRequest {
  salesOrderId: string;
  cnpjCpfBuyer: string;
  totalAmountBrl: number;
  items: Array<{
    sku: string;
    description: string;
    ncm: string;
    cfop: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export interface FiscalProviderAdapter {
  emitNFCe(data: FiscalInvoiceRequest): Promise<{ success: boolean; nfeKey?: string; xmlUrl?: string; error?: string }>;
  consultStatus(nfeKey: string): Promise<{ authorized: boolean; protocol?: string }>;
  cancelNFCe(nfeKey: string, reason: string): Promise<{ cancelled: boolean }>;
}

/**
 * Adaptador Mock em Standby (Pronto para conectar Focus NFe / PlugNotas / eNotas)
 */
export const mockFiscalProvider: FiscalProviderAdapter = {
  async emitNFCe(data) {
    if (!IS_FISCAL_ERP_ENABLED) {
      return { success: false, error: 'MÓDULO ERP FISCAL EM STANDBY. Ative a flag NEXT_PUBLIC_ENABLE_FISCAL_ERP=true.' };
    }
    const fakeKey = `3526${Date.now()}550010000000011000000010`;
    return {
      success: true,
      nfeKey: fakeKey,
      xmlUrl: `https://storage.jhpcs.com.br/xml/nfe_${fakeKey}.xml`,
    };
  },
  async consultStatus(nfeKey) {
    return { authorized: true, protocol: `135260000${Date.now().toString().slice(-6)}` };
  },
  async cancelNFCe(nfeKey, reason) {
    return { cancelled: true };
  },
};

/**
 * Rota Guardiã de ERP Fiscal: Retorna 404 / 403 se o módulo estiver adormecido
 */
export async function GET(request: Request) {
  if (!IS_FISCAL_ERP_ENABLED) {
    return NextResponse.json(
      {
        status: 'STANDBY',
        module: 'JHPCS_RETAIL_ERP_FISCAL',
        message: 'O Módulo de ERP Fiscal está em modo Standby arquitetural. Para ativá-lo, contate a engenharia para ligar a chave NEXT_PUBLIC_ENABLE_FISCAL_ERP.',
        is_active: false,
      },
      { status: 403 }
    );
  }

  return NextResponse.json({
    status: 'ACTIVE',
    module: 'JHPCS_RETAIL_ERP_FISCAL',
    provider: 'PLUGNOTAS_FOCUS_READY',
    is_active: true,
  });
}

