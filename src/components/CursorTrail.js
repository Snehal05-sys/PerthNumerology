import { useEffect, useRef } from "react";

const COLORS = ["#c4b5fd", "#f9a8d4", "#fde68a", "#67e8f9", "#a78bfa", "#ffffff"];
const SYMBOLS = ["✦", "✧", "⋆", "★", "·", "✴"];

export default function CursorTrail() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    document.body.style.cursor = "none";

    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: radial-gradient(circle, #ffffff, #a78bfa);
      box-shadow: 0 0 8px 3px rgba(167,139,250,0.7);
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: transform 0.08s ease;
    `;
    document.body.appendChild(dot);

    let lastSpawnTime = 0;

    function onMouseMove(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";

      const now = Date.now();
      if (now - lastSpawnTime < 40) return;
      lastSpawnTime = now;
      spawnParticle(mouseX, mouseY);
    }

    function spawnParticle(x, y) {
      const el = document.createElement("div");
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const size = 10 + Math.random() * 14;
      const angle = Math.random() * 360;
      const distance = 20 + Math.random() * 40;
      const dx = Math.cos((angle * Math.PI) / 180) * distance;
      const dy = Math.sin((angle * Math.PI) / 180) * distance;
      const duration = 600 + Math.random() * 500;

      el.textContent = symbol;
      el.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size}px;
        color: ${color};
        pointer-events: none;
        z-index: 99998;
        transform: translate(-50%, -50%);
        text-shadow: 0 0 6px ${color};
        transition: left ${duration}ms ease-out, top ${duration}ms ease-out, opacity ${duration}ms ease-out, transform ${duration}ms ease-out;
        will-change: transform, opacity;
      `;
      document.body.appendChild(el);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.left = x + dx + "px";
          el.style.top = y + dy + "px";
          el.style.opacity = "0";
          el.style.transform = `translate(-50%, -50%) scale(0.2) rotate(${Math.random() * 180}deg)`;
        });
      });

      setTimeout(() => el.remove(), duration + 50);
    }

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.body.style.cursor = "";
      dot.remove();
    };
  }, []);

  return <div ref={containerRef} />;
}
