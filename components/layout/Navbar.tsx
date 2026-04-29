"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen } from "lucide-react";

const navLinks = [
  { label: "Beranda",   href: "/" },
  { label: "Aktivitas", href: "/#activities" },
  { label: "Fitur",     href: "/#features" },
  { label: "Tentang",   href: "/#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Keyboard escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream-50/95 backdrop-blur-md shadow-soft border-b border-beige-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <motion.div
                className="w-9 h-9 rounded-2xl bg-olive-500 flex items-center justify-center shadow-soft group-hover:bg-olive-600 transition-colors"
                whileHover={{ rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen size={18} className="text-white" />
              </motion.div>
              <span className="text-base font-bold text-warm-brown-dark tracking-tight">
                Tumbuh <span className="text-olive-600">Sunnah</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm rounded-xl transition-all duration-200 ${
                      active
                        ? "text-olive-600 bg-olive-50 font-semibold"
                        : "text-warm-brown hover:text-olive-600 hover:bg-olive-50 font-medium"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-olive-500 rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-semibold text-warm-brown border border-beige-300 hover:border-olive-300 hover:bg-olive-50 rounded-xl transition-all"
              >
                Masuk
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="px-5 py-2 text-sm font-semibold text-white bg-olive-500 hover:bg-olive-600 rounded-xl shadow-soft transition-all"
                >
                  Mulai Gratis
                </Link>
              </motion.div>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-beige-100 transition-colors"
              aria-label={open ? "Tutup menu" : "Buka menu"}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-warm-brown-dark/20 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-cream-50 shadow-soft-lg"
            >
              <div className="p-6 pt-20 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`block px-4 py-3 text-base rounded-xl transition-all ${
                          active
                            ? "text-olive-600 bg-olive-50 font-semibold"
                            : "text-warm-brown hover:text-olive-600 hover:bg-olive-50 font-medium"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="w-full py-3 text-center text-sm font-semibold border border-beige-300 rounded-xl hover:bg-beige-100 transition-all"
                  >
                    Masuk
                  </Link>
                  <motion.div whileTap={{ scale: 0.97 }} className="w-full">
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="block w-full py-3 text-center text-sm font-semibold text-white bg-olive-500 rounded-xl hover:bg-olive-600 shadow-soft transition-all"
                    >
                      Mulai Gratis
                    </Link>
                  </motion.div>
                </div>

                {/* Mobile footer info */}
                <div className="mt-8 pt-4 border-t border-beige-200">
                  <p className="text-xs text-warm-sand text-center">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}