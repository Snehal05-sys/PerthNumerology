// ── Numerology Calculation Utilities ──────────────────────────────────────

const PYTHAGOREAN = {
  A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
  J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
  S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8,
};

// Reduce a number to a single digit (keeps master numbers 11, 22, 33)
export function reduceToSingleDigit(n) {
  n = Math.abs(Math.floor(n));
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split("").reduce((sum, d) => sum + Number(d), 0);
  }
  return n;
}

// Life Path — sum of full birth date digits
export function calculateLifePath(birthDate) {
  if (!birthDate) return 0;
  const digits = String(birthDate).replace(/-/g, "").split("").map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceToSingleDigit(sum);
}

// Destiny Number — all letters in full name
export function calculateDestinyNumber(name = "") {
  const letters = name.toUpperCase().replace(/[^A-Z]/g, "").split("");
  if (!letters.length) return 0;
  const sum = letters.reduce((acc, ch) => acc + (PYTHAGOREAN[ch] || 0), 0);
  return reduceToSingleDigit(sum);
}

// Soul Urge — vowels only
export function calculateSoulUrge(name = "") {
  const vowels = name.toUpperCase().replace(/[^AEIOU]/g, "").split("");
  if (!vowels.length) return 0;
  const sum = vowels.reduce((acc, ch) => acc + (PYTHAGOREAN[ch] || 0), 0);
  return reduceToSingleDigit(sum);
}

