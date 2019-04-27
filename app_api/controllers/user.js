const mongoose = require('mongoose');
const OnlineUser = mongoose.model('OnlineUsers');

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

const onlineUserList = function (req, res) {
    OnlineUser.find().exec(function(err, results) {
        if (!results) {
           sendJSONresponse(res, 404, {
               "message" : "No users found"
           });
        } else if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        sendJSONresponse(res, 200, buildOnlineUserList(req, res, results));
    });
};        

const buildOnlineUserList = function(req, res, results) {
    var onlineUsers = [];
    results.forEach(function(obj) {
        onlineUsers.push({
           userName: obj.userName,
	   userEmail: obj.userEmail
        });
    });
    return onlineUsers;
};

const onlineUserAdd = function (req, res) {
    OnlineUser.create({
        userName: req.body.email,
        userEmail: req.body.email,
    }, function(err, onlineuser) {
      if(err) {
        send JSONResponse(res, 400, err);
      } else {
      send JSONResponse(res, 201, onlineuser);
      }
    });
};

module.exports = {
    onlineUserList,
    onlineUserAdd
};
