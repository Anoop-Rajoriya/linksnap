const { asyncHandler } = require("../utils");
const { createUrlService, urlRedirectService } = require("../services/url");

const createShortUrl = asyncHandler(async (req, res) => {
  const { url } = req.body || {};

  try {
    if (!url || !url.trim()) throw new Error("Url required");

    const { message } = await createUrlService(url);
    res.redirect(302, `/?success=${encodeURIComponent(message)}`);
  } catch (error) {
    res.redirect(302, `/?error=${encodeURIComponent(error.message)}`);
  }
});

const redirectUrl = asyncHandler(async (req, res) => {
  const { code } = req.params || {};

  try {
    if (!code || !code.trim()) {
      throw new Error("Invalid short url");
    }

    const url = await urlRedirectService(code);
    res.redirect(302, url);
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createShortUrl,
  redirectUrl,
};
