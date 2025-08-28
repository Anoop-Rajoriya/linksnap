const pageData = {
  statusCode: null,
  error: null,
};

const handleError = (err, req, res, next) => {
  console.error("Server Error: ", err);
  pageData.statusCode = 500;
  pageData.error = "Something went wrong!";
  res.status(500).render("pages/error", pageData);
};

const handlePageNotFound = (req, res) => {
  pageData.statusCode = 404;
  pageData.error = "Page not found!";
  res.status(404).render("pages/error", pageData);
};

module.exports = { handleError, handlePageNotFound };
