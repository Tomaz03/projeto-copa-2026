import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Trophy, Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/hooks/useAuth';
import { ROUTE_PATHS, BOLAOO_CONFIG } from '@/lib/index';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [canResetPassword, setCanResetPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeRecoverySession = async () => {
      setIsCheckingSession(true);
      setError(null);

      try {
        const code = searchParams.get('code');

        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
        } else if (window.location.hash) {
          const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');

          if (accessToken && refreshToken) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (sessionError) throw sessionError;
            window.history.replaceState(null, document.title, window.location.pathname);
          }
        }

        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          setCanResetPassword(false);
          setError('Link de recuperação inválido ou expirado. Solicite um novo link para redefinir sua senha.');
          return;
        }

        setCanResetPassword(true);
      } catch (err: any) {
        setCanResetPassword(false);
        setError(err.message || 'Não foi possível validar seu link de recuperação.');
      } finally {
        setIsCheckingSession(false);
      }
    };

    initializeRecoverySession();
  }, [searchParams]);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: ResetPasswordValues) {
    setIsLoading(true);
    setError(null);

    try {
      if (!canResetPassword) {
        throw new Error('Solicite um novo link de recuperação antes de alterar sua senha.');
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (updateError) throw updateError;

      setIsSuccess(true);
      setTimeout(() => {
        navigate(ROUTE_PATHS.LOGIN);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao redefinir sua senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {BOLAOO_CONFIG.TITLE}
          </h1>
          <p className="text-muted-foreground mt-2">
            Copa do Mundo {BOLAOO_CONFIG.YEAR}
          </p>
        </div>

        <Card className="border-border shadow-xl backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Redefinir Senha</CardTitle>
            <CardDescription className="text-center">
              Digite sua nova senha de acesso abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isCheckingSession ? (
              <div className="flex flex-col items-center justify-center gap-3 py-8 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="text-sm">Validando link de recuperação...</p>
              </div>
            ) : isSuccess ? (
              <div className="space-y-4 py-4">
                <Alert className="bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <AlertTitle>Sucesso!</AlertTitle>
                  <AlertDescription>
                    Sua senha foi redefinida com sucesso. Você será redirecionado para a página de login em instantes.
                  </AlertDescription>
                </Alert>
                <Button 
                  className="w-full" 
                  onClick={() => navigate(ROUTE_PATHS.LOGIN)}
                >
                  Ir para o Login
                </Button>
              </div>
            ) : canResetPassword ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nova Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className="pl-10 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Nova Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className="pl-10 pr-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full font-bold h-11" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Redefinir Senha'
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => navigate(ROUTE_PATHS.LOGIN)}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Voltar para o Login
                    </button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-4 py-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Não foi possível redefinir</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button
                  className="w-full"
                  onClick={() => navigate(ROUTE_PATHS.FORGOT_PASSWORD)}
                >
                  Solicitar novo link
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-8">
          &copy; 2026 {BOLAOO_CONFIG.TITLE}. Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
}
