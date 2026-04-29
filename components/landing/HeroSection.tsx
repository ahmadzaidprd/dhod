"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Shield, Leaf } from "lucide-react";

const floatingCards = [
  { char: "ا", label: "Alif",  delay: 0,   top: "20%", left: "4%" },
  { char: "ب", label: "Ba",    delay: 0.4, top: "20%", right: "4%" },
  { char: "٣", label: "Tiga",  delay: 0.8, top: "65%", left: "3%" },
  { char: "A", label: "Huruf", delay: 0.6, top: "65%", right: "5%" },
];

const badges = [
  { icon: Shield, text: "Aman Syariat",      bg: "bg-olive-100 text-olive-700" },
  { icon: Leaf,   text: "Montessori Islami",  bg: "bg-sage-100 text-sage-600" },
  { icon: Star,   text: "Tanpa Musik",        bg: "bg-cream-200 text-warm-brown" },
];

const previewCards = [
  { arabic: "ا", latin: "Alif", bg: "bg-cream-100", border: "border-cream-200", pct: 75 },
  { arabic: "ب", latin: "Ba",   bg: "bg-olive-100", border: "border-olive-200", pct: 60 },
  { arabic: "ت", latin: "Ta",   bg: "bg-sage-100",  border: "border-sage-200",  pct: 40 },
  { arabic: "ث", latin: "Tsa",  bg: "bg-beige-100", border: "border-beige-200", pct: 20 },
];

const previewStats = [
  { label: "Aktivitas", value: "12", emoji: "📚" },
  { label: "Streak",    value: "7 hari", emoji: "🌟" },
  { label: "Level",     value: "3",  emoji: "⭐" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream-50">
      {/* BG pattern */}
      <div className="absolute inset-0 bg-dots opacity-40" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-olive-200/30 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-sage-200/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating letter cards — desktop */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.label}
          className="absolute hidden lg:flex flex-col items-center gap-1"
          style={{ top: card.top, left: card.left, right: card.right }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, delay: card.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-14 h-14 rounded-2xl bg-white border border-beige-200 shadow-card flex items-center justify-center text-2xl font-bold text-warm-brown-dark"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {card.char}
          </motion.div>
          <span className="text-xs text-warm-sand font-medium">{card.label}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl mx-auto text-center">

          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive-100 border border-olive-200 mb-8"
          >
            <motion.span
              className="text-lg"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌙
            </motion.span>
            <span className="text-sm text-olive-700 font-semibold">
              Edukasi Sesuai Fitrah Anak Muslim
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-warm-brown-dark leading-tight tracking-tight"
          >
            Tumbuh Bersama{" "}
            <span className="relative inline-block">
              <span className="text-olive-600">Sunnah</span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-1 bg-olive-300 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              />
            </span>
            ,{" "}
            <br className="hidden sm:block" />
            Belajar dengan{" "}
            <motion.span
              className="text-warm-brown"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Tenang
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-warm-brown leading-relaxed max-w-2xl mx-auto"
          >
            Platform edukasi anak usia{" "}
            <strong className="text-warm-brown-dark">2–7 tahun</strong>{" "}
            yang tenang, minim distraksi, dan aman secara syariat.
            Belajar hijaiyah, angka, huruf, tracing, dan puzzle sesuai fitrah.
          </motion.p>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            {badges.map((b, i) => (
              <motion.span
                key={b.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${b.bg}`}
              >
                <b.icon size={12} />
                {b.text}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-10"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-olive-500 hover:bg-olive-600 rounded-2xl shadow-soft-md hover:shadow-soft-lg transition-all duration-200 w-full sm:w-auto"
              >
                Mulai Belajar Gratis
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/#activities"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-warm-brown border border-beige-300 hover:border-olive-300 hover:bg-olive-50 rounded-2xl transition-all duration-200 w-full sm:w-auto"
              >
                Lihat Aktivitas
              </Link>
            </motion.div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-warm-sand"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="w-7 h-7 rounded-full border-2 border-cream-50 bg-gradient-to-br from-beige-200 to-beige-400"
                  />
                ))}
              </div>
              <span>+500 keluarga muslim</span>
            </div>
            <span className="hidden sm:block text-beige-300">•</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                >
                  <Star size={13} className="fill-olive-400 text-olive-400" />
                </motion.div>
              ))}
              <span className="ml-1">4.9 rating</span>
            </div>
            <span className="hidden sm:block text-beige-300">•</span>
            <span>Gratis selamanya</span>
          </motion.div>
        </div>

        {/* Preview card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <motion.div
            className="rounded-3xl bg-white border border-beige-200 shadow-soft-lg p-6 sm:p-8"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Browser bar */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-beige-300" />
                <div className="w-3 h-3 rounded-full bg-beige-300" />
                <div className="w-3 h-3 rounded-full bg-beige-300" />
              </div>
              <div className="flex-1 h-5 rounded-full bg-beige-100 mx-4" />
            </div>

            {/* Letter cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {previewCards.map((c, i) => (
                <motion.div
                  key={c.latin}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`${c.bg} ${c.border} border rounded-2xl p-4 text-center cursor-default`}
                >
                  <div className="text-3xl font-bold text-warm-brown-dark mb-1">{c.arabic}</div>
                  <div className="text-xs text-warm-sand font-semibold mb-2">{c.latin}</div>
                  <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-olive-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${c.pct}%` }}
                      transition={{ delay: 1 + i * 0.15, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {previewStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.1 }}
                  className="bg-beige-50 border border-beige-100 rounded-2xl p-3 text-center"
                >
                  <div className="text-xl mb-1">{s.emoji}</div>
                  <div className="text-base font-bold text-warm-brown-dark">{s.value}</div>
                  <div className="text-xs text-warm-sand">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}