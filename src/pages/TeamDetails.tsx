import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, MapPin, TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';

import { teamsData, TeamData } from '@/data/teamsData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const getFlagUrl = (teamId: string) => {
    const codes: Record<string, string> = {
        'en': 'gb-eng',
        'sc': 'gb-sct',
        'wa': 'gb-wls',
        'nir': 'gb-nir',
        'un_a': 'placeholder',
        'un_b': 'placeholder',
        'un_c': 'placeholder',
        'un_d': 'placeholder',
        'un_e': 'placeholder',
        'un_f': 'placeholder',
        'un_g': 'placeholder',
        'un_h': 'placeholder',
        'un_i': 'placeholder',
        'un_j': 'placeholder',
        'un_k': 'placeholder',
        'un_l': 'placeholder',
    };

    if (teamId.startsWith('un_')) return null;

    const code = codes[teamId] || teamId;
    return `https://flagcdn.com/${code}.svg`;
};

export default function TeamDetails() {
    const { teamId } = useParams<{ teamId: string }>();
    const navigate = useNavigate();

    const team = teamId ? teamsData[teamId] : null;

    if (!team) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold">Seleção não encontrada</h1>
                <Button onClick={() => navigate('/teams')}>Voltar para Seleções</Button>
            </div>
        );
    }

    const flagUrl = teamId ? getFlagUrl(teamId) : null;

    return (
        <div className="min-h-screen bg-background pb-20 pt-24 px-4 container mx-auto">
            <Button
                variant="ghost"
                onClick={() => navigate('/teams')}
                className="mb-8 hover:bg-white/10"
            >
                <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Team Identity */}
                <div className="col-span-1 space-y-6">
                    <Card className="overflow-hidden border-primary/20 shadow-xl bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-8 flex flex-col items-center text-center">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white/10 mb-6 bg-white">
                                {flagUrl ? (
                                    <img
                                        src={flagUrl}
                                        alt={`Bandeira ${team.name}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                        <Info className="w-12 h-12" />
                                    </div>
                                )}
                            </div>

                            <h1 className="text-4xl font-bold mb-2 text-primary">{team.name}</h1>
                            <Badge variant="outline" className="text-lg px-4 py-1 border-primary/40 mb-4">
                                Grupo {team.group}
                            </Badge>

                            <div className="grid grid-cols-2 gap-4 w-full mt-4">
                                <div className="bg-muted/30 p-3 rounded-lg">
                                    <p className="text-xs text-muted-foreground uppercase">Participações</p>
                                    <p className="text-xl font-bold">{team.wc_participations}</p>
                                </div>
                                <div className="bg-muted/30 p-3 rounded-lg">
                                    <p className="text-xs text-muted-foreground uppercase">Ranking</p>
                                    <p className="text-xl font-bold">-</p> {/* Rank not in teamData currently */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20 bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="w-5 h-5 text-primary" /> Resumo
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                {team.qualifiers.summary}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Stats & Matches */}
                <div className="col-span-1 lg:col-span-2 space-y-6">

                    {/* Qualifiers Stats */}
                    <Card className="border-primary/20 bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-primary" /> Desempenho nas Eliminatórias
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-4 text-center">
                                <div className="space-y-1">
                                    <p className="text-3xl font-bold text-white">{team.qualifiers.matches}</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Jogos</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-bold text-green-400">{team.qualifiers.won}</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Vitórias</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-bold text-yellow-400">{team.qualifiers.drawn}</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Empates</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-bold text-red-400">{team.qualifiers.lost}</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Derrotas</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Matches (Friendlies/Qualifiers) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Qualifiers Recent */}
                        {team.qualifiers.recent_matches && team.qualifiers.recent_matches.length > 0 && (
                            <Card className="border-primary/20 bg-card/50 h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <TrendingUp className="w-4 h-4 text-primary" /> Últimos Jogos Oficiais
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {team.qualifiers.recent_matches.map((match, idx) => (
                                        <div key={idx} className="flex flex-col gap-1 p-3 bg-muted/20 rounded-lg border border-white/5">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-sm">vs {match.opponent}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold font-mono text-primary">{match.score}</span>
                                                    <span className="text-xs text-muted-foreground">{match.date}</span>
                                                </div>
                                            </div>
                                            {match.competition && (
                                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">{match.competition}</span>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {/* Friendlies */}
                        {team.friendlies && team.friendlies.length > 0 && (
                            <Card className="border-primary/20 bg-card/50 h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Calendar className="w-4 h-4 text-primary" /> Amistosos Recentes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {team.friendlies.map((match, idx) => (
                                        <div key={idx} className="flex flex-col gap-1 p-3 bg-muted/20 rounded-lg border border-white/5">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-sm">vs {match.opponent}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold font-mono text-blue-400">{match.score}</span>
                                                    <span className="text-xs text-muted-foreground">{match.date}</span>
                                                </div>
                                            </div>
                                            {match.competition && (
                                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">{match.competition}</span>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
