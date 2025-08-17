const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
const isSafeUrl = (url) => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch (error) {
    return false;
  }
};

const isValidShortCode = (shortCode) => {
  return /^[A-Za-z0-9\-_]{6,10}$/.test(shortCode);
};

function isValidISODate(str) {
  // Basic ISO 8601 format check: YYYY-MM-DDTHH:mm:ss.sssZ
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
  return (
    isoRegex.test(str) && !isNaN(Date.parse(str)) && new Date(str) > new Date()
  );
}

function isApiRequest(req) {
  const baseUrl = req.baseUrl || "";
  const contentType = req.get("Content-Type") || "";
  const acceptsJson = req.get("Accept")?.includes("application/json");

  return (
    baseUrl.startsWith("/api") ||
    contentType.includes("application/json") ||
    (acceptsJson && !req.get("Accept")?.includes("text/html"))
  );
}

module.exports = {
  isValidUrl,
  isSafeUrl,
  isValidShortCode,
  isValidISODate,
  isApiRequest,
};
