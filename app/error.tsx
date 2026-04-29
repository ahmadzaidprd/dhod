"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6"
        >
          <span className="text-3xl">⚠️</span>
        </motion.div>

        <h1 className="text-2xl font-extrabold text-warm-brown-dark mb-2">
          Ada yang Salah
        </h1>
        <p className="text-sm text-warm-brown mb-2">
          Terjadi kesalahan saat memuat halaman.
        </p>
        <p className="text-xs text-warm-sand mb-8">
          Insya Allah bisa diperbaiki. Silakan coba lagi.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => reset()}
            className="px-6 py-3 text-sm font-semibold text-white bg-olive-500 hover:bg-olive-600 rounded-2xl shadow-soft transition-all"
          >
            Coba Lagi
          </motion.button>
          <Link
            href="/"
            className="px-6 py-3 text-sm font-semibold text-warm-brown border border-beige-300 hover:bg-olive-50 rounded-2xl transition-all"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}