const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){
    console.log('inside index');
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.status(200).json({
        messages: 'List of posts',
        posts: posts
    })
}


// Api request to destroy post and all associated comments on it
module.exports.destroy = async function (req, res) {
    try {
        console.log('inside destroy');
        await Post.deleteOne({ _id: req.params.id })
        await Comment.deleteMany({ post: req.params.id });

        return res.status(200).json({
            messages: "Post and all associated comments got deleted!"
        })
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            messages: 'Internal Server Error'
        })
    }
}