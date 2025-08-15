const express = require("express");
const app = express();

// body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ejs setup
app.set("view engine", "ejs");
const path = require("path");
const viewsPath = path.join(path.dirname(__dirname), "views");
app.set("views", viewsPath);

// public routes
const publicRoutes = require("./routes/public");
app.use(publicRoutes);

// api routes
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

module.exports = app;
