const { asyncHandler } = require("../utils");
const { getUrlsService, getUrlsAnalyticsService } = require("../services/url");

const renderHomePage = asyncHandler(async (req, res) => {
  const user = req.user || true;
  const messages = {
    success: req.query.success,
    error: req.query.error,
  };
  res.render("index", { title: "Home", user, messages });
});

const renderDashboardPage = asyncHandler(async (req, res) => {
  const user = req.user || { name: "Test Name" };
  const { data: urls } = await getUrlsService();
  const { data: urlsAnalytics } = await getUrlsAnalyticsService();

  res.render("dashboard", { title: "Dashboard", user, urls, urlsAnalytics });
});

const renderLoginPage = asyncHandler(async (req, res) => {
  const user = req.user || null;
  const messages = {
    success: req.query.success,
    error: req.query.error,
  };

  res.render("login", { title: "Login", user, messages });
});

const renderRegisterPage = asyncHandler(async (req, res) => {
  const user = req.user || null;
  const messages = {
    success: req.query.success,
    error: req.query.error,
  };

  res.render("register", { title: "Register", user, messages });
});

module.exports = {
  renderHomePage,
  renderDashboardPage,
  renderLoginPage,
  renderRegisterPage,
};
