const express = require('express');
const app = express();
const ejs = require('ejs')
var bodyParser = require('body-parser');
var path = require('path');
<<<<<<< HEAD
var db = require('./db');
=======
var db = require('./db/db');
var bdb=require('./db/booking_db');
var udb=require('./db/user_db');
>>>>>>> 24b8a8058ce72774da56d6d51dba6191ee1e6a73

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

<<<<<<< HEAD
app.post("/profile" ,function(req,res){
    console.log(req.body.password);
    db.display(req.body.username,'*',req.body.password,function(data){
        // if(data!=null) {
        //     res.render('pages/profile', {
        //         name: data[0].first_name,
        //         last_name : data[0].last_name
        //     });
        // }
=======
app.post("/profile" ,function(req,res){ // User Page
    console.log(req.body.password);


    db.display(req.body.username,'*',req.body.password,function(data){

>>>>>>> 24b8a8058ce72774da56d6d51dba6191ee1e6a73
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
                name: data[0].first_name,
                last_name : data[0].last_name
            });
        }
<<<<<<< HEAD
=======

>>>>>>> 24b8a8058ce72774da56d6d51dba6191ee1e6a73
    })

})

<<<<<<< HEAD
app.post('/booking',function (req,res) {

//    bdb.createtable();
    var data=req;
    res.render('pages/booking', {
    });
})

app.post('/signup',function (req,res) {
    db.add(req.body.username2,req.body.password2,function (data) {
        res.render('pages/profile', {

        });

    })
})

app.get("/",function(req,res){
    res.render('pages/index')
})
=======

app.post('/booking',function (req,res) {

    bdb.createtable();
    var data=req;

     // bdb.add(req.body.source,req.body.dest,req.body.myDate,function (data) {
     //     console.log("Added a booking");
     // });
    res.render('pages/booking', {

    });


})

app.post('/signup',function (req,res) {


    res.render('pages/userdetails', {});
});




    app.post('/userdetails',function (req,res) {
   //  udb.createUser();
console.log("LALALLALA");
console.log(req.body);
console.log(req.body.fname);

db.UsernameCheck(req.body.uname,function (data) {
        console.log("Data to be checked is")
    console.log(data);
        if(data.length==0)
        {
            udb.adduser(req.body.fname, req.body.lname,req.body.uname,req.body.password,req.body.mail,req.body.dob,req.body.address,req.body.Gender,req.body.proof,req.body.nproof,function (data) {
                console.log("Done")
            })
        }
        else
        { console.log("This username is already taken");
            res.send({
                "code":400,
                "failed":"This username is already taken"
            })
        }
        // When doesnt match data.length==0
    });





    });




    // bdb.add(req.body.source,req.body.dest,req.body.myDate,function (data) {
    //     console.log("Added a booking");
    // });




app.get("/",function(req,res){

    res.render('pages/index')
});
>>>>>>> 24b8a8058ce72774da56d6d51dba6191ee1e6a73
app.listen(3000, function() {
    console.log("Running on 3000");
    db.connect();
});