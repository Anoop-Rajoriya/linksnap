const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const config = require("./config/config");
const connectDB = require("./config/database");

const app = express();

connectDB();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Logging
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// Body Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, "../public")));

// Session Configuration
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: config.mongoUri,
      collectionName: "sessions",
    }),
    cookie: {
      secure: config.nodeEnv === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Flash Messages
app.use(flash());

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Global Variables for Views
app.use((req, res, next) => {
  res.locals.siteName = "LinkSnap";
  res.locals.baseUrl = config.baseUrl;
  res.locals.user = req.session.user || null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Basic Route For Testing
app.get("/", (req, res) => {
  res.send(
    "<h1>LinkSnap Server Running!</h1><p>Ready to build your URL shortener!</p>"
  );
});

// Error Handler
app.use((error, req, res, next) => {
  console.error("Error:", error.message);
  res.status(error.status || 500);
  res.send(`<h1>Something went wrong!</h1><p>${error.message}</p>`);
});

module.exports = app;
