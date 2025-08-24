const express = require("express");
const router = express.Router();

const {
  createUrl,
  listUrls,
  getUrlByCode,
} = require("../controllers/url.controller");

// Create new short URL
router.post("/urls", createUrl);

// Get all URLs
router.get("/urls", listUrls);

// Get single URL by shortCode
router.get("/urls/:shortCode", getUrlByCode);

module.exports = router;
