DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE 'emlpoyee' (
  'first_name' varchar(30) NOT NULL,
  'last_name' varchar(30) NOT NULL,
  'role_id' int(10) NOT NULL FOREIGN KEY (role_id) REFERENCES emlpoyee
  'manager_role' int(10) NOT NULL FOREIGN KEY (role_id) REFERENCES emlpoyee

);

CREATE TABLE 'role' (
  title varchar(30) NOT NULL,
  salary decimal NOT NULL,
  department_id int(10) NOT NULL FOREIGN KEY (department_id) REFERENCES emlpoyee
);