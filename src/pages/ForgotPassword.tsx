import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, Trophy, CheckCircle2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ROUTE_PATHS, BOLAOO_CONFIG } from '@/lib/index';
import { supabase } from '@/hooks/useAuth';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

/**
 * Página para recuperação de senha.
 * Permite que o usuário insira seu e-mail para receber um link de redefinição via Supabase Auth.
 */
export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}${ROUTE_PATHS.RESET_PASSWORD}`,
      });

      if (resetError) throw resetError;

      setIsSuccess(true);
      toast({
        title: 'E-mail enviado',
        description: 'Instruções para redefinir sua senha foram enviadas para seu e-mail.',
      });
    } catch (err: any) {
      console.error('Erro ao enviar e-mail de recuperação:', err);
      setError(err.message || 'Ocorreu um erro inesperado ao tentar enviar o e-mail de recuperação.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Visual Background Effects - Stadium Modernism Aesthetic */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.3)] mb-6"
          >
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground text-center">
            {BOLAOO_CONFIG.TITLE}
          </h1>
          <p className="text-muted-foreground mt-2">Recuperação de Acesso 2026</p>
        </div>

        <Card className="border-border/50 bg-card/60 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Esqueceu a senha?</CardTitle>
            <CardDescription>
              Não se preocupe! Insira seu e-mail abaixo e enviaremos o link para você voltar a palpitar.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <Alert className="bg-primary/10 border-primary/20">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <AlertTitle className="font-bold">Link Enviado!</AlertTitle>
                  <AlertDescription className="text-foreground/80">
                    Verifique sua caixa de entrada. Enviamos um link de redefinição para o endereço informado.
                  </AlertDescription>
                </Alert>
                <p className="text-xs text-muted-foreground text-center italic">
                  Não recebeu? Verifique sua pasta de spam ou tente novamente após alguns minutos.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro na solicitação</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold">
                    E-mail Cadastrado
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemplo@email.com"
                      className="pl-10 h-11 border-border/50 bg-background/50 focus:ring-primary/20 transition-all"
                      disabled={isLoading}
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-base font-bold transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    'Enviar Link de Recuperação'
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-4 border-t border-border/20">
            <Link
              to={ROUTE_PATHS.LOGIN}
              className="group text-sm font-medium text-muted-foreground hover:text-primary transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Voltar para a tela de login
            </Link>
          </CardFooter>
        </Card>

        <div className="mt-10 text-center">
          <p className="text-xs text-muted-foreground/60 tracking-wider uppercase font-medium">
            © 2026 {BOLAOO_CONFIG.TITLE} • Rumo à Glória
          </p>
        </div>
      </motion.div>
    </div>
  );
}
