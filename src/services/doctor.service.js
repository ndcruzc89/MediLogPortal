const { models } = require("../libs/sequelize");
const UserService = require("./user.service");
const HospitalService = require("./hospital.service");
const { v4: uuidv4 } = require("uuid");
const { getToken } = require("../config/jwt.config");
const { sendEmail, getTemplate } = require("../config/mail.config");
const { encryptPassword } = require("../config/bcrypt.config");

class DoctorService {
  constructor() {
    this.userService = new UserService();
    this.hospitalService = new HospitalService();
  }

  /* ******************************** */
  // REGISTRO DE UN MÉDICO
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
      speciality,
      hospitalId,
    } = data;

    // Verificar que no exista un usuario con la misma identificación
    await this.userService.checkIdentification(identification);

    // Verificar que no exista un usuario con el mismo email
    await this.userService.checkEmail(email);

    // Verificar que un médico no tenga exactamente el mismo nombre junto con el primer y segundo apellido que otro.
    await this.checkDoctorByFullName(name, lastName, secondLastName);

    // Verificar que el hospital exista
    await this.hospitalService.checkHospitalById(hospitalId);

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
    const newUser = await this.userService.createUser(user);

    const firstLogin = true;

    // Crear un nuevo Doctor
    await this.createDoctor(
      name,
      lastName,
      secondLastName,
      address,
      speciality,
      newUser.id,
      hospitalId,
      firstLogin
    );

    // Generar el token
    const token = getToken({ email, uuidCode });

    // Obtener un template
    const message = "Para confirmar tu cuenta";
    const link = "http://localhost:4000/api/v1/doctor/confirm/" + token;
    const linkName = "Confirmar Cuenta";

    const template = getTemplate(name, message, link, linkName);

    // Enviar el email
    await sendEmail(email, "Confirmación de registro de médico", template);
  }

  /* ******************************** */
  // Verificar si existe un médico con el mismo nombre completo
  async checkDoctorByFullName(name, lastName, secondLastName) {
    const doctor = await models.Doctor.findOne({
      where: { lastName: lastName, secondLastName: secondLastName },
    });

    if (doctor !== null && doctor.name === name) {
      throw new Error(
        "Ya existe un médico asociado con el mismo nombre, primer y segundo apellido"
      );
    }
  }

  /* ******************************** */
  // Crear hospital
  async createDoctor(
    name,
    lastName,
    secondLastName,
    address,
    speciality,
    newUserId,
    hospitalId,
    firstLogin
  ) {
    try {
      await models.Doctor.create({
        name,
        lastName,
        secondLastName,
        address,
        speciality,
        id_usuario: newUserId,
        id_hospital: hospitalId,
        first_login: firstLogin,
      });
    } catch (error) {
      throw new Error("No se ha podido crear el médico");
    }
  }

  /* ******************************** */
  // CONFIRMAR TOKEN DE REGISTRO DE MÉDICO
  async confirmToken(token) {
    await this.userService.confirmToken(token);
  }

  /* ******************************** */
  // LOGIN DE MÉDICO
  async signIn(data) {
    // Verificar credenciales del usuario y que haya confirmado el registro
    const user = await this.userService.checkUserConfirmationStatus(data);

    // Verificar y obtener los datos del médico
    const doctor = await this.checkDoctorByUserId(user.id);

    if (doctor.first_login) {
      return { redirect: true };
    }

    // Generar el token
    const token = getToken({
      id: user.id,
      identification: user.identification,
      email: user.email,
      phone: user.phone,
      name: doctor.name,
      lastName: doctor.lastName,
      secondLastName: doctor.secondLastName,
      address: doctor.address,
      birthdate: doctor.birthdate,
    });

    return { token };
  }

  // Verificar que exista el médico dado el id
  async checkDoctorById(doctorId) {
    const doctor = await models.Doctor.findOne({
      where: { id: doctorId },
    });
    if (doctor === null) {
      throw new Error("El médico NO existe");
    }
    return doctor;
  }

  /* ******************************** */
  // CAMBIO DE CONTRASEÑA DEL MÉDICO
  async changePassword(doctorId, data) {
    // Verificar y obtener los datos del médico
    const doctor = await this.checkDoctorById(doctorId);

    // Cambiar la contraseña
    await this.userService.changePassword(doctor.id_usuario, data);

    // Actualizar el primer inicio de sesión
    await this.updateFirstLogin(doctor, false);
  }

  /* ******************************** */
  // Verificar que exista el médico dado el id del usuario
  async checkDoctorByUserId(userId) {
    const doctor = await models.Doctor.findOne({
      where: { id_usuario: userId },
    });
    if (doctor === null) {
      throw new Error("El médico NO existe");
    }
    return doctor;
  }

  /* ******************************** */
  // Actualizar el estado de primer login
  async updateFirstLogin(doctor, status) {
    try {
      await doctor.update({ first_login: status });
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error en la actualización del estado de primer login"
      );
    }
  }

  /* ******************************** */
  // ENVIAR CORREO PARA RESTAURAR CONTRASEÑA DEL MÉDICO
  async restorePassword(data) {
    // Obtener el correo
    const { email } = data;

    // Verificar que el usuario exista
    const user = await this.userService.checkUserByEmail(email);

    // Verificar y obtener los datos de médico
    const doctor = await this.checkDoctorByUserId(user.id)

    // Generar el token
    const token = getToken({ email: user.email, uuidCode: user.uuid_code });

    // Obtener un template
    const message = "Para restablecer tu contraseña";
    const link =
      "http://localhost:4000/api/v1/doctor/submit-restore-password/" + token;
    const linkName = "Restablecer contraseña";

    const template = getTemplate(doctor.name, message, link, linkName);

    // Enviar el email
    await sendEmail(user.email, "Restablecer contraseña del médico", template);
  }

  /* ******************************** */
  // ENVIAR LOS DATOS DE RESTAURACIÓN DE CONTRASEÑA DEL MÉDICO
  async submitRestorePassword(token, data) {
    await this.userService.submitRestorePassword(token, data);
  }
}

module.exports = DoctorService;
