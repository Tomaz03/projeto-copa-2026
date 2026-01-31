-- SOLUÇÃO: Corrigir Recursão Infinita nas Políticas RLS

-- Passo 1: Remover as políticas problemáticas
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Admins can manage matches" ON public.matches;

-- Passo 2: Criar uma função auxiliar para verificar se o usuário é admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Passo 3: Recriar as políticas usando a função auxiliar
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    auth.uid() = id OR public.is_admin()
  );

CREATE POLICY "Admins can update all users" ON public.users
  FOR UPDATE USING (
    auth.uid() = id OR public.is_admin()
  );

CREATE POLICY "Admins can manage matches" ON public.matches
  FOR ALL USING (
    public.is_admin()
  );

-- Verificar se o usuário e.ftomaz@gmail.com está como admin
SELECT id, email, role, status FROM public.users WHERE email = 'e.ftomaz@gmail.com';
