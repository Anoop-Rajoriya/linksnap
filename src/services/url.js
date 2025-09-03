const { formatUrl, generateUniqueCode, isValidCode } = require("../utils");
const { Url } = require("../models");
const { env } = require("../configs");

const createUrlService = async (url) => {
  const formatedUrl = formatUrl(url);
  if (!formatedUrl) {
    throw new Error("Invalid url");
  }

  const exists = await Url.exists({ url: formatedUrl });

  if (exists) {
    throw new Error("URL already in database");
  }

  const code = await generateUniqueCode();
  const newUrl = await Url.create({
    url: formatedUrl,
    code,
  });

  if (!newUrl) {
    throw new Error("Failed to create short url");
  }

  return { message: "Short url created successful", data: newUrl };
};

const urlRedirectService = async (code) => {
  if (!isValidCode(code)) {
    throw new Error("Invalide short url");
  }

  const url = await Url.findOneAndUpdate(
    { code },
    {
      $push: {
        clicks: new Date(),
      },
    }
  );

  if (!url) {
    throw new Error("Short url not found");
  }

  return url.url;
};

const getUrlsService = async () => {
  const urls = await Url.aggregate([
    {
      $project: {
        url: 1,
        code: 1,
        clicks: {
          $size: "$clicks",
        },
        createdAt: 1,
        shortUrl: { $concat: [`${env.baseUrl}/r/`, "$code"] },
      },
    },
  ]);

  return {
    message: urls.length ? "Urls found" : "Urls not found",
    data: urls,
  };
};

const getUrlsAnalyticsService = async () => {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const urlsAnalytics = await Url.aggregate([
    {
      $unwind: {
        path: "$clicks",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: null,
        totalClicks: { $sum: 1 },
        dailyClicks: {
          $sum: {
            $cond: [{ $gte: ["$clicks", oneDayAgo] }, 1, 0],
          },
        },
        weeklyClicks: {
          $sum: {
            $cond: [{ $gte: ["$clicks", oneWeekAgo] }, 1, 0],
          },
        },
        urls: { $addToSet: "$_id" },
      },
    },
    {
      $project: {
        _id: 0,
        totalClicks: 1,
        dailyClicks: 1,
        weeklyClicks: 1,
        totalUrls: { $size: "$urls" },
      },
    },
  ]);

  return { message: "not implemented", data: urlsAnalytics[0] };
};

module.exports = {
  createUrlService,
  urlRedirectService,
  getUrlsService,
  getUrlsAnalyticsService,
};
