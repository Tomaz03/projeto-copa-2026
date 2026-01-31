import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Search, Users, TrendingUp, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  ROUTE_PATHS,
  RankingEntry,
  BOLAOO_CONFIG
} from '@/lib/index';
import { RankingTable } from '@/components/RankingTable';
import { IMAGES } from '@/assets/images';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Ranking() {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Busca usuários aprovados ordenados pelos critérios de pontuação e desempate
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('id, name, full_name, total_points, exact_scores, correct_results')
          .eq('is_approved', true)
          .eq('is_admin', false)
          .order('total_points', { ascending: false })
          .order('exact_scores', { ascending: false })
          .order('correct_results', { ascending: false });

        if (fetchError) throw fetchError;

        // Adiciona a posição baseada na ordenação
        const formattedRankings = (data || []).map((entry: any, index: number) => ({
          ...entry,
          position: index + 1,
          name: entry.name || entry.full_name // Compatibilidade
        }));

        setRankings(formattedRankings);
      } catch (err: any) {
        console.error('Erro ao buscar ranking:', err);
        setError('Não foi possível carregar a classificação. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const filteredRankings = useMemo(() => {
    return rankings.filter((entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rankings, searchTerm]);

  const handleViewPredictions = (userId: string) => {
    navigate(ROUTE_PATHS.VIEW_PREDICTIONS.replace(':userId', userId));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <img
          src={IMAGES.RANKING_BG}
          alt="Ranking Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-primary/20 p-3 rounded-full border border-primary/30">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Classificação Geral
            </h1>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Acompanhe em tempo real quem está liderando o {BOLAOO_CONFIG.TITLE}.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 gap-8">

          {/* Search and Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm"
          >
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar participante..."
                className="pl-10 h-11 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{rankings.length} Participantes</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Atualizado em tempo real</span>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="bg-card rounded-xl border border-border p-8 space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-12 flex-1 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <RankingTable
                  rankings={filteredRankings}
                  onViewPredictions={handleViewPredictions}
                />

                {filteredRankings.length === 0 && !error && (
                  <div className="text-center py-20 bg-card rounded-xl border border-dashed border-border">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <p className="text-muted-foreground">
                      Nenhum participante encontrado com o termo "{searchTerm}".
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Rules Reminder Card */}
          <div className="bg-accent/30 rounded-2xl p-6 border border-accent/50 flex flex-col md:flex-row items-center gap-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-xl">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Entenda a Pontuação</h3>
              <p className="text-sm text-muted-foreground">
                <strong>3 Pontos:</strong> Placar exato da partida. <br />
                <strong>1 Ponto:</strong> Acerto do vencedor ou empate (resultado), mas com placar diferente. <br />
                <strong>0 Pontos:</strong> Errou o resultado da partida.
              </p>
            </div>
            <button
              onClick={() => navigate(ROUTE_PATHS.RULES)}
              className="md:ml-auto px-6 py-2 bg-background border border-border hover:bg-muted rounded-full text-sm font-semibold transition-colors"
            >
              Ver Regras Completas
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
