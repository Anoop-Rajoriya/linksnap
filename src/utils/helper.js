const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

class WebResponse {
  constructor({ routes = [], messages = null, data = null }) {
    this.routes = routes;
    this.messages = messages;
    this.data = data;
  }
}

class WebError {
  constructor({ statusCode = 404, error = "Page Not Found", message }) {
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
  }
}

module.exports = { asyncHandler, WebResponse, WebError };
