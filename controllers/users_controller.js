const User = require('../models/user');

module.exports.profile = function (req, res) {

    User.findById(req.params.id)
    .then((user)=>{
        res.render('user_profile', { 
            title: 'profile',
            profile_user: user 
        });
    }).catch((err)=>{
        console.log(`Error: ${err}`);
    })
}

module.exports.update = async function(req,res){
    console.log('inside update function');
    console.log(req.body);
    if(req.user.id == req.params.id){
        await User.findByIdAndUpdate(req.user.id,req.body);
        req.flash('success','User profile got updated');
        return res.redirect('back');
    }else {
        req.flash('warning',"Cannot update other's profile");
        return res.status(401).send('Unauthorized');
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
        req.flash('success','You have Logged Out!');
        return res.redirect('/signin');
    });
}
