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
        "create table Bus(Bid int ,"+
        "Start_date Date, " +
        "Reach_date Date,"+
        "Bus_Number varchar(200)," +
        "Class varchar(200)," +
        "BusStop_start varchar(250)," +
        "BusStop_reach varchar(250)," +
        "Duration int(17)," +
        "CONSTRAINT bus_bid  FOREIGN KEY (Bid)  REFERENCES Bookings(Bid))";
    connection.query(query,
        function(err,results,fields){
            console.log(err)

        });
}

function addBus(data , bid,callback){
    var query = `select duration from master where source='${data.source}' and destination = '${data.dest}'`;
    connection.query(query,function(err,data1) {
        var duration  = data1[0].duration + 20;

        var query  = `insert into Bus(Bid,Bus_Number,BusStop_start ,BusStop_reach,Duration,Start_date) values(${bid},'DL4355','${data.source}', '${data.dest}',${duration},'${data.startDate}' )`;
        console.log(query);
        connection.query(query,function(err){
            console.log(err);

            if(data.returnDate.length!=0){
                var queryReturn = `insert into Bus(Bid,Bus_Number,BusStop_start ,BusStop_reach,Duration,Start_date) values(${bid},'DL4564','${data.dest}','${data.source}',${duration},'${data.returnDate}')`;
                connection.query(queryReturn,function(err){
                    console.log("err : ",err);
                    var q = `select * from Bus where Bid = ${bid}`;
                    connection.query(q,function(err,data){
                        console.log("Bus data : ", data)
                        callback(data);
                    })

                })
            }else{
                var q = `select * from Bus where Bid = ${bid}`;
                connection.query(q,function(err,data){
                    console.log("Bus data : ", data)
                    callback(data);
                })
            }

        })
    })

}

module.exports  ={
    createTable : createTable,
    addBus : addBus
}