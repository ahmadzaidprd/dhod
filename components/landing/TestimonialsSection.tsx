"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 sm:py-28 bg-beige-100" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-olive-100 text-olive-700 text-xs font-semibold mb-4">
            Testimoni
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-warm-brown-dark tracking-tight">
            Kata Mereka yang{" "}
            <span className="text-olive-600">Telah Merasakan</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl border border-beige-200 p-5 shadow-card hover:shadow-soft-md transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, si) => (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 + si * 0.05 }}
                  >
                    <Star size={13} className="fill-olive-400 text-olive-400" />
                  </motion.div>
                ))}
              </div>

              <p className="text-sm text-warm-brown leading-relaxed mb-4">
                &quot;{t.content}&quot;
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-beige-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-olive-200 to-sage-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-olive-700">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-warm-brown-dark">{t.name}</p>
                  <p className="text-xs text-warm-sand">{t.role} • {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}