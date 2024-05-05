module.exports.signOut = function(req,res){

    console.log('Sign out Successfully');
    res.cookie('user_id','');
    res.redirect('/signin');
}