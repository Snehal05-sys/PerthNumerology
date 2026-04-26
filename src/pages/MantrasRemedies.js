import { useMemo, useState } from "react";
import PremiumActionBar from "../components/PremiumActionBar";
import { translateText } from "../utils/translateUtils";

const REMEDIES = [
  {
    key: "exam",
    title: "Exam Success / Studies",
    icon: "📚",
    mantra: "Om Aim Saraswatyai Namah",
    deity: "Maa Saraswati",
    pooja: "Light a diya on Thursday morning, offer white flowers, chant 108 times before study.",
    remedies: [
      "Wear a 5 Mukhi Rudraksha or yellow thread on Thursday.",
      "Keep a small piece of turmeric in study desk drawer.",
      "Use yellow sapphire / citrine bracelet if suitable."
    ],
    guidance: "This combination is traditionally used for concentration, memory, speech clarity, and academic blessings. Maintain disciplined study timing, avoid late-night distractions, and begin difficult subjects after chanting."
  },
  {
    key: "love",
    title: "Love / Relationship Attraction",
    icon: "💞",
    mantra: "Om Kleem Krishnaya Namah",
    deity: "Lord Krishna / Kamdev energy",
    pooja: "Offer rose petals on Friday, use sandalwood incense, chant 108 times with calm intention.",
    remedies: [
      "Wear rose quartz bracelet or opal pendant for soft attraction energy.",
      "Keep surroundings clean and use pleasant fragrance.",
      "Avoid desperation, over-messaging, or emotional chasing."
    ],
    guidance: "Ancient attraction remedies work best when emotional vibration is calm, magnetic, and respectful. Focus on self-worth, personal grooming, and heart chakra balance rather than obsession."
  },
  {
    key: "marriage",
    title: "Marriage Delay / Commitment",
    icon: "💍",
    mantra: "Om Katyayanaya Vidmahe Kanyakumari Dhimahi Tanno Durga Prachodayat",
    deity: "Maa Katyayani",
    pooja: "Friday pooja with ghee lamp and red flowers, chant 108 times for 21 days.",
    remedies: [
      "Wear opal / diamond substitute only after consultation.",
      "Offer sweets to young girls on Friday.",
      "Strengthen Venus-related discipline and avoid relationship confusion."
    ],
    guidance: "This remedy is traditionally used for harmony in marriage prospects, emotional maturity, and removal of delay. Align your habits with commitment, clarity, and family respect."
  },
  {
    key: "career",
    title: "Career Growth / Job / Promotion",
    icon: "💼",
    mantra: "Om Gan Ganapataye Namah",
    deity: "Lord Ganesha",
    pooja: "Tuesday or Wednesday Ganesh pooja with durva grass and modak offering.",
    remedies: [
      "Keep green cloth in work drawer for बुध support.",
      "Wear emerald / green aventurine bracelet if suitable.",
      "Start important tasks after short Ganesh chanting."
    ],
    guidance: "This remedy supports obstacle removal, decision clarity, and smoother professional movement. Combine spiritual remedy with punctuality, upskilling, and strong communication."
  },
  {
    key: "money",
    title: "Money Attraction / Financial Stability",
    icon: "💰",
    mantra: "Om Shreem Mahalakshmiyei Namah",
    deity: "Maa Lakshmi",
    pooja: "Friday evening Lakshmi pooja with lotus or rose, cow ghee diya, and 108 chants.",
    remedies: [
      "Keep clean wallet and avoid storing torn notes.",
      "Wear pyrite / citrine bracelet for abundance mindset.",
      "Donate food regularly to maintain energy flow."
    ],
    guidance: "Wealth remedies are most effective when discipline, gratitude, and ethical earning are strong. Avoid impulsive spending and money leakage through emotional purchases."
  },
  {
    key: "protection",
    title: "Protection / Evil Eye / Negative Energy",
    icon: "🛡️",
    mantra: "Om Dum Durgayei Namah",
    deity: "Maa Durga",
    pooja: "Tuesday or Navratri-based Durga chanting with clove and camphor cleansing.",
    remedies: [
      "Wear black tourmaline / amethyst bracelet.",
      "Use rock salt cleansing once a week.",
      "Avoid carrying emotional heaviness from others."
    ],
    guidance: "This is recommended when a client feels blocked, drained, or energetically heavy. Combine with better boundaries, sleep hygiene, and less exposure to conflict."
  }
];

