-- ==============================================================================
-- JHPCS FINANCEIRO - Módulo de Gestão Financeira, Contratos e Comissões
-- Multi-Tenant, Isolamento RLS e Standby Fiscal (NFC-e / NFS-e)
-- ==============================================================================

-- A. Tabela de Contratos de Mensalidade Recorrente (financial_contracts)
CREATE TABLE IF NOT EXISTS public.financial_contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_phone_masked VARCHAR(50), -- Mascarado via LGPD para auditores
    pool_id UUID REFERENCES public.pools(id) ON DELETE SET NULL,
    monthly_fee NUMERIC(10,2) NOT NULL,
    billing_day INT NOT NULL DEFAULT 5 CHECK (billing_day BETWEEN 1 AND 31),
    assigned_technician_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    commission_per_visit NUMERIC(10,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PAUSED', 'CANCELED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.financial_contracts ENABLE ROW LEVEL SECURITY;

-- B. Tabela de Lançamentos Financeiros (financial_entries)
CREATE TABLE IF NOT EXISTS public.financial_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    contract_id UUID REFERENCES public.financial_contracts(id) ON DELETE SET NULL,
    entry_type VARCHAR(10) NOT NULL CHECK (entry_type IN ('RECEITA', 'DESPESA')),
    category VARCHAR(50) NOT NULL CHECK (category IN ('MENSALIDADE', 'VENDA_BALCAO', 'COMISSAO_TECNICO', 'COMPRA_QUIMICOS', 'COMBUSTIVEL', 'MANUTENCAO_BOMBAS', 'OUTROS')),
    description VARCHAR(255) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    due_date DATE NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    payment_status VARCHAR(20) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'OVERDUE', 'CANCELED')),
    payment_method VARCHAR(30) DEFAULT 'PIX' CHECK (payment_method IN ('PIX', 'DINHEIRO', 'CARTAO_CREDITO', 'BOLETO')),
    pix_copy_paste TEXT,
    -- Campos em STANDBY para o ERP Fiscal futuro:
    fiscal_ready BOOLEAN DEFAULT FALSE,
    fiscal_invoice_ref VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.financial_entries ENABLE ROW LEVEL SECURITY;

-- C. Atualização da Tabela de Módulos (system_modules)
INSERT INTO public.system_modules (id, name, description, is_active) VALUES
('fin_recurring', 'Gestão de Mensalidades Recorrentes', 'Controle de mensalidades de clientes residenciais e comerciais com cobrança PIX automática.', TRUE),
('fin_commissions', 'Apuração de Comissões de Técnicos', 'Cálculo e liquidação de comissões por visita executada para empresas de frota.', TRUE),
('fin_cashflow', 'Contas a Pagar e Fluxo de Caixa', 'Controle de despesas operacionais (químicos, combustível, manutenção) e DRE simples.', TRUE)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;

-- Atualização dos Planos de Assinatura com os Módulos Financeiros
-- SOLO: inclui fin_recurring
UPDATE public.subscription_tiers
SET included_modules = '["pwa_field", "fin_recurring"]'::jsonb
WHERE id = 'solo';

-- FLEET: inclui fin_recurring, fin_commissions, fin_cashflow
UPDATE public.subscription_tiers
SET included_modules = '["pwa_field", "stock_deduction", "fleet_routes", "fin_recurring", "fin_commissions", "fin_cashflow"]'::jsonb
WHERE id = 'fleet';

-- RETAIL: inclui retail_trade, fin_cashflow
UPDATE public.subscription_tiers
SET included_modules = '["retail_trade", "fin_cashflow"]'::jsonb
WHERE id = 'retail';

-- FACILITY: Estritamente NENHUM módulo financeiro (Apenas PWA e Logbook Sanitário)
UPDATE public.subscription_tiers
SET included_modules = '["pwa_field", "facility_logbook"]'::jsonb
WHERE id = 'facility';

-- ENTERPRISE JHOSTON: Governança técnica e pericial
UPDATE public.subscription_tiers
SET included_modules = '["pwa_field", "stock_deduction", "fleet_routes", "facility_logbook", "retail_trade", "guarantee_audit", "fin_recurring", "fin_commissions", "fin_cashflow"]'::jsonb
WHERE id = 'enterprise_jhoston';

