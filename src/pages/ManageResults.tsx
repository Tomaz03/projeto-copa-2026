import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  Save,
  Trophy,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Search,
  Filter,
  Gamepad2,
  MapPin
} from 'lucide-react';
import { ROUTE_PATHS, Match, getTeamFlag } from '@/lib/index';
import { useMatches } from '@/hooks/useMatches';
import { MatchCard } from '@/components/MatchCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export default function ManageResults() {
  const {
    matches,
    isLoading,
    updateMatch,
    isUpdating
  } = useMatches();
  const { toast } = useToast();

  // Estado para controlar os inputs de placar e estádio de cada jogo
  const [scores, setScores] = useState<Record<string, { scoreA: string; scoreB: string; stadium: string }>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('A');

  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L'];

  const handleScoreChange = (matchId: string, side: 'scoreA' | 'scoreB' | 'stadium', value: string) => {
    // Apenas números para os scores
    if (side !== 'stadium' && value !== '' && !/^\d+$/.test(value)) return;

    setScores(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId] || { scoreA: '', scoreB: '', stadium: '' },
        [side]: value
      }
    }));
  };

  const handleSaveResult = async (matchId: string) => {
    const matchScores = scores[matchId];

    if (!matchScores || matchScores.scoreA === '' || matchScores.scoreB === '') {
      toast({
        title: "Campos incompletos",
        description: "Por favor, insira o placar de ambos os times.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateMatch({
        id: matchId,
        home_score: matchScores.scoreA !== '' ? parseInt(matchScores.scoreA, 10) : undefined,
        away_score: matchScores.scoreB !== '' ? parseInt(matchScores.scoreB, 10) : undefined,
        stadium: matchScores.stadium || undefined,
        is_finished: matchScores.scoreA !== '' && matchScores.scoreB !== '',
      });

      toast({
        title: "Resultado salvo!",
        description: "O placar foi atualizado e os pontos recalculados.",
      });

      // Limpar estado local do jogo salvo
      setScores(prev => {
        const newState = { ...prev };
        delete newState[matchId];
        return newState;
      });
    } catch (err) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um problema ao atualizar o resultado.",
        variant: "destructive",
      });
    }
  };

  const groupMatches = matches
    .filter(m => m.group_name === selectedGroup)
    .filter(m =>
      m.team_a.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.team_b.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground animate-pulse">Carregando partidas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-10">
          <Link
            to={ROUTE_PATHS.ADMIN_DASHBOARD}
            className="group inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Voltar para a Central</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500/80 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                Administração
              </h2>
              <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1">
                Lançamento de Resultados
              </h1>
              <p className="text-slate-400 mt-2">
                Insira os resultados reais para disparar o recálculo global de pontos.
              </p>
            </div>

            <div className="relative w-full md:w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                placeholder="Buscar por seleção..."
                className="pl-10 bg-[#161b22] border-slate-800 text-slate-200 focus:border-emerald-500/50 transition-all rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Group Selector */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {groups.map(group => (
            <Button
              key={group}
              onClick={() => setSelectedGroup(group)}
              variant={selectedGroup === group ? "default" : "outline"}
              className={`
                px-6 py-2 rounded-xl font-semibold transition-all
                ${selectedGroup === group
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-[#161b22] border-slate-800 text-slate-300 hover:bg-slate-800'
                }
              `}
            >
              Grupo {group}
            </Button>
          ))}
        </div>

        {/* Matches */}
        <Card className="bg-[#161b22] border-slate-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-emerald-500" />
              Grupo {selectedGroup}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {groupMatches.length} {groupMatches.length === 1 ? 'partida' : 'partidas'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {groupMatches.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma partida encontrada para este grupo</p>
              </div>
            ) : (
              groupMatches.map(match => {
                const matchScore = scores[match.id] || { scoreA: '', scoreB: '', stadium: '' };
                const isFinished = match.is_finished;

                return (
                  <Card key={match.id} className="bg-[#0d1117] border-slate-700/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        {/* Team A */}
                        <div className="flex-1 text-right min-w-[140px] flex items-center justify-end gap-3">
                          <strong className="text-lg text-white">{match.team_a}</strong>
                          <div className="w-10 h-7 bg-muted rounded overflow-hidden border border-slate-700">
                            <img
                              src={getTeamFlag(match.team_a)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Score Inputs */}
                        <div className="flex gap-3 items-center">
                          <Input
                            type="number"
                            min="0"
                            max="20"
                            className="w-16 text-center bg-[#161b22] border-slate-700 text-white font-mono text-lg"
                            value={isFinished ? (match.score_a ?? '') : matchScore.scoreA}
                            onChange={(e) => handleScoreChange(match.id, 'scoreA', e.target.value)}
                            placeholder="-"
                            disabled={isFinished}
                          />
                          <span className="text-2xl font-bold text-emerald-500">×</span>
                          <Input
                            type="number"
                            min="0"
                            max="20"
                            className="w-16 text-center bg-[#161b22] border-slate-700 text-white font-mono text-lg"
                            value={isFinished ? (match.score_b ?? '') : matchScore.scoreB}
                            onChange={(e) => handleScoreChange(match.id, 'scoreB', e.target.value)}
                            placeholder="-"
                            disabled={isFinished}
                          />
                        </div>

                        {/* Team B */}
                        <div className="flex-1 text-left min-w-[140px] flex items-center justify-start gap-3">
                          <div className="w-10 h-7 bg-muted rounded overflow-hidden border border-slate-700">
                            <img
                              src={getTeamFlag(match.team_b)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <strong className="text-lg text-white">{match.team_b}</strong>
                        </div>
                      </div>

                      {/* Stadium Input */}
                      <div className="mt-4 flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                          <MapPin className="w-3 h-3" /> Estádio
                        </label>
                        <Input
                          className="bg-[#161b22] border-slate-700 text-white text-sm"
                          value={matchScore.stadium || match.stadium || ''}
                          onChange={(e) => handleScoreChange(match.id, 'stadium', e.target.value)}
                          placeholder="Nome do estádio..."
                        />
                      </div>

                      {/* Date and Save Button */}
                      <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                        <div className="text-sm text-slate-500 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(match.match_date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>

                        {isFinished ? (
                          <div className="flex items-center gap-2 text-emerald-500 text-sm font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            Resultado lançado
                          </div>
                        ) : (
                          <Button
                            onClick={() => handleSaveResult(match.id)}
                            disabled={isUpdating}
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            {isUpdating ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Salvando...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4 mr-2" />
                                Salvar Resultado
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Info Alert */}
        <Card className="mt-6 bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5" />
              Importante
            </h3>
            <p className="text-slate-300 text-sm">
              Ao salvar os resultados, o sistema irá automaticamente recalcular as pontuações de todos os participantes
              com base nas regras do bolão (3 pontos para placar exato, 1 ponto para resultado correto).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
