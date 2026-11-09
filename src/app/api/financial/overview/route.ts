import { NextRequest, NextResponse } from 'next/server';

interface ContractData {
  id: string;
  client_name: string;
  client_phone_masked: string;
  monthly_fee: number;
  billing_day: number;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELED';
  assigned_technician_name?: string;
  visits_this_month?: number;
  commission_accumulated?: number;
}

interface FinancialEntryData {
  id: string;
  entry_type: 'RECEITA' | 'DESPESA';
  category: string;
  description: string;
  amount: number;
  due_date: string;
  paid_at: string | null;
  payment_status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELED';
  payment_method: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get('tenant_id') || 'demo-fleet';
    const tierId = searchParams.get('tier_id') || 'fleet';

    // Se for FACILITY (Hotéis/Condomínios), bloqueio estrito total
    if (tierId === 'facility' || tenantId === 'demo-facility') {
      return NextResponse.json(
        { error: 'Acesso Proibido: O Plano FACILITY não possui permissão para o módulo financeiro.' },
        { status: 403 }
      );
    }

    const contracts: ContractData[] = [
      {
        id: 'c-1',
        client_name: 'Dr. Carlos Eduardo (Vinil 45m³)',
        client_phone_masked: '(11) 9****-**45',
        monthly_fee: 380.00,
        billing_day: 5,
        status: 'ACTIVE',
        assigned_technician_name: 'Carlos Tratador',
        visits_this_month: 4,
        commission_accumulated: 140.00,
      },
      {
        id: 'c-2',
        client_name: 'Dra. Mariana Prado (Fibra 32m³)',
        client_phone_masked: '(11) 9****-**88',
        monthly_fee: 320.00,
        billing_day: 10,
        status: 'ACTIVE',
        assigned_technician_name: 'Carlos Tratador',
        visits_this_month: 4,
        commission_accumulated: 120.00,
      },
      {
        id: 'c-3',
        client_name: 'Sérgio Mendes (Alvenaria 60m³)',
        client_phone_masked: '(11) 9****-**12',
        monthly_fee: 450.00,
        billing_day: 15,
        status: 'ACTIVE',
        assigned_technician_name: 'João Técnico',
        visits_this_month: 3,
        commission_accumulated: 105.00,
      },
      {
        id: 'c-4',
        client_name: 'Condomínio Reserva das Palmeiras',
        client_phone_masked: '(11) 9****-**90',
        monthly_fee: 1200.00,
        billing_day: 1,
        status: 'ACTIVE',
        assigned_technician_name: 'João Técnico',
        visits_this_month: 8,
        commission_accumulated: 280.00,
      },
    ];

    const entries: FinancialEntryData[] = [
      {
        id: 'e-1',
        entry_type: 'RECEITA',
        category: 'MENSALIDADE',
        description: 'Mensalidade Dr. Carlos Eduardo',
        amount: 380.00,
        due_date: '2026-11-05',
        paid_at: '2026-11-05T10:15:00Z',
        payment_status: 'PAID',
        payment_method: 'PIX',
      },
      {
        id: 'e-2',
        entry_type: 'RECEITA',
        category: 'MENSALIDADE',
        description: 'Mensalidade Dra. Mariana Prado',
        amount: 320.00,
        due_date: '2026-11-10',
        paid_at: null,
        payment_status: 'PENDING',
        payment_method: 'PIX',
      },
      {
        id: 'e-3',
        entry_type: 'RECEITA',
        category: 'MENSALIDADE',
        description: 'Mensalidade Sérgio Mendes',
        amount: 450.00,
        due_date: '2026-11-01',
        paid_at: null,
        payment_status: 'OVERDUE',
        payment_method: 'PIX',
      },
      {
        id: 'e-4',
        entry_type: 'RECEITA',
        category: 'MENSALIDADE',
        description: 'Mensalidade Condomínio Reserva',
        amount: 1200.00,
        due_date: '2026-11-01',
        paid_at: '2026-11-01T08:30:00Z',
        payment_status: 'PAID',
        payment_method: 'PIX',
      },
      {
        id: 'e-5',
        entry_type: 'DESPESA',
        category: 'COMPRA_QUIMICOS',
        description: 'Lote 10 Baldes Dicloro 10kg',
        amount: 1450.00,
        due_date: '2026-11-04',
        paid_at: '2026-11-04T14:20:00Z',
        payment_status: 'PAID',
        payment_method: 'PIX',
      },
      {
        id: 'e-6',
        entry_type: 'DESPESA',
        category: 'COMBUSTIVEL',
        description: 'Abastecimento Frotas Semana 1',
        amount: 380.00,
        due_date: '2026-11-07',
        paid_at: '2026-11-07T18:00:00Z',
        payment_status: 'PAID',
        payment_method: 'CARTAO_CREDITO',
      },
      {
        id: 'e-7',
        entry_type: 'DESPESA',
        category: 'MANUTENCAO_BOMBAS',
        description: 'Troca de Selo Mecânico Bomba 2CV',
        amount: 220.00,
        due_date: '2026-11-12',
        paid_at: null,
        payment_status: 'PENDING',
        payment_method: 'PIX',
      },
    ];

    const technicians = [
      {
        id: 't-1',
        name: 'Carlos Tratador',
        role: 'Técnico Especialista',
        completed_visits: 18,
        commission_rate: 35.00,
        commission_total: 630.00,
        status: 'PENDING_PAYMENT',
      },
      {
        id: 't-2',
        name: 'João Técnico',
        role: 'Técnico de Rota',
        completed_visits: 14,
        commission_rate: 30.00,
        commission_total: 420.00,
        status: 'PAID',
      },
    ];

    return NextResponse.json({
      success: true,
      contracts,
      entries,
      technicians,
      pix_key_configured: '11.111.111/0001-01',
      fiscal_standby: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

