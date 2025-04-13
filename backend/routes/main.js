// modules/packages
const express = require('express');
const router = express.Router();
const {getDoctorTables, getDoctor} = require('../controllers/main');

//routes
router.route('/doctor1').get(getDoctorTables)
router.route('/doctor2').get(getDoctor)
// router.route('/patients').get().post()

//exports
module.exports = router;