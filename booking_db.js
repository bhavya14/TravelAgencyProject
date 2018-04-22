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

function createtables() {
var query=
        "create table Bookings(Bid int auto_increment PRIMARY KEY,"+
        "Eid int REFERENCES employee(Eid)," +
        "user_id int REFERENCES user(user_id),"+
        "Package_code int REFERENCES Package(Pcode)," +
        "travel_to varchar(200) REFERENCES Place(Place_id)," +
        "PNR int NOT NULL," +
        "travel_from varchar(200)," +
        "Start_Date Date," +
        "End_Date Date," +
        "Payment varchar(20) REFERENCES Payments(Payment_ID)," +
        "Booking_date DATE," +
        "Hotel_ID varchar(30) REFERENCES Hotel(Hotel_ID))"
    connection.query(query,
        function(err,results,fields){
            console.log(err)

        }

    )
   //var query= "create table abc(Bid int auto_increment , Eid int REFERENCES employee(Eid),user_id int REFERENCES user(user_id),Package_code int REFERENCES Package(Pcode),travel_to varchar(200) REFERENCES Place(Place_id),PNR int NOT NULL,travel_from varchar(200),start_date Date,End_Date Date,Payment varchar(20) REFERENCES Payments(Payment_ID),booking_date DATE,Hotel_ID varchar(30) REFERENCES Hotel(Hotel_ID)),primary key(Bid)";
    connection.query(query,
        function(err,results,fields){
        console.log("Table created");
        // console.log(err)
            // console.log(results)
            // console.log(fields)
        })
}

function bookingmember() {
    var query=
        "create table Booking_member(Bid int REFERENCES Bookings,"+
        "proof_type varchar(100), " +
        "id_proof_number int,"+
        "name varchar(100)," +
        "age int,"
    connection.query(query,
        function(err,results,fields){
            console.log(err)

        })

    connection.query(query,
        function(err,results,fields){
            console.log("Table created");
            // console.log(err)
            // console.log(results)
            // console.log(fields)
        })

}

function add(source, destination,startdate, callback) {

connection.query(`insert into bookings (travel_from,travel to,start_date) values ('${source}',${destination}',${startdate}') `, function(err, data) {
console.log("Below")
        callback(data);
    })
}

function display() {
    connection.query('select * from booking', function(err,data) {
        console.log("data : " , data)

    });
}
module.exports = {
    createtable:createtables,
    connect: Connect,
    display: display,
    add: add
}