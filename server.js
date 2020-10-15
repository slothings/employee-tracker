// requires
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// sql server connection
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
});