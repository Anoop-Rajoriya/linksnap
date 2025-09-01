const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const validateAuthInput = ({ name, email, password }, register = false) => {
  if (register && (!name || name.trim() === "")) {
    return "Name is required";
  }
  if (!email || email.trim() === "") {
    return "Email is required";
  }
  if (!password || password.trim() === "") {
    return "Password is requried";
  }
  return null;
};

module.exports = { asyncHandler, validateAuthInput };
