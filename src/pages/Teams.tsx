import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Trophy, Globe, MapPin } from 'lucide-react';
import { IMAGES } from '@/assets/images';
import { ROUTE_PATHS } from '@/lib/index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

interface Team {
  id: string;
  name: string;
  confederation: string;
  rank: number;
  keyPlayer: string;
  titles: number;
  isPlaceholder?: boolean;
}

const TEAMS_DATA: Team[] = [
  // GRUPO A
  { id: 'mx', name: 'México', confederation: 'CONCACAF', rank: 15, keyPlayer: 'Santiago Giménez', titles: 0 },
  { id: 'za', name: 'África do Sul', confederation: 'CAF', rank: 59, keyPlayer: 'Percy Tau', titles: 0 },
  { id: 'kr', name: 'Coreia do Sul', confederation: 'AFC', rank: 22, keyPlayer: 'Son Heung-min', titles: 0 },
  { id: 'cz', name: 'República Tcheca', confederation: 'UEFA', rank: 30, keyPlayer: 'Patrik Schick', titles: 0 },

  // GRUPO B
  { id: 'ca', name: 'Canadá', confederation: 'CONCACAF', rank: 35, keyPlayer: 'Alphonso Davies', titles: 0 },
  { id: 'ba', name: 'Bósnia e Herzegovina', confederation: 'UEFA', rank: 74, keyPlayer: 'Edin Džeko', titles: 0 },
  { id: 'qa', name: 'Catar', confederation: 'AFC', rank: 34, keyPlayer: 'Akram Afif', titles: 0 },
  { id: 'ch', name: 'Suíça', confederation: 'UEFA', rank: 19, keyPlayer: 'Granit Xhaka', titles: 0 },

  // GRUPO C
  { id: 'br', name: 'Brasil', confederation: 'CONMEBOL', rank: 5, keyPlayer: 'Vinícius Jr', titles: 5 },
  { id: 'ma', name: 'Marrocos', confederation: 'CAF', rank: 13, keyPlayer: 'Achraf Hakimi', titles: 0 },
  { id: 'ht', name: 'Haiti', confederation: 'CONCACAF', rank: 90, keyPlayer: 'Duckens Nazon', titles: 0 },
  { id: 'sc', name: 'Escócia', confederation: 'UEFA', rank: 39, keyPlayer: 'Scott McTominay', titles: 0 },

  // GRUPO D
  { id: 'us', name: 'EUA', confederation: 'CONCACAF', rank: 11, keyPlayer: 'Christian Pulisic', titles: 0 },
  { id: 'py', name: 'Paraguai', confederation: 'CONMEBOL', rank: 55, keyPlayer: 'Miguel Almirón', titles: 0 },
  { id: 'au', name: 'Austrália', confederation: 'AFC', rank: 24, keyPlayer: 'Nestory Irankunda', titles: 0 },
  { id: 'tr', name: 'Turquia', confederation: 'UEFA', rank: 26, keyPlayer: 'Hakan Çalhanoğlu', titles: 0 },

  // GRUPO E
  { id: 'de', name: 'Alemanha', confederation: 'UEFA', rank: 16, keyPlayer: 'Jamal Musiala', titles: 4 },
  { id: 'cw', name: 'Curaçau', confederation: 'CONCACAF', rank: 86, keyPlayer: 'Juninho Bacuna', titles: 0 },
  { id: 'ci', name: 'Costa do Marfim', confederation: 'CAF', rank: 38, keyPlayer: 'Sébastien Haller', titles: 0 },
  { id: 'ec', name: 'Equador', confederation: 'CONMEBOL', rank: 31, keyPlayer: 'Enner Valencia', titles: 0 },

  // GRUPO F
  { id: 'nl', name: 'Holanda', confederation: 'UEFA', rank: 7, keyPlayer: 'Cody Gakpo', titles: 0 },
  { id: 'jp', name: 'Japão', confederation: 'AFC', rank: 18, keyPlayer: 'Takefusa Kubo', titles: 0 },
  { id: 'se', name: 'Suécia', confederation: 'UEFA', rank: 28, keyPlayer: 'Alexander Isak', titles: 0 },
  { id: 'tn', name: 'Tunísia', confederation: 'CAF', rank: 41, keyPlayer: 'Ellyes Skhiri', titles: 0 },

  // GRUPO G
  { id: 'be', name: 'Bélgica', confederation: 'UEFA', rank: 10, keyPlayer: 'Kevin De Bruyne', titles: 0 },
  { id: 'eg', name: 'Egito', confederation: 'CAF', rank: 36, keyPlayer: 'Mohamed Salah', titles: 0 },
  { id: 'ir', name: 'Irã', confederation: 'AFC', rank: 20, keyPlayer: 'Mehdi Taremi', titles: 0 },
  { id: 'nz', name: 'Nova Zelândia', confederation: 'OFC', rank: 94, keyPlayer: 'Chris Wood', titles: 0 },

  // GRUPO H
  { id: 'es', name: 'Espanha', confederation: 'UEFA', rank: 3, keyPlayer: 'Lamine Yamal', titles: 1 },
  { id: 'cv', name: 'Cabo Verde', confederation: 'CAF', rank: 65, keyPlayer: 'Ryan Mendes', titles: 0 },
  { id: 'sa', name: 'Arábia Saudita', confederation: 'AFC', rank: 56, keyPlayer: 'Salem Al-Dawsari', titles: 0 },
  { id: 'uy', name: 'Uruguai', confederation: 'CONMEBOL', rank: 14, keyPlayer: 'Federico Valverde', titles: 2 },

  // GRUPO I
  { id: 'fr', name: 'França', confederation: 'UEFA', rank: 2, keyPlayer: 'Kylian Mbappé', titles: 2 },
  { id: 'sn', name: 'Senegal', confederation: 'CAF', rank: 21, keyPlayer: 'Nicolas Jackson', titles: 0 },
  { id: 'iq', name: 'Iraque', confederation: 'AFC', rank: 58, keyPlayer: 'Aymen Hussein', titles: 0 },
  { id: 'no', name: 'Noruega', confederation: 'UEFA', rank: 47, keyPlayer: 'Erling Haaland', titles: 0 },

  // GRUPO J
  { id: 'ar', name: 'Argentina', confederation: 'CONMEBOL', rank: 1, keyPlayer: 'Lionel Messi', titles: 3 },
  { id: 'dz', name: 'Argélia', confederation: 'CAF', rank: 33, keyPlayer: 'Riyad Mahrez', titles: 0 },
  { id: 'at', name: 'Áustria', confederation: 'UEFA', rank: 25, keyPlayer: 'Marcel Sabitzer', titles: 0 },
  { id: 'jo', name: 'Jordânia', confederation: 'AFC', rank: 71, keyPlayer: 'Musa Al-Taamari', titles: 0 },

  // GRUPO K
  { id: 'pt', name: 'Portugal', confederation: 'UEFA', rank: 8, keyPlayer: 'Bruno Fernandes', titles: 0 },
  { id: 'cd', name: 'RD Congo', confederation: 'CAF', rank: 61, keyPlayer: 'Yoane Wissa', titles: 0 },
  { id: 'uz', name: 'Uzbequistão', confederation: 'AFC', rank: 64, keyPlayer: 'Eldor Shomurodov', titles: 0 },
  { id: 'co', name: 'Colômbia', confederation: 'CONMEBOL', rank: 12, keyPlayer: 'Luis Díaz', titles: 0 },

  // GRUPO L
  { id: 'en', name: 'Inglaterra', confederation: 'UEFA', rank: 4, keyPlayer: 'Jude Bellingham', titles: 1 },
  { id: 'hr', name: 'Croácia', confederation: 'UEFA', rank: 11, keyPlayer: 'Luka Modric', titles: 0 },
  { id: 'gh', name: 'Gana', confederation: 'CAF', rank: 68, keyPlayer: 'Mohammed Kudus', titles: 0 },
  { id: 'pa', name: 'Panamá', confederation: 'CONCACAF', rank: 43, keyPlayer: 'Adalberto Carrasquilla', titles: 0 },
];

