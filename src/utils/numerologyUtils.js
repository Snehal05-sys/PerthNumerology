/**
 * Numerology Utility Functions
 * Standard Pythagorean Numerology System
 */

/**
 * Reduces a number to a single digit (1-9) or a Master Number (11, 22, 33).
 * @param {number} num 
 * @returns {number}
 */
export function reduceToSingleDigit(num) {
  let n = Math.abs(Math.floor(num));
  if (n === 0) return 0;
  
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return n;
}

/**
 * Calculates Life Path Number from birth date (YYYY-MM-DD or similar).
 * @param {string} birthDate 
 * @returns {number}
 */
export function calculateLifePath(birthDate) {
  if (!birthDate) return 0;
  // Remove non-digits
  const digits = birthDate.replace(/\D/g, '');
  const sum = digits.split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  return reduceToSingleDigit(sum);
}

const LETTER_VALUES = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

/**
 * Calculates Destiny Number (Expression Number) from full name.
 * @param {string} name 
 * @returns {number}
 */
export function calculateDestinyNumber(name) {
  if (!name) return 0;
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;
  for (const char of cleanName) {
    sum += LETTER_VALUES[char] || 0;
  }
  return reduceToSingleDigit(sum);
}

/**
 * Calculates Soul Urge Number (Hearts Desire) from vowels in full name.
 * @param {string} name 
 * @returns {number}
 */
export function calculateSoulUrge(name) {
  if (!name) return 0;
  const vowels = name.toUpperCase().match(/[AEIOU]/g) || [];
  let sum = 0;
  for (const char of vowels) {
    sum += LETTER_VALUES[char] || 0;
  }
  return reduceToSingleDigit(sum);
}
