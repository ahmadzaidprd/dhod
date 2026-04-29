"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Flame, Trophy, Clock, ChevronRight, Star, ArrowLeft } from "lucide-react";
import { activities } from "@/data/activities";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const child = {
    name: "Fatimah",
    level: 3,
    xp: 240,
    xpMax: 400,
    streak: 7,
    done: 8,
    total: activities.length,
  };

  const xpPct = Math.round((child.xp / child.xpMax) * 100);
  const progressPct = Math.round((child.done / child.total) * 100);

  const stats = [
    { label: "Streak", value: `${child.streak}`, unit: "hari", icon: Flame, bg: "bg-orange-50", text: "text-orange-500", border: "border-orange-100" },
    { label: "Selesai", value: `${child.done}`, unit: "aktivitas", icon: Trophy, bg: "bg-olive-50", text: "text-olive-600", border: "border-olive-100" },
    { label: "Waktu", value: "35", unit: "menit", icon: Clock, bg: "bg-sage-50", text: "text-sage-500", border: "border-sage-100" },
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 py-8 pt-10">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-warm-sand hover:text-warm-brown mb-6">
          <ArrowLeft size={15} /> Kembali ke Beranda
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-warm-sand flex items-center gap-1.5">🌤 Assalamu&apos;alaikum</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-warm-brown-dark mt-1">
            Selamat datang, {child.name}! 👋
          </h1>
          <p className="text-warm-brown mt-1">Mari lanjutkan perjalanan belajar hari ini.</p>
        </div>

        {/* Top: Level + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">

          {/* Level */}
          <div className="rounded-3xl bg-gradient-to-br from-olive-500 to-olive-600 p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-6 translate-x-6" />
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Star size={15} className="fill-white text-white" />
              </div>
              <div>
                <p className="text-xs text-olive-100">Level {child.level}</p>
                <p className="text-sm font-bold">Murid Bersemangat</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-olive-100 mb-1">
              <span>XP</span>
              <span>{child.xp} / {child.xpMax}</span>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-white transition-all duration-1000" style={{ width: `${xpPct}%` }} />
            </div>
            <p className="text-xs text-olive-100 mt-1.5">{child.xpMax - child.xp} XP lagi ke Level {child.level + 1}</p>
          </div>

          {/* Stats */}
          <div className="lg:col-span-2 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className={`rounded-2xl bg-white border ${s.border} shadow-card p-4`}>
                <div className={`w-9 h-9 rounded-xl ${s.bg} ${s.text} flex items-center justify-center mb-3`}>
                  <s.icon size={16} />
                </div>
                <p className="text-xl font-extrabold text-warm-brown-dark leading-none">{s.value}</p>
                <p className="text-xs text-warm-sand mt-0.5">{s.unit}</p>
                <p className="text-xs font-medium text-warm-brown mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Overall progress */}
        <div className="rounded-3xl bg-white border border-beige-200 shadow-card p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-warm-brown-dark">Progress Keseluruhan</h2>
              <p className="text-xs text-warm-sand">{child.done} dari {child.total} aktivitas</p>
            </div>
            <BookOpen size={18} className="text-olive-500" />
          </div>
          <div className="h-3 rounded-full bg-beige-100 overflow-hidden">
            <div className="h-full rounded-full bg-olive-400 transition-all duration-1000" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-xs text-warm-sand mt-1.5 text-right">{progressPct}%</p>
        </div>

        {/* Activities */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-warm-brown-dark">Semua Aktivitas</h2>
          <span className="text-xs text-warm-sand">{activities.length} tersedia</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((act) => (
            <Link key={act.id} href={act.href} className="group block">
              <div className="h-full rounded-3xl bg-white border border-beige-200 shadow-card hover:shadow-soft-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className={`${act.bgColor} p-5 flex items-center justify-between`}>
                  <div className="w-12 h-12 rounded-2xl bg-white/70 flex items-center justify-center text-2xl shadow-soft">
                    {act.icon}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/60 text-warm-brown font-semibold">
                    {act.difficulty === "mudah" ? "Mudah" : "Sedang"}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-warm-brown-dark group-hover:text-olive-600 transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-xs text-warm-sand mt-1 leading-relaxed">{act.description}</p>

                  {act.progress !== undefined && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-warm-sand mb-1">
                        <span>Progress</span>
                        <span>{act.progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-beige-100 overflow-hidden">
                        <div className="h-full rounded-full bg-olive-400 transition-all duration-700" style={{ width: `${act.progress}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-warm-sand">{act.ageRange}</span>
                    <ChevronRight size={14} className="text-olive-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}