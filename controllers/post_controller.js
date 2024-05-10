const Post = require('../models/post');
const Comment = require('../models/comment');
// storing post to database by associating user id with it!
module.exports.createPost = function (req, res) {
    console.log(req.body);
    console.log(req.user._id);
    Post.create({ content: req.body.content, user: req.user._id })
        .then((post) => {
            console.log('post created successfully');
        })
        .catch((err) => {
            console.log('Error creating Post to database');
            return;
        });
    res.redirect('back');
}

// store comments to database
module.exports.createComment = function (req, res) {
    // fetched postID through button value
    Comment.create({ comment: req.body.comment, user: req.user._id, post: req.body.postID })
        .then((newComment) => {
            console.log('Comment added successfully');
        }).catch((err) => {
            console.log('Error creating comment to database');
            return;
        });
    res.redirect('back');
}