const User = require('../models/user');
const queue = require('../config/kue');
const emailsWorker = require('../workers/emails_worker');

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
            req.flash('success', 'Account created successfully');

            // sending signUp emails to emails queue delayed job
            // using signup to specify job type @ workers/emails_worker
            let job = queue.create('emails', { signup: newUser }).save(function (err) {
                if (err) {
                    console.log('Error in sending signUp user to queue', err);
                    return;
                }
                console.log('signUp job enqueued', job.id);
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