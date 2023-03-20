const nodemailer = require("nodemailer");
require("dotenv").config();

const mail = {
  service: "gmail", // host:"smtp.gmail.com, port: 587
  user: process.env.EMAIL,
  pass: process.env.PASS,
};

let transporter = nodemailer.createTransport({
  service: mail.service,
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `MediLogPortal <${mail.user}>`, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: html, // html body
    });
    console.log("Mensaje enviado con éxito");
  } catch (error) {
    console.log("Ha ocurrido un error: ", error);
  }
};

/* ******************************** */
// Template para el email
const getTemplate = (name, message, link, linkName) => {
  return ` 
        <div>
            <h2>Hola ${name}</h2>
            <p>${message}, ingresa al siguiente enlace</p>
            <a href="${link}" target="_blank">
              ${linkName}
            </a>
        </div>
        `;
};

module.exports = {
  sendEmail, getTemplate
};
