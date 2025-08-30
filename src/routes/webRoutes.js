const express = require("express");
const router = express.Router();

const {
  renderHome,
  renderUrls,
  renderRegister,
  renderLogin,
} = require("../controllers/web.controller");

router.get("/", renderHome);
router.get("/urls", renderUrls);
router.get("/register", renderRegister);
router.get("/login", renderLogin);

module.exports = router;
