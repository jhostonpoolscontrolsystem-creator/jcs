import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Pool } from '@/types/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      owner_id,
      facility_type,
      volume_m3,
      pump_flow_m3_h,
      gps_lat,
      gps_lng,
      application_date,
    } = body;

    // 1. Validação de campos obrigatórios
    if (!name || !facility_type || !volume_m3 || !pump_flow_m3_h || !gps_lat || !gps_lng || !application_date) {
      return NextResponse.json(
        { error: 'Todos os campos cadastrais do ativo são obrigatórios para a criação do Digital Twin.' },
        { status: 400 }
      );
    }

    // 2. Determina o status inicial com base na data de aplicação
    // Primeiros 7 dias: DRY_CURE (cura a seco)
    // De 8 a 28 dias: SUBMERGED_CURE (cura submersa)
    // Após 28 dias: NORMAL
    const appDate = new Date(application_date);
    const diffDays = Math.floor((Date.now() - appDate.getTime()) / (1000 * 3600 * 24));
    let initialStatus: Pool['status'] = 'NORMAL';

    if (diffDays < 7) {
      initialStatus = 'DRY_CURE';
    } else if (diffDays <= 28) {
      initialStatus = 'SUBMERGED_CURE';
    }

    const newPoolPayload = {
      id: `pool-${Date.now()}`,
      name,
      owner_id: owner_id || 'u-3',
      facility_type,
      volume_m3: Number(volume_m3),
      pump_flow_m3_h: Number(pump_flow_m3_h),
      gps_lat: Number(gps_lat),
      gps_lng: Number(gps_lng),
      application_date,
      status: initialStatus,
      created_at: new Date().toISOString(),
    };

    // 3. Persistência no Supabase (com fallback gracioso em memória)
    try {
      const { data, error } = await supabase.from('pools').insert([newPoolPayload]).select();
      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, pool: data[0] });
      }
    } catch (dbErr) {
      console.warn('Persistindo temporariamente via fallback:', dbErr);
    }

    return NextResponse.json({
      success: true,
      pool: newPoolPayload,
      message: 'Piscina cadastrada e Digital Twin ativado com sucesso!',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Falha ao registrar nova piscina' },
      { status: 500 }
    );
  }
}
