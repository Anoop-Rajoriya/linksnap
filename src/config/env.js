require("dotenv").config();

module.exports = {
  port: Number(process.env.PORT) || 5001,
  baseUrl: process.env.BASE_URL || "http://localhost:5001",
  env: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI,
  appname: process.env.APPNAME || "LinkSnap",
};
