var crypto = require('crypto');
var conn = require('./Connection');

var TIMEOUT = 8000;
var self;
exports = module.exports = KafkaRPC;

function KafkaRPC(){
    self = this;
    this.connection = conn;
    this.producer = this.connection.getProducer();
    this.requests = {};
    this.response_queue = false;
}

KafkaRPC.prototype.makeRequest = function(topic_name, content, callback){
    self = this;
    var correlationId = crypto.randomBytes(16).toString('hex');

    var tId = setTimeout(function(corr_id){
        console.log('timeout');
        callback(new Error("timeout " + corr_id));
        delete self.requests[corr_id];
    }, TIMEOUT, correlationId);

    var entry = {
        callback: callback,
        timeout: tId
    };

    self.requests[correlationId] = entry;

    self.setupResponseQueue(self.producer,topic_name,function(){
        var payloads = [
            {
                topic: topic_name,
                messages: JSON.stringify({data: content, replyTo: 'test1_reply', correlationId: correlationId}),
                //replyTo: 'test1_reply',
                partition: 0
            }
        ];
        self.producer.send(payloads, function(err, data){
            if(err) console.error(err);
            console.log(data);
        });
    });
    /*var payloads = [
        {
            topic: topic_name,
            messages: JSON.stringify({data: content}),
            replyTo: 'test1_reply',
            partition: 0
        }
    ];
    self.producer.send(payloads, function(err, data){
        console.log(data);
    });*/
}

KafkaRPC.prototype.setupResponseQueue = function(producer, topic_name, next){
    if(this.response_queue) return next();
    self = this;
    var consumer = self.connection.getConsumer('test1_reply');
    consumer.on('message', function(message){
        console.log(message);
        var data = JSON.parse(message.value);
        var correlationId = data.correlationId;

        if(correlationId in self.requests){
            var entry = self.requests[correlationId];
            clearTimeout(entry.timeout);
            delete self.requests[correlationId];
            entry.callback(null, data.data);
        }
    });
    self.response_queue = true;
    console.log('returning next')
    return next();
}
