const NAV_PAGES = [
  { id: "home", label: "Home" },
  { id: "tarot", label: "Tarot" },
  { id: "numerology", label: "Numerology" },
  { id: "gemstones", label: "Gemstones" },
  { id: "mantras", label: "Mantras & Remedies" },
  { id: "guidance", label: "Guidance" },
  { id: "history", label: "History" },
];

export default function Navbar({ page, setPage, user, onLogout }) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(18px)",
        background: "rgba(6, 8, 20, 0.72)",
        borderBottom: "1px solid rgba(139,92,246,0.16)",
        padding: "0.9rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", cursor: "pointer" }} onClick={() => setPage("home")}>
          <img
            src="/logo.svg"
            alt="Perth Numerology"
            style={{ width: "44px", height: "44px" }}
          />
          <div>
            <div
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "1.15rem",
                fontWeight: 700,
                background: "linear-gradient(135deg,#f8fafc,#e9d5ff,#fde68a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.04em",
              }}
            >
              Perth Numerology
            </div>
            <div style={{ color: "#94a3b8", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Premium Spiritual Commerce
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.35rem", alignItems: "center", flexWrap: "wrap" }}>
          {NAV_PAGES.map((p) => (
            <button
              key={p.id}
              className="nav-btn"
              onClick={() => setPage(p.id)}
              style={{
                background: page === p.id ? "rgba(139,92,246,0.20)" : "rgba(255,255,255,0.02)",
                border: page === p.id ? "1px solid rgba(139,92,246,0.42)" : "1px solid rgba(255,255,255,0.04)",
                color: page === p.id ? "#ddd6fe" : "#cbd5e1",
                padding: "0.5rem 0.9rem",
                borderRadius: "999px",
                cursor: "pointer",
                fontSize: "0.88rem",
                fontFamily: "inherit",
                transition: "all 0.25s",
              }}
            >
              {p.label}
            </button>
          ))}

          <button
            className="nav-btn"
            onClick={() => setPage("auth")}
            style={{
              background: page === "auth" ? "rgba(236,72,153,0.18)" : "rgba(255,255,255,0.02)",
              border: page === "auth" ? "1px solid rgba(236,72,153,0.42)" : "1px solid rgba(255,255,255,0.04)",
              color: page === "auth" ? "#fbcfe8" : "#cbd5e1",
              padding: "0.5rem 0.9rem",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "0.88rem",
              fontFamily: "inherit",
              transition: "all 0.25s",
            }}
          >
            {user ? `👤 ${user.name || "Profile"}` : "🔐 Login"}
          </button>

          {user && (
            <button
              onClick={onLogout}
              className="nav-btn"
              style={{
                background: "rgba(248,113,113,0.10)",
                border: "1px solid rgba(248,113,113,0.28)",
                color: "#fecaca",
                padding: "0.5rem 0.9rem",
                borderRadius: "999px",
                cursor: "pointer",
                fontSize: "0.88rem",
                fontFamily: "inherit",
                transition: "all 0.25s",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
