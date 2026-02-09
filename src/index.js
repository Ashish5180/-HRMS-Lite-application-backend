const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// Connect to database function
const connectDB = async () => {
    const MONGODB_URI = "mongodb://ashishy8750_db_user:59GAnr7SlGKbYZ2L@cluster0.ptcp77y.mongodb.net/?appName=Cluster0";
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        console.log("Tip: If you see ENOTFOUND, your internet is blocking Atlas. Use a Mobile Hotspot.");
        // We don't exit(1) so the server stays alive to handle the CORS and show errors
    }
};

// Start Server Immediately
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    // Connect to DB after server starts
    connectDB();
});
