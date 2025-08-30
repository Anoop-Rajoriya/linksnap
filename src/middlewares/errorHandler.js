const { WebError } = require("../utils/helper");

const handleError = (err, req, res, next) => {
  console.error("Server Error: ", err);

  res
    .status(500)
    .render(
      "pages/error",
      new WebError({ statusCode: 500, error: err.name, message: err.message })
    );
};

const handlePageNotFound = (req, res) => {
  res.status(404).render(
    "pages/error",
    new WebError({
      statusCode: 404,
      error: "Page Not Found",
      message: "Unable to found page you requested",
    })
  );
};

module.exports = { handleError, handlePageNotFound };
