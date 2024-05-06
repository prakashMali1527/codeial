const User = require('../models/user');
module.exports.signUp = function (req, res) {
    res.render('signup');
}

// get the sign up data
module.exports.createUser = function (req, res) {
    const { name, email, password, confirm_password } = req.body;

    if (password != confirm_password) {
        console.log('Password and Confirm Password are different.Try again!!')
        return res.redirect('back');
    }

    User.findOne({email})
    .then(function (user) {
        if (user) {
            console.log('User already exist');
            return res.redirect('back');
        }

        User.create({ name, email, password })
        .then(function (newUser) {
            return res.redirect('/signin');
        }).catch(function(err) {
            console.log('Error in creating User while Signing Up');
            return;
        });

    }).catch(function(err) {
        console.log('Error finding the User in Signing Up');
        return;
    });
}