const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// Connect to database function
const connectDB = async () => {
    // Atlas connection strings work best with retryWrites and w=majority
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ashishy8750_db_user:59GAnr7SlGKbYZ2L@cluster0.ptcp77y.mongodb.net/HRMS?retryWrites=true&w=majority";

    // Monitor connection events to debug timeouts
    mongoose.connection.on('connecting', () => console.log('⏳ Connecting to MongoDB...'));
    mongoose.connection.on('connected', () => console.log('✅ Mongoose Connected'));
    mongoose.connection.on('error', (err) => console.error('❌ Mongoose Connection Error:', err));

    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Fail fast (5s) instead of 30s
        });
    } catch (error) {
        console.error(`❌ Initial Database Connection Error: ${error.message}`);
    }
};

// Start Server Immediately
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    // Connect to DB after server starts
    connectDB();
});
