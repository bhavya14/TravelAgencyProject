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

    function createUser() {

    var query =
        "create table user(user_id int PRIMARY KEY,"+
        "FirstName varchar(255) NOT NULL,"+
        "LastName varchar(255)," +
        "Account_id varchar(255) UNIQUE NOT NULL," +
        "Password varchar(30) NOT NULL," +
        "Email_id varchar(255) NOT NULL," +
        "Date_Of_Birth Date NOT NULL," +
        "Address varchar(255) NOT NULL," +
        "Gender varchar(10)," +
        "ID_Proof_Type varchar(100) NOT NULL,"+
        "ID_Proof_Number varchar(200) NOT NULL,"+
        "CHECK (Gender IN (\'M\',\'F\',\'Other\'))," +
        "CHECK (Date_Of_Birth < CURDATE()))"
    connection.query(query,
            function(err,results,fields){
                console.log(err)
                console.log(results)
                console.log(fields)
            }

    )


    }