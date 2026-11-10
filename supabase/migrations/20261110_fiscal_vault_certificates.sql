-- =============================================================================
-- JHPCS MIGRATION: 20261110_fiscal_vault_certificates.sql
-- TABELA CRIPTOGRAFADA PARA CERTIFICADOS DIGITAIS A1 (.PFX / .P12) COM VAULT KMS
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Tabela Segura de Certificados Digitais A1
CREATE TABLE IF NOT EXISTS tenant_fiscal_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    certificate_alias VARCHAR(150) NOT NULL DEFAULT 'Certificado A1 Padrão',
    certificate_pfx_encrypted TEXT NOT NULL, -- PFX codificado em Base64 e criptografado com PGP simétrico
    passphrase_encrypted TEXT NOT NULL,      -- Senha do certificado criptografada
    serial_number VARCHAR(100),
    subject_name TEXT,
    issuer_name TEXT,
    valid_from TIMESTAMPTZ,
    valid_until TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    uploaded_by VARCHAR(150),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_tenant_fiscal_cert UNIQUE (tenant_id)
);

-- 2. Tabela de Lotes e Protocolos Fiscais da Sefaz
CREATE TABLE IF NOT EXISTS fiscal_invoice_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    batch_number VARCHAR(50) NOT NULL,
    invoice_type VARCHAR(10) NOT NULL CHECK (invoice_type IN ('NFE', 'NFSE')),
    environment VARCHAR(20) NOT NULL CHECK (environment IN ('HOMOLOGATION', 'PRODUCTION')),
    status VARCHAR(30) NOT NULL DEFAULT 'PROCESSING', -- PROCESSING, AUTHORIZED, REJECTED, CANCELLED
    protocol_number VARCHAR(60),
    access_key_44 VARCHAR(44),
    authorization_digest VARCHAR(100),
    sefaz_status_code VARCHAR(10),
    sefaz_status_motivo TEXT,
    xml_signed_url TEXT,
    danfe_pdf_url TEXT,
    webhook_payload JSONB,
    authorized_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Habilitação de RLS (Row Level Security)
ALTER TABLE tenant_fiscal_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE fiscal_invoice_batches ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Isolamento Multi-Tenant
CREATE POLICY "Super Admins e Proprietários do Tenant podem ler seus certificados"
ON tenant_fiscal_certificates FOR SELECT
USING (
    tenant_id = auth.uid() 
    OR auth.jwt()->>'email' IN ('danielsmlopes@hotmail.com', 'patigrubel@gmail.com')
);

CREATE POLICY "Apenas Master ou Dono do Tenant podem fazer upload do certificado"
ON tenant_fiscal_certificates FOR ALL
USING (
    tenant_id = auth.uid() 
    OR auth.jwt()->>'email' IN ('danielsmlopes@hotmail.com', 'patigrubel@gmail.com')
);

CREATE POLICY "Isolamento multi-tenant para lotes fiscais"
ON fiscal_invoice_batches FOR ALL
USING (
    tenant_id = auth.uid() 
    OR auth.jwt()->>'email' IN ('danielsmlopes@hotmail.com', 'patigrubel@gmail.com')
);

-- Comentários de Auditoria e Governança
COMMENT ON TABLE tenant_fiscal_certificates IS 'Armazenamento de Certificados A1 com criptografia PGP em conformidade com ICP-Brasil e LGPD.';
COMMENT ON TABLE fiscal_invoice_batches IS 'Livro-razão de protocolos de autorização e webhooks assíncronos da Sefaz e Prefeituras.';

