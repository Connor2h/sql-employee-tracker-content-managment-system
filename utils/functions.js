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
            viewAllEmployees();
        }

        else if (options.choice === 'Add a department'){
            addDepartment();
        }

        else if (options.choice === 'Add a role'){
            console.log("added a role");
            addRole();
        }

        else if (options.choice === 'Add an employee'){
            console.log('Add an employee is true');
        }

        else if (options.choice === 'Update an employee role'){
            console.log('Update an employee role is true');
        }
        
        else {
            leaveDatabase();
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

function viewAllEmployees (){
    const sql = `SELECT
                employee.id,
                employee.first_name, 
                employee.last_name,
                role.title,
                department.department_name AS department,
                role.salary,
                CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table('\n',rows, '\n');
        promptUser();// recursion to prompt the main question again
    });
}

// creates department and adds to database
function addDepartment (){

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add? (Required)',
            validate: name => {
                if(name){
                    return true
                }else{
                    console.log('Please enter a department!');
                    return false;
                }
            }
        }
    ]).then((choice) =>{
        
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        const params = [ choice.name ];
    
        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log('\n\n');// added new lines to space better
            promptUser();// recursion to prompt the main question again
        });
    })
}

//creates department and adds to database
function addRole (){

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the role you would like to add? (Required)',
            validate: name => {
                if(name){
                    return true
                }else{
                    console.log('Please enter a role!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role? (Required)',
            validate: salary => {
                if(isNaN(salary)){
                    console.log('\tPlease enter a salary number!');
                    return false
                }else{
                    console.log(`${salary} is a number`);
                    return true;
                }
            }
        },
    ]).then((answers) =>{
        //
        // console.log(name);
        // console.log(salary);

        this.answers = [answers.name, answers.salary];
        const params = [answers.name, answers.salary];
        
        //console.log(params);

        const roleSQL = `SELECT department_name, id FROM department`;//select department_name and id FROM THE department table

        db.query(roleSQL, (err, data) => {
            //console.log("I am consoling", this.answers);
            if (err) throw err;
            //console.log("this is the data", data);

            const department = data.map(({ department_name, id }) => ({ name: department_name, value: id }));
                                       //[{conner, 1}] => [{name: conner, value:1}]

            //console.log(department);

            inquirer.prompt([
                {
                    type: 'list', 
                    name: 'department',
                    message: "What department is this role in?",
                    choices: department
                }
            ]).then((departmentChoice) =>{
                // console.log(departmentChoice.department);
                const dept = departmentChoice.department;
                params.push(dept);

                // console.log(params);

                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log('\n\n');// added new lines to space better
                    promptUser();// recursion to prompt the main question again
                });

            })
        });

    })
}


// function addRole (){
//     //query db for all existing departments
//     //viewAllDepartment()
//     //.then()
//     //once your query has fired, make result into an arrray for department choices
//     //use a .map for ^

//     //once you have your department choice array
//     //prompt user for questions
//     // name of role
//     // salary price
//     // which department (using your newly made department array)
//     //.then use the "answer" to createRole()

//     // getDepartments();
//     // .then()



// }

function addEmployee (){

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add? (Required)',
            validate: name => {
                if(name){
                    return true
                }else{
                    console.log('Please enter a department!');
                    return false;
                }
            }
        }
    ]).then((choice) =>{
        
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        const params = [ choice.name ];
    
        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log('\n\n');// added new lines to space better
            promptUser();// recursion to prompt the main question again
        });
    })
}



function leaveDatabase(){
    console.log("Goodbye");
    db.end();
}

module.exports = {promptUser, viewAllDepartments};