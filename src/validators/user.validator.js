const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

// Validaciones de identificacion
const identificationValidation = [
  check("identification")
    .exists()
    .matches(/^[0-9]+$/)
    .isLength({ min: 7 }),
];

// Validaciones de identificacion
const passwordValidation = [
  check("password")
    .exists()
    .isLength({ min: 8 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/),
];

// Validación de email
const emailValidation = [check("email").exists().isEmail()];

// Validaciones específicas para la creación de usuario
const validateUserCreation = [
  ...identificationValidation,
  ...passwordValidation,
  ...emailValidation,
  check("phone")
    .exists()
    .matches(/^[0-9]+$/)
    .isLength({ min: 10 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

// Validaciones específicas para el inicio de sesión de usuario
const validateUserLogin = [
  ...identificationValidation,
  ...passwordValidation,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

// Validación de nueva contraseña
const newPasswordValidation = [
  check("newPassword")
    .exists()
    .isLength({ min: 8 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/),
];

// Validaciones específicas para el cambio de contraseña de usuario
const validatePasswordChangeData = [
  ...passwordValidation,
  ...newPasswordValidation,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

// Validación del email en el cual se va a recuperar la contraseña
const validateEmail = [
  ...emailValidation,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

// Validación para la nueva contraseña de recuperación
const validateNewPassword = [
  ...newPasswordValidation,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateUserCreation,
  validateUserLogin,
  validatePasswordChangeData,
  validateEmail,
  validateNewPassword,
};
