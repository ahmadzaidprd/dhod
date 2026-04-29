// lib/voice.ts
"use client";

function getIndonesianVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  const id = voices.find(
    (v) => v.lang === "id-ID" || v.lang.startsWith("id")
  );
  if (id) return id;
  const female = voices.find(
    (v) =>
      v.name.toLowerCase().includes("female") ||
      v.name.toLowerCase().includes("wanita")
  );
  return female || voices[0] || null;
}

export function speak(
  text: string,
  options?: { rate?: number; pitch?: number; volume?: number }
) {
  try {
    if (typeof window === "undefined") return;
    if (speechSynthesis.speaking) speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "id-ID";
    utter.rate = options?.rate ?? 0.85;
    utter.pitch = options?.pitch ?? 1.15;
    utter.volume = options?.volume ?? 1;

    const voice = getIndonesianVoice();
    if (voice) utter.voice = voice;

    speechSynthesis.speak(utter);
  } catch {
    // silent fail
  }
}

// ── Umum ──────────────────────────────────────────

export function speakBenar(detail?: string) {
  if (detail) {
    speak(`Masya Allah, benar! Ini ${detail}`, { rate: 0.85 });
  } else {
    speak("Masya Allah, benar!", { rate: 0.85 });
  }
}

export function speakSalah() {
  speak("Belum tepat, coba lagi ya", { rate: 0.85 });
}

export function speakSemuaCocok() {
  speak("Masya Allah! Semua cocok! Hebat sekali!", { rate: 0.8 });
}

export function speakAlhamdulillah() {
  speak("Alhamdulillah, hebat!", { rate: 0.85 });
}

// ── Puzzle Bentuk ─────────────────────────────────

export function speakNamaBentuk(nama: string) {
  speak(`Ini bentuk ${nama}`);
}

export function speakInstruksiBentuk() {
  speak("Seret bentuk ke kotak yang benar", { rate: 0.8 });
}

// ── Hijaiyah ──────────────────────────────────────

export function speakHuruf(latin: string) {
  speak(`huruf ${latin}`, { rate: 0.8 });
}

export function speakNamaHuruf(latin: string) {
  speak(`${latin}`, { rate: 0.75, pitch: 1.1 });
}

export function speakInstruksiHijaiyah() {
  speak("Ketuk Kotak, Lalu tarik Huruf di bawah ke kotak yang benar", { rate: 0.8 });
}

export function speakKotakHuruf(latin: string) {
  speak(` huruf ${latin}`, { rate: 0.85 });
}

export function speakBenarHuruf(latin: string) {
  speak(`Masya Allah, benar! Ini huruf ${latin}`, { rate: 0.85 });
}

export function speakLevelSelesai(levelNum: number) {
  speak(`Masya Allah! Level ${levelNum} selesai!`, { rate: 0.85 });
}

export function speakSemuaLevelSelesai() {
  speak(
    "Alhamdulillah! Semua level selesai! Kamu hebat sekali!",
    { rate: 0.8 }
  );
}

export function speakLanjutLevel(levelNum: number) {
  speak(`Yuk, lanjut ke level ${levelNum}`, { rate: 0.85 });
}

// ── Angka ─────────────────────────────────────────

export function speakAngka(angka: number) {
  const kata = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
  ];
  speak(`Angka ${kata[angka] || angka}`, { rate: 0.85 });
}

export function speakBerapaBintang() {
  speak("Hitung bintangnya. Ada berapa?", { rate: 0.8 });
}

export function speakBenarAngka(angka: number) {
  const kata = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
  ];
  speak(`Masya Allah, benar! Angka ${kata[angka] || angka}`, { rate: 0.85 });
}

export function speakInstruksiAngka() {
  speak("Hitung bintangnya, lalu pilih angka yang benar", { rate: 0.8 });
}