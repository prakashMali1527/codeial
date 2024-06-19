const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const queue = require('../config/kue');
const emailsWorker = require('../workers/emails_worker');

// storing post to database by associating user id with it!
module.exports.createPost = async function (req, res) {
    try {
        const post = await Post.create({ content: req.body.content, user: req.user._id });
        const myPost = await Post.findById(post._id).populate('user');

        // hide password
        myPost.user.password = '';

        // sending post emails to emails queue delayed job
        // using signup to specify job type @ workers/emails_worker
        let job = queue.create('emails', { post: myPost }).save(function (err) {
            if (err) {
                console.log('Error in sending post to queue', err);
                return;
            }
            console.log('post job enqueued', job.id);
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: myPost
                },
                message: 'Post Published!'
            });
        }
        req.flash('success', 'Post Published!');

    } catch (err) {
        req.flash('error', 'Error publishing post');
    }
    res.redirect('back');
}

// destroying post and all comments on it
module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        // delete only if it is current user post
        if (post.user == req.user.id) {
            await Post.deleteOne({ _id: req.params.id })

            // delete all post likes
            await Like.deleteMany({ likeable: req.params.id, onModel: 'Post' });

            // delete all post's comments likes
            for (let comment of post.comments) {
                // here comment is comment id without populate
                await Like.deleteMany({ likeable: comment, onModel: 'Comment' });
            }

            // delete all comments
            await Comment.deleteMany({ post: req.params.id });


            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    }, message: 'Post and all associated comments and likes deleted!'
                });
            }
            req.flash('success', 'Post and all associated comments and likes deleted!');
        } else {
            req.flash('error', `Cannot delete other's post`);
        }

    } catch (err) {
        req.flash('error', 'Error deleting post');
        console.log(`Error: ${err}`);
    }
    res.redirect('back');
}