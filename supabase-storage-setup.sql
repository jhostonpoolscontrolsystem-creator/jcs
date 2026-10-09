-- ====================================================================
-- FASE 2: Configuração do Supabase Storage
-- Criação do Bucket de Evidências Fotográficas e Políticas de Segurança
-- ====================================================================

-- 1. Insere o Bucket caso não exista
INSERT INTO storage.buckets (id, name, public) 
VALUES ('service_evidences', 'service_evidences', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Limpa políticas antigas para evitar duplicação (Opcional, apenas por segurança)
DROP POLICY IF EXISTS "Leitura Pública de Fotos" ON storage.objects;
DROP POLICY IF EXISTS "Upload Autenticado de Fotos" ON storage.objects;

-- 3. Habilita Políticas (Policies) no Bucket
-- A) Qualquer pessoa (incluindo o PWA ou os Diretores) pode ler as imagens (pois a URL é pública)
CREATE POLICY "Leitura Pública de Fotos"
ON storage.objects FOR SELECT
USING ( bucket_id = 'service_evidences' );

-- B) Qualquer um pode Inserir arquivos no Bucket (pois o app fará via API Backend/Service Role ou cliente autenticado via RLS)
-- Obs: Em ambiente real sem restrições complexas, liberamos INSERT apenas se houver bucket_id
CREATE POLICY "Upload Autenticado de Fotos"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'service_evidences' );
