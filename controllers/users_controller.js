const User = require('../models/user');

module.exports.profile = function (req, res) {
    const { user_id } = req.cookies;
    console.log(`User token: ${user_id}`);
    if (!user_id) {
        console.log('No token available');
        return res.redirect('/signin');
    }

    User.findOne({ _id: user_id })
        .then(function (user) {
            if (!user) {
                console.log('Invalid user token');
                return res.redirect('/signin');
            }

            return res.render('user_profile', {
                title: 'profile',
                name: user.name,
                email: user.email
            });

        }).catch(function (err) {
            console.log('Error validating user token');
            return res.redirect('back');
        })
}

module.exports.post = function (req, res) {
    res.end('<h1>User Post</h1>');
}

module.exports.friends = function (req, res) {
    res.send('<ul> <li> friend List </li> </ul>');
}