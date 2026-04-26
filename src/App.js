import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Starfield from "./components/Starfield";
import FloatingOrbs from "./components/FloatingOrbs";
import Home from "./pages/Home";
import Tarot from "./pages/Tarot";
import Numerology from "./pages/Numerology";
import Guidance from "./pages/Guidance";
import History from "./pages/History";
import Auth from "./pages/Auth";
import Gemstones from "./pages/Gemstones";
import MantrasRemedies from "./pages/MantrasRemedies";
import { apiGetMe, apiGetHistory, apiSaveReading, apiLogout } from "./utils/api";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);

  // On mount: try to restore session from stored JWT token
  useEffect(() => {
    const token = localStorage.getItem("perth_token");
    if (token) {
      apiGetMe()
        .then((u) => {
          setUser(u);
          return apiGetHistory();
        })
        .then((h) => setHistory(h || []))
        .catch(() => {
          localStorage.removeItem("perth_token");
        })
        .finally(() => setLoadingUser(false));
    } else {
      setLoadingUser(false);
    }
  }, []);

  async function handleSaveHistory(entry) {
    if (!user) return;
    try {
      const saved = await apiSaveReading(entry);
      setHistory((prev) => [saved, ...prev].slice(0, 30));
    } catch (err) {
      console.error("Failed to save reading:", err.message);
    }
  }

  function handleLogout() {
    apiLogout();
    setUser(null);
    setHistory([]);
    setPage("home");
  }

  async function handleSetUser(newUser) {
    setUser(newUser);
    if (newUser) {
      try {
        const h = await apiGetHistory();
        setHistory(h || []);
      } catch (err) {
        console.error("Failed to load history:", err.message);
      }
    }
  }

  if (loadingUser) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0118 0%, #0d0221 40%, #060f1e 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c4b5fd", fontFamily: "'Cinzel Decorative', serif", fontSize: "1.2rem" }}>
        ✦ Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0118 0%, #0d0221 40%, #060f1e 100%)", fontFamily: "'Crimson Text', Georgia, serif", color: "#e2d5f8", position: "relative", overflowX: "hidden" }}>
      <Starfield />
      <FloatingOrbs />
      <Navbar page={page} setPage={setPage} user={user} onLogout={handleLogout} />

      <main style={{ position: "relative", zIndex: 1, padding: "0 1.5rem 4rem" }}>
        {page === "home" && <Home setPage={setPage} />}
        {page === "tarot" && <Tarot user={user} onSaveHistory={handleSaveHistory} />}
        {page === "numerology" && <Numerology user={user} onSaveHistory={handleSaveHistory} />}
        {page === "guidance" && <Guidance history={history} />}
        {page === "history" && <History user={user} history={history} setHistory={setHistory} setPage={setPage} />}
        {page === "gemstones" && <Gemstones />}
        {page === "mantras" && <MantrasRemedies />}
        {page === "auth" && <Auth user={user} setUser={handleSetUser} setPage={setPage} history={history} onLogout={handleLogout} />}
      </main>

      <footer style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem 1rem", borderTop: "1px solid rgba(139,92,246,0.2)", color: "#6b7280", fontSize: "0.85rem" }}>
        <div style={{ fontFamily: "'Cinzel Decorative', serif", color: "#a78bfa", marginBottom: "0.5rem" }}>✦ Perth Numerology ✦</div>
        <p> Crafted for seekers · Bringing ancient cosmic wisdom to the modern world . 2026</p>
        <div style={{ marginTop: "0.9rem", color: "#94a3b8", lineHeight: 1.8 }}>
          <div style={{ fontWeight: 700, color: "#c4b5fd" }}>Creators — Students of DR MPS College of Business Studies</div>
          <div>1. Snehal Devkar &nbsp; 2. Hardik Kansal &nbsp; 3. Shreya Singh &nbsp; 4.Harshit Chauhan </div>
        </div>
      </footer>
    </div>
  );
}
