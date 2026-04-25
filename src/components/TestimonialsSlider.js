import { useState } from "react";

const TESTIMONIALS = [
  {
    name: "Priya S.",
    location: "Melbourne, AU",
    text: "Perth Numerology gave me clarity I hadn't found anywhere else. The life path reading was incredibly accurate and the gemstone recommendations have brought me peace.",
    stars: 5,
  },
  {
    name: "Arjun M.",
    location: "Perth, AU",
    text: "The tarot reading session was cinematic and deeply moving. I walked away with real action steps and a renewed sense of purpose. Highly recommend!",
    stars: 5,
  },
  {
    name: "Sophie L.",
    location: "Sydney, AU",
    text: "I was skeptical at first, but the numerology report was spot-on. The mantra suggestions have become part of my daily routine and I feel genuinely more grounded.",
    stars: 5,
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  const t = TESTIMONIALS[current];

  return (
    <section className="content-panel" style={{ textAlign: "center", padding: "3rem 2rem" }}>
      <h2 className="section-heading">What Our Clients Say</h2>
      <div
        className="lux-card"
        style={{ maxWidth: "640px", margin: "0 auto 1.5rem", padding: "2rem" }}
      >
        <div style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {"⭐".repeat(t.stars)}
        </div>
        <p className="section-card-copy" style={{ fontStyle: "italic", marginBottom: "1rem" }}>
          "{t.text}"
        </p>
        <p style={{ fontWeight: "bold", color: "var(--gold, #c9a84c)" }}>
          — {t.name}, {t.location}
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button className="hero-btn-secondary" onClick={prev} style={{ padding: "0.5rem 1.25rem" }}>
          ← Prev
        </button>
        <button className="hero-btn-secondary" onClick={next} style={{ padding: "0.5rem 1.25rem" }}>
          Next →
        </button>
      </div>
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.5rem" }}>
        {TESTIMONIALS.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: i === current ? "var(--gold, #c9a84c)" : "#555",
              cursor: "pointer",
              display: "inline-block",
            }}
          />
        ))}
      </div>
    </section>
  );
}
