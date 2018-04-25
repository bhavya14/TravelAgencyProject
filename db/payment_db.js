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
function MakePaymenttable()
{
    var query =
        "create table  IF NOT EXISTS Payments(Payment_ID int PRIMARY KEY,"+
        "Booking_ID int REFERENCES Bookings(Bid)," +
        "method varchar(100)," +
        "Status varchar(100) NOT NULL," +
        "Amount int NOT NULL)"
    connection.query(query,
        function(err,results,fields){
            console.log(err)
            console.log(results)
            console.log(fields)
        })
}
function addPayment(Bid , method , amount , callback){
    var today = new Date();
    var query = `insert into Payments(Booking_ID,Method,Amount) values(${Bid},'${method}',${amount})`;
    console.log(query);
    connection.query(query,function(err){
        if(err !=null)
            console.log(err);
        else
            callback();
    })
}
module.exports={
    paymenttable: MakePaymenttable,
    addPayment:addPayment
}