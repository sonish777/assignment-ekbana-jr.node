const router = require("express").Router();
const { body } = require("express-validator");
const companyCategoryController = require("../controllers/company_category.controller");
const verifyApiKey = require("../middlewares/verifyApiKey");
const validate = require("../middlewares/validate");

router.use(verifyApiKey);

router
  .route("/")
  .get(companyCategoryController.getAllCategories)
  .post(
    body("title").trim().notEmpty(),
    validate,
    companyCategoryController.createCategory
  );

router
  .route("/:id")
  .get(companyCategoryController.getCategory)
  .put(
    body("title").optional().trim().notEmpty(),
    validate,
    companyCategoryController.updateCategory
  )
  .delete(companyCategoryController.deleteCategory);

module.exports = router;
