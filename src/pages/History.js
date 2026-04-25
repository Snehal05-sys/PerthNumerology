import { apiDeleteReading, apiClearHistory } from "../utils/api";

// ── Reading History Page ───────────────────────────────────────────────────

export default function History({ user, history, setHistory, setPage }) {
  if (!user) {
    return (
      <div className="fade-in" style={{ maxWidth: "700px", margin: "0 auto", paddingTop: "3rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "2rem", background: "linear-gradient(135deg, #c4b5fd, #f9a8d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.5rem" }}>
          📜 Reading History
        </h2>
        <p style={{ color: "#9ca3af", marginBottom: "3rem", fontStyle: "italic" }}>Your cosmic journey awaits</p>
        <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🔐</div>
        <p style={{ color: "#9ca3af", marginBottom: "1.5rem" }}>Please log in to view and save your reading history.</p>
        <button
          className="glow-btn"
          onClick={() => setPage("auth")}
          style={{ padding: "0.85rem 2.5rem", borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", fontWeight: 600, background: "linear-gradient(135deg, #7C3AED, #DB2777)", color: "#fff", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}
        >
          Login / Register
        </button>
      </div>
    );
  }

  async function handleDelete(id) {
    try {
      await apiDeleteReading(id);
      setHistory((prev) => prev.filter((h) => h._id !== id));
    } catch (err) {
      alert("Failed to delete reading: " + err.message);
    }
  }

  async function handleClearAll() {
    if (!window.confirm("Clear all reading history? This cannot be undone.")) return;
    try {
      await apiClearHistory();
      setHistory([]);
    } catch (err) {
      alert("Failed to clear history: " + err.message);
    }
  }

  return (
    <div className="fade-in" style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "3rem" }}>
      <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "2rem", textAlign: "center", background: "linear-gradient(135deg, #c4b5fd, #f9a8d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.5rem" }}>
        📜 Reading History
      </h2>
      <p style={{ textAlign: "center", color: "#9ca3af", marginBottom: "2.5rem", fontStyle: "italic" }}>
        Welcome back, {user.name || user.email}
      </p>

      {history.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#9ca3af" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📭</div>
          <p style={{ fontStyle: "italic" }}>No readings yet. Start with a Tarot or Numerology reading!</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <button className="glow-btn" onClick={() => setPage("tarot")} style={{ padding: "0.65rem 1.5rem", borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.9rem", fontWeight: 600, background: "linear-gradient(135deg, #7C3AED, #DB2777)", color: "#fff" }}>
              🃏 Tarot Reading
            </button>
            <button onClick={() => setPage("numerology")} style={{ padding: "0.65rem 1.5rem", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "0.9rem", fontWeight: 600, background: "rgba(139,92,246,0.15)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.4)" }}>
              🔢 Numerology
            </button>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <>
          {/* Stats */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Total Readings", value: history.length, icon: "📊" },
              { label: "Tarot Readings", value: history.filter((h) => h.type === "tarot").length, icon: "🃏" },
              { label: "Numerology", value: history.filter((h) => h.type === "numerology").length, icon: "🔢" },
            ].map((stat, i) => (
              <div key={i} style={{ flex: 1, minWidth: "120px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{stat.icon}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#c4b5fd" }}>{stat.value}</div>
                <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Clear All button */}
          <div style={{ textAlign: "right", marginBottom: "1rem" }}>
            <button
              onClick={handleClearAll}
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5", padding: "0.45rem 1.1rem", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem" }}
            >
              🗑 Clear All
            </button>
          </div>

          {/* Entries */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {history.map((entry, i) => (
              <div key={entry._id || i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "12px", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ fontSize: "1.8rem" }}>{entry.type === "tarot" ? "🃏" : "🔢"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#c4b5fd", fontWeight: 600, marginBottom: "0.2rem" }}>
                    {entry.type === "tarot" ? "Tarot Reading" : `Numerology — ${entry.name}`}
                  </div>
                  <div style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
                    {entry.type === "tarot"
                      ? (entry.cards || []).join(" · ")
                      : `Life Path: ${entry.lifePath}`}
                  </div>
                </div>
                <div style={{ color: "#6b7280", fontSize: "0.8rem", whiteSpace: "nowrap" }}>{entry.date}</div>
                <button
                  onClick={() => handleDelete(entry._id)}
                  style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "1.1rem", padding: "0.2rem 0.4rem", borderRadius: "6px" }}
                  title="Delete this reading"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
