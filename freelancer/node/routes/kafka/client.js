var rpc = new (require('./kafkarpc'))();

function make_request(topic_name, msg, callback){
    rpc.makeRequest(topic_name, msg, function(err, response){
        if(err){
            console.error(err);
        }
        else{
            console.log('response', response);
            callback(null, response);
        }
    });
}

exports.make_request = make_request;