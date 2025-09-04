const handleError = (err, req, res, next) => {
  const user = req.user || null;
  console.error("Error From handleError: ", err);
  res.render("error", {
    title: "Error",
    message: err.message,
    status: 500,
    routes: [],
    user: user ? true : false,
  });
};

const notFound = (req, res) => {
  const user = req.user || null;
  res.render("error", {
    title: "Not Found",
    message: "Page Not Found",
    status: 404,
    routes: [],
    user: user ? true : false,
  });
};

module.exports = { handleError, notFound };
