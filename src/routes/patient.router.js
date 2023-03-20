const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
const {
  validateUserCreation,
  validateUserLogin,
  validatePasswordChangeData,
  validateEmail,
  validateNewPassword,
} = require("../validators/user.validator");
const { validatePatientCreation } = require("../validators/patient.validator");

router
  .post(
    "/signup",
    validateUserCreation,
    validatePatientCreation,
    patientController.signUp
  )
  .get("/confirm/:token", patientController.confirmToken)
  .post("/signin", validateUserLogin, patientController.signIn)
  .put(
    "/change-password/:id",
    validatePasswordChangeData,
    patientController.changePassword
  )
  .post("/restore-password", validateEmail, patientController.restorePassword)
  .put(
    "/submit-restore-password/:token",
    validateNewPassword,
    patientController.submitRestorePassword
  );

module.exports = router;
