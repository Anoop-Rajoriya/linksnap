const { asyncHandler } = require("../utils");
const {
  createUrlService,
  urlRedirectService,
  getUrlsService,
  getUrlsAnalyticsService,
} = require("../services/url");

const renderHome = asyncHandler(async (req, res) => {
  const messages = {
    error: req.query.err,
    success: req.query.succ,
  };
  const { data: urls } = await getUrlsService();
  const { data: urlsAnalytics } = await getUrlsAnalyticsService();

  console.log("urls:", urls);
  console.log("analytics:", urlsAnalytics);

  res.render("index", { messages, urls, urlsAnalytics });
});

const createShortUrl = asyncHandler(async (req, res) => {
  const { url } = req.body || {};

  try {
    const { message, data } = await createUrlService(url);
    res.redirect(302, `/?succ=${encodeURIComponent(message)}`);
  } catch (error) {
    console.error(error);
    res.redirect(302, `/?err=${encodeURIComponent(error.message)}`);
  }
});

const handleUrlRedirect = asyncHandler(async (req, res) => {
  const { code } = req.params || {};

  try {
    const url = await urlRedirectService(code);
    res.redirect(302, url);
  } catch (error) {
    throw error;
  }
});

module.exports = { renderHome, createShortUrl, handleUrlRedirect };
