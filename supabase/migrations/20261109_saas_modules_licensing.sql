-- ==============================================================================
-- JHPCS (JHoston Pools Control System) - Migration SaaS Multi-Tenant & Licenciamento Modular
-- Mapeamento de Módulos, Planos de Assinatura e Licenças de Tenants
-- ==============================================================================

-- 0. Garantir existência da tabela base de tenants se ainda não existir
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    trade_name VARCHAR(255),
    document VARCHAR(30) UNIQUE, -- CPF ou CNPJ
    target_sector VARCHAR(50) NOT NULL DEFAULT 'AUTONOMO', -- 'AUTONOMO', 'FROTA', 'HOTEL_CLUBE', 'LOJA', 'FABRICANTE'
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura pública controlada de tenants" ON public.tenants FOR SELECT USING (true);
CREATE POLICY "Modificação de tenants por master" ON public.tenants FOR ALL USING (true);

-- A. Tabela de Módulos do Sistema (system_modules)
CREATE TABLE IF NOT EXISTS public.system_modules (
    id VARCHAR(50) PRIMARY KEY, -- 'pwa_field', 'stock_deduction', 'fleet_routes', 'facility_logbook', 'retail_trade', 'guarantee_audit', 'fiscal_erp'
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.system_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura de módulos do sistema" ON public.system_modules FOR SELECT USING (true);

-- B. Tabela de Planos de Assinatura (subscription_tiers)
CREATE TABLE IF NOT EXISTS public.subscription_tiers (
    id VARCHAR(50) PRIMARY KEY, -- 'solo', 'fleet', 'facility', 'retail', 'enterprise_jhoston'
    name VARCHAR(100) NOT NULL,
    target_sector VARCHAR(50) NOT NULL, -- 'AUTONOMO', 'FROTA', 'HOTEL_CLUBE', 'LOJA', 'FABRICANTE'
    base_monthly_price NUMERIC(10,2) NOT NULL,
    max_pools INT, -- Limite de piscinas (null = ilimitado)
    max_users INT, -- Limite de técnicos/operadores (null = ilimitado)
    included_modules JSONB NOT NULL, -- Array de IDs de módulos ativos no plano
    overage_pool_price NUMERIC(10,2) DEFAULT 0, -- Valor extra por piscina excedente
    overage_user_price NUMERIC(10,2) DEFAULT 0, -- Valor extra por usuário adicional
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.subscription_tiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura de planos de assinatura" ON public.subscription_tiers FOR SELECT USING (true);

-- C. Vínculo de Licença por Tenant (tenant_licenses)
CREATE TABLE IF NOT EXISTS public.tenant_licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    tier_id VARCHAR(50) REFERENCES public.subscription_tiers(id),
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('TRIAL', 'ACTIVE', 'PAST_DUE', 'SUSPENDED', 'CANCELED')),
    billing_cycle VARCHAR(20) DEFAULT 'MONTHLY' CHECK (billing_cycle IN ('MONTHLY', 'ANNUAL')),
    custom_enabled_modules JSONB DEFAULT '[]'::jsonb, -- Módulos extras contratados como add-on
    active_pools_count INT DEFAULT 0,
    active_users_count INT DEFAULT 1,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.tenant_licenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura de licenças por tenant" ON public.tenant_licenses FOR SELECT USING (true);
CREATE POLICY "Gestão de licenças" ON public.tenant_licenses FOR ALL USING (true);

-- ==============================================================================
-- CARGA DE DADOS PADRÃO (SEEDS DOS MÓDULOS E PLANOS)
-- ==============================================================================

-- 1. Inserção dos Módulos do Ecossistema
INSERT INTO public.system_modules (id, name, description, is_active) VALUES
('pwa_field', 'PWA de Campo Offline & Telemetria', 'App isolado para piscineiros com cálculo de ISL, medição química e upload de evidências no Cloudflare R2.', TRUE),
('stock_deduction', 'Baixa Estequiométrica de Químicos', 'Dedução automática do inventário de produtos químicos no veículo com base no volume tratado (m³).', TRUE),
('fleet_routes', 'Gestão de Frotas & Rotas Técnicas', 'Despacho de ordens de serviço, rastreamento por geofencing e alocação de equipes de campo.', TRUE),
('facility_logbook', 'Logbook Sanitário Digital Anvisa', 'Livro de registros de inspeções em 3 turnos para condomínios, resorts, hotéis e clubes.', TRUE),
('retail_trade', 'Receituário de Balcão & PIX Express', 'Diagnóstico da água em balcão de lojas com geração de lista de compras e checkout PIX dinâmico.', TRUE),
('guarantee_audit', 'Auditoria Forense de Garantia JHoston', 'Prontuário vitalício de revestimento monolítico com telemetria contínua e laudo pericial.', TRUE),
('fiscal_erp', 'ERP Fiscal & Faturamento NFC-e / SAT', 'Gateway corporativo para emissão de notas fiscais e controle tributário integrado (Standby).', FALSE)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    is_active = EXCLUDED.is_active;

-- 2. Inserção dos Planos de Assinatura Especializados por Setor
INSERT INTO public.subscription_tiers (id, name, target_sector, base_monthly_price, max_pools, max_users, included_modules, overage_pool_price, overage_user_price) VALUES
('solo', 'Plano SOLO (Tratador Autônomo)', 'AUTONOMO', 49.90, 30, 1, '["pwa_field"]'::jsonb, 1.50, 0.00),
('fleet', 'Plano FLEET (Frotas & Prestadoras)', 'FROTA', 189.90, 150, 5, '["pwa_field", "stock_deduction", "fleet_routes"]'::jsonb, 1.20, 25.00),
('facility', 'Plano FACILITY (Condomínios & Resorts)', 'HOTEL_CLUBE', 290.00, 10, 8, '["pwa_field", "facility_logbook"]'::jsonb, 15.00, 15.00),
('retail', 'Plano RETAIL (Lojas de Piscinas & Revendas)', 'LOJA', 149.00, 0, 3, '["retail_trade"]'::jsonb, 0.00, 20.00),
('enterprise_jhoston', 'Plano ENTERPRISE GUARANTEE (JHoston Pools)', 'FABRICANTE', 990.00, NULL, NULL, '["pwa_field", "stock_deduction", "fleet_routes", "facility_logbook", "retail_trade", "guarantee_audit"]'::jsonb, 0.00, 0.00)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    target_sector = EXCLUDED.target_sector,
    base_monthly_price = EXCLUDED.base_monthly_price,
    max_pools = EXCLUDED.max_pools,
    max_users = EXCLUDED.max_users,
    included_modules = EXCLUDED.included_modules,
    overage_pool_price = EXCLUDED.overage_pool_price,
    overage_user_price = EXCLUDED.overage_user_price;

-- 3. Tenant Demo Padrão & Licença
INSERT INTO public.tenants (id, name, trade_name, document, target_sector, contact_email, contact_phone) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'JHoston Pools & Lagoons Engenharia', 'JHoston Pools', '00.123.456/0001-00', 'FABRICANTE', 'diretoria@jhostonpools.com.br', '5511999999999')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.tenant_licenses (tenant_id, tier_id, status, billing_cycle, custom_enabled_modules, active_pools_count, active_users_count, expires_at) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'enterprise_jhoston', 'ACTIVE', 'ANNUAL', '[]'::jsonb, 42, 12, timezone('utc'::text, now() + interval '1 year'))
ON CONFLICT DO NOTHING;
