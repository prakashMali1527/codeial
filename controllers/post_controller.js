const Post = require('../models/post');
// storing post to database by associating user id with it!
module.exports.createPost = function (req, res) {
    console.log(req.body);
    console.log(req.user._id);
    Post.create({content:req.body.content, user:req.user._id})
    .then((post)=>{
        console.log('post created successfully');
    })
    .catch((err)=>{
        console.log('Error creating Post to database');
        return;
    });
    res.redirect('back');
}
