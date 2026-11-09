-- ==============================================================================
-- JHPCS - Migration de Ambientes Demo Multi-Setor & Stored Procedure de Auto-Reset
-- Ambientes de Vendas / Testes para os 5 Perfis de Mercado (Solo, Fleet, Facility, Retail, Enterprise)
-- ==============================================================================

-- 1. Criação dos 5 Tenants de Demonstração
INSERT INTO public.tenants (id, name, trade_name, document, target_sector, contact_email, contact_phone, is_active)
VALUES
  ('11111111-0000-0000-0000-000000000001', 'AcquaClean Tratador Autônomo', 'AcquaClean Solo', '11.111.111/0001-01', 'AUTONOMO', 'teste.solo@teste.com', '5511988880001', TRUE),
  ('22222222-0000-0000-0000-000000000002', 'PoolMaster Serviços & Frotas', 'PoolMaster Frotas', '22.222.222/0001-02', 'FROTA', 'teste.frota@teste.com', '5511988880002', TRUE),
  ('33333333-0000-0000-0000-000000000003', 'Resort & Spa Vista Bela', 'Resort Vista Bela', '33.333.333/0001-03', 'HOTEL_CLUBE', 'teste.facility@teste.com', '5511988880003', TRUE),
  ('44444444-0000-0000-0000-000000000004', 'AcquaShop Químicos & Acessórios', 'AcquaShop Balcão', '44.444.444/0001-04', 'LOJA', 'teste.loja@teste.com', '5511988880004', TRUE),
  ('55555555-0000-0000-0000-000000000005', 'Jhoston Pools & Lagoons (Auditoria)', 'Jhoston Engenharia', '55.555.555/0001-05', 'FABRICANTE', 'teste.jhoston@teste.com', '5511988880005', TRUE)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  trade_name = EXCLUDED.trade_name,
  target_sector = EXCLUDED.target_sector,
  contact_email = EXCLUDED.contact_email;

-- 2. Vínculo de Licença Ativa para cada Tenant de Demonstração
INSERT INTO public.tenant_licenses (tenant_id, tier_id, status, billing_cycle, custom_enabled_modules, active_pools_count, active_users_count, expires_at)
VALUES
  ('11111111-0000-0000-0000-000000000001', 'solo', 'ACTIVE', 'MONTHLY', '[]'::jsonb, 18, 1, timezone('utc'::text, now() + interval '30 days')),
  ('22222222-0000-0000-0000-000000000002', 'fleet', 'ACTIVE', 'MONTHLY', '[]'::jsonb, 84, 4, timezone('utc'::text, now() + interval '30 days')),
  ('33333333-0000-0000-0000-000000000003', 'facility', 'ACTIVE', 'MONTHLY', '[]'::jsonb, 3, 6, timezone('utc'::text, now() + interval '30 days')),
  ('44444444-0000-0000-0000-000000000004', 'retail', 'ACTIVE', 'MONTHLY', '[]'::jsonb, 0, 2, timezone('utc'::text, now() + interval '30 days')),
  ('55555555-0000-0000-0000-000000000005', 'enterprise_jhoston', 'ACTIVE', 'ANNUAL', '[]'::jsonb, 45, 10, timezone('utc'::text, now() + interval '1 year'))
ON CONFLICT DO NOTHING;

-- 3. Criação dos Usuários de Demonstração (Senha mockada aceita no fallback: teste123)
INSERT INTO public.users (id, name, email, role, status)
VALUES
  ('11111111-1111-1111-1111-000000000001', 'Carlos Tratador (Demo Solo)', 'teste.solo@teste.com', 'PISCINEIRO', 'ACTIVE'),
  ('22222222-2222-2222-2222-000000000002', 'Marcos Gerente (Demo Frota)', 'teste.frota@teste.com', 'GERENCIA_CLI', 'ACTIVE'),
  ('33333333-3333-3333-3333-000000000003', 'Renata Governança (Demo Facility)', 'teste.facility@teste.com', 'TECNICO_CLI', 'ACTIVE'),
  ('44444444-4444-4444-4444-000000000004', 'Lucas Balcão (Demo Loja)', 'teste.loja@teste.com', 'TECNICO_CLI', 'ACTIVE'),
  ('55555555-5555-5555-5555-000000000005', 'Eng. Pericial Jhoston (Demo Enterprise)', 'teste.jhoston@teste.com', 'DIRETORIA_JH', 'ACTIVE')
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  status = EXCLUDED.status;

-- 4. Tabela de Estoque Volante (Veículos/Caminhonetes da Frota)
CREATE TABLE IF NOT EXISTS public.technician_truck_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  technician_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  vehicle_plate VARCHAR(20) NOT NULL,
  chemical_name VARCHAR(100) NOT NULL,
  chemical_type VARCHAR(50) NOT NULL, -- 'CLORO_GRANULADO', 'BARRILHA', 'SULFATO_ALUMINIO', 'ALGICIDA'
  quantity_kg_or_l NUMERIC(10,2) NOT NULL,
  min_alert_quantity NUMERIC(10,2) DEFAULT 5.0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.technician_truck_inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Acesso estoque caminhonete" ON public.technician_truck_inventory FOR ALL USING (true);

