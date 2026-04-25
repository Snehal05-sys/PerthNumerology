const ORBS = [
  { size: 260, top: "10%", left: "-5%", color: "rgba(124,58,237,0.16)", blur: 80, duration: "16s" },
  { size: 180, top: "55%", left: "75%", color: "rgba(219,39,119,0.12)", blur: 70, duration: "20s" },
  { size: 220, top: "72%", left: "10%", color: "rgba(59,130,246,0.10)", blur: 75, duration: "18s" },
  { size: 140, top: "18%", left: "80%", color: "rgba(103,232,249,0.10)", blur: 60, duration: "14s" },
];

export default function FloatingOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {ORBS.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            borderRadius: "50%",
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            animation: `orbFloat${i % 3} ${orb.duration} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
