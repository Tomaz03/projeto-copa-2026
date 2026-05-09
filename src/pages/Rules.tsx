import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Target,
  Clock,
  CreditCard,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Users
} from 'lucide-react';
import { ROUTE_PATHS, BOLAOO_CONFIG } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const springPresets = {
  gentle: {
    type: 'spring',
    stiffness: 300,
    damping: 35
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function Rules() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.BRAZIL_TEAM_6}
            alt="Copa 2026 Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={springPresets.gentle}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Regulamento <span className="text-primary">Oficial</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Tudo o que você precisa saber para se tornar o grande campeão do {BOLAOO_CONFIG.TITLE}.
          </p>
        </motion.div>
      </section>

      <main className="container mx-auto px-4 py-12 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Coluna da Esquerda: Pontuação e Regras Principais */}
          <div className="md:col-span-2 space-y-8">
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ ...springPresets.gentle, delay: 0.1 }}
            >
              <Card className="border-primary/20 shadow-xl bg-card/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-primary/10 border-b border-primary/10">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Target className="text-primary w-6 h-6" />
                    Sistema de Pontuação
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6">
                    A pontuação é calculada automaticamente após o encerramento de cada partida, seguindo os critérios abaixo:
                  </p>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="bg-primary text-primary-foreground font-mono text-xl w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Placar Exato</h4>
                        <p className="text-sm text-muted-foreground">
                          Você acertou exatamente o número de gols de ambas as seleções. Exemplo: Seu palpite foi 2x1 e o jogo terminou 2x1.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="bg-secondary text-secondary-foreground font-mono text-xl w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Resultado Correto</h4>
                        <p className="text-sm text-muted-foreground">
                          Você acertou o vencedor ou o empate, mas errou o placar exato. Exemplo: Seu palpite foi 1x0 e o jogo terminou 2x1.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="bg-destructive/10 text-destructive font-mono text-xl w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                        0
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Erro Total</h4>
                        <p className="text-sm text-muted-foreground">
                          Você errou o vencedor e o placar. Exemplo: Seu palpite foi 1x0 e o jogo terminou 1x1 ou 0x1.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ ...springPresets.gentle, delay: 0.2 }}
            >
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="text-primary w-5 h-5" />
                    Critérios de Desempate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Em caso de empate na pontuação total ao final do torneio, os seguintes critérios serão aplicados nesta ordem:
                  </p>
                  <ol className="space-y-3">
                    <li className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                      <span className="font-mono font-bold text-primary">01.</span>
                      <span>Maior número de <strong>Placares Exatos</strong> (3 pontos).</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                      <span className="font-mono font-bold text-primary">02.</span>
                      <span>Maior número de <strong>Resultados Corretos</strong> (1 ponto).</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                      <span className="font-mono font-bold text-primary">03.</span>
                      <span>Quem acertou o maior número de placares no grupo do Brasil.</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                      <span className="font-mono font-bold text-primary">04.</span>
                      <span>Quem acertou o maior número de pontos no grupo do Brasil.</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                      <span className="font-mono font-bold text-primary">05.</span>
                      <span>Quem acertou o maior número de placares no grupo dos EUA.</span>
                    </li>                  </ol>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Coluna da Direita: Prazos, Pagamento e Inscrição */}
          <div className="space-y-8">
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ ...springPresets.gentle, delay: 0.3 }}
            >
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Premiação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-primary-foreground/90">
                    O montante total arrecadado com as inscrições será distribuído da seguinte forma:
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border-b border-primary-foreground/20">
                      <span>1º Lugar</span>
                      <span className="font-bold">60% do prêmio</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border-b border-primary-foreground/20">
                      <span>2º Lugar</span>
                      <span className="font-bold">30% do prêmio</span>
                    </div>
                    <div className="flex justify-between items-center p-2">
                      <span>3º Lugar</span>
                      <span className="font-bold">10% do prêmio</span>
                    </div>
                  </div>
                  <p className="text-xs text-primary-foreground/70 italic">
                    * Taxas de administração da plataforma (se houver) serão deduzidas antes da distribuição.
                  </p>
                </CardContent>
              </Card>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ ...springPresets.gentle, delay: 0.4 }}
            >
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="text-primary w-5 h-5" />
                    Prazos Limite
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Para garantir a idoneidade do bolão, os palpites de cada partida são travados automaticamente
                    <strong> 24 horas </strong>
                    antes do início da copa.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                    Palpites até 1 dia antes da copa!
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ ...springPresets.gentle, delay: 0.5 }}
            >
              <Card className="border-border shadow-lg border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="text-primary w-5 h-5" />
                    Inscrição e Taxa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{BOLAOO_CONFIG.CURRENCY} {BOLAOO_CONFIG.ENTRY_FEE.toFixed(2)}</span>
                    <span className="text-muted-foreground text-sm">/ participante</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    O pagamento deve ser realizado via PIX para a chave abaixo. O comprovante deve ser enviado no momento do cadastro.
                  </p>
                  <div className="p-3 bg-muted rounded-md font-mono text-xs break-all border border-border">
                    {BOLAOO_CONFIG.PIX_KEY}
                  </div>
                  <Button asChild className="w-full mt-4">
                    <Link to={ROUTE_PATHS.REGISTER}>
                      Quero Participar <ChevronRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </div>

        {/* General Guidelines Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ ...springPresets.gentle, delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Diretrizes Gerais</h2>
            <p className="text-muted-foreground">Regras fundamentais para uma competição saudável.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="text-primary w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Transparência</h3>
              <p className="text-sm text-muted-foreground">
                Após o início de cada partida, os palpites de todos os usuários tornam-se públicos para consulta no Ranking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="text-primary w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Uma conta por CPF</h3>
              <p className="text-sm text-muted-foreground">
                Cada participante pode gerenciar apenas uma conta. Contas duplicadas serão banidas sem direito a reembolso.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <AlertCircle className="text-primary w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Casos Omissos</h3>
              <p className="text-sm text-muted-foreground">
                Qualquer situação não prevista neste regulamento será decidida soberanamente pela equipe de administração.
              </p>
            </div>
          </div>
        </motion.section>

        <footer className="mt-24 text-center border-t border-border pt-12 pb-8">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 {BOLAOO_CONFIG.TITLE}. Todos os direitos reservados. Jogue com responsabilidade.
          </p>
        </footer>
      </main >
    </div >
  );
}