export default function MantrasRemedies() {
  const [problem, setProblem] = useState("exam");
  const [hindi, setHindi] = useState(false);
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);

  const item = useMemo(() => REMEDIES.find(r => r.key === problem), [problem]);

  async function handleToggleHindi() {
    if (!item) return;
    if (!hindi) {
      setLoading(true);
      const full = `${item.title}. Mantra: ${item.mantra}. Deity: ${item.deity}. Pooja: ${item.pooja}. Remedies: ${item.remedies.join(". ")}. Guidance: ${item.guidance}`;
      const result = await translateText(full, "hi");
      setTranslated(result);
      setLoading(false);
      setHindi(true);
    } else {
      setHindi(false);
    }
  }

  return (
    <div className="fade-in page-shell">
      <div className="page-header">
        <div className="premium-pill">Ancient Shastra Remedies</div>
        <h1 className="page-title">Mantras & Remedies Portal</h1>
        <p className="page-subtitle">Curated spiritual suggestions inspired by traditional mantra practice, pooja methods, gemstones, bracelets, and practical energetic remedies for common life problems.</p>
      </div>

      <div className="content-panel">
        <label className="field-label">Select the client problem / intention</label>
        <div className="remedy-chip-wrap">
          {REMEDIES.map((r) => (
            <button key={r.key} className="remedy-chip" onClick={() => { setProblem(r.key); setHindi(false); }}>
              {r.icon} {r.title}
            </button>
          ))}
        </div>
      </div>

      {item && (
        <div className="content-panel">
          <div className="section-grid-3">
            <div className="lux-card">
              <div className="section-card-title">{item.icon} Problem Type</div>
              <p className="section-card-copy">{item.title}</p>
            </div>
            <div className="lux-card">
              <div className="section-card-title">🕉 Recommended Mantra</div>
              <p className="section-card-copy" style={{ color: "#fde68a", fontSize: "1.12rem" }}>{item.mantra}</p>
            </div>
            <div className="lux-card">
              <div className="section-card-title">🙏 Deity / Energy</div>
              <p className="section-card-copy">{item.deity}</p>
            </div>
          </div>

          {!hindi ? (
            <>
              <div className="gem-guidance-box">
                <div className="gem-guidance-title">🪔 Suggested Pooja Method</div>
                <p className="section-card-copy">{item.pooja}</p>
              </div>
              <div className="lux-card" style={{ marginTop: "1rem" }}>
                <div className="section-card-title">✨ Suggested Remedies</div>
                <ul className="remedy-list">
                  {item.remedies.map((r, idx) => <li key={idx}>{r}</li>)}
                </ul>
              </div>
              <div className="gem-guidance-box" style={{ marginTop: "1rem" }}>
                <div className="gem-guidance-title">🔮 Practical Guidance</div>
                <p className="section-card-copy">{item.guidance}</p>
              </div>
            </>
          ) : (
            <div className="gem-guidance-box">
              <div className="gem-guidance-title">✨ हिंदी अनुवाद</div>
              <p className="section-card-copy">{loading ? "अनुवाद किया जा रहा है..." : translated}</p>
            </div>
          )}

          <PremiumActionBar
            text={`${item.title}. Mantra ${item.mantra}. ${item.pooja}. ${item.remedies.join(". ")}. ${item.guidance}`}
            onToggleHindi={handleToggleHindi}
            hindi={hindi}
            shareTitle={`${item.title} Remedy`}
          />
        </div>
      )}
    </div>
  );
}
