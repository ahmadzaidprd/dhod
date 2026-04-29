"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TracingCanvasProps {
  guidePath?: string;
  label?: string;
  onComplete?: () => void;
}

export default function TracingCanvas({
  label = "Ikuti alur garis",
  onComplete,
}: TracingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [hasDrawn, setHasDrawn] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const getPos = (
    e: MouseEvent | TouchEvent,
    canvas: HTMLCanvasElement
  ): { x: number; y: number } => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const drawGuide = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);

    // Guide dots pattern
    ctx.setLineDash([8, 12]);
    ctx.strokeStyle = "#D4C4A8";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    // Horizontal line guide
    ctx.beginPath();
    ctx.moveTo(w * 0.1, h * 0.5);
    ctx.lineTo(w * 0.9, h * 0.5);
    ctx.stroke();

    // Start dot
    ctx.setLineDash([]);
    ctx.fillStyle = "#9DB687";
    ctx.beginPath();
    ctx.arc(w * 0.1, h * 0.5, 8, 0, Math.PI * 2);
    ctx.fill();

    // End dot
    ctx.fillStyle = "#C4956A";
    ctx.beginPath();
    ctx.arc(w * 0.9, h * 0.5, 8, 0, Math.PI * 2);
    ctx.fill();

    // Arrow indicator
    ctx.fillStyle = "#9DB687";
    ctx.font = "20px sans-serif";
    ctx.fillText("→", w * 0.88, h * 0.5 + 7);
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    drawGuide(ctx, rect.width, rect.height);
  }, [drawGuide]);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  const startDrawing = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || completed) return;
    e.preventDefault();
    isDrawing.current = true;
    lastPos.current = getPos(e, canvas);
  }, [completed]);

  const draw = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing.current || completed) return;
    e.preventDefault();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e, canvas);
    const rect = canvas.getBoundingClientRect();

    ctx.setLineDash([]);
    ctx.strokeStyle = "#7A9A61";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 0.85;

    ctx.beginPath();
    ctx.moveTo(
      lastPos.current.x / (canvas.width / rect.width),
      lastPos.current.y / (canvas.height / rect.height)
    );
    ctx.lineTo(
      pos.x / (canvas.width / rect.width),
      pos.y / (canvas.height / rect.height)
    );
    ctx.stroke();

    lastPos.current = pos;
    setHasDrawn(true);
  }, [completed]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    if (hasDrawn) {
      setStrokeCount((prev) => {
        const next = prev + 1;
        if (next >= 3) {
          setTimeout(() => {
            setCompleted(true);
            onComplete?.();
          }, 400);
        }
        return next;
      });
    }
  }, [hasDrawn, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
    };
  }, [startDrawing, draw, stopDrawing]);

  const handleReset = () => {
    setHasDrawn(false);
    setStrokeCount(0);
    setCompleted(false);
    initCanvas();
  };

  return (
    <div className="w-full">
      {/* Label */}
      <p className="text-sm text-warm-sand mb-3 text-center">{label}</p>

      {/* Canvas container */}
      <div className="relative rounded-2xl border-2 border-dashed border-beige-300 bg-cream-50 overflow-hidden">
        <canvas
          ref={canvasRef}
          className={cn(
            "w-full h-40 sm:h-56 cursor-crosshair",
            completed && "cursor-default"
          )}
          style={{ touchAction: "none" }}
        />

        {/* Completed overlay */}
        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-olive-50/90 flex flex-col items-center justify-center gap-2"
          >
            <div className="w-12 h-12 rounded-full bg-olive-500 flex items-center justify-center">
              <Check size={24} className="text-white" />
            </div>
            <p className="text-sm font-700 text-olive-600">Bagus sekali! 🌟</p>
          </motion.div>
        )}
      </div>

      {/* Stroke progress */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex gap-1 flex-1">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-all duration-300",
                strokeCount >= dot ? "bg-olive-400" : "bg-beige-200"
              )}
            />
          ))}
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-warm-sand hover:text-warm-brown transition-colors px-2 py-1 rounded-xl hover:bg-beige-100"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>
    </div>
  );
}