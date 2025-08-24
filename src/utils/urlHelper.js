const { customAlphabet } = require("nanoid");
const alphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const generateNanoId = customAlphabet(alphabet, 7);

const formatUrl = (input) => {
  if (!input || typeof input !== "string") {
    return null;
  }

  let url = input.trim();

  //   Add http protocol
  if (!/^https?:\/\//i.test(url)) {
    url = "http://" + url + "/";
  }

  try {
    const parsed = new URL(url);
    const allowedProtocols = ["http:", "https:"];
    if (!allowedProtocols.includes(parsed.protocol)) {
      return null;
    }
    return parsed.href;
  } catch (error) {
    return null;
  }
};

const generateCode = async (UrlModel) => {
  let shortCode;
  let exists = true;

  while (exists) {
    shortCode = generateNanoId();

    exists = await UrlModel.exists({ shortCode });
  }

  return shortCode;
};

const validateCode = (code) => {
  const nanoidRegex = /^[0-9a-zA-Z]{7}$/;
  return nanoidRegex.test(code);
};

module.exports = { formatUrl, generateCode, validateCode };
