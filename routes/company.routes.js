const router = require("express").Router();
const { body } = require("express-validator");
const companyController = require("../controllers/company.controller");
const validate = require("../middlewares/validate");
const upload = require("../middlewares/imageUpload");
const verifyApiKey = require("../middlewares/verifyApiKey");

router.use(verifyApiKey);

router
  .route("/")
  .get(companyController.getAllCompanies)
  .post(
    upload("image"),
    body("title").trim().notEmpty(),
    body("status").optional().isBoolean(),
    validate,
    companyController.createCompany
  );

router
  .route("/:id")
  .get(companyController.getCompany)
  .put(
    upload("image"),
    body("title").optional().trim().notEmpty(),
    body("status").optional().isBoolean(),
    validate,
    companyController.updateCompany
  )
  .delete(companyController.deleteCompany);

module.exports = router;
