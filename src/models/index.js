const { User, UserSchema } = require("./user.model");
const { Patient, PatientSchema } = require("./patient.model");
const { Hospital, HospitalSchema } = require("./hospital.model");
const { Doctor, DoctorSchema } = require("./doctor.model");
const {
  MedicalObservation,
  MedicalObservationSchema,
} = require("./medicalObservation.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Patient.init(PatientSchema, Patient.config(sequelize));
  Hospital.init(HospitalSchema, Hospital.config(sequelize));
  Doctor.init(DoctorSchema, Doctor.config(sequelize));
  MedicalObservation.init(
    MedicalObservationSchema,
    MedicalObservation.config(sequelize)
  );

  // Asociaciones entre modelos
  User.associate({ Patient, Hospital, Doctor });
  Patient.associate({ User, MedicalObservation });
  Hospital.associate({ User, Doctor, MedicalObservation });
  Doctor.associate({ User, Hospital, MedicalObservation });
  MedicalObservation.associate({ Patient, Hospital, Doctor });
}

module.exports = setupModels;
