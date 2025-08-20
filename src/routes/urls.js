const express = require("express");
const router = express.Router();
const {
  rendreHomePage,
  createShortUrl,
  redirectToUrl,
  renderAnalyticsPage,
  renderUrlAnalyticsPage,
} = require("../controllers/urls.controllers");

// URL routes
router.route("/").get(rendreHomePage).post(createShortUrl);
router.route("/analytics").get(renderAnalyticsPage);
router.route("/analytics/:shortCode").get(renderUrlAnalyticsPage);

// Redirect route
router.route("/:shortCode").get(redirectToUrl);

module.exports = router;
