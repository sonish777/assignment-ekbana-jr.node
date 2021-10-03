const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyCategory",
  },
  title: {
    type: String,
    required: [true, "Title cannot be blank"],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    required: [true, "Status cannot be blank"],
    default: true,
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

companySchema.pre(/^find/, function (next) {
  this.populate("category_id");
  next();
});

companySchema.pre("findOneAndUpdate", function (next) {
  this._update.updated_at = new Date(Date.now());
  next();
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
