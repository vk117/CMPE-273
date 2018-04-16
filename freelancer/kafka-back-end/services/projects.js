var mongo = require('./mongo');

var conn = mongo.mongoose.connection;
var Project = mongo.Project;

function handle_request(msg, callback){
    var res = {};
    console.log('In handle request ' + JSON.stringify(msg));
    if(msg.request_type == 'put_project'){
        Project.count(function(err, count){
            var id;
            if(!err && count == 0){
                console.log(count);
                id = 0;
            }
            else{
                console.log(count);
                id = count;
            }
            var new_project = new Project({_id: id, title: msg.data.title, description: msg.data.description, skills: msg.data.skills, budget: msg.data.budget, user: msg.data.user});
            new_project.save(function(err, new_user){
                if(err) {
                    return console.error(err);
                    res.code == '401';
                    res.value == 'error encountered';
                }
                else {
                    res.code = 201;
                    res.value = 'Success';
                }
                callback(null, res);
            });
        });
    }

    if(msg.request_type == 'get_projects'){
        Project.find({}, function(err, result){
            if(err){
                return console.error(err);
                res.code = '401';
                res.value = 'Error encountered';
            }
            else if(result.length){
                console.log('Projects found');
                res.code = '201';
                res.data = result;
            }
            else{
                res.code = '401';
                res.value = 'no project found';
            }
            callback(null, res);
        });
    }

    if(msg.request_type == 'get_project'){
        Project.find({_id: msg.data.id}, function(err, result){
            if(err){
                return console.error(err);
                res.code = '401';
                res.value = 'Error encountered';
            }
            else if(result.length){
                console.log('Project found');
                res.code = '201';
                res.data = result;
            }
            else{
                res.code = '401';
                res.value = 'no project found';
            }
            callback(null, res);
        });
    }

    if(msg.request_type == 'getuserprojects'){
        Project.find({user: msg.data.user}, function(err, result){
            if(err){
                return console.error(err);
                res.code = '401';
                res.value = 'Error encountered';
            }
            else if(result.length){
                console.log('user projects found');
                res.code = '201';
                res.data = result;
            }
            else{
                res.code = '401';
                res.value = 'no project found';
            }
            callback(null, res);
        });
    }

    if(msg.request_type == 'hire'){
        Project.update({_id: msg.data._id}, {$set:{status: msg.data.status, assigned_to: msg.data.assigned_to}}, function(err, result){
            if(err){
                return console.error(err);
                res.code = '401';
                res.value = 'Error encountered';
            }
            else if(result){
                res.code = '201';
            }
            else{
                res.code = '401';
            }
            callback(null, res);
        })
    }
}

exports.handle_request = handle_request;