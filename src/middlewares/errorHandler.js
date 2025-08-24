const handleError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
};
const handlePageNotFound = (req, res) => {
  res.status(404).render("pages/404", { title: "Page Not Found" });
};

module.exports = { handleError, handlePageNotFound };
