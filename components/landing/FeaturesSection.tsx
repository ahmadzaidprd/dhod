"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Leaf, Hand, BookOpen, VolumeX, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,   title: "Aman Syariat",
    desc: "Tidak ada musik, karakter bernyawa realistis, atau konten yang dilarang syariat.",
    bg: "bg-olive-100", iconColor: "text-olive-600", border: "border-olive-200",
  },
  {
    icon: Leaf,     title: "Calm Learning",
    desc: "Desain Montessori Islami. Minim distraksi, warna lembut, animasi sederhana.",
    bg: "bg-sage-100", iconColor: "text-sage-500", border: "border-sage-200",
  },
  {
    icon: Hand,     title: "Motorik Halus",
    desc: "Tracing dan drag & drop melatih koordinasi tangan-mata anak secara alami.",
    bg: "bg-cream-200", iconColor: "text-warm-brown", border: "border-cream-300",
  },
  {
    icon: BookOpen, title: "Kurikulum Fitrah",
    desc: "Hijaiyah, angka, huruf, dan nilai Islami sesuai tahap perkembangan fitrah.",
    bg: "bg-beige-100", iconColor: "text-warm-brown", border: "border-beige-200",
  },
  {
    icon: VolumeX,  title: "Tanpa Musik",
    desc: "Sepenuhnya bebas musik. Hanya feedback visual yang tenang dan tidak mengganggu.",
    bg: "bg-olive-100", iconColor: "text-olive-600", border: "border-olive-200",
  },
  {
    icon: Heart,    title: "Belajar Sepenuh Hati",
    desc: "Dirancang bersama ahli pendidikan anak untuk tumbuh kembang yang berkah.",
    bg: "bg-sage-100", iconColor: "text-sage-500", border: "border-sage-200",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-20 sm:py-28 bg-cream-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-3 py-1 rounded-full bg-olive-100 text-olive-700 text-xs font-semibold mb-4"
          >
            Kenapa Tumbuh Sunnah?
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-warm-brown-dark tracking-tight">
            Dibangun dengan Prinsip yang{" "}
            <span className="text-olive-600">Benar</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-warm-brown max-w-xl mx-auto leading-relaxed">
            Setiap detail dirancang untuk menjaga fitrah anak dan ketenangan belajar sesuai sunnah.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`rounded-3xl border ${f.border} bg-white p-6 hover:shadow-soft-md transition-shadow duration-300 cursor-default`}
            >
              <motion.div
                className={`w-11 h-11 rounded-2xl ${f.bg} flex items-center justify-center mb-4`}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <f.icon size={20} className={f.iconColor} />
              </motion.div>
              <h3 className="text-base font-bold text-warm-brown-dark mb-2">{f.title}</h3>
              <p className="text-sm text-warm-brown leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}