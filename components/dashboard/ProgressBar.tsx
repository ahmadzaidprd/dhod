"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "olive" | "sage" | "warm";
  className?: string;
}

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

const colorClasses = {
  olive: "bg-olive-400",
  sage: "bg-sage-400",
  warm: "bg-warm-brown-light",
};

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  size = "md",
  color = "olive",
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-xs font-500 text-warm-sand">{label}</span>
          )}
          {showValue && (
            <span className="text-xs font-600 text-olive-600">{percentage}%</span>
          )}
        </div>
      )}
      <div className={cn("w-full rounded-full bg-beige-100 overflow-hidden", sizeClasses[size])}>
        <motion.div
          className={cn("h-full rounded-full", colorClasses[color])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}