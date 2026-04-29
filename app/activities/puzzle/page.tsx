"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Check, Volume2 } from "lucide-react";
import { useSound } from "@/lib/SoundContext";
import {
  speak,
  speakNamaBentuk,
  speakInstruksiBentuk, // ← nama baru
  speakBenar,
  speakSalah,
  speakSemuaCocok,
} from "@/lib/voice";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SoundToggle from "@/components/ui/SoundToggle";

const shapes = [
  {
    id: "lingkaran",
    name: "Lingkaran",
    desc: "Bulat",
    color: "bg-olive-100 border-olive-300",
    icon: "●",
    ic: "text-olive-500",
    emoji: "🟢",
  },
  {
    id: "segitiga",
    name: "Segitiga",
    desc: "3 sisi",
    color: "bg-sage-100 border-sage-300",
    icon: "▲",
    ic: "text-sage-500",
    emoji: "🔺",
  },
  {
    id: "persegi",
    name: "Persegi",
    desc: "4 sisi",
    color: "bg-cream-200 border-cream-400",
    icon: "■",
    ic: "text-warm-brown",
    emoji: "🟧",
  },
  {
    id: "bintang",
    name: "Bintang",
    desc: "5 ujung",
    color: "bg-beige-200 border-beige-400",
    icon: "★",
    ic: "text-warm-brown",
    emoji: "⭐",
  },
  {
    id: "hati",
    name: "Hati",
    desc: "Cinta",
    color: "bg-olive-100 border-olive-300",
    icon: "♥",
    ic: "text-olive-600",
    emoji: "❤️",
  },
  {
    id: "berlian",
    name: "Berlian",
    desc: "4 sisi miring",
    color: "bg-sage-100 border-sage-300",
    icon: "◆",
    ic: "text-sage-600",
    emoji: "💎",
  },
];

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export default function PuzzlePage() {
  const { play, enabled } = useSound();
  const [matched, setMatched] = useState<string[]>([]);
  const [avail, setAvail] = useState(() => shuffle(shapes));
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [wrongZ, setWrongZ] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const allM = matched.length === shapes.length;
  const progress = Math.round((matched.length / shapes.length) * 100);

  // ── Saat halaman pertama kali dibuka, bacakan instruksi ──
  useEffect(() => {
    if (enabled) {
      setTimeout(() => {
        speakInstruksiBentuk();
      }, 800);
    }
  }, []);

  // ── Drop handler ──
  const onDrop = (zId: string) => {
    setOver(null);
    setAttempts((p) => p + 1);

    if (dragId === zId) {
      // ✅ BENAR
      play.dropSuccess();
      const shape = shapes.find((s) => s.id === zId);

      // Suara: "Masya Allah, benar! Ini Lingkaran"
      if (enabled) {
        setTimeout(() => speakBenar(shape?.name), 200);
      }

      setMatched((p) => [...p, zId]);
      setAvail((p) => p.filter((s) => s.id !== zId));
      setScore((p) => p + 10);

      // Cek semua selesai
      if (matched.length + 1 === shapes.length) {
        setTimeout(() => {
          play.allComplete();
          if (enabled) setTimeout(() => speakSemuaCocok(), 600);
        }, 400);
      }
    } else {
      // ❌ SALAH
      play.dropFail();
      if (enabled) {
        setTimeout(() => speakSalah(), 200);
      }
      setWrongZ(zId);
      setTimeout(() => setWrongZ(null), 500);
    }
    setDragId(null);
  };

  // ── Klik bentuk untuk dengar namanya ──
  const tapShape = (s: (typeof shapes)[0]) => {
    if (enabled) {
      play.click();
      speakNamaBentuk(s.name);
    }
  };

  // ── Klik zona target untuk dengar namanya ──
  const tapZone = (s: (typeof shapes)[0]) => {
    if (!matched.includes(s.id) && enabled) {
      play.click();
      speak(`Kotak ${s.name}. ${s.desc}`);
    }
  };

  const reset = () => {
    play.click();
    setMatched([]);
    setAvail(shuffle(shapes));
    setDragId(null);
    setOver(null);
    setWrongZ(null);
    setScore(0);
    setAttempts(0);
    if (enabled) setTimeout(() => speakInstruksiBentuk(), 500);
  };

  const stars = () => {
    if (!attempts) return 0;
    const a = (matched.length / attempts) * 100;
    return a >= 90 ? 3 : a >= 60 ? 2 : 1;
  };

  return (
    <main className="min-h-screen bg-cream-50 px-4 py-8 pt-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Link
          href="/dashboard"
          onClick={() => play.click()}
          className="inline-flex items-center gap-1.5 text-sm text-warm-sand hover:text-warm-brown mb-6"
        >
          <ArrowLeft size={15} /> Kembali
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-olive-100 text-olive-700 text-xs font-semibold mb-2">
              ◆ Puzzle Bentuk
            </span>
            <h1 className="text-2xl font-extrabold text-warm-brown-dark">
              Puzzle Bentuk
            </h1>
            <p className="text-warm-brown text-sm mt-1">
              Seret bentuk ke kotak yang benar
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold text-olive-600">{score}</p>
            <p className="text-xs text-warm-sand">Skor</p>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-2xl bg-white border border-beige-200 shadow-card p-4 mb-5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-semibold text-warm-brown-dark">
              Progress
            </span>
            <span className="text-warm-sand">
              {matched.length}/{shapes.length}
            </span>
          </div>
          <div className="h-2 rounded-full bg-beige-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-olive-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ── Tombol instruksi suara ── */}
        <button
          onClick={() => {
            if (enabled) speakInstruksiBentuk();
          }}
          className="mb-4 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sage-50 border border-sage-200 text-sage-600 text-sm font-semibold hover:bg-sage-100 transition-all active:scale-95"
        >
          <Volume2 size={16} />
          Dengar Instruksi
        </button>

        {/* ── Game area ── */}
        <div className="rounded-3xl bg-white border border-beige-200 shadow-soft-md p-5">
          <h2 className="text-base font-bold text-warm-brown-dark mb-1">
            Cocokkan Bentuk
          </h2>
          <p className="text-xs text-warm-sand mb-4">
            Seret bentuk ↓ ke kotak nama yang benar • Ketuk untuk dengar nama
          </p>

          {/* ── Drop Zones (kotak target) ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
            {shapes.map((s) => (
              <div
                key={s.id}
                onClick={() => tapZone(s)}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!matched.includes(s.id)) setOver(s.id);
                }}
                onDragLeave={() => setOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  if (!matched.includes(s.id)) onDrop(s.id);
                }}
                className={`rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 min-h-[100px] transition-all duration-200 cursor-pointer ${
                  matched.includes(s.id)
                    ? `${s.color} border-solid`
                    : over === s.id
                    ? "bg-sage-50 border-sage-400 scale-105"
                    : wrongZ === s.id
                    ? "bg-red-50 border-red-300 animate-pulse"
                    : "bg-beige-50 border-beige-300 hover:border-sage-300"
                }`}
              >
                {matched.includes(s.id) ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className={`text-4xl ${s.ic}`}>{s.icon}</span>
                    <span className="text-xs font-bold text-warm-brown-dark">
                      {s.name}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-olive-500 flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    {/* Emoji besar supaya anak tahu ini bentuk apa */}
                    <span className="text-3xl block mb-1">{s.emoji}</span>
                    <span className="text-sm font-bold text-warm-brown-dark block">
                      {s.name}
                    </span>
                    <span className="text-xs text-warm-sand">{s.desc}</span>
                    {/* Ikon speaker kecil */}
                    <Volume2
                      size={12}
                      className="text-warm-sand mx-auto mt-1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Draggable shapes ── */}
          <div className="rounded-2xl bg-beige-50 border border-beige-200 p-4">
            <p className="text-xs text-warm-sand mb-3">
              👆 Seret atau ketuk bentuk untuk dengar namanya:
            </p>
            <div className="flex flex-wrap gap-3 justify-center min-h-[65px]">
              {avail.map((s) => (
                <div
                  key={s.id}
                  draggable
                  onDragStart={() => {
                    play.dragStart();
                    setDragId(s.id);
                    if (enabled) speakNamaBentuk(s.name);
                  }}
                  onDragEnd={() => setDragId(null)}
                  onClick={() => tapShape(s)}
                  className={`w-16 h-16 rounded-2xl bg-white border-2 border-beige-200 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:border-olive-300 hover:shadow-soft transition-all ${
                    dragId === s.id ? "opacity-50 scale-95" : ""
                  }`}
                >
                  <span className={`text-2xl ${s.ic}`}>{s.icon}</span>
                  <span className="text-[10px] text-warm-sand mt-0.5">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-xs text-warm-sand hover:text-warm-brown px-3 py-1.5 rounded-xl hover:bg-beige-100"
            >
              <RotateCcw size={12} /> Ulangi
            </button>
          </div>

          {/* ── Selesai ── */}
          {allM && (
            <div className="mt-4 p-5 rounded-2xl bg-olive-50 border border-olive-100 text-center">
              <p className="text-base font-bold text-olive-600">
                🎉 Masya Allah! Semua cocok!
              </p>
              <div className="flex gap-1 justify-center mt-2">
                {[1, 2, 3].map((s) => (
                  <span
                    key={s}
                    className={`text-xl ${stars() >= s ? "" : "opacity-20"}`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-xs text-olive-500 mt-1">
                Skor: {score} | Akurasi:{" "}
                {attempts > 0
                  ? Math.round((matched.length / attempts) * 100)
                  : 0}
                %
              </p>

              {/* Tombol dengar ulang hasil */}
              <button
                onClick={() => {
                  if (enabled) speakSemuaCocok();
                }}
                className="mt-3 flex items-center gap-1.5 mx-auto px-4 py-2 rounded-xl bg-olive-100 text-olive-600 text-sm font-semibold hover:bg-olive-200 transition-all"
              >
                <Volume2 size={14} />
                Dengar Lagi
              </button>

              <Link
                href="/dashboard"
                className="text-xs text-olive-500 hover:underline mt-3 inline-block"
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-4 p-4 rounded-2xl bg-olive-50 border border-olive-100">
          <p className="text-xs text-warm-sand">
            💡 <strong className="text-warm-brown">Tips:</strong> Ketuk bentuk
            atau kotak untuk dengar namanya. Suara bisa di-on/off 🔊 kiri bawah.
          </p>
        </div>

        <ScrollToTop />
        <SoundToggle />
      </div>
    </main>
  );
}