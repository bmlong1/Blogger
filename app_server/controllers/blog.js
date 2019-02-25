
/* GET Blog List Page */
module.exports.blogList = function(req, res) {
    res.render('blogList', { title: 'Blog List',
        blogs: [{
           blogTitle: 'My First Blog Entry',
           blogText: 'Hello, World.',
           createdOn: new Date('Sept 27, 1998')
        }, {
           blogTitle: 'Our New York Trip',
           blogText: 'A spontaneous weekend at the Big Apple.',
           createdOn: new Date('Jan 28, 2019')
        }, {
           blogTitle: 'Our OTHER New York Trip',
           blogText: 'A planned weekend on Broadway.',
           createdOn: new Date('Feb 18, 2019')
	}],
    });
};

/* Get Blog Add Page */
module.exports.blogAdd = function(req, res) {
    res.render('blogAdd', { title: 'Blog Add' });
};

/*Get Blog Edit Page */
module.exports.blogEdit = function(req, res) {
    res.render('blogEdit', { title: 'Blog Edit' });
};

/* Get Blog Delete Page */
module.exports.blogDelete = function(req, res) {
    res.render('blogDelete', { title: 'Blog Delete' });
};
