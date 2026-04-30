"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ChevronRight, Check, Volume2 } from "lucide-react";
import { useSound } from "@/lib/SoundContext";
import { useTouchDrag } from "@/lib/useTouchDrag";
import DragItem from "@/components/ui/DragItem";
import {
  speakHuruf,
  speakNamaHuruf,
  speakInstruksiHijaiyah,
  speakKotakHuruf,
  speakBenarHuruf,
  speakSalah,
  speakSemuaCocok,
  speakLevelSelesai,
  speakSemuaLevelSelesai,
  speakLanjutLevel,
} from "@/lib/voice";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SoundToggle from "@/components/ui/SoundToggle";

const allLevels = [
  { id: 1, title: "Level 1 — Alif s/d Jim", letters: [
    { id: "alif", arabic: "ا", latin: "Alif" }, { id: "ba", arabic: "ب", latin: "Ba" },
    { id: "ta", arabic: "ت", latin: "Ta" }, { id: "tsa", arabic: "ث", latin: "Tsa" },
    { id: "jim", arabic: "ج", latin: "Jim" },
  ]},
  { id: 2, title: "Level 2 — Ha s/d Ra", letters: [
    { id: "ha", arabic: "ح", latin: "Ha" }, { id: "kho", arabic: "خ", latin: "Kho" },
    { id: "dal", arabic: "د", latin: "Dal" }, { id: "dzal", arabic: "ذ", latin: "Dzal" },
    { id: "ra", arabic: "ر", latin: "Ra" },
  ]},
  { id: 3, title: "Level 3 — Zai s/d Dhod", letters: [
    { id: "zai", arabic: "ز", latin: "Zai" }, { id: "sin", arabic: "س", latin: "Sin" },
    { id: "syin", arabic: "ش", latin: "Syin" }, { id: "shod", arabic: "ص", latin: "Shod" },
    { id: "dhod", arabic: "ض", latin: "Dhod" },
  ]},
  { id: 4, title: "Level 4 — Tho s/d Fa", letters: [
    { id: "tho", arabic: "ط", latin: "Tho" }, { id: "zho", arabic: "ظ", latin: "Zho" },
    { id: "ain", arabic: "ع", latin: "Ain" }, { id: "ghain", arabic: "غ", latin: "Ghain" },
    { id: "fa", arabic: "ف", latin: "Fa" },
  ]},
  { id: 5, title: "Level 5 — Qof s/d Ya", letters: [
    { id: "qof", arabic: "ق", latin: "Qof" }, { id: "kaf", arabic: "ك", latin: "Kaf" },
    { id: "lam", arabic: "ل", latin: "Lam" }, { id: "mim", arabic: "م", latin: "Mim" },
    { id: "ya", arabic: "ي", latin: "Ya" },
  ]},
];

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export default function HijaiyahPage() {
  const { play, enabled } = useSound();
  const [levelIdx, setLevelIdx] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [available, setAvailable] = useState(() => shuffle(allLevels[0].letters));
  const [overZone, setOverZone] = useState<string | null>(null);
  const [wrongZone, setWrongZone] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const level = allLevels[levelIdx];
  const allMatched = matched.length === level.letters.length;
  const progress = Math.round((completedLevels.length / allLevels.length) * 100);

  useEffect(() => {
    if (enabled) setTimeout(() => speakInstruksiHijaiyah(), 800);
  }, [levelIdx]);

  const resetLevel = useCallback((idx: number) => {
    setMatched([]);
    setAvailable(shuffle(allLevels[idx].letters));
    setOverZone(null);
    setWrongZone(null);
  }, []);

  const goLevel = (idx: number) => {
    play.click();
    setLevelIdx(idx);
    resetLevel(idx);
    setAttempts(0);
  };

  const handleDrop = (dragItemId: string, dropZoneId: string | null) => {
    setOverZone(null);
    if (!dropZoneId || matched.includes(dropZoneId)) return;
    setAttempts((p) => p + 1);

    if (dragItemId === dropZoneId) {
      play.dropSuccess();
      const letter = level.letters.find((l) => l.id === dropZoneId);
      if (enabled) setTimeout(() => speakBenarHuruf(letter?.latin || ""), 200);

      setMatched((p) => [...p, dropZoneId]);
      setAvailable((p) => p.filter((l) => l.id !== dropZoneId));
      setScore((p) => p + 10);

      if (matched.length + 1 === level.letters.length) {
        if (!completedLevels.includes(levelIdx))
          setCompletedLevels((p) => [...p, levelIdx]);

        const allDone = completedLevels.length + 1 === allLevels.length && !completedLevels.includes(levelIdx);

        if (allDone) {
          setTimeout(() => {
            play.allComplete();
            if (enabled) setTimeout(() => speakSemuaLevelSelesai(), 600);
          }, 400);
        } else {
          setTimeout(() => {
            play.levelComplete();
            if (enabled) setTimeout(() => speakLevelSelesai(level.id), 400);
          }, 300);
        }
      }
    } else {
      play.dropFail();
      if (enabled) setTimeout(() => speakSalah(), 200);
      setWrongZone(dropZoneId);
      setTimeout(() => setWrongZone(null), 500);
    }
  };

  const {
    dragId, dragPos, handleTouchStart, handleTouchMove, handleTouchEnd, registerDropZone,
  } = useTouchDrag({
    onDragStart: (id) => {
      play.dragStart();
      const letter = level.letters.find((l) => l.id === id);
      if (enabled && letter) speakHuruf(letter.latin);
    },
    onDrop: handleDrop,
    onDragEnd: () => setOverZone(null),
  });

  const [deskDragId, setDeskDragId] = useState<string | null>(null);

  const tapHuruf = (letter: (typeof level.letters)[0]) => {
    if (enabled && !dragId) { play.click(); speakHuruf(letter.latin); }
  };

  const tapZone = (letter: (typeof level.letters)[0]) => {
    if (!matched.includes(letter.id) && enabled) { play.click(); speakKotakHuruf(letter.latin); }
  };

  const tapRef = (letter: (typeof level.letters)[0]) => {
    if (enabled) { play.click(); speakNamaHuruf(letter.latin); }
  };

  const stars = () => {
    if (!attempts) return 0;
    const a = (matched.length / attempts) * 100;
    return a >= 90 ? 3 : a >= 60 ? 2 : 1;
  };

  return (
    <main className="min-h-screen bg-cream-50">
      <div className="max-w-2xl mx-auto px-4 py-8 pt-10">
        <Link href="/dashboard" onClick={() => play.click()} className="inline-flex items-center gap-1.5 text-sm text-warm-sand hover:text-warm-brown mb-6">
          <ArrowLeft size={15} /> Kembali
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-cream-200 text-warm-brown text-xs font-semibold mb-2">ا Huruf Hijaiyah</span>
            <h1 className="text-2xl font-extrabold text-warm-brown-dark">Belajar Hijaiyah</h1>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold text-olive-600">{score}</p>
            <p className="text-xs text-warm-sand">Skor</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-beige-200 shadow-card p-4 mb-5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-semibold text-warm-brown-dark">Progress</span>
            <span className="text-warm-sand">{completedLevels.length}/{allLevels.length}</span>
          </div>
          <div className="h-2 rounded-full bg-beige-100 overflow-hidden">
            <div className="h-full rounded-full bg-olive-400 transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <button onClick={() => { if (enabled) speakInstruksiHijaiyah(); }}
          className="mb-4 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sage-50 border border-sage-200 text-sage-600 text-sm font-semibold hover:bg-sage-100 active:scale-95">
          <Volume2 size={16} /> Dengar Instruksi
        </button>

        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {allLevels.map((l, i) => (
            <button key={l.id} onClick={() => goLevel(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                i === levelIdx ? "bg-olive-500 text-white border-olive-500"
                : completedLevels.includes(i) ? "bg-olive-50 text-olive-600 border-olive-200"
                : "bg-white text-warm-sand border-beige-200"}`}>
              {completedLevels.includes(i) ? "✓ " : ""}Level {l.id}
            </button>
          ))}
        </div>

        {/* ═══ GAME AREA ═══ */}
        <div
          className="rounded-3xl bg-white border border-beige-200 shadow-soft-md p-5"
          style={{ touchAction: "none", overscrollBehavior: "none" }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <h2 className="text-base font-bold text-warm-brown-dark mb-1">{level.title}</h2>
          <p className="text-xs text-warm-sand mb-4">Seret huruf ke kotak • Ketuk untuk dengar</p>

          {/* Drop Zones */}
          <div className="grid grid-cols-5 gap-2 mb-5">
            {level.letters.map((letter) => (
              <div
                key={letter.id}
                data-dropzone={letter.id}
                ref={(el) => registerDropZone(letter.id, el)}
                onClick={() => tapZone(letter)}
                onDragOver={(e) => { e.preventDefault(); if (!matched.includes(letter.id)) setOverZone(letter.id); }}
                onDragLeave={() => setOverZone(null)}
                onDrop={(e) => { e.preventDefault(); if (!matched.includes(letter.id)) handleDrop(deskDragId!, letter.id); setDeskDragId(null); }}
                className={`rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-3 min-h-[85px] transition-all duration-200 cursor-pointer ${
                  matched.includes(letter.id) ? "bg-olive-50 border-olive-300 border-solid"
                  : overZone === letter.id ? "bg-sage-50 border-sage-400 scale-105"
                  : wrongZone === letter.id ? "bg-red-50 border-red-300 animate-pulse"
                  : "bg-beige-50 border-beige-300 hover:border-sage-300"
                }`}
              >
                {matched.includes(letter.id) ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl text-warm-brown-dark font-bold">{letter.arabic}</span>
                    <div className="w-5 h-5 rounded-full bg-olive-500 flex items-center justify-center"><Check size={12} className="text-white" /></div>
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="text-xs text-warm-sand font-medium block">{letter.latin}</span>
                    <Volume2 size={10} className="text-warm-sand mx-auto mt-1 opacity-50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Draggable Items */}
          <div className="rounded-2xl bg-beige-50 border border-beige-200 p-4">
            <p className="text-xs text-warm-sand mb-3">👆 Seret huruf:</p>
            <div className="flex flex-wrap gap-2 justify-center min-h-[65px]">
              {available.map((letter) => (
                <DragItem key={letter.id} id={letter.id} dragId={dragId} dragPos={dragPos}
                  onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} ghostSize={56}>
                  <div
                    draggable
                    onDragStart={() => { play.dragStart(); setDeskDragId(letter.id); if (enabled) speakHuruf(letter.latin); }}
                    onDragEnd={() => setDeskDragId(null)}
                    onClick={() => tapHuruf(letter)}
                    className="w-14 h-14 rounded-2xl bg-white border-2 border-beige-200 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:border-olive-300 hover:shadow-soft transition-all"
                  >
                    <span className="text-xl font-bold text-warm-brown-dark">{letter.arabic}</span>
                    <span className="text-[10px] text-warm-sand">{letter.latin}</span>
                  </div>
                </DragItem>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <button onClick={() => { play.click(); resetLevel(levelIdx); if (enabled) setTimeout(() => speakInstruksiHijaiyah(), 500); }}
              className="flex items-center gap-1.5 text-xs text-warm-sand hover:text-warm-brown px-3 py-1.5 rounded-xl hover:bg-beige-100">
              <RotateCcw size={12} /> Ulangi
            </button>
          </div>

          {allMatched && (
            <div className="mt-4 p-4 rounded-2xl bg-olive-50 border border-olive-100 text-center">
              <p className="text-base font-bold text-olive-600">🌟 Masya Allah! Semua cocok!</p>
              <div className="flex gap-1 justify-center mt-2">{[1,2,3].map((s) => <span key={s} className={`text-xl ${stars()>=s?"":"opacity-20"}`}>⭐</span>)}</div>
              <button onClick={() => { if (enabled) speakSemuaCocok(); }}
                className="mt-3 flex items-center gap-1.5 mx-auto px-4 py-2 rounded-xl bg-olive-100 text-olive-600 text-sm font-semibold hover:bg-olive-200">
                <Volume2 size={14} /> Dengar Lagi
              </button>
            </div>
          )}

          {allMatched && levelIdx < allLevels.length - 1 && (
            <button onClick={() => { if (enabled) speakLanjutLevel(allLevels[levelIdx + 1].id); setTimeout(() => goLevel(levelIdx + 1), 800); }}
              className="w-full mt-3 py-3 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-olive-500 hover:bg-olive-600 rounded-2xl">
              Lanjut Level <ChevronRight size={16} />
            </button>
          )}

          {completedLevels.length === allLevels.length && (
            <div className="mt-4 p-4 rounded-2xl bg-olive-50 border border-olive-100 text-center">
              <p className="text-base font-bold text-olive-600">🎉 Alhamdulillah! Semua selesai!</p>
              <p className="text-sm text-olive-500 mt-1">Total skor: {score}</p>
              <button onClick={() => { if (enabled) speakSemuaLevelSelesai(); }}
                className="mt-3 flex items-center gap-1.5 mx-auto px-4 py-2 rounded-xl bg-olive-100 text-olive-600 text-sm font-semibold hover:bg-olive-200">
                <Volume2 size={14} /> Dengar Lagi
              </button>
              <Link href="/dashboard" className="text-xs text-olive-500 hover:underline mt-3 inline-block">Dashboard</Link>
            </div>
          )}
        </div>

        {/* Referensi */}
        <div className="mt-4 rounded-2xl bg-beige-50 border border-beige-100 p-5">
          <p className="text-xs text-warm-sand mb-3">👆 Ketuk huruf untuk dengar:</p>
          <div className="grid grid-cols-5 gap-2">
            {level.letters.map((l) => (
              <button key={l.id} onClick={() => tapRef(l)}
                className="rounded-xl bg-white border border-beige-200 p-2.5 text-center hover:border-olive-300 hover:bg-olive-50 active:scale-95">
                <div className="text-xl font-bold text-warm-brown-dark">{l.arabic}</div>
                <div className="text-xs text-warm-sand mt-0.5">{l.latin}</div>
                <Volume2 size={10} className="text-warm-sand mx-auto mt-1 opacity-40" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-olive-50 border border-olive-100">
          <p className="text-xs text-warm-sand">💡 <strong className="text-warm-brown">Tips:</strong> Ketuk huruf untuk dengar namanya. 🔊 kiri bawah.</p>
        </div>

        <ScrollToTop />
        <SoundToggle />
      </div>
    </main>
  );
}