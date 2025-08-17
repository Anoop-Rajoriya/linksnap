const express = require("express");
const router = express.Router();

const { createShortUrl } = require("../../controllers/urlController");

router.route("/").post(createShortUrl);

module.exports = router;
