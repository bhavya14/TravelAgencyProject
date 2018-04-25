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
        "create table  IF NOT EXISTS Bus(Bid int ,"+
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
    var arr= ['1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00' , '11:00' , '12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'];
    var query = `select duration from master where (source='${data.source}' and destination = '${data.dest}') OR (source = "${data.dest}" AND destination = "${data.source}")`;
    connection.query(query,function(err,data1) {
        var duration  = data1[0].duration + 20;
        var xyz = Math.floor(Math.random() * 9999) ;
        var index = Math.floor(Math.random() * Math.floor(24));
        var query  = `insert into Bus(Bid,Bus_Number,BusStop_start ,BusStop_reach,Duration,Start_date,Time) values(${bid},'${xyz}','${data.source}', '${data.dest}',${duration},'${data.startDate}','${arr[index]}' )`;
        console.log(query);
        connection.query(query,function(err){
            console.log(err);

            if(data.returnDate.length!=0){
                var index = Math.floor(Math.random() * Math.floor(24));
                var xyz = Math.floor(Math.random() * 9999) ;
                var queryReturn = `insert into Bus(Bid,Bus_Number,BusStop_start ,BusStop_reach,Duration,Start_date,Time) values(${bid},'${xyz}','${data.dest}','${data.source}',${duration},'${data.returnDate}','${arr[index]}')`;
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