const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

const commentList = function (req, res) {
    Chat.find().exec(function(err, results) {
        if (!results) {
           sendJSONResponse(res, 404, {
               "message" : "No blogs found"
           });
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }
        sendJSONResponse(res, 200, buildChatList(req, res, results));
    });
};        

var buildChatList = function(req, res, results) {
    var comments = [];
    results.forEach(function(obj) {
        comments.push({
            comment: obj.comment,
            authorName: obj.authorName,
            authorEmail: obj.authorEmail,
            _id: obj._id
        });
    });
    return comments;
};

const chatAdd = function (req, res) {
    Chat.create({
        comment: req.body.comment,
        authorName: req.body.authorName,
        authorEmail: req.body.authorEmail,
    }, function(err, chat) {
        if (err) {
            sendJSONResponse(res, 400, err);
        } else {
            sendJSONResponse(res, 201, chat);
        }
    });
};
        
const chatDelete = function (req, res) {
    Chat
        .findByIdAndRemove(req.params.chatid)
        .exec(function(err, chat) {
            if (err) {
                sendJSONResponse(res, 404, err);         
            } else {
                sendJSONResponse(res, 204, null);
            }
        });
};

module.exports = {
    commentList,
    chatAdd,
    chatDelete
};
