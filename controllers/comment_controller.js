const Post = require('../models/post');
const Comment = require('../models/comment');

// store comments to database
module.exports.create = async function (req, res) {
    // fetched postID through button value
   try{
    const post = await Post.findById(req.body.postID);
    const newComment = await Comment.create({ content: req.body.comment, user: req.user._id, post: post._id });
    req.flash('success','Comment Published!');
    // adding comment to post comments list
    post.comments.push(newComment._id);
    post.save();
    res.redirect('back');
   }catch(err){
    console.log(`Error: ${err}`);
   }
}

// destroy comment from database
module.exports.destroy = async function(req,res){
    try{
        const comment = await Comment.findById(req.params.id)
        .populate('post');
        // check if comment or post belongs to logged in user
        if(comment.user == req.user.id || comment.post.user == req.user.id){
            let postID = comment.post.id;

            await Comment.deleteOne({_id:req.params.id});
            req.flash('success','Comment successfully deleted');
            await Post.findByIdAndUpdate(postID,{$pull: {comments: comment._id}});
        }else {
            req.flash('error','Cannot delete comment');
        }
        res.redirect('back');
    }catch(err){
        console.log(`Error: ${err}`);
    }
}