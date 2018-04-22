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
function delte(Bid ,callback){

    var query  = `Update Bookings SET Status='0' where Bid=${Bid}`;
    console.log(query);
    connection.query(query,function(err,data){
        callback(data);
    })

}

module.exports  ={
    delte:delte
}
