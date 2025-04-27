// modules/packages
const express = require('express');
const router = express.Router();
const {getDoctorTables, getDoctor, postDoctor, patchDoctor, deleteDoctor} = require('../controllers/doctor');
const {getBillingTables, getBilling} = require('../controllers/billing')
const {getCashier, getCashierTables}=require('../controllers/cashier')
const {getInPatient,getInPatientTables}= require('../controllers/inpatient')
const {getOutPatientTables, getOutPatient} = require('../controllers/outpatient')
const {getRoomTables, getRoom} = require('../controllers/room')
const {getStaffTables, getStaff}= require('../controllers/staff')

// billing routes
router.route('/billing1').get(getBillingTables)
router.route('/billing2').get(getBilling)

// cashier routes
router.route('/cashier1').get(getCashierTables)
router.route('/cashier2').get(getCashier)

// doctor routes
router.route('/doctor1').get(getDoctorTables).post(postDoctor).patch(patchDoctor).delete(deleteDoctor)
router.route('/doctor2').get(getDoctor)

// inpatient routes
router.route('/inpatient1').get(getInPatientTables)
router.route('/inpatient2').get(getInPatient)

// outpatient routes
router.route('/outpatient1').get(getOutPatientTables)
router.route('/outpatient2').get(getOutPatient)

// room routes
router.route('/room1').get(getRoomTables)
router.route('/room2').get(getRoom)

// staff routes
router.route('/staff1').get(getStaffTables)
router.route('/staff2').get(getStaff)

//exports
module.exports = router;