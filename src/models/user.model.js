const { Model, DataTypes } = require("sequelize");

const USER_TABLE = "usuario";

class User extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: true,
    };
  }
  static associate(models) {
    User.hasOne(models.Patient, {
      foreignKey: {
        name: "id_usuario",
      },
    });

    User.hasOne(models.Hospital, {
      foreignKey: {
        name: "id_usuario",
      },
    });

    User.hasOne(models.Doctor, {
      foreignKey: {
        name: "id_usuario",
        allowNull: false,
      },
    });
  }
}

const UserSchema = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  identification: {
    type: DataTypes.STRING(20),
    field: "identificacion",
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(50),
    field: "email",
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    field: "telefono",
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    field: "contrasena",
    allowNull: false,
  },
  uuid_code: {
    type: DataTypes.STRING(50),
    field: "codigo_uuid",
    allowNull: false,
  },
  registration_confirmation: {
    type: DataTypes.BOOLEAN,
    field: "confirmacion_registro",
    allowNull: false,
  },
};

module.exports = { User, UserSchema };
