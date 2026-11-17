'use client';

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  avatar: string;
  country: string;
  score: number;
  pairsCount: number; // 8, 16, 24, 32
  timeSeconds: number;
  moves: number;
  accuracy: number;
  date: string;
  weekId: string;
  isCurrentUser?: boolean;
}

// Helper to get ISO Week string like "2026-W39"
export function getCurrentWeekId(): string {
  const d = new Date();
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

export function getCurrentWeekLabel(): string {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diffToMonday));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return `Semana de ${monday.getDate()} a ${sunday.getDate()} de ${months[sunday.getMonth()]}`;
}

// Initial realistic community leaderboard for the week
const INITIAL_WEEKLY_ENTRIES: LeaderboardEntry[] = [
  {
    id: 'seed-1',
    playerName: 'Mariana Silva',
    avatar: '🦊',
    country: '🇧🇷',
    score: 9850,
    pairsCount: 32,
    timeSeconds: 112,
    moves: 36,
    accuracy: 94,
    date: new Date(Date.now() - 3600000 * 8).toISOString(),
    weekId: getCurrentWeekId()
  },
  {
    id: 'seed-2',
    playerName: 'Lucas Oliveira',
    avatar: '🦁',
    country: '🇧🇷',
    score: 9420,
    pairsCount: 32,
    timeSeconds: 124,
    moves: 40,
    accuracy: 90,
    date: new Date(Date.now() - 3600000 * 18).toISOString(),
    weekId: getCurrentWeekId()
  },
  {
    id: 'seed-3',
    playerName: 'Camila Santos',
    avatar: '🐼',
    country: '🇧🇷',
    score: 9150,
    pairsCount: 32,
    timeSeconds: 135,
    moves: 42,
    accuracy: 88,
    date: new Date(Date.now() - 3600000 * 26).toISOString(),
    weekId: getCurrentWeekId()
  },
  {
    id: 'seed-4',
    playerName: 'Alex Turner',
    avatar: '🚀',
    country: '🇬🇧',
    score: 8790,
    pairsCount: 32,
    timeSeconds: 148,
    moves: 46,
    accuracy: 82,
    date: new Date(Date.now() - 3600000 * 32).toISOString(),
    weekId: getCurrentWeekId()
  },
  {
    id: 'seed-5',
    playerName: 'Beatriz Costa',
    avatar: '🦄',
    country: '🇵🇹',
    score: 8320,
    pairsCount: 32,
    timeSeconds: 156,
    moves: 48,
    accuracy: 80,
    date: new Date(Date.now() - 3600000 * 42).toISOString(),
    weekId: getCurrentWeekId()
  },
  {
    id: 'seed-6',
    playerName: 'Pedro Henrique',
    avatar: '🐯',
    country: '🇧🇷',
    score: 4680,
    pairsCount: 16,
    timeSeconds: 62,
    moves: 19,
    accuracy: 92,
    date: new Date(Date.now() - 3600000 * 14).toISOString(),
    weekId: getCurrentWeekId()
  },
  {
    id: 'seed-7',
    playerName: 'Sofia Rocha',
    avatar: '🌟',
    country: '🇧🇷',
    score: 4520,
    pairsCount: 16,
    timeSeconds: 68,
    moves: 20,
    accuracy: 89,
    date: new Date(Date.now() - 3600000 * 22).toISOString(),
    weekId: getCurrentWeekId()
  },
  {
    id: 'seed-8',
    playerName: 'Gabriel Lima',
    avatar: '🦉',
    country: '🇧🇷',
    score: 2310,
    pairsCount: 8,
    timeSeconds: 28,
    moves: 9,
    accuracy: 95,
    date: new Date(Date.now() - 3600000 * 6).toISOString(),
    weekId: getCurrentWeekId()
  }
];

const STORAGE_KEY = 'bilingual_memory_leaderboard_v2';
const PLAYER_PROFILE_KEY = 'bilingual_memory_player_profile';

export interface PlayerProfile {
  name: string;
  avatar: string;
  country: string;
  totalGames: number;
  totalMatches: number;
  bestScore: number;
}

