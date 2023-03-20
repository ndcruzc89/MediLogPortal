const { models } = require("../libs/sequelize");
const UserService = require("./user.service");
const { v4: uuidv4 } = require("uuid");
const { getToken } = require("../config/jwt.config");
const { sendEmail, getTemplate } = require("../config/mail.config");
const { encryptPassword } = require("../config/bcrypt.config");

class HospitalService extends UserService {
  constructor() {
    super();
  }

  /* ******************************** */
  // REGISTRO DE UN HOSPITAL
  async signUp(data) {
    //Obtener datos
    const {
      identification,
      email,
      phone,
      password,
      name,
      address,
      medicalServices,
    } = data;

    // Verificar que no exista un usuario con la misma identificación
    await super.checkIdentification(identification);

    // Verificar que no exista un usuario con el mismo email
    await super.checkEmail(email);

    // Verificar que un hospital no tenga exactamente el mismo nombre que otro.
    await this.checkHospitalByName(name);

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

    // Crear un nuevo hospital
    await this.createHospital(newUser.id, name, address, medicalServices);

    // Generar el token
    const token = getToken({ email, uuidCode });

    // Obtener un template
    const message = "Para confirmar tu cuenta";
    const link = "http://localhost:4000/api/v1/hospital/confirm/" + token;
    const linkName = "Confirmar Cuenta";

    const template = getTemplate(name, message, link, linkName);

    // Enviar el email
    await sendEmail(email, "Confirmación de registro de hospital", template);
  }

  /* ******************************** */
  // Verificar si existe un hospital con el mismo nombre
  async checkHospitalByName(name) {
    const hospital = await models.Hospital.findOne({
      where: { name },
    });

    if (hospital !== null) {
      throw new Error("Ya existe un hospital asociado con el mismo nombre");
    }
  }

  /* ******************************** */
  // Crear hospital
  async createHospital(newUserId, name, address, medicalServices) {
    try {
      await models.Hospital.create({
        id_usuario: newUserId,
        name,
        address,
        medical_services: medicalServices,
      });
    } catch (error) {
      throw new Error("No se ha podido crear el hospital");
    }
  }

  /* ******************************** */
  // CONFIRMAR TOKEN DE REGISTRO DE HOSPITAL
  async confirmToken(token) {
    await super.confirmToken(token);
  }

  /* ******************************** */
  // LOGIN DE HOSPITAL
  async signIn(data) {
    // Verificar credenciales del usuario y que haya confirmado el registro
    const user = await super.checkUserConfirmationStatus(data);

    // Verificar y obtener los datos del hospital
    const hospital = await this.checkHospitalById(user.id);

    // Generar el token
    const token = getToken({
      id: user.id,
      identification: user.identification,
      email: user.email,
      phone: user.phone,
      name: hospital.name,
      address: hospital.address,
      medicalServices: hospital.medical_services,
    });

    return token;
  }

  /* ******************************** */
  // Verificar que exista el hospital exista dado su id
  async checkHospitalById(hospitalId) {
    const hospital = await models.Hospital.findOne({
      where: { id_usuario: hospitalId },
    });
    if (hospital === null) {
      throw new Error("El hospital NO existe");
    }
    return hospital;
  }

  /* ******************************** */
  // CAMBIO DE CONTRASEÑA DEL HOSPITAL
  async changePassword(hospitalId, data) {
    // Verificar y obtener los datos del hospital
    const hospital = await this.checkHospitalById(hospitalId);

    // Cambiar la contraseña
    await super.changePassword(hospital.id_usuario, data);
  }

  /* ******************************** */
  // ENVIAR CORREO PARA RESTAURAR CONTRASEÑA DEL HOSPITAL
  async restorePassword(data) {
    // Obtener el correo
    const { email } = data;

    // Verificar que el usuario exista dado el email
    const user = await super.checkUserByEmail(email);

    // Verificar y obtener los datos de hospital
    const hospital = await this.checkHospitalById(user.id);

    // Generar el token
    const token = getToken({ email: user.email, uuidCode: user.uuid_code });

    // Obtener un template
    const message = "Para restablecer tu contraseña";
    const link =
      "http://localhost:4000/api/v1/hospital/submit-restore-password/" + token;
    const linkName = "Restablecer contraseña";

    const template = getTemplate(hospital.name, message, link, linkName);

    // Enviar el email
    await sendEmail(
      user.email,
      "Restablecer contraseña del hospital",
      template
    );
  }

  /* ******************************** */
  // ENVIAR LOS DATOS DE RESTAURACIÓN DE CONTRASEÑA DEL HOSPITAL
  async submitRestorePassword(token, data) {
    await super.submitRestorePassword(token, data);
  }
}

module.exports = HospitalService;
