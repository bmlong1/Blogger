var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    "blog-title": String,
    "blog-text": String,
    "created-on": {
        type: Date,
        "default": Date.now
    }
});

mongoose.model('Blog', blogSchema);
