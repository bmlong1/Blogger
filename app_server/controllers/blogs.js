const request = require('request');
const apiOptions = {
    server : 'http://localhost'
};

/* GET Blog List */
const blogList = function(req, res){
    const path = '/api/blogs';
    const requestOptions = {
        url: apiOptions.server + path,
        method : 'GET',
        json : {},
        qs : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            renderBlogList(req, res, body);
        }
    );
};

/* Render the blog list page */
const renderBlogList = function(req, res, responseBody) {
    res.render('blogList', {
        title: 'Blog List',
        pageHeader: {
            title: 'Blog List'
        },
        blogs: responseBody
    });
}

/* Blog Add */
const blogAdd = function(req, res) {
    res.render('blogAdd', { title: 'Add Blog' });
};

/* Blog Add Post */
const blogAddPost = function(req, res) {
    var requestOptions, path, postdata;
    path = '/api/blogs/';

    postdata = {
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText
    };

    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : postdata
    };

    request(
        requestOptions,
        function(err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/blog-list');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

/* Blog Edit */
const blogEdit = function(req, res) {
    var requestOptions, path;
    path = "/api/blogs/" + req.params.id;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            renderEditBlog(req, res, body);
        }
    );
};

/* Book Edit Post */
const blogEditPost = function(req, res, responseBody) {
    var requestOptions, path, postdata;
    var id = req.params.id;
    path = '/api/blogs/' + id;

    postdata = {
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText
    };

    requestOptions = {
        url : apiOptions.server + path,
        method : "PUT",
        json : postdata
    };

    request(
        requestOptions,
        function(err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/blog-list');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

/* Render the Blog Edit Page */
var renderEditBlog = function(req, res, responseBody) {
    res.render('blogEdit', {
        title: 'Blog Edit',
        pageHeader: {
            title: 'Blog Edit'
        },
        blog: responseBody
    });
};


/* Blog Delete */
const blogDelete = function(req, res) {
    var requestOptions, path;
    path = "/api/blogs/" + req.params.id;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            renderDeleteBlog(req, res, body);
        }
    );
};

const blogDeletePost = function(req, res) {
    var requestOptions, path, postdata;
    var id = req.params.id;
    path = '/api/blogs/' + id;

    requestOptions = {
        url : apiOptions.server + path,
        method : "DELETE",
        json : {} 
    };

    request (
        requestOptions,
        function(err , response, body) {
            if (resopnse.statusCode === 204) {
                res.redirect('/blog-list');
            } else {
                _showError(req, res, response.statusCode);
            }
        } 
    );
};

/* Render the Blog delete page */
var renderDeleteBlog = function(req, res, responseBody) {
    res.render('blogDelete', { 
        title: 'Blog Delete',
        pageHeader: {
            title: 'Blog Delete'
        },
        blog: responseBody
    });
};

const _showError = function(req, res, status) {
    let title = '';
    let content = '';
    if (status === 404) {
        title = '404, page not found';
        content = 'Oh dear. Looks like we can\'t find this page. Sorry.';
    } else {
        title = `${status}, something's gone wrong`;
        content = 'Something, somewhere, has gone just a little bit wrong.';
    }
    res.status(status);
    res.render('generic-text', {
        title : title,
        content : content
    });
};

module.exports = {
    blogList,
    blogAdd,
    blogAddPost,
    blogEdit,
    blogEditPost,
    blogDelete,
    blogDeletePost
};