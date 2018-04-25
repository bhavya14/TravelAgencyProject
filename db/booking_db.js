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
function createtables() {
var query=
        "create table  IF NOT EXISTS Bookings(Bid int auto_increment PRIMARY KEY,"+
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
}

function bookingmember() {
    var query=
        "create table  IF NOT EXISTS Booking_member(Bid int REFERENCES Bookings,"+
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

function add(source, destination,startdate,returnDate,username, pnr,eid,callback) {
    console.log(startdate)
    if(returnDate.length !=0){
        connection.query(`insert into Bookings (travel_from,travel_to,PNR,username, Start_date,End_date,Eid,Status) values('${source}','${destination}',${pnr},'${username}','${startdate}','${returnDate}',${eid},'1') `, function(err,data) {
            if(err ==null ) {
                callback(data.insertId);
            }
            else{

            }
        })
    }else{
        connection.query(`insert into Bookings (travel_from,travel_to,PNR,username, Start_date,Eid,Status) values('${source}','${destination}',${pnr},'${username}','${startdate}',${eid},'1') `, function(err,data) {
            if(err ==null ) {
                callback(data.insertId);
            }
            else{

            }
        })

    }

}

function display() {
    connection.query('select * from bookings', function(err,data) {
        console.log("data : " , data)

    });
}

function displayUserHistory(username,callback){
    connection.query(`select * from Bookings where Username = "${username}"`, function(err,data) {
        console.log(data);
        callback(data);
    });
}


function addMembers(originalData,Bid,callback){

    console.log("originaldata : " , originalData)
    if(Object.keys(originalData).length === 5){
        console.log("going back")
        callback();
    }
    var i=0;
    for (  ;i< (Object.keys(originalData).length -5 )/4;i++){
        var key1 ="Name" + i;
        var key2 = "IDProofType" +i;
        var key3  = "IDProofNumber" + i;
        var key4 = "Age" + i;
        var query = `insert into Booking_member values(${Bid} ,'${originalData[key2]}','${originalData[key3]}','${originalData[key1]}',${originalData[key4]})`
        connection.query(query,function(err1){
            if(err1 ==null){
                if(i>=(Object.keys(originalData).length -5 /4) - 1){
                    console.log(i , "in here")
                    callback(0,null);
                }
                callback(0,null);
            }else{
                console.log("err1 : " , err1);
                console.log("original data : " ,originalData);
                if(originalData.travelMode ==='1'){
                    console.log("idhar aa gaye");
                    connection.query(`delete from flight where Bid = ${Bid}`,function(err2){
                        console.log("err2 : " , err2);
                        connection.query(`delete from Bookings where Bid = ${Bid}`,function(err3){
                            console.log("err3 : " ,err3);
                            connection.query(`delete from Booking_member where Bid = ${Bid}`,function(err4) {
                                console.log("err4 : " ,err4);
                                callback(1,err1.sqlMessage);
                            })
                        })
                    })
                }else if(originalData.travelMode ==='2'){
                    connection.query(`delete from train where Bid = ${Bid}`,function(){
                        connection.query(`delete from Bookings where Bid = ${Bid}`,function(err){
                            console.log(err);
                            connection.query(`delete from Booking_member where Bid = ${Bid}`,function(err) {
                                console.log("err : " ,err);
                                callback(1,err1.sqlMessage);
                            })
                        })
                    })
                }else if(originalData.travelMode ==='3'){
                    connection.query(`delete from bus where Bid = ${Bid}`,function(){
                        connection.query(`delete from Bookings where Bid = ${Bid}`,function(err){
                            console.log(err);
                            connection.query(`delete from Booking_member where Bid = ${Bid}`,function(err) {
                                console.log("err : " ,err);
                                callback(1,err1.sqlMessage);
                            })
                        })
                    })
                }

            }
        })
    }

}

function fetchData(Bid,callback){
    connection.query(`select* from Bookings where Bid = ${Bid}`,function(err,data){
        if(err==null){
            var query  = `(select Flight_Number as Flight_Number,null as Train_Number,null as Bus_number from Flight where Bid = ${Bid} ) 
                        UNION ALL 
                        (select null as Flight_Number,Train_Number as Train_Number,null as Bus_Number from Train where Bid = ${Bid}) 
                        UNION ALL
                        (select null as Flight_Number,null as Train_Number,Bus_Number as Bus_Number from Bus where Bid = ${Bid})`;
            connection.query(query,function(err,travelData){
                if(travelData[0].Flight_Number != null){
                    travelMode = 1
                }else if(travelData[0].Train_Number !=null)
                    travelMode = 2
                else
                    travelMode=3
                callback(travelMode,data)
            })
        }
    })
}
function getUser(Bid,callback){
    connection.query(`select username from Bookings where Bid = ${Bid}`,function(err,data){
        console.log(data[0].username) ;
        callback(data[0].username);
    })
}
module.exports = {
    createtable:createtables,
    connect: Connect,
    display: display,
    add: add,
    displayUserHistory: displayUserHistory,
    addMembers:addMembers,
    fetchData:fetchData,
    getUser:getUser
}