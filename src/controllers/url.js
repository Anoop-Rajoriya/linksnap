const { asyncHandler, ApiResponse, ApiError } = require("../utils/helper");
const { generateShortUrl, getOriginalUrl } = require("../services/url");

const createShortUrl = asyncHandler(async (req, res) => {
  const userRequest = req.body || {};

  const urlData = await generateShortUrl(userRequest);

  const response = new ApiResponse(
    200,
    urlData.message || "Short URL generated.",
    urlData.response
  );

  res.status(200).json(response);
});

const redirectToOriginalUrl = asyncHandler(async (req, res) => {
  const shortCode = req.params.shortCode;
  const originalUrl = await getOriginalUrl(shortCode);
  res.redirect(301, originalUrl);
});

const getUrlAnalytics = asyncHandler(async (req, res) => {});
const deleteShortUrl = asyncHandler(async (req, res) => {});
const updateShortUrl = asyncHandler(async (req, res) => {});

module.exports = {
  createShortUrl,
  redirectToOriginalUrl,
  getUrlAnalytics,
  deleteShortUrl,
  updateShortUrl,
};
