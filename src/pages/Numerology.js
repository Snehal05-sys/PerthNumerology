import { useState } from "react";
import {
  calculateLifePath,
  calculateDestinyNumber,
  calculateSoulUrge,
  reduceToSingleDigit,
} from "../utils/numerologyUtils";
import AnimatedNumerologyCard from "../components/AnimatedNumerologyCard";

const NUMBER_PROFILES = {
  1: { theme: "Leader", strengths: "initiative, courage, independence", caution: "ego, impatience, dominance", advice: "build discipline and finish what you start" },
  2: { theme: "Peacemaker", strengths: "sensitivity, harmony, diplomacy", caution: "overthinking, people-pleasing", advice: "create boundaries and trust your voice" },
  3: { theme: "Communicator", strengths: "creativity, charisma, expression", caution: "distraction, inconsistency", advice: "focus your energy and commit to routines" },
  4: { theme: "Builder", strengths: "structure, loyalty, endurance", caution: "rigidity, fear of change", advice: "balance order with flexibility" },
  5: { theme: "Explorer", strengths: "adaptability, curiosity, magnetism", caution: "impulsiveness, instability", advice: "slow down before major choices" },
  6: { theme: "Nurturer", strengths: "care, family, beauty, responsibility", caution: "over-giving, control", advice: "care for yourself as deeply as others" },
  7: { theme: "Mystic", strengths: "intuition, analysis, spiritual depth", caution: "withdrawal, skepticism", advice: "combine faith with grounded action" },
  8: { theme: "Achiever", strengths: "ambition, money management, authority", caution: "intensity, work obsession", advice: "lead ethically and pace your goals" },
  9: { theme: "Humanitarian", strengths: "wisdom, compassion, completion", caution: "emotional heaviness, attachment", advice: "release the past and serve with balance" },
  11: { theme: "Master Intuitive", strengths: "vision, inspiration, intuition", caution: "anxiety, nervous sensitivity", advice: "protect your energy and trust inner messages" },
  22: { theme: "Master Builder", strengths: "large vision, systems, execution", caution: "pressure, perfectionism", advice: "take giant visions step by step" },
  33: { theme: "Master Healer", strengths: "compassion, teaching, uplifting others", caution: "emotional burden, over-sacrifice", advice: "heal without losing yourself" },
};

function calculatePersonalityNumber(name = "") {
  const consonants = (name.toUpperCase().match(/[BCDFGHJKLMNPQRSTVWXYZ]/g) || []).join("");
  if (!consonants) return 0;
  let sum = 0;
  for (const ch of consonants) {
    const code = ch.charCodeAt(0) - 64;
    sum += reduceToSingleDigit(code);
  }
  return reduceToSingleDigit(sum);
}

function calculateBirthNumber(birthDate) {
  if (!birthDate) return 0;
  const day = new Date(birthDate).getDate() || Number(String(birthDate).split("-")[2]) || 0;
  return reduceToSingleDigit(day);
}

function buildMeaning(type, number, fullName) {
  const profile = NUMBER_PROFILES[number] || NUMBER_PROFILES[reduceToSingleDigit(number)] || NUMBER_PROFILES[1];
  const firstName = fullName.trim().split(" ")[0] || "You";
  return `${firstName}, your ${type} is ${number} — the ${profile.theme}. This vibration highlights ${profile.strengths}. Your main caution is ${profile.caution}. Best growth advice: ${profile.advice}.`;
}

export default function Numerology({ user, onSaveHistory }) {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [hindi, setHindi] = useState(false);

  const isValidName = /^[A-Za-z]+(?:[ -][A-Za-z]+)+$/.test(fullName.trim());

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValidName) {
      setError("Please enter your legal name only. Numbers and symbols are not allowed.");
      return;
    }
    if (!birthDate) {
      setError("Please select your birth date.");
      return;
    }

    const res = {
      lifePath: calculateLifePath(birthDate),
      destiny: calculateDestinyNumber(fullName),
      soulUrge: calculateSoulUrge(fullName),
      personality: calculatePersonalityNumber(fullName),
      birthNumber: calculateBirthNumber(birthDate),
    };

    setResult({
      ...res,
      meanings: {
        lifePath: buildMeaning("Life Path Number", res.lifePath, fullName),
        destiny: buildMeaning("Destiny Number", res.destiny, fullName),
        soulUrge: buildMeaning("Soul Urge Number", res.soulUrge, fullName),
        personality: buildMeaning("Personality Number", res.personality, fullName),
        birthNumber: buildMeaning("Birth Number", res.birthNumber, fullName),
      },
    });
    setError("");

    if (user && onSaveHistory) {
      onSaveHistory({
        type: "numerology",
        name: fullName,
        dob: birthDate,
        date: new Date().toLocaleDateString(),
        lifePath: res.lifePath,
        destinyNumber: res.destiny,
        soulUrgeNumber: res.soulUrge,
      });
    }
  }

  return (
    <div className="fade-in page-shell">
      <div className="page-header">
        <div className="premium-pill">Commercial Master Numerology</div>
        <h1 className="page-title">Premium Numerology Reading</h1>
        <p className="page-subtitle">
        Every number in your life carries a hidden vibration — a cosmic signature that shapes who you are and where you are destined to go. Enter your name and birth date. Let the numbers reveal your cosmic path!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="content-panel" style={{ maxWidth: "760px", margin: "0 auto 1.5rem" }}>
        <div className="two-col">
          <div>
            <label className="section-card-title" style={{ fontSize: "1rem" }}>Legal Full Name</label>
            <input className="premium-input" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your legal full name" />
            <p className="helper-text">Please enter your legal name only. Numbers and symbols are not allowed.</p>
          </div>
          <div>
            <label className="section-card-title" style={{ fontSize: "1rem" }}>Date of Birth</label>
            <input className="premium-input" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            <p className="helper-text">Used to calculate your Life Path and Birth vibrations.</p>
          </div>
        </div>

        {error && <div className="error-box">{error}</div>}

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button className="hero-btn-primary" type="submit" disabled={!isValidName || !birthDate}>✨ Reveal My Numbers</button>
        </div>
      </form>

      {result && (
        <div className="num-master-grid">
          <AnimatedNumerologyCard title="Life Path Number" number={result.lifePath} meaning={result.meanings.lifePath} hindi={hindi} setHindi={setHindi} />
          <AnimatedNumerologyCard title="Destiny Number" number={result.destiny} meaning={result.meanings.destiny} hindi={hindi} setHindi={setHindi} />
          <AnimatedNumerologyCard title="Soul Urge Number" number={result.soulUrge} meaning={result.meanings.soulUrge} hindi={hindi} setHindi={setHindi} />
          <AnimatedNumerologyCard title="Personality Number" number={result.personality} meaning={result.meanings.personality} hindi={hindi} setHindi={setHindi} />
          <AnimatedNumerologyCard title="Birth Number" number={result.birthNumber} meaning={result.meanings.birthNumber} hindi={hindi} setHindi={setHindi} />
        </div>
      )}
    </div>
  );
}
