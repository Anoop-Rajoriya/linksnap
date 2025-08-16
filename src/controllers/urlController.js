const { asyncHandler, ApiResponse, ApiError } = require("../utils/helpers");
const { generateShortUrl, getOriginalUrl } = require("../services/urlService");

const createShortUrl = asyncHandler(async (req, res) => {
  const { url, title, description } = req.body || {};

  if (!url && !url.trim()) {
    throw new ApiError(400, "URL is required.");
  }

  const urlData = await generateShortUrl({ url, title, description });

  const response = new ApiResponse(
    200,
    urlData.message || "Short URL generated.",
    urlData.response
  );

  res.status(200).json(response);
});

const redirectToOriginalUrl = asyncHandler(async (req, res) => {
  const shortCode = req.params.shortCode;
  if (!shortCode.trim()) {
    throw new ApiError(400, "Short url is required.");
  }
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
