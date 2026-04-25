import { speakText, pauseSpeech, resumeSpeech, stopSpeech } from "../utils/speechUtils";

export default function PremiumActionBar({ text = "", onToggleHindi, hindi = false, onSave, shareTitle = "Perth Numerology Reading" }) {
  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: shareTitle, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert("Reading copied to clipboard for sharing.");
    }
  }

  return (
    <div className="tool-row premium-toolbar">
      <button className="mini-btn" onClick={() => speakText(text)}>🔊 Play</button>
      <button className="mini-btn" onClick={pauseSpeech}>⏸ Pause</button>
      <button className="mini-btn" onClick={resumeSpeech}>▶ Resume</button>
      <button className="mini-btn" onClick={stopSpeech}>⏹ Stop</button>
      {onToggleHindi && (
        <button className="mini-btn" onClick={onToggleHindi}>{hindi ? "English" : "Translate to Hindi"}</button>
      )}
      <button className="mini-btn" onClick={() => navigator.clipboard.writeText(text)}>📋 Copy</button>
      {onSave && <button className="mini-btn" onClick={onSave}>💾 Save</button>}
      <button className="mini-btn" onClick={handleShare}>📤 Share</button>
    </div>
  );
}
