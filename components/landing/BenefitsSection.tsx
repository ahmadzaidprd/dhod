"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const benefits = [
  { no: "01", title: "Sesuai Tahapan Tumbuh Kembang", desc: "Aktivitas disesuaikan dengan kemampuan kognitif dan motorik anak. Tidak terburu-buru.", tag: "Pedagogis" },
  { no: "02", title: "Menjaga Konsentrasi Anak", desc: "Desain minimalis mencegah overstimulasi. Anak belajar fokus tanpa kebisingan visual.", tag: "Psikologi" },
  { no: "03", title: "Fondasi Ilmu Agama yang Kuat", desc: "Hijaiyah sejak dini, kebiasaan Islami, dan pengenalan sunnah sejak masa emas.", tag: "Islami" },
  { no: "04", title: "Orang Tua Tetap Memegang Kontrol", desc: "Pantau aktivitas dan progress anak. Anda yang menentukan waktu belajar.", tag: "Parental" },
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-20 sm:py-28 bg-cream-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-olive-100 text-olive-700 text-xs font-semibold mb-5">
              Manfaat
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-warm-brown-dark leading-tight tracking-tight mb-5">
              Mengapa Ini{" "}
              <span className="text-olive-600">Penting</span>{" "}
              untuk Anak Anda?
            </h2>
            <p className="text-base text-warm-brown leading-relaxed">
              Masa emas 2–7 tahun adalah waktu terbaik menanamkan pondasi iman dan keilmuan.
              Tumbuh Sunnah hadir sebagai teman belajar yang benar, tenang, dan berkah.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 p-5 rounded-2xl bg-olive-50 border border-olive-100"
            >
              <p className="text-xl text-warm-brown-dark text-right leading-relaxed mb-2" dir="rtl">
                طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
              </p>
              <p className="text-xs text-warm-sand">
                &quot;Menuntut ilmu adalah kewajiban atas setiap muslim.&quot;
                <br />(HR. Ibnu Majah)
              </p>
            </motion.div>
          </motion.div>

          {/* Right */}
          <div className="space-y-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.no}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-beige-200 hover:border-olive-200 hover:shadow-soft transition-all duration-300 cursor-default"
              >
                <motion.div
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-olive-100 flex items-center justify-center"
                  whileHover={{ rotate: 10 }}
                >
                  <span className="text-xs font-extrabold text-olive-600">{b.no}</span>
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm font-bold text-warm-brown-dark">{b.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-beige-100 text-warm-sand hidden sm:inline-block">
                      {b.tag}
                    </span>
                  </div>
                  <p className="text-sm text-warm-brown leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}