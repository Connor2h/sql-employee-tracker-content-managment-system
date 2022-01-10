const db = require('./db/connection');
const inquirer = require("inquirer");
const { promptUser, viewAllDepartments } = require('./utils/functions');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    promptUser();
});





