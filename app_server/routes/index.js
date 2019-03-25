var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blogs');

/* Setup routes to pages */
router.get('/', ctrlHome.home);
router.get('/blog-add', ctrlBlog.blogAdd);
router.post('/blog-add/', ctrlBlog.blogAddPost);
router.get('/blog-list', ctrlBlog.blogList);
router.get('/blog-delete/:blogid', ctrlBlog.blogDelete);
router.post('/blog-delete/:blogid', ctrlBlog.blogDeletePost);
router.get('/blog-edit/:blogid', ctrlBlog.blogEdit);
router.post('/blog-edit/:blogid', ctrlBlog.blogEditPost);
module.exports = router;
