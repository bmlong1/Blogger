const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

const blogList = function (req, res) {
    Blog.find().exec(function(err, results) {
        if (!results) {
           sendJSONResponse(res, 404, {
               "message" : "No blogs found"
           });
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }
        sendJSONResponse(res, 200, buildBlogList(req, res, results));
    });
};        

var buildBlogList = function(req, res, results) {
    var blogs = [];
    results.forEach(function(obj) {
        blogs.push({
            blogTitle: obj.blogTitle,
            blogText: obj.blogText,
            createdOn: obj.createdOn,
            _id: obj._id
        });
    });
    return blogs;
};

const blogCreate = function (req, res) {
    Blog.create({
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
    }, function(err, blog) {
        if (err) {
            sendJSONResponse(res, 400, err);
        } else {
            sendJSONResponse(res, 201, blog);
        }
    });
};

const blogReadOne = function (req, res) {
    if (req.params && req.params.blogid) {
        Blog
            .findById(req.params.blogid)
            .exec(function(err, blog) {
                if (!blog) {
                    sendJSONResponse(res, 404, {
                        "message": "Blogid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 200, blog);
            });
    } else {
        sendJSONResponse(res, 404, {
            "message": "No blogid in request"
        });
    }
};
  
const blogUpdateOne = function (req, res) {
    Blog
        .findOneAndUpdate(
            { _id: req.params.blogid },
            { $set: {"blogTitle": req.body.blogTitle, "blogText": req.body.blogText }},
            function(err, blog) {
                if(err) {
                    sendJSONResponse(res, 400, err);
                } else {
                    sendJSONResponse(res, 201, blog);
                }
            }
        );
};
        
const blogDeleteOne = function (req, res) {
    Blog
        .findByIdAndRemove(req.params.blogid)
        .exec(function(err, blog) {
            if (err) {
                sendJSONResponse(res, 404, err);         
            } else {
                sendJSONResponse(res, 204, null);
            }
        });
};

module.exports = {
    blogList,
    blogCreate,
    blogReadOne,
    blogUpdateOne,
    blogDeleteOne
};
