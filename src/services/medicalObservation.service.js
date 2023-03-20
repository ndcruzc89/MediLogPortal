const { models } = require("../libs/sequelize");
const UserService = require("./user.service");
const PatientService = require("./patient.service");
const HospitalService = require("./hospital.service");
const DoctorService = require("./doctor.service");
const PDFDocument = require("pdfkit");
const fs = require("fs");

class MedicalObservationService {
  constructor() {
    this.userService = new UserService();
    this.patientService = new PatientService();
    this.hospitalService = new HospitalService();
    this.doctorService = new DoctorService();
  }

  /* ******************************** */
  // OBTENER EL LISTADO DE ORDENES MÉDICAS DEL PACIENTE
  async getPatientObservations(patientId) {
    const medicalObservations = await this.medicalObservationsByPatient(
      patientId
    );

    return await this.getMedicalObservations(medicalObservations);
  }

  /* ******************************** */
  // Obtener las ordenes médicas asociadas al paciente
  async medicalObservationsByPatient(patientId) {
    const medicalObservations = await models.MedicalObservation.findAll({
      where: { id_paciente: patientId },
    });

    if (medicalObservations === null) {
      throw new Error("No existen ordenes médicas asociadas al paciente");
    }

    return medicalObservations;
  }

  /* ******************************** */
  // OBTENER EL LISTADO DE ORDENES MÉDICAS DEL HOSPITAL
  async getHospitalObservations(hospitalId) {
    const medicalObservations = await this.medicalObservationsByHospital(
      hospitalId
    );

    return await this.getMedicalObservations(medicalObservations);
  }

  /* ******************************** */
  // Obtener las ordenes médicas asociadas al hospital
  async medicalObservationsByHospital(hospitalId) {
    const medicalObservations = await models.MedicalObservation.findAll({
      where: { id_hospital: hospitalId },
    });

    if (medicalObservations === null) {
      throw new Error("No existen ordenes médicas asociadas al hospital");
    }

    return medicalObservations;
  }

  /* ******************************** */
  // OBTENER EL LISTADO DE ORDENES MÉDICAS QUE HAN SIDO GENERADAS POR EL MÉDICO
  async getDoctorObservations(doctorId) {
    const medicalObservations = await this.medicalObservationsByDoctor(
      doctorId
    );

    return await this.getMedicalObservations(medicalObservations);
  }

  /* ******************************** */
  // Obtener las ordenes médicas asociadas al médico
  async medicalObservationsByDoctor(doctorId) {
    const medicalObservations = await models.MedicalObservation.findAll({
      where: { id_medico: doctorId },
    });

    if (medicalObservations === null) {
      throw new Error("No existen ordenes médicas asociadas al médico");
    }

    return medicalObservations;
  }

  /* ******************************** */
  // Obtener las ordenes médicas para el paciente, hospital o médico
  async getMedicalObservations(medicalObservations) {
    const observations = [];

    for (const medicalObservation of medicalObservations) {
      const patient = await this.patientService.checkPatientById(
        medicalObservation.id_paciente
      );

      const user = await this.userService.checkUserById(patient.id_usuario);

      const hospital = await this.hospitalService.checkHospitalById(
        medicalObservation.id_hospital
      );
      const doctor = await this.doctorService.checkDoctorById(
        medicalObservation.id_medico
      );

      const observation = {
        patientId: patient.id,
        patientName: patient.name,
        patientLastName: patient.lastName,
        patientSecondLastName: patient.secondLastName,
        patientBirthdate: patient.birthdate,
        userIdentification: user.identification,
        userEmail: user.email,
        userPhone: user.phone,
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorLastName: doctor.lastName,
        doctorSecondLastName: doctor.secondLastName,
        doctorSpeciality: doctor.speciality,
        observationId: medicalObservation.id,
        observationDate: medicalObservation.observation_date,
        observationDetail: medicalObservation.observation_detail,
      };

      observations.push(observation);
    }

    return observations;
  }

  /* ******************************** */
  // CREAR LA OBSERVACIÓN MÉDICA
  async createObservation(data) {
    // Obtener los datos
    const {
      patientId,
      hospitalId,
      doctorId,
      observationDate,
      observationDetail,
    } = data;

    // Verificar que exista el paciente
    await this.patientService.checkPatientById(patientId);

    // Verificar que exista el hospital
    await this.hospitalService.checkHospitalById(hospitalId);

    // Verificar que exista el médico
    await this.doctorService.checkDoctorById(doctorId);

    // Crear una nueva observación médica
    await this.createMedicalObservation(
      observationDate,
      observationDetail,
      patientId,
      hospitalId,
      doctorId
    );
  }

