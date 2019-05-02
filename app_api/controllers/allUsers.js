const mongoose = require('mongoose');
const User = mongoose.model('User');

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

const userList = function (req, res) {
    User.find().exec(function(err, results) {
        if (!results) {
           sendJSONResponse(res, 404, {
               "message" : "No users found"
           });
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }
        sendJSONResponse(res, 200, buildUserList(req, res, results));
    });
};        

const buildUserList = function(req, res, results) {
    var users = [];
    results.forEach(function(obj) {
        users.push({
           userName: obj.userName,
	        userEmail: obj.userEmail
        });
    });
    return users;
};

const userAdd = function (req, res) {
    User.create({
        userName: req.body.name,
        userEmail: req.body.email,
    }, function(err, user) {
      if(err) {
        sendJSONResponse(res, 400, err);
      } else {
      sendJSONResponse(res, 201, user);
      }
    });
};

module.exports = {
    userList,
    userAdd
};
