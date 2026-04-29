"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ChevronRight, Check } from "lucide-react";
import { useSound } from "@/lib/SoundContext";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SoundToggle from "@/components/ui/SoundToggle";

const data = [
  { num: 1, arab: "١", word: "Satu" }, { num: 2, arab: "٢", word: "Dua" },
  { num: 3, arab: "٣", word: "Tiga" }, { num: 4, arab: "٤", word: "Empat" },
  { num: 5, arab: "٥", word: "Lima" }, { num: 6, arab: "٦", word: "Enam" },
  { num: 7, arab: "٧", word: "Tujuh" }, { num: 8, arab: "٨", word: "Delapan" },
  { num: 9, arab: "٩", word: "Sembilan" }, { num: 10, arab: "١٠", word: "Sepuluh" },
];

function shuffle<T>(a: T[]): T[] { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];} return b; }

export default function AngkaPage() {
  const { play } = useSound();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [wrong, setWrong] = useState<number | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [totalWrong, setTotalWrong] = useState(0);

  const cur = data[idx];

  useEffect(() => {
    const opts = new Set<number>([cur.num]);
    while (opts.size < 4) opts.add(Math.floor(Math.random() * 10) + 1);
    setOptions(shuffle(Array.from(opts)));
    setAnswered(false); setWrong(null);
  }, [idx]);

  const answer = (num: number) => {
    if (answered) return;
    if (num === cur.num) { play.correct(); setScore((p) => p + 10); setAnswered(true); }
    else { play.wrong(); setWrong(num); setTotalWrong((p) => p + 1); setTimeout(() => setWrong(null), 500); }
  };

  const next = () => {
    play.click();
    if (idx < data.length - 1) setIdx((p) => p + 1);
    else { play.allComplete(); setFinished(true); }
  };

  const reset = () => { play.click(); setIdx(0); setScore(0); setAnswered(false); setWrong(null); setFinished(false); setTotalWrong(0); };
  const stars = () => { const t = data.length + totalWrong; const a = (data.length / t) * 100; return a >= 90 ? 3 : a >= 60 ? 2 : 1; };
  const progress = Math.round(((idx + (answered ? 1 : 0)) / data.length) * 100);

  return (
    <main className="min-h-screen bg-cream-50 px-4 py-8 pt-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" onClick={() => play.click()} className="inline-flex items-center gap-1.5 text-sm text-warm-sand hover:text-warm-brown mb-6">
          <ArrowLeft size={15} /> Kembali
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-sage-100 text-sage-600 text-xs font-semibold mb-2">١ Belajar Angka</span>
            <h1 className="text-2xl font-extrabold text-warm-brown-dark">Belajar Angka 1–10</h1>
            <p className="text-warm-brown text-sm mt-1">Hitung bintang dan pilih angka yang benar</p>
          </div>
          <div className="text-right"><p className="text-2xl font-extrabold text-sage-500">{score}</p><p className="text-xs text-warm-sand">Skor</p></div>
        </div>

        <div className="rounded-2xl bg-white border border-beige-200 shadow-card p-4 mb-5">
          <div className="flex justify-between text-xs mb-1.5"><span className="font-semibold text-warm-brown-dark">Soal {idx+1}/{data.length}</span><span className="text-warm-sand">{progress}%</span></div>
          <div className="h-2 rounded-full bg-beige-100 overflow-hidden"><div className="h-full rounded-full bg-sage-400 transition-all duration-700" style={{ width: `${progress}%` }} /></div>
        </div>

        {!finished ? (
          <div className="rounded-3xl bg-white border border-beige-200 shadow-soft-md p-6">
            <div className="text-center mb-6">
              <p className="text-xs text-warm-sand mb-3">Berapa jumlah bintangnya?</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
                {Array.from({ length: cur.num }).map((_, i) => (
                  <div key={i} className="w-11 h-11 rounded-full bg-olive-100 border-2 border-olive-200 flex items-center justify-center text-lg">⭐</div>
                ))}
              </div>
              <p className="text-xs text-warm-sand mt-2">Angka Arab: <span className="text-lg font-bold text-warm-brown-dark mx-1">{cur.arab}</span></p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {options.map((num) => {
                const d = data.find((a) => a.num === num);
                return (
                  <button key={num} onClick={() => answer(num)} disabled={answered}
                    className={`py-4 rounded-2xl border-2 text-center transition-all duration-200 ${
                      answered && num === cur.num ? "bg-olive-50 border-olive-400 text-olive-700 scale-105"
                      : wrong === num ? "bg-red-50 border-red-300 text-red-600"
                      : answered ? "bg-beige-50 border-beige-200 text-warm-sand opacity-50"
                      : "bg-white border-beige-200 text-warm-brown-dark hover:border-olive-300 hover:bg-olive-50 active:scale-95"
                    }`}>
                    <span className="text-3xl font-extrabold block">{num}</span>
                    <span className="text-xs text-warm-sand">{d?.word}</span>
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className="mt-4 p-3 rounded-2xl bg-olive-50 border border-olive-100 text-center">
                <p className="text-sm font-bold text-olive-600 flex items-center justify-center gap-1.5">
                  <Check size={16} /> Benar! Angka {cur.num} ({cur.arab}) — {cur.word}
                </p>
              </div>
            )}

            {answered && (
              <button onClick={next} className="w-full mt-4 py-3 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-olive-500 hover:bg-olive-600 rounded-2xl">
                {idx < data.length - 1 ? "Soal Berikutnya" : "Lihat Hasil"} <ChevronRight size={16} />
              </button>
            )}
          </div>
        ) : (
          <div className="rounded-3xl bg-white border border-beige-200 shadow-soft-md p-6 text-center">
            <div className="text-5xl mb-3">🌟</div>
            <h2 className="text-xl font-extrabold text-warm-brown-dark">Alhamdulillah!</h2>
            <p className="text-warm-brown mt-2">Skor: <strong className="text-olive-600">{score}</strong> / {data.length * 10}</p>
            <div className="flex gap-1 justify-center mt-3">{[1,2,3].map((s) => <span key={s} className={`text-2xl ${stars()>=s?"":"opacity-20"}`}>⭐</span>)}</div>
            <p className="text-xs text-warm-sand mt-2">Jawaban salah: {totalWrong}x</p>
            <div className="flex gap-3 justify-center mt-6">
              <button onClick={reset} className="px-5 py-2.5 text-sm font-semibold text-warm-brown border border-beige-300 rounded-2xl hover:bg-beige-100 flex items-center gap-1.5"><RotateCcw size={14} /> Ulangi</button>
              <Link href="/dashboard" className="px-5 py-2.5 text-sm font-semibold text-white bg-olive-500 rounded-2xl hover:bg-olive-600">Dashboard</Link>
            </div>
          </div>
        )}

        <ScrollToTop />
        <SoundToggle />
      </div>
    </main>
  );
}