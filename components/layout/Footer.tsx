"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-beige-100 border-t border-beige-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-olive-500 flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <span className="text-base font-bold text-warm-brown-dark tracking-tight">
                Tumbuh <span className="text-olive-600">Sunnah</span>
              </span>
            </Link>
            <p className="text-sm text-warm-brown leading-relaxed max-w-xs">
              Platform edukasi anak muslim usia 2–7 tahun yang tenang, aman, dan sesuai fitrah.
            </p>
            <p className="mt-4 text-xs text-warm-sand font-medium">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-warm-brown-dark mb-3">Aktivitas</h4>
            <ul className="space-y-2">
              {[
                { label: "Huruf Hijaiyah", href: "/activities/hijaiyah" },
                { label: "Belajar Angka",  href: "/activities/angka" },
                { label: "Tracing",        href: "/activities/tracing" },
                { label: "Puzzle",         href: "/activities/puzzle" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-warm-brown hover:text-olive-600 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-warm-brown-dark mb-3">Informasi</h4>
            <ul className="space-y-2">
              {["Tentang Kami", "Panduan Orang Tua", "Kebijakan Privasi", "Hubungi Kami"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-warm-brown hover:text-olive-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-6 border-t border-beige-200 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <p className="text-xs text-warm-sand">© 2024 Tumbuh Sunnah. Semua hak dilindungi.</p>
          <p className="text-xs text-warm-sand">Dibuat dengan ❤️ untuk generasi muslim</p>
        </motion.div>
      </div>
    </footer>
  );
}