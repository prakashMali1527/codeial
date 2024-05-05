module.exports.signUp = function(req,res){
    res.render('signup');
}

// get the sign up data
module.exports.createUser = function(req,res){
    console.log('user created');
    console.log(req.body);
    res.redirect('back');
}