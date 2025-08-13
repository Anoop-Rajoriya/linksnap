const express = require("express");
const router = express.Router();
const { createUrl } = require("../controllers/urlController");

router.post("/", createUrl);

module.exports = router;
