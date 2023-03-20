const { Model, DataTypes } = require("sequelize");

const MEDICAL_OBSERVATION_TABLE = "observacion_medica";

class MedicalObservation extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: MEDICAL_OBSERVATION_TABLE,
      modelName: "MedicalObservation",
      timestamps: true,
    };
  }

  static associate(models) {
    MedicalObservation.belongsTo(models.Patient, {
      foreignKey: {
        name: "id_paciente",
        allowNull: false,
      },
    });
    MedicalObservation.belongsTo(models.Hospital, {
      foreignKey: {
        name: "id_hospital",
        allowNull: false,
      },
    });
    MedicalObservation.belongsTo(models.Doctor, {
      foreignKey: {
        name: "id_medico",
        allowNull: false,
      },
    });
  }
}

const MedicalObservationSchema = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  observation_date: {
    type: DataTypes.DATE,
    field: "fecha_observacion",
    allowNull: false,
  },
  observation_detail: {
    type: DataTypes.STRING(800),
    field: "detalle_observacion",
    allowNull: false,
  }
};

module.exports = { MedicalObservation, MedicalObservationSchema };
