import { NextRequest, NextResponse } from 'next/server';

export interface B2BOrder {
  id: string;
  created_at: string;
  client_id: string;
  client_name: string;
  client_phone: string;
  pool_name: string;
  location_city: string;
  location_state: string;
  items: {
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }[];
  total_amount: number;
  payment_method: 'PIX' | 'BOLETO_28D' | 'FATURADO';
  payment_status: 'PAGO' | 'AGUARDANDO_PAGAMENTO' | 'FATURADO_28D';
  shipping_status: 'PREPARANDO_ENVIO' | 'DESPACHADO' | 'ENTREGUE_CASA_MAQUINAS';
  origin_trigger: 'TELEMETRIA_RED_FLAG' | 'AVISO_PREVENTIVO_15D' | 'COMPRA_DIRETA_PORTAL';
  tracking_code?: string;
  homologated_warranty_seal: boolean;
}

// Mock inicial de pedidos para demonstração comercial em tempo real
let MOCK_ORDERS: B2BOrder[] = [
  {
    id: 'PED-2026-0891',
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    client_id: 'cli-001',
    client_name: 'Resort Terravista Trancoso',
    client_phone: '5573988881122',
    pool_name: 'Piscina Infinity Cliff (450 m³)',
    location_city: 'Porto Seguro',
    location_state: 'BA',
    items: [
      { product_name: 'Carbonato de Sódio / Barrilha Leve JH (25kg)', quantity: 6, unit_price: 155.0, subtotal: 930.0 },
      { product_name: 'Cloro Estabilizado Concentrado 65% (Balde 10kg)', quantity: 4, unit_price: 245.0, subtotal: 980.0 },
      { product_name: 'Kit Protetor Mineral - Protocolo de Cura', quantity: 2, unit_price: 320.0, subtotal: 640.0 }
    ],
    total_amount: 2550.0,
    payment_method: 'PIX',
    payment_status: 'PAGO',
    shipping_status: 'DESPACHADO',
    origin_trigger: 'TELEMETRIA_RED_FLAG',
    tracking_code: 'JTEC-BA-99412',
    homologated_warranty_seal: true
  },
  {
    id: 'PED-2026-0892',
    created_at: new Date(Date.now() - 8 * 3600000).toISOString(),
    client_id: 'cli-002',
    client_name: 'Hotel Fasano Boa Vista',
    client_phone: '5511997772233',
    pool_name: 'Piscina Olímpica Spa (220 m³)',
    location_city: 'Porto Feliz',
    location_state: 'SP',
    items: [
      { product_name: 'Bicarbonato de Sódio Puro JH (25kg)', quantity: 5, unit_price: 135.0, subtotal: 675.0 },
      { product_name: 'Cloro Estabilizado Concentrado 65% (Balde 10kg)', quantity: 3, unit_price: 245.0, subtotal: 735.0 }
    ],
    total_amount: 1410.0,
    payment_method: 'FATURADO',
    payment_status: 'FATURADO_28D',
    shipping_status: 'PREPARANDO_ENVIO',
    origin_trigger: 'AVISO_PREVENTIVO_15D',
    tracking_code: 'LOG-SP-04128',
    homologated_warranty_seal: true
  },
  {
    id: 'PED-2026-0893',
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
    client_id: 'cli-003',
    client_name: 'Condomínio Quinta da Baroneza',
    client_phone: '5511988884455',
    pool_name: 'Piscina Clubhouse Areia (320 m³)',
    location_city: 'Bragança Paulista',
    location_state: 'SP',
    items: [
      { product_name: 'Cloro Estabilizado Concentrado 65% (Balde 10kg)', quantity: 6, unit_price: 245.0, subtotal: 1470.0 },
      { product_name: 'Carbonato de Sódio / Barrilha Leve JH (25kg)', quantity: 4, unit_price: 155.0, subtotal: 620.0 }
    ],
    total_amount: 2090.0,
    payment_method: 'BOLETO_28D',
    payment_status: 'AGUARDANDO_PAGAMENTO',
    shipping_status: 'PREPARANDO_ENVIO',
    origin_trigger: 'COMPRA_DIRETA_PORTAL',
    tracking_code: 'LOG-SP-05519',
    homologated_warranty_seal: true
  }
];

/**
 * GET /api/orders/commercial
 * Retorna os pedidos da loja B2B com métricas de GMV e origem da conversão
 */
export async function GET(req: NextRequest) {
  try {
    const totalGmv = MOCK_ORDERS.reduce((acc, order) => acc + order.total_amount, 0);
    const totalOrders = MOCK_ORDERS.length;
    const paidGmv = MOCK_ORDERS.filter(o => o.payment_status === 'PAGO' || o.payment_status === 'FATURADO_28D')
      .reduce((acc, o) => acc + o.total_amount, 0);

    const redZoneConversions = MOCK_ORDERS.filter(o => o.origin_trigger === 'TELEMETRIA_RED_FLAG').length;

    return NextResponse.json({
      success: true,
      orders: MOCK_ORDERS,
      summary: {
        total_orders: totalOrders,
        total_gmv_brl: totalGmv,
        paid_gmv_brl: paidGmv,
        red_zone_conversions: redZoneConversions,
        average_ticket_brl: totalOrders > 0 ? totalGmv / totalOrders : 0
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * POST /api/orders/commercial
 * Cria ou atualiza status de pedido comercial B2B
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, order_id, new_shipping_status, new_payment_status, new_order } = body;

    if (action === 'CREATE' && new_order) {
      const orderId = `PED-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const createdOrder: B2BOrder = {
        id: orderId,
        created_at: new Date().toISOString(),
        client_id: new_order.client_id || 'cli-004',
        client_name: new_order.client_name || 'Cliente B2B',
        client_phone: new_order.client_phone || '5511999998888',
        pool_name: new_order.pool_name || 'Piscina Principal',
        location_city: new_order.location_city || 'São Paulo',
        location_state: new_order.location_state || 'SP',
        items: new_order.items || [],
        total_amount: new_order.total_amount || 0,
        payment_method: new_order.payment_method || 'PIX',
        payment_status: new_order.payment_status || 'AGUARDANDO_PAGAMENTO',
        shipping_status: 'PREPARANDO_ENVIO',
        origin_trigger: new_order.origin_trigger || 'COMPRA_DIRETA_PORTAL',
        tracking_code: `LOG-BR-${Math.floor(10000 + Math.random() * 90000)}`,
        homologated_warranty_seal: true
      };

      MOCK_ORDERS.unshift(createdOrder);
      return NextResponse.json({ success: true, order: createdOrder });
    }

    if (action === 'UPDATE_STATUS' && order_id) {
      const order = MOCK_ORDERS.find(o => o.id === order_id);
      if (order) {
        if (new_shipping_status) order.shipping_status = new_shipping_status;
        if (new_payment_status) order.payment_status = new_payment_status;
        return NextResponse.json({ success: true, order });
      }
    }

    return NextResponse.json({ error: 'Operação inválida.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
