const fs = require("fs");
const path = require("path");

const Company = require("../models/Company");
const AppError = require("../utils/AppError");
const catchAsyncError = require("../utils/catchAsyncError");
const { filterRequestBody } = require("../utils/helpers");
const paginate = require("../utils/paginate");

module.exports.getAllCompanies = catchAsyncError(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const companies = await paginate(Company.find(), page);
  res.status(200).json({
    status: "success",
    data: companies,
  });
});

module.exports.getCompany = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const company = await Company.findById(id);
  if (!company)
    return next(new AppError(404, "The company for given ID was not found"));
  res.status(200).json({
    status: "success",
    data: company,
  });
});

module.exports.createCompany = catchAsyncError(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;
  const keys = ["category_id", "title", "image", "description", "status"];
  const filteredBody = filterRequestBody(req.body, keys);
  const company = await Company.create(filteredBody);
  res.status(201).json({
    status: "success",
    data: company,
  });
});

module.exports.updateCompany = catchAsyncError(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;
  const keys = ["category_id", "title", "image", "description", "status"];
  const { id } = req.params;
  const filteredBody = filterRequestBody(req.body, keys);
  if (JSON.stringify(filteredBody) == "{}") {
    return next(new AppError(400, "No property provided for update"));
  }
  const updatedCompany = await Company.findByIdAndUpdate(id, filteredBody, {
    runValidators: true,
    new: true,
  });
  if (!updatedCompany)
    return next(new AppError(404, "The company for given ID was not found"));
  res.status(200).json({
    status: "success",
    data: updatedCompany,
  });
});

module.exports.deleteCompany = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const deletedCompany = await Company.findByIdAndDelete(id);
  if (!deletedCompany) {
    return next(new AppError(404, "The company for given ID was not found"));
  }
  if (deletedCompany.image)
    fs.unlink(
      path.join(__dirname, "../public/images/company", deletedCompany.image),
      (err) => {
        if (err) return next(new AppError(500, err.message));
        console.log("Image Deleted");
      }
    );
  res.status(204).json({
    status: "success",
    data: deletedCompany,
  });
});
