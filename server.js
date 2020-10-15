// requires
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// mysql server connection
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

// start function presenting options
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


    inquirer.prompt({
      
        type: "input",
        message: "What is the name of the department?",
        name: "departmentName"

    }).then(function(answer){



        connection.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            startScreen()
    })
    })
}