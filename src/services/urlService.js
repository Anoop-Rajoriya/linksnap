const UrlModel = require("../models/Url");
const env = require("../config/environment");
const { generateShortCode } = require("../utils/shortCodeGenerator");

const generateShortUrl = async ({ url, title, description }) => {
  const existingUrlDocument = await UrlModel.findOne({ originalUrl: url });

  if (existingUrlDocument) {
    return {
      message: "Url already exist",
      data: {
        originalUrl: existingUrlDocument.originalUrl,
        shortUrl: `${env.baseUrl}/${existingUrlDocument.shortCode}`,
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
      shortUrl: `${env.baseUrl}/${urlDocument.shortCode}`,
      title: urlDocument.title,
      description: urlDocument.description,
      isActive: urlDocument.isActive,
      expiresAt: urlDocument.expiresAt,
    },
  };
};

module.exports = { generateShortUrl };
