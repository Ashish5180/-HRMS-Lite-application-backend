const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

// Route files
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

// Load env vars
dotenv.config();

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('HRMS Lite API is running...');
});

// Error handler
app.use(errorHandler);

module.exports = app;
