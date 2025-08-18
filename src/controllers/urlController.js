const { asyncHandler, ApiError, ApiResponse } = require("../utils/helpers");
const {
  isApiRequest,
  isValidUrl,
  isSafeUrl,
  isValidShortCode,
} = require("../utils/validators");
const { formateUrl } = require("../utils/shortCodeGenerator");
const {
  generateShortUrl,
  getUrlByShortCode,
  getUrlStatsByShortCode,
} = require("../services/urlService");

const createShortUrl = asyncHandler(async (req, res) => {
  const { url, title, description } = req.body || {};
  if (!url || !url.trim()) {
    throw new ApiError(400, "URl is required");
  }

  const formatedUrl = formateUrl(url);
  if (!isValidUrl(formatedUrl)) {
    throw new ApiError(400, "Invalid URL");
  }
  if (!isSafeUrl(formatedUrl)) {
    throw new ApiError(400, "Malicious URL not allowed");
  }

  const urlData = await generateShortUrl({
    url: formatedUrl,
    title,
    description,
  });

  if (!urlData) {
    throw new ApiError(500, "Failed to generate short url");
  }

  if (isApiRequest(req)) {
    const jsonResponse = new ApiResponse(
      200,
      urlData.message || "Short url generated",
      urlData.data
    );
    return res.status(200).json(jsonResponse);
  } else {
    return res.render("pages/home", { ...urlData });
  }
});

const redirectToOriginalUrl = asyncHandler(async (req, res) => {
  const shortCode = req.params.shortCode;
  if (!shortCode) {
    throw new ApiError(400, "Short Code required");
  }

  if (!isValidShortCode(shortCode)) {
    throw new ApiError(400, "Invalid short code");
  }

  const originalUrl = await getUrlByShortCode(shortCode);

  return res.redirect(301, originalUrl);
});

const getUrlStats = asyncHandler(async (req, res) => {
  const shortCode = req.params.shortCode;

  if (!isValidShortCode(shortCode)) {
    throw new ApiError("Invalid short code");
  }

  const urlStats = await getUrlStatsByShortCode(shortCode);

  if (isApiRequest(req)) {
    const response = new ApiResponse(200, "URL stats found", urlStats);
    return res.status(200).json(response);
  } else {
    return res.render("pages/urlStats", urlStats);
  }
});

module.exports = { createShortUrl, redirectToOriginalUrl, getUrlStats };
