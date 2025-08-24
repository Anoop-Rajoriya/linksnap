const env = require("./environment");
const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(env.mongodbUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
};
