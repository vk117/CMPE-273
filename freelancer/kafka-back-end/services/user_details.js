var mongo = require('./mongo');

var conn = mongo.mongoose.connection;
var userInfo = mongo.userInfo;

function handle_request(msg, callback){
    var res = {};
    console.log('In handle request ' + JSON.stringify(msg));
    if(msg.request_type == 'put_details'){
        var new_info = new userInfo({name: msg.data.name, email: msg.data.email, phone: msg.data.phone, about: msg.data.about, skills: msg.data.skill});
        new_info.save(function(err, new_info){
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

    if(msg.request_type == 'get_details'){
        userInfo.find({email: msg.data.email}, function(err, details){
            if(err) {
                return console.error(err);
                res.code = 401;
                res.value = 'Error encountered';}
                
            else if(details.length){
                console.log('User found');
                res.code = 201;
                res.data = details;
            }
            else{
                res.code = 401;
                res.value = 'No such user';
            }
            callback(null, res);
        });
    }
}

exports.handle_request = handle_request;