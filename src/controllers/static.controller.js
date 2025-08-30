const { asyncHandler } = require("../utils");

const renderHome = asyncHandler(async (req, res, next) => {});
const renderDashboard = asyncHandler(async (req, res, next) => {});
const renderLogin = asyncHandler(async (req, res, next) => {});
const renderRegister = asyncHandler(async (req, res, next) => {});

module.exports = {
  renderHome,
  renderDashboard,
  renderLogin,
  renderRegister,
};
