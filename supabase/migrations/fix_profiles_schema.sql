-- Adicionar colunas faltantes para o ranking na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS total_points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS exact_scores INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS correct_results INTEGER DEFAULT 0;

-- Comentários para documentação das colunas
COMMENT ON COLUMN public.profiles.total_points IS 'Soma total de pontos do usuário no bolão';
COMMENT ON COLUMN public.profiles.exact_scores IS 'Quantidade de placares exatos acertados';
COMMENT ON COLUMN public.profiles.correct_results IS 'Quantidade de resultados (vencedor/empate) acertados';
