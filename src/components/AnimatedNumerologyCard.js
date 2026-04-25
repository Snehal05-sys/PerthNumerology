import { useState, useEffect } from "react";

const NUMBER_THEMES = {
  1: { color: "#f5c76f", icon: "☀️", gradient: "135deg, rgba(245,199,111,.15), rgba(251,146,60,.08)" },
  2: { color: "#a5f3fc", icon: "🌙", gradient: "135deg, rgba(165,243,252,.15), rgba(99,102,241,.08)" },
  3: { color: "#f9a8d4", icon: "⭐", gradient: "135deg, rgba(249,168,212,.15), rgba(196,181,253,.08)" },
  4: { color: "#86efac", icon: "🌿", gradient: "135deg, rgba(134,239,172,.15), rgba(52,211,153,.08)" },
  5: { color: "#fda4af", icon: "🔥", gradient: "135deg, rgba(253,164,175,.15), rgba(251,113,133,.08)" },
  6: { color: "#c4b5fd", icon: "💜", gradient: "135deg, rgba(196,181,253,.15), rgba(139,92,246,.08)" },
  7: { color: "#818cf8", icon: "🔮", gradient: "135deg, rgba(129,140,248,.15), rgba(99,102,241,.08)" },
  8: { color: "#fcd34d", icon: "♾️", gradient: "135deg, rgba(252,211,77,.15), rgba(245,158,11,.08)" },
  9: { color: "#6ee7b7", icon: "🌊", gradient: "135deg, rgba(110,231,183,.15), rgba(16,185,129,.08)" },
  11: { color: "#e879f9", icon: "✨", gradient: "135deg, rgba(232,121,249,.15), rgba(168,85,247,.08)" },
  22: { color: "#fb923c", icon: "🏛️", gradient: "135deg, rgba(251,146,60,.15), rgba(239,68,68,.08)" },
  33: { color: "#34d399", icon: "❤️", gradient: "135deg, rgba(52,211,153,.15), rgba(16,185,129,.08)" },
};

function getTheme(number) {
  return NUMBER_THEMES[number] || NUMBER_THEMES[((number - 1) % 9) + 1] || NUMBER_THEMES[1];
}

// Animated counter that counts up to the number
function CountUp({ target }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const steps = 30;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [target]);
  return <>{display}</>;
}

export default function AnimatedNumerologyCard({ title, number, meaning, hindi, setHindi }) {
  const [visible, setVisible] = useState(false);
  const [translated, setTranslated] = useState("");
  const [translating, setTranslating] = useState(false);
  const theme = getTheme(number);

  // Animate in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Hindi translation using MyMemory free API
  async function handleTranslate() {
    if (translated) { setHindi(!hindi); return; }
    setTranslating(true);
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(meaning)}&langpair=en|hi`
      );
      const data = await res.json();
      setTranslated(data.responseData?.translatedText || meaning);
      setHindi(true);
    } catch {
      setTranslated(meaning);
      setHindi(true);
    } finally {
      setTranslating(false);
    }
  }

  return (
    <div
      className="animated-num-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        background: `radial-gradient(circle at 20% 10%, rgba(196,181,253,.08), transparent 24%), linear-gradient(${theme.gradient})`,
      }}
    >
      {/* Glow ring decoration */}
      <div className="num-glow-ring" style={{ borderColor: `${theme.color}22` }} />

      {/* Top row */}
      <div className="num-card-top">
        <span className="num-badge" style={{ color: theme.color }}>{title}</span>
        <span style={{ fontSize: "1.3rem" }}>{theme.icon}</span>
      </div>

      {/* Big number with count-up */}
      <div className="num-big" style={{ color: theme.color }}>
        <CountUp target={number} />
      </div>

      {/* Meaning text */}
      <p className="num-copy">
        {hindi && translated ? translated : meaning}
      </p>

      {/* Translate button */}
      <button
        onClick={handleTranslate}
        disabled={translating}
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${theme.color}44`,
          color: theme.color,
          padding: "0.4rem 1rem",
          borderRadius: "999px",
          cursor: translating ? "not-allowed" : "pointer",
          fontSize: "0.8rem",
          fontFamily: "inherit",
          transition: "all 0.2s",
          opacity: translating ? 0.6 : 1,
        }}
      >
        {translating ? "⏳ Translating..." : hindi && translated ? "🔤 English" : "🇮🇳 हिंदी में देखें"}
      </button>
    </div>
  );
}
