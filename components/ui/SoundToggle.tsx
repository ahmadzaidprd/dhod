"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/lib/SoundContext";

export default function SoundToggle() {
  const { enabled, toggle, play } = useSound();

  return (
    <button
      onClick={() => { toggle(); play.click(); }}
      className={`fixed bottom-6 left-6 z-50 w-11 h-11 rounded-2xl flex items-center justify-center shadow-soft-lg transition-all hover:scale-110 active:scale-95 ${
        enabled
          ? "bg-olive-500 text-white hover:bg-olive-600"
          : "bg-beige-200 text-warm-sand hover:bg-beige-300"
      }`}
      aria-label={enabled ? "Matikan suara" : "Nyalakan suara"}
    >
      {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}