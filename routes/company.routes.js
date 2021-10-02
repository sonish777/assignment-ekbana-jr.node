const router = require("express").Router();
const companyController = require("../controllers/company.controller");
const { createValidators, validate } = require("../utils/validation");

router
  .route("/")
  .get(companyController.getAllCompanies)
  .post(
    createValidators({ title: "NOT_NULL", status: "BOOLEAN" }),
    validate,
    companyController.createCompany
  );

router
  .route("/:id")
  .get(companyController.getCompany)
  .put(
    createValidators({ title: "NOT_NULL", status: "BOOLEAN" }),
    validate,
    companyController.updateCompany
  )
  .delete(companyController.deleteCompany);

module.exports = router;
