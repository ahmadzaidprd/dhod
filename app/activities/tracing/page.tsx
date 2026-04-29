"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ChevronRight, Check } from "lucide-react";
import { useSound } from "@/lib/SoundContext";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SoundToggle from "@/components/ui/SoundToggle";

const levels = [
  { id: 1, label: "Garis Lurus →", desc: "Tarik garis dari kiri ke kanan" },
  { id: 2, label: "Garis Turun ↓", desc: "Tarik garis dari atas ke bawah" },
  { id: 3, label: "Garis Miring ↗", desc: "Tarik garis diagonal" },
  { id: 4, label: "Lengkung ∪", desc: "Ikuti garis lengkung" },
];

export default function TracingPage() {
  const { play } = useSound();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [strokes, setStrokes] = useState(0);
  const [done, setDone] = useState(false);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "#EEE7D9";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // Guide
    ctx.setLineDash([8, 12]);
    ctx.strokeStyle = "#D4C4A8";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (current === 0) { ctx.moveTo(40, h / 2); ctx.lineTo(w - 40, h / 2); }
    else if (current === 1) { ctx.moveTo(w / 2, 40); ctx.lineTo(w / 2, h - 40); }
    else if (current === 2) { ctx.moveTo(40, h - 40); ctx.lineTo(w - 40, 40); }
    else { ctx.moveTo(40, h * 0.3); ctx.quadraticCurveTo(w / 2, h - 20, w - 40, h * 0.3); }
    ctx.stroke();

    // Dots
    ctx.setLineDash([]);
    const starts = [[40, h / 2], [w / 2, 40], [40, h - 40], [40, h * 0.3]];
    const ends = [[w - 40, h / 2], [w / 2, h - 40], [w - 40, 40], [w - 40, h * 0.3]];
    ctx.fillStyle = "#9DB687";
    ctx.beginPath(); ctx.arc(starts[current][0], starts[current][1], 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#C4956A";
    ctx.beginPath(); ctx.arc(ends[current][0], ends[current][1], 10, 0, Math.PI * 2); ctx.fill();
  }, [current]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    drawGuide();
    setStrokes(0);
    setDone(false);
  }, [drawGuide]);

  useEffect(() => { initCanvas(); }, [initCanvas, current]);
  useEffect(() => {
    const fn = () => initCanvas();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [initCanvas]);

  const onStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (done) return;
    drawing.current = true;
    lastPos.current = getPos(e);
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current || done) return;
    e.preventDefault();
    const ctx = canvasRef.current!.getContext("2d")!;
    const pos = getPos(e);
    ctx.setLineDash([]);
    ctx.strokeStyle = "#7A9A61";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const onEnd = () => {
    if (!drawing.current) return;
    drawing.current = false;
    play.stroke();
    const s = strokes + 1;
    setStrokes(s);
    if (s >= 3) {
      setDone(true);
      play.levelComplete();
      if (!completed.includes(current)) {
        const newCompleted = [...completed, current];
        setCompleted(newCompleted);
        if (newCompleted.length === levels.length) {
          setTimeout(() => play.allComplete(), 500);
        }
      }
    }
  };

  const reset = () => { play.click(); initCanvas(); };
  const next = () => { play.click(); if (current < levels.length - 1) setCurrent((p) => p + 1); };
  const allDone = completed.length === levels.length;
  const progress = Math.round((completed.length / levels.length) * 100);

  return (
    <main className="min-h-screen bg-cream-50 px-4 py-8 pt-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" onClick={() => play.click()} className="inline-flex items-center gap-1.5 text-sm text-warm-sand hover:text-warm-brown mb-6">
          <ArrowLeft size={15} /> Kembali ke Dashboard
        </Link>

        <span className="inline-block px-3 py-1 rounded-full bg-olive-100 text-olive-700 text-xs font-semibold mb-3">✏️ Motorik Halus</span>
        <h1 className="text-2xl font-extrabold text-warm-brown-dark">Tracing Garis</h1>
        <p className="text-warm-brown text-sm mt-1 mb-6">Latih koordinasi tangan anak dengan mengikuti alur garis</p>

        <div className="rounded-2xl bg-white border border-beige-200 shadow-card p-4 mb-5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-semibold text-warm-brown-dark">Progress</span>
            <span className="text-warm-sand">{completed.length}/{levels.length}</span>
          </div>
          <div className="h-2 rounded-full bg-beige-100 overflow-hidden">
            <div className="h-full rounded-full bg-olive-400 transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-5">
          {levels.map((l, i) => (
            <button key={l.id} onClick={() => { play.click(); setCurrent(i); }}
              className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                i === current ? "bg-olive-500 text-white border-olive-500"
                : completed.includes(i) ? "bg-olive-50 text-olive-600 border-olive-200"
                : "bg-white text-warm-sand border-beige-200"
              }`}>
              {completed.includes(i) ? "✓" : l.id}
            </button>
          ))}
        </div>

        <div className="rounded-3xl bg-white border border-beige-200 shadow-soft-md p-5">
          <h2 className="text-base font-bold text-warm-brown-dark">{levels[current].label}</h2>
          <p className="text-xs text-warm-sand mb-4">{levels[current].desc}</p>

          <div className="relative rounded-2xl border-2 border-dashed border-beige-300 bg-cream-50 overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-48 sm:h-64"
              style={{ touchAction: "none", cursor: done ? "default" : "crosshair" }}
              onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd}
              onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd} />
            {done && (
              <div className="absolute inset-0 bg-olive-50/90 flex flex-col items-center justify-center gap-2">
                <div className="w-14 h-14 rounded-full bg-olive-500 flex items-center justify-center">
                  <Check size={28} className="text-white" />
                </div>
                <p className="text-base font-bold text-olive-600">Bagus sekali! 🌟</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <p className="text-xs text-warm-sand">Goresan:</p>
            <div className="flex gap-1 flex-1">
              {[1, 2, 3].map((d) => (
                <div key={d} className={`flex-1 h-2 rounded-full transition-all duration-300 ${strokes >= d ? "bg-olive-400" : "bg-beige-200"}`} />
              ))}
            </div>
            <button onClick={reset} className="flex items-center gap-1 text-xs text-warm-sand hover:text-warm-brown px-2 py-1 rounded-xl hover:bg-beige-100">
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {done && current < levels.length - 1 && (
            <button onClick={next} className="w-full mt-4 py-3 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-olive-500 hover:bg-olive-600 rounded-2xl">
              Lanjut Berikutnya <ChevronRight size={16} />
            </button>
          )}

          {allDone && (
            <div className="mt-4 p-4 rounded-2xl bg-olive-50 border border-olive-100 text-center">
              <p className="text-base font-bold text-olive-600">🎉 Alhamdulillah! Semua selesai!</p>
              <div className="flex gap-1 justify-center mt-2">{[1,2,3].map((s) => <span key={s} className="text-xl">⭐</span>)}</div>
              <Link href="/dashboard" className="text-xs text-olive-500 hover:underline mt-2 inline-block">Dashboard</Link>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-beige-50 border border-beige-100">
          <p className="text-xs text-warm-sand">💡 <strong className="text-warm-brown">Tips:</strong> Bimbing tangan anak perlahan. Cukup 3 goresan per level.</p>
        </div>

        <ScrollToTop />
        <SoundToggle />
      </div>
    </main>
  );
}