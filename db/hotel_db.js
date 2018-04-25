const mysql = require('mysql2')
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

function createHotel() {
    var query =
        "create table  IF NOT EXISTS HotelReserve(Hid int PRIMARY KEY,"+
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
        "create table  IF NOT EXISTS employee_contact(Eid int REFERENCES employee(Eid),Contact int NOT NULL)"
    connection.query(query,
        function(err,results,fields){
            console.log(err)
            console.log(results)
            console.log(fields)
        }

    )
}