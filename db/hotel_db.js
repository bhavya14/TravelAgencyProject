const mysql = require('mysql2')
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

function createHotel() {
    var query =
        "create table HotelReserve(Hid int PRIMARY KEY,"+
        "Bid int REFERENCES(Bookings(Bid)),"+
        "Hno int,"+
        "Rooms int"
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