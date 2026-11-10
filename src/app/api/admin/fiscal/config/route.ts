import { NextRequest, NextResponse } from 'next/server';

const MASTER_EMAILS = ['danielsmlopes@hotmail.com', 'patigrubel@gmail.com'];

export interface TenantFiscalState {
  tenantId: string;
  isFiscalEnabled: boolean; // Chave mestre de liberação Super Admin
  environment: 'HOMOLOGATION' | 'PRODUCTION';
  certificateStatus: 'NOT_CONFIGURED' | 'VALID' | 'EXPIRED';
  autoEmitOnPayment: boolean; // Emissão automática ao confirmar PIX
  defaultNfeCfop: string; // Ex: 5102 ou 5405
  defaultNfseCode: string; // Ex: 07.10 (LC 116/03)
  issTaxRate: number; // Ex: 3.5%
  updatedAt: string;
  updatedBy: string;
}

// Armazenamento em memória para demonstração / runtime local
let fiscalStateStore: Record<string, TenantFiscalState> = {
  '11111111-0000-0000-0000-000000000001': {
    tenantId: '11111111-0000-0000-0000-000000000001',
    isFiscalEnabled: false,
    environment: 'HOMOLOGATION',
    certificateStatus: 'NOT_CONFIGURED',
    autoEmitOnPayment: false,
    defaultNfeCfop: '5102',
    defaultNfseCode: '07.10',
    issTaxRate: 3.0,
    updatedAt: new Date().toISOString(),
    updatedBy: 'MASTER',
  },
  '22222222-0000-0000-0000-000000000002': {
    tenantId: '22222222-0000-0000-0000-000000000002',
    isFiscalEnabled: false,
    environment: 'HOMOLOGATION',
    certificateStatus: 'NOT_CONFIGURED',
    autoEmitOnPayment: false,
    defaultNfeCfop: '5405',
    defaultNfseCode: '07.10',
    issTaxRate: 3.5,
    updatedAt: new Date().toISOString(),
    updatedBy: 'MASTER',
  },
  '44444444-0000-0000-0000-000000000004': {
    tenantId: '44444444-0000-0000-0000-000000000004',
    isFiscalEnabled: false,
    environment: 'HOMOLOGATION',
    certificateStatus: 'NOT_CONFIGURED',
    autoEmitOnPayment: false,
    defaultNfeCfop: '5102',
    defaultNfseCode: '07.10',
    issTaxRate: 4.0,
    updatedAt: new Date().toISOString(),
    updatedBy: 'MASTER',
  },
  'tenant_demo': {
    tenantId: 'tenant_demo',
    isFiscalEnabled: false,
    environment: 'HOMOLOGATION',
    certificateStatus: 'NOT_CONFIGURED',
    autoEmitOnPayment: false,
    defaultNfeCfop: '5102',
    defaultNfseCode: '07.10',
    issTaxRate: 3.0,
    updatedAt: new Date().toISOString(),
    updatedBy: 'MASTER',
  }
};

/**
 * Consulta a configuração fiscal de um tenant específico ou lista global
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get('tenant_id');

    if (tenantId) {
      const state = fiscalStateStore[tenantId] || {
        tenantId,
        isFiscalEnabled: false,
        environment: 'HOMOLOGATION',
        certificateStatus: 'NOT_CONFIGURED',
        autoEmitOnPayment: false,
        defaultNfeCfop: '5102',
        defaultNfseCode: '07.10',
        issTaxRate: 3.0,
        updatedAt: new Date().toISOString(),
        updatedBy: 'SYSTEM',
      };
      return NextResponse.json({ success: true, fiscalConfig: state });
    }

    return NextResponse.json({
      success: true,
      fiscalConfigs: fiscalStateStore,
      masterEmails: MASTER_EMAILS,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Erro ao consultar configuração fiscal' },
      { status: 500 }
    );
  }
}

/**
 * Super Admin ativa, desativa ou ajusta parâmetros fiscais de qualquer Tenant
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('x-user-email') || req.headers.get('authorization') || '';
    const userEmail = authHeader.replace('Bearer ', '').trim().toLowerCase();

    // Verificação estrita de Super Usuário Master
    const isMaster = MASTER_EMAILS.includes(userEmail) || userEmail === 'danielsmlopes@hotmail.com';
    if (!isMaster) {
      return NextResponse.json(
        { error: 'Apenas a Governança SUPER ADMIN (Daniel Lopes / Patrícia Grübel) pode alterar a chave fiscal de tenants.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { 
      tenantId, 
      isFiscalEnabled, 
      environment = 'HOMOLOGATION',
      autoEmitOnPayment = false,
      defaultNfeCfop = '5102',
      defaultNfseCode = '07.10',
      issTaxRate = 3.0,
    } = body;

    if (!tenantId) {
      return NextResponse.json({ error: 'tenantId é obrigatório' }, { status: 400 });
    }

    const previous = fiscalStateStore[tenantId] || {
      tenantId,
      certificateStatus: 'NOT_CONFIGURED',
    };

    const updatedState: TenantFiscalState = {
      ...previous,
      tenantId,
      isFiscalEnabled: Boolean(isFiscalEnabled),
      environment: environment === 'PRODUCTION' ? 'PRODUCTION' : 'HOMOLOGATION',
      autoEmitOnPayment: Boolean(autoEmitOnPayment),
      defaultNfeCfop: defaultNfeCfop || '5102',
      defaultNfseCode: defaultNfseCode || '07.10',
      issTaxRate: Number(issTaxRate) || 3.0,
      updatedAt: new Date().toISOString(),
      updatedBy: userEmail || 'MASTER',
    };

    fiscalStateStore[tenantId] = updatedState;

    return NextResponse.json({
      success: true,
      message: `Chave fiscal para o tenant ${tenantId} atualizada com sucesso: ${updatedState.isFiscalEnabled ? 'LIBERADA' : 'BLOQUEADA'} (${updatedState.environment})`,
      fiscalConfig: updatedState,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Erro ao processar chave fiscal' },
      { status: 500 }
    );
  }
}
