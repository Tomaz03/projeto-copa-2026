import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trophy, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import { RankingEntry } from '@/lib/index';
import { cn } from '@/lib/utils';

interface RankingTableProps {
  rankings: RankingEntry[];
  onViewPredictions: (userId: string) => void;
}

export function RankingTable({ rankings, onViewPredictions }: RankingTableProps) {
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-primary" />;
      case 2:
        return <Medal className="h-5 w-5 text-slate-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="font-mono font-bold text-muted-foreground">{position}º</span>;
    }
  };

  const getRowStyle = (position: number) => {
    if (position === 1) return 'bg-primary/5 hover:bg-primary/10 border-l-4 border-l-primary';
    if (position === 2) return 'bg-slate-400/5 hover:bg-slate-400/10 border-l-4 border-l-slate-400';
    if (position === 3) return 'bg-amber-600/5 hover:bg-amber-600/10 border-l-4 border-l-amber-600';
    return 'hover:bg-muted/50 transition-colors';
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[80px] text-center">Pos</TableHead>
              <TableHead>Participante</TableHead>
              <TableHead className="text-center">Pts</TableHead>
              <TableHead className="text-center hidden sm:table-cell">Placares Exatos</TableHead>
              <TableHead className="text-center hidden md:table-cell">Resultados</TableHead>
              <TableHead className="text-right">Palpites</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  Nenhum participante encontrado no ranking.
                </TableCell>
              </TableRow>
            ) : (
              rankings.map((user, index) => {
                const position = user.position || index + 1;
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "group border-b border-border",
                      getRowStyle(position)
                    )}
                  >
                    <TableCell className="text-center py-4">
                      <div className="flex items-center justify-center">
                        {getPositionIcon(position)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="text-foreground">{user.name}</span>
                        {position <= 3 && (
                          <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
                            {position === 1 ? 'Campeão' : position === 2 ? 'Vice-Campeão' : '3º Colocado'}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="font-mono text-lg bg-background shadow-sm border-primary/20">
                        {user.total_points}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center hidden sm:table-cell">
                      <span className="font-mono text-muted-foreground">{user.exact_scores}</span>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <span className="font-mono text-muted-foreground">{user.correct_results}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewPredictions(user.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        <span className="hidden lg:inline">Ver Palpites</span>
                      </Button>
                    </TableCell>
                  </motion.tr>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 bg-muted/20 border-t border-border">
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Placar Exato: 3 pts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <span>Resultado/Empate: 1 pt</span>
          </div>
          <div className="ml-auto font-medium italic">
            Critérios de desempate: 1. Pontos &gt; 2. Placares Exatos &gt; 3. Resultados
          </div>
        </div>
      </div>
    </div>
  );
}
