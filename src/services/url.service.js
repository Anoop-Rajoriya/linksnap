const env = require("../config/environment");
const Url = require("../models/url");
const { formatUrl, generateCode, validateCode } = require("../utils/urlHelper");

const fetchUrls = async () => {
  const urls = await Url.aggregate([
    {
      $match: { isActive: true },
    },
    {
      $project: {
        _id: 1,
        shortUrl: {
          $concat: [`${env.baseUrl}/`, "$shortCode"],
        },
        clicks: "$totalClicks",
        shortCode: 1,
      },
    },
  ]);

  return urls;
};

const generateUrl = async (url) => {
  const formatedUrl = formatUrl(url);

  if (!formatedUrl) {
    throw new Error("invalid url formate");
  }

  const existedUrl = await Url.exists({ originalUrl: formatedUrl });

  if (existedUrl) {
    throw new Error("url already exist");
  }

  const shortCode = await generateCode(Url);

  const createdUrl = await Url.create({ originalUrl: formatedUrl, shortCode });

  if (!createdUrl) {
    throw new Error("failed to generate short url");
  }

  return {
    message: "url successfully generated",
    data: { ...createdUrl, shortUrl: `${env.base}/${createdUrl.shortCode}` },
  };
};

const captureAnalytics = async (req) => {
  const { shortCode } = req.params;

  if (!validateCode(shortCode)) {
    throw new Error("invalid short url");
  }

  const urlEntry = await Url.findOneAndUpdate(
    { shortCode, isActive: true },
    {
      $inc: { totalClicks: 1 },
      $push: {
        clicks: {
          timestamp: Date.now(),
          ip: req.ip,
          userAgent: req.get("User-Agent"),
          referrer: req.get("Referer"),
        },
      },
    },
    { new: true }
  );

  if (!urlEntry) {
    throw new Error("short URL not found or expired");
  }

  return urlEntry;
};

const fetchUrlsAnalytics = async () => {
  const urlsAnalytics = await Url.aggregate([
    {
      $project: {
        _id: 1,
        isActive: 1,
        originalUrl: 1,
        totalClicks: 1,
        createdAt: 1,
        expiresAt: 1,
        shortCode: 1,
        shortUrl: {
          $concat: [`${env.baseUrl}/`, "$shortCode"],
        },
      },
    },
  ]);

  return urlsAnalytics;
};

const fetchUrlDetails = async (shortCode) => {
  if (!validateCode(shortCode)) {
    throw new Error("invalid short url");
  }

  const url = await Url.findOne({ shortCode });

  if (!url) {
    throw new Error("url not found");
  }

  url.shortUrl = `${env.baseUrl}/${url.shortCode}`;

  return url;
};

module.exports = {
  fetchUrls,
  generateUrl,
  captureAnalytics,
  fetchUrlsAnalytics,
  fetchUrlDetails,
};
