const Post = require('../models/post');
const Comment = require('../models/comment');
// storing post to database by associating user id with it!
module.exports.createPost = async function (req, res) {
    try {
        const post = await Post.create({ content: req.body.content, user: req.user._id });
        const myPost = await Post.findById(post._id).populate('user');

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: myPost
                },
                message: 'Post created!'
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
            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },message: 'Post deleted!'
                });
            }
            req.flash('success', 'Post and all associated comment deleted');
        } else {
            req.flash('error', `Cannot delete other's post`);
        }

    } catch (err) {
        req.flash('error', 'Error deleting post');
        console.log(`Error: ${err}`);
    }
    res.redirect('back');
}