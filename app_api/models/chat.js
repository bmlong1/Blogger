var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    comment: String,
    authorName: String,
    authorEmail: String
});

mongoose.model('Chat', chatSchema);
