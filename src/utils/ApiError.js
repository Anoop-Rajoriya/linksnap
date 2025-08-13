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

module.exports = ApiError;
