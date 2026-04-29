"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Star } from "lucide-react";

interface FeedbackProps {
  type: "correct" | "wrong" | "perfect" | null;
  text?: string;
}

export default function SoundFeedback({ type, text }: FeedbackProps) {
  if (!type) return null;

  const config = {
    correct: {
      bg: "bg-olive-50 border-olive-200",
      icon: <Check size={18} className="text-olive-500" />,
      defaultText: "Benar! 🌟",
      iconBg: "bg-olive-100",
      textColor: "text-olive-600",
    },
    wrong: {
      bg: "bg-red-50 border-red-200",
      icon: <X size={18} className="text-red-400" />,
      defaultText: "Coba lagi ya",
      iconBg: "bg-red-100",
      textColor: "text-red-500",
    },
    perfect: {
      bg: "bg-olive-50 border-olive-200",
      icon: <Star size={18} className="text-olive-500 fill-olive-500" />,
      defaultText: "Sempurna! ⭐",
      iconBg: "bg-olive-100",
      textColor: "text-olive-600",
    },
  };

  const c = config[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${c.bg}`}
      >
        <div className={`w-6 h-6 rounded-full ${c.iconBg} flex items-center justify-center flex-shrink-0`}>
          {c.icon}
        </div>
        <p className={`text-sm font-semibold ${c.textColor}`}>
          {text || c.defaultText}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}