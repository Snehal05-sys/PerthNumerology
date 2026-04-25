require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const historyRoutes = require("./routes/history");

const app = express();
const PORT = process.env.PORT || 5000;

// ── CORS ───────────────────────────────────────────────────────────────────
// Allow all Vercel preview URLs + localhost in dev
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  /\.vercel\.app$/,        // any *.vercel.app (preview & prod)
  process.env.FRONTEND_URL, // optional explicit URL from env
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. curl, Postman, mobile apps)
      if (!origin) return callback(null, true);
      const allowed = allowedOrigins.some((o) =>
        o instanceof RegExp ? o.test(origin) : o === origin
      );
      if (allowed) return callback(null, true);
      callback(new Error(`CORS: origin "${origin}" not allowed`));
    },
    credentials: true,
  })
);

app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);

// Health check — useful for Render's health-check ping & debugging
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Perth Numerology API is running ✦",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error." });
});

// ── Startup checks ─────────────────────────────────────────────────────────
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI environment variable is not set!");
  console.error("   Set it in Render → Environment → MONGO_URI=mongodb+srv://...");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET environment variable is not set!");
  process.exit(1);
}

// ── Connect to MongoDB Atlas, then start server ────────────────────────────
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000, // fail fast if Atlas is unreachable
  })
  .then(() => {
    console.log("✦ Connected to MongoDB Atlas successfully");
    app.listen(PORT, () => {
      console.log(`✦ Perth Numerology API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("✦ MongoDB connection failed:", err.message);
    console.error("   Check your MONGO_URI and that 0.0.0.0/0 is in Atlas Network Access.");
    process.exit(1);
  });
