const { asyncHandler } = require("../utils");
const { createShortUrlService } = require("../services/url");

const renderHome = asyncHandler(async (req, res) => {
  const messages = {
    error: req.query.err,
    success: req.query.succ,
  };
  res.render("index", { messages });
});

const createShortUrl = asyncHandler(async (req, res) => {
  const { url } = req.body || {};

  try {
    const { message, data } = await createShortUrlService(url);
    res.redirect(302, `/?succ=${encodeURIComponent(message)}`);
  } catch (error) {
    res.redirect(302, `/?err=${encodeURIComponent(error.message)}`);
  }
});

module.exports = { renderHome, createShortUrl };
