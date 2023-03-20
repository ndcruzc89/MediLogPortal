const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateHospitalCreation = [
  // name, address, medical_services
  check("name")
  .exists().matches(/^(?!true|false)[A-Za-zÁÉÍÓÚáéíóúñÑ\s']+$/),
  check("address").exists().matches(/^(?!true|false).+$/),
  check("medicalServices")
  .exists().matches(/^(?!true|false).+$/),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateHospitalCreation };
