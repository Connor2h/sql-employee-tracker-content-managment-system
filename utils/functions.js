const db = require('../db/connection')
const inquirer = require('inquirer');
const cTable = require('console.table');

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
            viewAllDepartments();
        }

        else if (options.choice === 'View all roles'){
            viewAllRoles();
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
        }
        
        else {
            console.log('Leave the Database is true');
        }
    })
}

function viewAllDepartments (){
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table('\n',rows, '\n');
        promptUser();// recursion to prompt the main question again
    });
}

function viewAllRoles (){
    // const sql = `SELECT role.*, department.department_name 
    //             AS department
    //             FROM role
    //             LEFT JOIN department
    //             ON role.department_id = department.id;`
    const sql = `SELECT role.id, role.title, role.salary, department.department_name 
                AS department
                FROM role
                LEFT JOIN department
                ON role.department_id = department.id;`
                ;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table('\n',rows, '\n');
        promptUser();// recursion to prompt the main question again
    });
}

module.exports = {promptUser, viewAllDepartments};