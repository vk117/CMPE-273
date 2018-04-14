var mongo = require('./mongo');

var conn = mongo.mongoose.connection;
var Bid = mongo.Bid;

function handle_request(msg, callback){
    var res = {};
    console.log('In handle request ' + JSON.stringify(msg.data.project_id));
    if(msg.request_type == 'postBid'){
        Bid.find({project_id: msg.data.project_id, bid_by: msg.data.bid_by}, function(err, bid){
            if(err){
                return console.error(err);
                res.code == '401';
                res.value == 'Error encountered';
            }
            else if(bid.length){
                res.code == '400';
                res.value == 'Bid already exists'
            }
            else{
                Bid.count(function(err, count){
                    var id;
                    if(!err && count == 0){
                        console.log(count);
                        id = 0;
                    }
                    else{
                        console.log(count);
                        id = count;
                    }
                    var new_bid = new Bid({_id: id, project_id: msg.data.project_id, bid_price: msg.data.bid, period: msg.data.period, bid_by: msg.data.bid_by, project_title: msg.data.project_title});
                    new_bid.save(function(err, bid){
                    if(err) {
                        return console.error(err);
                        res.code == '401';
                        res.value == 'error encountered';
                    }
                    else {
                        res.code = '201';
                        res.value = 'Success';
                    }
                    callback(null, res);
                });
            });
            }
        });
    }

    if(msg.request_type == 'userBids'){
        Bid.find({bid_by: msg.data.bid_by}, function(err, bids){
            if(err){
                return console.error(err);
                res.code == '401';
                res.value == 'Error encountered';
            }
            else if(bids.length){
                console.log('Projects found');
                res.code = '201';
                console.log(bids);
                res.data = bids;
            }
            else{
                res.code == '401';
                res.value == 'Bids not found';
            }
            callback(null, res);
        });
    }
}

exports.handle_request = handle_request;