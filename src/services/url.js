const { formatUrl, generateUniqueCode } = require("../utils");
const { Url } = require("../models");

const createShortUrlService = async (url) => {
  const formatedUrl = formatUrl(url);
  console.log(formatedUrl);
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

module.exports = { createShortUrlService };
