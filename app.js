const express = require("express");
const companyCategoryRoutes = require("./routes/company_category.routes");
const companyRoutes = require("./routes/company.routes");
const morgan = require("morgan");
const AppError = require("./utils/AppError");

const app = express();

// Setting up middlewares
app.use(morgan("dev"));
app.use(express.json());

// Setting up routes
app.use("/api/category", companyCategoryRoutes);
app.use("/api/company", companyRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(404, "The given route doesn't exist!! :("));
});

// Express default error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.errorCode).json({
    status: "fail",
    message: err.errorMessage,
  });
});

module.exports = app;
