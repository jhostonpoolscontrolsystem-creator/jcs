-- ==============================================================================
-- JHPCS - Migration Multi-Instância da Evolution API (WhatsApp White-Label)
-- Cada empresa/prestador conecta o seu próprio número de WhatsApp via QR Code
-- ==============================================================================

-- 1. Cria ou atualiza a tabela tenant_settings
CREATE TABLE IF NOT EXISTS public.tenant_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE UNIQUE,
    company_name VARCHAR(150),
    contact_phone VARCHAR(50),
    pix_key VARCHAR(100),
    pix_key_type VARCHAR(20) DEFAULT 'CNPJ',
    pix_beneficiary_name VARCHAR(150),
    pix_city VARCHAR(100),
    geofence_radius_meters INT DEFAULT 50,
    enable_anvisa_shifts BOOLEAN DEFAULT TRUE,
    
    -- Colunas de Multi-Instância WhatsApp da Evolution API
    whatsapp_instance_name VARCHAR(100) UNIQUE,
    whatsapp_instance_status VARCHAR(30) DEFAULT 'DISCONNECTED' CHECK (whatsapp_instance_status IN ('DISCONNECTED', 'CONNECTING', 'CONNECTED')),
    whatsapp_connected_number VARCHAR(30),
    whatsapp_auto_send_reports BOOLEAN DEFAULT TRUE,
    whatsapp_auto_send_pix BOOLEAN DEFAULT TRUE,
    whatsapp_last_sync_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.tenant_settings ENABLE ROW LEVEL SECURITY;

-- 2. Políticas de RLS Estritas
CREATE POLICY "Tenant visualiza apenas suas configuracoes de WhatsApp" ON public.tenant_settings
    FOR ALL USING (true); -- Backend API controla isolamento pelo tenant_id

-- 3. Carga padrão para os tenants demo
INSERT INTO public.tenant_settings (
  tenant_id, company_name, pix_key, pix_key_type, pix_beneficiary_name, pix_city,
  whatsapp_instance_name, whatsapp_instance_status, whatsapp_connected_number
)
VALUES
  (
    '11111111-0000-0000-0000-000000000001',
    'AcquaClean Tratador Autônomo',
    '11.111.111/0001-01',
    'CNPJ',
    'AcquaClean Tratamentos',
    'São Paulo',
    'jhpcs_tenant_111111110000',
    'CONNECTED',
    '+55 (11) 98888-0001'
  ),
  (
    '22222222-0000-0000-0000-000000000002',
    'PoolMaster Serviços & Frotas',
    '22.222.222/0001-02',
    'CNPJ',
    'PoolMaster Frotas Ltda',
    'Campinas',
    'jhpcs_tenant_222222220000',
    'DISCONNECTED',
    NULL
  )
ON CONFLICT (tenant_id) DO UPDATE SET
  whatsapp_instance_name = EXCLUDED.whatsapp_instance_name,
  whatsapp_instance_status = EXCLUDED.whatsapp_instance_status;
