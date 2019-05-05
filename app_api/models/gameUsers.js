var mongoose = require('mongoose');

var onlineUserGame = new mongoose.Schema({
    challengerName: String,
    challengerEmail: String,
    playerName: String,
    playerEmail: String
});

mongoose.model('GameUsers', onlineUserGame);
