const express = require("express");
const router = express.Router();
const { createShortUrl } = require("../controllers/url");

router.post("/urls/", createShortUrl);

module.exports = router;
