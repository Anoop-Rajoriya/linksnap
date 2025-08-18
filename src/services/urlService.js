const UrlModel = require("../models/Url");
const env = require("../config/environment");
const { generateShortCode } = require("../utils/shortCodeGenerator");
const { formateISODateString } = require("../utils/helpers");

const generateShortUrl = async ({ url, title, description }) => {
  const existingUrlDocument = await UrlModel.findOne({ originalUrl: url });

  if (existingUrlDocument) {
    return {
      message: "Url already exist",
      data: {
        originalUrl: existingUrlDocument.originalUrl,
        shortUrl: `${env.baseUrl}/r/${existingUrlDocument.shortCode}`,
        title: existingUrlDocument.title,
        description: existingUrlDocument.description,
        isActive: existingUrlDocument.isActive,
        expiresAt: existingUrlDocument.expiresAt,
      },
    };
  }

  const shortCode = await generateShortCode(UrlModel);
  const urlData = { originalUrl: url, shortCode };
  if (title && title.trim()) {
    urlData.title = title;
  }
  if (description && description.trim()) {
    urlData.description = description;
  }
  const urlDocument = await UrlModel.create(urlData);
  if (!urlDocument) {
    throw new Error("Failed to create url entry in database");
  }

  return {
    message: "short url generated",
    data: {
      originalUrl: urlDocument.originalUrl,
      shortUrl: `${env.baseUrl}/r/${urlDocument.shortCode}`,
      title: urlDocument.title,
      description: urlDocument.description,
      isActive: urlDocument.isActive,
      expiresAt: urlDocument.expiresAt,
    },
  };
};

const getUrlByShortCode = async (shortCode) => {
  const urlEntry = await UrlModel.findOne({ shortCode });
  if (!urlEntry) {
    throw new Error("URL not found");
  }

  if (!urlEntry.isActive) {
    throw new Error("URL is inactive");
  }

  urlEntry.clickCount += 1;
  await urlEntry.save();
  return urlEntry.originalUrl;
};

const getUrlStatsByShortCode = async (shortCode) => {
  const urlEntry = await UrlModel.findOne({ shortCode });

  if (!urlEntry) {
    throw new Error("URL not found");
  }

  const urlStats = {
    originalUrl: urlEntry.originalUrl,
    shortUrl: `${env.baseUrl}/r/${urlEntry.shortCode}`,
    expiryDate: formateISODateString(urlEntry.expiresAt),
    isActive: urlEntry.isActive,
    visitors: urlEntry.clickCount,
    createdAt: formateISODateString(urlEntry.createdAt),
  };

  return urlStats;
};

module.exports = {
  generateShortUrl,
  getUrlByShortCode,
  getUrlStatsByShortCode,
};
