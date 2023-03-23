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
        
        password: 'Meatbutter30!',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);



function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'EMPLOYEE MANAGER\n What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments',
                    'Add Department', 'Quit'],
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
                // short on time so skipping this one 
                //case 'Update Employee Role':
                //    updateRole();
                //    break;
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

            const sql = `INSERT INTO department (name) VALUES (?)`;
            const params = [response.name];

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log(`Added ${params} to the database`);
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

                const departmentName = dep.find((department) => department.name === response.department);
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                const params = [response.title, response.salary, departmentName.id];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log(`Added ${response.title} to the database`);
                    menu();
                })
            })
    })
}

function addEmployee() {
    db.query('SELECT * FROM role', (err, rol) => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first',
                    message: 'What is the first name of the employee? ',
                },
                {
                    type: 'input',
                    name: 'last',
                    message: 'What is the last name of the employee? ',
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the employees role? ',
                    choices: rol.map((role) => role.title),
                },
                // getting short on time so skipped this part since i was having trouble with it
                //{
                //    type: 'list',
                //    name: 'manager',
                //    message: 'Who is their manager? ',
                //   choices: emp.map((manager) => manager.name),
                // },
            ])
            .then((response) => {

                const roleName = rol.find((role) => role.title === response.role);
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                // using 1 as default manager id value since i ran out of time to figure that part of the function out
                const params = [response.first, response.last, roleName.id, 1];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log(`Added ${response.first} ${response.last} to the database`);
                    menu();
                })
            })
    })
}



menu();

// short on time so skipping this function
// function updateRole
