"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 sm:py-28 bg-cream-50" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl bg-olive-500 px-8 py-14 text-center overflow-hidden"
        >
          {/* Decorative circles */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 rounded-full bg-olive-400/30 -translate-y-1/2 translate-x-1/4 pointer-events-none"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-olive-600/20 translate-y-1/2 -translate-x-1/4 pointer-events-none"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-olive-200 text-sm font-semibold mb-3"
            >
              بسم الله — Mari Mulai
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
            >
              Mulai Perjalanan Belajar
              <br />Anak Anda Hari Ini
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-4 text-olive-100 text-base leading-relaxed max-w-lg mx-auto"
            >
              Gratis selamanya untuk aktivitas dasar. Daftar sekarang dan
              biarkan anak Anda tumbuh bersama sunnah.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-olive-700 bg-white hover:bg-cream-50 rounded-2xl shadow-soft-md transition-all w-full sm:w-auto"
                >
                  Mulai Gratis Sekarang
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/30 hover:bg-white/10 rounded-2xl transition-all w-full sm:w-auto"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-6 text-olive-200 text-xs"
            >
              Tidak perlu kartu kredit • Tidak ada iklan • Aman untuk anak
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}