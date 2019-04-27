    
var mongoose = require('mongoose');

var onlineUserSchema = new mongoose.Schema({
    userName: String,
    userEmail: String
});

mongoose.model('OnlineUsers', onlineUserSchema);
