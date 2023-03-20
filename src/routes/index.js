const express = require('express');

const patientRouter = require('./patient.router');
const hospitalRouter = require('./hospital.router');
const doctorRouter = require('./doctor.router');
const medicalObservationRouter = require('./medicalObservation.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/patient', patientRouter);
    router.use('/hospital', hospitalRouter);
    router.use('/doctor', doctorRouter);
    router.use('/medical-observations', medicalObservationRouter);
}

module.exports = routerApi;