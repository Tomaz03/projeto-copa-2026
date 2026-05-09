import { Match, formatScore, getTeamFlag, getTeamDisplayName } from "@/lib/index";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MatchCardProps {
  match: Match;
  showResult?: boolean;
}

export function MatchCard({ match, showResult = true }: MatchCardProps) {
  const matchDate = new Date(match.match_date);
  const formattedDate = matchDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
  const formattedTime = matchDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isFinished = match.is_finished;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-t border-t-white/10">
        <CardContent className="p-5">
          {/* Header: Group and Status */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Grupo {match.group_name}
              </span>
            </div>
            <Badge
              variant={isFinished ? "secondary" : "outline"}
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5",
                isFinished ? "bg-secondary text-secondary-foreground" : "border-primary/30 text-primary"
              )}
            >
              {isFinished ? "Encerrado" : "Agendado"}
            </Badge>
          </div>

          {/* Teams and Scores */}
          <div className="grid grid-cols-7 items-center gap-2 mb-6">
            {/* Home Team */}
            <div className="col-span-3 flex flex-col items-center text-center gap-2">
              <div className="w-16 h-11 rounded-md bg-muted flex items-center justify-center overflow-hidden border border-border shadow-sm">
                <img
                  src={getTeamFlag(match.team_a)}
                  alt={match.team_a}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png';
                  }}
                />
              </div>
              <span className="text-sm font-bold tracking-tight">{getTeamDisplayName(match.team_a)}</span>
            </div>

            {/* Score Display */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="text-2xl font-mono font-bold flex items-center gap-1 tabular-nums">
                <span>{showResult ? formatScore(match.official_score_a) : "-"}</span>
                <span className="text-muted-foreground/30 text-lg">x</span>
                <span>{showResult ? formatScore(match.official_score_b) : "-"}</span>
              </div>
            </div>

            {/* Away Team */}
            <div className="col-span-3 flex flex-col items-center text-center gap-2">
              <div className="w-16 h-11 rounded-md bg-muted flex items-center justify-center overflow-hidden border border-border shadow-sm">
                <img
                  src={getTeamFlag(match.team_b)}
                  alt={match.team_b}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png';
                  }}
                />
              </div>
              <span className="text-sm font-bold tracking-tight">{getTeamDisplayName(match.team_b)}</span>
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-4 border-t border-border/50 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">
                {formattedDate} às {formattedTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-[11px] uppercase tracking-wider">
                {match.stadium || "Local a definir"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
