import { useState } from "react";
import PremiumActionBar from "../components/PremiumActionBar";
import Gemstone3DViewer from "../components/Gemstone3DViewer";
import { translateText } from "../utils/translateUtils";

const ZODIAC_GEMS = [
  { sign: "Aries", gem: "Diamond", color: "#f8fafc", shape: "diamond", range: "Mar 21 – Apr 19", why: "Supports courage, purity, leadership, and decisive energy.", wear: "Ring or pendant in silver/platinum, ideally on Friday or Tuesday.", benefits: "Boosts confidence, clarity, protection, and bold decision-making." },
  { sign: "Taurus", gem: "Emerald", color: "#10b981", shape: "emerald", range: "Apr 20 – May 20", why: "Encourages stability, abundance, emotional security, and grounded love.", wear: "Ring or pendant in silver or gold, ideally on Friday.", benefits: "Enhances harmony, wealth attraction, patience, and relationship balance." },
  { sign: "Gemini", gem: "Agate", color: "#94a3b8", shape: "round", range: "May 21 – Jun 20", why: "Improves communication, flexibility, and mental clarity.", wear: "Bracelet or pendant on Wednesday.", benefits: "Helps expression, calm thinking, and adaptability." },
  { sign: "Cancer", gem: "Moonstone", color: "#bfdbfe", shape: "round", range: "Jun 21 – Jul 22", why: "Enhances intuition, calmness, nurturing energy, and emotional balance.", wear: "Pendant or ring in silver on Monday.", benefits: "Supports emotional healing, feminine energy, peace, and sensitivity." },
  { sign: "Leo", gem: "Peridot", color: "#84cc16", shape: "octa", range: "Jul 23 – Aug 22", why: "Supports charisma, vitality, self-belief, and leadership.", wear: "Ring or bracelet on Sunday.", benefits: "Strengthens confidence, joy, visibility, and self-worth." },
  { sign: "Virgo", gem: "Blue Sapphire", color: "#2563eb", shape: "emerald", range: "Aug 23 – Sep 22", why: "Sharpens focus, discipline, precision, and professional clarity.", wear: "Ring in silver on Saturday after guidance.", benefits: "Improves discipline, mental sharpness, timing, and career stability." },
  { sign: "Libra", gem: "Opal", color: "#f9a8d4", shape: "round", range: "Sep 23 – Oct 22", why: "Encourages harmony, beauty, relationship balance, and softness.", wear: "Ring or pendant on Friday.", benefits: "Supports attraction, emotional harmony, romance, and artistic flow." },
  { sign: "Scorpio", gem: "Topaz", color: "#f59e0b", shape: "pear", range: "Oct 23 – Nov 21", why: "Strengthens transformation, resilience, emotional power, and confidence.", wear: "Pendant or ring on Thursday.", benefits: "Supports personal power, healing, depth, and courage." },
  { sign: "Sagittarius", gem: "Turquoise", color: "#06b6d4", shape: "pear", range: "Nov 22 – Dec 21", why: "Supports wisdom, truth, freedom, healing, and expressive confidence.", wear: "Bracelet or pendant on Thursday.", benefits: "Brings travel luck, optimism, truthfulness, and calm communication." },
  { sign: "Capricorn", gem: "Ruby", color: "#dc2626", shape: "diamond", range: "Dec 22 – Jan 19", why: "Builds ambition, disciplined passion, leadership, and endurance.", wear: "Ring or pendant in gold on Sunday.", benefits: "Boosts authority, vitality, motivation, and status energy." },
  { sign: "Aquarius", gem: "Amethyst", color: "#8b5cf6", shape: "octa", range: "Jan 20 – Feb 18", why: "Improves intuition, originality, spiritual calm, and cleansing.", wear: "Pendant, bracelet, or ring with calm intention.", benefits: "Supports meditation, clarity, sleep, and emotional detox." },
  { sign: "Pisces", gem: "Aquamarine", color: "#22d3ee", shape: "pear", range: "Feb 19 – Mar 20", why: "Promotes peace, compassion, emotional healing, and graceful communication.", wear: "Pendant or bracelet on Monday or Thursday.", benefits: "Supports emotional softness, spiritual flow, empathy, and calm speech." },
];

