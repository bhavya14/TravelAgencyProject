const connection = require('./models')

// var query =
//     "create table employee(Eid int PRIMARY KEY,"+
//     "FirstName varchar(255) NOT NULL,"+
//     "LastName varchar(255)," +
//     "Email_id varchar(255) NOT NULL," +
//     "Working_from Date," +
//     "Date_Of_Birth Date NOT NULL," +
//     "Address varchar(255) NOT NULL," +
//     "Gender varchar(10)," +
//     "Account_id varchar(255) UNIQUE NOT NULL," +
//     "Password varchar(30) NOT NULL," +
//     "Department varchar(100) NOT NULL," +
//     "CHECK (Gender IN (\'M\',\'F\',\'Other\'))," +
//     "CHECK (Date_Of_Birth < CURDATE()))"
// connection.query(query,
//         function(err,results,fields){
//             console.log(err)
//             console.log(results)
//             console.log(fields)
//         }
//
// )
//
//
//
// var query =
//     "create table employee_contact(Eid int REFERENCES employee(Eid),Contact int NOT NULL)"
// connection.query(query,
//         function(err,results,fields){
//             console.log(err)
//             console.log(results)
//             console.log(fields)
//         }
//
// )

//
// var query =
//     "create table user(user_id int PRIMARY KEY,"+
//     "FirstName varchar(255) NOT NULL,"+
//     "LastName varchar(255)," +
//     "Account_id varchar(255) UNIQUE NOT NULL," +
//     "Password varchar(30) NOT NULL," +
//     "Email_id varchar(255) NOT NULL," +
//     "Date_Of_Birth Date NOT NULL," +
//     "Address varchar(255) NOT NULL," +
//     "Gender varchar(10)," +
//     "ID_Proof_Type varchar(100) NOT NULL,"+
//     "ID_Proof_Number varchar(200) NOT NULL,"+
//     "CHECK (Gender IN (\'M\',\'F\',\'Other\'))," +
//     "CHECK (Date_Of_Birth < CURDATE()))"
// connection.query(query,
//         function(err,results,fields){
//             console.log(err)
//             console.log(results)
//             console.log(fields)
//         }
//
// )
//


// var query =
//     "create table user_contact(user_id int REFERENCES user(user_id),Contact int NOT NULL)"
// connection.query(query,
//     function(err,results,fields){
//         console.log(err)
//         console.log(results)
//         console.log(fields)
//     }
// )
//

// var query =
//     "create table Bookings(Bid int PRIMARY KEY,"+
//     "Eid int REFERENCES employee(Eid)," +
//     "username varchar(200) REFERENCES user(Username),"+
//     "Package_code int REFERENCES Package(Pcode)," +
//     "travel_to varchar(200) REFERENCES Place(Place_id)," +
//     "PNR int NOT NULL," +
//     "travel_from varchar(200)," +
//     "Start_Date Date," +
//     "End_Date Date," +
//     "Payment varchar(20) REFERENCES Payments(Payment_ID)," +
//     "Booking_date DATE," +
//     "Hotel_ID varchar(30) REFERENCES Hotel(Hotel_ID))"
// connection.query(query,
//         function(err,results,fields){
//             console.log(err)
//             console.log(results)
//             console.log(fields)
//         }
//
// )
// var query =
//     "create table Bookings(Bid int PRIMARY KEY,"+
//     "Eid int REFERENCES employee(Eid)," +
//     "user_id int REFERENCES user(user_id),"+
//     "Package_code int REFERENCES Package(Pcode)," +
//     "travel_to varchar(200) REFERENCES Place(Place_id)," +
//     // "PNR int " +
//     "travel_from varchar(200)," +
//     "Start_Date Date," +
//     "End_Date Date," +
//     "Payment varchar(20) REFERENCES Payments(Payment_ID)," +
//     "Booking_date DATE," +
//     "Hotel_ID varchar(30) REFERENCES Hotel(Hotel_ID))"
// connection.query(query,
//         function(err,results,fields){
//             console.log(err)
//             console.log(results)
//             console.log(fields)
//         }
//
// )

// var query =
//     "create table Payments(Payment_ID varchar(100) PRIMARY KEY,"+
//     "Eid int REFERENCES employee(Eid)," +
//     "user_id int REFERENCES user(user_id),"+
//     "Pcode int REFERENCES Package,"+
//     "Booking_ID int REFERENCES Bookings(Bid)," +
//     "Payment_Date DATE," +
//     "Method varchar(100)," +
//     "Status varchar(100) NOT NULL," +
//     "Amount int NOT NULL)"
// connection.query(query,
//     function(err,results,fields){
//         console.log(err)
//         console.log(results)
//         console.log(fields)
//     }
//
// )

// var query  = "create table Place(Place_id int PRIMARY KEY , name varchar(255) NOT NULL)"
// connection.query(query,
//     function(err,results,fields){
//         console.log(err)
//         console.log(results)
//         console.log(fields)
//     }
//
// )
//
// var query  = "create table Package(Pcode int PRIMARY KEY , type varchar(255) NOT NULL,facilities varchar(255) , fees int(40) ," +
//     " OtherDetails varchar(255))"
//
// connection.query(query,
//     function(err,results,fields){
//         console.log(err)
//         console.log(results)
//         console.log(fields)
//     }
//
// )
//

// var query = "create table practice(first_name varchar(200) ,last_name varchar(200) ,modified Date)"
// connection.query(query,
//     (err,results,fields)=>{
//         console.log(err)
//         console.log(results)
//         console.log(fields)
//     })
//
// var query=
//     "create table Bookings(Bid int auto_increment PRIMARY KEY,"+
//     "Eid int REFERENCES employee(Eid)," +
//     "user_id int REFERENCES user(user_id),"+
//     "Package_code int REFERENCES Package(Pcode)," +
//     "travel_to varchar(200) REFERENCES Place(Place_id)," +
//     "PNR int NOT NULL," +
//     "travel_from varchar(200)," +
//     "Start_Date Date," +
//     "End_Date Date," +
//     "Payment varchar(20) REFERENCES Payments(Payment_ID)," +
//     "Booking_date DATE," +
//     "Hotel_ID varchar(30) REFERENCES Hotel(Hotel_ID))"
// connection.query(query,
//     function(err,results,fields){
//         console.log(err)
//
//     }
//
// )
// //var query= "create table abc(Bid int auto_increment , Eid int REFERENCES employee(Eid),user_id int REFERENCES user(user_id),Package_code int REFERENCES Package(Pcode),travel_to varchar(200) REFERENCES Place(Place_id),PNR int NOT NULL,travel_from varchar(200),start_date Date,End_Date Date,Payment varchar(20) REFERENCES Payments(Payment_ID),booking_date DATE,Hotel_ID varchar(30) REFERENCES Hotel(Hotel_ID)),primary key(Bid)";
// connection.query(query,
//     function(err,results,fields){
//         console.log("Table created");
//         // console.log(err)
//         // console.log(results)
//         // console.log(fields)
//     })


//
// var query = "create table practice(first_name varchar(200) ,last_name varchar(200) ,modified Date)";
// connection.query(query,
//     function(err,results,fields){
//         console.log(err)
//         console.log(results)
//         console.log(fields)
//     })

// "Account_id varchar(255) UNIQUE NOT NULL," +
// var query =
//     "create table user(user_id int auto_increment PRIMARY KEY,"+
//     "FirstName varchar(255) NOT NULL,"+
//     "LastName varchar(255)," +
//     "Username varchar(255) NOT NULL,"+
//     "Password varchar(30) NOT NULL," +
//     "Email_id varchar(255) NOT NULL," +
//     "Date_Of_Birth Date NOT NULL," +
//     "Address varchar(255) NOT NULL," +
//     "Gender varchar(10)," +
//     "ID_Proof_Type varchar(100) NOT NULL,"+
//     "ID_Proof_Number varchar(200) NOT NULL,"+
//     "CHECK (DATE(Date_Of_Birth) < DATE(NOW())))";
//     connection.query(query,
//     function(err,results,fields){
//         console.log(err)
//         console.log(results)
//         console.log(fields)
//     }
//
// )
//
var query=
    "create table Booking_member(Bid int REFERENCES Bookings,"+
    "proof_type varchar(100), " +
    "id_proof_number int,"+
    "name varchar(100)," +
    "age int," +
    "CONSTRAINT fk_id  FOREIGN KEY (Bid)  REFERENCES Bookings(Bid))";
connection.query(query,
    function(err,results,fields){
        console.log(err)

    })


var query=
    "create table Flight(Bid int ,"+
    "Start_date Date, " +
    "Reach_date Date,"+
    "Flight_Number varchar(200)," +
    "Class varchar(200)," +
    "Airport_start varchar(250)," +
    "Airport_land varchar(250)," +
    "Duration int(17)," +
    "CONSTRAINT flight_bid  FOREIGN KEY (Bid)  REFERENCES Bookings(Bid))";
connection.query(query,
    function(err,results,fields){
        console.log(err)

    });
 query=
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

var query=
    "create table Bus(Bid int ,"+
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

