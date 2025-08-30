const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const UrlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    code: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    clicks: [
      {
        timestamps: Date,
        ip: String,
        userAgent: String,
        referrer: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model("User", UserSchema),
  Url: mongoose.model("Url", UrlSchema),
};
