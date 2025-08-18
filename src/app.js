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

// web endpoints
const home = require("./routes/web/home");
app.use(home);

// redirect endpoint
const { redirectToOriginalUrl } = require("./controllers/urlController");
app.get("/r/:shortCode", redirectToOriginalUrl);

// api endpoints
const urls = require("./routes/api/urls");
app.use("/api/urls", urls);

module.exports = app;
