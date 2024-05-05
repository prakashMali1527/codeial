const User = require('../models/user');

module.exports.signIn = function(req,res){
    res.render('signin');
}

// sign in and create a session for user
module.exports.createSession = function(req,res){
    const {email,password} = req.body;

    //find the user
    User.findOne({email})
    .then((user)=>{
        // validate user
        if(!user){
            console.log('User not present : First create account');
            return res.redirect('back');
        }

        // password does not match
        if(user.password!=password){
            console.log('Wrong password entered');
            return res.redirect('back');
        }

        // create session
        res.cookie('user_id',user.id);
        return res.redirect('/users/profile');

    }).catch((err)=>{
        // invalidate user
        console.log('Error finding user in database');
        res.redirect('back');
    })
}