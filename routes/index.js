const express = require('express');
const router = express.Router();

// console message for testing 
console.log('main router loaded');

const homeController = require('../controllers/home_controller.js');

router.get('/', homeController.home);

router.use('/signUp', require('./signup.js'));

router.use('/signIn', require('./signin.js'));

router.use('/users', require('./users.js'));

router.use('/post',require('./post.js'));

router.use('/comment',require('./comment.js'));

router.use('/api',require('./api'));

router.use('/reset-password',require('./resetpassword.js'));

module.exports = router;