const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const queue = require('../config/kue');
const emailsWorker = require('../workers/emails_worker');

// store comments to database
module.exports.create = async function (req, res) {
    // fetched postID through button value
    try {
        console.log(req.body);
        const post = await Post.findById(req.body.postID);
        const newComment = await Comment.create({ content: req.body.comment, user: req.user._id, post: post._id });

        const myComment = await Comment.findById(newComment._id).populate('user');

        // hide password
        myComment.user.password = '';

        // adding comment to post comments list
        post.comments.unshift(newComment._id);
        post.save();

        // sending comment emails to emails queue delayed job
        // using signup to specify job type @ workers/emails_worker
        let job = queue.create('emails', { comment: myComment }).save(function (err) {
            if (err) {
                console.log('Error in sending comment to queue', err);
                return;
            }
            console.log('comment job enqueued', job.id);
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    comment: myComment
                }, message: 'Comment Published!'
            })
        }

        req.flash('success', 'Comment Published!');
    } catch (err) {
        console.log(`Error: ${err}`);
    }
    res.redirect('back');
}

// destroy comment from database
module.exports.destroy = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('post');
        // check if comment or post belongs to logged in user
        if (comment.user == req.user.id || comment.post.user == req.user.id) {
            let postID = comment.post.id;

            await Comment.deleteOne({ _id: req.params.id });
            await Post.findByIdAndUpdate(postID, { $pull: { comments: comment._id } });
            await Like.deleteMany({likeable: req.params.id, onModel: 'Comment'});

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    }, 
                    message: 'Comment and all associated likes deleted',
                });
            }
            req.flash('success', 'Comment and all associated likes deleted');

        } else {
            req.flash('error', 'Cannot delete comment');
        }
        res.redirect('back');
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}