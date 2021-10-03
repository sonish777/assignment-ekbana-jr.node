const AppError = require("../utils/AppError");

const verifyApiKey = (req, res, next) => {
  const apiKey = req.header("API_KEY");
  if (!apiKey) {
    return next(new AppError(401, "You are not authorized"));
  }
  if (apiKey !== process.env.API_KEY) {
    return next(
      new AppError(403, "You are forbidden from accessing the route")
    );
  }

  return next();
};

module.exports = verifyApiKey;
