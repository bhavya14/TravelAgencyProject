var connection = require("../models.js")
var path = require('path')
module.exports.register = function(req,next){
    // console.log("req",req.body);
    var today = new Date();
    var users={
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
       // "email":req.body.email,
        "password":req.body.password,
       // "created":today,
        "modified":today
    }
    console.log("reached here");
    connection.query('INSERT INTO practice SET ?',users, function (error, results, fields) {
        if (error) {
            console.log("error occurred",error);
            res.send({
                "code":400,
                "failed":"error occurred"
            })
        }else{
            console.log('The solution is: ', results);
            res.send({
                "code":200,
                "success":"user registered successfully"
            });
        }
    });
}

module.exports.login = function(req,res,next){
   var name= req.body.first_name;
   var password = req.body.password;
   console.log("reached here");
    connection.query('SELECT * FROM practice WHERE first_name = ?' ,name, function (error, results, fields) {
        if (error) {
             console.log("error ocurred",error);
            res.send({
                "code":400,
                "failed":"error occurred"
            })
        }else{
             console.log('The solution is: ', results);
            if(results.length >0){
                if(results[0].password == password){
                    console.log("in here too")
                    res.set({
                        'Access-Control-Allow-Origin' : '*'
                    });
                    // res.render('loggedinPage.html',(request,response)=>{
                    //     console.log(response)
                    // });

                    // res.render('pages/profile.ejs',{
                    //     "name" : results[0].first_name
                    // })
                    // res.redirect('pages/profile')
                    //
                    res.send({
                        "code":200,
                        "name" : results[0].name,
                        "password" : results[0].password
                    });
                    next()
                    //
                    // res.sendFile(path.resolve('../untitled2/views/loggedinPage.html'),(request,response)=>{
                    //     console.log(request)
                    // });

//                    return res.redirect(path.resolve('../untitled2/views/loggedinPage.html'));
                }
                else{
                     res.send({
                         "code":204,
                         "success":"Email and password does not match"
                     });
                }
            }
            else{
                res.send({
                    "code":204,
                    "success":"Email does not exist"
                });
            }
        }
    });
}