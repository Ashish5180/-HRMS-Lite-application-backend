const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
    addEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

// Basic validation middleware
const validate = (req, res, next) => {
    const { employeeId, fullName, email, department } = req.body;
    if (!employeeId || !fullName || !email || !department) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }
    // Basic email validation
    const emailRegex = /^\w+([-.]?\w+)*@\w+([-.]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }
    next();
};

router.route('/')
    .post(validate, addEmployee)
    .get(getEmployees);

router.route('/:id')
    .put(updateEmployee)
    .delete(deleteEmployee);

module.exports = router;
