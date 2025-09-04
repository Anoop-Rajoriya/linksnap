const { asyncHandler } = require("../utils");
const { registerUserService, loginUserService } = require("../services/user");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body || {};

  try {
    await registerUserService({
      username,
      email,
      password,
    });
    res.redirect(302, "/login");
  } catch (error) {
    res.redirect(302, `/register?error=${encodeURIComponent(error.message)}`);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  try {
    const { token } = await loginUserService({ email, password });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.redirect(302, "/");
  } catch (error) {
    res.redirect(302, `/login?error=${encodeURIComponent(error.message)}`);
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.redirect(302, "/");
});

module.exports = { registerUser, loginUser, logoutUser };
