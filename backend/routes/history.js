const express = require("express");
const router = express.Router();
const Reading = require("../models/Reading");
const authMiddleware = require("../middleware/auth");

// All routes require authentication
router.use(authMiddleware);

// ── GET /api/history ───────────────────────────────────────────────────────
// Get all readings for logged-in user (latest first, max 30)
router.get("/", async (req, res) => {
  try {
    const readings = await Reading.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();

    res.json({ history: readings });
  } catch (err) {
    console.error("Get history error:", err);
    res.status(500).json({ message: "Failed to fetch history." });
  }
});

// ── POST /api/history ──────────────────────────────────────────────────────
// Save a new reading entry
router.post("/", async (req, res) => {
  try {
    const { type, cards, name, lifePath, destinyNumber, soulUrgeNumber, dob, date } = req.body;

    if (!type || !date) {
      return res.status(400).json({ message: "Reading type and date are required." });
    }

    if (type === "tarot" && (!cards || cards.length === 0)) {
      return res.status(400).json({ message: "Tarot reading requires card data." });
    }

    if (type === "numerology" && (!name || lifePath === undefined)) {
      return res.status(400).json({ message: "Numerology reading requires name and life path." });
    }

    const reading = await Reading.create({
      userId: req.user._id,
      type,
      cards: type === "tarot" ? cards : undefined,
      name: type === "numerology" ? name : undefined,
      lifePath: type === "numerology" ? lifePath : undefined,
      destinyNumber: type === "numerology" ? destinyNumber : undefined,
      soulUrgeNumber: type === "numerology" ? soulUrgeNumber : undefined,
      dob: type === "numerology" ? dob : undefined,
      date,
    });

    res.status(201).json({ message: "Reading saved!", reading });
  } catch (err) {
    console.error("Save reading error:", err);
    res.status(500).json({ message: "Failed to save reading." });
  }
});

// ── DELETE /api/history/:id ────────────────────────────────────────────────
// Delete a specific reading (must belong to user)
router.delete("/:id", async (req, res) => {
  try {
    const reading = await Reading.findOne({ _id: req.params.id, userId: req.user._id });
    if (!reading) {
      return res.status(404).json({ message: "Reading not found." });
    }

    await reading.deleteOne();
    res.json({ message: "Reading deleted." });
  } catch (err) {
    console.error("Delete reading error:", err);
    res.status(500).json({ message: "Failed to delete reading." });
  }
});

// ── DELETE /api/history ────────────────────────────────────────────────────
// Clear all readings for logged-in user
router.delete("/", async (req, res) => {
  try {
    await Reading.deleteMany({ userId: req.user._id });
    res.json({ message: "All readings cleared." });
  } catch (err) {
    console.error("Clear history error:", err);
    res.status(500).json({ message: "Failed to clear history." });
  }
});

module.exports = router;
