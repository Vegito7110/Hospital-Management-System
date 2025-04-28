// modules/packages
const express = require('express');
const router = express.Router();
const {getBillingTables, getBilling, postBilling,patchBilling,deleteBill} = require('../controllers/billing')
const {getCashier, getCashierTables,postCashier,patchCashier, deleteCashier}=require('../controllers/cashier')
const {getDoctorTables, getDoctor, postDoctor, patchDoctor, deleteDoctor} = require('../controllers/doctor');
const {getInPatient,getInPatientTables,postInPatient,patchInPatient,deleteInPatient}= require('../controllers/inpatient')
const {getOutPatientTables, getOutPatient, postOutPatient,patchOutPatient,deleteOutPatient} = require('../controllers/outpatient')
const {getRoomTables, getRoom, postRoom,patchRoom, deleteRoom} = require('../controllers/room')
const {getStaffTables, getStaff,postStaff,patchStaff, deleteStaff}= require('../controllers/staff')

// billing routes
router.route('/billing1').get(getBillingTables).post(postBilling)
router.route('/billing1/:id').get(getBilling).patch(patchBilling).delete(deleteBill)
// router.route('/billing2').get(getBilling)

// cashier routes
router.route('/cashier1').get(getCashierTables).post(postCashier)
router.route('/cashier1/:id').get(getCashier).patch(patchCashier).delete(deleteCashier)
// router.route('/cashier2').get(getCashier)

// doctor routes
router.route('/doctor1').get(getDoctorTables).post(postDoctor)
router.route('/doctor1/:id').get(getDoctor).patch(patchDoctor).delete(deleteDoctor)
// router.route('/doctor2').get(getDoctor)

// inpatient routes
router.route('/inpatient1').get(getInPatientTables).post(postInPatient)
router.route('/inpatient1/:id').get(getInPatient).patch(patchInPatient).delete(deleteInPatient)
// router.route('/inpatient2').get(getInPatient)

// outpatient routes
router.route('/outpatient1').get(getOutPatientTables).post(postOutPatient)
router.route('/outpatient1/:id').get(getOutPatient).patch(patchOutPatient).delete(deleteOutPatient)
// router.route('/outpatient2').get(getOutPatient)

// room routes
router.route('/room1').get(getRoomTables).post(postRoom)
router.route('/room1/:id').get(getRoom).patch(patchRoom).delete(deleteRoom)
// router.route('/room2').get(getRoom)

// staff routes
router.route('/staff1').get(getStaffTables).post(postStaff)
router.route('/staff1/:id').get(getStaff).patch(patchStaff).delete(deleteStaff)
// router.route('/staff2').get(getStaff)

//exports
module.exports = router;