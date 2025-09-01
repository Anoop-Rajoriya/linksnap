const { validateAuthInput } = require("../utils");
const { User } = require("../models");

const createUserService = async ({ name, email, password }) => {
  const formFieldError = validateAuthInput({ name, email, password }, true);

  if (formFieldError) {
    throw new Error(formFieldError);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const user = await User.create({ name, email, password });
  if (!user) {
    throw new Error("User registration failed");
  }

  return { message: "User registred successfully", data: user };
};

const loginUserService = async ({ email, password }) => {
  const formFieldError = validateAuthInput({ email, password });

  if (formFieldError) {
    throw new Error(formFieldError);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const authToken = user.generateAuthToken();

  return {
    message: "User login successful",
    authToken,
  };
};

module.exports = { createUserService, loginUserService };
