const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'dbms',
    password: '1234'
})
function Connect() {
    connection.connect();
    console.log("connected")
}

function signupcheck() {
    
}

function UsernameCheck(fname,callback) {
    connection.query(`select first_name from practice WHERE practice.first_name='${fname}'`, function(err,data) {

        callback(data);
    });
}
function display(id,query,password,callback) {
    connection.query('select * from practice where first_name = ' + "\"" + id + "\" AND password = " + password + ";", function(err,data) {
        console.log("data : " , data)
        console.log("error : ",err)
        callback(data);
    });
}


function add(name, password, callback) {
    connection.query(`insert into practice (first_name,password) values ('${name}', '${password}')`, function(err, data) {

        callback(data);
    })
}
module.exports = {
    connect: Connect,
    display: display,
    add: add,
   UsernameCheck: UsernameCheck
}