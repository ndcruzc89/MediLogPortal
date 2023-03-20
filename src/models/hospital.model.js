const { Model, DataTypes } = require("sequelize");

const { User } = require("./user.model");

const HOSPITAL_TABLE = "hospital";

class Hospital extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: HOSPITAL_TABLE,
      modelName: "Hospital",
      timestamps: true,
      inheritance: User,
    };
  }

  static associate(models) {
    Hospital.belongsTo(models.User, {
      foreignKey: {
        name: "id_usuario",
      },
    });
    Hospital.hasMany(models.Doctor, {
      foreignKey: {
        name: "id_hospital",
        allowNull: false,
      },
    });
    Hospital.hasMany(models.MedicalObservation, {
      foreignKey: {
        name: "id_hospital",
        allowNull: false,
      },
    });
  }
}

const HospitalSchema = {
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
  address: {
    type: DataTypes.STRING(100),
    field: "direccion",
    allowNull: false,
  },
  medical_services: {
    type: DataTypes.STRING(400),
    field: "servicios_medicos",
    allowNull: false,
  },
};

module.exports = { Hospital, HospitalSchema };
