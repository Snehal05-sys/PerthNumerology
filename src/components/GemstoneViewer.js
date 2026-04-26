import { memo } from "react";

// Pure CSS gemstone — no WebGL, no Three.js, cannot crash or disappear
const Gemstone3DViewer = memo(function Gemstone3DViewer({ color = "#8b5cf6", shape = "octa" }) {
  const size = 140;
  const half = size / 2;

  // Different SVG polygon shapes per gem type
  const shapes = {
    octa: `${half},10 ${size-10},${half} ${half},${size-10} 10,${half}`,
    diamond: `${half},5 ${size-15},${half-10} ${half},${size-5} 15,${half-10}`,
    emerald: `20,30 ${size-20},30 ${size-10},${half} ${size-20},${size-30} 20,${size-30} 10,${half}`,
    round: `${half},8 ${size-20},20 ${size-8},${half} ${size-20},${size-20} ${half},${size-8} 20,${size-20} 8,${half} 20,20`,
    pear: `${half},8 ${size-15},${half+10} ${size-25},${size-15} 25,${size-15} 15,${half+10}`,
  };

  const points = shapes[shape] || shapes.octa;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "220px",
      position: "relative",
    }}>
      {/* Glow behind gem */}
      <div style={{
        position: "absolute",
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        background: color,
        filter: "blur(40px)",
        opacity: 0.25,
        animation: "gemGlow 3s ease-in-out infinite",
      }} />

      {/* SVG Gem */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          filter: `drop-shadow(0 0 18px ${color}88)`,
          animation: "gemFloat 4s ease-in-out infinite",
          position: "relative",
          zIndex: 1,
        }}
      >
        <defs>
          <linearGradient id={`gemGrad-${shape}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="30%" stopColor={color} stopOpacity="0.95" />
            <stop offset="70%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`gemShine-${shape}`} x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main gem body */}
        <polygon
          points={points}
          fill={`url(#gemGrad-${shape})`}
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.5"
        />

        {/* Shine overlay */}
        <polygon
          points={points}
          fill={`url(#gemShine-${shape})`}
        />

        {/* Inner facet lines */}
        <line x1={half} y1="10" x2={half} y2={size-10} stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.2" />
        <line x1="10" y1={half} x2={size-10} y2={half} stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.2" />
      </svg>

      {/* Sparkle dots */}
      {[
        { top: "15%", left: "20%", delay: "0s", size: 4 },
        { top: "25%", left: "75%", delay: "0.8s", size: 3 },
        { top: "70%", left: "15%", delay: "1.4s", size: 3 },
        { top: "75%", left: "80%", delay: "0.4s", size: 4 },
        { top: "45%", left: "85%", delay: "1.8s", size: 2 },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          borderRadius: "50%",
          background: color,
          opacity: 0.7,
          animation: `sparkle 2s ${s.delay} ease-in-out infinite`,
        }} />
      ))}

      <style>{`
        @keyframes gemFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes gemGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.15); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
});

export default Gemstone3DViewer;
