const { asyncHandler, ApiError, ApiResponse } = require("../utils/helpers");
const { fetchUrls } = require("../services/urlService");

const rendreHomePage = asyncHandler(async (req, res) => {
  const clientId = req.cookies.clientId;
  const user = req.user;

  const urls = [];

  if (clientId) {
    urls = await fetchUrls({ clientId: clientId.trim() });
  } else if (user) {
    urls = await fetchUrls({ user: clientId.trim() });
  }

  res.render("pages/home", { error: null, success: null, urls });
});
const createShortUrl = asyncHandler(async (req, res) => {});
const redirectToUrl = asyncHandler(async (req, res) => {});
const renderAnalyticsPage = asyncHandler(async (req, res) => {});
const renderUrlAnalyticsPage = asyncHandler(async (req, res) => {});

module.exports = {
  rendreHomePage,
  createShortUrl,
  redirectToUrl,
  renderAnalyticsPage,
  renderUrlAnalyticsPage,
};
