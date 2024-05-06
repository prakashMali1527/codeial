const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authenticate using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function (email, password, done) {
        // find a user and established the identity
        User.findOne({email:email})
        .then((user)=>{
            if(!user || user.password!=password){
                console.log('Invalid username/password');
                return done(null,false);
            }

            return done(null,user);

        }).catch((err)=>{
            console.log('Error in finding user --> Passport');
            return done(err);
        })
    }
));

// serializinng the user to decide which key is to be kep in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then((user)=>{
        if(!user){
            return done(null,false);
        }
        return done(null,user);
    }).catch((err)=>{
        console.log('Error in finding user --> Passport');
        return done(err);
    })
})