const express = require("express");
const router = express.Router();
const { redirectToUrl } = require("../controllers/urlController");

router.get("/", (req, res) => {
  res.render("pages/home", {
    links: [],
    formError: null,
  });
});

router.get("/:shortCode", redirectToUrl);

module.exports = router;
