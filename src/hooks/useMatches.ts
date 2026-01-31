import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Match } from '@/lib/index';

/**
 * Hook personalizado para gerenciar dados das partidas da Copa do Mundo 2026.
 * Fornece funcionalidades de busca, filtragem e atualização de resultados.
 */
export const useMatches = () => {
  const queryClient = useQueryClient();

  /**
   * Busca todas as partidas ordenadas por data.
   */
  const {
    data: matches = [],
    isLoading,
    error
  } = useQuery<Match[]>({
    queryKey: ['matches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .order('match_date', { ascending: true });

      if (error) {
        console.error('Erro ao buscar partidas:', error);
        throw new Error('Não foi possível carregar as partidas. Por favor, tente novamente.');
      }

      return data as Match[];
    },
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  });

  /**
   * Mutação para atualizar o resultado de uma partida (Apenas Admin).
   * Ao atualizar, altera o status para 'finished'.
   */
  const updateMatchMutation = useMutation({
    mutationFn: async ({
      id,
      home_score,
      away_score,
      stadium,
      match_date,
      is_finished = true
    }: {
      id: string;
      home_score?: number;
      away_score?: number;
      stadium?: string;
      match_date?: string;
      is_finished?: boolean;
    }) => {
      const updateData: any = { is_finished };
      if (home_score !== undefined) updateData.score_a = home_score;
      if (away_score !== undefined) updateData.score_b = away_score;
      if (stadium !== undefined) updateData.stadium = stadium;
      if (match_date !== undefined) updateData.match_date = match_date;

      const { data, error } = await supabase
        .from('matches')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar resultado:', error);
        throw new Error('Falha ao salvar o resultado oficial da partida.');
      }

      return data as Match;
    },
    onSuccess: () => {
      // Invalida o cache das partidas e também do ranking, pois novos pontos serão calculados
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
      queryClient.invalidateQueries({ queryKey: ['predictions'] });
    },
  });

  /**
   * Retorna as partidas filtradas por um grupo específico (A, B, C, etc.)
   */
  const getMatchesByGroup = (group: string) => {
    return matches.filter(match => match.group_name === group);
  };

  /**
   * Extrai a lista de grupos únicos presentes nas partidas
   */
  const groups = Array.from(new Set(matches.map(m => m.group_name))).sort();

  /**
   * Separa as partidas entre próximas (scheduled) e finalizadas (finished)
   */
  const upcomingMatches = matches.filter(m => !m.is_finished);
  const finishedMatches = matches.filter(m => m.is_finished);

  return {
    matches,
    upcomingMatches,
    finishedMatches,
    groups,
    isLoading,
    error,
    updateMatch: updateMatchMutation.mutateAsync,
    isUpdating: updateMatchMutation.isPending,
    getMatchesByGroup,
  };
};