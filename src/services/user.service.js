const { models } = require("../libs/sequelize");
const { encryptPassword, comparePasswords } = require("../config/bcrypt.config");
const { getTokenData } = require("../config/jwt.config");

class UserService {
  constructor() {}

  /* ******************************** */
  // Verificar que no haya un usuario con la misma identificación
  async checkIdentification(identification) {
    const user = await models.User.findOne({
      where: { identification },
    });

    if (user !== null) {
      throw new Error("Ya existe un usuario asociado a esta identificación");
    }
  }

  /* ******************************** */
  // Verificar que no hay un usuario con el mismo correo
  async checkEmail(email) {
    const user = await models.User.findOne({ where: { email } });

    if (user !== null) {
      throw new Error("Ya existe un usuario asociado a este email");
    }
  }

  /* ******************************** */
  // Crear el usuario
  async createUser(data) {
    try {
      return await models.User.create(data);
    } catch (error) {
      throw new Error("No se ha podido crear el usuario");
    }
  }

  /* ******************************** */
  // Verificar que exista el usuario, dado el Email y el Código
  async checkUserByEmailAndCode(email, uuidCode) {
    const user = await models.User.findOne({
      where: { email, uuid_code: uuidCode },
    });
    if (user === null) {
      throw new Error("El usuario NO existe");
    }
    return user;
  }

  /* ******************************** */
  // Actualizar la confirmación de registro del usuario
  async updateRegistrationConfirmation(user) {
    try {
      await user.update({ registration_confirmation: true });
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error al actualizar el estado de la confirmación de registro"
      );
    }
  }

  /* ******************************** */
  // Verificar las credenciales del usuario (identificación y password)
  async checkUserByIdentificationAndPassword(identification, password) {
    const user = await this.checkUserByIdentification(identification);

    await this.checkUserByPassword(password, user);

    return user;
  }

  /* ******************************** */
  // Verificar que exista el usuario por Id y que la contraseña sea correcta
  async checkUserByIdAndPassword(userId, password) {
    const user = await this.checkUserById(userId);

    await this.checkUserByPassword(password, user);

    return user;
  }

  // Verificar que exista el usuario dado el Id
  async checkUserById(userId) {
    const user = await models.User.findOne({
      where: { id: userId },
    });

    if (user === null) {
      throw new Error("No se encontró ningún usuario con este id");
    }

    return user;
  }

  // Verificar que exista el usuario por Identificación
  async checkUserByIdentification(identification) {
    const user = await models.User.findOne({
      where: { identification },
    });

    if (user === null) {
      throw new Error("No se encontró ningún usuario con esta identificación");
    }
    return user;
  }

  // Verificar que la contraseña sea correcta
  async checkUserByPassword(password, user) {
    const match = comparePasswords(password, user.password);

    if (!match) {
      throw new Error("Contraseña incorrecta");
    }
  }

  /* ******************************** */
  // Actualizar la contraseña del usuario
  async updatePassword(user, newPassword) {
    try {
      await user.update({ password: newPassword });
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error en la actualización de la contraseña del usuario"
      );
    }
  }

  /* ******************************** */
  // Verificar que exista el usuario dado el email
  async checkUserByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });
    if (user === null) {
      throw new Error("El usuario NO existe");
    }
    return user;
  }

  /* ******************************** */
  // Confirmar el token
  async confirmToken(token) {
    // Verificar y obtener los datos del token
    const data = await this.checkTokenData(token);

    // Verificar existencia del usuario a través del email y uuid del token
    const { email, uuidCode } = data.data;
    const user = await this.checkUserByEmailAndCode(email, uuidCode);

    // Actualizar confirmación de registro de usuario
    await this.updateRegistrationConfirmation(user);
  }

  /* ******************************** */
  // Verificar token
  async checkTokenData(token) {
    const data = await getTokenData(token);

    if (data === null) {
      throw new Error("Error al obtener la data del token");
    }
    return data;
  }

  /* ******************************** */
  // Verificar que el usuario exista y haya confirmado el registro
  async checkUserConfirmationStatus(data) {
    // Obtener el email y password
    const { identification, password } = data;

    // Verificar que el usuario exista
    const user = await this.checkUserByIdentificationAndPassword(
      identification,
      password
    );

    // Verificar que el usuario haya confirmado el registro
    if (!user.registration_confirmation) {
      throw new Error("El usuario debe confirmar su registro");
    }

    return user;
  }

  /* ******************************** */
  // Cambiar la contraseña de usuario
  async changePassword(userId, data) {
    // Obtener la contraseña actual y la nueva contraseña
    const { password, newPassword } = data;

    // Verificar que la nueva contraseña no se igual a la contraseña antigua
    if (newPassword === password) {
      throw new Error("La nueva contraseña no puede ser igual a la anterior");
    }

    // Verificar que el usuario exista
    const user = await this.checkUserByIdAndPassword(userId, password);

    // Encriptar la nueva contraseña
    const hashedPassword = encryptPassword(newPassword);

    //Actualizar la contraseña
    await this.updatePassword(user, hashedPassword);
  }

  /* ******************************** */
  // Datos para cambiar la contraseña del usuario
  async submitRestorePassword(token, data) {
    // Obtener los datos
    const { newPassword } = data;

    // Verificar y obtener los datos del token
    const tokenData = await this.checkTokenData(token);

    // Verificar existencia del usuario a través del email y uuid del token
    const { email, uuidCode } = tokenData.data;
    const user = await this.checkUserByEmailAndCode(email, uuidCode);

    // Encriptar la nueva contraseña
    const hashedPassword = encryptPassword(newPassword);

    //Actualizar la contraseña
    await this.updatePassword(user, hashedPassword);
  }
}

module.exports = UserService;
