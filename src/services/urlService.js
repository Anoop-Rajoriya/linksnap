const { isValidUrl, isSafeUrl } = require("../utils/validators");
const generateUniqueShortCode = require("../utils/shortCodeGenerator");
const UrlModel = require("../models/UrlModel");

const createShortUrl = async (url) => {
  if (!isValidUrl(url)) {
    throw new Error("URL is not valid.");
  }
  if (!isSafeUrl(url)) {
    throw new Error("URL is not safe.");
  }

  const existingUrl = await UrlModel.findOne({ originalUrl: url });

  if (existingUrl) {
    return { message: "URL already exists.", data: existingUrl };
  }

  const shortCode = await generateUniqueShortCode(UrlModel);

  const mappedUrl = await UrlModel.create({ originalUrl: url, shortCode });

  if (!mappedUrl) {
    throw new Error("URL mapping failed.");
  }

  return { message: "URL generated successfully.", data: mappedUrl };
};

const handleRedirect = async (shortCode) => {};

module.exports = { createShortUrl, handleRedirect };
