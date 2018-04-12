var connection = new require('./kafka/Connection');
var login = require('./services/login');
var add_user = require('./services/add_user');
var user_details = require('./services/user_details');
var project = require('./services/projects');

var topic_name = 'test1';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function(message){
    console.log('message recieved');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    //console.log(data.data.username);
    if(data.request_type == 'login'){
        login.handle_request(data.data, function(err, res){
            var str = JSON.stringify(res);
            console.log('after handle' + str);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    }

    if(data.request_type == 'add_user'){
        add_user.handle_request(data.data, function(err, res){
            var str = JSON.stringify(res);
            console.log('after handle' + str);
            var payloads =[
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    }

    if(data.request_type == 'put_details' || 'get_details'){
        user_details.handle_request(data, function(err, res){
            var str = JSON.stringify(res);
            console.log('after handle' + str);
            var payloads =[
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        })
    }

    if(data.request_type == 'put_project' || 'get_projects'){
        project.handle_request(data, function(req, res){
            var str = JSON.stringify(res);
            console.log('after handle' + str);
            var payloads =[
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        })
    }
   
});


