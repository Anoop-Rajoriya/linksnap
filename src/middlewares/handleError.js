const handleError = (err, req, res, next) => {
  console.error("Error From handleError: ", err);
  res.render("error", { message: err.message, status: 500, user: null });
};

const notFound = (req, res, next) => {
  res.render("error", { message: "Page Not Found", status: 404, user: null });
};

module.exports = { handleError, notFound };
