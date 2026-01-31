import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Trophy,
  Target,
  CheckCircle,
  Calendar,
  TrendingUp,
  Info,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  Gamepad2,
  Upload,
  FileText,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { usePredictions } from '@/hooks/usePredictions';
import { useMatches } from '@/hooks/useMatches';
import { ROUTE_PATHS, BOLAOO_CONFIG } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

export default function UserDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { predictions, isLoading: predictionsLoading } = usePredictions(user?.id);
  const { matches } = useMatches();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [uploading, setUploading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(user);

  React.useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validar tipo de arquivo
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, envie um PDF ou imagem (JPG, PNG).",
        variant: "destructive",
      });
      return;
    }

    // Validar tamanho (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('payment_proofs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('payment_proofs')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          payment_receipt_url: publicUrl,
          is_approved: false
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setUploading(false);
      toast({
        title: "Sucesso!",
        description: "Comprovante enviado com sucesso. Aguarde a aprovação do administrador.",
      });

      // Atualiza o estado local para refletir a mudança imediatamente
      setCurrentUser(prev => prev ? {
        ...prev,
        payment_receipt_url: publicUrl,
        is_approved: false
      } : null);
    } catch (error: any) {
      setUploading(false);
      toast({
        title: "Erro ao enviar",
        description: error.message || "Ocorreu um erro ao processar seu arquivo.",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  const isApproved = user?.is_approved === true;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      {/* Welcome Hero Section */}
      {/* Welcome Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative overflow-hidden rounded-3xl bg-primary shadow-2xl shadow-primary/20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 h-full relative">

          {/* Left Content (Blue) */}
          <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center relative z-10 text-primary-foreground min-h-[240px]">
            <Badge variant="outline" className="w-fit mb-4 border-primary-foreground/30 text-primary-foreground">
              Copa do Mundo 2026
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Olá, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-primary-foreground/80 max-w-sm">
              Bem-vindo ao seu painel de controle. Acompanhe seu desempenho e gerencie seus palpites.
            </p>
          </div>

          {/* Right Image Background and Overlay Card */}
          <div className="lg:col-span-3 relative h-64 lg:h-auto overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={IMAGES.DASHBOARD_BG}
                alt="Estádio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent lg:w-32" />
            </div>

            {/* Floating Score Card */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-primary/90 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center text-primary-foreground shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-xs font-medium opacity-80 uppercase tracking-wider mb-2">Pontuação Total</div>
              <div className="text-5xl font-mono font-bold">{user?.total_points || 0}</div>
              <div className="text-xs mt-2 opacity-70">pontos acumulados</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Status Banner */}
      {!isApproved && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-4 rounded-xl border bg-amber-500/10 border-amber-500/20 text-amber-600"
        >
          <AlertCircle className="shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Aguardando Aprovação de Pagamento</p>
            <p className="text-sm opacity-90">
              Seu acesso total será liberado assim que confirmarmos seu comprovante de R$ 50,00.
            </p>
          </div>
          <Button variant="outline" size="sm" className="bg-white" asChild>
            <Link to={ROUTE_PATHS.RULES}>Ver Regras</Link>
          </Button>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={staggerItem}>
          <Card className="border-none shadow-lg bg-card overflow-hidden group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Placares Exatos</p>
                <h3 className="text-2xl font-bold font-mono">{user?.exact_scores || 0}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card className="border-none shadow-lg bg-card overflow-hidden group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-600 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Resultados Corretos</p>
                <h3 className="text-2xl font-bold font-mono">{user?.correct_results || 0}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card className="border-none shadow-lg bg-card overflow-hidden group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Palpites Feitos</p>
                <h3 className="text-2xl font-bold font-mono">{predictions.length}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Action Cards */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-primary" />
            Ações Rápidas
          </h2>
          <div className="flex flex-col gap-4">
            <Button
              className="h-auto p-4 justify-between group hover:bg-primary hover:text-primary-foreground"
              variant="secondary"
              onClick={() => navigate(ROUTE_PATHS.MY_PREDICTIONS)}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 opacity-70" />
                <div className="text-left">
                  <p className="font-bold">Meus Palpites</p>
                  <p className="text-xs opacity-70">Gerencie suas apostas</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              className="h-auto p-4 justify-between group hover:bg-primary hover:text-primary-foreground"
              variant="secondary"
              onClick={() => navigate(ROUTE_PATHS.RANKING)}
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 opacity-70" />
                <div className="text-left">
                  <p className="font-bold">Ver Ranking</p>
                  <p className="text-xs opacity-70">Veja sua posição na tabela</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              className="h-auto p-4 justify-between group hover:bg-primary hover:text-primary-foreground"
              variant="secondary"
              onClick={() => navigate(ROUTE_PATHS.RULES)}
            >
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 opacity-70" />
                <div className="text-left">
                  <p className="font-bold">Regulamento</p>
                  <p className="text-xs opacity-70">Pontuação e premiações</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <Card className="bg-muted/50 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-sm">Informações de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxa de Inscrição:</span>
                <span className="font-bold">{BOLAOO_CONFIG.CURRENCY} {BOLAOO_CONFIG.ENTRY_FEE.toFixed(2)}</span>
              </div>
              <div className="p-3 bg-card rounded-lg border border-dashed border-border mb-4">
                <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Chave PIX</p>
                <code className="text-xs font-mono break-all">{BOLAOO_CONFIG.PIX_KEY}</code>
              </div>

              {currentUser?.payment_receipt_url ? (
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 p-2 rounded-lg border text-xs ${currentUser.is_approved ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-amber-500/10 border-amber-500/20 text-amber-600'}`}>
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">
                      {currentUser.is_approved ? 'Pagamento Aprovado' : 'Aguardando Aprovação'}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs gap-2"
                    onClick={() => window.open(currentUser.payment_receipt_url, '_blank')}
                  >
                    Ver Comprovante
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className={`
                    w-full flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed 
                    transition-all cursor-pointer group
                    ${uploading ? 'bg-muted border-muted-foreground/20' : 'bg-primary/5 border-primary/20 hover:border-primary/50 hover:bg-primary/10'}
                  `}>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      accept="image/*,application/pdf"
                    />
                    {uploading ? (
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-primary uppercase">Enviar Comprovante</span>
                        <span className="text-[10px] text-muted-foreground mt-1 text-center">PDF ou Imagem (Máx 5MB)</span>
                      </>
                    )}
                  </label>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Progress & Overview */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Resumo de Participação
          </h2>

          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Completude de Palpites</CardTitle>
              <CardDescription>
                Mantenha seus palpites atualizados para não perder pontos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Fase de Grupos</span>
                  <span>{predictions.length} / {matches.length}</span>
                </div>
                <Progress value={(predictions.length / Math.max(1, matches.length)) * 100} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground uppercase font-bold">Primeiro Jogo</p>
                  <p className="text-sm font-semibold mt-1">11/06/2026, às 16:00</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground uppercase font-bold">Fechamento Palpites</p>
                  <p className="text-sm font-semibold mt-1">24 horas antes da copa começar</p>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4" />
                  Lembrete de Pontuação
                </h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">• 3 Pontos:</span> Acertar o placar exato da partida.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">• 1 Ponto:</span> Acertar o vencedor ou empate, mas errar o placar.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
