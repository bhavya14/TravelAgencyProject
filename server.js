const express = require('express');
const app = express();
const ejs = require('ejs')
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./db');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post("/profile" ,function(req,res){
    console.log(req.body.password);
    db.display(req.body.username,'*',req.body.password,function(data){
        if(data!=null) {
            res.render('pages/profile', {
                name: data[0].first_name,
                last_name : data[0].last_name
            });
        }
    })

})

app.get("/",function(req,res){
    res.render('pages/index')
})
app.listen(3000, function() {
    console.log("Running on 3000");
    db.connect();
});