require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || "mongodb+srv://anooprajoriya9827:YvgOnOJrYpXcPYtY@linksnapcluster.jf05m0r.mongodb.net/?retryWrites=true&w=majority&appName=LinkSnapCluster",
  jwtSecret: process.env.JWT_SECRET || "f5d9c6c905bd40d9b85c",
  jwtExpire: process.env.JWT_EXPIRE || "7d",
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  sessionSecret: process.env.SESSION_SECRET || "d92b8e06b1a04e34b3f8",
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV || "development",
};
