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

// 1. ABSOLUTE SIMPLEST CORS (Allows everything)
app.use(cors());

// 2. HEALTH CHECK (No Database needed)
app.get('/api/ping', (req, res) => res.json({ status: 'server-alive', cors: 'working' }));

// 3. Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// 4. Body parser
app.use(express.json());

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
