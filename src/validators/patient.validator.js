const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");
const moment = require('moment');

const validatePatientCreation = [
  // name, lastName, secondLastName, address, birthdate
  check("name").exists().matches(/^(?!true|false)[A-Za-zÁÉÍÓÚáéíóúñÑ\s']+$/),
  check("lastName").exists().matches(/^(?!true|false)[A-Za-zÁÉÍÓÚáéíóúñÑ\s']+$/),
  check("secondLastName").exists().matches(/^(?!true|false)[A-Za-zÁÉÍÓÚáéíóúñÑ\s']+$/),
  check("address").exists().matches(/^(?!true|false).+$/),
  check("birthdate")
    .exists()
    .custom((value) => {
      if (!moment(value, "YYYY-MM-DD", true).isValid()) {
        throw new Error("Formato de fecha inválido. Debería ser YYYY-MM-DD");
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatePatientCreation };
