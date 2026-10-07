-- ==============================================================================
-- JHPCS - Configuração do Bucket Supabase Storage: 'service_evidences'
-- Trava de tamanho máximo: 5MB (conforme SRS Seção 2)
-- ==============================================================================

-- 1. Cria o bucket de evidências fotográficas se não existir
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'service_evidences',
  'service_evidences',
  true,
  5242880, -- 5MB em bytes (5 * 1024 * 1024)
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = 5242880,
  public = true,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- 2. Políticas de Acesso ao Storage (Row Level Security no storage.objects)
-- Permitir leitura pública ou autenticada das fotos para laudos e dashboards
CREATE POLICY "Public and clients can view evidence photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'service_evidences');

-- Permitir upload de evidências
CREATE POLICY "Maintainers can upload evidence photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'service_evidences'
);
