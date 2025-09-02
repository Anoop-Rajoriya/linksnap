const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    clicks: [Date],
  },
  { timestamps: true }
);

module.exports = { Url: mongoose.model("Url", UrlSchema) };
