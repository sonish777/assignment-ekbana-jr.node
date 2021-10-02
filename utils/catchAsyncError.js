const AppError = require("./AppError");

const catchAsyncError = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(new AppError(500, err.message)));
};

module.exports = catchAsyncError;
