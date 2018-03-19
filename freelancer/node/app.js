var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var http = require('http');
var router = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Sonal@1717',
        database: 'new_users',
        port: 3306
})

connection.connect(function(err){
    if(err) throw err
    else{console.log('You are now connected...')}
});

app.post('/add', function(req, res, next) {
    console.log("Checking.....")
    var uName = req.body.username;
    var pwd = req.body.password;
    var u_name = req.body.uname;
    console.log(uName);

    if(uName == ' '|| pwd == ' '|| uName == ''|| pwd == '') {
        res.status(401).json({message: "Sign Up failed"});
    }

    else {
        var insertUser = "insert into users_default values('"+uName+"','"+pwd+"','"+u_name+"')";
        console.log("this is user query" +insertUser);
    

    connection.query(insertUser, function(err, rows, fields){
        if(err){
            throw err;
        }
        
        else{
            console.log("SignUp successful");
            res.status(201).json({message: "SignUp successfull"});
        }
    })
    }
})

app.post('/check', function(req, res, next){
    var uName = req.body.username;
    var pwd = req.body.password;
    console.log(uName);
    if(uName == ' '|| pwd == ' '|| uName == ''|| pwd == '') {
        res.status(401).json({message: "Sign Up failed"});
    }
    else {
        var checkUser = "select user from users_default where username='"+uName+"' and password='"+pwd+"'";
        console.log('this is thte query' + checkUser);
    

    connection.query(checkUser, function(err, rows, fields){
        if(err) {
            throw err;
        }
        
        else
            if(rows.length>0) {
                console.log("Valid Login");
                console.log("Sending username:"+ JSON.stringify(rows[0].user));
                var x = JSON.stringify(rows[0].user);
                console.log("Sending Username" + String(x));
                //res.writeHead(200, {'Content-Type': 'application/json'});
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({user_name: uName}));
                
            }
        
        else {
            res.status(401).json({message: "Login failed"});
            
        }
    
    })

}
})

app.post('/enter', function(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var about = req.body.about;
    var skill = req.body.skill;
    if(name ==''|| name == ' '|| email == ''|| email == ' ' || phone == ''|| phone==' '
        || about == ''|| about == ' '|| skill ==''|| skill == ' ') {
            res.status(401).json({message: "Failed"});
        }

    else{
        var enterDetail = "insert into user_info values('"+name+"','"+email+"','"+phone+"','"+about+"','"+skill+"')";
        console.log("This is the query"+ enterDetail);

        connection.query(enterDetail, function(err, rows, fields){
            if(err) {
                throw err;
            }
            else {
                console.log("Values Entered!");
                res.status(201).json({message: "Successfull"});}
                console.log("Response status sent");
        })
    }
})

app.listen(8080, function(){
    console.log('the server listening');
})

