const jwt = require("jsonwebtoken");
const { env } = require("../config");

const verifyAuth = (req, res, next) => {
  const { authToken } = req.cookies || {};

  if (!authToken) {
    req.user = null;
    return next();
  }

  const decoded = jwt.verify(authToken, env.jwtSecret);
  req.user = decoded;
  next();
};
const requireAuth = (req, res, next) => {
  const user = req.user;

  if (user) return next();

  return res.redirect(
    301,
    `/login?error=${encodeURIComponent("Login required")}`
  );
};
const publicOnly = (req, res, next) => {
  const user = req.user;

  if (user) return res.redirect(301, "/");

  next();
};

module.exports = { verifyAuth, requireAuth, publicOnly };
