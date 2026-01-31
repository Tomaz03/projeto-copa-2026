import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy,
  Target,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Users,
  Calendar,
  Zap
} from 'lucide-react';
import { IMAGES } from '@/assets/images';
import logo from '@/assets/logo.png';
import { ROUTE_PATHS, BOLAOO_CONFIG } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.HERO_PLAYERS}
            alt="World Cup Players"
            className="w-full h-full object-cover object-top opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center pt-32">

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            VIVA A EMOÇÃO <br />
            <span className="text-primary">DA VITÓRIA</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Participe do maior bolão da Copa do Mundo 2026. Desafie seus amigos, mostre seus conhecimentos e concorra a prêmios exclusivos.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="text-lg px-8 h-14 rounded-full group" asChild>
              <Link to={ROUTE_PATHS.REGISTER}>
                Participar Agora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full" asChild>
              <Link to={ROUTE_PATHS.RULES}>
                Ver Regulamento
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats/Info Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors h-full">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Placares Exatos</h3>
                  <p className="text-muted-foreground">
                    Acerte o placar exato da partida e fature <strong>3 pontos</strong>. O caminho mais rápido para o topo do ranking.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors h-full">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Resultados Corretos</h3>
                  <p className="text-muted-foreground">
                    Errou o placar mas acertou quem venceu? Você ainda garante <strong>1 ponto</strong> importante na classificação.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors h-full">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Taxa de Inscrição</h3>
                  <p className="text-muted-foreground">
                    Apenas <strong>{BOLAOO_CONFIG.CURRENCY} {BOLAOO_CONFIG.ENTRY_FEE.toFixed(2)}</strong> para participar de toda a jornada da Copa.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visual Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Como Funciona o Nosso Sistema?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Faça seu Cadastro</h4>
                    <p className="text-muted-foreground">Crie sua conta em segundos e anexe o comprovante do PIX de inscrição.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Dê seus Palpites</h4>
                    <p className="text-muted-foreground">Insira seus palpites para todos os jogos da fase de grupos e mata-mata até 24 horas antes da copa começar.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Acompanhe o Ranking</h4>
                    <p className="text-muted-foreground">Veja sua posição subir em tempo real conforme os gols acontecem nos estádios da Copa.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border">
                <img
                  src={IMAGES.SYSTEM_INFO}
                  alt="FIFA World Cup Trophy and Ball"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.TROPHY_5}
            alt="World Cup Trophy"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-primary text-primary-foreground rounded-[2rem] p-12 md:p-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Pronto para se tornar o campeão?</h2>
              <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
                Não deixe para a última hora. Garanta sua vaga no bolão oficial da Copa do Mundo 2026 e comece a traçar sua estratégia.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" className="h-14 px-10 rounded-full font-bold" asChild>
                  <Link to={ROUTE_PATHS.REGISTER}>Quero Ganhar!</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 rounded-full bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                  <Link to={ROUTE_PATHS.TEAMS}>Ver Seleções</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Details */}
    </div>
  );
}
