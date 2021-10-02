const router = require("express").Router();
const companyCategoryController = require("../controllers/company_category.controller");
const { createValidators, validate } = require("../utils/validation");

router
  .route("/")
  .get(companyCategoryController.getAllCategories)
  .post(
    createValidators({ title: "NOT_NULL" }),
    validate,
    companyCategoryController.createCategory
  );

router
  .route("/:id")
  .get(companyCategoryController.getCategory)
  .put(
    createValidators({ title: "NOT_NULL" }),
    validate,
    companyCategoryController.updateCategory
  )
  .delete(companyCategoryController.deleteCategory);

module.exports = router;
