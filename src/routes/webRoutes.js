const express = require("express");
const router = express.Router();

const {
  renderHome,
  createUrl,
  redirectUrl,
  renderAnalyticsList,
  renderAnalyticsDetail,
} = require("../controllers/web.controller");

// Home page
router.get("/", renderHome);

// Handle URL Shortening
router.post("/shorten", createUrl);

// All URLs analytics
router.get("/analytics", renderAnalyticsList);

// Analytics for a specific short code
router.get("/analytics/:shortCode", renderAnalyticsDetail);

router.get("/:shortCode", redirectUrl);

module.exports = router;
