INSERT INTO department(department_name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role(title, salary, department_id) VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
    ('James', 'Fraser', 1, NULL),
    ('Jack', 'London', 1, 1),
    ('Robert', 'Bruce', 2, NULL),
    ('Peter', 'Greenaway', 2, 3),
    ('Derek', 'Jarman', 3, NULL),
    ('Paolo', 'Pasolini', 3, 5),
    ('Heathcote', 'Williams', 4, NULL),
    ('Sandy', 'Powell', 4, 7)
    ;