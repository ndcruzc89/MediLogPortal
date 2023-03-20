const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const {
  validateUserCreation,
  validateUserLogin,
  validatePasswordChangeData,
  validateEmail,
  validateNewPassword,
} = require("../validators/user.validator");
const { validateDoctorCreation } = require("../validators/doctor.validator");

router
  .post(
    "/signup",
    validateUserCreation,
    validateDoctorCreation,
    doctorController.signUp
  )
  .get("/confirm/:token", doctorController.confirmToken)
  .post("/signin", validateUserLogin, doctorController.signIn)
  .put(
    "/change-password/:id",
    validatePasswordChangeData,
    doctorController.changePassword
  )
  .post("/restore-password", validateEmail, doctorController.restorePassword)
  .put(
    "/submit-restore-password/:token",
    validateNewPassword,
    doctorController.submitRestorePassword
  );

module.exports = router;
