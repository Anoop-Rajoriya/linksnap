const express = require("express");
const router = express.Router();

const {
  renderHome,
  renderDashboard,
  renderLogin,
  renderRegister,
} = require("./controllers/static.controller");

const { createShortUrl } = require("./controllers/urls.controller");

const {
  createUser,
  loginUser,
  logoutUser,
} = require("./controllers/user.controller");

const {
  verifyAuth,
  requireAuth,
  publicOnly,
} = require("./middlewares/auth.middleware");

router.get("/", verifyAuth, renderHome);
router.get("/dashboard", verifyAuth, requireAuth, renderDashboard);
router.get("/login", verifyAuth, publicOnly, renderLogin);
router.get("/register", verifyAuth, publicOnly, renderRegister);

router.get("/logout", verifyAuth, requireAuth, logoutUser);

router.post("/shorten", verifyAuth, requireAuth, createShortUrl);
router.post("/register", verifyAuth, publicOnly, createUser);
router.post("/login", verifyAuth, publicOnly, loginUser);

module.exports = router;
