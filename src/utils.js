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

const isValidCode = (code, length = 6) => {
  if (typeof code !== "string" || code === "") return false;

  const regex = new RegExp(`^[a-zA-Z0-9]{${length}}$`);
  return regex.test(code);
};

const validateAuthInput = ({ username, email, password }, isLogin = false) => {
  if (!isLogin) {
    if (!username || username.length < 3) {
      return {
        valid: false,
        error: "Username must be at least 3 characters long",
      };
    } else if (/\s/.test(username)) {
      return { valid: false, error: "Username must not contain spaces" };
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { valid: false, error: "Please provide a valid email address" };
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&])[A-Za-z\d@#$%^&]{6,}$/;

  if (!password || !passwordRegex.test(password)) {
    return {
      valid: false,
      error: "Combination required a-z, A-Z, 0-9, and (@#$%^&)",
    };
  }

  return { valid: true, error: null };
};

module.exports = {
  asyncHandler,
  formatUrl,
  generateUniqueCode,
  isValidCode,
  validateAuthInput,
};
