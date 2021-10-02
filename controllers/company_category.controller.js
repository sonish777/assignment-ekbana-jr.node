const CompanyCategroy = require("../models/CompanyCategroy");
const AppError = require("../utils/AppError");
const catchAsyncError = require("../utils/catchAsyncError");
const paginate = require("../utils/paginate");

module.exports.getAllCategories = catchAsyncError(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const categories = await paginate(CompanyCategroy.find(), page);
  res.status(200).json({
    status: "success",
    data: categories,
  });
});

module.exports.createCategory = catchAsyncError(async (req, res, next) => {
  const { title } = req.body;
  const newCategory = new CompanyCategroy({ title });
  await newCategory.save();
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
  const updateObject = {
    title: req.body.title,
    updated_at: new Date(Date.now()),
  };
  const category = await CompanyCategroy.findByIdAndUpdate(id, updateObject, {
    runValidators: true,
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
