const { asyncHandler } = require("../utils");

const renderHome = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log(user);
  const routes = user
    ? [
        { path: "/dashboard", name: "Dashboard" },
        { path: "/logout", name: "Logout" },
      ]
    : [
        { path: "/login", name: "Login" },
        { path: "/register", name: "Register" },
      ];
  const messages = {
    error: req.query.error,
    success: req.query.success,
  };
  res.render("index", { routes, messages });
});

const renderDashboard = asyncHandler(async (req, res) => {
  res.render("dashboard", { routes: [], messages: null, data: null });
});

const renderLogin = asyncHandler(async (req, res) => {
  const messages = {
    error: req.query.error,
  };
  res.render("login", { messages });
});

const renderRegister = asyncHandler(async (req, res) => {
  const messages = {
    error: req.query.error,
  };
  res.render("register", { messages });
});

module.exports = {
  renderHome,
  renderDashboard,
  renderLogin,
  renderRegister,
};
