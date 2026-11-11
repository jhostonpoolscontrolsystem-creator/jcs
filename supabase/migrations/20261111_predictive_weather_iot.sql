-- =============================================================================
-- Migration: 20261111_predictive_weather_iot.sql
-- JHPCS PoolTech Ecosystem - IoT Híbrido Preditivo (Spatial Grid Cache & Químico 48h)
-- =============================================================================

-- A. Tabela de Cache Meteorológico por Célula Geográfica (Spatial Grid Cache)
CREATE TABLE IF NOT EXISTS public.weather_grid_cache (
    grid_key VARCHAR(30) PRIMARY KEY, -- Ex: "-23.5_-46.6" (Lat/Lon arredondados em 1 casa decimal ≈ 11km)
    city_name VARCHAR(100),
    forecast_48h_json JSONB NOT NULL, -- Dados resumidos das próximas 48h
    max_rain_mm_48h NUMERIC(6,2) DEFAULT 0,
    max_temp_c_48h NUMERIC(4,1) DEFAULT 0,
    risk_acid_rain BOOLEAN DEFAULT FALSE,
    risk_algae_bloom BOOLEAN DEFAULT FALSE,
    fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para buscas rápidas de validade de cache
CREATE INDEX IF NOT EXISTS idx_weather_grid_fetched_at ON public.weather_grid_cache (fetched_at);

-- B. Tabela de Alertas Preditivos por Piscina
CREATE TABLE IF NOT EXISTS public.pool_predictive_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pool_id UUID NOT NULL REFERENCES public.pools(id) ON DELETE CASCADE,
    tenant_id VARCHAR(100) NOT NULL,
    alert_type VARCHAR(40) NOT NULL, -- 'ACID_RAIN_BUFFER', 'ALGAE_BLOOM_PREVENTION', 'CURING_PROTECTION'
    severity VARCHAR(20) NOT NULL, -- 'MODERATE', 'HIGH', 'CRITICAL'
    title VARCHAR(150) NOT NULL,
    preventive_dosage_instruction TEXT NOT NULL, -- Cálculo estequiométrico exato em gramas/ml para o volume da piscina
    valid_until TIMESTAMPTZ NOT NULL,
    acknowledged_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para busca de alertas ativos por piscina e por tenant
CREATE INDEX IF NOT EXISTS idx_predictive_alerts_pool ON public.pool_predictive_alerts (pool_id, acknowledged_at);
CREATE INDEX IF NOT EXISTS idx_predictive_alerts_tenant ON public.pool_predictive_alerts (tenant_id, created_at DESC);

-- Habilitar RLS nas tabelas
ALTER TABLE public.weather_grid_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pool_predictive_alerts ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
CREATE POLICY "Permitir leitura pública ou autenticada do cache meteorológico"
    ON public.weather_grid_cache FOR SELECT USING (true);

CREATE POLICY "Permitir leitura de alertas por tenant"
    ON public.pool_predictive_alerts FOR SELECT
    USING (true);

CREATE POLICY "Permitir inserção e atualização de alertas pelo sistema"
    ON public.pool_predictive_alerts FOR ALL
    USING (true)
    WITH CHECK (true);

