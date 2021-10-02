const CompanyCategroy = require("../models/CompanyCategroy");
const AppError = require("../utils/AppError");
const catchAsyncError = require("../utils/catchAsyncError");
const paginate = require("../utils/paginate");
const { filterRequestBody } = require("../utils/helpers");

module.exports.getAllCategories = catchAsyncError(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const categories = await paginate(CompanyCategroy.find(), page);
  res.status(200).json({
    status: "success",
    data: categories,
  });
});

module.exports.createCategory = catchAsyncError(async (req, res, next) => {
  const filteredBody = filterRequestBody(req.body, ["title"]);
  const newCategory = await CompanyCategroy.create(filteredBody);
  res.status(201).json({
    status: "success",
    data: newCategory,
  });
});

module.exports.getCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const category = await CompanyCategroy.findById(id);
  if (!category) {
    return next(new AppError(404, "Category for given ID was not found"));
  }
  res.status(200).json({
    status: "success",
    data: category,
  });
});

module.exports.updateCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const filteredBody = filterRequestBody(req.body, ["title"]);
  console.log(filteredBody.length);
  if (JSON.stringify(filteredBody) == "{}") {
    return next(new AppError(400, "No property provided for update"));
  }
  const category = await CompanyCategroy.findByIdAndUpdate(id, filteredBody, {
    runValidators: true,
    new: true,
  });
  if (!category) {
    return next(new AppError(404, "The category for given ID was not found"));
  }
  res.status(200).json({
    status: "success",
    data: category,
  });
});

module.exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const deletedCategory = await CompanyCategroy.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    data: deletedCategory,
  });
});
