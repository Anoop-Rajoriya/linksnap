const express = require("express");
const router = express.Router();

const {
  renderHomePage,
  renderDetailPage,
  handleUrlShorten,
  handleRedirect,
} = require("../controllers/web.controller");

// URLs
router.get("/", renderHomePage);
router.get("/detail/:shortCode", renderDetailPage);

router.post("/shorten", handleUrlShorten);

router.get("/:shortCode", handleRedirect);

module.exports = router;
