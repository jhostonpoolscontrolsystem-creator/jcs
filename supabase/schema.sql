-- ==============================================================================
-- JHPCS (JHoston Pools Control System) - Schema de Banco de Dados PostgreSQL / Supabase
-- Especificação Técnica e Arquitetura de Software (SRS) - Revestimentos Monolíticos
-- ==============================================================================

-- Habilita extensão para UUID se ainda não estiver ativa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Entidades e Hierarquias de Usuários (RBAC)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL, -- Formatado para WhatsApp (ex: 5511999999999)
    cpf VARCHAR(14) UNIQUE,     -- Para autenticação rápida de tratador (CPF + PIN)
    pin_hash VARCHAR(255),      -- Hash do PIN de acesso rápido
    role VARCHAR(50) NOT NULL CHECK (role IN (
        'MASTER',
        'DIRETORIA_JH',
        'TECNICO_JH',
        'GERENCIA_CLI',
        'TECNICO_CLI',
        'PISCINEIRO'
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Ativos e Categorias de Cliente (Digital Twin das Piscinas)
CREATE TABLE IF NOT EXISTS pools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL DEFAULT 'Piscina Principal',
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    facility_type VARCHAR(50) NOT NULL CHECK (facility_type IN (
        'PESSOA_FISICA',
        'HOTEL',
        'RESORT'
    )),
    volume_m3 DECIMAL(10,2) NOT NULL,
    pump_flow_m3_h DECIMAL(10,2) NOT NULL,
    gps_lat DECIMAL(10,8) NOT NULL,
    gps_lng DECIMAL(10,8) NOT NULL,
    application_date DATE NOT NULL, -- Determina o início da cura a seco (7 dias) e submersa (28 dias)
    status VARCHAR(50) NOT NULL DEFAULT 'DRY_CURE' CHECK (status IN (
        'DRY_CURE',
        'STARTUP',
        'SUBMERGED_CURE',
        'NORMAL',
        'RED_ZONE',
        'WARRANTY_SUSPENDED'
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vínculo de Tratadores (Muitos para Muitos)
CREATE TABLE IF NOT EXISTS pool_maintainers (
    pool_id UUID REFERENCES pools(id) ON DELETE CASCADE,
    maintainer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES users(id), -- Quem aprovou a entrada do tratador
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (pool_id, maintainer_id)
);

-- 3. Catálogo Parametrizável de Químicos
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'SANITIZANTE',
        'ALCALINIZANTE',
        'REDUTOR_PH',
        'SEQUESTRANTE_METAL',
        'LIMPA_BORDA'
    )),
    unit_of_measure VARCHAR(20) NOT NULL CHECK (unit_of_measure IN ('KG', 'LITROS')),
    estimated_dose_per_m3 DECIMAL(10,4) NOT NULL, -- Dose de referência padrão por m³
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Motor Preditivo de Estoque (Digital Twin de Insumos)
CREATE TABLE IF NOT EXISTS pool_inventory (
    pool_id UUID REFERENCES pools(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    current_balance DECIMAL(10,2) DEFAULT 0.00,
    projected_days_remaining INTEGER, -- Calculado com base no volume e histórico de consumo
    min_alert_threshold DECIMAL(10,2) DEFAULT 1.00,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (pool_id, product_id)
);

-- 5. Core de Auditoria Operacional (Logs diários de manutenção)
CREATE TABLE IF NOT EXISTS maintenance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pool_id UUID REFERENCES pools(id) ON DELETE CASCADE,
    maintainer_id UUID REFERENCES users(id),
    log_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Inputs Químicos Diretos
    ph DECIMAL(4,2) NOT NULL,
    chlorine_ppm DECIMAL(4,2) NOT NULL,
    alkalinity_ppm INTEGER,
    calcium_hardness_ppm INTEGER,
    
    -- Check-ins de Ação Operacional
    brushed_surface BOOLEAN DEFAULT FALSE,
    backwashed_filter BOOLEAN DEFAULT FALSE,
    acid_product_used BOOLEAN DEFAULT FALSE, -- Regra fatal: aciona WARRANTY_SUSPENDED se verdadeiro
    weather_condition_at_log VARCHAR(50),     -- ex: 'Ensolarado', 'Chuva', 'Nublado'
    
    -- Transparência, Memória de Cálculo e Responsabilidade Legal
    calculation_memory JSONB, -- Ex: {"formula": "volume * dose", "volume": 50, "dose": 15, "total_debited_ml": 750}
    liability_accepted BOOLEAN NOT NULL DEFAULT TRUE, -- Termo de responsabilidade assinado digitalmente
    is_audit_flagged BOOLEAN DEFAULT FALSE,           -- Se TRUE, encaminhado imediatamente para a Triage JHostonTec
    flag_reason TEXT,                                 -- Ex: "pH de risco (6.8) - Corrosão imediata" ou "Uso de Ácido Detectado"
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Evidências Fotográficas In-App (Câmera Nativa sem Galeria + GPS)
CREATE TABLE IF NOT EXISTS service_evidences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    log_id UUID REFERENCES maintenance_logs(id) ON DELETE CASCADE,
    evidence_type VARCHAR(50) NOT NULL CHECK (evidence_type IN (
        'FOTO_PISCINA_PANORAMICA',
        'FOTO_TESTE_AGUA',
        'OCORRENCIA_GERAL'
    )),
    photo_url VARCHAR(255) NOT NULL, -- Bucket URL no Supabase Storage (service_evidences)
    gps_lat DECIMAL(10,8) NOT NULL,
    gps_lng DECIMAL(10,8) NOT NULL,
    captured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Motor de Tarefas (Workflows de Equipe & Kanban de Triagem)
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pool_id UUID REFERENCES pools(id) ON DELETE CASCADE,
    assigned_to_user_id UUID REFERENCES users(id),
    task_type VARCHAR(50) NOT NULL CHECK (task_type IN (
        'FOLLOW_UP_MENSAL',
        'TRATAR_RED_ZONE',
        'COMPRA_INSUMOS'
    )),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN (
        'PENDING',
        'IN_PROGRESS',
        'COMPLETED',
        'CANCELED'
    )),
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Log da Evolution API (Auditoria de WhatsApp)
CREATE TABLE IF NOT EXISTS whatsapp_message_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pool_id UUID REFERENCES pools(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    message_type VARCHAR(50) NOT NULL CHECK (message_type IN (
        'RED_ZONE_ALERT',
        'RELATORIO_MENSAL',
        'CHATBOT_QUERY'
    )),
    whatsapp_number VARCHAR(20) NOT NULL,
    payload TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'SENT' CHECK (status IN (
        'SENT',
        'DELIVERED',
        'READ',
        'FAILED'
    )),
    evolution_message_id VARCHAR(255),
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

-- Índices de Performance
CREATE INDEX IF NOT EXISTS idx_pools_owner ON pools(owner_id);
CREATE INDEX IF NOT EXISTS idx_pools_status ON pools(status);
CREATE INDEX IF NOT EXISTS idx_maintenance_pool_date ON maintenance_logs(pool_id, log_date DESC);
CREATE INDEX IF NOT EXISTS idx_maintenance_flagged ON maintenance_logs(is_audit_flagged);
CREATE INDEX IF NOT EXISTS idx_tasks_pool_status ON tasks(pool_id, status);
CREATE INDEX IF NOT EXISTS idx_service_evidences_log ON service_evidences(log_id);

-- Exemplo de Seed Inicial para Catálogo Químico Recomendado JHostonTec
INSERT INTO products (name, category, unit_of_measure, estimated_dose_per_m3)
VALUES 
    ('Cloro Estabilizado Concentrado', 'SANITIZANTE', 'KG', 0.0040),
    ('Elevador de Alcalinidade (Bicarbonato Puro)', 'ALCALINIZANTE', 'KG', 0.0170),
    ('Redutor de pH e Alcalinidade Líquido', 'REDUTOR_PH', 'LITROS', 0.0100),
    ('Inibidor de Metais e Manchas', 'SEQUESTRANTE_METAL', 'LITROS', 0.0150),
    ('Limpa Bordas Biodegradável Neutro', 'LIMPA_BORDA', 'LITROS', 0.0050)
ON CONFLICT DO NOTHING;
