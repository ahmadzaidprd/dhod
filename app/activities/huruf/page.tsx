"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ChevronRight, Check } from "lucide-react";
import { useSound } from "@/lib/SoundContext";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SoundToggle from "@/components/ui/SoundToggle";

const allH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((h, i) => ({ id: i, upper: h, lower: h.toLowerCase() }));
const bSize = 6;
const totalB = Math.ceil(allH.length / bSize);

function shuffle<T>(a: T[]): T[] { 
  const b = [...a]; 
  for (let i = b.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [b[i], b[j]] = [b[j], b[i]]; 
  } 
  return b; 
}

export default function HurufPage() {
  const { play } = useSound();
  const [bi, setBi] = useState(0);
  const [matched, setMatched] = useState<string[]>([]);
  const [avail, setAvail] = useState<typeof allH>([]);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [wrongZ, setWrongZ] = useState<string | null>(null);
  const [doneB, setDoneB] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const batch = allH.slice(bi * bSize, (bi + 1) * bSize);
  const allM = matched.length === batch.length;

  // Memperbaiki peringatan react-hooks/set-state-in-effect
  useEffect(() => {
    setMatched([]);
    setAvail(shuffle(batch));
    setDragId(null);
    setOver(null);
    setWrongZ(null);
  }, [bi, batch.length]); // Ditambahkan batch.length untuk memenuhi exhaustive-deps

  const onDrop = (u: string) => {
    setOver(null);
    if (dragId === u) {
      play.dropSuccess();
      setMatched((p) => [...p, u]); 
      setAvail((p) => p.filter((l) => l.upper !== u)); 
      setScore((p) => p + 10);
      
      if (matched.length + 1 === batch.length && !doneB.includes(bi)) {
        setDoneB((p) => [...p, bi]);
        if (doneB.length + 1 === totalB) setTimeout(() => play.allComplete(), 400);
        else setTimeout(() => play.levelComplete(), 300);
      }
    } else { 
      play.dropFail(); 
      setWrongZ(u); 
      setTimeout(() => setWrongZ(null), 500); 
    }
    setDragId(null);
  };

  const progress = Math.round((doneB.length / totalB) * 100);

  return (
    <main className="min-h-screen bg-cream-50 px-4 py-8 pt-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" onClick={() => play.click()} className="inline-flex items-center gap-1.5 text-sm text-warm-sand hover:text-warm-brown mb-6">
          <ArrowLeft size={15} /> Kembali
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-beige-100 text-warm-brown text-xs font-semibold mb-2">A Huruf A–Z</span>
            <h1 className="text-2xl font-extrabold text-warm-brown-dark">Belajar Huruf A–Z</h1>
            <p className="text-warm-brown text-sm mt-1">Cocokkan BESAR dengan kecil</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold text-olive-600">{score}</p>
            <p className="text-xs text-warm-sand">Skor</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-beige-200 shadow-card p-4 mb-5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-semibold text-warm-brown-dark">Grup {bi + 1}/{totalB}</span>
            <span className="text-warm-sand">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-beige-100 overflow-hidden">
            <div className="h-full rounded-full bg-olive-400 transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {Array.from({ length: totalB }).map((_, i) => {
            const s = allH[i * bSize]?.upper; 
            const e = allH[Math.min((i + 1) * bSize - 1, allH.length - 1)]?.upper;
            return (
              <button key={i} onClick={() => { play.click(); setBi(i); }}
                className={`shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  i === bi ? "bg-olive-500 text-white border-olive-500"
                  : doneB.includes(i) ? "bg-olive-50 text-olive-600 border-olive-200"
                  : "bg-white text-warm-sand border-beige-200"}`}>
                {doneB.includes(i) ? "✓ " : ""}{s}–{e}
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl bg-white border border-beige-200 shadow-soft-md p-5">
          <h2 className="text-base font-bold text-warm-brown-dark mb-1">Huruf {batch[0]?.upper} – {batch[batch.length - 1]?.upper}</h2>
          <p className="text-xs text-warm-sand mb-4">Seret huruf BESAR ke kotak huruf kecil</p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
            {batch.map((h) => (
              <div key={h.upper}
                onDragOver={(e) => { e.preventDefault(); if (!matched.includes(h.upper)) setOver(h.upper); }}
                onDragLeave={() => setOver(null)}
                onDrop={(e) => { e.preventDefault(); if (!matched.includes(h.upper)) onDrop(h.upper); }}
                className={`rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-3 min-h-18.75 transition-all ${
                  matched.includes(h.upper) ? "bg-olive-50 border-olive-300"
                  : over === h.upper ? "bg-sage-50 border-sage-400 scale-105"
                  : wrongZ === h.upper ? "bg-red-50 border-red-300"
                  : "bg-beige-50 border-beige-300"}`}>
                {matched.includes(h.upper) ? (
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-lg font-bold text-warm-brown-dark">{h.upper}{h.lower}</span>
                    <div className="w-4 h-4 rounded-full bg-olive-500 flex items-center justify-center"><Check size={10} className="text-white" /></div>
                  </div>
                ) : <span className="text-xl font-bold text-warm-sand">{h.lower}</span>}
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-beige-50 border border-beige-200 p-4">
            <p className="text-xs text-warm-sand mb-3">Seret huruf BESAR:</p>
            <div className="flex flex-wrap gap-2 justify-center min-h-13.75">
              {avail.map((h) => (
                <div key={h.upper} draggable
                  onDragStart={() => { play.dragStart(); setDragId(h.upper); }}
                  onDragEnd={() => setDragId(null)}
                  className={`w-12 h-12 rounded-2xl bg-white border-2 border-beige-200 flex items-center justify-center cursor-grab active:cursor-grabbing hover:border-olive-300 hover:shadow-soft transition-all ${
                    dragId === h.upper ? "opacity-50 scale-95" : ""}`}>
                  <span className="text-lg font-bold text-warm-brown-dark">{h.upper}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <button onClick={() => { play.click(); setMatched([]); setAvail(shuffle(batch)); setDragId(null); }} className="flex items-center gap-1.5 text-xs text-warm-sand hover:text-warm-brown px-3 py-1.5 rounded-xl hover:bg-beige-100">
              <RotateCcw size={12} /> Ulangi
            </button>
          </div>

          {allM && <div className="mt-4 p-4 rounded-2xl bg-olive-50 border border-olive-100 text-center"><p className="text-base font-bold text-olive-600">🌟 Grup ini selesai!</p></div>}
          {allM && bi < totalB - 1 && <button onClick={() => { play.click(); setBi((p) => p + 1); }} className="w-full mt-3 py-3 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-olive-500 hover:bg-olive-600 rounded-2xl">Grup Berikutnya <ChevronRight size={16} /></button>}
          {doneB.length === totalB && <div className="mt-4 p-4 rounded-2xl bg-olive-50 border border-olive-100 text-center"><p className="text-base font-bold text-olive-600">🎉 A–Z selesai!</p><p className="text-sm text-olive-500 mt-1">Skor: {score}</p><Link href="/dashboard" className="text-xs text-olive-500 hover:underline mt-2 inline-block">Dashboard</Link></div>}
        </div>

        <ScrollToTop />
        <SoundToggle />
      </div>
    </main>
  );
}