export function getStoredPlayerProfile(): PlayerProfile {
  if (typeof window === 'undefined') {
    return { name: 'Explorador', avatar: '🦁', country: '🇧🇷', totalGames: 0, totalMatches: 0, bestScore: 0 };
  }
  try {
    const raw = localStorage.getItem(PLAYER_PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { name: 'Novo Campeão', avatar: '🦁', country: '🇧🇷', totalGames: 0, totalMatches: 0, bestScore: 0 };
}

export function savePlayerProfile(profile: Partial<PlayerProfile>): PlayerProfile {
  const current = getStoredPlayerProfile();
  const updated = { ...current, ...profile };
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PLAYER_PROFILE_KEY, JSON.stringify(updated));
    } catch {}
  }
  return updated;
}

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return INITIAL_WEEKLY_ENTRIES;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_WEEKLY_ENTRIES));
      return INITIAL_WEEKLY_ENTRIES;
    }
    const parsed: LeaderboardEntry[] = JSON.parse(raw);
    return parsed.length > 0 ? parsed : INITIAL_WEEKLY_ENTRIES;
  } catch {
    return INITIAL_WEEKLY_ENTRIES;
  }
}

export function saveLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'date' | 'weekId'>): {
  entry: LeaderboardEntry;
  rank: number;
  isNewBest: boolean;
} {
  const currentList = getLeaderboard();
  const currentWeek = getCurrentWeekId();

  const newEntry: LeaderboardEntry = {
    ...entry,
    id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    date: new Date().toISOString(),
    weekId: currentWeek,
    isCurrentUser: true
  };

  const updatedList = [newEntry, ...currentList].sort((a, b) => b.score - a.score);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch {}
  }

  // Update profile
  const profile = getStoredPlayerProfile();
  const isNewBest = entry.score > profile.bestScore;
  savePlayerProfile({
    name: entry.playerName,
    avatar: entry.avatar,
    country: entry.country,
    totalGames: profile.totalGames + 1,
    totalMatches: profile.totalMatches + entry.pairsCount,
    bestScore: Math.max(profile.bestScore, entry.score)
  });

  // Calculate rank for this week & mode
  const weeklyForMode = updatedList
    .filter(e => e.weekId === currentWeek && e.pairsCount === entry.pairsCount)
    .sort((a, b) => b.score - a.score);

  const rank = weeklyForMode.findIndex(e => e.id === newEntry.id) + 1;

  return {
    entry: newEntry,
    rank: rank > 0 ? rank : 1,
    isNewBest
  };
}

export function calculateGameScore(params: {
  pairsCount: number;
  moves: number;
  timeSeconds: number;
  maxCombo: number;
}): {
  score: number;
  accuracy: number;
  stars: number;
  bonusPoints: number;
} {
  const { pairsCount, moves, timeSeconds, maxCombo } = params;

  // Base score: 120 points per pair
  const basePoints = pairsCount * 120;

  // Efficiency / Moves accuracy
  // Perfect game has moves == pairsCount (or minimum moves)
  const minMoves = pairsCount;
  const accuracy = Math.max(10, Math.min(100, Math.round((minMoves / Math.max(minMoves, moves)) * 100)));

  // Time bonus: fast clearing adds bonus
  const targetTime = pairsCount * 6; // 6 seconds per pair
  const timeBonus = Math.max(0, Math.round((targetTime - timeSeconds) * (pairsCount >= 32 ? 25 : 15)));

  // Combo multiplier
  const comboBonus = maxCombo * (pairsCount >= 32 ? 150 : 80);

  // Large board difficulty multiplier (playing with full 32 pairs is heavily rewarded!)
  const modeMultiplier = pairsCount === 32 ? 2.5 : pairsCount === 24 ? 1.8 : pairsCount === 16 ? 1.3 : 1.0;

  const totalScore = Math.round((basePoints + timeBonus + comboBonus + accuracy * 10) * modeMultiplier);

  // Star rating (1 to 3)
  let stars = 1;
  if (accuracy >= 70 && timeSeconds <= pairsCount * 9) stars = 2;
  if (accuracy >= 85 && timeSeconds <= pairsCount * 6) stars = 3;

  return {
    score: totalScore,
    accuracy,
    stars,
    bonusPoints: timeBonus + comboBonus
  };
}
