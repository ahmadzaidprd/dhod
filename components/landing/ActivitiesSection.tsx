"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { activities } from "@/data/activities";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";

export default function ActivitiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="activities" className="py-20 sm:py-28 bg-beige-100" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-olive-100 text-olive-700 text-xs font-semibold mb-4">
            Aktivitas Belajar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-warm-brown-dark tracking-tight">
            Belajar Sambil <span className="text-olive-600">Bermain</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-warm-brown max-w-xl mx-auto leading-relaxed">
            Berbagai aktivitas dirancang khusus untuk anak usia 2–7 tahun.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activities.map((act, i) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <Link href={act.href} className="group block h-full">
                <motion.div
                  className="h-full rounded-3xl bg-white border border-beige-200 shadow-card overflow-hidden"
                  whileHover={{ y: -6, boxShadow: "0 10px 40px -10px rgba(139,111,71,0.15)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Top */}
                  <div className={`${act.bgColor} p-6 flex items-start justify-between`}>
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center text-2xl shadow-soft"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      {act.icon}
                    </motion.div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getDifficultyColor(act.difficulty)}`}>
                      {getDifficultyLabel(act.difficulty)}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-warm-brown-dark mb-1.5 group-hover:text-olive-600 transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-sm text-warm-brown leading-relaxed mb-4">
                      {act.description}
                    </p>

                    {act.progress !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-warm-sand mb-1.5">
                          <span>Progress</span>
                          <span>{act.progress}%</span>
                        </div>
                        <div className="h-2 bg-beige-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-olive-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${act.progress}%` } : {}}
                            transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-warm-sand">
                          <Users size={11} /> {act.ageRange}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-warm-sand">
                          <Clock size={11} /> {act.duration}
                        </span>
                      </div>
                      <ArrowRight size={16} className="text-olive-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-olive-600 border border-olive-200 hover:bg-olive-50 rounded-2xl transition-all"
            >
              Lihat Semua Aktivitas <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}