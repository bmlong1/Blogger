var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
var ctrlBlog = require('../controllers/blogs');
var ctrlAuth = require('../controllers/authentication');
var ctrlOnlineUser = require('../controllers/onlineUser');
var ctrlGameUsers = require('../controllers/gameUsers');

router.get('/blogs', ctrlBlog.blogList);
router.post('/blogs', auth, ctrlBlog.blogCreate);
router.get('/blogs/:blogid', ctrlBlog.blogReadOne);
router.put('/blogs/:blogid', auth, ctrlBlog.blogUpdateOne);
router.delete('/blogs/:blogid', auth, ctrlBlog.blogDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/allUsers', ctrlAuth.userList);

router.post('/user', ctrlOnlineUser.onlineUserAdd);
router.get('/user', ctrlOnlineUser.onlineUserList);
router.delete('/user/:email', ctrlOnlineUser.onlineUserDelete);

router.post('/gameUsers/:challengerName/:challengerEmail/:playerName/:playerEmail', ctrlGameUsers.onlineUserStartGame);
router.get('/gameUsers', ctrlGameUsers.onlineUserGameList);
router.delete('/gameUsers/:challengerEmail/:playerEmail', ctrlGameUsers.onlineUserDeleteGame);
router.get('/gameUsers/:playerEmail', ctrlGameUsers.isAPlayer);

router.get('/challenger', ctrlGameUsers.challenger);
router.get('/player', ctrlGameUsers.player);
module.exports = router;
