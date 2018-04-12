var mongo = require('./mongo');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var conn = mongo.mongoose.connection;
var User = mongo.User;

function handle_request(msg, callback){
    var res = {};
    console.log('In handle request ' + JSON.stringify(msg));
    var new_user = new User({username: msg.username, password: msg.password, user: msg.user});
    new_user.save(function(err, new_user){
        if(err) {
            return console.error(err);
            res.code = 401;
            res.value = 'Failed adding';
        }
        else {
            res.code = 201;
            res.value = 'Success';
        }
        callback(null, res);
    });
}

exports.handle_request = handle_request;
