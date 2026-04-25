import { useState } from "react";
import { apiLogin, apiRegister } from "../utils/api";

// ── Auth Page (Login & Register) ───────────────────────────────────────────

export default function Auth({ user, setUser, setPage, history, onLogout }) {
  const [mode, setMode]       = useState("login");
  const [form, setForm]       = useState({ name: "", email: "", password: "" });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "login") {
        if (!form.email || !form.password) {
          setError("❌ Please enter your email and password.");
          return;
        }
        const loggedUser = await apiLogin(form.email, form.password);
        setUser(loggedUser);
        setSuccess("✅ Logged in successfully!");
        setTimeout(() => setPage("home"), 1000);
      } else {
        if (!form.name || !form.email || !form.password) {
          setError("❌ Please fill in all fields.");
          return;
        }
        if (form.password.length < 6) {
          setError("❌ Password must be at least 6 characters.");
          return;
        }
        const newUser = await apiRegister(form.name, form.email, form.password);
        setUser(newUser);
        setSuccess("✅ Account created! Welcome to Perth!");
        setTimeout(() => setPage("home"), 1000);
      }
    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── Profile View (if logged in) ──────────────────────────────────────────
  if (user) {
    return (
      <div className="fade-in" style={{ maxWidth: "500px", margin: "0 auto", paddingTop: "3rem", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>👤</div>
        <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.8rem", background: "linear-gradient(135deg, #c4b5fd, #f9a8d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.5rem" }}>
          Welcome, {user.name || "Seeker"}
        </h2>
        <p style={{ color: "#9ca3af", marginBottom: "2rem" }}>{user.email}</p>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: "16px", padding: "1.5rem", textAlign: "left", marginBottom: "1.5rem" }}>
          <p style={{ color: "#c4b5fd", marginBottom: "0.6rem" }}>
            📊 Total Readings: <strong style={{ color: "#e2d5f8" }}>{history.length}</strong>
          </p>
          <p style={{ color: "#c4b5fd", marginBottom: "0.6rem" }}>
            🃏 Tarot Sessions: <strong style={{ color: "#e2d5f8" }}>{history.filter((h) => h.type === "tarot").length}</strong>
          </p>
          <p style={{ color: "#c4b5fd" }}>
            🔢 Numerology Sessions: <strong style={{ color: "#e2d5f8" }}>{history.filter((h) => h.type === "numerology").length}</strong>
          </p>
        </div>

        <button
          onClick={onLogout}
          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", padding: "0.65rem 2rem", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", transition: "all 0.2s" }}
        >
          🚪 Sign Out
        </button>
      </div>
    );
  }

  // ── Login / Register Form ────────────────────────────────────────────────
  return (
    <div className="fade-in" style={{ maxWidth: "480px", margin: "0 auto", paddingTop: "3rem" }}>
      <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "2rem", textAlign: "center", background: "linear-gradient(135deg, #c4b5fd, #f9a8d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.5rem" }}>
        {mode === "login" ? "🔐 Welcome Back" : "✨ Join Perth"}
      </h2>
      <p style={{ textAlign: "center", color: "#9ca3af", marginBottom: "2.5rem", fontStyle: "italic" }}>
        {mode === "login" ? "Sign in to access your readings" : "Create your cosmic account"}
      </p>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: "16px", padding: "2rem" }}>
        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1.25rem", color: "#fca5a5", fontSize: "0.9rem" }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1.25rem", color: "#6ee7b7", fontSize: "0.9rem" }}>
            {success}
          </div>
        )}

        {mode === "register" && (
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", marginBottom: "0.4rem", color: "#a78bfa", fontSize: "0.9rem" }}>Full Name</label>
            <input
              className="input-field"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "10px", padding: "0.75rem 1rem", color: "#e2d5f8", fontSize: "1rem", fontFamily: "inherit", width: "100%" }}
            />
          </div>
        )}

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", marginBottom: "0.4rem", color: "#a78bfa", fontSize: "0.9rem" }}>Email</label>
          <input
            className="input-field"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "10px", padding: "0.75rem 1rem", color: "#e2d5f8", fontSize: "1rem", fontFamily: "inherit", width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.4rem", color: "#a78bfa", fontSize: "0.9rem" }}>Password</label>
          <input
            className="input-field"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "10px", padding: "0.75rem 1rem", color: "#e2d5f8", fontSize: "1rem", fontFamily: "inherit", width: "100%" }}
          />
        </div>

        <button
          className="glow-btn"
          onClick={handleSubmit}
          disabled={loading}
          style={{ padding: "0.85rem", borderRadius: "10px", border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", fontSize: "1.05rem", fontWeight: 600, background: "linear-gradient(135deg, #7C3AED, #DB2777)", color: "#fff", boxShadow: "0 4px 20px rgba(124,58,237,0.4)", transition: "all 0.25s", width: "100%", marginBottom: "1rem", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "⏳ Please wait..." : mode === "login" ? "🔓 Sign In" : "✨ Create Account"}
        </button>

        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.9rem" }}>
          {mode === "login" ? "New here? " : "Already have an account? "}
          <span
            style={{ color: "#a78bfa", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setSuccess(""); }}
          >
            {mode === "login" ? "Create an account" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}
