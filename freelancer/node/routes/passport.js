var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var mongo = require('./mongo');
var session = require('express-session');
var User = mongo.User;
var salt = bcrypt.genSaltSync(10);
var kafka = require('./kafka/client');


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

module.exports = function(passport){
    passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
function(req, username, password, done){
    /*User.find({username: username}, function(err, user){
        if(err) {return done(err)}
        else if(user.length){
            if(bcrypt.compareSync(password, user[0].password)){
                req.session.user = username;
                console.log(req.session);
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        }
        else {
            return done(null, false);
        }
    })*/

    kafka.make_request('test1', {"username": username, "password": password}, function(err, results){
        console.log('in results');
        console.log(results);
        if(err){
            done(err, {});
        }
        else{
            if(results.code == 201){
                req.session.user = username;
                console.log('done called');
                done(null, results);
            }
            else{
                done(null, false);
            }
        }
    });
}
))
}