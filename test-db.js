const mongoose = require('mongoose');

// The string we are testing
const MONGODB_URI = "mongodb+srv://ashishy8750_db_user:59GAnr7SlGKbYZ2L@cluster0.ptcp77y.mongodb.net/HRMS?retryWrites=true&w=majority";

console.log('--- Database Diagnostic Test ---');
console.log('Connecting to:', MONGODB_URI.replace(/:([^@]+)@/, ':****@')); // Hide password

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('✅ SUCCESS: Connected successfully from local machine!');
        console.log('This means the credentials and IP whitelist for your CURRENT IP are correct.');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ FAILED: Connection error:');
        console.error(err.message);
        if (err.message.includes('ENOTFOUND')) {
            console.log('\nPossible Cause: DNS issue. Check if you are on a VPN or Restricted Network.');
        } else if (err.message.includes('ETIMEDOUT')) {
            console.log('\nPossible Cause: Firewall or IP Whitelist. MongoDB Atlas is blocking this connection.');
        } else if (err.message.includes('Authentication failed')) {
            console.log('\nPossible Cause: Wrong username or password.');
        }
        process.exit(1);
    });
