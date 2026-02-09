const express = require('express');
const router = express.Router();
const {
    markAttendance,
    getEmployeeAttendance,
    getAllAttendance
} = require('../controllers/attendanceController');

router.route('/')
    .post(markAttendance)
    .get(getAllAttendance);

router.route('/:employeeId')
    .get(getEmployeeAttendance);

module.exports = router;
