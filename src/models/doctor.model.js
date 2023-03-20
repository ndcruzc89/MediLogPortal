const { Model, DataTypes } = require("sequelize");

const DOCTOR_TABLE = "medico";

class Doctor extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: DOCTOR_TABLE,
      modelName: "Doctor",
      timestamps: true,
    };
  }

  static associate(models) {
    Doctor.belongsTo(models.User, {
      foreignKey: {
        name: "id_usuario",
        allowNull: false,
      },
    });
    Doctor.belongsTo(models.Hospital, {
      foreignKey: {
        name: "id_hospital",
        allowNull: false,
      },
    });
    Doctor.hasMany(models.MedicalObservation, {
      foreignKey: {
        name: "id_medico",
        allowNull: false,
      },
    });
  }
}

const DoctorSchema = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    field: "nombre",
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(50),
    field: "primer_apellido",
    allowNull: false,
  },
  secondLastName: {
    type: DataTypes.STRING(50),
    field: "segundo_apellido",
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(100),
    field: "direccion",
    allowNull: false,
  },
  speciality: {
    type: DataTypes.STRING(100),
    field: "especialidad",
    allowNull: false,
  },
  first_login: {
    type: DataTypes.BOOLEAN,
    field: "primer_inicio_sesion",
    allowNull: false,
  },
};

module.exports = { Doctor, DoctorSchema };
