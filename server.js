const db = require('./db/connection');
const inquirer = require("inquirer");

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    promptUser();
});

const promptUser = () => {
    console.log('Database connected.');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Leave the Database']
        }
    ]).then((options) =>{

        if (options.choice === 'View all departments'){
            console.log('View all departments is true');
        }
        else if (options.choice === 'View all roles'){
            console.log('View all roles is true');
        }
        else if (options.choice === 'View all employees'){
            console.log('View all employees is true');
        }
        else if (options.choice === 'Add a department'){
            console.log('Add a department is true');
        }
        else if (options.choice === 'Add a role'){
            console.log('Add a role is true');
        }
        else if (options.choice === 'Add an employee'){
            console.log('Add an employee is true');
        }
        else if (options.choice === 'Update an employee role'){
            console.log('Update an employee role is true');
        } else {
            console.log('Leave the Database is true');
        }
    })
}