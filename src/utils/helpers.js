class ApiError extends Error {
  constructor(statusCode, name, errors = [], stack = "") {
    super(name);
    this.name = this.constructor.name;
    this.success = false;
    this.statusCode = statusCode;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.statusCode = statusCode;
    this.success = statusCode > 199 && statusCode < 299;
    this.message = message;
    if (data) {
      this.data = data;
    }
  }
}

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res)).catch((err) => next(err));
  };
};

const formateISODateString = (ISODate) => {
  if (!ISODate) return null;
  const date = new Date(ISODate);
  const formater = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
  });

  return formater.format(date);
};

module.exports = { ApiResponse, ApiError, asyncHandler, formateISODateString };
