const Post = require('../models/post');

module.exports.profile = function (req, res) {
    res.render('user_profile', { title: 'profile' });
}

module.exports.post = function (req, res) {
    res.end('<h1>User Post</h1>');
}

module.exports.friends = function (req, res) {
    res.send('<ul> <li> friend List </li> </ul>');
}

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