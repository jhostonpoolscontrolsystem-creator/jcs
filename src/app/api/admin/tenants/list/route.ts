import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const MASTER_EMAILS = ['danielsmlopes@hotmail.com', 'patigrubel@gmail.com'];

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('x-user-email') || req.headers.get('authorization') || '';
    const userEmail = authHeader.replace('Bearer ', '').trim().toLowerCase();

    // Verificação de permissão MASTER
    if (!userEmail || !MASTER_EMAILS.includes(userEmail)) {
      return NextResponse.json(
        { error: 'Acesso restrito à governança MASTER.' },
        { status: 403 }
      );
    }

    // 1. Busca todos os tenants
    const { data: tenants, error: tenantsError } = await supabase
      .from('tenants')
      .select('id, name, trade_name, document, target_sector, contact_email, contact_phone, is_active, created_at')
      .order('created_at', { ascending: false });

    // Fallback se tabela não responder ou em ambiente sem conexão direta Supabase
    const fallbackTenants = [
      {
        id: '11111111-0000-0000-0000-000000000001',
        name: 'AcquaClean Tratador Autônomo',
        trade_name: 'AcquaClean Solo',
        document: '11.111.111/0001-01',
        target_sector: 'AUTONOMO',
        contact_email: 'teste.solo@teste.com',
        contact_phone: '5511988880001',
        is_active: true,
      },
      {
        id: '22222222-0000-0000-0000-000000000002',
        name: 'PoolMaster Serviços & Frotas',
        trade_name: 'PoolMaster Frotas',
        document: '22.222.222/0001-02',
        target_sector: 'FROTA',
        contact_email: 'teste.frota@teste.com',
        contact_phone: '5511988880002',
        is_active: true,
      },
      {
        id: '33333333-0000-0000-0000-000000000003',
        name: 'Resort & Spa Vista Bela',
        trade_name: 'Resort Vista Bela',
        document: '33.333.333/0001-03',
        target_sector: 'HOTEL_CLUBE',
        contact_email: 'teste.facility@teste.com',
        contact_phone: '5511988880003',
        is_active: true,
      },
      {
        id: '44444444-0000-0000-0000-000000000004',
        name: 'AcquaShop Químicos & Acessórios',
        trade_name: 'AcquaShop Balcão',
        document: '44.444.444/0001-04',
        target_sector: 'LOJA',
        contact_email: 'teste.loja@teste.com',
        contact_phone: '5511988880004',
        is_active: true,
      },
      {
        id: '55555555-0000-0000-0000-000000000005',
        name: 'Jhoston Pools & Lagoons (Auditoria)',
        trade_name: 'Jhoston Engenharia',
        document: '55.555.555/0001-05',
        target_sector: 'FABRICANTE',
        contact_email: 'teste.jhoston@teste.com',
        contact_phone: '5511988880005',
        is_active: true,
      },
    ];

    const tenantList = (tenants && tenants.length > 0) ? tenants : fallbackTenants;

    // 2. Busca tenant_settings com instâncias de WhatsApp
    const { data: settings } = await supabase
      .from('tenant_settings')
      .select('tenant_id, whatsapp_instance_name, whatsapp_instance_status, whatsapp_connected_number');

    const settingsMap = new Map<string, any>();
    if (settings) {
      settings.forEach((s) => settingsMap.set(s.tenant_id, s));
    }

    const enriched = tenantList.map((t) => {
      const s = settingsMap.get(t.id);
      return {
        ...t,
        whatsapp_instance_name: s?.whatsapp_instance_name || null,
        whatsapp_instance_status: s?.whatsapp_instance_status || 'DISCONNECTED',
        whatsapp_connected_number: s?.whatsapp_connected_number || null,
      };
    });

    return NextResponse.json({ success: true, tenants: enriched });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao carregar tenants.' }, { status: 500 });
  }
}