-- 5. Piscinas Mockadas para os Ambientes de Vendas
INSERT INTO public.pools (id, client_id, name, volume_m3, gps_lat, gps_lng, status)
VALUES
  -- Solo
  ('aaaa0001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-000000000001', 'Casa Família Silva (Vinil 45m³)', 45.0, -23.55052, -46.633308, 'NORMAL'),
  ('aaaa0001-0000-0000-0000-000000000002', '11111111-1111-1111-1111-000000000001', 'Chácara das Flores (Fibra 32m³)', 32.0, -23.55152, -46.634308, 'NORMAL'),
  -- Frota
  ('aaaa0002-0000-0000-0000-000000000001', '22222222-2222-2222-2222-000000000002', 'Condomínio Alphaville Rota 1 (Alvenaria Pastilhada 120m³)', 120.0, -23.4900, -46.8500, 'NORMAL'),
  ('aaaa0002-0000-0000-0000-000000000002', '22222222-2222-2222-2222-000000000002', 'Academia Aquafit Rota 1 (Fibra Comercial 80m³)', 80.0, -23.4950, -46.8520, 'NORMAL'),
  -- Facility (Resort)
  ('aaaa0003-0000-0000-0000-000000000001', '33333333-3333-3333-3333-000000000003', 'Piscina Olímpica Central - Resort Vista Bela (350m³)', 350.0, -23.56168, -46.65598, 'NORMAL'),
  ('aaaa0003-0000-0000-0000-000000000002', '33333333-3333-3333-3333-000000000003', 'Piscina Infantil Aquecida (40m³)', 40.0, -23.56190, -46.65580, 'NORMAL'),
  -- Enterprise Jhoston (Garantia Decenal Ativa com Anomalia Proposital para pitch pericial)
  ('aaaa0005-0000-0000-0000-000000000001', '55555555-5555-5555-5555-000000000005', 'Residência Granja Viana (Monolítico Sand Jhoston 95m³)', 95.0, -23.5900, -46.8300, 'NORMAL'),
  ('aaaa0005-0000-0000-0000-000000000002', '55555555-5555-5555-5555-000000000005', 'Mansão Quinta da Baroneza (Monolítico Sand Jhoston 210m³)', 210.0, -22.9800, -46.7200, 'RED_ZONE')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  volume_m3 = EXCLUDED.volume_m3,
  status = EXCLUDED.status;

-- 6. Estoque Volante Inicial da Frota
INSERT INTO public.technician_truck_inventory (tenant_id, technician_id, vehicle_plate, chemical_name, chemical_type, quantity_kg_or_l, min_alert_quantity)
VALUES
  ('22222222-0000-0000-0000-000000000002', '22222222-2222-2222-2222-000000000002', 'BRA-2026', 'Dicloro Granulado Puro 60%', 'CLORO_GRANULADO', 45.0, 10.0),
  ('22222222-0000-0000-0000-000000000002', '22222222-2222-2222-2222-000000000002', 'BRA-2026', 'Barrilha Leve Alcalinizante', 'BARRILHA', 30.0, 10.0),
  ('22222222-0000-0000-0000-000000000002', '22222222-2222-2222-2222-000000000002', 'BRA-2026', 'Algicida de Manutenção Isento de Cobre', 'ALGICIDA', 18.0, 5.0)
ON CONFLICT DO NOTHING;

-- 7. Histórico Pericial com Anomalia Proposital (Contestação Jhoston)
INSERT INTO public.maintenance_logs (id, pool_id, maintainer_id, log_date, ph, chlorine_ppm, alkalinity_ppm, acid_product_used, brushed_surface, backwashed_filter, liability_accepted, is_audit_flagged, flag_reason, audit_result)
VALUES
  (
    'bbbb0005-0000-0000-0000-000000000001',
    'aaaa0005-0000-0000-0000-000000000002',
    '55555555-5555-5555-5555-000000000005',
    timezone('utc'::text, now() - interval '2 days'),
    6.4,
    4.5,
    30,
    TRUE,
    FALSE,
    TRUE,
    TRUE,
    TRUE,
    'VIOLAÇÃO GRAVE DE GARANTIA: Aplicação de Ácido Muriático e ISL = -0.72 (Água Ácida Corrosiva sobre Revestimento Monolítico Sand).',
    '{"isl": -0.72, "status": "RED_ZONE", "action_required": "SUSPENSÃO DA GARANTIA DECENAL"}'::jsonb
  )
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 8. STORED PROCEDURE DE AUTO-RESET INSTANTÂNEO (fn_reset_demo_tenant_data)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.fn_reset_demo_tenant_data(p_email VARCHAR)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_tenant_id UUID;
  v_user_id UUID;
  v_records_cleaned INT := 0;
BEGIN
  -- 1. Identifica usuário demo
  SELECT id INTO v_user_id FROM public.users WHERE email = LOWER(TRIM(p_email));
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Usuário demo não encontrado.');
  END IF;

  -- 2. Limpa registros criados durante a sessão de teste
  -- Remove logs de manutenção recentes (menos de 6 horas) que não sejam os mockados padrão
  DELETE FROM public.maintenance_logs
  WHERE maintainer_id = v_user_id 
    AND id != 'bbbb0005-0000-0000-0000-000000000001'
    AND log_date >= (timezone('utc'::text, now()) - interval '6 hours');
  GET DIAGNOSTICS v_records_cleaned = ROW_COUNT;

  -- 3. Restaura estoques volantes para as quantidades padrão (45kg cloro, 30kg barrilha, 18L algicida)
  UPDATE public.technician_truck_inventory
  SET quantity_kg_or_l = CASE 
    WHEN chemical_type = 'CLORO_GRANULADO' THEN 45.0
    WHEN chemical_type = 'BARRILHA' THEN 30.0
    ELSE 18.0
  END,
  updated_at = timezone('utc'::text, now())
  WHERE technician_id = v_user_id;

  -- 4. Restaura status da piscina anômala da Jhoston
  UPDATE public.pools
  SET status = 'RED_ZONE'
  WHERE id = 'aaaa0005-0000-0000-0000-000000000002';

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Ambiente de demonstração restaurado para o estado inicial de fábrica com sucesso.',
    'email', p_email,
    'records_cleaned', v_records_cleaned,
    'reset_at', timezone('utc'::text, now())
  );
END;
$$;

