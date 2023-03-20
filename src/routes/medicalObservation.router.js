const express = require("express");
const router = express.Router();
const medicalObservationController = require("../controllers/medicalObservation.controller");
const { validateMedicalObservationCreation } = require("../validators/medicalObservation.validator");

router
  .get("/patient/:id", medicalObservationController.getPatientObservations)
  .get("/hospital/:id", medicalObservationController.getHospitalObservations)
  .get("/doctor/:id", medicalObservationController.getDoctorObservations)
  .post(
    "/create-observation",
    validateMedicalObservationCreation,
    medicalObservationController.createObservation
  )
  .get("/download/patient/:id", medicalObservationController.downloadObservations);


module.exports = router;