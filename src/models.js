const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { env } = require("./config");

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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    env.jwtSecret,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = {
  User: mongoose.model("User", UserSchema),
  Url: mongoose.model("Url", UrlSchema),
};
