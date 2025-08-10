const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(path.dirname(__dirname), "views"));

const staticRoutes = require("./routes/staticRoutes");
const urlRoutes = require("./routes/urlRoutes");

app.use("/", staticRoutes);
app.use("/api/link", urlRoutes);

module.exports = app;
