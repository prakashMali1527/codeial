const User = require('../models/user');
const resetPasswordMailer = require('../controllers/mailers/reset_password_mailer');
const ResetPasswordToken = require('../models/reset_password_token');
const generator = require('generate-password');

module.exports.signIn = function (req, res) {
    res.render('signin');
}

// sign in and create a session for user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in successfully!');
    return res.redirect('/');
}

module.exports.forgotPassword = function (req, res) {
    return res.render('forgot_password.ejs');
}

module.exports.verifyEmail = async function (req, res) {
    console.log('verifying email');
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            req.flash('error', 'Email not found');
            return res.redirect('back');
        }

        try {
            // generate access token
            const accessToken = generator.generate({
                length: 25,
                numbers: true
            });
            // create reset token in db
            let resetPasswordToken = await ResetPasswordToken.create({ user: user.id, accessToken: accessToken, isValid: true });

            await resetPasswordToken.populate('user', 'name email');

            // send reset password mail
            resetPasswordMailer.resetPassword(resetPasswordToken);

        } catch (err) {
            console.log('Error generating access token', err);
        }

    } catch (err) {
        console.log('Error in verifying email in db', err);
    }
    return res.redirect('back');
}
