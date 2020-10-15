INSERT INTO department (name)
VALUES ("Human Resources"), ("Engineering"), ("Accounting"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUE ("manager", 75000, 1), ("engineer", 100000, 2), ("accountant", 60000, 3), ("recruiter", 50000, 4), ("salesman", 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Doe", 1, null), ("Jack", "Sparrow", 1, null), ("Luke", "Skywalker", 3, null), ("Kanye", "West", 5, null);