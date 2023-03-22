// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'Meatbutter30!',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

function menu() {
    inquirer
    prompt([
        {
            name: 'prompt',
            type: 'list',
            message: 'EMPLOYEE MANAGER\n What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments',
                'Add Department','Quit'],
        },
    ])
        .then(function (response) {
            switch (response.prompt) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateRole();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Quit':
                    db.end()
                    break;
            }
        })
}

