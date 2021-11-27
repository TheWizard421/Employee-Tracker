DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(30) NOT NULL
);

CREATE TABLE role (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary decimal NOT NULL,
  department_id int(10) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE emlpoyee (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int(10) NOT NULL, 
  manager_id int(10),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES emlpoyee(id)
);