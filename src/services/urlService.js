const UrlModel = require("../models/Url");
const { ApiError } = require("../utils/helpers");
const env = require("../config/environment");

const fetchUrls = async (params) => {
  const urls = [];

  if (params.clientId) {
    const urls = await UrlModel.findMany({ clientId });
  } else if (params.user) {
    const urls = await UrlModel.findMany({ _id: user._id });
  }

  return urls.map((url) => ({
    _id: url._id,
    title: url.title,
    shortUrl: `${env.baseUrl}/${url.shortCode}`,
    expiresAt: url.expiresAt,
  }));
};

module.exports = { fetchUrls };
