const { body, validationResult } = require("express-validator");
const AppError = require("./AppError");

module.exports.createValidators = (validatorsObj) => {
  const validators = [];
  Object.keys(validatorsObj).forEach((key) => {
    switch (validatorsObj[key]) {
      case "NOT_NULL":
        validators.push(body(key).optional().trim().not().isEmpty());
        break;
      case "BOOLEAN":
        validators.push(body(key).optional().isBoolean());
        break;
    }
  });
  return validators;
};

module.exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map((err) => `${err.param}: ${err.msg}`);
  return next(new AppError(400, errorMessages));
};
