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

module.exports = { isValidUrl, isSafeUrl };
