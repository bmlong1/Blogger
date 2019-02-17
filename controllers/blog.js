/* GET Blog List Page */
module.exports.blogList = function(req, res) {
	res.render('blogList', { title: 'Blog List' });
};

/* Get Blog Add Page */
module.exports.blogAdd = function(req, res) {
	res.render('blogAdd', { title: 'Blog Add' });
};
