import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SoundProvider } from "@/lib/SoundContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Tumbuh Sunnah — Edukasi Anak Muslim Sesuai Fitrah",
    template: "%s | Tumbuh Sunnah",
  },
  description:
    "Platform edukasi anak muslim usia 2–7 tahun yang tenang, aman, dan sesuai fitrah.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tumbuh Sunnah",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#7A9A61",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-192.png"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%237A9A61'/><text y='70' x='50' text-anchor='middle' font-size='50' fill='white' font-family='serif'>ت</text></svg>"
        />
      </head>
      <body className="bg-cream-50 text-warm-brown antialiased overscroll-none">
        <SoundProvider>{children}</SoundProvider>
      </body>
    </html>
  );
}