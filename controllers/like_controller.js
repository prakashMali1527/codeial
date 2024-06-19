const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req,res){
    // like/toggle/?id=938493&type=post
    
    try{
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');

        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        let existingLike;
        // find if like is already made
        for(let like of likeable.likes){
            if(like.user == req.user.id){
                existingLike = like;
                break;
            }
        }

        if(existingLike){
            // like already made remove it from db
            likeable.likes.pull(existingLike);
            likeable.save();

            await Like.deleteOne(existingLike);
            
            deleted = true;
        }else{
            // create a like in db
            const newLike = await Like.create({
                user: req.user._id,
                likeable: likeable._id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }
            
        if(req.xhr){
            return res.status(200).json({
                message: 'Like successfully toggled',
                deleted: deleted
            });
        }
        

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal server error!"
        });
    }
}