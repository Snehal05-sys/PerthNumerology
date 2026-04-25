import { useEffect, useRef } from "react";

// ── Animated Canvas Starfield Background ───────────────────────────────────

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Set canvas to fill window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate random stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
    }));

    let rafId;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        // Twinkle effect
        star.alpha += star.speed;
        if (star.alpha > 1) star.speed *= -1;
        if (star.alpha < 0) star.speed *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    }

    draw();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
