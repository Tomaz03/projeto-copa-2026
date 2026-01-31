import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ChevronLeft, Trophy, Target, TrendingUp, Calendar } from 'lucide-react';
import {
  ROUTE_PATHS,
  Match,
  Prediction,
  User,
  calculatePoints
} from '@/lib/index';
import { useMatches } from '@/hooks/useMatches';
import { MatchCard } from '@/components/MatchCard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';



/**
 * Página para visualizar palpites de um usuário específico.
 * Permite que participantes vejam as estratégias uns dos outros após o início dos jogos.
 */
export default function ViewPredictions() {
  const { userId } = useParams<{ userId: string }>();
  const { matches, isLoading: isLoadingMatches } = useMatches();

  // Busca os dados do usuário alvo
  const { data: targetUser, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return {
        ...data,
        name: data.name || data.full_name // Suporte para ambos os campos
      } as User;
    },
    enabled: !!userId,
  });

  // Busca os palpites do usuário alvo
  const { data: predictions = [], isLoading: isLoadingPredictions } = useQuery<Prediction[]>({
    queryKey: ['predictions', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Prediction[];
    },
    enabled: !!userId,
  });

  const isLoading = isLoadingMatches || isLoadingUser || isLoadingPredictions;

  // Mapeia palpites por ID da partida para acesso rápido
  const predictionsMap = React.useMemo(() => {
    return predictions.reduce((acc, pred) => {
      acc[pred.match_id] = pred;
      return acc;
    }, {} as Record<string, Prediction>);
  }, [predictions]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!targetUser) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Usuário não encontrado</h2>
        <Button asChild variant="secondary">
          <Link to={ROUTE_PATHS.RANKING}>Voltar para o Ranking</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header com Navegação */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Button asChild variant="ghost" className="mb-2 -ml-4 text-muted-foreground hover:text-foreground">
            <Link to={ROUTE_PATHS.RANKING}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar para o Ranking
            </Link>
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Palpites de <span className="text-primary">{targetUser.name}</span>
          </h1>
        </div>
        <Badge variant="outline" className="text-lg py-1 px-4 border-primary/30 bg-primary/5">
          Ranking: #{targetUser.total_points} pts
        </Badge>
      </div>

      {/* Stats do Usuário */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Card className="border-primary/10 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pontos Totais</p>
            </div>
            <p className="text-3xl font-bold font-mono">{targetUser.total_points}</p>
          </CardContent>
        </Card>

        <Card className="border-primary/10 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-green-500/10">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Placares Exatos</p>
            </div>
            <p className="text-3xl font-bold font-mono">{targetUser.exact_scores}</p>
          </CardContent>
        </Card>

        <Card className="border-primary/10 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Resultados Corretos</p>
            </div>
            <p className="text-3xl font-bold font-mono">{targetUser.correct_results}</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Lista de Jogos e Palpites */}
      <div className="space-y-12">
        {/* Agrupar por data ou simplesmente listar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {matches.map((match) => {
            const prediction = predictionsMap[match.id];
            const points = prediction
              ? calculatePoints(prediction.predicted_score_a, prediction.predicted_score_b, match.score_a, match.score_b)
              : 0;

            return (
              <div key={match.id} className="flex flex-col gap-2">
                <MatchCard match={match} />

                <Card className={`overflow-hidden border-l-4 ${prediction ? 'border-l-primary' : 'border-l-muted'}`}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-muted-foreground uppercase">Palpite do Usuário</span>
                      {prediction ? (
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-2xl font-black font-mono tracking-tighter">
                            {prediction.predicted_score_a} x {prediction.predicted_score_b}
                          </span>
                          {match.is_finished && (
                            <Badge
                              className={points === 3 ? 'bg-green-600' : points === 1 ? 'bg-blue-600' : 'bg-muted text-muted-foreground'}
                            >
                              +{points} {points === 1 ? 'ponto' : 'pontos'}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm italic text-muted-foreground mt-1">Sem palpite registrado</span>
                      )}
                    </div>

                    {match.is_finished && prediction && points === 3 && (
                      <div className="hidden sm:flex flex-col items-center">
                        <Trophy className="h-6 w-6 text-primary mb-1 animate-bounce" />
                        <span className="text-[10px] font-bold text-primary uppercase">Placar Exato!</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {matches.length === 0 && (
        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground">Nenhuma partida cadastrada no momento.</p>
        </div>
      )}
    </div>
  );
}
