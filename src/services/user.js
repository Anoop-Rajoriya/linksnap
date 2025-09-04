const { User } = require("../models");
const { validateAuthInput } = require("../utils");

const registerUserService = async ({ username, email, password }) => {
  const { valid, error } = validateAuthInput({ username, email, password });

  if (!valid) {
    throw new Error(error);
  }

  const exists = await User.exists({ email, username });

  if (exists) {
    throw new Error("Email or Username already exists");
  }

  const user = await User.create({ username, email, password });
  if (!user) {
    throw new Error("Failed to register user");
  }

  return {
    message: "User registed successful",
    data: { id: user._id, username: user.username, email: user.email },
  };
};

const loginUserService = async ({ email, password }) => {
  const { valid, error } = validateAuthInput({ email, password }, true);

  if (!valid) {
    throw new Error(error);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = user.generateToken();

  return { message: "User authenticated", token };
};

module.exports = { registerUserService, loginUserService };