function getZodiacSign(dateString) {
  if (!dateString) return null;
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return null;
  const month = d.getMonth() + 1;
  const day = d.getDate();
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

export default function Gemstones() {
  const [birthDate, setBirthDate] = useState("");
  const [selected, setSelected] = useState(null);
  const [hindi, setHindi] = useState(false);
  const [translated, setTranslated] = useState({});
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState("");

  // Only runs when user clicks the button — completely stable
  function handleReveal() {
    if (!birthDate) {
      setError("Please select your birth date.");
      return;
    }
    const sign = getZodiacSign(birthDate);
    if (!sign) {
      setError("Invalid date. Please try again.");
      return;
    }
    const gem = ZODIAC_GEMS.find((z) => z.sign === sign) || null;
    setSelected(gem);
    setHindi(false);
    setError("");
  }

  async function handleToggleHindi() {
    if (!selected) return;
    if (!hindi) {
      setTranslating(true);
      const combined = `Recommended Gemstone: ${selected.gem}. Zodiac Sign: ${selected.sign}. Zodiac Date Range: ${selected.range}. Why Recommended: ${selected.why}. Key Benefits: ${selected.benefits}. How to Wear: ${selected.wear}. Guidance: If this gemstone is yours, build calm discipline, emotional balance, and intentional routines. Wear it with respect, keep your thoughts clean, and avoid negative habits, impulsive decisions, and emotional chaos.`;
      const result = await translateText(combined, "hi");
      setTranslated((p) => ({ ...p, [selected.sign]: result }));
      setTranslating(false);
      setHindi(true);
    } else {
      setHindi(false);
    }
  }

  return (
    <div className="fade-in page-shell">
      <div className="page-header">
        <div className="premium-pill">Deep Gemstone Portal</div>
        <h1 className="page-title">Find Your Gemstone by Birth Date</h1>
        <p className="page-subtitle">
          Your gemstone should be identified by your birth date first. Enter your date of birth below to instantly find your zodiac sign, recommended gemstone, and a premium realistic 3D crystal presentation.
        </p>
      </div>

      {/* Input + Button — completely separate from results */}
      <div className="content-panel" style={{ maxWidth: "860px", margin: "0 auto 1.5rem" }}>
        <label className="section-card-title" style={{ fontSize: "1rem" }}>Enter Your Birth Date</label>
        <input
          className="premium-input"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        {error && (
          <p style={{ color: "#fca5a5", fontSize: "0.9rem", marginBottom: "0.75rem" }}>{error}</p>
        )}
        <div style={{ textAlign: "center" }}>
          <button
            className="hero-btn-primary"
            onClick={handleReveal}
            disabled={!birthDate}
          >
            💎 Reveal My Gemstone
          </button>
        </div>
        <p className="helper-text" style={{ textAlign: "center", marginTop: "0.5rem" }}>
          We will detect your zodiac sign and show your recommended gemstone.
        </p>
      </div>

      {/* Results — only renders after button click, never affected by input changes */}
      {selected && (
        <div className="lux-card gem-card ultra-gem-card gemstone-focus-card">
          <div className="gem-header">
            <div className="premium-pill">Detected Zodiac: {selected.sign}</div>
            <div className="premium-pill">Date Range: {selected.range}</div>
            <div className="gem-title" style={{ color: selected.color }}>{selected.gem}</div>
          </div>

          <div className="gemstone-main-layout">
            <div>
              <Gemstone3DViewer color={selected.color} shape={selected.shape} />
              <div className="gem-legend-row">
                <span className="gem-dot" style={{ background: selected.color }}></span>
                <span className="gem-legend-text">Interactive 3D {selected.gem} Preview • drag to rotate</span>
              </div>
            </div>

            <div className="gemstone-detail-stack">
              {!hindi ? (
                <>
                  <div className="gem-detail-card"><strong style={{ color: "#f5c76f" }}>Recommended Gemstone:</strong> {selected.gem}</div>
                  <div className="gem-detail-card"><strong style={{ color: "#c4b5fd" }}>Why Recommended:</strong> {selected.why}</div>
                  <div className="gem-detail-card"><strong style={{ color: "#67e8f9" }}>Key Benefits:</strong> {selected.benefits}</div>
                  <div className="gem-detail-card"><strong style={{ color: "#f9a8d4" }}>How to Wear:</strong> {selected.wear}</div>
                  <div className="gem-guidance-box">
                    <div className="gem-guidance-title">✨ Personalized Gemstone Guidance</div>
                    <p className="section-card-copy" style={{ color: "#e9d5ff", fontSize: "1.04rem", lineHeight: 1.9 }}>
                      If {selected.gem} is your gemstone, focus on clean habits, emotional discipline, and consistent intention. Wear it respectfully, set a weekly intention while using it, and observe how your mood, confidence, and focus change. Avoid impulsive reactions, negativity, and wearing it casually without mindful purpose.
                    </p>
                  </div>
                </>
              ) : (
                <div className="gem-guidance-box">
                  <div className="gem-guidance-title">✨ हिंदी अनुवाद</div>
                  <p className="section-card-copy" style={{ color: "#f3e8ff", fontSize: "1.06rem", lineHeight: 1.95 }}>
                    {translating ? "अनुवाद किया जा रहा है..." : (translated[selected.sign] || "अनुवाद उपलब्ध नहीं है।")}
                  </p>
                </div>
              )}
            </div>
          </div>

          <PremiumActionBar
            text={`Zodiac ${selected.sign}. Recommended gemstone ${selected.gem}. ${selected.why}. ${selected.benefits}. ${selected.wear}`}
            onToggleHindi={handleToggleHindi}
            hindi={hindi}
            shareTitle={`${selected.sign} Gemstone Reading`}
          />
        </div>
      )}

      {!selected && (
        <div className="content-panel" style={{ textAlign: "center" }}>
          <div className="shimmer-anim" style={{ fontSize: "3rem" }}>💎</div>
          <p className="section-card-copy">Enter your birth date and click Reveal My Gemstone to begin.</p>
        </div>
      )}
    </div>
  );
}
