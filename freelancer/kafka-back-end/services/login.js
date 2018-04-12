var mongo = require('./mongo');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var conn = mongo.mongoose.connection;
var User = mongo.User;

function handle_request(msg, callback){
    var res = {};
    console.log('In handle request ' + JSON.stringify(msg.username));
    User.find({username: msg.username}, function(err, user){
        if(err) {return done(err)}
        else if(user.length){
            if(bcrypt.compareSync(msg.password, user[0].password)){
                res.code = '201';
                res.value = 'Login Successfull'
            }
            else{
                res.code = '401';
                res.value = 'Unsuccessfull login';
            }
        }
        else {
            res.code = '401'
            res.value = 'failed login';
        }
        callback(null, res);
        //console.log(user[0].password);
    })
    //console.log(x);
}

exports.handle_request = handle_request;
//exports.x = x;
