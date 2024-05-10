const Post = require('../models/post');

module.exports.home = function(req, res) {
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .then((postList)=>{
        res.render('home', { 
            title: 'home',
            posts: postList
        });
    }).catch((err)=>{
        console.log('Error getting posts from database');
        res.render('home', { 
            title: 'home',
            posts: []
        });
    });
}
