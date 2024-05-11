const Post = require('../models/post');
const Comment = require('../models/comment');

// store comments to database
module.exports.create = function (req, res) {
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

// destroy comment from database
module.exports.destroy = function(req,res){
    Comment.findById(req.params.id)
    .then((comment)=>{
        // check if comment belongs to logged in user
        if(comment.user == req.user.id){
            let postID = comment.post;

            Comment.deleteOne({_id:req.params.id})
            .then(()=>{
                console.log('Comment deleted successfully');
            }).catch((err)=>{
                console.log('Error deleting the comment');
                return;
            })

            Post.findByIdAndUpdate(postID,{$pull: {comments: comment._id}})
            .then(()=>{
                console.log('comment removed from post -> comments list');
            }).catch((err)=>{
                console.log('Error removing comment from post --> comments list');
                return;
            })
        }
        res.redirect('back');
    }).catch((err)=>{
        console.log('Error finding the comment');
        return;
    })
}