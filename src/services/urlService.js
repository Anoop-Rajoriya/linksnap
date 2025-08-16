const UrlModel = require("../models/UrlModel");
const {
  isValidUrl,
  isSafeUrl,
  isValidShortCode,
} = require("../utils/validators");
const {
  generateShortCode,
  formateUrl,
} = require("../utils/shortCodeGenerator");

const generateShortUrl = async ({ url, title, description }) => {
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

  // Save to DB
  const urlEntry = await UrlModel.create(newUrlData);
  return { message: "URL generated successfully.", response: urlEntry };
};

const getOriginalUrl = async (shortCode) => {
  if (!isValidShortCode(shortCode)) {
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

const calculateUrlAnalytics = async (shortCode) => {
  // valid short code
  if (!isValidShortCode(shortCode)) {
    throw new Error("Invalide short code formate.");
  }

  // find entry
  const urlEntry = await UrlModel.findOne({ shortCode });
  if (!urlEntry) {
    throw new Error("Url Entry not found.");
  }

  // prepare analytics
  const analytics = {
    shortCode: urlEntry.shortCode,
    clickCount: urlEntry.clickCount,
    expiresAt: urlEntry.expiresAt,
    isActive: urlEntry.isActive,
    createdAt: urlEntry.createdAt,
    updatedAt: urlEntry.updatedAt,
  };

  return { message: "Url Entry founded successfully.", response: analytics };
};
const deleteShortUrl = () => {};
const updateShortUrl = () => {};

module.exports = {
  generateShortUrl,
  getOriginalUrl,
  calculateUrlAnalytics,
  deleteShortUrl,
  updateShortUrl,
};
