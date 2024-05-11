const User = require('../models/user');

module.exports.profile = function (req, res) {

    User.findById(req.params.id)
    .then((user)=>{
        res.render('user_profile', { 
            title: 'profile',
            profile_user: user 
        });
    })
}

module.exports.update = function(req,res){
    console.log('inside update function');
    console.log(req.body);
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.user.id,req.body)
        .then((user)=>{
            return res.redirect('back');
        }).catch((err)=>{
            return res.status(401).send('Unauthorized');
        })
    }
}

module.exports.posts = function (req, res) {
    res.end('<h1>User Post</h1>');
}

module.exports.friends = function (req, res) {
    res.send('<ul> <li> friend List </li> </ul>');
}

// Sign Out user and destroy Session
module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log('Error in signing out or destroyingSession');
        }
        res.redirect('/signin');
    });
}
