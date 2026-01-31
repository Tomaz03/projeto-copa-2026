-- Criar o bucket de comprovantes se não existir
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment_proofs', 'payment_proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Remover políticas existentes para evitar conflitos ao re-executar
DROP POLICY IF EXISTS "Users can upload their own payment proof" ON storage.objects;
DROP POLICY IF EXISTS "Admins can view all payment proofs" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own payment proof" ON storage.objects;

-- Política para permitir que usuários autenticados façam upload de seus próprios arquivos
-- Importante: A pasta do arquivo deve ser exatamente o UUID do usuário
CREATE POLICY "Users can upload their own payment proof"
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (
  bucket_id = 'payment_proofs' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Política para permitir que administradores vejam todos os arquivos
-- Usando a tabela 'profiles' e a coluna 'is_admin' conforme o banco atual
CREATE POLICY "Admins can view all payment proofs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'payment_proofs' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Política para permitir que usuários vejam seus próprios arquivos
CREATE POLICY "Users can view their own payment proof"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'payment_proofs' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
