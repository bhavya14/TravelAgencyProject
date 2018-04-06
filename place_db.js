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


function createPlace() {
    var query  = "create table Place(Place_id int PRIMARY KEY , name varchar(255) NOT NULL)"
    connection.query(query,
        function(err,results,fields){
            console.log(err)
            console.log(results)
            console.log(fields)
        })
}


