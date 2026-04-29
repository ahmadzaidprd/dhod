"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-cream-50 flex flex-col items-center justify-center gap-4">
      <motion.div
        className="w-14 h-14 rounded-2xl bg-olive-500 flex items-center justify-center shadow-soft-lg"
        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-2xl text-white font-bold">ت</span>
      </motion.div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-semibold text-warm-brown-dark">Tumbuh Sunnah</p>
        <p className="text-xs text-warm-sand">Memuat halaman...</p>
      </div>

      {/* Loading bar */}
      <div className="w-32 h-1 rounded-full bg-beige-200 overflow-hidden mt-2">
        <motion.div
          className="h-full bg-olive-400 rounded-full"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "40%" }}
        />
      </div>
    </div>
  );
}