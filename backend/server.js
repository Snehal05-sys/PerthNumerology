require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const historyRoutes = require("./routes/history");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://perth-numerology.vercel.app"
  ],
  credentials: true,
}));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Perth Numerology API is running ✦" });
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

// ── Connect to MongoDB and start server ────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✦ Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`✦ Perth Numerology API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("✦ MongoDB connection failed:", err.message);
    process.exit(1);
  });
