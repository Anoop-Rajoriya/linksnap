const express = require("express");
const path = require("path");

const app = express();

// Common & Essential middlewares
// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(path.dirname(__dirname), "views"));

// Static routes
const static = require("./routes/static.router");
app.set(static);

// Url routes
const url = require("./routes/static.router");
app.set("/url", url);

// User routes
const user = require("./routes/static.router");
app.set("/user", user);

// Error Handler
const { error, notFound } = require("./middlewares/errorMiddleware");
app.use(error);
app.use(notFound);

module.exports = app;
