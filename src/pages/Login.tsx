import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import { ROUTE_PATHS, BOLAOO_CONFIG } from '@/lib/index';
import { supabase } from '@/hooks/useAuth';
import { IMAGES } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fadeInUp, springPresets } from '@/lib/motion';

const loginSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('E-mail ou senha incorretos.');
        }
        throw error;
      }

      toast.success('Login realizado com sucesso!');

      // Obter dados do usuário para verificar is_admin
      const { data: userData, error: roleError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      console.log('Dados do usuário autenticado:', userData);
      if (roleError) console.error('Erro ao buscar is_admin:', roleError);

      if (userData?.is_admin === true) {
        console.log('Redirecionando para ADMIN');
        navigate(ROUTE_PATHS.ADMIN_DASHBOARD);
      } else {
        console.log('Redirecionando para DASHBOARD comum');
        navigate(ROUTE_PATHS.DASHBOARD);
      }
    } catch (error: any) {
      console.error('Erro no processo de login:', error);
      toast.error(error.message || 'Erro ao realizar login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.LOGIN_BG}
          alt="Estádio"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background/80" />
      </div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={springPresets.gentle}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-border/40 bg-card/80 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="h-1.5 w-full bg-primary" />
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <LogIn className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Entre na sua conta do {BOLAOO_CONFIG.TITLE}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    disabled={isLoading}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to={ROUTE_PATHS.FORGOT_PASSWORD}
                    className="text-xs text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    disabled={isLoading}
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full font-bold h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Autenticando...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 text-center border-t border-border/50 pt-6">
            <p className="text-sm text-muted-foreground">
              Ainda não tem uma conta?{' '}
              <Link
                to={ROUTE_PATHS.REGISTER}
                className="text-primary font-semibold hover:underline underline-offset-4"
              >
                Cadastre-se agora
              </Link>
            </p>
            <div className="text-xs text-muted-foreground/60">
              © 2026 {BOLAOO_CONFIG.TITLE}. Todos os direitos reservados.
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <Link
            to={ROUTE_PATHS.HOME}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Voltar para a Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
