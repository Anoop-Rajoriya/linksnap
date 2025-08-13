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

module.exports = ApiResponse;
