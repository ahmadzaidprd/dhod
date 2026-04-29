// ──────────────────────────────────────────────────
// Audio feedback menggunakan Web Audio API
// Tidak ada file musik — hanya efek suara singkat
// Aman secara syariat
// ──────────────────────────────────────────────────

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume: number = 0.15
) {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Fade in
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);

    // Fade out
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Silent fail — audio not supported
  }
}

function playMultipleTones(
  tones: Array<{ freq: number; delay: number; duration: number; type?: OscillatorType }>,
  volume: number = 0.12
) {
  try {
    const ctx = getAudioContext();

    tones.forEach((tone) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = tone.type || "sine";
      oscillator.frequency.setValueAtTime(tone.freq, ctx.currentTime + tone.delay);

      gainNode.gain.setValueAtTime(0, ctx.currentTime + tone.delay);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + tone.delay + 0.02);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + tone.delay + tone.duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime + tone.delay);
      oscillator.stop(ctx.currentTime + tone.delay + tone.duration);
    });
  } catch {
    // Silent fail
  }
}

// ── PUBLIC SOUND FUNCTIONS ────────────────────────

/**
 * Suara klik ringan — untuk tombol / tap
 */
export function playClick() {
  playTone(800, 0.08, "sine", 0.08);
}

/**
 * Suara jawaban benar — nada naik lembut
 */
export function playCorrect() {
  playMultipleTones([
    { freq: 523, delay: 0,    duration: 0.12 },  // C5
    { freq: 659, delay: 0.1,  duration: 0.12 },  // E5
    { freq: 784, delay: 0.2,  duration: 0.18 },  // G5
  ], 0.12);
}

/**
 * Suara jawaban salah — nada rendah pendek
 */
export function playWrong() {
  playMultipleTones([
    { freq: 300, delay: 0,    duration: 0.15, type: "triangle" },
    { freq: 250, delay: 0.12, duration: 0.15, type: "triangle" },
  ], 0.1);
}

/**
 * Suara level selesai — melodi naik ceria
 */
export function playLevelComplete() {
  playMultipleTones([
    { freq: 523, delay: 0,    duration: 0.12 },  // C5
    { freq: 587, delay: 0.1,  duration: 0.12 },  // D5
    { freq: 659, delay: 0.2,  duration: 0.12 },  // E5
    { freq: 784, delay: 0.3,  duration: 0.12 },  // G5
    { freq: 1047, delay: 0.4, duration: 0.25 },  // C6
  ], 0.13);
}

/**
 * Suara semua selesai — lebih megah
 */
export function playAllComplete() {
  playMultipleTones([
    { freq: 523,  delay: 0,    duration: 0.15 },
    { freq: 659,  delay: 0.12, duration: 0.15 },
    { freq: 784,  delay: 0.24, duration: 0.15 },
    { freq: 1047, delay: 0.36, duration: 0.15 },
    { freq: 1175, delay: 0.48, duration: 0.15 },
    { freq: 1319, delay: 0.55, duration: 0.3  },
  ], 0.14);
}

/**
 * Suara drag mulai — pop kecil
 */
export function playDragStart() {
  playTone(600, 0.06, "sine", 0.06);
}

/**
 * Suara drop berhasil — ding
 */
export function playDropSuccess() {
  playMultipleTones([
    { freq: 880, delay: 0,   duration: 0.1 },   // A5
    { freq: 1100, delay: 0.08, duration: 0.15 }, // ~C#6
  ], 0.1);
}

/**
 * Suara drop gagal — thud
 */
export function playDropFail() {
  playTone(200, 0.12, "triangle", 0.08);
}

/**
 * Suara goresan tracing — scratch ringan
 */
export function playStroke() {
  playTone(1200, 0.05, "sine", 0.04);
}

/**
 * Suara bintang muncul — sparkle
 */
export function playStar() {
  playMultipleTones([
    { freq: 1200, delay: 0,    duration: 0.08 },
    { freq: 1500, delay: 0.06, duration: 0.08 },
    { freq: 1800, delay: 0.12, duration: 0.12 },
  ], 0.08);
}

/**
 * Suara tombol navigasi — soft tap
 */
export function playNav() {
  playTone(500, 0.05, "sine", 0.05);
}