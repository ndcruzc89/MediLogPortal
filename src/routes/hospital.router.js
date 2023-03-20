const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospital.controller");
const {
  validateUserCreation,
  validateUserLogin,
  validatePasswordChangeData,
  validateEmail,
  validateNewPassword,
} = require("../validators/user.validator");
const {
  validateHospitalCreation,
} = require("../validators/hospital.validator");

router
  .post(
    "/signup",
    validateUserCreation,
    validateHospitalCreation,
    hospitalController.signUp
  )
  .get("/confirm/:token", hospitalController.confirmToken)
  .post("/signin", validateUserLogin, hospitalController.signIn)
  .put(
    "/change-password/:id",
    validatePasswordChangeData,
    hospitalController.changePassword
  )
  .post("/restore-password", validateEmail, hospitalController.restorePassword)
  .put(
    "/submit-restore-password/:token",
    validateNewPassword,
    hospitalController.submitRestorePassword
  );

module.exports = router;
