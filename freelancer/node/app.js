var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var http = require('http');
var router = express.Router();
var session = require('express-session');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(session({
    secret: 'keyboard cat'
}));

mongoose.connect('mongodb://localhost:27017/freelancer');
var Schema = mongoose.Schema;

var user_details = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    user: String
});

var user_info = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true, unique: true},
    about: {type: String, required: true},
    skills: {type: String, required: true}
})

var User = mongoose.model('User', user_details);
var userInfo = mongoose.model('userInfo', user_info);
var salt = bcrypt.genSaltSync(10);

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
        var passwordToSave = bcrypt.hashSync(pwd, salt);
        var new_user = new User({username: uName, password: passwordToSave, user: u_name});
        new_user.save(function(err, new_user){
            if(err) return console.error(err);
        })
        console.log("SignUp successful");
        res.status(201).end();
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
        passwordToCheck = bcrypt.hashSync(pwd, salt);
        User.find({username: uName, password: passwordToCheck}, function(err, users){
            if(err) return console.error(err);
            else if(users.length){
                res.status(201).end();
            }
            else {
                res.status(401).end();
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
        var new_info = new userInfo({name: name, email: email, phone: phone, about: about, skills: skill});
        new_info.save(function(err, new_info){
            if(err) return console.error(err);
        })
        console.log('Details Entered');
        res.status(201).end();
    }
})

/*app.get('/welcome', function(req, res){
   console.log(req.session);
})*/

/*app.get('/login', function(req, res){
    if(req.session.user){
        res.send("If you can view this page, it means you are logged in");
    }
    else{
        res.status(210).send('Login page will load');
    }
})*/

app.post('/getdetails', function(req, res){
    var username = req.body.username;
    if(username == '' || username == ' '){
        res.status(401).end();
    }
    else{
       userInfo.find({email: username}, function(err, details){
           if(err) return console.error(err);
           else if(details.length){
               res.status(201).send(details);
           }
           else{
               res.status(401).end();
           }
       })
    }
})

app.listen(8080, function(){
    console.log('the server listening');
})

