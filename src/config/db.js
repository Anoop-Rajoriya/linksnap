const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log("database connected successfully");
  } catch (error) {
    console.error("database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
