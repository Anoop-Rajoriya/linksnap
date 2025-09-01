require("dotenv").config();
const mongoose = require("mongoose");

const env = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
  baseUrl: process.env.BASE_UR || "http://localhost:3000",
  appName: process.env.APPNAME || "LinkSnap",
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET
};

const connectDB = () => {
  mongoose
    .connect(env.mongodbUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = { env, connectDB };
