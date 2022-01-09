const db = require('./db/connection');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});