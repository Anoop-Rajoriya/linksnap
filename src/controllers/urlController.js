const { asyncHandler, ApiError, ApiResponse } = require("../utils/helpers");
const { isApiRequest, isValidUrl, isSafeUrl } = require("../utils/validators");
const { generateShortUrl } = require("../services/urlService");
const { formateUrl } = require("../utils/shortCodeGenerator");

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
    res.status(200).json(jsonResponse);
  } else {
    res.render("pages/home", { ...urlData });
  }
});

const redirectToOriginalUrl = asyncHandler(async (req, res) => {});

module.exports = { createShortUrl, redirectToOriginalUrl };
