const express = require('express');
const app = express();
const ejs = require('ejs')
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./db');
var bdb=require('./booking_db');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post("/profile" ,function(req,res){ // User Page
    console.log(req.body.password);


    db.display(req.body.username,'*',req.body.password,function(data){

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

    })

})


app.post('/booking',function (req,res) {

    bdb.createtable();

     // bdb.add(req.body.source,req.body.dest,req.body.myDate,function (data) {
     //     console.log("Added a booking");
     // });
    res.render('pages/booking', {

    });


})

app.post('/signup',function (req,res) {


db.add(req.body.username2,req.body.password2,function (data) {
    res.render('pages/profile', {

    });

})

    // bdb.add(req.body.source,req.body.dest,req.body.myDate,function (data) {
    //     console.log("Added a booking");
    // });



})
app.get("/",function(req,res){

    res.render('pages/index')
})
app.listen(3000, function() {
    console.log("Running on 3000");
    db.connect();
});