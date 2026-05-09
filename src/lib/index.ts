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
  points_brazil_group?: number;
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
  official_score_a: number | null;
  official_score_b: number | null;
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
  exact_scores_brazil_group?: number;
  points_brazil_group?: number;
  exact_scores_usa_group?: number;
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
  PIX_KEY: '92413684387',
  MAX_PREDICTION_TIME_BEFORE_MATCH: 30, // minutos antes do jogo para travar palpites
};

/**
 * Mapeamento de seleções para códigos de bandeira (FlagCDN)
 */
export const TEAM_FLAGS: Record<string, string> = {
  // GRUPO A
  'México': 'mx',
  'África do Sul': 'za',
  'Coreia do Sul': 'kr',
  'República Tcheca': 'cz',
  'DEN/MKD/CZE/IRL': 'cz',
  
  // GRUPO B
  'Canadá': 'ca',
  'Bósnia e Herzegovina': 'ba',
  'Catar': 'qa',
  'Suíça': 'ch',
  'ITA/NIR/WAL/BIH': 'ba',
  
  // GRUPO C
  'Brasil': 'br',
  'Marrocos': 'ma',
  'Haiti': 'ht',
  'Escócia': 'gb-sct',
  
  // GRUPO D
  'Estados Unidos': 'us',
  'Paraguai': 'py',
  'Austrália': 'au',
  'Turquia': 'tr',
  'TUR/ROU/SVK/KOS': 'tr',
  
  // GRUPO E
  'Alemanha': 'de',
  'Curaçao': 'cw',
  'Costa do Marfim': 'ci',
  'Equador': 'ec',
  
  // GRUPO F
  'Holanda': 'nl',
  'Países Baixos': 'nl',
  'Japão': 'jp',
  'Suécia': 'se',
  'Tunísia': 'tn',
  'UKR/SWE/POL/ALB': 'se',
  
  // GRUPO G
  'Bélgica': 'be',
  'Egito': 'eg',
  'Irã': 'ir',
  'Nova Zelândia': 'nz',
  
  // GRUPO H
  'Espanha': 'es',
  'Cabo Verde': 'cv',
  'Arábia Saudita': 'sa',
  'Uruguai': 'uy',
  
  // GRUPO I
  'França': 'fr',
  'Senegal': 'sn',
  'Iraque': 'iq',
  'Noruega': 'no',
  
  // GRUPO J
  'Argentina': 'ar',
  'Argélia': 'dz',
  'Áustria': 'at',
  'Jordânia': 'jo',
  
  // GRUPO K
  'Portugal': 'pt',
  'RD Congo': 'cd',
  'Uzbequistão': 'uz',
  'Colômbia': 'co',
  
  // GRUPO L
  'Inglaterra': 'gb-eng',
  'Croácia': 'hr',
  'Gana': 'gh',
  'Panamá': 'pa',
  
  // Outros
  'Itália': 'it',
  'Dinamarca': 'dk',
  'Sérvia': 'rs',
  'Polônia': 'pl',
  'Camarões': 'cm',
  'Chile': 'cl',
  'País de Gales': 'gb-wls',
  'Irlanda do Norte': 'gb-nir',
};

/**
 * Mapeamento de placeholders de playoff para nomes de exibição corretos
 */
const PLACEHOLDER_NAMES: Record<string, string> = {
  'DEN/MKD/CZE/IRL': 'República Tcheca',
  'ITA/NIR/WAL/BIH': 'Bósnia e Herzegovina',
  'TUR/ROU/SVK/KOS': 'Turquia',
  'UKR/SWE/POL/ALB': 'Suécia',
};

/**
 * Retorna o nome de exibição correto de uma seleção,
 * substituindo placeholders de playoff pelo nome do país classificado
 */
export function getTeamDisplayName(teamName: string): string {
  if (!teamName) return teamName;
  return PLACEHOLDER_NAMES[teamName.trim()] ?? teamName.trim();
}

/**
 * Normaliza uma string para comparação (remove acentos, espaços extras e lowercase)
 */
const normalizeText = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

/**
 * Retorna a URL da bandeira de uma seleção ou uma imagem genérica
 */
export const getTeamFlag = (teamName: string, size: 'w20' | 'w40' | 'w80' | 'w160' | 'w320' | 'svg' = 'w160'): string => {
  if (!teamName) return 'https://flagcdn.com/w160/un.png';

  const normalizedInput = normalizeText(teamName);
  
  // 1. Tenta match exato no objeto
  let code = TEAM_FLAGS[teamName.trim()];
  
  // 2. Se não encontrar, tenta match normalizado
  if (!code) {
    const key = Object.keys(TEAM_FLAGS).find(
      k => normalizeText(k) === normalizedInput
    );
    if (key) code = TEAM_FLAGS[key];
  }

  if (code) {
    if (size === 'svg') {
      return `https://flagcdn.com/${code}.svg`;
    }
    return `https://flagcdn.com/${size}/${code}.png`;
  }
  
  // 3. Fallback para códigos diretos (ex: 'br', 'us')
  const cleanName = teamName.trim();
  if (cleanName.length <= 3) {
    const directCode = cleanName.toLowerCase();
    if (size === 'svg') {
      return `https://flagcdn.com/${directCode}.svg`;
    }
    return `https://flagcdn.com/${size}/${directCode}.png`;
  }

  // Fallback final
  return 'https://flagcdn.com/w160/un.png'; 
};

