var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var OnlineUser = mongoose.model('OnlineUsers');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.register = function(req, res) {
	if(!req.body.name || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}

	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.setPassword(req.body.password);

	user.save(function(err) {
		var token;
		if (err) {
			sendJSONresponse(res, 404, err);
		} else {
			token = user.generateJwt();
			sendJSONresponse(res, 200, {
				"token" : token
			});
		}
	});
};

module.exports.login = function(req, res) {
	if(!req.body.email || !req.body.password) {      
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}

	passport.authenticate('local', function(err, user, info){
		var token;
		if (err) {
			sendJSONresponse(res, 404, err);
			return;
		}
		if(user){
			token = user.generateJwt();
			sendJSONresponse(res, 200, {
				"token" : token
			});

		} else {
			sendJSONresponse(res, 401, info);
		}
  })(req, res);
};

module.exports.userList = function (req, res) {
    User.find().exec(function(err, results) {
        if (!results) {
           sendJSONresponse(res, 404, {
               "message" : "No users found"
           });
        } else if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
	
        sendJSONresponse(res, 200, buildUserList(req, res, results));
    });
};        

var buildUserList = function(req, res, results) {
    var users = [];
    results.forEach(function(obj) {
        users.push({
           userName: obj.name,
	   userEmail: obj.email
        });
    });
    return users;
};
