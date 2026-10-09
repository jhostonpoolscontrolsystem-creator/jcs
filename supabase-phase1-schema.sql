-- ====================================================================
-- FASE 1: Esquema de Banco de Dados Oficial (Supabase)
-- Tabelas Reais para Usuários, Piscinas e Telemetria (Manutenções)
-- ====================================================================

-- Limpeza preventiva para garantir que o esquema seja recriado com as novas colunas
DROP TABLE IF EXISTS public.maintenance_logs CASCADE;
DROP TABLE IF EXISTS public.pools CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- 1. Tabela de USUÁRIOS
-- Unifica Diretores, Clientes, Master e Piscineiros (Tratadores)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE, -- Pode ser nulo para tratadores que usam apenas CPF
    cpf TEXT UNIQUE,   -- Pode ser nulo para diretoria que usa apenas Email
    phone TEXT,
    password_hash TEXT, -- Usaremos bcrypt no backend para verificar
    role TEXT NOT NULL CHECK (role IN ('MASTER', 'DIRETORIA_JH', 'TECNICO_JH', 'CLIENTE_FINAL', 'PISCINEIRO')),
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'BLOCKED')), -- KILL SWITCH
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilita RLS na tabela de usuários
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- Política: O próprio usuário pode se ver, e cargos Master/Diretoria podem ver todos.
CREATE POLICY "Leitura de Usuários" ON public.users 
    FOR SELECT USING (true); -- Libera leitura geral para simplificar autenticação via API
CREATE POLICY "Atualização de Usuários" ON public.users 
    FOR UPDATE USING (true); -- API Backend controla a segurança

-- 2. Tabela de PISCINAS (Digital Twins)
CREATE TABLE IF NOT EXISTS public.pools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- Dono da piscina
    name TEXT NOT NULL,
    volume_m3 NUMERIC NOT NULL,
    gps_lat NUMERIC,
    gps_lng NUMERIC,
    status TEXT NOT NULL DEFAULT 'NORMAL' CHECK (status IN ('NORMAL', 'WARNING', 'CRITICAL', 'WARRANTY_SUSPENDED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.pools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura de Piscinas" ON public.pools FOR SELECT USING (true);
CREATE POLICY "Modificação de Piscinas" ON public.pools FOR ALL USING (true); -- Restringido via API

-- 3. Tabela de TELEMETRIA (Manutenções / Laudos)
CREATE TABLE IF NOT EXISTS public.maintenance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pool_id UUID REFERENCES public.pools(id) ON DELETE CASCADE NOT NULL,
    maintainer_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- Quem limpou
    log_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    ph NUMERIC NOT NULL,
    chlorine_ppm NUMERIC NOT NULL,
    alkalinity_ppm NUMERIC,
    acid_product_used BOOLEAN DEFAULT FALSE,
    brushed_surface BOOLEAN DEFAULT FALSE,
    backwashed_filter BOOLEAN DEFAULT FALSE,
    liability_accepted BOOLEAN NOT NULL,
    is_audit_flagged BOOLEAN DEFAULT FALSE,
    flag_reason TEXT,
    calculation_memory JSONB, -- JSON contendo a dose calculada dos químicos
    evidences JSONB, -- Arrays de URLs das fotos tiradas
    audit_result JSONB -- Objeto completo do motor químico
);

ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY;
-- Inserções feitas apenas pela API, e ninguém pode deletar (Imutabilidade base)
CREATE POLICY "Leitura de Telemetria" ON public.maintenance_logs FOR SELECT USING (true);
CREATE POLICY "Inserção de Telemetria" ON public.maintenance_logs FOR INSERT WITH CHECK (true);

-- ====================================================================
-- SEED DE DADOS (Popula o banco com os usuários e piscina iniciais)
-- ====================================================================

-- Insere os usuários base (Senhas criptografadas ou controle pela API)
INSERT INTO public.users (id, name, email, role, status) VALUES 
('00000000-0000-0000-0000-000000000001', 'Daniel Lopes (Master)', 'danielsmlopes@hotmail.com', 'MASTER', 'ACTIVE'),
('00000000-0000-0000-0000-000000000002', 'Patrícia Grübel (Master)', 'patigrubel@gmail.com', 'MASTER', 'ACTIVE'),
('00000000-0000-0000-0000-000000000003', 'Joabson (Diretoria JH)', 'jhostontec@jhostontec.com.br', 'DIRETORIA_JH', 'ACTIVE'),
('00000000-0000-0000-0000-000000000004', 'Responsável Técnico JH', 'tecnico@jhostontec.com.br', 'TECNICO_JH', 'ACTIVE')
ON CONFLICT (email) DO NOTHING;

-- Insere um Cliente Final de Teste e um Tratador (Piscineiro)
INSERT INTO public.users (id, name, email, cpf, role, status) VALUES 
('11111111-1111-1111-1111-111111111111', 'Condomínio EcoStone (Cliente)', 'cliente@ecostone.com', '00011122233', 'CLIENTE_FINAL', 'ACTIVE'),
('22222222-2222-2222-2222-222222222222', 'João Tratador', NULL, '12345678900', 'PISCINEIRO', 'ACTIVE')
ON CONFLICT DO NOTHING;

-- Insere a Piscina de Teste do Cliente
INSERT INTO public.pools (id, client_id, name, volume_m3, gps_lat, gps_lng) VALUES 
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Piscina Olímpica EcoStone', 150.5, -16.4251, -39.0624)
ON CONFLICT DO NOTHING;
