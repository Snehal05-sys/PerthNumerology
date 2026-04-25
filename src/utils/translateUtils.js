/**
 * Translation Utility Mock
 * Real translation requires an API key (e.g. Google Translate API).
 * This mock returns the original text to prevent build errors.
 */

export async function translateText(text, targetLang) {
  console.warn(`Translation to ${targetLang} requested, but translateUtils is in mock mode.`);
  // In a real app, you'd fetch from a translation service here.
  return text; 
}
