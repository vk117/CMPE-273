var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var session = require('express-session');
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
    kafka.make_request('test1', {"username": username, "password": password}, 'login', function(err, results){
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