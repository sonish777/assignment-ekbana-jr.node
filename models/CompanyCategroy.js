const mongoose = require("mongoose");

const companyCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title cannot be blank"],
  },
  created_at: {
    type: Date,
    required: [true, "Created date cannot be blank"],
    default: new Date(Date.now()),
  },
  updated_at: {
    type: Date,
    required: [true, "Updated date cannot be blank"],
    default: new Date(Date.now()),
  },
});

const CompanyCategory = mongoose.model(
  "CompanyCategory",
  companyCategorySchema
);

module.exports = CompanyCategory;
