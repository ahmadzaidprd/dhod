// ── Activity ──────────────────────────────────────
export type ActivityCategory =
  | "motorik"
  | "angka"
  | "huruf"
  | "hijaiyah"
  | "puzzle"
  | "tracing";

export type DifficultyLevel = "mudah" | "sedang" | "sulit";

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: ActivityCategory;
  difficulty: DifficultyLevel;
  ageRange: string;
  duration: string;
  href: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  progress?: number;
  completed?: boolean;
}

// ── Child Progress ────────────────────────────────
export interface ChildProgress {
  name: string;
  age: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  completedActivities: number;
  totalActivities: number;
  lastActive: string;
}

// ── Hijaiyah ──────────────────────────────────────
export interface HijaiyahLetter {
  id: string;
  arabic: string;
  latin: string;
  order: number;
}

export interface HijaiyahGameLevel {
  id: number;
  title: string;
  description: string;
  letters: HijaiyahLetter[];
}

// ── Tracing ───────────────────────────────────────
export type TracingType = "horizontal" | "vertical" | "diagonal" | "curve" | "zigzag";

export interface TracingLevel {
  id: number;
  label: string;
  description: string;
  type: TracingType;
  guideColor: string;
}

// ── Game State ────────────────────────────────────
export interface GameResult {
  activityId: string;
  score: number;
  maxScore: number;
  stars: number;        // 1–3
  completedAt: string;
  timeSeconds: number;
}

// ── Testimonial ───────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  childAge: string;
  rating: number;
}