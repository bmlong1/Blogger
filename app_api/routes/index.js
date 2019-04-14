var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
var ctrlBlog = require('../controllers/blogs');
var ctrlAuth = require('../controllers/authentication');

router.get('/blogs', ctrlBlog.blogList);
router.post('/blogs', ctrlBlog.blogCreate);
router.get('/blogs/:blogid', ctrlBlog.blogReadOne);
router.put('/blogs/:blogid', ctrlBlog.blogUpdateOne);
router.delete('/blogs/:blogid', ctrlBlog.blogDeleteOne);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
