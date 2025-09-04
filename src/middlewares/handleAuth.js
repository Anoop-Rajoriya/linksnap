const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { env } = require("../configs");

const verifyToken = async (req, res, next) => {
  const { authToken } = req.cookies || null;
  if (!authToken) {
    req.user = null;
  } else {
    const decode = jwt.verify(authToken, env.authSecret);
    const user = await User.findOne({ _id: decode.id, email: decode.email });
    if (user) req.user = user;
  }
  next();
};

const userOnly = async (req, res, next) => {
  const user = req.user || null;
  if (!user)
    return res.redirect(
      302,
      `/login?error=${encodeURIComponent("Authentication required")}`
    );
  return next();
};

const publicOnly = async (req, res, next) => {
  const user = req.user || null;

  if (user) return res.redirect(302, "/");

  return next();
};

module.exports = { verifyToken, userOnly, publicOnly };
