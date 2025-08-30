const error = (err, req, res, next) => {
  console.error("Server Error: ", err);
  res.render("error", {
    statusCode: 500,
    error: "Server Internal Error",
  });
};

const notFound = (req, res, next) => {
  res.render("error", {
    statusCode: 404,
    error: "Page Not Found",
  });
};

module.exports = { error, notFound };
