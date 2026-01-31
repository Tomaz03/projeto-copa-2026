-- Verificar quais tabelas existem no seu banco de dados
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se a tabela 'users' existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'profiles');

-- 2. Se 'profiles' existir, verificar sua estrutura
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public';

-- 3. Verificar dados da conta admin em 'profiles'
SELECT id, email, is_admin 
FROM public.profiles 
WHERE email = 'e.ftomaz@gmail.com';
