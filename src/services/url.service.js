const env = require("../config/environment");
const Url = require("../models/url");
const { formatUrl, generateCode, validateCode } = require("../utils/urlHelper");
const { formateDate } = require("../utils/helper");

const getUrlsService = async () => {
  // const urls = await Url.find({}, { clicks: 0 });
  let urls = await Url.aggregate([
    {
      $project: {
        _id: 0,
        shortUrl: {
          $concat: [`${env.baseUrl}/r/`, "$shortCode"],
        },
        originalUrl: 1,
        shortCode: 1,
        createdAt: 1,
        expiresAt: 1,
      },
    },
  ]);

  if (!urls) {
    return { message: "No URLs found", data: null };
  }

  return { message: "URLs found", data: urls };
};

const createUrlService = async (url) => {
  const formatedUrl = formatUrl(url);
  if (!formatedUrl) {
    throw new Error("Invalid URL formate");
  }

  const existingUrlEntry = await Url.exists({ originalUrl: formatedUrl });

  if (existingUrlEntry) {
    throw new Error("URL already exist");
  }

  const shortCode = await generateCode(Url);

  const newUrlEntry = await Url.create({ originalUrl: formatedUrl, shortCode });

  if (!newUrlEntry) {
    throw new Error("Failed to create URL");
  }

  return {
    message: "URL successfully created",
    data: newUrlEntry,
  };
};

const redirectUrlService = async (shortCode, client) => {
  if (!validateCode(shortCode)) {
    throw new Error("Invalid shortcode");
  }

  const urlEntry = await Url.findOneAndUpdate(
    { shortCode, isActive: true },
    {
      $inc: { totalClicks: 1 },
      $push: {
        clicks: {
          timestamp: Date.now(),
          ip: client.ip,
          userAgent: client.userAgent,
          referrer: client.referrer,
        },
      },
    },
    { new: true }
  );

  if (!urlEntry) {
    throw new Error("Shortcode not found or expired");
  }

  return urlEntry.originalUrl;
};

const getUrlDetailsService = async (shortCode) => {
  if (!validateCode(shortCode)) {
    throw new Error("Invalid shortcode");
  }

  const urlEntry = await Url.aggregate([
    {
      $match: {
        shortCode,
      },
    },
    {
      $project: {
        _id: 1,
        shortUrl: {
          $concat: [`${env.baseUrl}/r/`, "$shortCode"],
        },
        shortCode: 1,
        originalUrl: 1,
        createdAt: 1,
        expiresAt: 1,
        isActive: 1,
        totalClicks: 1,
        uniqueIps: {
          $size: { $setUnion: ["$clicks.ip", []] },
        },
        lastClick: {
          $max: "$clicks.timestamp",
        },
        firstClick: {
          $min: "$clicks.timestamp",
        },
      },
    },
  ]);

  if (!urlEntry[0]) {
    throw new Error("Failed to find URL details");
  }

  return {
    message: "Url analytics found successfully",
    data: urlEntry[0],
  };
};

module.exports = {
  getUrlsService,
  createUrlService,
  redirectUrlService,
  getUrlDetailsService,
};
