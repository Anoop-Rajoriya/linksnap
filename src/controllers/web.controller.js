const { asyncHandler, WebResponse } = require("../utils/helper");

const renderHome = asyncHandler(async (req, res) => {
  const user = true;
  const webRes = new WebResponse({
    routes: user
      ? [{ path: "/urls", route: "My Urls" }]
      : [{ path: "/login", route: "Login" }],
    messages: { success: req.query.success, error: req.query.error },
  });

  res.render("pages/index", webRes);
});
const renderUrls = asyncHandler(async (req, res) => {
  const webRes = new WebResponse({
    data: [
      {
        originalUrl: "http://google.com",
        shortUrl: "http://localhost:5000/api/r/jfls4kfj",
        isActive: true,
        createdAt: new Date().toISOString(),
        expirsAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        shortCode: "jfskekdk",
        totalClicks: 3044,
      },
      {
        originalUrl: "http://google.com",
        shortUrl: "http://localhost:5000/api/r/jfls4kfj",
        isActive: false,
        createdAt: new Date().toISOString(),
        expirsAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        shortCode: "jfskekdk",
        totalClicks: 3044,
      },
    ],
  });

  res.render("pages/urls", webRes);
});
const renderRegister = asyncHandler(async (req, res) => {
  const webRes = new WebResponse({
    routes: [{ path: "/", route: "Home" }],
    messages: { success: req.query.success, error: req.query.error },
  });

  res.render("pages/register", webRes);
});
const renderLogin = asyncHandler(async (req, res) => {
  const webRes = new WebResponse({
    routes: [{ path: "/", route: "Home" }],
    messages: { success: req.query.success, error: req.query.error },
  });

  res.render("pages/login", webRes);
});

module.exports = {
  renderHome,
  renderUrls,
  renderRegister,
  renderLogin,
};
