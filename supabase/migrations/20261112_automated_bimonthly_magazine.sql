-- =============================================================================
-- MIGRATION: 20261112_automated_bimonthly_magazine.sql
-- Motor de Revista Eletrônica Automatizada Bimestral White-Label (B2B2C)
-- Governança Master: Daniel Lopes & Patrícia Grübel
-- =============================================================================

-- 1. Tabela de Edições Globais Bimestrais da Revista
CREATE TABLE IF NOT EXISTS magazine_editions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(50) UNIQUE NOT NULL, -- Ex: '2026-nov-dez', 'edicao-01'
  edition_number INT NOT NULL,
  period_label VARCHAR(60) NOT NULL, -- Ex: 'Novembro / Dezembro 2026'
  title VARCHAR(150) NOT NULL,
  subtitle TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'PUBLISHED' CHECK (status IN ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED')),
  theme_focus VARCHAR(80) NOT NULL, -- Ex: 'Preparação para o Verão & Revestimentos Monolíticos'
  articles_json JSONB NOT NULL, -- Array estruturado de artigos com categorias, textos e imagens
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Personalização e Governança White-Label por Tenant
CREATE TABLE IF NOT EXISTS tenant_magazine_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE UNIQUE,
  is_enabled_by_master BOOLEAN DEFAULT FALSE, -- Controle soberano do Usuário Master
  custom_slug VARCHAR(80) UNIQUE, -- Ex: 'acquaclean', 'poolmaster'
  custom_brand_name VARCHAR(120),
  custom_logo_url TEXT,
  custom_primary_color VARCHAR(20) DEFAULT '#06B6D4',
  contact_whatsapp VARCHAR(30),
  custom_cta_label VARCHAR(80) DEFAULT 'Solicitar Avaliação da Minha Piscina',
  show_lead_calculator BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de Leads Captados pela Revista (B2B2C Flywheel)
CREATE TABLE IF NOT EXISTS magazine_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  edition_slug VARCHAR(50) NOT NULL,
  lead_name VARCHAR(120) NOT NULL,
  lead_whatsapp VARCHAR(30) NOT NULL,
  lead_email VARCHAR(120),
  pool_type VARCHAR(40), -- 'MONOLITHIC', 'FIBER', 'VINYL', 'CONCRETE', 'NEW_PROJECT'
  estimated_volume_m3 NUMERIC(8,2),
  notes TEXT,
  source_channel VARCHAR(40) DEFAULT 'MAGAZINE_CALCULATOR',
  status VARCHAR(30) DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'CONVERTED', 'ARCHIVED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Índices de Otimização e Performance
CREATE INDEX IF NOT EXISTS idx_magazine_editions_slug ON magazine_editions(slug);
CREATE INDEX IF NOT EXISTS idx_tenant_magazine_slug ON tenant_magazine_settings(custom_slug);
CREATE INDEX IF NOT EXISTS idx_magazine_leads_tenant ON magazine_leads(tenant_id, created_at DESC);

-- 5. Comentários para Documentação Pericial
COMMENT ON TABLE magazine_editions IS 'Edições bimestrais da Revista Eletrônica JHPCS geradas por IA e curadoria pericial.';
COMMENT ON TABLE tenant_magazine_settings IS 'Configuração White-Label e ativação soberana da revista por empresa cliente.';
COMMENT ON TABLE magazine_leads IS 'Funil de captação de leads de proprietários de piscinas gerados pela revista.';

