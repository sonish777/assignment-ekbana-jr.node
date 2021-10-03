const multer = require("multer");
const AppError = require("../utils/AppError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/company");
  },
  filename: (req, file, cb) => {
    const fileExtension = file.mimetype.split("/")[1];
    cb(
      null,
      `${file.originalname.split(".")[0]}-${Date.now()}.${fileExtension}`
    );
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new AppError(400, "Please upload an image file."), false);
};

const upload = (fieldName) =>
  multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  }).single(fieldName);

module.exports = upload;
