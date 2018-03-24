var connection = require("../models.js")

module.exports.register = function(req,res){
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

module.exports.login = function(req,res){
    var name= req.body.first_name;
    var password = req.body.password;
    connection.query('SELECT * FROM practice WHERE first_name = ?',name, function (error, results, fields) {
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
                    res.send({
                        "code":200,
                        "success":"login successful"
                    });
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
                    "success":"Email does not exits"
                });
            }
        }
    });
}