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
var mongo = require('./routes/mongo');
var passport = require('passport');
require('./routes/passport')(passport);
var MongoStore = require('connect-mongo')(session);
var kafka = require('./routes/kafka/client');

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
        kafka.make_request('test1', {"username": uName, "password": passwordToSave, "user": u_name}, 'add_user', function(err, result){
            console.log('in add user');
            console.log(result);
            if(err){
                res.status(401).end();
            }
            else{
                if(result.code == 201){
                    res.status(201).end();
                }
                else{
                    res.status(401).end();
                }
            }
        });
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
        kafka.make_request('test1', {"name": name, "email": email, "phone": phone, "about": about, "skill": skill}, 'put_details', function(err, result){
            console.log('in add details');
            console.log(result);
            if(err){
                res.status(401).end();
            }
            else{
                if(result.code == 201){
                    res.status(201).end();
                }
                else{
                    res.status(401).end();
                }
            }
        });
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
       kafka.make_request('test1', {"email": username}, 'get_details', function(err, result){
           console.log('in put details');
           console.log(result);
           if(err){
               res.status(401).end();
           }
           else{
               if(result.code == 201){
                   console.log(result);
                   res.status(201).send(result.data);
               }
               else{
                   res.status(401).end();
               }
           }
       });
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
        kafka.make_request('test1', {"title": title, "description": description, "skills": skills, "budget": budget, "user": req.session.user}, 'put_project', function(err, result){
            console.log('in put project');
            console.log(result);
            if(err){
                res.status(401).end();
            }
            else{
                if(result.code == 201){
                    res.status(201).end();
                }
                else{
                    res.status(401).end();
                }
            }
        });
    }
})

app.get('/getproject',function(req, res){
    kafka.make_request('test1', {"todo": 'Send all projects'}, 'get_projects', function(err, result){
        console.log('in get projects');
        if(err){
            console.error(err);
            res.status(401).end();
        }
        else{
            if(result.code == 201){
                console.log(result);
                res.status(201).send(result.data);
            }
            else{
                res.status(401).end();
            }
        }
    });
})

app.get('/projects/:id', function(req, res){
    console.log(req.params.id);
    kafka.make_request('test1', {"id": req.params.id}, 'get_project', function(err, result){
        console.log('in get project');
        if(err){
            console.error(err);
            res.status(401).end();
        }
        else{
            if(result.code == 201){
                if(result.data[0].user == req.session.user){
                console.log(result);
                res.status(201).send({result: result.data, bidInvisible:'true'});
                }
                else{
                    console.log(result);
                    res.status(201).send({result: result.data, bidInvisible:'false'});
                }
            }
            else{
                res.status(401).end();
            }
        }
    });
})

app.post('/getuserprojects', function(req, res){
    var user = req.session.user;
    //console.log(req.body.username);
    kafka.make_request('test1', {"user": user}, 'getuserprojects', function(err, result){
        console.log('in get user projects');
        if(err){
            console.error(err);
            res.status(401).end();
        }
        else{
            if(result.code == 201){
                console.log(result);
                res.status(201).send(result.data);
            }
            else{
                res.status(401).end();
            }
        }
    })
})

app.post('/bid', function(req, res){
    kafka.make_request('test1', 
    {"project_id": req.body.project_id,
    "bid_by": req.session.user,
    "period": req.body.period,
    "bid": req.body.bid,
    "project_title": req.body.project_title}, 'postBid', function(err, result){
        console.log('in post bids');
        if(err){
            console.error(err);
            res.status(401).end();
        }
        else{
            if(result.code == 201){
                res.status(201).end();
            }
            else if(result.code == 400){
                res.status(400).end();
            }
            else{
                res.status(401).end();
            }
        }
    });
})

app.post('/getuserbids', function(req, res){
    var user = req.session.user;
    kafka.make_request('test1', {"bid_by": user}, 'userBids', function(err, result){
        console.log('in get user bids');
        console.log(result);
        if(err){
            console.log('in error');
            console.error(err);
            res.status(401).end();
        }
        else{
            if(result.code == 201){
                console.log('in status code 201');
                console.log(result);
                res.status(201).send(result.data);
            }
            else{
                console.log('in dunno');
                res.status(401).end();
            }
        }
    })
})

app.listen(8080, function(){
    console.log('the server listening');
})