const CONFEDERATIONS = ['Todas', 'UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'];

export default function Teams() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [confederation, setConfederation] = useState('Todas');

  const filteredTeams = useMemo(() => {
    return TEAMS_DATA.filter(team => {
      const matchesSearch = team.name.toLowerCase().includes(search.toLowerCase());
      const matchesConfed = confederation === 'Todas' || team.confederation === confederation;
      return matchesSearch && matchesConfed;
    });
  }, [search, confederation]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.TEAMS_BG}
            alt="Copa 2026 Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springPresets.gentle}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
            Seleções da <span className="text-primary">Copa 2026</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça as potências mundiais que lutarão pelo título nos gramados da América do Norte.
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        {/* Filters */}
        <Card className="mb-12 border-primary/20 bg-card/80 backdrop-blur-md shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar seleção..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-primary" />
                <Select
                  value={confederation}
                  onValueChange={setConfederation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Confederação" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONFEDERATIONS.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-end text-sm text-muted-foreground">
                Exibindo {filteredTeams.length} de {TEAMS_DATA.length} seleções
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teams Grid by Group */}
        <div className="space-y-12">
          {Array.from({ length: 12 }).map((_, groupIndex) => {
            const groupLetter = String.fromCharCode(65 + groupIndex); // A, B, C...
            const groupTeams = filteredTeams.slice(groupIndex * 4, (groupIndex + 1) * 4);
            const filledTeams = groupTeams;

            // Only show groups that match search if needed, or always show structure
            if (filteredTeams.length < TEAMS_DATA.length && groupTeams.length === 0) return null;

            return (
              <div key={groupLetter} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-borderGradient" />
                  <h2 className="text-2xl font-bold text-primary px-4 py-1 bg-primary/10 rounded-full border border-primary/20">
                    Grupo {groupLetter}
                  </h2>
                  <div className="h-px flex-1 bg-borderGradient" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filledTeams.map((team: any, index) => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {team.isPlaceholder ? (
                        <Card className="h-full border-dashed border-2 border-muted hover:border-muted-foreground/50 transition-colors bg-muted/20">
                          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
                            <div className="w-24 h-24 opacity-50 relative">
                              <img
                                src={IMAGES.PLAYOFF_PLACEHOLDER}
                                alt="Playoff"
                                className="w-full h-full object-contain grayscale"
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-muted-foreground">Vaga de Playoff</h3>
                              <p className="text-xs text-muted-foreground/60 mt-1">Aguardando definição</p>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card
                          onClick={() => navigate(ROUTE_PATHS.TEAM_DETAILS.replace(':teamId', team.id))}
                          className="group h-full overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <Badge variant="outline" className="border-primary/30 text-primary">
                                {team.confederation}
                              </Badge>
                              {team.titles > 0 && (
                                <div className="flex gap-0.5">
                                  {Array.from({ length: team.titles }).map((_, i) => (
                                    <Trophy key={i} className="w-3 h-3 text-primary fill-primary" />
                                  ))}
                                </div>
                              )}
                            </div>
                            <CardTitle className="text-2xl font-bold mt-2 group-hover:text-primary transition-colors">
                              {team.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-2">
                                  <MapPin className="w-3.5 h-3.5" /> Ranking FIFA
                                </span>
                                <span className="font-mono font-bold">#{team.rank}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Destaque</span>
                                <span className="font-medium">{team.keyPlayer}</span>
                              </div>
                              <div className="pt-4 border-t border-border">
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary"
                                    style={{ width: `${Math.max(10, 100 - (team.rank * 1.5))}%` }}
                                  />
                                </div>
                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2 font-bold">
                                  Probabilidade de Título
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredTeams.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <Globe className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Nenhuma seleção encontrada</h3>
              <p className="text-muted-foreground">Tente ajustar seus filtros de busca.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Image Banner */}
      <section className="mt-32">
        <div className="container mx-auto px-4">
          <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={IMAGES.BRAZIL_TEAM_2}
              alt="Footer Banner"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/40" />
            <div className="absolute inset-0 flex items-center p-8 md:p-12">
              <div className="max-w-md">
                <h2 className="text-3xl font-bold mb-2">Rumo ao Hexa?</h2>
                <p className="text-muted-foreground mb-6">
                  Analise cada elenco e prepare seus palpites. A Copa do Mundo 2026 promete ser histórica.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold shadow-lg shadow-primary/20"
                  onClick={() => window.location.href = ROUTE_PATHS.MY_PREDICTIONS}
                >
                  Fazer meus palpites
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
