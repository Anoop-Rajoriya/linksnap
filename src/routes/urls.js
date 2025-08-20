const express = require("express");
const router = express.Router();
const {
  getHome,
  createShortUrl,
  getAllAnalytics,
  getAnalyticsByShortCode,
  redirectToUrl,
} = require("../controllers/urls.controllers");

// URL routes
router.route("/").get(getHome).post(createShortUrl);
router.route("/analytics").get(getAllAnalytics);
router.route("/analytics/:shortCode").get(getAnalyticsByShortCode);

// Redirect route
router.route("/:shortCode").get(redirectToUrl);

module.exports = router;
