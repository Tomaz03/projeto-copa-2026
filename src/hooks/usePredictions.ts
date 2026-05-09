import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Prediction,
  BOLAOO_CONFIG,
  Match
} from '@/lib/index';
import { toast } from 'sonner';

export const usePredictions = (userId?: string) => {
  const queryClient = useQueryClient();

  // Busca todos os palpites de um usuário específico
  const {
    data: predictions = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['predictions', userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Prediction[];
    },
    enabled: !!userId,
  });

  // Busca todos os palpites (útil para ranking e admin)
  const fetchAllPredictions = async () => {
    const { data, error } = await supabase
      .from('predictions')
      .select('*');

    if (error) throw error;
    return data as Prediction[];
  };

  // Mutação para salvar ou atualizar um palpite
  const savePredictionMutation = useMutation({
    mutationFn: async ({
      match,
      homeScore,
      awayScore
    }: {
      match: Match;
      homeScore: number;
      awayScore: number;
    }) => {
      if (!userId) throw new Error('Usuário não autenticado');

      // Validação de prazo limite (lock time)
      const matchTime = new Date(match.match_date).getTime();
      const currentTime = new Date().getTime();
      const lockTimeLimit = BOLAOO_CONFIG.MAX_PREDICTION_TIME_BEFORE_MATCH * 60 * 1000;

      if (currentTime > (matchTime - lockTimeLimit)) {
        throw new Error('O prazo para palpitar nesta partida expirou.');
      }

      // Tenta encontrar palpite existente para este jogo
      const { data: existing } = await supabase
        .from('predictions')
        .select('id')
        .eq('user_id', userId)
        .eq('match_id', match.id)
        .single();

      const predictionData = {
        user_id: userId,
        match_id: match.id,
        predicted_score_a: homeScore,
        predicted_score_b: awayScore,
        updated_at: new Date().toISOString(),
      };

      if (existing) {
        const { error: updateError } = await supabase
          .from('predictions')
          .update(predictionData)
          .eq('id', existing.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('predictions')
          .insert([{ ...predictionData, created_at: new Date().toISOString() }]);

        if (insertError) throw insertError;
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['predictions', userId] });
      toast.success('Palpite salvo com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao salvar palpite');
    }
  });

  // Helper para encontrar um palpite específico na lista carregada
  const getPredictionByMatchId = (matchId: string) => {
    return predictions.find(p => p.match_id === matchId);
  };

  // Busca palpites de um usuário específico para visualização (Ranking)
  const fetchUserPredictionsById = async (targetUserId: string) => {
    const { data, error } = await supabase
      .from('predictions')
      .select(`
        *,
        matches (*)
      `)
      .eq('user_id', targetUserId);

    if (error) throw error;
    return data;
  };

  return {
    predictions,
    isLoading,
    error,
    savePrediction: savePredictionMutation.mutateAsync,
    isSaving: savePredictionMutation.isPending,
    getPredictionByMatchId,
    fetchAllPredictions,
    fetchUserPredictionsById
  };
};
