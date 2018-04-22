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
function delte(Bid , bid,callback){

    var query  = `Update Bookings SET Status='0' where Bid=${Bid}`;
    console.log(query);


    connection.query(query,function(err,data){

    })

}

module.exports  ={
    delte:delte
}
