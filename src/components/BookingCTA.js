export default function BookingCTA() {
  return (
    <section className="content-panel" style={{ textAlign: "center", padding: "3rem 2rem" }}>
      <h2 className="section-heading">Ready to Begin Your Spiritual Journey?</h2>
      <p className="section-card-copy" style={{ maxWidth: "600px", margin: "0 auto 2rem" }}>
        Book a premium one-on-one consultation with our expert numerologists and spiritual guides. 
        Unlock your destiny, gain clarity, and transform your life.
      </p>
      <div className="hero-cta-wrap">
        <a
          href="mailto:contact@perthnumerology.com"
          className="hero-btn-primary"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          📅 Book a Consultation
        </a>
      </div>
    </section>
  );
}
