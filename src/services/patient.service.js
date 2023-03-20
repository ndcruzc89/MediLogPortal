const { models } = require("../libs/sequelize");
const UserService = require("./user.service");
const { v4: uuidv4 } = require("uuid");
const { getToken } = require("../config/jwt.config");
const { sendEmail, getTemplate } = require("../config/mail.config");
const { encryptPassword } = require("../config/bcrypt.config");

class PatientService extends UserService {
  constructor() {
    super();
  }

  /* ******************************** */
  // REGISTRO DE UN PACIENTE
  async signUp(data) {
    //Obtener datos
    const {
      identification,
      email,
      phone,
      password,
      name,
      lastName,
      secondLastName,
      address,
      birthdate,
    } = data;

    // Verificar que no exista un usuario con la misma identificación
    await super.checkIdentification(identification);

    // Verificar que no exista un usuario con el mismo email
    await super.checkEmail(email);

    // Verificar que un paciente no tenga exactamente el mismo nombre junto con el primer y segundo apellido que otro.
    await this.checkPatientByFullName(name, lastName, secondLastName);

    // Encriptar la contraseña
    const hashedPassword = encryptPassword(password);

    // Generar el codigo
    const uuidCode = uuidv4();
    const registrationConfirmation = false;

    // Crear un nuevo usuario
    const user = {
      identification,
      email,
      phone,
      password: hashedPassword,
      uuid_code: uuidCode,
      registration_confirmation: registrationConfirmation,
    };
    const newUser = await super.createUser(user);

    // Crear un nuevo paciente
    await this.createPatient(
      newUser.id,
      name,
      lastName,
      secondLastName,
      address,
      birthdate
    );

    // Generar el token
    const token = getToken({ email, uuidCode });

    // Obtener un template
    const message = "Para confirmar tu cuenta";
    const link = "http://localhost:4000/api/v1/patient/confirm/" + token;
    const linkName = "Confirmar Cuenta";

    const template = getTemplate(name, message, link, linkName);

    // Enviar el email
    await sendEmail(email, "Confirmación de registro de paciente", template);
  }

  /* ******************************** */
  // Verificar si existe un paciente con el mismo nombre completo
  async checkPatientByFullName(name, lastName, secondLastName) {
    const patient = await models.Patient.findOne({
      where: { lastName: lastName, secondLastName: secondLastName },
    });

    if (patient !== null && patient.name === name) {
      throw new Error(
        "Ya existe un paciente asociado con el mismo nombre, primer y segundo apellido"
      );
    }
  }

  /* ******************************** */
  // Crear paciente
  async createPatient(
    newUserId,
    name,
    lastName,
    secondLastName,
    address,
    birthdate
  ) {
    try {
      await models.Patient.create({
        id_usuario: newUserId,
        name,
        lastName,
        secondLastName,
        address,
        birthdate,
      });
    } catch (error) {
      throw new Error("No se ha podido crear el paciente");
    }
  }

  /* ******************************** */
  // CONFIRMAR TOKEN DE REGISTRO DE PACIENTE
  async confirmToken(token) {
    await super.confirmToken(token);
  }

  /* ******************************** */
  // LOGIN DEL PACIENTE
  async signIn(data) {
    // Verificar credenciales del usuario y que haya confirmado el registro
    const user = await super.checkUserConfirmationStatus(data);

    // Verificar y obtener los datos del paciente
    const patient = await this.checkPatientById(user.id);

    // Generar el token
    const token = getToken({
      id: user.id,
      identification: user.identification,
      email: user.email,
      phone: user.phone,
      name: patient.name,
      lastName: patient.lastName,
      secondLastName: patient.secondLastName,
      address: patient.address,
      birthdate: patient.birthdate,
    });

    return token;
  }

  /* ******************************** */
  // Verificar que exista el paciente dado el id
  async checkPatientById(patientId) {
    const patient = await models.Patient.findOne({
      where: { id_usuario: patientId },
    });
    if (patient === null) {
      throw new Error("El paciente NO existe");
    }
    return patient;
  }

  /* ******************************** */
  // CAMBIO DE CONTRASEÑA DEL PACIENTE
  async changePassword(patientId, data) {
    // Verificar y obtener los datos del paciente
    const patient = await this.checkPatientById(patientId);

    // Cambiar la contraseña
    await super.changePassword(patient.id_usuario, data);
  }

  /* ******************************** */
  // ENVIAR CORREO PARA RESTAURAR CONTRASEÑA DEL PACIENTE
  async restorePassword(data) {
    // Obtener el correo
    const { email } = data;

    // Verificar que el usuario exista
    const user = await super.checkUserByEmail(email);

    // Verificar y obtener los datos de paciente
    const patient = await this.checkPatientById(user.id)

    // Generar el token
    const token = getToken({ email: user.email, uuidCode: user.uuid_code });

    // Obtener un template
    const message = "Para restablecer tu contraseña";
    const link =
      "http://localhost:4000/api/v1/patient/submit-restore-password/" + token;
    const linkName = "Restablecer contraseña";

    const template = getTemplate(patient.name, message, link, linkName);

    // Enviar el email
    await sendEmail(user.email, "Restablecer contraseña de paciente", template);
  }

  /* ******************************** */
  // ENVIAR LOS DATOS DE RESTAURACIÓN DE CONTRASEÑA DEL PACIENTE
  async submitRestorePassword(token, data) {
    await super.submitRestorePassword(token, data);
  }
}

module.exports = PatientService;
