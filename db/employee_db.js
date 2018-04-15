
// const mysql = require('mysql2');
//
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'a',
//     database: 'test',
//     password: 'a'
// })
// function Connect() {
//     connection.connect();
//     console.log("connected")
// }
//
// function createEmployee() {
//     var query =
//     "create table employee(Eid int PRIMARY KEY,"+
//     "FirstName varchar(255) NOT NULL,"+
//     "LastName varchar(255)," +
//     "Email_id varchar(255) NOT NULL," +
//     "Working_from Date," +
//     "Date_Of_Birth Date NOT NULL," +
//     "Address varchar(255) NOT NULL," +
//     "Gender varchar(10)," +
//     "Account_id varchar(255) UNIQUE NOT NULL," +
//     "Password varchar(30) NOT NULL," +
//     "Department varchar(100) NOT NULL," +
//     "CHECK (Gender IN (\'M\',\'F\',\'Other\'))," +
//     "CHECK (Date_Of_Birth < CURDATE()))"
// connection.query(query,
//         function(err,results,fields){
//             console.log(err)
//             console.log(results)
//             console.log(fields)
//         })
// }
//
// function employeeContact() {
// var query =
//     "create table employee_contact(Eid int REFERENCES employee(Eid),Contact int NOT NULL)"
// connection.query(query,
//         function(err,results,fields){
//             console.log(err)
//             console.log(results)
//             console.log(fields)
//         }
//
// )
// }

const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'a',
    database: 'test',
    password: 'a'
})
function Connect() {
    connection.connect();
    console.log("connected")
}

function createEmployee() {
    var query =
        "create table employee(Eid int PRIMARY KEY,"+
        "FirstName varchar(255) NOT NULL,"+
        "LastName varchar(255)," +

        "Email_id varchar(255) NOT NULL," +
        "Working_from Date," +
        "Date_Of_Birth Date NOT NULL," +
        "Address varchar(255) NOT NULL," +
        "Gender varchar(10)," +
        "Account_id varchar(255) UNIQUE NOT NULL," +
        "Password varchar(30) NOT NULL," +
        "Department varchar(100) NOT NULL," +
        "CHECK (Gender IN (\'M\',\'F\',\'Other\'))," +
        "CHECK (Date_Of_Birth < CURDATE()))"
    connection.query(query,
        function(err,results,fields){
            console.log(err)
            console.log(results)
            console.log(fields)
        })
}

function employeeContact() {
    var query =
        "create table employee_contact(Eid int REFERENCES employee(Eid),Contact int NOT NULL)"
    connection.query(query,
        function(err,results,fields){
            console.log(err)
            console.log(results)
            console.log(fields)
        }

    )
}

function display(id,password,callback) {
    connection.query(`select * from employee where Account_id ='${id}' and password = '${password}'`, function(err,data) {
        console.log("data : " , data)
        console.log("error : ",err)
        callback(data);

    });
}

module.exports={
    createEmployee:createEmployee,
    display:display
}
