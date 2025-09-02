require("dotenv").config();

const env = {
  port: process.env.PORT,
  baseUrl: process.env.BASEURL,
  dbUri: process.env.DBURI,
};

const connectDB = () => {};

module.exports = { env, connectDB };
