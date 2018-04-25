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
        "create table  IF NOT EXISTS Train(Bid int ,"+
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
    var arr= ['1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00' , '11:00' , '12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'];
    var query = `select duration from master where (source='${data.source}' and destination = '${data.dest}') OR (source = "${data.dest}" AND destination = "${data.source}")`;
    connection.query(query,function(err,data1) {
        var duration = data1[0].duration +10;
        var index = Math.floor(Math.random() * Math.floor(24));
        var xyz =Math.floor(Math.random() * 22222) ;
        var query  = `insert into train(Bid,Train_number,RailwayStation_start ,RailwayStation_reach,Duration,Start_date,Time) values(${bid},'${xyz}','${data.source}', '${data.dest}',${duration},'${data.startDate}','${arr[index]}')`;
        console.log(query);
        connection.query(query,function(err){
            console.log(err);

            if(data.returnDate.length!=null){
                var xyz = Math.floor(Math.random() * 222222) ;
                var index = Math.floor(Math.random() * Math.floor(24));
                var queryReturn = `insert into train(Bid,Train_number,RailwayStation_start ,RailwayStation_reach,Duration,Start_date,Time) values(${bid},'${xyz}','${data.dest}','${data.source}',${duration},'${data.returnDate}','${arr[index]}')`;
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