class AppError extends Error {
  constructor(errorCode, errorMessage) {
    super(errorMessage);
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}

module.exports = AppError;
