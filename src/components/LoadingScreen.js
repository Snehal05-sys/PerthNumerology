import { useEffect, useState } from "react";

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), 2800);
    const doneTimer = setTimeout(() => {
      setPhase("gone");
      onDone();
    }, 3500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  if (phase === "gone") return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "linear-gradient(135deg, #0a0118 0%, #0d0221 50%, #060f1e 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transition: "opacity 0.7s ease",
      opacity: phase === "fading" ? 0 : 1,
      pointerEvents: phase === "fading" ? "none" : "all",
    }}>

      <ConvStars />

      <div style={{ position: "relative", width: 220, height: 220, marginBottom: "2rem" }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            position: "absolute",
            inset: i * 22,
            borderRadius: "50%",
            border: `1.5px solid rgba(167,139,250,${0.6 - i * 0.1})`,
            animation: `mandala-spin-${i % 2 === 0 ? "cw" : "ccw"} ${3 + i * 0.8}s linear infinite`,
            boxShadow: i === 0 ? "0 0 24px rgba(167,139,250,0.25)" : "none",
          }} />
        ))}

        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 360;
          const r = 105;
          const x = 110 + r * Math.cos((angle * Math.PI) / 180);
          const y = 110 + r * Math.sin((angle * Math.PI) / 180);
          return (
            <div key={i} style={{
              position: "absolute",
              left: x - 3, top: y - 3,
              width: 6, height: 6,
              borderRadius: "50%",
              background: i % 3 === 0 ? "#f9a8d4" : "#a78bfa",
              boxShadow: `0 0 6px ${i % 3 === 0 ? "#f9a8d4" : "#a78bfa"}`,
              animation: `dot-pulse 1.5s ease-in-out ${i * 0.12}s infinite`,
            }} />
          );
        })}

        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * 360;
          return (
            <div key={i} style={{
              position: "absolute",
              left: "50%", top: "50%",
              width: 38, height: 38,
              marginLeft: -19, marginTop: -19,
              borderRadius: "50% 0 50% 0",
              border: "1px solid rgba(196,181,253,0.45)",
              transform: `rotate(${angle}deg) translateY(-32px)`,
              animation: `petal-glow 2s ease-in-out ${i * 0.25}s infinite alternate`,
            }} />
          );
        })}

        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2.8rem",
          animation: "centre-pulse 2s ease-in-out infinite",
          filter: "drop-shadow(0 0 12px #c4b5fd)",
        }}>
          🕉
        </div>
      </div>

      <div style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: "1.5rem", color: "#c4b5fd",
        letterSpacing: "0.18em",
        animation: "text-shimmer 2s ease-in-out infinite",
        textShadow: "0 0 20px rgba(196,181,253,0.6)",
        marginBottom: "0.6rem",
      }}>
        PERTH NUMEROLOGY
      </div>
      <div style={{
        color: "#9ca3af", fontSize: "0.9rem",
        letterSpacing: "0.22em", textTransform: "uppercase",
        animation: "fadeUp 1s ease-out 0.5s both",
      }}>
        Aligning cosmic energies...
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "2rem" }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#a78bfa",
            animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            boxShadow: "0 0 8px #a78bfa",
          }} />
        ))}
      </div>

      <style>{`
        @keyframes mandala-spin-cw  { to { transform: rotate(360deg); } }
        @keyframes mandala-spin-ccw { to { transform: rotate(-360deg); } }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
        @keyframes petal-glow {
          from { border-color: rgba(196,181,253,0.25); }
          to   { border-color: rgba(249,168,212,0.7); }
        }
        @keyframes centre-pulse {
          0%, 100% { transform: scale(1);    filter: drop-shadow(0 0 8px #c4b5fd); }
          50%      { transform: scale(1.12); filter: drop-shadow(0 0 20px #f9a8d4); }
        }
        @keyframes text-shimmer {
          0%, 100% { color: #c4b5fd; text-shadow: 0 0 20px rgba(196,181,253,0.5); }
          50%      { color: #f3e8ff; text-shadow: 0 0 32px rgba(249,168,212,0.7); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40%           { transform: scale(1.3); opacity: 1; }
        }
        @keyframes star-converge {
          0%   { opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0.2); }
        }
      `}</style>
    </div>
  );
}

function ConvStars() {
  const stars = Array.from({ length: 40 }).map((_, i) => {
    const angle = Math.random() * 360;
    const dist = 180 + Math.random() * 340;
    const tx = -Math.cos((angle * Math.PI) / 180) * dist;
    const ty = -Math.sin((angle * Math.PI) / 180) * dist;
    const size = 4 + Math.random() * 8;
    const delay = Math.random() * 2.5;
    const dur = 1.8 + Math.random() * 1.2;
    const symbols = ["✦", "✧", "⋆", "★", "·"];
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    const colors = ["#c4b5fd", "#f9a8d4", "#fde68a", "#67e8f9", "#ffffff"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = 50 + Math.cos((angle * Math.PI) / 180) * (40 + Math.random() * 30);
    const startY = 50 + Math.sin((angle * Math.PI) / 180) * (40 + Math.random() * 30);
    return (
      <div key={i} style={{
        position: "absolute",
        left: `${startX}%`,
        top: `${startY}%`,
        fontSize: size,
        color,
        textShadow: `0 0 6px ${color}`,
        "--tx": `${tx}px`,
        "--ty": `${ty}px`,
        animation: `star-converge ${dur}s ease-in ${delay}s infinite`,
        pointerEvents: "none",
      }}>
        {sym}
      </div>
    );
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars}
    </div>
  );
}
