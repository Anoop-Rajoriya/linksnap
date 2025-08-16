const UrlModel = require("../models/UrlModel");
const {
  isValidUrl,
  isSafeUrl,
  isValidShortCode,
  isValidISODate,
} = require("../utils/validators");
const {
  generateShortCode,
  formateUrl,
} = require("../utils/shortCodeGenerator");

const generateShortUrl = async (body) => {
  try {
    const { url, title = "", description = "", expiry = "" } = body;

    if (!url) {
      throw new Error("URL is required.");
    }

    // Format URL first
    const formattedUrl = formateUrl(url);

    // Validate URL after formatting
    if (!isValidUrl(formattedUrl)) {
      throw new Error("Invalid URL format.");
    }
    if (!isSafeUrl(formattedUrl)) {
      throw new Error("Malicious URL not allowed.");
    }

    // Check if URL already exists
    const existingUrl = await UrlModel.findOne({ originalUrl: formattedUrl });
    if (existingUrl) {
      return { message: "URL already exists.", response: existingUrl };
    }

    // Generate short code
    const shortCode = await generateShortCode(UrlModel);

    // Prepare data object
    const newUrlData = {
      originalUrl: formattedUrl,
      shortCode,
    };
    if (title.trim()) newUrlData.title = title.trim();
    if (description.trim()) newUrlData.description = description.trim();

    // Handle expiry if provided
    if (expiry) {
      if (!isValidISODate(expiry)) {
        throw new Error("Invalid date format, only ISO format supported.");
      }
      newUrlData.expiresAt = expiry;
    }

    // Save to DB
    const urlEntry = await UrlModel.create(newUrlData);
    return { message: "URL generated successfully.", response: urlEntry };
  } catch (error) {
    throw error; // preserve stack trace
  }
};

const getOriginalUrl = async (shortCode) => {
  if (!shortCode || !isValidShortCode(shortCode)) {
    throw new Error("Invalid short code format.");
  }

  const urlEntry = await UrlModel.findOne({ shortCode });
  if (!urlEntry) {
    throw new Error("Short URL may be expired, removed, or invalid.");
  }

  if (!urlEntry.isActive) {
    throw new Error("This shor URL is inactive.");
  }

  await UrlModel.updateOne({ shortCode }, { $inc: { clickCount: 1 } });

  return urlEntry.originalUrl;
};

const getUrlAnalytics = () => {};
const deleteShortUrl = () => {};
const updateShortUrl = () => {};

module.exports = {
  generateShortUrl,
  getOriginalUrl,
  getUrlAnalytics,
  deleteShortUrl,
  updateShortUrl,
};
