const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// Common & Essential middlewares
// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies parsing middleware
app.use(cookieParser());

// Static files
app.use(express.static("public"));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(path.dirname(__dirname), "views"));

// Service routes
const router = require("./routes");
app.use(router);

// Error Handler
const { error, notFound } = require("./middlewares/error.middleware");
app.use(error);
app.use(notFound);

module.exports = app;
