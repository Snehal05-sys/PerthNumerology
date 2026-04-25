const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["tarot", "numerology"],
      required: true,
    },
    // Tarot-specific fields
    cards: {
      type: [String],
      default: undefined,
    },
    // Numerology-specific fields
    name: {
      type: String,
      default: undefined,
    },
    lifePath: {
      type: mongoose.Schema.Types.Mixed,
      default: undefined,
    },
    destinyNumber: {
      type: mongoose.Schema.Types.Mixed,
      default: undefined,
    },
    soulUrgeNumber: {
      type: mongoose.Schema.Types.Mixed,
      default: undefined,
    },
    dob: {
      type: String,
      default: undefined,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reading", readingSchema);
