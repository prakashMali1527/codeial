const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {

    try {
        // get posts from db
        const posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        // get users from db
        const users = await User.find({});

        res.render('home', {
            title: 'home',
            users: users,
            posts: posts
        });

    } catch (err) {
        console.log(`Error: ${err}`);
    }
}
