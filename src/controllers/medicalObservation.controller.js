const MedicalObservationService = require("../services/medicalObservation.service");
const service = new MedicalObservationService();

const getPatientObservations = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.getPatientObservations(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({
      success: false,
      msg:
        "Error al obtener el listado de observaciones médicas del paciente: " +
        error.message,
    });
  }
};

const getHospitalObservations = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.getHospitalObservations(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({
      success: false,
      msg:
        "Error al obtener el listado de observaciones médicas del hospital: " +
        error.message,
    });
  }
};

const getDoctorObservations = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.getDoctorObservations(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({
      success: false,
      msg:
        "Error al obtener el listado de observaciones médicas generadas por el médico: " +
        error.message,
    });
  }
};

const createObservation = async (req, res) => {
  try {
    await service.createObservation(req.body);
    res.json({ success: true, msg: "Observación médica creada con éxito" });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error al crear la observación médica: " + error.message,
    });
  }
};

const downloadObservations = async (req, res) => {
  try {
    const { id } = req.params;
    const pdfData = await service.downloadObservations(id);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${id}.pdf`);
    res.download(pdfData);
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error al descargar las observaciones médicas del paciente: " + error.message,
    });
  }
};

module.exports = {
  getPatientObservations,
  getHospitalObservations,
  getDoctorObservations,
  createObservation,
  downloadObservations,
};
