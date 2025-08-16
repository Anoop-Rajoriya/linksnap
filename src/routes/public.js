const express = require("express");
const router = express.Router();
const {
  redirectToOriginalUrl,
  getUrlAnalytics,
} = require("../controllers/urlController");

// router.get("/", (req, res) => {
//   res.render("pages/home", {
//     links: [],
//     formError: null,
//   });
// });

router.get("/:shortCode", redirectToOriginalUrl);
router.get("/stats/:shortCode", getUrlAnalytics);

module.exports = router;
