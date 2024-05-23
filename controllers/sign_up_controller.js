const User = require('../models/user');
const queue = require('../config/kue');
const InactiveAccount = require('../models/inactive_account');
const generator = require('generate-password');
const accountActivationMailer = require('../controllers/mailers/account_activation_mailer');

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

    try {
        let user = await User.findOne({ email });

        if (user) {
            console.log('User already exist');
            return res.redirect('back');
        }
        try {

            let newUser = await User.create({ name, email, password });

            // generate account activation token
            let accountActivationToken = generator.generate({
                length: 25,
                numbers: true
            });

            // create inactive account
            let inactiveAccount = await InactiveAccount.create({accountActivationToken: accountActivationToken, user: newUser.id, isActive: false});

            await inactiveAccount.populate('user', 'name email');

            // send account activation mail
            accountActivationMailer.activateAccount(inactiveAccount);
            req.flash('success', 'Account activation link has been sent to your mail');

            // removing inactive account after 24 hours
            let job = queue.create('removeInactiveAccount', { _id: inactiveAccount._id })
            .delay(24*60*60*1000)
            .save(function (err) {
                if (err) {
                    console.log('Error in sending Inactive Account to queue', err);
                    return;
                }
                console.log('Remove Inactive Account job enqueued', job.id);
            });

            return res.redirect('/signin');
        } catch (err) {
            console.log('Error in creating User while Signing Up',err);
            return;
        }
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}