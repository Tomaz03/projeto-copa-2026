import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Lock, Trophy } from 'lucide-react';
import {
  Match,
  Prediction,
  BOLAOO_CONFIG,
  getTeamFlag,
  getTeamDisplayName
} from '@/lib/index';
import { usePredictions } from '@/hooks/usePredictions';
import { useAuth } from '@/hooks/useAuth';
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
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { springPresets } from '@/lib/motion';

const predictionSchema = z.object({
  homeScore: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Placar inválido',
  }),
  awayScore: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Placar inválido',
  }),
});

type PredictionFormValues = z.infer<typeof predictionSchema>;

interface PredictionFormProps {
  match: Match;
  prediction?: Prediction;
  onSave: () => void;
}

export function PredictionForm({ match, prediction, onSave }: PredictionFormProps) {
  const { user } = useAuth();
  const { savePrediction, isSaving } = usePredictions(user?.id);

  const isLocked = React.useMemo(() => {
    const matchTime = new Date(match.match_date).getTime();
    const currentTime = new Date().getTime();
    const lockTimeLimit = BOLAOO_CONFIG.MAX_PREDICTION_TIME_BEFORE_MATCH * 60 * 1000;
    return currentTime > (matchTime - lockTimeLimit);
  }, [match.match_date]);

  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      homeScore: prediction?.predicted_score_a?.toString() || '',
      awayScore: prediction?.predicted_score_b?.toString() || ''
    },
  });

  async function onSubmit(values: PredictionFormValues) {
    if (isLocked) return;

    try {
      await savePrediction({
        match,
        homeScore: parseInt(values.homeScore),
        awayScore: parseInt(values.awayScore),
      });
      onSave();
    } catch (error) {
      // Erro já tratado no hook usePredictions com toast
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springPresets.gentle}
    >
      <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Home Team */}
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-16 h-11 bg-muted rounded-md flex items-center justify-center overflow-hidden border border-border shadow-sm">
                    <img
                      src={getTeamFlag(match.team_a)}
                      alt={match.team_a}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png';
                      }}
                    />
                  </div>
                  <span className="font-semibold text-sm md:text-base text-center">{getTeamDisplayName(match.team_a)}</span>
                  <FormField
                    control={form.control}
                    name="homeScore"
                    render={({ field }) => (
                      <FormItem className="w-20">
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            disabled={isLocked || isSaving}
                            placeholder="0"
                            className="text-center font-mono text-xl h-12 focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] text-center" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Separator */}
                <div className="flex items-center justify-center pt-8">
                  <span className="text-2xl font-bold text-muted-foreground/50">X</span>
                </div>

                {/* Away Team */}
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-16 h-11 bg-muted rounded-md flex items-center justify-center overflow-hidden border border-border shadow-sm">
                    <img
                      src={getTeamFlag(match.team_b)}
                      alt={match.team_b}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png';
                      }}
                    />
                  </div>
                  <span className="font-semibold text-sm md:text-base text-center">{getTeamDisplayName(match.team_b)}</span>
                  <FormField
                    control={form.control}
                    name="awayScore"
                    render={({ field }) => (
                      <FormItem className="w-20">
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            disabled={isLocked || isSaving}
                            placeholder="0"
                            className="text-center font-mono text-xl h-12 focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] text-center" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full h-12 font-semibold transition-all"
                  disabled={isLocked || isSaving}
                  variant={isLocked ? "secondary" : "default"}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2 animate-pulse">
                      Salvando...
                    </span>
                  ) : isLocked ? (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Prazo Encerrado
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Salvar Palpite
                    </span>
                  )}
                </Button>

                {isLocked && (
                  <p className="text-[11px] text-center text-muted-foreground">
                    O prazo para palpites encerra {BOLAOO_CONFIG.MAX_PREDICTION_TIME_BEFORE_MATCH} minutos antes do início.
                  </p>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
