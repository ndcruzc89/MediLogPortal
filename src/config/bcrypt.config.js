const bcrypt = require('bcryptjs');

// Función para encriptar la contraseña
const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10); // Generar un salt aleatorio
  return bcrypt.hashSync(password, salt); // Encriptar la contraseña con el salt
};

// Función para comparar contraseñas encriptadas
const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword); // Devuelve true si las contraseñas son iguales, false en caso contrario
};

module.exports = {
    encryptPassword,
    comparePasswords
}