-- D. Políticas de Isolamento RLS Estrito
-- 1. Tenants só operam em seus próprios lançamentos
CREATE POLICY "Tenant isolamento total em contratos" ON public.financial_contracts
    FOR ALL USING (
      -- Bloqueia o plano FACILITY de acessar finanças
      EXISTS (
        SELECT 1 FROM public.tenant_licenses tl
        WHERE tl.tenant_id = financial_contracts.tenant_id
          AND tl.tier_id != 'facility'
      )
    );

CREATE POLICY "Tenant isolamento total em lancamentos" ON public.financial_entries
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM public.tenant_licenses tl
        WHERE tl.tenant_id = financial_entries.tenant_id
          AND tl.tier_id != 'facility'
      )
    );

-- E. Carga Inicial de Dados Financeiros de Demonstração (Para Solo e Fleet)
-- Contratos do Tratador Solo (AcquaClean)
INSERT INTO public.financial_contracts (id, tenant_id, client_name, client_phone_masked, monthly_fee, billing_day, status)
VALUES
  ('c0000001-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001', 'Dr. Carlos Eduardo (Vinil 45m³)', '(11) 9****-**45', 380.00, 5, 'ACTIVE'),
  ('c0000001-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000001', 'Dra. Mariana Prado (Fibra 32m³)', '(11) 9****-**88', 320.00, 10, 'ACTIVE'),
  ('c0000001-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000001', 'Sérgio Mendes (Alvenaria 60m³)', '(11) 9****-**12', 450.00, 15, 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- Lançamentos do Mês Atual
INSERT INTO public.financial_entries (tenant_id, contract_id, entry_type, category, description, amount, due_date, paid_at, payment_status, payment_method)
VALUES
  ('11111111-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000001', 'RECEITA', 'MENSALIDADE', 'Mensalidade Piscina Residencial - Dr. Carlos', 380.00, (current_date - interval '4 days')::date, now(), 'PAID', 'PIX'),
  ('11111111-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000002', 'RECEITA', 'MENSALIDADE', 'Mensalidade Piscina Residencial - Dra. Mariana', 320.00, (current_date + interval '2 days')::date, NULL, 'PENDING', 'PIX'),
  ('11111111-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000003', 'RECEITA', 'MENSALIDADE', 'Mensalidade Piscina Residencial - Sérgio Mendes', 450.00, (current_date - interval '10 days')::date, NULL, 'OVERDUE', 'PIX')
ON CONFLICT DO NOTHING;

-- Contratos da Frota (PoolMaster) com Comissões
INSERT INTO public.financial_contracts (id, tenant_id, client_name, client_phone_masked, monthly_fee, billing_day, assigned_technician_id, commission_per_visit, status)
VALUES
  ('c0000002-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000002', 'Condomínio Alphaville Rota 1', '(11) 9****-**00', 1850.00, 10, '22222222-2222-2222-2222-000000000002', 35.00, 'ACTIVE'),
  ('c0000002-0000-0000-0000-000000000002', '22222222-0000-0000-0000-000000000002', 'Academia Aquafit Rota 1', '(11) 9****-**99', 1400.00, 15, '22222222-2222-2222-2222-000000000002', 30.00, 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- Despesas Operacionais da Frota (Fluxo de Caixa)
INSERT INTO public.financial_entries (tenant_id, entry_type, category, description, amount, due_date, paid_at, payment_status, payment_method)
VALUES
  ('22222222-0000-0000-0000-000000000002', 'DESPESA', 'COMPRA_QUIMICOS', 'Lote 10 Baldes Cloro Dicloro 10kg', 1450.00, (current_date - interval '5 days')::date, now(), 'PAID', 'PIX'),
  ('22222222-0000-0000-0000-000000000002', 'DESPESA', 'COMBUSTIVEL', 'Abastecimento Semanal Caminhonete BRA-2026', 320.00, (current_date - interval '2 days')::date, now(), 'PAID', 'CARTAO_CREDITO'),
  ('22222222-0000-0000-0000-000000000002', 'DESPESA', 'MANUTENCAO_BOMBAS', 'Troca de Rolamento Bomba 2CV Alphaville', 280.00, (current_date + interval '4 days')::date, NULL, 'PENDING', 'PIX')
ON CONFLICT DO NOTHING;
