require("dotenv").config();
const mongoose = require("mongoose");

const env = {
  port: process.env.PORT,
  baseUrl: process.env.BASEURL,
  dbUri: process.env.MONGODB_URI,
  authSecret: process.env.AUTHSECRET,
};

const connectDB = () => {
  mongoose
    .connect(env.dbUri)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.error("Failed to connect database");
      process.exit(1);
    });
};

module.exports = { env, connectDB };
