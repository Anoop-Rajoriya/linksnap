const url = require("url");

/**
 * Validate if a string is a valid URL
 * @param {string} urlString - URL string to validate
 * @returns {boolean} Is valid URL
 */
const isValidUrl = (urlString) => {
  try {
    const urlObj = new URL(urlString);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch (error) {
    return false;
  }
};

/**
 * Normalize URL (add protocol if missing, remove trailing slash)
 * @param {string} urlString - URL string to normalize
 * @returns {string} Normalized URL
 */
const normalizeUrl = (urlString) => {
  let normalized = urlString.trim();

  // Add protocol if missing
  if (!normalized.match(/^https?:\/\//i)) {
    normalized = "http://" + normalized;
  }

  try {
    const urlObj = new URL(normalized);
    // Remove trailing slash except for root domain
    if (urlObj.pathname !== "/" && urlObj.pathname.endsWith("/")) {
      urlObj.pathname = urlObj.pathname.slice(0, -1);
    }
    return urlObj.toString();
  } catch (error) {
    throw new Error("Invalid URL format");
  }
};

/**
 * Check if URL is potentially malicious (basic check)
 * @param {string} urlString - URL to check
 * @returns {boolean} Is potentially malicious
 */
const isSuspiciousUrl = (urlString) => {
  const suspiciousPatterns = [
    /bit\.ly/i,
    /tinyurl/i,
    /suspicious-domain\.com/i,
    // Add more patterns as needed
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(urlString));
};

module.exports = {
  isValidUrl,
  normalizeUrl,
  isSuspiciousUrl,
};
