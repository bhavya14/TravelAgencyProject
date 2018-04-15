const express = require('express');
const app = express();
const ejs = require('ejs')
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./db/db');
var bdb=require('./db/booking_db');
var udb=require('./db/user_db');
var connection = require("./models");
var flight  = require("./db/flight");
var train = require("./db/train");
var bus = require("./db/Bus");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post("/profile" ,function(req,res){ // User Page
    console.log(req.body.password);
    udb.display(req.body.username,'*',req.body.password,function(data){
        console.log("Data is");
        console.log(data);
        if(data==undefined)
        {  res.send({
            "code":400,
            "failed":"The username does not exist"
        })
        }
        else if(data.length==0)
        {
            res.send({
                "code":400,
                "failed":"Incorrect password"
            })
        }
        else {
            res.render('pages/profile', {
                name:data[0].FirstName,
                last_name : data[0].LastName,
                username:data[0].Username
            });
        }
    })

})

app.post('/booking',function (req,res) {

    var data=req.body;
    var Bid;
    console.log("form data : ", data);
    bdb.add(req.body.source,req.body.dest,req.body.startDate,req.body.returnDate ,req.query.name ,function (bid) {
        console.log("Added a booking");
        Bid = bid;
        console.log(Bid);
        if(data.travelMode == 1){
            // flight selected
            console.log("inside :" , data);
            flight.addFlight(data, Bid,function(FlightData){
                Details =FlightData[0];
                ReturnDetails = FlightData[1];
                console.log( "data : ",FlightData);
                console.log(FlightData[1]);

                res.render('pages/BookingDetails',{
                    data:data,
                    Bid:Bid,
                    Details:Details,
                    ReturnDetails : ReturnDetails
                })
            })
        }else if(data.travelMode == 2){
            train.addTrain(data, Bid,function(TrainData){
                Details =TrainData[0];
                ReturnDetails = TrainData[1];
                console.log( "data : ",TrainData);
                console.log(TrainData[1]);

                res.render('pages/BookingDetails',{
                    data:data,
                    Bid:Bid,
                    Details:Details,
                    ReturnDetails : ReturnDetails
                })
            })

        }else{
            bus.addBus(data, Bid,function(BusData){
                Details =BusData[0];
                ReturnDetails = BusData[1];
                console.log( "data : ",BusData);
                console.log(BusData[1]);

                res.render('pages/BookingDetails',{
                    data:data,
                    Bid:Bid,
                    Details:Details,
                    ReturnDetails : ReturnDetails
                })
            })
        }
    });
    })

app.post('/BookingDetailsInHistory',function(req,res){
   var Bid = req.query.Booking;
   console.log(Bid);
   connection.query(`select * from Bookings where Bid = ${Bid}`,function(err,data){
        console.log(err);
        console.log(data[0]);
        var query  = `(select Flight_Number as Flight_Number,Airport_start as Airport_start,Airport_land as Airport_land,Start_date,Duration,null as Train_Number,null as RailwayStation_start,null as RailwayStation_reach,null as Bus_number,null as BusStop_start, null as BusStop_reach from Flight where Bid = ${Bid} ) 
                        UNION ALL 
                        (select null as Flight_Number,null as Airport_start, null as Airport_land ,Start_date,Duration,Train_Number as Train_Number,RailwayStation_start as RailwayStation_start,RailwayStation_reach as RailwayStation_reach,null as Bus_Number,null as BusStop_reach,null as BusStop_start from Train where Bid = ${Bid}) 
                        UNION ALL
                        (select null as Flight_Number,null as Airport_start, null as Airport_land ,Start_date,Duration,null as Train_Number,null as RailwayStation_start,null as RailwayStation_reach,Bus_Number as Bus_Number,BusStop_reach as BusStop_reach,BusStop_start as BusStop_start from Bus where Bid = ${Bid})`;
        connection.query(query ,function(err,TravelData){

            Details = TravelData[0];
            ReturnDetails = TravelData[1];
            console.log("Details : " ,Details);
            if (Details.Flight_Number != null)
                data[0]["travelMode"] = 1;
            else if(Details.Train_Number !=null)
                data[0]["travelMode"] = 2;
            else
                data[0]["travelMode"] = 3;
            console.log(data[0]);
            res.render('pages/BookingDetails',{
                data:data[0],
                Bid:Bid,
                Details:Details,
                ReturnDetails : ReturnDetails
            })

        } )
   })
});

app.post('/signup',function (req,res) {
    res.render('pages/userdetails', {});
});

app.post('/userdetails',function (req,res) {
   //  udb.createUser();
console.log("LALALLALA");
console.log(req.body);
console.log(req.body.fname);

udb.UsernameCheck(req.body.uname,function (data) {
        // console.log("Data to be checked is")
        // console.log(data);
        if(data.length==0)
        {
            udb.adduser(req.body.fname, req.body.lname,req.body.uname,req.body.password,req.body.mail,req.body.dob,req.body.address,req.body.Gender,req.body.proof,req.body.nproof,function (data) {
                res.render('pages/profile',{
                    name:req.body.fname,
                    last_name : req.body.lname,
                    username:req.body.uname
                })
                console.log("Done")
            })
        }
        else
        {
            res.send({
                "code":400,
                "failed":"This username is already taken"
            })
        }
        // When doesnt match data.length==0
    });
});

app.get("/",function(req,res){
    res.render('pages/index')
});

app.post('/bookingForm',function (req,res) {
    res.render('pages/BookingForm',{
        name:req.body.name,
        username : req.body.username
    });
});

app.post('/UserHistory',function(req,res){
    var username = req.body.username;
    var Bookings;
    var query  = `select distinct(Bid),travel_to,travel_from from Bookings where username = "${username}"`;
    connection.query(query , function(err,data){
        Bookings = data;
        console.log(Bookings);
    })

    var query = `select Bid,name,age,id_proof_number from Bookings join Booking_member using (Bid) where Bookings.username = "${username}" `;
    connection.query(query , function(err,data) {
        res.render('pages/history',{
            username:username,
            data: data,
            Bookings :Bookings
        })
    })
    // var query = `select name,age,id_proof_number, from (user join Bookings using (username)) join Booking_member using (Bid) where user.Username = "${username}" `;
    // connection.query(query , function(err,data) {
    //     //callback(data);
    //     console.log(data);
    //     console.log(Bookings);
    //     res.render('pages/history',{
    //         username:username,
    //         data: data,
    //         Bookings :Bookings
    //     })
    // })
    // var query = `select Bid from (user join Bookings using (username)) where user.Username = "${username}" `;
    // connection.query(query , function(err,data) {
    //     //callback(data);
    //     console.log(data);
    // })
    //
    // var query = `select * from Booking_member where Bid IN (select Bid from (user join Bookings using (username)) where user.Username = "${username}") `;
    // connection.query(query , function(err,data) {
    //     //callback(data);
    //     console.log(data);
    // })
    // bdb.displayUserHistory(username,function (data) {
    //     console.log(data);
    //     res.render('pages/history',{
    //         username:username,
    //         data: data
    //     })
    // })
});
app.listen(3000, function() {
    console.log("Running on 3000");
    db.connect();
});