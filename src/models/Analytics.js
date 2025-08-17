const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: true,
    },
    clickedAt: {
      type: Date,
      default: Date.now(),
    },
    ipAddress: String,
    userAgent: String,
    referrer: String,
    country: String,
    city: String,
    browser: String,
    os: String,
    device: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", AnalyticsSchema);
