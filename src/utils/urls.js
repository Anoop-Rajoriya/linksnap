const crypto = require("crypto");

const generateCode = (length = 6) => {
  // Generate random bytes
  const bytes = crypto.randomBytes(Math.ceil((length * 3) / 4));

  // Convert to base64 and make URL safe
  return bytes
    .toString("base64")
    .replace(/\+/g, "-") // URL safe
    .replace(/\//g, "_") // URL safe
    .replace(/=/g, "") // remove padding
    .slice(0, length); // desired lengthF
};

const generateShortCode = async (Model) => {
  const maxLength = 10;
  const maxRetries = 3;
  let length = 6;
  let attempt = 0;

  while (length <= maxLength) {
    const code = generateCode(length);
    const exists = await Model.exists({ shortCode: code });

    if (!exists) return code; // Found unique

    attempt++;

    if (attempt >= maxRetries) {
      attempt = 0; // Reset retries
      length++; // Increase length
    }
  }

  throw new Error("Failed to generate unique shortcode.");
};

const formateUrl = (url) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid url");
  }

  let newUrl = url.trim();

  // Add https:// if missing
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  try {
    const parsed = new URL(newUrl);
    // Remove duplicate slashes (but keep after protocol)
    parsed.pathname = parsed.pathname.replace(/\/{2,}/g, "/");
    // Ensure trailing slash
    if (!parsed.pathname.endsWith("/")) {
      parsed.pathname += "/";
    }
    return parsed.toString();
  } catch (error) {
    throw new Error("Invalid URL format");
  }
};

module.exports = { generateShortCode, formateUrl };
