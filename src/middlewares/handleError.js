const handleError = (err, req, res, next) => {
  console.error("Error From handleError: ", err);
  res.render("error");
};

module.exports = handleError;
