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

// for any further route access from here
// router.use('/routerName',require('./routerFile'));

module.exports = router;