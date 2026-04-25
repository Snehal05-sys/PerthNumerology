import { useState } from "react";
import { TAROT_CARDS } from "../data/tarotData";
import { translateText } from "../utils/translateUtils";
import PremiumActionBar from "../components/PremiumActionBar";

function buildSummary(card) {
  return {
    summary: `This card highlights ${card.meaning.toLowerCase()} Right now, the strongest message is to stay calm, trust timing, and act with emotional clarity rather than pressure.`,
    guidance: `Your best move now is to slow down, notice patterns, and take one grounded action. Avoid rushing commitments, emotional overreaction, or making choices just to escape uncertainty.`
  };
}

export default function Tarot({ user, onSaveHistory }) {
  const [drawnCards, setDrawnCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [hindi, setHindi] = useState(false);
  const [translatedCards, setTranslatedCards] = useState({});
  const [translating, setTranslating] = useState(false);
  const positions = ["Past Energy", "Present Energy", "Future Energy"];

  function drawCards() {
    setLoading(true);
    setFlippedCards([]);
    setHindi(false);
    setTranslatedCards({});
    setTimeout(() => {
      const cards = [...TAROT_CARDS].sort(() => Math.random() - 0.5).slice(0, 3);
      setDrawnCards(cards);
      setLoading(false);
      if (user) onSaveHistory({ type: "tarot", date: new Date().toLocaleDateString(), cards: cards.map(c => c.name) });
    }, 1600);
  }

  function flipCard(index) {
    if (!flippedCards.includes(index)) setFlippedCards((p) => [...p, index]);
  }

  async function handleToggleHindi() {
    if (!hindi) {
      setTranslating(true);
      const translations = {};
      for (let i = 0; i < drawnCards.length; i++) {
        const card = drawnCards[i];
        const details = buildSummary(card);
        const full = `${positions[i]}. Card Name: ${card.name}. Energy: ${card.energy}. Core Meaning: ${card.meaning}. Reading Summary: ${details.summary}. Guidance: ${details.guidance}`;
        translations[i] = await translateText(full, "hi");
      }
      setTranslatedCards(translations);
      setTranslating(false);
      setHindi(true);
    } else {
      setHindi(false);
    }
  }

  return (
    <div className="fade-in page-shell">
      <div className="page-header">
        <div className="premium-pill">Luxury Tarot Reading</div>
        <h1 className="page-title">Tarot Card Reading</h1>
        <p className="page-subtitle">A cleaner premium reading flow with larger animated text, clearer summary + guidance, and full Hindi translation support for the whole reading.</p>
        <div className="tool-row" style={{ justifyContent: "center" }}>
          <button className="hero-btn-primary" onClick={drawCards} disabled={loading}>{loading ? "🌀 Shuffling..." : "✨ Draw My 3 Cards"}</button>
          <button className="mini-btn" onClick={handleToggleHindi} disabled={!drawnCards.length || translating}>{translating ? "Translating..." : (hindi ? "English" : "Translate to Hindi")}</button>
        </div>
      </div>

      {loading && <div className="content-panel" style={{ textAlign: "center" }}><div className="spin-anim" style={{ fontSize: "3rem" }}>✦</div><p className="section-card-copy">The deck is aligning with your energy...</p></div>}

      {drawnCards.length > 0 && !loading && (
        <div className="tarot-sequence-wrap">
          {drawnCards.map((card, i) => {
            const details = buildSummary(card);
            const speech = `${positions[i]}. ${card.name}. ${card.energy}. ${details.summary}. ${details.guidance}`;
            return (
              <div key={i} className="tarot-sequence-card">
                <div className="premium-pill">{positions[i]}</div>

                {!flippedCards.includes(i) ? (
                  <div className="tarot-card-back tarot-card-back-enhanced tarot-sequence-back" onClick={() => flipCard(i)}>
                    <div className="pulse-glow" style={{ fontSize: "4rem" }}>🌙</div>
                    <div style={{ marginTop: "1rem", color: "#ddd6fe", fontWeight: 700, fontSize: "1.2rem" }}>Tap to Reveal</div>
                  </div>
                ) : (
                  <div className="tarot-reveal-card lux-card tarot-sequence-result" style={{ animation: "tarotRevealEpic 0.9s ease-out" }}>
                    <div className="tarot-topline">
                      <div style={{ fontSize: "4rem" }}>{card.emoji}</div>
                      <div>
                        <h3 className="section-card-title tarot-card-title">{card.name}</h3>
                        <div className="tarot-energy">{card.energy}</div>
                      </div>
                    </div>

                    {!hindi ? (
                      <>
                        <div className="tarot-text-block tarot-core">
                          <div className="tarot-label tarot-label-core">🌟 Core Meaning</div>
                          <p className="tarot-body">{card.meaning}</p>
                        </div>

                        <div className="tarot-text-block tarot-summary">
                          <div className="tarot-label tarot-label-summary">🪄 Reading Summary</div>
                          <p className="tarot-body tarot-body-lg">{details.summary}</p>
                        </div>

                        <div className="tarot-text-block tarot-guidance">
                          <div className="tarot-label tarot-label-guidance">🔮 Guidance</div>
                          <p className="tarot-body tarot-body-lg">{details.guidance}</p>
                        </div>
                      </>
                    ) : (
                      <div className="gem-guidance-box">
                        <div className="gem-guidance-title">✨ हिंदी अनुवाद</div>
                        <p className="section-card-copy" style={{ fontSize: "1.08rem", lineHeight: 1.95, color: "#f3e8ff" }}>
                          {translating ? "अनुवाद किया जा रहा है..." : (translatedCards[i] || "अनुवाद उपलब्ध नहीं है।")}
                        </p>
                      </div>
                    )}

                    <PremiumActionBar
                      text={speech}
                      onToggleHindi={handleToggleHindi}
                      hindi={hindi}
                      shareTitle={`${card.name} Tarot Reading`}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button className="hero-btn-secondary" onClick={drawCards}>🔁 Draw Another Spread</button>
          </div>
        </div>
      )}
    </div>
  );
}
