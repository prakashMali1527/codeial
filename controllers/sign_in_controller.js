module.exports.signIn = function(req,res){
    res.render('signin');
}

// sign in and create a session for user
module.exports.createSession = function(req,res){
    res.redirect('/users/profile');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log('Error in signing out or destroyingSession');
        }
        res.redirect('/');
    });
}