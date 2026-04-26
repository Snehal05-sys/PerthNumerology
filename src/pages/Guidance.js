import { useMemo, useState } from "react";
import { GUIDANCE_MESSAGES } from "../data/numerologyData";
import PremiumActionBar from "../components/PremiumActionBar";
import { translateText } from "../utils/translateUtils";

export default function Guidance({ history = [] }) {
  const [question, setQuestion] = useState("");
  const [guidance, setGuidance] = useState("");
  const [loading, setLoading] = useState(false);
  const [hindi, setHindi] = useState(false);
  const [translated, setTranslated] = useState("");
  const [translating, setTranslating] = useState(false);

  const recentContext = useMemo(() => history[0], [history]);

  function buildGuidance() {
    const base = GUIDANCE_MESSAGES[Math.floor(Math.random() * GUIDANCE_MESSAGES.length)];
    const context = recentContext
      ? recentContext.type === "tarot"
        ? ` Your recent tarot energy suggests themes around ${recentContext.cards?.join(", ")}. Move slowly, observe patterns, and avoid impulsive reactions.`
        : ` Your recent numerology pattern highlights Life Path ${recentContext.lifePath}. Build daily structure, choose aligned habits, and avoid inconsistency.`
      : " If you have not saved a recent reading yet, start with Tarot or Numerology to receive more contextual spiritual coaching.";
    return `${base}${context} For today, focus on emotional clarity, stronger boundaries, and intentional action. Avoid rushing decisions, over-giving, or ignoring your intuition. Create one small ritual today—journaling, breathwork, or silence—to align your next step with your deeper truth.`;
  }

  function getGuidance() {
    if (!question.trim()) return;
    setLoading(true);
    setGuidance("");
    setHindi(false);
    setTranslated("");
    setTimeout(() => {
      setGuidance(buildGuidance());
      setLoading(false);
    }, 1200);
  }

  async function handleToggleHindi() {
    if (!guidance) return;
    if (!hindi) {
      setTranslating(true);
      const result = await translateText(guidance, "hi");
      setTranslated(result);
      setTranslating(false);
      setHindi(true);
    } else {
      setHindi(false);
    }
  }

  return (
    <div className="fade-in page-shell">
      <div className="page-header">
        <div className="premium-pill">Premium Coaching Insight</div>
        <h1 className="page-title">Guidance Portal</h1>
        <p className="page-subtitle">Ask for clarity, receive longer-form spiritual coaching, and use your recent saved readings as contextual guidance when available.</p>
      </div>

      <div className="content-panel">
        <label className="field-label">What is your question for the cosmos?</label>
        <textarea className="premium-textarea" rows={5} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about love, career, decisions, healing, timing, boundaries, or your current energy..." />
        <div className="tool-row" style={{ marginTop: "1rem" }}>
          <button className="hero-btn-primary" onClick={getGuidance} disabled={loading || !question.trim()}>{loading ? "🌀 Channeling..." : "✨ Receive Guidance"}</button>
          <button className="mini-btn" onClick={handleToggleHindi} disabled={!guidance || translating}>{translating ? "Translating..." : (hindi ? "English" : "Translate to Hindi")}</button>
        </div>
      </div>

      {loading && <div className="content-panel" style={{ textAlign: "center" }}><div className="shimmer-anim" style={{ fontSize: "2.8rem" }}>🔮</div><p className="section-card-copy">Channelling premium guidance for you...</p></div>}

      {guidance && !loading && (
        <div className="content-panel">
          <h2 className="section-heading">Your Guidance</h2>
          <div className="gem-guidance-box">
            <div className="gem-guidance-title">{hindi ? "✨ हिंदी अनुवाद" : "✨ Personalized Guidance"}</div>
            <p className="section-card-copy" style={{ fontSize: "1.08rem", lineHeight: 1.95, color: "#e9d5ff" }}>
              {hindi ? (translated || "अनुवाद उपलब्ध नहीं है।") : guidance}
            </p>
          </div>
          <PremiumActionBar text={guidance} onToggleHindi={handleToggleHindi} hindi={hindi} />
        </div>
      )}
    </div>
  );
}
