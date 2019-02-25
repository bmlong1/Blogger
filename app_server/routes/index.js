var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Setup routes to pages */
router.get('/', ctrlHome.home);
router.get('/blog-add', ctrlBlog.blogAdd);
router.get('/blog-list', ctrlBlog.blogList);
router.get('/blog-delete', ctrlBlog.blogDelete);
router.get('/blog-edit', ctrlBlog.blogEdit);

module.exports = router;
