import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DifficultyLevel } from "@/types";

// ── cn helper ─────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Progress ──────────────────────────────────────
export function calcProgress(done: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(Math.round((done / total) * 100), 100);
}

// ── Level ─────────────────────────────────────────
export function getLevelTitle(level: number): string {
  const map: Record<number, string> = {
    1: "Penuntut Ilmu",
    2: "Pelajar Muda",
    3: "Murid Bersemangat",
    4: "Santri Kecil",
    5: "Hafiz Cilik",
  };
  return map[level] ?? "Penuntut Ilmu";
}

// ── Difficulty ────────────────────────────────────
export function getDifficultyLabel(d: any): string {
  const map: Record<string, string> = { 
    mudah: "Mudah", 
    sedang: "Sedang", 
    sulit: "Sulit" 
  };
  return map[d as string] ?? d;
}

export function getDifficultyColor(d: any): string {
  const colors: Record<string, string> = {
    mudah:  "text-olive-600 bg-olive-100",
    sedang: "text-warm-brown bg-cream-200",
    sulit:  "text-red-600 bg-red-50",
  };
  return colors[d as string] ?? "text-gray-600 bg-gray-100";
}

// ── Stars ─────────────────────────────────────────
export function calcStars(score: number, max: number): number {
  const pct = score / max;
  if (pct >= 0.9) return 3;
  if (pct >= 0.6) return 2;
  return 1;
}

// ── LocalStorage helpers ──────────────────────────
export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silent
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

// ── Format time ───────────────────────────────────
export function formatSeconds(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}