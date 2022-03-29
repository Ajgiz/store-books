class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status;
  }
  static badRequest(message) {
    return new ApiError(message, 400);
  }
  static internal(message) {
    return new ApiError(message, 500);
  }
  static forbidden(message) {
    return new ApiError(message, 403);
  }
  static unauthorized(message) {
    return new ApiError(message, 401);
  }
}
module.exports = ApiError;
