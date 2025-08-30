const express = require("express");
const router = express.Router();

const {
  renderHome,
  renderDashboard,
  renderLogin,
  renderRegister,
} = require("../controllers/static.controller");

router.get("/", renderHome);
router.get("/dashboard", renderDashboard);
router.get("/login", renderLogin);
router.get("/register", renderRegister);

module.exports = router;
