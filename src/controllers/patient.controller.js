const PatientService = require("../services/patient.service");
const service = new PatientService();

const signUp = async (req, res) => {
  try {
    await service.signUp(req.body);
    res.json({ success: true, msg: "Paciente registrado con éxito" });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error al registrar el paciente: " + error.message,
    });
  }
};

const confirmToken = async (req, res) => {
  try {
    const { token } = req.params;
    await service.confirmToken(token);
    res.json({ success: true, msg: "Confirmación exitosa del paciente" });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error al confirmar el paciente: " + error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const token = await service.signIn(req.body);
    res.json({ success: true, msg: "Login exitoso", token: token });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error de inicio de sesión del paciente: " + error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    await service.changePassword(id, req.body);
    res.json({
      success: true,
      msg: "Contraseña del paciente actualizada con éxito",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error al cambiar la contraseña del paciente: " + error.message,
    });
  }
};

const restorePassword = async (req, res) => {
  try {
    await service.restorePassword(req.body);
    res.json({
      success: true,
      msg: "Token para recuperación de contraseña generado con éxito",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg:
        "Error al intentar generar el token de recuperación de contraseña del paciente: " +
        error.message,
    });
  }
};

const submitRestorePassword = async (req, res) => {
  try {
    const { token } = req.params;
    await service.submitRestorePassword(token, req.body);
    res.json({
      success: true,
      msg: "Contraseña del paciente recuperada con éxito",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg:
        "Error al intentar recuperar la contraseña del paciente: " +
        error.message,
    });
  }
};

module.exports = {
  signUp,
  confirmToken,
  signIn,
  changePassword,
  restorePassword,
  submitRestorePassword,
};
