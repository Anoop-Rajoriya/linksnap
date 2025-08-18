const express = require("express");
const router = express.Router();
const { getUrlStats } = require("../../controllers/urlController");

router.route("/stats/:shortCode").get(getUrlStats);

module.exports = router;
