const DoctorService = require("../services/doctor.service");
const service = new DoctorService();

const signUp = async (req, res) => {
  try {
    await service.signUp(req.body);
    res.json({ success: true, msg: "Médico registrado con éxito" });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error al registrar el médico: " + error.message,
    });
  }
};

const confirmToken = async (req, res) => {
  try {
    const { token } = req.params;
    await service.confirmToken(token);
    res.json({ success: true, msg: "Confirmación exitosa del médico" });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error al confirmar el médico: " + error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await service.signIn(req.body);
    if (response.redirect) {
      res.json({ success: true, msg: "Redirigir para cambio de contraseña" });
    } else {
      res.json({ success: true, msg: "Login exitoso", token: response.token });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error de inicio de sesión del médico: " + error.message,
    });
  }
};


const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    await service.changePassword(id, req.body);
    res.json({
      success: true,
      msg: "Contraseña del médico actualizada con éxito",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error al cambiar la contraseña del médico: " + error.message,
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
        "Error al intentar generar el token de recuperación de contraseña del médico: " +
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
      msg: "Contraseña del médico recuperada con éxito",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg:
        "Error al intentar recuperar la contraseña del médico: " +
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
