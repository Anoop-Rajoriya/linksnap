const express = require("express");
const app = express();
const path = require("path");
const root = path.dirname(__dirname);

const {
  renderHome,
  createShortUrl,
  handleUrlRedirect,
} = require("./controllers/web");
const handleError = require("./middlewares/handleError");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(root, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(root, "views"));

// Routes
app.get("/", renderHome);

app.post("/shorten", createShortUrl);

app.get("/r/:code", handleUrlRedirect);

// Errors
app.use(handleError);

module.exports = app;
