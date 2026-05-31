import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Lock } from 'lucide-react';
import {
  Match,
  Prediction,
  areTournamentPredictionsLocked,
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
import { toast } from 'sonner';

const requiredScoresMessage = 'O participante tem que colocar os palpites de ambos os times.';

const scoreSchema = z
  .string()
  .trim()
  .min(1, requiredScoresMessage)
  .refine((val) => !Number.isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Placar inválido',
  });

const predictionSchema = z.object({
  homeScore: scoreSchema,
  awayScore: scoreSchema,
});

type PredictionFormValues = z.infer<typeof predictionSchema>;

interface PredictionFormProps {
  match: Match;
  prediction?: Prediction;
  matches?: Match[];
  onSave: () => void;
}

export function PredictionForm({ match, prediction, matches = [match], onSave }: PredictionFormProps) {
  const { user } = useAuth();
  const { savePrediction, isSaving } = usePredictions(user?.id);
  const [isEditingSavedPrediction, setIsEditingSavedPrediction] = React.useState(false);
  const hasSavedPrediction = Boolean(prediction);
  const isEditButtonMode = hasSavedPrediction && !isEditingSavedPrediction;

  const isLocked = React.useMemo(() => {
    return areTournamentPredictionsLocked(matches);
  }, [matches]);
  const canEditScores = !isLocked && !isSaving && (!hasSavedPrediction || isEditingSavedPrediction);

  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      homeScore: prediction?.predicted_score_a?.toString() || '',
      awayScore: prediction?.predicted_score_b?.toString() || ''
    },
  });

  async function onSubmit(values: PredictionFormValues) {
    if (isLocked) return;
    if (isEditButtonMode) {
      setIsEditingSavedPrediction(true);
      toast.info('Altere o seu palpite agora');
      return;
    }

    try {
      await savePrediction({
        match,
        homeScore: parseInt(values.homeScore),
        awayScore: parseInt(values.awayScore),
        matches,
      });
      setIsEditingSavedPrediction(false);
      onSave();
    } catch (error) {
      // Erro já tratado no hook usePredictions com toast
    }
  }

  function handleEditClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsEditingSavedPrediction(true);
    toast.info('Altere o seu palpite agora');
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
                            disabled={!canEditScores}
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
                            disabled={!canEditScores}
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
                {isEditButtonMode ? (
                  <Button
                    type="button"
                    onClick={handleEditClick}
                    className="w-full h-12 font-semibold transition-all"
                    disabled={isLocked || isSaving}
                    variant={isLocked ? "secondary" : "default"}
                  >
                    {isLocked ? (
                      <span className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Prazo Encerrado
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Editar Palpite
                      </span>
                    )}
                  </Button>
                ) : (
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
                )}

                {isLocked && (
                  <p className="text-[11px] text-center text-muted-foreground">
                    Os jogos estão bloqueados para qualquer alteração conforme as regras do bolão.
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
