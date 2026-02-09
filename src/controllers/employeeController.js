const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');

// @desc    Add a new employee
// @route   POST /api/employees
exports.addEmployee = async (req, res, next) => {
    try {
        const { employeeId, fullName, email, department } = req.body;

        // Check if employeeId or email already exists
        const existingEmployee = await Employee.findOne({ $or: [{ employeeId }, { email }] });
        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                message: 'Employee ID or Email already exists'
            });
        }

        const employee = await Employee.create({
            employeeId,
            fullName,
            email,
            department
        });

        res.status(201).json({
            success: true,
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all employees (with optional search)
// @route   GET /api/employees
exports.getEmployees = async (req, res, next) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { fullName: { $regex: search, $options: 'i' } },
                    { employeeId: { $regex: search, $options: 'i' } },
                    { department: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const employees = await Employee.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
exports.deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        // Delete associated attendance records
        await Attendance.deleteMany({ employee: req.params.id });

        // Use deleteOne() instead of remove() as remove() may be deprecated or behave differently
        await Employee.deleteOne({ _id: req.params.id });

        res.status(200).json({
            success: true,
            message: 'Employee and their attendance records deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
