const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res) {

    // get posts from db
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .then((postList)=>{
        // get users from db
        User.find({})
        .then((usersList)=>{
            res.render('home', { 
                title: 'home',
                users: usersList,
                posts: postList
            });
        }).catch((err)=>{
            console.log('Error getting users from db');
            return;
        })
    }).catch((err)=>{
        console.log('Error getting posts from database');
    })

}
