const User = require('../models/user');
const signUpMailer = require('./mailers/signUp_mailer');
module.exports.signUp = function (req, res) {
    res.render('signup');
}

// get the sign up data
module.exports.createUser = async function (req, res) {
    const { name, email, password, confirm_password } = req.body;

    if (password != confirm_password) {
        console.log('Password and Confirm Password are different.Try again!!')
        return res.redirect('back');
    }

    try{
        let user = await User.findOne({email});
    
        if (user) {
            console.log('User already exist');
            return res.redirect('back');
        }
        try{
            let newUser = await User.create({ name, email, password });
            req.flash('success','Account created successfully');

            signUpMailer.newAccount(newUser);

            return res.redirect('/signin');
        }catch(err){
            console.log('Error in creating User while Signing Up');
            return;
        }
    }catch(err) {
        console.log(`Error: ${err}`);
    }
}