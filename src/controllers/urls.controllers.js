const { asyncHandler, ApiError, ApiResponse } = require("../utils/helpers");

const getHome = asyncHandler(async (req, res) => {});
const createShortUrl = asyncHandler(async (req, res) => {});
const getAnalyticsByShortCode = asyncHandler(async (req, res) => {});
const getAllAnalytics = asyncHandler(async (req, res) => {});
const redirectToUrl = asyncHandler(async (req, res) => {});

module.exports = {
  getHome,
  createShortUrl,
  getAnalyticsByShortCode,
  getAllAnalytics,
  redirectToUrl,
};
