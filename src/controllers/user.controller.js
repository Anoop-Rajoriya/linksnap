const { asyncHandler } = require("../utils");
const {
  createUserService,
  loginUserService,
} = require("../service/user.service");

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body || {};

  try {
    const { message, user } = await createUserService({
      name,
      email,
      password,
    });
  } catch (error) {
    console.error("createUser() Error: ", error);
    res.redirect(301, `/register?error=${encodeURIComponent(error.message)}`);
  }

  res.redirect(301, "/login");
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  let cookie = null;
  try {
    const { message, authToken } = await loginUserService({ email, password });
    cookie = authToken;
  } catch (error) {
    console.error("loginUser() Error: ", error);
    res.render(301, `/login?error=${encodeURIComponent(error.message)}`);
  }

  if (!cookie)
    return res.redirect(
      `/login?error=${encodeURIComponent("Authentication failed")}`
    );

  res.cookie("authToken", cookie, {
    httpOnly: true,
    secure: true,
  });

  res.redirect("/");
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("authToken");
  res.redirect(301, "/");
});

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};
