"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Animated icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-3xl bg-olive-100 flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BookOpen size={36} className="text-olive-500" />
          </motion.div>
        </motion.div>

        {/* Arabic text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-warm-brown-dark font-bold mb-2"
          dir="rtl"
        >
          ﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-extrabold text-warm-brown-dark mb-3"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base text-warm-brown mb-2"
        >
          Halaman ini belum tersedia atau sudah dipindahkan.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-warm-sand mb-8"
        >
          &quot;Dan katakanlah: Rabb, tambahkanlah ilmu padaku.&quot;
          <br />(QS. Thaha: 114)
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-olive-500 hover:bg-olive-600 rounded-2xl shadow-soft transition-all"
            >
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-warm-brown border border-beige-300 hover:bg-olive-50 rounded-2xl transition-all"
            >
              Buka Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}