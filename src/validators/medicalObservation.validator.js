const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");
const moment = require('moment');

const validateMedicalObservationCreation = [
  // patientId, hospitalId, doctorId, speciality, observation_date, observation_detail
  check("patientId").exists().isNumeric(),
  check("hospitalId").exists().isNumeric(),
  check("doctorId").exists().isNumeric(),
  check("observationDate")
  .exists()
  .custom((value) => {
    if (!moment(value, "YYYY-MM-DDTHH:mm:ss", true).isValid()) {
      throw new Error("Formato de fecha inválido. Debería ser YYYY-MM-DDTHH:mm:ss");
    }
    return true;
  }),
  check("observationDetail").exists().matches(/^(?!true|false).+$/),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateMedicalObservationCreation };
