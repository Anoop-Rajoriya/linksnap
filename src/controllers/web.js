const { asyncHandler } = require("../utils");

const renderHome = asyncHandler(async (req, res) => {
  res.render("index");
});

module.exports = { renderHome };
