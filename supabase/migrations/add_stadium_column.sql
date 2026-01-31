-- Migração para adicionar suporte a estádios na tabela de partidas

-- 1. Adicionar coluna stadium
ALTER TABLE public.matches 
ADD COLUMN IF NOT EXISTS stadium TEXT;

-- 2. Atualizar políticas RLS para garantir acesso (já devem estar cobertas por políticas genéricas, mas por segurança)
-- Nenhuma alteração de política necessária se usar exists(role='admin') como as atuais.

-- 3. Exemplo de como povoar um estádio (opcional, só para teste)
-- UPDATE public.matches SET stadium = 'BC Place' WHERE team_a = 'Canadá' AND team_b = 'México';
