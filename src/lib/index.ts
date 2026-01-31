export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  RULES: '/rules',
  TEAMS: '/teams',
  DASHBOARD: '/dashboard',
  MY_PREDICTIONS: '/my-predictions',
  RANKING: '/ranking',
  VIEW_PREDICTIONS: '/predictions/:userId',
  ADMIN_DASHBOARD: '/admin',
  MANAGE_USERS: '/admin/users',
  MANAGE_RESULTS: '/admin/results',
  TEAM_DETAILS: '/teams/:teamId',
} as const;

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  full_name?: string;
  role?: UserRole;
  is_admin: boolean;
  is_approved: boolean;
  payment_receipt_url?: string;
  total_points?: number;
  exact_scores?: number;
  correct_results?: number;
  created_at: string;
}

export type MatchStatus = 'scheduled' | 'finished';

export interface Match {
  id: string;
  group_name: string;
  team_a: string;
  team_b: string;
  match_date: string;
  score_a: number | null;
  score_b: number | null;
  is_finished: boolean;
  stadium?: string;
  created_at?: string;
}

export interface Prediction {
  id: string;
  user_id: string;
  match_id: string;
  predicted_score_a: number;
  predicted_score_b: number;
  points: number;
  created_at?: string;
}

export interface RankingEntry {
  id: string;
  name: string;
  total_points: number;
  exact_scores: number;
  correct_results: number;
  position?: number;
}

/**
 * Calcula a pontuação baseada no palpite e no resultado real
 * Regras:
 * - 3 pontos: Placar exato
 * - 1 ponto: Acertou o vencedor ou empate, mas errou o placar exato
 * - 0 pontos: Errou o resultado
 */
export const calculatePoints = (
  predHome: number,
  predAway: number,
  actualHome: number | null,
  actualAway: number | null
): number => {
  if (actualHome === null || actualAway === null) return 0;

  // Placar Exato
  if (predHome === actualHome && predAway === actualAway) {
    return 3;
  }

  // Verificar se o resultado (vencedor/empate) coincide
  const predResult = Math.sign(predHome - predAway);
  const actualResult = Math.sign(actualHome - actualAway);

  if (predResult === actualResult) {
    return 1;
  }

  return 0;
};

/**
 * Formata o placar para exibição, tratando valores nulos
 */
export const formatScore = (score: number | null | undefined): string => {
  return score != null ? score.toString() : '-';
};

/**
 * Constantes de configuração do Bolão
 */
export const BOLAOO_CONFIG = {
  ENTRY_FEE: 50.0,
  CURRENCY: 'R$',
  YEAR: 2026,
  TITLE: 'Bolão da Copa 2026',
  PIX_KEY: 'financeiro@bolaocopa2026.com.br',
  MAX_PREDICTION_TIME_BEFORE_MATCH: 30, // minutos antes do jogo para travar palpites
};

/**
 * Mapeamento de seleções para códigos de bandeira (FlagCDN)
 */
export const TEAM_FLAGS: Record<string, string> = {
  'Brasil': 'br',
  'Argentina': 'ar',
  'França': 'fr',
  'Alemanha': 'de',
  'Espanha': 'es',
  'Portugal': 'pt',
  'Inglaterra': 'gb-eng',
  'Holanda': 'nl',
  'Bélgica': 'be',
  'Itália': 'it',
  'Uruguai': 'uy',
  'Croácia': 'hr',
  'Marrocos': 'ma',
  'Japão': 'jp',
  'Coreia do Sul': 'kr',
  'Estados Unidos': 'us',
  'México': 'mx',
  'Canadá': 'ca',
  'Suíça': 'ch',
  'Dinamarca': 'dk',
  'Sérvia': 'rs',
  'Polônia': 'pl',
  'Escócia': 'gb-sct',
  'Gana': 'gh',
  'Senegal': 'sn',
  'Camarões': 'cm',
  'Equador': 'ec',
  'Catar': 'qa',
  'Arábia Saudita': 'sa',
  'Austrália': 'au',
  'Tunísia': 'tn',
  'Costa do Marfim': 'ci',
  'Egito': 'eg',
  'Colômbia': 'co',
  'Paraguai': 'py',
  'Haiti': 'ht',
  'Curaçao': 'cw',
  'Panamá': 'pa',
  'África do Sul': 'za',
  'Irã': 'ir',
  'Nova Zelândia': 'nz',
  'Noruega': 'no',
  'Argélia': 'dz',
  'Áustria': 'at',
  'Jordânia': 'jo',
  'Uzbequistão': 'uz',
  'Cabo Verde': 'cv',
};

/**
 * Retorna a URL da bandeira de uma seleção ou uma imagem genérica
 */
export const getTeamFlag = (teamName: string): string => {
  const code = TEAM_FLAGS[teamName];
  if (code) {
    return `https://flagcdn.com/w160/${code}.png`;
  }
  // Fallback para times decididos/placeholder (ex: W73, 1A) ou combinações (DEN/MKD)
  return 'https://flagcdn.com/w160/un.png'; // Bandeira da ONU/Global como placeholder
};
