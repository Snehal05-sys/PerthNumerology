/**
 * Text-to-Speech Utility using Web Speech API
 */

let currentUtterance = null;

export function speakText(text) {
  if (!window.speechSynthesis) return;
  
  // Stop existing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9; // Slightly slower for mystical feel
  utterance.pitch = 1.0;
  
  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function pauseSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.pause();
}

export function resumeSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.resume();
}

export function stopSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}
