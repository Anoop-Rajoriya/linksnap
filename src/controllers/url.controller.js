const { asyncHandler } = require("../utils/helper");

const createUrl = asyncHandler(async (req, res) => {});
const listUrls = asyncHandler(async (req, res) => {});
const getUrlByCode = asyncHandler(async (req, res) => {});

module.exports = {
  createUrl,
  listUrls,
  getUrlByCode,
};
