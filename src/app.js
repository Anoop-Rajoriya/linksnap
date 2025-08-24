const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const ejs = require("ejs");

const app = express();

// Common & Essential middlewares

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false, // false for development
  })
);

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// CORS
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(path.dirname(__dirname), "public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(path.dirname(__dirname), "views"));

// pull real client IP
app.set("trust proxy", true);

// Routes
const urlRoutes = require("./routes/urlRoutes");
const webRoutes = require("./routes/webRoutes");

app.use("/api/url", urlRoutes);
app.use(webRoutes);

// Error handling middlewares
const {
  handleError,
  handlePageNotFound,
} = require("./middlewares/errorHandler");

// Error handler
app.use(handleError);

// 404 handler
app.use(handlePageNotFound);

module.exports = app;
