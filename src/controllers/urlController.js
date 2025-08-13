const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { createShortUrl, handleRedirect } = require("../services/urlService");

const createUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(400, "URL is required.");
  }

  const shortUrl = await createShortUrl(url);

  const jsonResponse = new ApiResponse(201, shortUrl.message, shortUrl.data);

  return res.status(201).json(jsonResponse);
});
const redirectToUrl = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const redirectUrl = handleRedirect(shortCode);

  res.redirect(301, redirectToUrl);
});

module.exports = {
  createUrl,
  redirectToUrl,
};
