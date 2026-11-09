import { NextRequest, NextResponse } from 'next/server';

interface PoolSealInfo {
  pool_id: string;
  pool_name: string;
  facility_name: string;
  facility_type: 'RESORT' | 'HOTEL' | 'CONDOMINIO' | 'CLUBE' | 'RESIDENCIAL';
  city_uf: string;
  status: 'AUDITADA_EM_CONFORMIDADE' | 'ALERTA_PREVENTIVO' | 'INTERDITADA';
  last_audit_date: string;
  last_ph: number;
  last_free_chlorine: number;
  last_water_clarity: string;
  last_temperature_c: number;
  bather_safety_index: number; // 0 a 100
  is_jhoston_guaranteed: boolean;
  warranty_code?: string;
  anvisa_rdc_compliant: boolean;
  auditor_responsible: string;
  auditor_council_id: string; // Ex: CRQ / CREA
  qr_code_verify_url: string;
}

const MOCK_SEAL_DATA: Record<string, PoolSealInfo> = {
  'resort-vista-bela': {
    pool_id: 'resort-vista-bela',
    pool_name: 'Piscina Olímpica Central Panorâmica',
    facility_name: 'Resort & Spa Vista Bela',
    facility_type: 'RESORT',
    city_uf: 'Campinas / SP',
    status: 'AUDITADA_EM_CONFORMIDADE',
    last_audit_date: new Date().toISOString(),
    last_ph: 7.4,
    last_free_chlorine: 2.2,
    last_water_clarity: 'Cristalina (Padrão A - NBR 10.818)',
    last_temperature_c: 28.5,
    bather_safety_index: 98,
    is_jhoston_guaranteed: true,
    warranty_code: 'JH-2026-DECENAL-084',
    anvisa_rdc_compliant: true,
    auditor_responsible: 'Eng. Pericial JHoston Pools & Lagoons',
    auditor_council_id: 'CREA-SP 5069812-D / CRQ-IV 042618',
    qr_code_verify_url: 'https://jhpcs.vercel.app/selo/resort-vista-bela',
  },
  'alphaville-clube': {
    pool_id: 'alphaville-clube',
    pool_name: 'Parque Aquático das Palmeiras',
    facility_name: 'Condomínio Residencial Alphaville 1',
    facility_type: 'CONDOMINIO',
    city_uf: 'Barueri / SP',
    status: 'AUDITADA_EM_CONFORMIDADE',
    last_audit_date: new Date().toISOString(),
    last_ph: 7.3,
    last_free_chlorine: 2.0,
    last_water_clarity: 'Cristalina (Padrão A - NBR 10.818)',
    last_temperature_c: 27.0,
    bather_safety_index: 96,
    is_jhoston_guaranteed: true,
    warranty_code: 'JH-2025-DECENAL-019',
    anvisa_rdc_compliant: true,
    auditor_responsible: 'Auditoria Química Digital JHPCS',
    auditor_council_id: 'CRQ-IV 042618',
    qr_code_verify_url: 'https://jhpcs.vercel.app/selo/alphaville-clube',
  },
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const poolId = searchParams.get('pool_id') || 'resort-vista-bela';

    const sealInfo = MOCK_SEAL_DATA[poolId] || {
      ...MOCK_SEAL_DATA['resort-vista-bela'],
      pool_id: poolId,
      pool_name: `Parque Aquático Homologado (${poolId})`,
      facility_name: 'Complexo Hoteleiro & Condomínio',
      last_audit_date: new Date().toISOString(),
      qr_code_verify_url: `https://jhpcs.vercel.app/selo/${encodeURIComponent(poolId)}`,
    };

    return NextResponse.json({
      success: true,
      seal: sealInfo,
      generated_at: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Falha ao buscar selo digital' },
      { status: 500 }
    );
  }
}

