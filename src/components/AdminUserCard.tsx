import { User } from "@/lib/index.ts";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Ban,
  ExternalLink,
  Mail,
  Trophy,
  Target,
  Calendar,
  User as UserIcon
} from "lucide-react";

interface AdminUserCardProps {
  user: User;
  onApprove: (userId: string) => void;
  onBlock: (userId: string) => void;
}

export function AdminUserCard({ user, onApprove, onBlock }: AdminUserCardProps) {
  const getStatusBadge = (isApproved: boolean) => {
    if (isApproved) {
      return (
        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">
          Aprovado
        </Badge>
      );
    }
    return (
      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
        Pendente
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg leading-none tracking-tight">
              {user.name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </div>
          </div>
        </div>
        {getStatusBadge(user.is_approved)}
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Trophy className="h-3 w-3 text-primary" />
              Total de Pontos
            </div>
            <span className="text-2xl font-bold font-mono">{user.total_points}</span>
          </div>
          <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Target className="h-3 w-3 text-primary" />
              Placares Exatos
            </div>
            <span className="text-2xl font-bold font-mono">{user.exact_scores}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Cadastrado em: {formatDate(user.created_at)}
          </div>
          {user.is_admin && (
            <Badge variant="outline" className="text-[10px] py-0 h-5 border-primary/30 text-primary">
              ADMIN
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2 border-t border-border/40">
        {user.payment_receipt_url ? (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 border-border/60 hover:bg-accent"
            onClick={() => window.open(user.payment_receipt_url, "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
            Comprovante
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="flex-1 opacity-50 cursor-not-allowed" disabled>
            Sem Comprovante
          </Button>
        )}

        <div className="flex gap-2">
          {!user.is_approved && (
            <Button
              variant="default"
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => onApprove(user.id)}
              title="Aprovar Usuário"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}

          {user.is_approved && !user.is_admin && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onBlock(user.id)}
              title="Desaprovar Usuário"
            >
              <Ban className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
