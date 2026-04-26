let utterance = null;

export function speakText(text) {
  if (!window.speechSynthesis) return;
  stopSpeech();
  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;
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
  utterance = null;
}
