-- Criar o registro do usuário admin na tabela users
-- Use o ID de autenticação: a5a39bd1-2d32-4394-bfb8-9fe2826bfb03

INSERT INTO public.users (id, email, name, role, status, created_at, updated_at)
VALUES (
  'a5a39bd1-2d32-4394-bfb8-9fe2826bfb03',
  'e.ftomaz@gmail.com',
  'Administrador',
  'admin',
  'approved',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  status = 'approved',
  updated_at = NOW();

-- Verificar se foi criado corretamente
SELECT id, email, name, role, status FROM public.users WHERE email = 'e.ftomaz@gmail.com';
