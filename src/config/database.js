const env = require("./environment");
const mongoose = require("mongoose");

const connectDatabase = () => {
  return mongoose
    .connect(env.mongodbUri)
    .then((res) => {
      console.log("Database connected successfully.");
    })
    .catch((err) => {
      console.error("Database connection error:", err.message);
      process.exit(1);
    });
};

module.exports = connectDatabase;
