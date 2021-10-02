const express = require("express");
const companyCategoryRoutes = require("./routes/company_category.routes");
const companyRoutes = require("./routes/company.routes");
const morgan = require("morgan");

const app = express();

// Setting up middlewares
app.use(morgan("dev"));
app.use(express.json());

// Setting up routes
app.use("/api/category", companyCategoryRoutes);
app.use("/api/company", companyRoutes);

module.exports = app;
