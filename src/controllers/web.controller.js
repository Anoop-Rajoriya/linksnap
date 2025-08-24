const { asyncHandler } = require("../utils/helper");
const {
  fetchUrls,
  generateUrl,
  captureAnalytics,
  fetchUrlsAnalytics,
  fetchUrlDetails,
} = require("../services/url.service");

const renderHome = asyncHandler(async (req, res) => {
  try {
    const urls = await fetchUrls();

    return res.status(200).render("pages/index", {
      title: "LinkSnap | Home",
      urls: urls,
      success: req.query.success,
      error: req.query.error,
    });
  } catch (error) {
    console.error("error in renderHome():", error);
    return res.status(404).render("pages/index", {
      title: "LinkSnap | Home",
      urls: null,
      success: null,
      error: "Unable to load urls stats",
    });
  }
});

const createUrl = asyncHandler(async (req, res) => {
  const { url } = req.body || {};
  try {
    const generatedUrl = await generateUrl(url);
    const success = encodeURIComponent(generatedUrl.message);
    return res.redirect(301, "/?success=" + success);
  } catch (error) {
    console.error("error in existedUrl():", error);
    const err = encodeURIComponent(
      error.message || "failed to generate short url"
    );
    return res.redirect(301, "/?error=" + err);
  }
});

const redirectUrl = asyncHandler(async (req, res) => {
  try {
    const captured = await captureAnalytics(req);

    return res.redirect(301, captured.originalUrl);
  } catch (error) {
    console.error("error in redirectUrl():", error);
    return res.render("pages/error", {
      errorMessage: error.message,
      errorDetailes: error,
    });
  }
});

const renderAnalyticsList = asyncHandler(async (req, res) => {
  try {
    const urlsAnalytics = await fetchUrlsAnalytics();

    return res.render("pages/urlsAnalytics", {
      title: "LinkSnap | Urls",
      urls: urlsAnalytics,
      success: req.query.success,
      error: req.query.error,
    });
  } catch (error) {
    console.error("error in renderAnalyticsList():", error);
    return res.render("pages/urlsAnalytics", {
      title: "LinukSnap | Urls",
      urls: null,
      success: null,
      error: error.message,
    });
  }
});

const renderAnalyticsDetail = asyncHandler(async (req, res) => {
  try {
    const { shortCode } = req.params || {};
    const urlDetails = await fetchUrlDetails(shortCode);
    console.log(urlDetails)
    return res.render("pages/urlDetails", {
      title: "LinkSnap | Url",
      url: urlDetails,
      success: req.query.success,
      error: req.query.error,
    });
  } catch (error) {
    console.error("error in renderAnalyticsDetail():", error);
    return res.render("pages/urlDetails", {
      title: "LinkSnap | Url",
      url: null,
      success: null,
      error: error.message,
    });
  }
});

module.exports = {
  renderHome,
  createUrl,
  redirectUrl,
  renderAnalyticsList,
  renderAnalyticsDetail,
};
