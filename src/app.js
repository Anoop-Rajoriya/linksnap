const express = require("express");
const cookiesParser = require("cookie-parser");
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

const { loginUser, registerUser, logoutUser } = require("./controllers/user");

const { handleError, notFound } = require("./middlewares/handleError");
const {
  verifyToken,
  userOnly,
  publicOnly,
} = require("./middlewares/handleAuth");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(root, "public")));
app.use(cookiesParser());

app.set("view engine", "ejs");
app.set("views", path.join(root, "views"));

// Routes
app.use(verifyToken);

app.get("/", renderHomePage);
app.get("/dashboard", userOnly, renderDashboardPage);
app.get("/login", publicOnly, renderLoginPage);
app.get("/register", publicOnly, renderRegisterPage);

app.post("/shorten", userOnly, createShortUrl);
app.post("/login", publicOnly, loginUser);
app.post("/register", publicOnly, registerUser);
app.get("/logout", userOnly, logoutUser);

app.get("/r/:code", redirectUrl);

// Errors
app.use(handleError);
app.use(notFound);

module.exports = app;
