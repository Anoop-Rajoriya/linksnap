const { asyncHandler } = require("../utils/helper");
const {
  getUrlsService,
  createUrlService,
  redirectUrlService,
  getUrlDetailsService,
} = require("../services/url.service");

const renderHomePage = asyncHandler(async (req, res) => {
  const pageResponse = {
    pageTitle: "LinkSnap - Home",
    route: "Home",
    routes: [],
    data: {
      success: req.query.success,
      error: req.query.error,
      urls: null,
    },
  };

  try {
    const { data } = await getUrlsService();
    pageResponse.data.urls = data;
  } catch (error) {
    console.error("Error in renderHomePage(): ", error);
    pageResponse.data.error = error.message;
  }

  return res.render("pages/index", pageResponse);
});

const renderDetailPage = asyncHandler(async (req, res) => {
  const { shortCode } = req.params || {};
  const pageResponse = {
    pageTitle: "LinkSnap - URL Details",
    route: "URL",
    routes: [],
    data: {
      error: req.query.error,
      url: null,
    },
  };

  try {
    if (!shortCode || !shortCode.trim()) {
      throw new Error("Shortcode required");
    }

    const { data } = await getUrlDetailsService(shortCode);
    pageResponse.data.url = data;
  } catch (error) {
    pageResponse.error = error.message;
  }

  res.render("pages/urlDetails", pageResponse);
});

const handleUrlShorten = asyncHandler(async (req, res) => {
  const { url } = req.body || {};

  try {
    if (!url || !url.trim()) {
      throw new Error("URL required");
    }
    const { message } = await createUrlService(url);

    if (message) {
      return res.redirect(301, "/?success=" + encodeURIComponent(message));
    } else {
      return res.redirect(301, "/");
    }
  } catch (error) {
    console.error("Error in handleUrlShorten(): ", error.message);
    return res.redirect(301, "/?error=" + encodeURIComponent(error.message));
  }
});

const handleRedirect = asyncHandler(async (req, res) => {
  const { shortCode } = req.params || {};

  try {
    if (!shortCode || !shortCode.trim()) {
      throw new Error("ShortCode required");
    }

    const originalUrl = await redirectUrlService(shortCode.trim(), {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      referrer: req.get("Referer"),
    });

    return res.redirect(302, originalUrl);
  } catch (error) {
    console.log("Error in handeRedirect(): ", error);
    return res.send("<h1>invalid short urls</h1>");
  }
});

const test = asyncHandler(async (req, res) => {
  const pageData = {
    pageTitle: "LinkSnap - Home",
    route: "Home",
    routes: [],
    data: {},
  };

  res.render("pages/index", pageData);
});

module.exports = {
  renderHomePage,
  renderDetailPage,
  handleUrlShorten,
  handleRedirect,
  test,
};
