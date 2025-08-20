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

// urls routes
const urlsRoutes = require("./routes/urls");
app.use(urlsRoutes);
// users routes
const usersRoutes = require("./routes/users");
app.use(usersRoutes);
// admin routes
const adminRoutes = require("./routes/admin");
app.use(adminRoutes);
// error handler
const handleError = require("./middleware/errorHandler")
app.use(handleError)

module.exports = app;
