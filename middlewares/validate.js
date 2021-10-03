const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map((err) => `${err.param}: ${err.msg}`);
  return next(new AppError(400, errorMessages));
};

module.exports = validate;
