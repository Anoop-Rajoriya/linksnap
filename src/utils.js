const { Url } = require("./models");
const { customAlphabet } = require("nanoid");

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const formatUrl = (input) => {
  if (!input || typeof input !== "string") return null;

  try {
    let str = input.trim();

    // Add http:// if no protocol
    if (!/^https?:\/\//i.test(str)) {
      str = "http://" + str;
    }

    const urlObj = new URL(str);

    // Normalize hostname (lowercase)
    urlObj.hostname = urlObj.hostname.toLowerCase();

    // Remove default ports
    if (
      (urlObj.protocol === "http:" && urlObj.port === "80") ||
      (urlObj.protocol === "https:" && urlObj.port === "443")
    ) {
      urlObj.port = "";
    }

    return urlObj.toString();
  } catch {
    return null;
  }
};

const generateUniqueCode = async () => {
  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    6
  );
  const maxRetries = 5;

  for (let i = 0; i < maxRetries; i++) {
    const code = nanoid();
    const exists = await Url.exists({ code });
    if (!exists) return code;
  }

  throw new Error("Failed to generate a unique code after retries");
};

module.exports = { asyncHandler, formatUrl, generateUniqueCode };
