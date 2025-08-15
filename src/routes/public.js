const express = require("express");
const router = express.Router();
const { redirectToOriginalUrl } = require("../controllers/url");

// router.get("/", (req, res) => {
//   res.render("pages/home", {
//     links: [],
//     formError: null,
//   });
// });

router.get("/:shortCode", redirectToOriginalUrl);

module.exports = router;
