"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { HijaiyahLetter } from "@/types";

interface HijaiyahDragDropProps {
  letters: HijaiyahLetter[];
  onComplete?: () => void;
}

interface DropZone {
  id: string;
  letter: HijaiyahLetter;
  matched: boolean;
}

export default function HijaiyahDragDrop({ letters, onComplete }: HijaiyahDragDropProps) {
  const [dropZones, setDropZones] = useState<DropZone[]>(
    letters.map((l) => ({ id: l.id, letter: l, matched: false }))
  );
  const [availableLetters, setAvailableLetters] = useState<HijaiyahLetter[]>([
    ...letters,
  ].sort(() => Math.random() - 0.5));

  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOverZone, setDragOverZone] = useState<string | null>(null);
  const [wrongAttempt, setWrongAttempt] = useState<string | null>(null);

  const allMatched = dropZones.every((z) => z.matched);

  const handleDragStart = useCallback(
    (e: React.DragEvent, letterId: string) => {
      setDragging(letterId);
      e.dataTransfer.setData("letterId", letterId);
      e.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, zoneId: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverZone(zoneId);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, zoneId: string) => {
      e.preventDefault();
      const letterId = e.dataTransfer.getData("letterId");
      setDragOverZone(null);
      setDragging(null);

      if (letterId === zoneId) {
        // Correct match
        setDropZones((prev) =>
          prev.map((z) => (z.id === zoneId ? { ...z, matched: true } : z))
        );
        setAvailableLetters((prev) => prev.filter((l) => l.id !== letterId));

        // Check all matched
        const newMatched = dropZones.filter((z) => z.matched || z.id === zoneId).length;
        if (newMatched === letters.length) {
          setTimeout(() => onComplete?.(), 600);
        }
      } else {
        // Wrong
        setWrongAttempt(zoneId);
        setTimeout(() => setWrongAttempt(null), 600);
      }
    },
    [dropZones, letters.length, onComplete]
  );

  const handleReset = () => {
    setDropZones(letters.map((l) => ({ id: l.id, letter: l, matched: false })));
    setAvailableLetters([...letters].sort(() => Math.random() - 0.5));
    setDragging(null);
    setDragOverZone(null);
    setWrongAttempt(null);
  };

  // Touch drag support
  const handleTouchStart = useCallback((letterId: string) => {
    setDragging(letterId);
  }, []);

  return (
    <div className="w-full">
      {/* Drop zones */}
      <div className="mb-6">
        <p className="text-xs text-warm-sand mb-3 text-center">
          Cocokkan huruf dengan kotak yang sesuai
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {dropZones.map((zone) => (
            <div
              key={zone.id}
              onDragOver={(e) => !zone.matched && handleDragOver(e, zone.id)}
              onDrop={(e) => !zone.matched && handleDrop(e, zone.id)}
              onDragLeave={() => setDragOverZone(null)}
              className={cn(
                "rounded-2xl border-2 border-dashed transition-all duration-200",
                "flex flex-col items-center justify-center p-3 min-h-[70px]",
                zone.matched
                  ? "bg-olive-50 border-olive-300"
                  : dragOverZone === zone.id
                  ? "bg-sage-50 border-sage-400 scale-105"
                  : wrongAttempt === zone.id
                  ? "bg-red-50 border-red-300 animate-pulse"
                  : "bg-beige-50 border-beige-300 hover:border-beige-400"
              )}
            >
              {zone.matched ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center gap-0.5"
                >
                  <span className="text-2xl text-warm-brown-dark">
                    {zone.letter.arabic}
                  </span>
                  <div className="w-4 h-4 rounded-full bg-olive-500 flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                </motion.div>
              ) : (
                <span className="text-xs text-warm-sand font-500">
                  {zone.letter.latin}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available letters */}
      <div className="rounded-2xl bg-beige-50 border border-beige-200 p-4">
        <p className="text-xs text-warm-sand mb-3">Huruf yang tersedia:</p>
        <div className="flex flex-wrap gap-2 justify-center min-h-[60px]">
          <AnimatePresence>
            {availableLetters.map((letter) => (
              <motion.div
                key={letter.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                draggable
                onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, letter.id)}
                onDragEnd={() => setDragging(null)}
                onTouchStart={() => handleTouchStart(letter.id)}
                className={cn(
                  "w-14 h-14 rounded-2xl bg-white border-2 border-beige-200",
                  "flex flex-col items-center justify-center cursor-grab active:cursor-grabbing",
                  "hover:border-olive-300 hover:shadow-soft transition-all duration-200",
                  dragging === letter.id && "opacity-50 scale-95 border-olive-300"
                )}
              >
                <span className="text-xl font-bold text-warm-brown-dark">
                  {letter.arabic}
                </span>
                <span className="text-xs text-warm-sand">{letter.latin}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {availableLetters.length === 0 && !allMatched && (
            <p className="text-xs text-warm-sand self-center">Semua sudah diseret</p>
          )}
        </div>
      </div>

      {/* Reset */}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-warm-sand hover:text-warm-brown transition-colors px-3 py-1.5 rounded-xl hover:bg-beige-100"
        >
          <RotateCcw size={12} />
          Ulangi
        </button>
      </div>

      {/* Completed */}
      <AnimatePresence>
        {allMatched && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-2xl bg-olive-50 border border-olive-100 text-center"
          >
            <p className="text-sm font-700 text-olive-600">
              🌟 Masya Allah! Semua cocok!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}