// requires
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// server connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "sloth13",
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    startScreen();
});

// start function
function startScreen() {
    inquirer
        .prompt({
            type: "list",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View departments",
                "View roles",
                "View employees",
                "Update employee role",
                "Quit"
            ],
            message: "What would you like to do?",
            name: "option"
        })
        .then(function (result) {
            console.log("You entered: " + result.option);

            switch (result.option) {
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "View departments":
                    viewDepartment();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "View employees":
                    viewEmployees();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                default:
                    quit();
            }
        });
}

// add department
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "What is the name of the department?",
            name: "departmentName"
        })
        .then(function (answer) {
            connection.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName], function (err, res) {
                if (err) throw err;
                console.table(res)
                startScreen();
            })
        })
}

// add role
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the name of the role?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "salaryTotal"
            },
            {
                type: "input",
                message: "What is the department id number?",
                name: "deptID"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function (err, res) {
                if (err) throw err;
                console.table(res);
                startScreen();
            });
        });
}

// add employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the first name of the employee?",
                name: "employeeFirstName"
            },
            {
                type: "input",
                message: "What's the last name of the employee?",
                name: "employeeLastName"
            },
            {
                type: "input",
                message: "What is the employee's role id number?",
                name: "roleID"
            },
            {
                type: "input",
                message: "What is the manager id number?",
                name: "managerID"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.employeeFirstName, answer.employeeLastName, answer.roleID, answer.managerID], function (err, res) {
                if (err) throw err;
                console.table(res);
                startScreen();
            });
        });
}

// update employee
function updateEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which employee would you like to update?",
                name: "employeeUpdate"
            },
            {
                type: "input",
                message: "What do you want to update to?",
                name: "updateRole"
            }
        ])
        .then(function (answer) {
            connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.employeeUpdate], function (err, res) {
                if (err) throw err;
                console.table(res);
                startScreen();
            });
        });
}