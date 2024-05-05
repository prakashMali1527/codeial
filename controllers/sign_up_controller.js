module.exports.signUp = function(req,res){
    res.render('signup');
}

module.exports.createUser = function(req,res){
    console.log('user created');
    console.log(req.body);
    res.redirect('back');
}