const crypto = require("crypto");

const generateShortCode = (length = 6) => {
  // Generate random bytes
  const bytes = crypto.randomBytes(Math.ceil((length * 3) / 4));

  // Convert to base64 and make URL safe
  return bytes
    .toString("base64")
    .replace(/\+/g, "-") // URL safe
    .replace(/\//g, "_") // URL safe
    .replace(/=/g, "") // remove padding
    .slice(0, length); // desired length
};

const generateUniqueShortCode = async (Model) => {
  const maxLength = 10;
  const maxRetries = 3;
  let length = 6;
  let attempt = 0;

  while (length <= maxLength) {
    const code = generateShortCode(length);
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

module.exports = generateUniqueShortCode;
