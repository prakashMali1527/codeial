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

// destroying post and all comments on it
module.exports.destroy = async function (req, res) {
    try{
        const post = await Post.findById(req.params.id)
        // delete only if it is current user post
        if (post.user == req.user.id) {
        await Post.deleteOne({ _id: req.params.id })
        await Comment.deleteMany({ post: req.params.id })
    }
    res.redirect('back');
    
    }catch(err){
        console.log(`Error: ${err}`);
    }
}