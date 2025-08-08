const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 4,
      maxLength: 10,
    },
    originalUrl: {
      type: String,
      required: [true, "Original URL is required"],
      trim: true,
    },
    customAlias: {
      type: String,
      trim: true,
      sparse: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    lastAccessed: {
      type: Date,
      default: null,
    },
    tags: [{ type: String, trim: true }],
    description: {
      type: String,
      trim: true,
      maxLength: 500,
    },
  },
  { timestamps: true }
);

// Indexes for better performance
urlSchema.index({ shortCode: 1 });
urlSchema.index({ userId: 1, createdAt: -1 });
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

urlSchema.methods.isExpired = function () {
  return this.expiresAt && this.expiresAt < new Date();
};

module.exports = mongoose.model("Url", urlSchema);
