import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Info, ChevronRight, Loader2, Save } from 'lucide-react';
import { useMatches } from '@/hooks/useMatches';
import { usePredictions } from '@/hooks/usePredictions';
import { supabase } from '@/hooks/useAuth';
import { MatchCard } from '@/components/MatchCard';
import { PredictionForm } from '@/components/PredictionForm';
import { Match, BOLAOO_CONFIG } from '@/lib/index';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

export default function MyPredictions() {
  const [userId, setUserId] = useState<string | null>(null);
  const { matches, groups, isLoading: loadingMatches } = useMatches();
  const {
    getPredictionByMatchId,
    isLoading: loadingPredictions
  } = usePredictions(userId || undefined);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  const isLoading = loadingMatches || loadingPredictions || !userId;

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="flex gap-2 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 w-24 flex-shrink-0" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="w-full max-w-7xl mx-auto px-4 py-8 space-y-10"
    >
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-8">
        <motion.div variants={fadeInUp} className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm">
            <Trophy className="w-4 h-4" />
            <span>Copa do Mundo {BOLAOO_CONFIG.YEAR}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            Meus <span className="text-primary">Palpites</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Defina seus placares para cada partida. Lembre-se que o prazo limite é de
            <span className="font-semibold text-foreground mx-1">24 horas</span>
            antes do início da copa.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Alert className="bg-primary/5 border-primary/20 max-w-md">
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-bold">Dica de Pontuação</AlertTitle>
            <AlertDescription className="text-xs opacity-80">
              Placar exato: 3 pts | Resultado correto: 1 pt. Os palpites podem ser alterados até o fechamento do cronômetro.
            </AlertDescription>
          </Alert>
        </motion.div>
      </header>

      {/* Main Content with Tabs */}
      <Tabs defaultValue={groups[0]} className="w-full">
        <div className="sticky top-[calc(var(--header-height)+1px)] z-30 bg-background/95 backdrop-blur-md py-4 border-b border-border mb-8 overflow-x-auto">
          <TabsList className="inline-flex h-12 items-center justify-start bg-muted/50 p-1 rounded-lg border border-border/50">
            {groups
              .filter(group => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L'].includes(group))
              .map((group) => (
                <TabsTrigger
                  key={group}
                  value={group}
                  className="px-6 py-2 text-sm font-semibold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-md"
                >
                  Grupo {group}
                </TabsTrigger>
              ))}
          </TabsList>
        </div>

        {groups
          .filter(group => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L'].includes(group))
          .map((group) => (
            <TabsContent
              key={group}
              value={group}
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {matches
                  .filter((m) => m.group_name === group)
                  .map((match) => (
                    <motion.div
                      key={match.id}
                      variants={staggerItem}
                      className="group"
                    >
                      <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl bg-card/50 backdrop-blur-sm">
                        <div className="flex flex-col h-full">
                          <div className="bg-muted/30 px-6 py-3 flex justify-between items-center border-b border-border/50">
                            <Badge variant="outline" className="font-mono tracking-wider">
                              {new Date(match.match_date).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </Badge>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                              Estádio da Copa
                            </span>
                          </div>

                          <div className="p-6 space-y-6">
                            {/* Match Info Section */}
                            <MatchCard match={match} />

                            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                            {/* Prediction Section */}
                            <div className="relative">
                              {match.is_finished ? (
                                <div className="bg-muted/50 rounded-lg p-4 text-center border border-border/50">
                                  <p className="text-sm text-muted-foreground font-medium mb-1">Partida Encerrada</p>
                                  {getPredictionByMatchId(match.id) ? (
                                    <div className="flex flex-col items-center">
                                      <span className="text-2xl font-mono font-black text-foreground">
                                        {getPredictionByMatchId(match.id)?.predicted_score_a} x {getPredictionByMatchId(match.id)?.predicted_score_b}
                                      </span>
                                      <Badge
                                        variant={getPredictionByMatchId(match.id)?.points && getPredictionByMatchId(match.id)!.points! > 0 ? "default" : "secondary"}
                                        className="mt-2"
                                      >
                                        +{getPredictionByMatchId(match.id)?.points || 0} pontos
                                      </Badge>
                                    </div>
                                  ) : (
                                    <span className="text-xs italic opacity-60">Sem palpite registrado</span>
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Save className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-bold text-foreground/80 uppercase tracking-tighter">Seu Palpite</span>
                                  </div>
                                  <PredictionForm
                                    match={match}
                                    prediction={getPredictionByMatchId(match.id)}
                                    onSave={() => { }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          ))}
      </Tabs>

      {/* Summary Section Footer */}
      <footer className="mt-16 bg-card border border-border rounded-2xl p-8 shadow-inner overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Resumo de Palpites</h3>
            <p className="text-sm text-muted-foreground">
              Acompanhe seu progresso na competição
            </p>
          </div>
          <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl border border-border/50">
            <div className="bg-primary/20 p-3 rounded-lg text-primary">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold">Palpites Realizados</p>
              <p className="text-2xl font-mono font-black">
                {matches.filter(m => !!getPredictionByMatchId(m.id)).length} / {matches.length}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Badge variant="secondary" className="py-2 px-4 text-sm font-mono flex gap-2">
              <Calendar className="w-4 h-4" />
              Atualizado em {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
