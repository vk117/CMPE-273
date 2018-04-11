var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var http = require('http');
var router = express.Router();
var session = require('express-session');
var bcrypt = require('bcrypt');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
require('./routes/passport')(passport);
var mongo = require('./routes/mongo');
var MongoStore = require('connect-mongo')(session);

var userInfo = mongo.userInfo;
var User = mongo.User;
var Project = mongo.Project;
var salt = bcrypt.genSaltSync(10);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
        secret: "don't tell anyone",
        saveUninitialized: true,
        cookie: {secure: false, httpOnly: false},
        store: new MongoStore({ttl: 14 * 24 * 60 * 60, mongooseConnection: mongo.mongoose.connection})
    }));
app.use(cors({
    credentials : true,
    origin: true
}));
app.use(passport.initialize());

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


app.post('/check', 
    passport.authenticate('login'),
    function(req, res){
        //res.redirect('/checksession');
        res.status(201).end();
    }
)

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


app.get('/checksession',function(req, res){
    console.log('Checking session...');
    if(!req.session.user){
        res.status(401).end();
    }
    else{
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        console.log(req.session);
        res.status(201).end();
    }
    
})

app.post('/getdetails', function(req, res){
    var username = req.session.user;
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

app.get('/signout', function(req, res){
    if(req.session.user){
        console.log('Signing Out...');
        console.log(req.session);
        req.session.destroy();
        res.status(201).end();
    }
})

app.post('/postproject', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var skills = req.body.skills;
    var budget = req.body.budget;
    if(title == ''|| title == ' '|| description == ''|| description == ' '|| skills == ''|| skills == ' '|| budget == ''|| budget == ' '){
        res.status(401).end();
    }
    else{
        Project.count(function(err, count){
            var id;
            if(!err && count == 0){
                console.log(count);
                id = 0;
            }
            else{
                console.log(count);
                id = count;
            }
            var new_project = new Project({_id: id, title: title, description: description, skills: skills, budget: budget, user: req.session.user});
            new_project.save(function(err, new_user){
                if(err) return console.error(err);
            })
            console.log('saved new project');
            res.status(201).end();
        })
    }
})

app.get('/getproject',function(req, res){
    Project.find({}, function(err, result){
        if(!err){
            console.log('Response from controller', result);
            res.status(201).send(result);
        }
        else{
            res.status(401).end();
        }
    })
})

app.get('/projects/:id', function(req, res){
    console.log(req.params.id);
    Project.find({_id: req.params.id}, function(err, details){
        if(err) return console.error(err);
        else if(details.length){
            res.status(201).send(details);
        }
        else{
            res.status(401).end();
        }
    })
})

app.listen(8080, function(){
    console.log('the server listening');
})