  /* ******************************** */
  // Crear observación
  async createMedicalObservation(
    observationDate,
    observationDetail,
    patientId,
    hospitalId,
    doctorId
  ) {
    try {
      await models.MedicalObservation.create({
        observation_date: observationDate,
        observation_detail: observationDetail,
        id_paciente: patientId,
        id_hospital: hospitalId,
        id_medico: doctorId,
      });
    } catch (error) {
      throw new Error("No se ha podido crear la observación médica");
    }
  }

  /* ******************************** */
  // DESCARGAR TODAS LAS OBSERVACIONES MÉDICAS DEL PACIENTE
  async downloadObservations(patientId) {
    try {
      const observations = await this.getPatientObservations(patientId);
      const doc = new PDFDocument();
      const patientInfo = observations[0];
      if (!patientInfo) {
        throw new Error("No existen observaciones médicas asociadas a ese id");
      }
      const chunks = [];
      doc.on("data", (chunk) => {
        chunks.push(chunk);
      });

      let page = 1;

      for (let i = 0; i < observations.length; i++) {
        const observation = observations[i];
        const observationDate = new Date(observation.observationDate);
        const formattedDate = observationDate
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "");
        doc
          .fontSize(18)
          .font("Times-Bold")
          .text(`Observación Médica #${i + 1}`, {
            align: "center",
          });

        doc
          .fontSize(12)
          .text(
            "---------------------------------------------------------------------------------------------------------------------",
            {
              align: "center",
            }
          );

        doc.moveDown();
        doc
          .font("Times-Bold")
          .text("Página: ", 335, 110, { continued: true, align: "left" })
          .font("Times-Roman")
          .text(`${page}`);
        doc
          .font("Times-Bold")
          .text("Fecha de atención: ", { continued: true, align: "left" })
          .font("Times-Roman")
          .text(`${formattedDate}`);

        doc.text(
          "---------------------------------------------------------------------------------------------------------------------",
          70,
          140,
          {
            align: "center",
          }
        );
        doc.moveDown();
        doc
          .font("Times-Bold")
          .text("Paciente: ", 70, 160, { continued: true, align: "left" })
          .font("Times-Roman")
          .text(
            `${observation.patientName} ${observation.patientLastName} ${observation.patientSecondLastName}`
          );
        doc
          .font("Times-Bold")
          .text("Identificación: ", { continued: true, align: "left" })
          .font("Times-Roman")
          .text(`${observation.userIdentification}`);
        doc
          .font("Times-Bold")
          .text("Email: ", { continued: true, align: "left" })
          .font("Times-Roman")
          .text(`${observation.userEmail}`);
        doc
          .font("Times-Bold")
          .text("Teléfono: ", { continued: true, align: "left" })
          .font("Times-Roman")
          .text(`${observation.userPhone}`);
        doc
          .font("Times-Bold")
          .text("Fecha de Nacimiento: ", {
            continued: true,
            align: "left",
          })
          .font("Times-Roman")
          .text(`${observation.patientBirthdate}`);

        doc
          .font("Times-Bold")
          .text("Hospital: ", 335, 160, { continued: true, align: "left" })
          .font("Times-Roman")
          .text(`${observation.hospitalName}`);
        doc
          .font("Times-Bold")
          .text("Médico: ", { continued: true, align: "left" })
          .font("Times-Roman")
          .text(
            `${observation.doctorName} ${observation.doctorLastName} ${observation.doctorSecondLastName}`
          );
        doc
          .font("Times-Bold")
          .text("Especialidad: ", { continued: true, align: "left" })
          .font("Times-Roman")
          .text(`${observation.doctorSpeciality}`);

        doc.text(
          "---------------------------------------------------------------------------------------------------------------------",
          70,
          230,
          {
            align: "center",
          }
        );

        doc.moveDown();

        doc
          .font("Times-Bold")
          .text("Detalle de la observación médica: ", { align: "left" });
        doc.font("Times-Roman").text(`${observation.observationDetail}`);

        if (i !== observations.length - 1) {
          doc.addPage();
          page++;
        }
      }

      await new Promise((resolve, reject) => {
        doc.end();
        doc.on("end", () => {
          resolve();
        });
        doc.on("error", (err) => {
          reject(err);
        });
      });

      const result = Buffer.concat(chunks);
      const dir = `./pdf`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFileSync(
        `${dir}/ObservacionesMedicas_${patientInfo.patientName}${patientInfo.patientLastName}.pdf`,
        result
      );
      return `/pdf/ObservacionesMedicas_${patientInfo.patientName}${patientInfo.patientLastName}.pdf`;
    } catch (error) {
      throw new Error(
        "Ha ocurrido una falla y no se ha podido completar la descarga"
      );
    }
  }
}

module.exports = MedicalObservationService;
