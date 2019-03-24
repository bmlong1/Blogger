const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

const blogList = function (req, res) {
    Blog.find().exec(function(err, results) {
        if (!results) {
            res.status(400).json({
                "message" : "no blogs found"
            });
            return;
        } else if (err) {
            res.status(404).json(err);
            return;
        }
        console.log(results);
        res.status(200).json(buildBlogList(req, res, results));
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
    console.log(req.body);
    Blog.create({
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
    }, (err, blog) => {
        if (err) {
            res
                .status(400)
                .json(err);
                console.log(err);
        } else {
            res
                .status(201)
                .json(blog);
        }
    });
};

const blogReadOne = function (req, res) {
    if (req.params && req.params.blogid) {
        Blog
            .findById(req.params.blogid)
            .exec((err, blog) => {
                if (!blog) {
                    res.status(404).json({
                        "message": "blogid not found"
                    });
                    return;
                } else if (err) {
                    res.status(404).json(err);
                    return;
                }
                res.status(200).json(blog);
            });
    } else {
        res.status(404).json({
            "message": "No blogid in request"
        });
    }
};

const blogUpdateOne = function (req, res) {
    if (!req.params.blogid) {
        res.status(404).json({
            "message": "Not found, blogid is required"
        });
        return;
    } 
    Blog
        .findById(req.params.blogid)
        .exec((err, blog) => {
            if (!blog) {
                res.json(404).status({
                    "message": "blogid not found"
                });
                return;
            } else if (err) {
                res.status(400).json(err);
                return;
            }
            blog.blogTitle = req.body.blogTitle;
            blog.blogText = req.body.blogText;
            
            blog.save((err, blog) => {
                if (err) {
                    res.status(404).json(err);
                } else {
                    res.status(200).json(blog);
                }
            });
        });
};

const blogDeleteOne = function (req, res) {
    const blogid = req.params.blogid;
    if (blogid) {
        Blog
            .findByIdAndRemove(blogid)
            .exec((err, blog) => {
                if (err) {
                    res.status(404).json(err);
                    return;
                } 
                res.status(204).json(null);    
            });
    } else {
        res.status(404).json({
            "message" : "No blogid"
        });
    }
};

module.exports = {
    blogList,
    blogCreate,
    blogReadOne,
    blogUpdateOne,
    blogDeleteOne
};
