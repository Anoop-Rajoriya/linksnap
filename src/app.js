const express = require("express");
const app = express();
const path = require("path");
const root = path.dirname(__dirname);

const {
  renderHomePage,
  renderDashboardPage,
  renderLoginPage,
  renderRegisterPage,
} = require("./controllers/web");

const { createShortUrl, redirectUrl } = require("./controllers/url");

const { handleError, notFound } = require("./middlewares/handleError");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(root, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(root, "views"));

// Routes
app.get("/", renderHomePage);
app.get("/dashboard", renderDashboardPage);
app.get("/login", renderLoginPage);
app.get("/register", renderRegisterPage);

app.post("/shorten", createShortUrl);
app.get("/r/:code", redirectUrl);

// Errors
app.use(handleError);
app.use(notFound);

module.exports = app;
