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
    Post.findById(req.body.postID)
        .then((post) => {
            Comment.create({ content: req.body.comment, user: req.user._id, post: post._id })
                .then((newComment) => {
                    console.log('comment added successfully to db');
                    // add comment to post comments list
                    post.comments.push(newComment._id);
                    post.save();
                }).catch((err) => {
                    console.log('Error creating comment in database');
                    return;
                });
        }).catch((err) => {
            console.log('Error validating post in database');
            return;
        });
    res.redirect('back');
}

module.exports.destroy = function (req, res) {
    Post.findById(req.params.id)
        .then((post) => {
            if (post.user == req.user.id) {

                Post.deleteOne({ _id: req.params.id })
                    .then(() => {
                        console.log('post deleted');
                    }).catch((err) => {
                        console.log('error deleting the post');
                        return res.redirect('back');
                    })

                Comment.deleteMany({ post: req.params.id })
                    .then(() => {
                        console.log('All comments related to post destroyed');
                    }).catch((err) => {
                        console.log('Error deleting all comments related to post');
                        return;
                    })
            }

        }).catch((err) => {
            console.log('Cannot delete post');
            return;
        })
    res.redirect('back');
}