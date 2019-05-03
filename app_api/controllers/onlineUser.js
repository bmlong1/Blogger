const mongoose = require('mongoose');
const OnlineUser = mongoose.model('OnlineUsers');

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

const onlineUserList = function (req, res) {
    OnlineUser.find().exec(function(err, results) {
        if (!results) {
           sendJSONResponse(res, 404, {
               "message" : "No users found"
           });
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }
        sendJSONResponse(res, 200, buildOnlineUserList(req, res, results));
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
	console.log(OnlineUser.find({userEmail:req.params.email}).userEmail);
	if(OnlineUser.find({userEmail: req.params.email}) != undefined) {
	   }else {
    OnlineUser.create({
        userName: req.body.name,
        userEmail: req.body.email,
    }, function(err, onlineuser) {
      if(err) {
        sendJSONResponse(res, 400, err);
      } else {
      sendJSONResponse(res, 201, onlineuser);
      }
    });
}
};

const onlineUserDelete = function(req, res) {
	OnlineUser.deleteMany({userEmail: req.params.email}, function(err) {});
};

module.exports = {
    onlineUserList,
    onlineUserAdd,
    onlineUserDelete
};
