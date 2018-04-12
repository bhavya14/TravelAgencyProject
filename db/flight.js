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

function createTable(){
var query=
    "create table Flight(Bid int ,"+
    "Start_date Date, " +
    "Reach_date Date,"+
    "Flight_Number varchar(200)," +
    "Class varchar(200)," +
    "Airport_start varchar(250)," +
    "Airport_land varchar(250)," +
    "Duration int," +
    "CONSTRAINT flight_bid  FOREIGN KEY (Bid)  REFERENCES Bookings(Bid))";
connection.query(query,
    function(err,results,fields){
        console.log(err)

    });
}

function addFlight(data , bid,callback){

    var query  = `insert into flight(Bid,Flight_number,Airport_start ,Airport_land,duration,Start_date) values(${bid},'W78899','${data.source}', '${data.dest}',2 ,'${data.startDate}')`;
    console.log(query);
    connection.query(query,function(err){
        console.log(err);
        var queryReturn = `insert into flight(Bid,Flight_number,Airport_start ,Airport_land,duration, Start_date) values(${bid},'L98799','${data.dest}','${data.source}',2,'${data.returnDate}')`;
        connection.query(queryReturn,function(err){
            console.log("err : ",err);
            var q = `select * from flight where Bid = ${bid}`;
            connection.query(q,function(err,data){
                console.log("Flight data : ", data)
                callback(data);
            })

        })
    })

}

module.exports  ={
    createTable : createTable,
    addFlight : addFlight
}