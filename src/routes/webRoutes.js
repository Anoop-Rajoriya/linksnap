const express = require("express");
const router = express.Router();

const {
  renderHomePage,
  renderDetailPage,
  handleUrlShorten,
  handleRedirect,
  test,
} = require("../controllers/web.controller");

// URLs
router.get("/", renderHomePage);
router.get("/details/:shortCode", renderDetailPage);

router.post("/shorten", handleUrlShorten);

router.get("/r/:shortCode", handleRedirect);

module.exports = router;
