module.exports.signIn = function(req,res){
    res.render('signin');
}

module.exports.createSession = function(req,res){
    console.log('user logged in');
    res.redirect('back');
}