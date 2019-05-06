const mongoose = require('mongoose');
const GameUsers = mongoose.model('Game');

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
	console.log(content);
};


const challenger = function(req,res) {
GameUsers.find({challengerEmail: req.params.email}, challengerEmail, function(err, results) {
	if (!results) {
           sendJSONResponse(res, 404, {
               "message" : "No users found"
           });
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }
	sendJSONResponse(res, 200, results);
});
};

const player = function(req,res) {
GameUsers.find({playerEmail: req.params.email}, playerEmail, function(err, results) {
	if (!results) {
           sendJSONResponse(res, 404, {
               "message" : "No users found"
           });
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }
	sendJSONResponse(res, 200, results);
});
};

const otherPlayer = function(req,res) {
	console.log("hey");
GameUsers.find({playerEmail: req.params.email}, challengerEmail, function(err, results) {
	if (!results) {
           GameUsers.find({challengerEmail: req.params.email}, playerEmail, playerName, function(err, results) {
	if (!results) {
           sendJSONResponse(res, 404, {
               "message" : "No users found"
           });
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }
	sendJSONResponse(res, 200, results);
});
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }
	sendJSONResponse(res, 200, results);
});
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
           challengerName: obj.challengerName,
	   challengerEmail: obj.challengerEmail,
 	   playerName: obj.playerName,
	   playerEmail: obj.playerEmail
	});
    });
    return onlineUsers;
};


								     
const isAPlayer = function (req, res) {
	/*GameUsers.deleteMany({challengerEmail:"brianamarielong@aol.com"}, function(err){});
	GameUsers.deleteMany({challengerEmail:"bmlong1@millersville.edu"}, function(err){});*/
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
	isAPlayer,
	challenger,
	player,
	otherPlayer
};
