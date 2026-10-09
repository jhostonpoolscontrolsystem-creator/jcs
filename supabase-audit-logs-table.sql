-- Criação da tabela de Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID, -- Opcional, caso não tenhamos o UUID no momento do log
    user_email TEXT,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    user_agent TEXT,
    payload JSONB DEFAULT '{}'::jsonb
);

-- Ativa RLS para que o banco seja seguro
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Política 1: Inserção permitida (Append-Only)
-- A role anon (API route Serverless) pode inserir
CREATE POLICY "Allow inserts into audit_logs" 
ON public.audit_logs 
FOR INSERT 
TO public
WITH CHECK (true);

-- Política 2: Apenas MASTER e DIRETORIA podem LER (Select)
-- (No nosso caso, a API route vai ler ignorando o RLS com a chave secreta, mas para segurança extra podemos deixar restrito ao public access)
CREATE POLICY "Deny selects for public" 
ON public.audit_logs 
FOR SELECT 
TO public
USING (false);

-- Política 3 e 4: UPDATE e DELETE explicitamente proibidos para todos (Imutável)
CREATE POLICY "Deny updates on audit_logs" 
ON public.audit_logs 
FOR UPDATE 
TO public
USING (false);

CREATE POLICY "Deny deletes on audit_logs" 
ON public.audit_logs 
FOR DELETE 
TO public
USING (false);
