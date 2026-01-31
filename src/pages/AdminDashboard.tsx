import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  CheckCircle,
  Gamepad2,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Settings,
  Clock
} from 'lucide-react';
import { ROUTE_PATHS, BOLAOO_CONFIG } from '@/lib/index';
import { useAuth, supabase } from '@/hooks/useAuth';
import { IMAGES } from '@/assets/images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface AdminStats {
  totalUsers: number;
  pendingUsers: number;
  finishedMatches: number;
  totalPredictions: number;
}

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    pendingUsers: 0,
    finishedMatches: 0,
    totalPredictions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate(ROUTE_PATHS.HOME);
      return;
    }

    async function fetchStats() {
      try {
        setLoading(true);

        const [
          { count: usersCount },
          { count: pendingCount },
          { count: matchesCount },
          { count: predictionsCount }
        ] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_approved', false),
          supabase.from('matches').select('*', { count: 'exact', head: true }).eq('is_finished', true),
          supabase.from('predictions').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          totalUsers: usersCount || 0,
          pendingUsers: pendingCount || 0,
          finishedMatches: matchesCount || 0,
          totalPredictions: predictionsCount || 0
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    }

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin, authLoading, navigate]);

  if (authLoading || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Skeleton className="w-full max-w-4xl h-[400px] rounded-xl" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Usuários Totais',
      value: stats.totalUsers,
      icon: <Users className="w-6 h-6 text-primary" />,
      description: 'Inscritos no sistema',
      color: 'bg-primary/10'
    },
    {
      label: 'Aprovações Pendentes',
      value: stats.pendingUsers,
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      description: 'Aguardando revisão',
      urgent: stats.pendingUsers > 0,
      color: 'bg-amber-500/10'
    },
    {
      label: 'Jogos Finalizados',
      value: stats.finishedMatches,
      icon: <CheckCircle className="w-6 h-6 text-emerald-500" />,
      description: 'Resultados inseridos',
      color: 'bg-emerald-500/10'
    },
    {
      label: 'Palpites Totais',
      value: stats.totalPredictions,
      icon: <Trophy className="w-6 h-6 text-primary" />,
      description: 'Dados registrados',
      color: 'bg-blue-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200">
      {/* Sidebar-like layout for Admin */}
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 pb-16">
          {/* Header */}
          <header className="relative py-16 px-6 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={IMAGES.STADIUM_2}
                alt="Stadium"
                className="w-full h-full object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0c10]" />
            </div>

            <div className="container mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary/80">
                      Central de Controle
                    </h2>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1">
                      Painel do Administrador
                    </h1>
                  </div>
                </div>
                <p className="text-slate-400 text-lg max-w-2xl">
                  Bem-vindo, {user?.name || user?.full_name?.split(' ')[0]}. Gerencie o ecossistema do {BOLAOO_CONFIG.TITLE} com precisão.
                </p>
              </motion.div>
            </div>
          </header>

          <main className="container mx-auto px-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-[#161b22] border-slate-800 hover:border-slate-700 transition-all group overflow-hidden">
                    <CardContent className="pt-6 relative">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-colors" />
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className={`p-3 rounded-xl ${stat.color}`}>
                          {stat.icon}
                        </div>
                        <span className="text-3xl font-mono font-bold text-white">
                          {loading ? '...' : stat.value}
                        </span>
                      </div>
                      <div className="relative z-10">
                        <p className="font-bold text-slate-100 text-lg">{stat.label}</p>
                        <p className="text-sm text-slate-400 mt-1">{stat.description}</p>
                      </div>
                      {stat.urgent && (
                        <div className="mt-4 pt-4 border-t border-slate-800">
                          <Badge variant="destructive" className="animate-pulse">
                            Ação Requerida
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Admin Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="bg-[#161b22] border-slate-800 h-full flex flex-col group hover:border-primary/50 transition-all overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-white">Gestão de Participantes</CardTitle>
                    <CardDescription className="text-slate-400 text-base mt-2">
                      Portal central para moderação de usuários, validação de transações PIX e controle de acesso individual.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pb-8">
                    <Button asChild className="w-full h-12 text-lg font-bold shadow-xl shadow-primary/20">
                      <Link to={ROUTE_PATHS.MANAGE_USERS}>
                        Abrir Módulo de Usuários
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="bg-[#161b22] border-slate-800 h-full flex flex-col group hover:border-emerald-500/50 transition-all overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Gamepad2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <CardTitle className="text-2xl text-white">Lançamento de Resultados</CardTitle>
                    <CardDescription className="text-slate-400 text-base mt-2">
                      Interface para inserção de placares oficiais. Inicia automaticamente o recálculo global de pontuações e rankings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pb-8">
                    <Button asChild variant="secondary" className="w-full h-12 text-lg font-bold border-emerald-500/20 hover:bg-emerald-500/10">
                      <Link to={ROUTE_PATHS.MANAGE_RESULTS}>
                        Lançar Resultados Reais
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* System Monitor Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="bg-[#0d1117] border-slate-800 border-dashed">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-slate-800">
                      <Settings className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white font-bold tracking-tight">Status do Sistema</CardTitle>
                      <CardDescription className="text-slate-500">Configurações globais e saúde da plataforma</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/5">
                    Operacional
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-4">
                    <div className="space-y-2">
                      <p className="text-xs uppercase font-bold text-slate-500 tracking-widest">Taxa de Adesão</p>
                      <p className="text-xl font-mono text-slate-200">
                        <span className="text-primary mr-1">{BOLAOO_CONFIG.CURRENCY}</span>
                        {BOLAOO_CONFIG.ENTRY_FEE.toFixed(2)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase font-bold text-slate-500 tracking-widest">Trava de Palpites</p>
                      <p className="text-xl font-mono text-slate-200">
                        {BOLAOO_CONFIG.MAX_PREDICTION_TIME_BEFORE_MATCH} min
                        <span className="text-xs text-slate-500 ml-2 font-sans font-normal">antes do jogo</span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase font-bold text-slate-500 tracking-widest">Referência</p>
                      <p className="text-xl font-mono text-slate-200">
                        {BOLAOO_CONFIG.TITLE} <span className="text-primary italic">{BOLAOO_CONFIG.YEAR}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
