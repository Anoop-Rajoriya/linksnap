const { asyncHandler } = require("../utils/helper");
const {
  getUrlsService,
  createUrlService,
  redirectUrlService,
} = require("../services/url.service");

// const test = (req, res) => {
//   const { page } = req.params;
//   console.log("page", page);
//   const pageData = {
//     title: "Home",
//     routes: [],
//     urls: [
//       {
//         shortUrl: "http://localhost:3000/lfjls",
//         isActive: false,
//         originalUrl: "googel.com",
//         totalClicks: 4,
//         createdAt: new Date().toISOString(),
//         expiresAt: new Date().toISOString(),
//         shortCode: "lfjls",
//       },
//     ],
//     error: "hello this test error",
//     success: null,
//   };

//   res.render("pages/index", pageData);
// };

const renderHomePage = asyncHandler(async (req, res) => {
  const pageResponse = {
    route: "Home",
    routes: [],
    urls: [],
    success: req.query.success,
    error: req.query.error,
  };

  try {
    const { data } = await getUrlsService();
    pageResponse.urls = data;
  } catch (error) {
    console.error("Error in renderHomePage(): ", error);
    pageResponse.error = error.message;
  }

  return res.render("pages/index", pageResponse);
});

const renderDetailPage = asyncHandler((req, res) => {});

const handleUrlShorten = asyncHandler(async (req, res) => {
  const { url } = req.body || {};

  try {
    if (!url && !url.trim()) {
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
    if (!shortCode && !shortCode.trim()) {
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

module.exports = {
  renderHomePage,
  renderDetailPage,
  handleUrlShorten,
  handleRedirect,
};
