var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/freelancer');
var Schema = mongoose.Schema;

var user_details = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    user: String
});

var user_info = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true, unique: true},
    about: {type: String, required: true},
    skills: {type: String, required: true}
})

var new_project = new Schema({
    _id: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    skills: {type: String, required: true},
    budget: {type: String, required: true},
    user: {type: String, required: true}
})

var User = mongoose.model('User', user_details);
var userInfo = mongoose.model('userInfo', user_info);
var Project = mongoose.model('Project', new_project); 

exports.User = User;
exports.userInfo = userInfo;
exports.Project = Project;
exports.mongoose = mongoose;
