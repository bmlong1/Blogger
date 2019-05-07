var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    comment: String,
    author: String
});

mongoose.model('Chat', chatSchema);
