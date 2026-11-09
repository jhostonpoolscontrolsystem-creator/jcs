-- ==============================================================================
-- JHPCS - Termo de Compromisso e Garantia Decenal Escalonada (PF vs PJ)
-- Telemetria Obrigatória, Frequência Mínima de Medições e Notificação Direta à Diretoria
-- ==============================================================================

-- 1. Adicionar campos de SLA e Frequência de Medição na tabela de Piscinas
ALTER TABLE public.pools
ADD COLUMN IF NOT EXISTS is_jhoston_asset BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS warranty_certificate_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS customer_type VARCHAR(10) DEFAULT 'PF' CHECK (customer_type IN ('PF', 'PJ')),
ADD COLUMN IF NOT EXISTS required_readings_per_week INT DEFAULT 1, -- PF: 1x/semana, PJ: 3x/semana
ADD COLUMN IF NOT EXISTS report_frequency VARCHAR(20) DEFAULT 'MENSAL' CHECK (report_frequency IN ('SEMANAL', 'QUINZENAL', 'MENSAL')),
ADD COLUMN IF NOT EXISTS last_telemetry_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS warranty_status VARCHAR(30) DEFAULT 'ATIVA' CHECK (warranty_status IN ('ATIVA', 'EM_ALERTA_PREVENTIVO', 'SUSPENSA_OMISSAO', 'PERDA_DEFINITIVA'));

-- 2. Tabela de Log de Alertas WhatsApp Enviados à Diretoria
CREATE TABLE IF NOT EXISTS public.jhoston_warranty_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pool_id UUID REFERENCES public.pools(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL, -- 'DESVIO_QUIMICO_ISL', 'USO_ACIDO_PROIBIDO', 'OMISSAO_MEDICAO_SEMANAL'
    severity VARCHAR(20) DEFAULT 'CRITICAL' CHECK (severity IN ('WARNING', 'CRITICAL', 'FATAL')),
    ph_measured NUMERIC(4,2),
    chlorine_measured NUMERIC(4,2),
    isl_calculated NUMERIC(4,2),
    details TEXT NOT NULL,
    director_phone VARCHAR(50) NOT NULL,
    whatsapp_status VARCHAR(20) DEFAULT 'DISPATCHED', -- 'DISPATCHED', 'FAILED', 'SIMULATED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.jhoston_warranty_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura de alertas de garantia JH" ON public.jhoston_warranty_alerts FOR ALL USING (true);

-- 3. Atualizar as piscinas de demonstração com as regras de PF e PJ
UPDATE public.pools
SET is_jhoston_asset = TRUE,
    customer_type = 'PF',
    required_readings_per_week = 1,
    report_frequency = 'MENSAL',
    warranty_certificate_number = 'JH-2026-DECENAL-PF-001'
WHERE name LIKE '%Casa Família%' OR name LIKE '%Residência Granja%';

UPDATE public.pools
SET is_jhoston_asset = TRUE,
    customer_type = 'PJ',
    required_readings_per_week = 3,
    report_frequency = 'QUINZENAL',
    warranty_certificate_number = 'JH-2026-DECENAL-PJ-084'
WHERE name LIKE '%Resort%' OR name LIKE '%Olímpica%';

