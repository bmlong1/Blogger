var mongoose = require('mongoose');

var onlineUserGame = new mongoose.Schema({
    challenger: String,
    player: String
});

mongoose.model('GameUsers', onlineUserGame);
