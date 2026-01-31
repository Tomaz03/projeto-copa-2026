-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'blocked')),
  payment_proof_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de partidas
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_a TEXT NOT NULL,
  team_b TEXT NOT NULL,
  match_date TIMESTAMP WITH TIME ZONE NOT NULL,
  group_name TEXT NOT NULL,
  score_a INTEGER,
  score_b INTEGER,
  is_finished BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de palpites
CREATE TABLE IF NOT EXISTS public.predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
  predicted_score_a INTEGER NOT NULL,
  predicted_score_b INTEGER NOT NULL,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, match_id)
);

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all users" ON public.users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para matches
CREATE POLICY "Anyone can view matches" ON public.matches
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage matches" ON public.matches
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para predictions
CREATE POLICY "Users can view their own predictions" ON public.predictions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own predictions" ON public.predictions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view all predictions" ON public.predictions
  FOR SELECT USING (true);

-- Inserir dados de exemplo das partidas da Copa 2026
INSERT INTO public.matches (team_a, team_b, match_date, group_name) VALUES
-- Grupo A
('Canadá', 'México', '2026-06-11 21:00:00+00', 'A'),
('Estados Unidos', 'Uruguai', '2026-06-12 00:00:00+00', 'A'),
('México', 'Uruguai', '2026-06-16 21:00:00+00', 'A'),
('Canadá', 'Estados Unidos', '2026-06-17 00:00:00+00', 'A'),
('Uruguai', 'Canadá', '2026-06-21 21:00:00+00', 'A'),
('Estados Unidos', 'México', '2026-06-21 21:00:00+00', 'A'),

-- Grupo B
('Brasil', 'Argentina', '2026-06-12 21:00:00+00', 'B'),
('Colômbia', 'Chile', '2026-06-13 00:00:00+00', 'B'),
('Argentina', 'Chile', '2026-06-17 21:00:00+00', 'B'),
('Brasil', 'Colômbia', '2026-06-18 00:00:00+00', 'B'),
('Chile', 'Brasil', '2026-06-22 21:00:00+00', 'B'),
('Argentina', 'Colômbia', '2026-06-22 21:00:00+00', 'B'),

-- Grupo C
('França', 'Alemanha', '2026-06-13 21:00:00+00', 'C'),
('Espanha', 'Itália', '2026-06-14 00:00:00+00', 'C'),
('Alemanha', 'Itália', '2026-06-18 21:00:00+00', 'C'),
('França', 'Espanha', '2026-06-19 00:00:00+00', 'C'),
('Itália', 'França', '2026-06-23 21:00:00+00', 'C'),
('Alemanha', 'Espanha', '2026-06-23 21:00:00+00', 'C'),

-- Grupo D
('Inglaterra', 'Portugal', '2026-06-14 21:00:00+00', 'D'),
('Holanda', 'Bélgica', '2026-06-15 00:00:00+00', 'D'),
('Portugal', 'Bélgica', '2026-06-19 21:00:00+00', 'D'),
('Inglaterra', 'Holanda', '2026-06-20 00:00:00+00', 'D'),
('Bélgica', 'Inglaterra', '2026-06-24 21:00:00+00', 'D'),
('Portugal', 'Holanda', '2026-06-24 21:00:00+00', 'D');

-- Criar usuário admin padrão
INSERT INTO public.users (id, email, name, role, status) VALUES
('00000000-0000-0000-0000-000000000001', 'admin@bolao.com', 'Administrador', 'admin', 'approved')
ON CONFLICT (id) DO NOTHING;