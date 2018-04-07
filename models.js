<<<<<<< HEAD
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'a',
    database: 'test',
    password: 'a'
=======
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: '1234'
>>>>>>> 24b8a8058ce72774da56d6d51dba6191ee1e6a73
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