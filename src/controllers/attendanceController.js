const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// @desc    Mark attendance
// @route   POST /api/attendance
exports.markAttendance = async (req, res, next) => {
    try {
        const { employeeId, date, status } = req.body;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        // Normalize date to YYYY-MM-DD
        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

        // Check if attendance already exists for this day
        let attendance = await Attendance.findOne({
            employee: employeeId,
            date: attendanceDate
        });

        if (attendance) {
            attendance.status = status;
            await attendance.save();
        } else {
            attendance = await Attendance.create({
                employee: employeeId,
                date: attendanceDate,
                status
            });
        }

        res.status(200).json({
            success: true,
            data: attendance
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get attendance for an employee
// @route   GET /api/attendance/:employeeId
exports.getEmployeeAttendance = async (req, res, next) => {
    try {
        const attendance = await Attendance.find({ employee: req.params.employeeId })
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: attendance.length,
            data: attendance
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all attendance records (optional bonus)
// @route   GET /api/attendance
exports.getAllAttendance = async (req, res, next) => {
    try {
        const { date } = req.query;
        let query = {};

        if (date) {
            const searchDate = new Date(date);
            searchDate.setHours(0, 0, 0, 0);
            query.date = searchDate;
        }

        const attendance = await Attendance.find(query)
            .populate('employee', 'fullName employeeId')
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: attendance.length,
            data: attendance
        });
    } catch (error) {
        next(error);
    }
};
