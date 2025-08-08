const crypto = require('crypto');
const Url = require('../models/Url');

// Base62 characters (0-9, a-z, A-Z)
const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Generate a random short code
 * @param {number} length - Length of the short code
 * @returns {string} Random short code
 */
const generateRandomCode = (length = 6) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += BASE62_CHARS.charAt(Math.floor(Math.random() * BASE62_CHARS.length));
  }
  return result;
};

/**
 * Generate a unique short code (checks database for collisions)
 * @param {number} length - Length of the short code
 * @param {number} maxAttempts - Maximum attempts to generate unique code
 * @returns {Promise<string>} Unique short code
 */
const generateUniqueShortCode = async (length = 6, maxAttempts = 10) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const shortCode = generateRandomCode(length);
    
    // Check if code already exists
    const existingUrl = await Url.findOne({ shortCode });
    if (!existingUrl) {
      return shortCode;
    }
    
    // If collision occurs, try with longer code
    if (attempt === maxAttempts - 1) {
      return generateUniqueShortCode(length + 1, maxAttempts);
    }
  }
  
  throw new Error('Unable to generate unique short code');
};

/**
 * Validate custom alias
 * @param {string} alias - Custom alias to validate
 * @returns {boolean} Is valid alias
 */
const isValidAlias = (alias) => {
  // Allow alphanumeric characters, hyphens, and underscores
  const aliasRegex = /^[a-zA-Z0-9_-]+$/;
  return aliasRegex.test(alias) && alias.length >= 3 && alias.length <= 20;
};

module.exports = {
  generateUniqueShortCode,
  isValidAlias
};