
const express = require('express');
const router = express.Router();
var ctrlBlog = require('../controllers/blogs');

router.get('/blogs', ctrlBlog.blogList);
router.post('/blogs', ctrlBlog.blogCreate);
router.get('/blogs/:blogid', ctrlBlog.blogReadOne);
router.put('/blogs/:blogid', ctrlBlog.blogUpdateOne);
router.delete('/blogs/:blogid', ctrlBlog.blogDeleteOne);

module.exports = router;