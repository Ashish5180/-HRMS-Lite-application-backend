const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// Connect to database function
const connectDB = async () => {
    // Priority: env variable > hardcoded fallback (for quick fixes)
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ashishy8750_db_user:59GAnr7SlGKbYZ2L@cluster0.ptcp77y.mongodb.net/?appName=Cluster0";

    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        console.log("Tip: If you see ENOTFOUND, ensure your connection string uses 'mongodb+srv://' for Atlas clusters.");
    }
};

// Start Server Immediately
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    // Connect to DB after server starts
    connectDB();
});
