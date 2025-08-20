const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "URL is required."],
      trim: true,
      maxlength: 200,
    },
    shortCode: {
      type: String,
      required: [true, "ShortCode is required."],
      unique: [true, "ShortCode must be unique."],
      index: true,
      trim: true,
    },
    title: {
      type: String,
      default: "No Title",
      trim: true,
      index: true,
    },
    clientId: {
      type: String,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 48 * 60 * 60 * 1000), // default 2 days expiry
    },
  },
  { timestamps: true }
);

// custom expiry
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Url", urlSchema);
