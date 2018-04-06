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

function createPackage() {


    var query  = "create table Package(Pcode int PRIMARY KEY , type varchar(255) NOT NULL,facilities varchar(255) , fees int(40) ," +
        " OtherDetails varchar(255))"

    connection.query(query,
        function(err,results,fields){
            console.log(err)
            console.log(results)
            console.log(fields)
        })
}