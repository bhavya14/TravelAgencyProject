const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'dbms',
    password: '1234'
})

// connection.query(
//     "CREATE TABLE user(a int);",
//     function (err, results) {
//         console.log(err)
//         console.log(results)
//
//     }
// )

module.exports = connection;

// connection.query(
//     "Insert into user values(6);",
//     function (err, results, fields) {
//         console.log(err)
//         console.log(results)
//         console.log(fields)
//
//     }
// )
//
// connection.query(
//     "Select * from user;",
//     function (err, results) {
//         console.log(err)
//         console.log(results)
//
//     }
// )