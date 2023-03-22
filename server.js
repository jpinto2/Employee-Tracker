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
            type: 'list',
            name: 'choice',
            message: 'EMPLOYEE MANAGER\n What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments',
                'Add Department','Quit'],
        },
    ])
        .then(function (response) {
            switch (response.choice) {
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

function viewEmployees() {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        console.table(result);
        menu();
    })
}

function viewRoles() {
    db.query('SELECT * FROM role', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        console.table(result)
        menu();
    })
}

function viewDepartments() {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        console.table(result)
        menu();
    })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the new department?',
            },
        ])
        .then((response) => {

            const sql = `INSERT INTO departments (department_name) VALUES (?)`;
            const params = [response.name];

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log(`Added ${res.departmentName} to the database`);
                menu();
            })
        })
}

function addRole() {
    db.query('SELECT * FROM department', (err, dep) => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the name of the new role? ',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role? ',
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department does the role belong to? ',
                    choices: dep.map((department) => department.name),
                },
            ])
            .then((response) => {

                const departmentName = dep.find((department) => department.name === data.department);
                const sql = `INSERT INTO roles (department_id, title, salary) VALUES (?, ?, ?)`;
                const params = [departmentName.id, response.title, ressponse.salary];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log(`Added ${res.roleTitle} to the database`);
                    menu();
                })
            })
    })
}
