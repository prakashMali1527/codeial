const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const generator = require('generate-password');

const User = require('../models/user');
const queue = require('./kue');
const emailsWorker = require('../workers/emails_worker');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "1",
    clientSecret: "2",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            console.log(profile);
            // find a user
            let user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                // if found, set this user as req.user
                return done(null, user);
            } else {
                try {
                    // if not found, create the user and set it as req.user
                    let newUser = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                        password: generator.generate({
                            length: 20,
                            numbers: true
                        })
                    });

                    // sending signUp emails to emails queue delayed job
                    // using signup to specify job type @ workers/emails_worker
                    let job = queue.create('emails', { signup: newUser }).save(function (err) {
                        if (err) {
                            console.log('Error in sending signUp user to queue', err);
                            return;
                        }
                        console.log('signUp job enqueued', job.id);
                    });

                    return done(null, newUser);
                } catch (err) {
                    console.log('Error in creating user, google passport-strategy ', err);
                }
            }
        } catch (err) {
            console.log('Error in google passport-strategy ', err);
        }
    }
));

module.exports = passport;