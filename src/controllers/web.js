const { asyncHandler } = require("../utils");
const { getUrlsService, getUrlsAnalyticsService } = require("../services/url");

const renderHomePage = asyncHandler(async (req, res) => {
  const user = req.user || null;
  const messages = {
    success: req.query.success,
    error: req.query.error,
  };
  const routes = user
    ? [
        { path: "/dashboard", name: "Dashboard" },
        { path: "/logout", name: "Logout" },
      ]
    : [
        { path: "/login", name: "Login" },
        { path: "/register", name: "Register" },
      ];

  res.render("index", { title: "Home", messages, routes });
});

const renderDashboardPage = asyncHandler(async (req, res) => {
  const user = req.user;
  const { data: urls } = await getUrlsService(user);
  const { data: urlsAnalytics } = await getUrlsAnalyticsService(user);
  const routes = [
    { path: "/", name: "Home" },
    { path: "/logout", name: "Logout" },
  ];

  res.render("dashboard", {
    title: "Dashboard",
    name: user.username,
    routes,
    urls,
    urlsAnalytics,
  });
});

const renderLoginPage = asyncHandler(async (req, res) => {
  const messages = {
    success: req.query.success,
    error: req.query.error,
  };
  const routes = [{ path: "/", name: "Home" }];

  res.render("login", { title: "Login", routes, messages });
});

const renderRegisterPage = asyncHandler(async (req, res) => {
  const messages = {
    success: req.query.success,
    error: req.query.error,
  };

  const routes = [{ path: "/", name: "Home" }];

  res.render("register", { title: "Register", routes, messages });
});

module.exports = {
  renderHomePage,
  renderDashboardPage,
  renderLoginPage,
  renderRegisterPage,
};
