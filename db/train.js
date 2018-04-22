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
        "create table Train(Bid int ,"+
        "Start_date Date, " +
        "Reach_date Date,"+
        "Train_Number varchar(200)," +
        "Class varchar(200)," +
        "RailwayStation_start varchar(250)," +
        "RailwayStation_reach varchar(250)," +
        "Duration int(17)," +
        "CONSTRAINT train_bid  FOREIGN KEY (Bid)  REFERENCES Bookings(Bid))";
    connection.query(query,
        function(err,results,fields){
            console.log(err)

        });
}

function addTrain(data , bid,callback){
    var query = `select duration from master where source='${data.source}' and destination = '${data.dest}'`;
    connection.query(query,function(err,data1) {
        var duration = data1[0].duration +10;
        var query  = `insert into train(Bid,Train_number,RailwayStation_start ,RailwayStation_reach,Duration,Start_date) values(${bid},'54465','${data.source}', '${data.dest}',${duration},'${data.startDate}')`;
        console.log(query);
        connection.query(query,function(err){
            console.log(err);

            if(data.returnDate!=null){
                var queryReturn = `insert into train(Bid,Train_number,RailwayStation_start ,RailwayStation_reach,Duration,Start_date) values(${bid},'56454','${data.dest}','${data.source}',${duration},'${data.returnDate}')`;
                connection.query(queryReturn,function(err){
                    console.log("err : ",err);
                    var q = `select * from train where Bid = ${bid}`;
                    connection.query(q,function(err,data){
                        console.log("Train data : ", data)
                        callback(data);
                    })

                })
            }else{
                var q = `select * from train where Bid = ${bid}`;
                connection.query(q,function(err,data){
                    console.log("Train data : ", data)
                    callback(data);
                })
            }

        })


    })

}

module.exports  ={
    createTable : createTable,
    addTrain : addTrain
}