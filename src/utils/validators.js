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

module.exports = { isValidUrl, isSafeUrl, isValidShortCode, isValidISODate };
