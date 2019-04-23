var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    blogTitle: String,
    blogText: String,
    author: String,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

mongoose.model('Blog', blogSchema);
