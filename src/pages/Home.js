import BookingCTA from "../components/BookingCTA";
import TestimonialsSlider from "../components/TestimonialsSlider";

const FEATURES = [
  { icon: "🃏", title: "Luxury Tarot Reading", desc: "Cinematic card reveals, premium guidance, emotional clarity, and action-based spiritual coaching.", page: "tarot" },
  { icon: "🔢", title: "Deep Numerology", desc: "Client-specific destiny, life path, and soul urge calculations with premium animated reveal cards.", page: "numerology" },
  { icon: "💎", title: "Gemstone Alignment", desc: "Birthdate-based zodiac gemstone guidance with 3D viewer, wearing suggestions, and support rituals.", page: "gemstones" },
  { icon: "🕉️", title: "Mantras & Remedies", desc: "Ancient shastra-inspired mantra, pooja, bracelet, ring, and remedy recommendations for real-life problems.", page: "mantras" },
  { icon: "🔮", title: "Guidance Portal", desc: "A premium dashboard for longer-form coaching based on your readings and spiritual questions.", page: "guidance" },
];

export default function Home({ setPage }) {
  return (
    <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
      <section className="ultra-hero">
        <div className="hero-aura"></div>
        <div className="hero-particles"></div>
        <div className="premium-pill">Modern Luxury Spiritual Consultation Platform</div>
        <div className="shimmer-anim float-slow" style={{ fontSize: "4rem", marginBottom: "1rem" }}>✦ 🌙 ✦</div>
        <h1 className="hero-title">Perth Numerology</h1>
        <p className="hero-subtitle">
          A premium spiritual consultation platform that combines tarot, numerology, gemstone recommendations, mantras, remedies, and zodiac product commerce into one luxury experience designed for trust, readability, and conversion.
        </p>
        <div className="hero-cta-wrap">
          <button className="hero-btn-primary" onClick={() => setPage("tarot")}>🃏 Begin Tarot</button>
          <button className="hero-btn-secondary" onClick={() => setPage("numerology")}>🔢 Reveal Numerology</button>
          <button className="hero-btn-secondary" onClick={() => setPage("mantras")}>🕉️ Explore Remedies</button>
        </div>
      </section>

      <section className="home-section-grid">
        {FEATURES.map((f, i) => (
          <div key={i} className="premium-feature-card feature-card cosmic-card" onClick={() => setPage(f.page)}>
            <div className="float-slow" style={{ fontSize: "2.9rem", marginBottom: "1rem" }}>{f.icon}</div>
            <h3 className="section-card-title">{f.title}</h3>
            <p className="section-card-copy">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="content-panel">
        <h2 className="section-heading">Why Perth Numerology Is Now More Commercially Powerful</h2>
        <div className="two-col">
          <div className="lux-card">
            <h3 className="section-card-title">Ancient Wisdom + Modern Productization</h3>
            <p className="section-card-copy">Now the platform not only provides spiritual readings, but also connects readings with remedies, mantra suggestions, gemstone wearables, and product-ready bracelet / ring recommendations that increase trust and monetization potential.</p>
          </div>
          <div className="lux-card">
            <h3 className="section-card-title">Higher Client Value</h3>
            <p className="section-card-copy">A client can now receive a reading, get a suggested gemstone, and receive a mantra plus pooja recommendation in one premium consultation flow — making the website feel more complete and spiritually useful.</p>
          </div>
        </div>
      </section>

      <TestimonialsSlider />
      <BookingCTA />
    </div>
  );
}
