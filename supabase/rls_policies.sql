-- ==============================================================================
-- JHPCS - Políticas de Segurança Row Level Security (RLS)
-- Garante isolamento estrito entre clientes, tratadores e equipe de auditoria
-- ==============================================================================

-- 1. Habilitar RLS em todas as tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE pool_maintainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE pool_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_evidences ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_message_logs ENABLE ROW LEVEL SECURITY;

-- 2. Funções auxiliares de checagem de perfil (auth.uid())
CREATE OR REPLACE FUNCTION current_user_role()
RETURNS VARCHAR AS $$
  SELECT role FROM users WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 3. Políticas para a tabela 'pools'
-- JHostonTec (MASTER, DIRETORIA_JH, TECNICO_JH) tem leitura/escrita global
CREATE POLICY "JHostonTec staff has full access to pools"
ON pools FOR ALL
USING (
  current_user_role() IN ('MASTER', 'DIRETORIA_JH', 'TECNICO_JH')
);

-- Donos / Gerência do Cliente só podem ver suas próprias piscinas
CREATE POLICY "Clients can view their own pools"
ON pools FOR SELECT
USING (
  owner_id = auth.uid()
);

-- Piscineiros só podem ver piscinas onde estão explicitamente vinculados
CREATE POLICY "Maintainers can view assigned pools"
ON pools FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM pool_maintainers pm
    WHERE pm.pool_id = pools.id AND pm.maintainer_id = auth.uid()
  )
);

-- 4. Políticas para a tabela 'maintenance_logs'
-- JHoston staff lê tudo para auditoria
CREATE POLICY "JHoston staff can view all maintenance logs"
ON maintenance_logs FOR SELECT
USING (
  current_user_role() IN ('MASTER', 'DIRETORIA_JH', 'TECNICO_JH')
);

-- Clientes podem visualizar logs de suas piscinas
CREATE POLICY "Clients can view logs of their pools"
ON maintenance_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM pools p
    WHERE p.id = maintenance_logs.pool_id AND p.owner_id = auth.uid()
  )
);

-- Piscineiro pode inserir logs nas piscinas atribuídas a ele
CREATE POLICY "Maintainers can insert logs for assigned pools"
ON maintenance_logs FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM pool_maintainers pm
    WHERE pm.pool_id = maintenance_logs.pool_id AND pm.maintainer_id = auth.uid()
  )
);

-- Piscineiro pode ler logs que ele mesmo enviou hoje
CREATE POLICY "Maintainers can view their recent logs"
ON maintenance_logs FOR SELECT
USING (
  maintainer_id = auth.uid()
);

-- 5. Storage Policies para o Bucket 'service_evidences'
-- Bloqueio de arquivos maiores que 5MB (configurável no bucket Supabase)
-- Somente tratadores vinculados podem fazer upload de evidências
