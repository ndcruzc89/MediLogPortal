const { Model, DataTypes } = require("sequelize");

const { User } = require("./user.model");

const PATIENT_TABLE = "paciente";

class Patient extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: PATIENT_TABLE,
      modelName: "Patient",
      timestamps: true,
      inheritance: User,
    };
  }

  static associate(models) {
    Patient.belongsTo(models.User, {
      foreignKey: {
        name: "id_usuario"
      },
    });

    Patient.hasMany(models.MedicalObservation, {
      foreignKey: {
        name: "id_paciente",
        allowNull: false,
      },
    });
  }
}

const PatientSchema = {
  id_usuario: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    references: {
      model: User,
      key: "id",
    },
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
  birthdate: {
    type: DataTypes.DATEONLY,
    field: "fecha_nacimiento",
    allowNull: false,
  },
};

module.exports = { Patient, PatientSchema };
