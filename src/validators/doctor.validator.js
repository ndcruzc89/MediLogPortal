const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateDoctorCreation = [
  // name, lastName, secondLastName, address, speciality, hospitalId
  check("name")
    .exists()
    .matches(/^(?!true|false)[A-Za-zÁÉÍÓÚáéíóúñÑ\s']+$/),
  check("lastName")
    .exists()
    .matches(/^(?!true|false)[A-Za-zÁÉÍÓÚáéíóúñÑ\s']+$/),
  check("secondLastName")
    .exists()
    .matches(/^(?!true|false)[A-Za-zÁÉÍÓÚáéíóúñÑ\s']+$/),
  check("address")
    .exists()
    .matches(/^(?!true|false).+$/),
  check("speciality")
    .exists()
    .matches(/^(?!true|false)[A-Za-zÁÉÍÓÚáéíóúñÑ\s']+$/),
  check("hospitalId").exists().isNumeric(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateDoctorCreation };
