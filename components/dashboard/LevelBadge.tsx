"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { getLevelTitle } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface LevelBadgeProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
  className?: string;
}

export default function LevelBadge({ level, xp, xpToNextLevel, className }: LevelBadgeProps) {
  const title = getLevelTitle(level);
  const progress = Math.round((xp / xpToNextLevel) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative rounded-3xl bg-gradient-to-br from-olive-500 to-olive-600 p-5 text-white overflow-hidden",
        className
      )}
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-6 translate-x-6" />
      <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/5 translate-y-6 -translate-x-6" />

      <div className="relative z-10">
        {/* Level indicator */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <Star size={15} className="fill-white text-white" />
          </div>
          <div>
            <p className="text-xs text-olive-100">Level {level}</p>
            <p className="text-sm font-700">{title}</p>
          </div>
        </div>

        {/* XP Progress */}
        <div>
          <div className="flex justify-between text-xs text-olive-100 mb-1.5">
            <span>XP</span>
            <span>{xp} / {xpToNextLevel}</span>
          </div>
          <div className="h-2 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-olive-100 mt-1.5">
            {xpToNextLevel - xp} XP lagi ke Level {level + 1}
          </p>
        </div>
      </div>
    </motion.div>
  );
}