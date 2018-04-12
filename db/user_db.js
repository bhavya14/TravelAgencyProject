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
function createUser(){
    var query =
        "create table user(user_id int auto_increment PRIMARY KEY,"+
        "FirstName varchar(255) NOT NULL,"+
        "LastName varchar(255)," +
        "Username varchar(255) NOT NULL,"+
        // "Account_id varchar(255) UNIQUE NOT NULL," +
        "Password varchar(30) NOT NULL," +
        "Email_id varchar(255) NOT NULL," +
        "Date_Of_Birth Date NOT NULL," +
        "Address varchar(255) NOT NULL," +
        "Gender varchar(10)," +
        "ID_Proof_Type varchar(100) NOT NULL,"+
        "ID_Proof_Number varchar(200) NOT NULL,"+
    //    "CHECK (Gender IN (\'M\',\'F\',\'Other\'))," +
        "CHECK (DATE(Date_Of_Birth) < DATE(NOW()))"
    connection.query(query,
            function(err,results,fields){
                console.log(err)
                console.log(results)
                console.log(fields)
            }

    )
}

function adduser(fn,ln,un,p,e,d,a,g,idp,idn, callback) {
            console.log(d)
            connection.query(`insert into user (FirstName,LastName,Username,Password,Email_id,Date_of_Birth,Address,Gender,ID_Proof_Type,ID_Proof_Number) values ('${fn}','${ln}','${un}','${p}','${e}','${d}','${a}','${g}','${idp}','${idn}') `, function(err, data) {
                console.log(err);
                if(err == null) {
                    callback(data);
                }else{
                    console.log("some error occurred");
                }
            })
}

function display(id,query,password,callback) {
    connection.query('select * from user where Username = ' + "\"" + id + "\" AND Password = " + password + ";", function(err,data) {
        console.log("data : " , data)
        console.log("error : ",err)
        callback(data);
    });
}
function UsernameCheck(fname,callback) {
    connection.query(`select Username from user WHERE user.Username='${fname}'`, function(err,data) {
        callback(data);
    });
}
module.exports = {
    createUser:createUser,
    connect: Connect,
    adduser:adduser,
    display:display,
    UsernameCheck:UsernameCheck
}