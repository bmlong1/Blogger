const mongoose = require('mongoose');
const GameUsers = mongoose.model('GameUsers');

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
	console.log(content);
};



const onlineUserGameList = function (req, res) {
    GameUsers.find().exec(function(err, results) {
        if (!results) {
           sendJSONResponse(res, 404, {
               "message" : "No users found"
           });
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }
	 console.log(results);
        sendJSONResponse(res, 200, buildOnlineUserGameList(req, res, results));
    });
};        

const buildOnlineUserGameList = function(req, res, results) {
    var onlineUsers = [];
    results.forEach(function(obj) {
        onlineUsers.push({
           challenger: obj.challenger,
	   player: obj.player
        });
    });
    return onlineUsers;
};

const isAPlayer = function (req, res) {
	GameUsers.deleteMany({challengerEmail:"brianamarielong@aol.com"});
	GameUsers.find({challengerEmail: req.params.playerEmail}).exec(function(err, results) {
		if(! results) {
			sendJSONResponse(res, 404, {
				"message" : "user is not in a game"
			});
		} else if(err) {
			sendJSONResponse(res, 404, err);
			return;
		} 
		console.log(results);
		sendJSONResponse(res, 200, results);
	});
};


const onlineUserStartGame = function(req, res) {
	GameUsers.create({
		challengerName: req.params.challengerName,
		challengerEmail: req.params.challengerEmail,
		playerName: req.params.playerName,
		playerEmail: req.params.playerEmail
	}, function(err, gameUsers) {
		if(err) {
			sendJSONResponse(res, 400, err);
		}else {
			sendJSONResponse(res, 201, gameUsers);
		}
	});
};

const onlineUserDeleteGame = function(req, res) {
	GameUsers.deleteMany({challengerEmail: req.params.challengerEmail, playerEmail: req.params.playerEmail}, function(err) {});
};


module.exports = {
	onlineUserStartGame,
	onlineUserDeleteGame,
	onlineUserGameList, 
	isAPlayer
};
