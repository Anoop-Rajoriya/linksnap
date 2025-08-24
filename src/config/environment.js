require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
  baseUrl: process.env.BASE_UR || "http://localhost:3000",
  appName: process.env.APPNAME || "LinkSnap",
  mongodbUri: process.env.MONGODB_URI,
};
