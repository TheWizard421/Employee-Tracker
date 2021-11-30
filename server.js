const inquirer = require('inquirer');
const mysql = require('mysql2');
// const Query = require('mysql2/typings/mysql/lib/protocol/sequences/Query');

require('console.table')

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // {TODO: Add your MySQL password}
      password: 'root',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

const questions = [
{
    type:"list",
    name:"general_program",
    message:"What would you like to do?",
    choices:["View All Departments","View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add a Employee", "Update an Employee"]
}]
//view All Departments, 
const viewAllDepartments = () => {
    db.query ('SELECT * FROM department', function(err, results){
        console.table(results)
        mainMenu();
})};
// view all roles, 
const viewAllRoles = () => {
    db.query ('SELECT * FROM Role', function(err, results){
        console.table(results)
        mainMenu(); 
})};
// view all employees, 
const viewAllEmployees = () => {
    db.query ('SELECT * FROM employee', function(err, results){
        console.table(results)
        mainMenu();
})};
// add a department, 
const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'Department',
        message: 'Please Enter Department Name'
    }).then((response)=> {
        db.query ('INSERT INTO department (name) VALUES (?);', response.Department, (err)=>{
            if(err){
                throw err
            }
            else{
                console.log(`New Department name ${response.Department} added!`);
                viewAllDepartments();
            }
        })
    })};
// add a role, 
const addRole = () => {
    db.query ('SELECT * FROM department', function(err, results){
        if (err){ throw err }
        else {   
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'Department',
                        message: 'Please select a Department to add an employee role!',
                        choices() {
                            var arr = [];
                            for (var i = 0; i < results.length; i++){
                                arr.push(results[i].name);
                            }
                            return arr;
                            
                            }
                    },
                    {
                        type: 'input',
                        name: 'Salary',
                        message: 'Please enter a Salary ($)'
                    },
                    {
                        type: 'input',
                        name: 'Jobtitle',
                        message: 'Please enter Job Title'
                    }
                ])
        .then((response) => {
            
            console.log('line hit')

            db.query (`SELECT id FROM department WHERE name=?`, response.Department, (err, data) => {
            if (err) {
                throw err
            } else {
                db.query ('INSERT INTO role (department_id, salary, title) VALUES (?,?,?)', [data[0].id, response.Salary, response.Jobtitle])
                mainMenu();
        }})})
    }})};
//add an employee, 
const addEmployee = () => {
    db.query ('SELECT * FROM role', function(err, results){
        if (err){ throw err }
        else {inquirer.prompt([
        {
            type: 'input',
            name: 'fname',
            message: `What's the employee's first name?`
        },
        {
            type: 'input',
            name: 'lname',
            message: `What's the employee's last name?`
        },
        {
            type: "list",
            name:'emroles',
            message: `What's the employee's role?`,
            choices(){
                var arr = [];
                for (var i = 0; i < results.length; i++){
                    arr.push(results[i].title);
                }
                return arr;
            }},
            {
                type: 'input',
                name:'managerid',
                message: `What's the employee's manager id?`
            }
    ])
        .then((response) => {
            db.query (`SELECT id FROM role WHERE title=?`, response.emroles, (err, data) => {
                if (err) {
                    throw err
                } else {
                    console.log (typeof response.managerid)
                    db.query ('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [response.fname, response.lname, data[0].id, parseInt(response.managerid)])
        }})
    })}
})};
// and update an employee role
// const updateEmployee = (id) => {
//     db.query ('SELECT * FROM employee WHERE id = ?', [id], function(err, results){
//         if (err){ throw err }
//         else { inquirer.prompt ([
//             {
//                 type: 'list',
//                 name:'emlist',
//                 message: 'Please Select an Employee to Update!',
//                 choices(){
//                     var arr = [];
//                     for (var i = 0; i < results.length; i++){
//                         arr.push(`${results[i].first_name} ${results[i].last_name}`);
//                     }
//                     return arr;
//                 }
//             }
//         ])//.then(result) => do a query to get the employee_id and put in a variable
//         .then((result) => {
//             db.query ('SELECT id FROM employee WHERE fullname=?', response.emlist, (err, data) => {
//                 if (err) { 
//                     throw err
//             } else {
                
//             }
//         })
//         // .then with a query to get the list of roles and then an inquirer prompt to ask what role is the new role
//         // .then(response) => get the role id then 
//     }})
//     }
const otherWay = () => {
    showallemployees() 
    showallroles () 
    inquirer.prompt([
        {
        type: 'input',
        name:'emname',
        message: `Please enter the employee ID who's role you want to change`,
        },
        {
        type: 'input',
        name:'emrole',
        message: `Please enter the new role ID`,
    }
    ]).then((resp) => {
        //db.query(SET role_id to the new id where employee id matches emname)
        db.query(`UPDATE employee SET role = newRole WHERE id = ?`);
    })
}


const mainMenu = () => {
    inquirer.prompt(questions).then(function (response) {
        console.log(response)
        if (response.general_program === 'View All Departments') {
            viewAllDepartments()
        }
        else if (response.general_program === 'View all Roles') {
            viewAllRoles()
        }
        else if (response.general_program === 'View all Employees') {
            viewAllEmployees()
         } 
        else if (response.general_program === 'Add a Department') {
            addDepartment()
        }
        else if (response.general_program === 'Add a Role') {
            addRole()
        }
        else if (response.general_program === 'Add a Employee') {
            addEmployee()
        }
        else if (response.general_program === 'Update an Employee') {
            otherWay()
        }
    })
};

mainMenu();