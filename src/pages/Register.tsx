import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  User,
  Mail,
  Lock,
  Upload,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Trophy,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';

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
import { useToast } from '@/components/ui/use-toast';
import { springPresets, fadeInUp } from '@/lib/motion';

const registerSchema = z.object({
  fullName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Arquivo muito grande",
          description: "O comprovante deve ter no máximo 5MB.",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const onSubmit = async (values: RegisterFormValues) => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Comprovante ausente",
        description: "Você precisa anexar o comprovante de pagamento PIX.",
      });
      return;
    }

    setIsLoading(true);
    try {
      // 1. Criar usuário no Auth do Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Falha ao criar usuário');

      const userId = authData.user.id;

      // 2. Upload do comprovante para o Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random()}.${fileExt}`;
      const filePath = `receipts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('payment_proofs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('payment_proofs')
        .getPublicUrl(filePath);

      // 3. Inserir dados complementares na tabela profiles
      const { error: dbError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: values.fullName,
          name: values.fullName, // Adicionado para compatibilidade
          payment_receipt_url: publicUrl,
          is_approved: false,
          is_admin: false,
        });

      if (dbError) throw dbError;

      toast({
        title: "Cadastro realizado!",
        description: "Seu cadastro foi enviado para análise. Você será avisado por e-mail quando for aprovado.",
      });

      navigate(ROUTE_PATHS.LOGIN);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao tentar realizar seu cadastro.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={IMAGES.REGISTER_BG}
          alt="Background"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      <motion.div
        className="w-full max-w-2xl z-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={springPresets.gentle}
      >
        <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary via-primary/50 to-primary animate-pulse" />

          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center tracking-tight">
              Participe do {BOLAOO_CONFIG.TITLE}
            </CardTitle>
            <CardDescription className="text-center text-base">
              Preencha os dados e anexe seu comprovante para começar a palpitar.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Seção de Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" /> Dados Pessoais
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Seu nome completo"
                      className="pl-10"
                      {...register('fullName')}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemplo@email.com"
                      className="pl-10"
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      {...register('password')}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      {...register('confirmPassword')}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {/* Seção de Pagamento */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Pagamento
                </h3>

                <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taxa de Inscrição:</span>
                    <span className="font-bold text-lg text-primary">
                      {BOLAOO_CONFIG.CURRENCY} {BOLAOO_CONFIG.ENTRY_FEE.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Chave PIX:</Label>
                    <div className="flex items-center gap-2 bg-background p-2 rounded border border-input">
                      <code className="text-xs font-mono flex-1 truncate">
                        {BOLAOO_CONFIG.PIX_KEY}
                      </code>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[10px]"
                        onClick={() => {
                          navigator.clipboard.writeText(BOLAOO_CONFIG.PIX_KEY);
                          toast({ title: "Chave PIX copiada!" });
                        }}
                      >
                        Copiar
                      </Button>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    * Realize o pagamento via PIX e anexe o comprovante abaixo para que sua conta seja aprovada.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Comprovante de Pagamento</Label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                    onClick={() => document.getElementById('receipt-upload')?.click()}
                  >
                    <input
                      id="receipt-upload"
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    {file ? (
                      <>
                        <div className="p-2 rounded-full bg-primary/20">
                          <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-primary truncate max-w-full">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Clique para alterar
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="p-2 rounded-full bg-muted">
                          <Upload className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Upload do Comprovante</p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG ou PDF (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-4">
              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </div>
                ) : (
                  <>
                    Finalizar Cadastro
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                <Link
                  to={ROUTE_PATHS.LOGIN}
                  className="text-primary hover:underline font-semibold"
                >
                  Fazer Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Safety Badges */}
        <div className="mt-8 flex justify-center items-center gap-8 opacity-60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-muted">
              <AlertCircle className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">Dados protegidos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-muted">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">Suporte Garantido</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
