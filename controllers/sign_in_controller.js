module.exports.signIn = function(req,res){
    res.render('signin');
}

// sign in and create a session for user
module.exports.createSession = function(req,res){
    res.redirect('/users/profile');
}